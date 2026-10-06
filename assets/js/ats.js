/* ============================================================================
   L'ATS maison — « Mon CV passe-t-il votre ATS ? »

   On colle une offre d'emploi ; ce script la confronte au parcours de Clément
   (assets/js/ats-profil.js, généré depuis profil/profil.mjs) et rend une note
   sur 100, avec les points + ET les points −.

   La NOTE est calculée dans le navigateur (PDF compris, lu par pdf.js chargé
   à la demande) : ni relais, ni clé, ni quota. Pas de LLM pour noter : un
   vrai petit pipeline de NLP classique, lisible de bout en bout —
     1. découpage en phrases et normalisation (minuscules, accents, mots vides),
     2. repérage des compétences du lexique, « exigé » ou « souhaité »,
     3. TF-IDF sur l'offre et les lignes du parcours, similarité cosinus,
     4. score logistique : 100 · σ(z), z combinant les variables ci-dessous.
   Les poids de z sont calibrés à la main sur les cas de outils/tester-ats.mjs
   (`npm run tester-ats`) : toute retouche des poids se valide là.

   L'IA n'intervient qu'ENSUITE et sur demande, via le relais de l'assistant
   (chat-worker/, modes « ats-avis » et « ats-redaction ») : elle met en
   phrases le résultat de l'algorithme, ou met en forme des notes en vrac.

   Le moteur (ATS.analyser) ne touche pas au DOM : il tourne aussi sous Node
   pour les tests. Le texte affiché passe par textContent, jamais innerHTML.
   ========================================================================= */

(function (racine) {
  "use strict";

  var P = racine.ATS_PROFIL;
  if (!P) return;

  /* ======================================================== 1. LE MOTEUR */

  /* Les poids du score logistique. z = B0 + Σ poids · variable. */
  var POIDS = { b0: -3.4, couverture: 3.6, similarite: 3.2, sport: 1.7, ecart: 0.35 };
  /* Une similarité cosinus offre ↔ parcours dépasse rarement 0,3 : au-delà,
     c'est déjà une offre écrite pour lui. On la ramène sur [0, 1]. */
  var SIM_PLEINE = 0.3;
  /* Les compétences qui disent « cette offre est dans le sport ». */
  var DU_SPORT = ["sport", "football", "basket", "physio", "scouting", "charge"];

  var VIDES = {};
  ("a au aux avec ce ces cet cette dans de des du elle en et eux il ils je la le les leur leurs lui ma mais me meme mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous y " +
   "est sont etre avoir ont sera seront etes fait faire tout tous toute toutes plus tres bien aussi ainsi afin comme dont sein chez entre vers selon sans sous " +
   "the of and to in for with on at by from an be is are as or that this will you your our we us it its have has can who which their they them not but all any " +
   "poste profil mission missions equipe equipes vous nous h f cdi cdd job role team candidat candidate rejoindre join recherche recherchons looking offre entreprise company").split(" ")
    .forEach(function (m) { VIDES[m] = true; });

  function normaliser(t) {
    return String(t || "").toLowerCase()
      .replace(/œ/g, "oe").replace(/æ/g, "ae")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9+#]+/g, " ")
      .trim();
  }

  /* Racinisation volontairement grossière (le pluriel) : assez pour que
     « pipelines » rencontre « pipeline », sans inventer de faux amis. */
  function jetons(t) {
    return normaliser(t).split(" ").filter(function (m) {
      return m.length > 1 && !VIDES[m] && !/^[0-9+#]+$/.test(m);
    }).map(function (m) {
      return m.length > 4 && /[^s]s$/.test(m) ? m.slice(0, -1) : m;
    });
  }

  function echapper(s) { return s.replace(/[.*+?^${}()|[\]\\#]/g, "\\$&"); }

  /* « modele* predictif* » → /(?:^| )(modele[a-z0-9]* predictif[a-z0-9]*)(?= |$)/ */
  function motif(m) {
    var corps = m.split(/\s+/).map(function (mot) {
      var etoile = /\*$/.test(mot);
      var n = normaliser(mot.replace(/\*$/, ""));
      if (!n) return "";
      return n.split(" ").map(echapper).join(" ") + (etoile ? "[a-z0-9+#]*" : "");
    }).filter(Boolean).join(" ");
    return new RegExp("(?:^| )(" + corps + ")(?= |$)");
  }

  var LEXIQUE = P.competences.map(function (c) {
    return { c: c, motifs: c.mots.map(motif) };
  });

  var RE_SOUHAIT = /(?:^| )(un plus|serait un plus|apprecie|appreciee|appreciees|apprecies|souhaite|souhaitee|souhaitees|souhaites|souhaitable|bonus|idealement|atout|nice to have|ideally|preferred|a plus|desirable|appreciated|optionnel|optional)(?= |$)/;
  var RE_REQUIS = /(?:^| )(requis|requise|requises|indispensable|indispensables|obligatoire|exige|exigee|exigees|imperati[fv]e?s?|required|requirements|must have|must|essential|profil recherche|competences requises|qualifications)(?= |$)/;

  /* L'offre en phrases, chacune marquée « souhaitée » ou non. Un intertitre
     court (« Appréciés : », « Nice to have ») bascule toute la liste qui
     suit, jusqu'au prochain intertitre « requis ». */
  function phrases(texte) {
    var sortie = [];
    var souhait = false;
    String(texte || "").split(/\r?\n/).forEach(function (ligne) {
      var n = normaliser(ligne);
      if (!n) return;
      if (n.split(" ").length <= 6) {
        if (RE_SOUHAIT.test(n)) souhait = true;
        else if (RE_REQUIS.test(n)) souhait = false;
      }
      ligne.split(/[.;:!?•·,()\/]+/).forEach(function (bout) {
        var nb = normaliser(bout);
        if (nb) sortie.push({ n: nb, souhait: souhait || RE_SOUHAIT.test(nb) });
      });
    });
    return sortie;
  }

  function reperer(liste) {
    var trouves = [];
    LEXIQUE.forEach(function (x) {
      var exige = null, souhaite = null;
      liste.forEach(function (ph) {
        if (exige) return;
        for (var i = 0; i < x.motifs.length; i++) {
          var m = ph.n.match(x.motifs[i]);
          if (!m) continue;
          if (!ph.souhait) exige = m[1];
          else if (!souhaite) souhaite = m[1];
          return;
        }
      });
      if (exige || souhaite) trouves.push({ c: x.c, vu: exige || souhaite, souhait: !exige });
    });
    return trouves;
  }

  var RE_XP = [
    /(?:^| )(\d{1,2})\+? (?:a \d{1,2}\+? |to \d{1,2}\+? |\+ )?(?:ans?|annees?|years?|yrs?)(?: [a-z]+){0,3} (?:d )?(?:experience|exp)(?= |$)/,
    /(?:^| )experience(?: [a-z]+){0,4}? (\d{1,2})\+? (?:a \d{1,2}\+? |to \d{1,2}\+? |\+ )?(?:ans?|annees?|years?)(?= |$)/,
    /(?:^| )(?:minimum|au moins|at least) (\d{1,2})\+? (?:ans?|annees?|years?)(?= |$)/
  ];

  function anneesDemandees(n) {
    for (var i = 0; i < RE_XP.length; i++) {
      var m = n.match(RE_XP[i]);
      if (m && +m[1] > 0 && +m[1] <= 20) return +m[1];
    }
    return null;
  }

  function anneesAuCompteur(maintenant) {
    var d = P.debutPro.split("-");
    var debut = new Date(+d[0], (+d[1] || 1) - 1, 1);
    return Math.max(0, (maintenant - debut) / (365.25 * 864e5));
  }

  /* ---- TF-IDF. Le corpus (lignes du parcours) est découpé une seule fois. */

  var CORPUS = P.corpus.map(jetons);

  function compter(liste) {
    var c = {};
    liste.forEach(function (m) { c[m] = (c[m] || 0) + 1; });
    return c;
  }

  function vecteur(comptes, idf) {
    var v = {}, norme = 0;
    Object.keys(comptes).forEach(function (m) {
      var p = (1 + Math.log(comptes[m])) * idf(m);
      v[m] = p; norme += p * p;
    });
    norme = Math.sqrt(norme) || 1;
    Object.keys(v).forEach(function (m) { v[m] /= norme; });
    return v;
  }

  function cosinus(a, b) {
    var s = 0;
    Object.keys(a).forEach(function (m) { if (b[m]) s += a[m] * b[m]; });
    return s;
  }

  function sigma(z) { return 1 / (1 + Math.exp(-z)); }

  function analyser(texte, options) {
    options = options || {};
    var n = normaliser(texte);
    var mots = n ? n.split(" ").length : 0;

    var liste = phrases(texte);
    var trouves = reperer(liste);

    // Couverture : Σ poids · niveau/3 sur les compétences demandées.
    var num = 0, den = 0;
    trouves.forEach(function (t) {
      var w = (t.c.poids || 1) * (t.souhait ? 0.5 : 1);
      num += w * t.c.niveau / 3; den += w;
    });
    var couverture = den ? num / den : 0;

    // TF-IDF : l'offre est un document de plus dans le corpus.
    var offre = jetons(texte);
    var docs = CORPUS.concat([offre]);
    var df = {};
    docs.forEach(function (d) { Object.keys(compter(d)).forEach(function (m) { df[m] = (df[m] || 0) + 1; }); });
    var N = docs.length;
    var idf = function (m) { return Math.log((N + 1) / ((df[m] || 0) + 1)) + 1; };

    var vOffre = vecteur(compter(offre), idf);
    var vProfil = vecteur(compter([].concat.apply([], CORPUS)), idf);
    var similarite = offre.length ? cosinus(vOffre, vProfil) : 0;

    var meilleure = { i: -1, sim: 0 };
    CORPUS.forEach(function (d, i) {
      var s = cosinus(vOffre, vecteur(compter(d), idf));
      if (s > meilleure.sim) meilleure = { i: i, sim: s };
    });

    var connus = compter([].concat.apply([], CORPUS));
    var termes = Object.keys(vOffre)
      .sort(function (a, b) { return vOffre[b] - vOffre[a]; })
      .slice(0, 12)
      .map(function (m) { return { mot: m, poids: vOffre[m], connu: !!connus[m] }; });

    // Expérience.
    var demandees = anneesDemandees(n);
    var au = anneesAuCompteur(options.maintenant || new Date());
    var ecart = demandees === null ? 0 : Math.max(0, demandees - au - 0.5);

    var sport = trouves.some(function (t) { return DU_SPORT.indexOf(t.c.id) >= 0; }) ? 1 : 0;

    var variables = {
      couverture: couverture,
      similarite: Math.min(1, similarite / SIM_PLEINE),
      sport: sport,
      ecart: Math.min(ecart, 5)
    };
    var z = POIDS.b0 +
      POIDS.couverture * variables.couverture +
      POIDS.similarite * variables.similarite +
      POIDS.sport * variables.sport -
      POIDS.ecart * variables.ecart;

    return {
      mots: mots,
      trop_court: mots < 25,
      score: Math.round(100 * sigma(z)),
      z: z,
      variables: variables,
      poids: POIDS,
      similarite: similarite,
      trouves: trouves,
      xp: { demandees: demandees, au: au },
      ligne: meilleure.i >= 0 ? { texte: P.corpus[meilleure.i], sim: meilleure.sim } : null,
      termes: termes,
      clins: clins(n)
    };
  }

  /* Les petites remarques sur l'offre elle-même (jamais de points). */
  function clins(n) {
    var c = [];
    if (/(?:^| )(ninja|rockstar|rock star|jedi|guru|gourou|magicien|wizard|licorne|unicorn)(?= |$)/.test(n)) c.push("ninja");
    if (/(?:^| )(baby foot|babyfoot|foosball)(?= |$)/.test(n)) c.push("babyfoot");
    if (/(?:^| )(passionne|passionnee|passionate)(?= |$)/.test(n)) c.push("passion");
    return c;
  }

  racine.ATS = { analyser: analyser, normaliser: normaliser, jetons: jetons };

  /* ===================================================== 2. L'INTERFACE */

  if (typeof document === "undefined") return;
  var outil = document.querySelector("[data-ats]");
  if (!outil) return;

  var EN = (document.documentElement.lang || "fr").slice(0, 2) === "en";
  var L = EN ? "en" : "fr";
  var doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Le relais de l'assistant (chat-worker/) sert aussi l'avis et la mise en
     forme. Sans adresse, ces deux boutons n'apparaissent pas : la note, elle,
     ne dépend jamais du réseau. */
  var RELAIS = document.currentScript && document.currentScript.getAttribute("data-endpoint");
  var PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/6.4.299/";

  var T = EN ? {
    niveaux: ["no", "basics", "hands-on", "strong"],
    souhait: "nice-to-have",
    vu: "spotted: ",
    xpOk: function (d, a) { return d + " years asked — he has about " + a + ". Box ticked."; },
    xpKo: function (d, a) { return d + " years asked — he has about " + a + " (internships not counted). But he did present his work to Tony Parker: does that count double?"; },
    xpNom: "Experience",
    rien: "No skill from his lexicon spotted. The algorithm looked, promise.",
    rienNom: "Nothing to grab onto",
    pasSport: "No sport in this job ad. He'll be good anyway, just slightly less happy.",
    pasSportNom: "Outside sport",
    court: "That's a bit short for a job ad. Paste the full text (title, duties, requirements) and the algorithm will do better.",
    verdicts: [
      [85, "Rare match. In your shoes, I'd call him before your competitors do."],
      [70, "Very good match. The minuses exist, but they can be closed."],
      [50, "Partial match. He has the core of the role; the rest can be learnt — he went back for a whole MSc to fill a gap in his knowledge."],
      [15, "Not really his role. He'd be honest with you about it; so is the algorithm."],
      [0, "Off-topic. You may be looking for someone else — but if one day you have data to make sense of, keep his number."]
    ],
    clins: {
      ninja: "Ninja/rockstar/unicorn detected: 0 points. No black belt — but he wields pandas very well.",
      babyfoot: "Foosball mentioned: +0 points from the algorithm, but he has played (real) football since age 5.",
      passion: "“Passionate” spotted. The algorithm can't measure it; his football-to-sport-science path probably does."
    },
    mail: function (s) { return "Your ATS gave you " + s + "/100 — let's talk"; },
    iaAttente: "The AI is writing its review…",
    iaErreur: "The AI is unavailable right now (free models, limited daily quota). The score and points above are unaffected.",
    iaTrop: "Too many requests in a short time — try again in a minute.",
    pdfLecture: "Reading the PDF…",
    pdfOk: function (n) { return "PDF read (" + n + " pages). Analysing."; },
    pdfVide: "This PDF contains no text (probably a scan). Copy-paste the job ad, or describe the role below.",
    pdfErreur: "Could not read this file. Copy-paste the job ad instead.",
    redigeAttente: "The AI is formatting your notes…",
    redigeOk: "Job ad formatted from your notes — check it above, then the analysis follows.",
    redigeVide: "Write at least a few words in one of the two fields.",
    calc: {
      variable: "Variable", valeur: "Value", poids: "Weight",
      couverture: "Weighted coverage of the skills asked",
      similarite: "TF-IDF cosine similarity, job ad ↔ background (÷ " + SIM_PLEINE + ", capped at 1)",
      sport: "Job ad is about sport (0 or 1)",
      ecart: "Missing years of experience (capped at 5)",
      constante: "Intercept",
      note: "score = 100 · σ(z) = 100 / (1 + e^−z)",
      termes: "Most distinctive terms in your job ad (TF-IDF). Underlined: also found in his background.",
      sim: "cosine similarity "
    }
  } : {
    niveaux: ["non", "notions", "pratiqué", "solide"],
    souhait: "souhaité",
    vu: "repéré : ",
    xpOk: function (d, a) { return d + " ans demandés — il en a environ " + a + ". Case cochée."; },
    xpKo: function (d, a) { return d + " ans demandés — il en a environ " + a + " (stages non comptés). Mais il a présenté son travail à Tony Parker : ça compte double ?"; },
    xpNom: "Expérience",
    rien: "Aucune compétence de son lexique repérée. L'algo a cherché, promis.",
    rienNom: "Rien à quoi se raccrocher",
    pasSport: "Pas de sport dans cette offre. Il y sera bon quand même, juste un peu moins heureux.",
    pasSportNom: "Hors du sport",
    court: "C'est un peu court pour une offre. Collez le texte entier (intitulé, missions, profil) : l'algo fera mieux.",
    verdicts: [
      [85, "Match rare. À votre place, je l'appellerais avant vos concurrents."],
      [70, "Très bon match. Les points − existent, mais ils se comblent."],
      [50, "Match partiel. Il a le cœur du poste ; le reste s'apprend — il a bien repris un master entier pour combler un trou dans ses connaissances."],
      [15, "Pas vraiment son poste. Il vous le dirait honnêtement ; l'algo aussi."],
      [0, "Hors-sujet. Vous cherchez sans doute quelqu'un d'autre — mais le jour où vous aurez des données à faire parler, gardez son numéro."]
    ],
    clins: {
      ninja: "« Ninja », « rockstar » ou « licorne » repéré : 0 point. Pas de ceinture noire, mais il manie très bien pandas.",
      babyfoot: "Baby-foot mentionné : +0 point pour l'algo, mais il joue au (vrai) foot depuis l'âge de 5 ans.",
      passion: "« Passionné » repéré. L'algo ne sait pas le mesurer ; son passage du diplôme d'ingé au master STAPS, si."
    },
    mail: function (s) { return "Votre ATS vous a mis " + s + "/100 — parlons-en"; },
    iaAttente: "L'IA rédige son avis…",
    iaErreur: "L'IA est indisponible pour le moment (modèles gratuits, quota quotidien limité). La note et les points ci-dessus n'en dépendent pas.",
    iaTrop: "Beaucoup de demandes d'un coup — réessayez dans une minute.",
    pdfLecture: "Lecture du PDF…",
    pdfOk: function (n) { return "PDF lu (" + n + " page" + (n > 1 ? "s" : "") + "). Analyse en cours."; },
    pdfVide: "Ce PDF ne contient pas de texte (sans doute un scan). Copiez-collez l'offre, ou décrivez le poste ci-dessous.",
    pdfErreur: "Impossible de lire ce fichier. Copiez-collez plutôt le texte de l'offre.",
    redigeAttente: "L'IA met vos notes en forme…",
    redigeOk: "Offre mise en forme à partir de vos notes — vérifiez-la ci-dessus ; l'analyse suit.",
    redigeVide: "Écrivez au moins quelques mots dans l'un des deux champs.",
    calc: {
      variable: "Variable", valeur: "Valeur", poids: "Poids",
      couverture: "Couverture pondérée des compétences demandées",
      similarite: "Similarité cosinus TF-IDF, offre ↔ parcours (÷ " + String(SIM_PLEINE).replace(".", ",") + ", plafonnée à 1)",
      sport: "L'offre parle de sport (0 ou 1)",
      ecart: "Années d'expérience manquantes (plafond 5)",
      constante: "Constante",
      note: "note = 100 · σ(z) = 100 / (1 + e^−z)",
      termes: "Termes les plus distinctifs de votre offre (TF-IDF). Soulignés : présents aussi dans son parcours.",
      sim: "similarité cosinus "
    }
  };

  var EXEMPLES = EN ? [
    "Data Scientist — Performance Department, professional football club\n\nReporting to the Head of Performance, you will join the club's sport science staff.\n\nResponsibilities:\n- Collect and validate GPS and training-load data from players\n- Build data pipelines in Python and SQL\n- Develop predictive models (machine learning) for load monitoring and injury risk\n- Present insights to the coaching staff through Power BI dashboards\n\nRequirements:\n- Master's degree in data science or sport science\n- At least 2 years of experience\n- Fluent English\n\nNice to have:\n- Experience in player recruitment (scouting)\n- Deep learning",
    "Senior Data Engineer — Fintech scale-up\n\nYou will design our real-time data platform at scale.\n- Build streaming pipelines with Kafka and Spark\n- Deploy on AWS with Docker, Kubernetes and Terraform\n- Write production code in Scala and Python\n- Own data governance and data quality\n\nRequirements: 5+ years of experience in data engineering. Fluent English. German is a plus.",
    "Baker (M/F) — artisan bakery\n\nOur family bakery is looking for a passionate baker to join the team.\n- Kneading, shaping and baking bread\n- Preparing pastries and viennoiseries\n- Following hygiene and food safety rules\nHours: 4am – 12pm. Friendly atmosphere, foosball in the break room."
  ] : [
    "Data scientist — Cellule performance d'un club de football professionnel\n\nRattaché(e) au responsable de la performance, vous rejoignez le staff sciences du sport du club.\n\nVos missions :\n- Collecter et fiabiliser les données GPS et de charge d'entraînement des joueurs\n- Développer des pipelines de données en Python et SQL\n- Construire des modèles prédictifs (machine learning) pour le suivi de la charge et le risque de blessure\n- Restituer les résultats au staff technique via des tableaux de bord Power BI\n\nProfil recherché :\n- Bac+5 en data science ou en sciences du sport\n- 2 ans d'expérience minimum\n- Anglais courant\n\nAppréciés :\n- Connaissance du recrutement de joueurs (scouting)\n- Notions de deep learning",
    "Data engineer senior — Scale-up fintech\n\nVous concevez notre plateforme data temps réel à grande échelle.\n- Pipelines de streaming avec Kafka et Spark\n- Déploiement sur AWS avec Docker, Kubernetes et Terraform\n- Développement en Scala et Python\n- Responsable de la gouvernance et de la qualité des données\n\nProfil : 5 ans d'expérience minimum en data engineering. Anglais professionnel. L'allemand serait un plus.",
    "Boulanger / Boulangère (H/F) — boulangerie artisanale\n\nNotre boulangerie familiale recherche un(e) boulanger(ère) passionné(e) pour rejoindre l'équipe.\n- Pétrissage, façonnage et cuisson du pain\n- Préparation des viennoiseries\n- Respect des règles d'hygiène et de sécurité alimentaire\nHoraires : 4 h – 12 h. Ambiance familiale, baby-foot en salle de pause."
  ];

  var form = outil.querySelector("form");
  var zone = outil.querySelector("#ats-offre");
  var etat = outil.querySelector("[data-ats-etat]");
  var bloc = outil.querySelector("[data-ats-resultat]");
  var q = function (s) { return bloc.querySelector(s); };

  function el(tag, cls, texte) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (texte != null) n.textContent = texte;
    return n;
  }

  function virgule(x, d) {
    var s = x.toFixed(d);
    return EN ? s : s.replace(".", ",");
  }

  function puce(nom, texte, details) {
    var li = el("li");
    li.appendChild(el("b", null, nom));
    if (details) li.appendChild(el("span", "ats-tag", details));
    li.appendChild(el("span", "ats-dit", texte));
    return li;
  }

  /* Ce que l'IA reçoit : les MÊMES points que l'écran, sans les traits
     d'humour (qu'elle répéterait au premier degré). */
  var dernier = null;

  function afficher(r) {
    var plus = q("[data-ats-plus]"), moins = q("[data-ats-moins]");
    plus.textContent = ""; moins.textContent = "";
    var pourIA = { plus: [], moins: [] };

    var tries = r.trouves.slice().sort(function (a, b) {
      return (b.c.poids || 1) * (b.souhait ? 0.5 : 1) - (a.c.poids || 1) * (a.souhait ? 0.5 : 1);
    });
    tries.forEach(function (t) {
      var details = T.niveaux[t.c.niveau] + (t.souhait ? " · " + T.souhait : "") + " · " + T.vu + "« " + t.vu + " »";
      if (EN) details = details.replace("« ", "“").replace(" »", "”");
      (t.c.niveau >= 2 ? plus : moins).appendChild(puce(t.c.nom[L], t.c.dit[L], details));
      (t.c.niveau >= 2 ? pourIA.plus : pourIA.moins).push(
        t.c.nom[L] + " — niveau : " + ["non", "notions", "pratiqué", "solide"][t.c.niveau] +
        (t.souhait ? " (souhaité par l'offre)" : " (exigé par l'offre)") + " — " + t.c.dit[L]);
    });

    if (r.xp.demandees !== null) {
      var a = Math.round(r.xp.au);
      var xp = "Expérience : " + r.xp.demandees + " ans demandés, environ " + a + " ans d'expérience professionnelle (stages non comptés)";
      if (r.variables.ecart > 0) { moins.appendChild(puce(T.xpNom, T.xpKo(r.xp.demandees, a))); pourIA.moins.push(xp); }
      else { plus.appendChild(puce(T.xpNom, T.xpOk(r.xp.demandees, a))); pourIA.plus.push(xp); }
    }
    if (!r.trouves.length) moins.appendChild(puce(T.rienNom, T.rien));
    else if (!r.variables.sport) {
      moins.appendChild(puce(T.pasSportNom, T.pasSport));
      pourIA.moins.push("L'offre ne relève pas du sport, son domaine de spécialité");
    }

    plus.parentNode.hidden = !plus.children.length;
    moins.parentNode.hidden = !moins.children.length;

    // La note et le verdict.
    q("[data-ats-score]").textContent = r.score;
    var verdict = r.trop_court ? T.court : T.verdicts.filter(function (v) { return r.score >= v[0]; })[0][1];
    q("[data-ats-verdict]").textContent = verdict;
    q("[data-ats-jauge]").style.width = r.score + "%";

    // La ligne du parcours la plus proche.
    var lb = q("[data-ats-ligne-bloc]");
    lb.hidden = !r.ligne || r.ligne.sim < 0.05;
    if (r.ligne) {
      q("[data-ats-ligne]").textContent = r.ligne.texte;
      q("[data-ats-ligne-sim]").textContent = T.calc.sim + virgule(r.ligne.sim, 2);
    }

    // Les clins d'œil.
    var cl = q("[data-ats-clins]");
    cl.textContent = "";
    r.clins.forEach(function (k) { cl.appendChild(el("li", null, T.clins[k])); });
    cl.hidden = !r.clins.length;

    calculs(r);

    dernier = { offre: zone.value, score: r.score, verdict: verdict, plus: pourIA.plus, moins: pourIA.moins,
                ligne: r.ligne && r.ligne.sim >= 0.05 ? r.ligne.texte : "" };
    preparerIA();

    var mail = q("[data-ats-mail]");
    if (mail) mail.href = "mailto:clement.verdier@laposte.net?subject=" + encodeURIComponent(T.mail(r.score));

    bloc.hidden = false;
    bloc.focus({ preventScroll: true });
    bloc.scrollIntoView({ behavior: doux ? "auto" : "smooth", block: "start" });
  }

  function calculs(r) {
    var boite = q("[data-ats-calculs]");
    boite.textContent = "";
    var table = el("table", "ats-table");
    var tete = el("tr");
    [T.calc.variable, T.calc.valeur, T.calc.poids].forEach(function (t) { tete.appendChild(el("th", null, t)); });
    table.appendChild(el("thead")).appendChild(tete);
    var corps = el("tbody");
    [
      [T.calc.constante, "1", r.poids.b0],
      [T.calc.couverture, virgule(r.variables.couverture, 2), r.poids.couverture],
      [T.calc.similarite, virgule(r.variables.similarite, 2) + " (" + virgule(r.similarite, 3) + ")", r.poids.similarite],
      [T.calc.sport, String(r.variables.sport), r.poids.sport],
      [T.calc.ecart, virgule(r.variables.ecart, 1), -r.poids.ecart]
    ].forEach(function (ligne) {
      var tr = el("tr");
      tr.appendChild(el("td", null, ligne[0]));
      tr.appendChild(el("td", null, ligne[1]));
      tr.appendChild(el("td", null, (ligne[2] > 0 ? "+" : "") + virgule(ligne[2], 2)));
      corps.appendChild(tr);
    });
    table.appendChild(corps);
    boite.appendChild(table);

    boite.appendChild(el("p", "ats-formule", "z = " + virgule(r.z, 2) + "  →  " + T.calc.note + " = " + r.score));

    boite.appendChild(el("p", "ats-mini", T.calc.termes));
    var puces = el("p", "ats-termes");
    r.termes.forEach(function (t) {
      puces.appendChild(el("span", t.connu ? "connu" : null, t.mot));
    });
    boite.appendChild(puces);
  }

  /* ---------------------------------------------------- L'AVIS DE L'IA */
  /* Sur demande seulement : c'est le seul moment où l'offre quitte le
     navigateur, et chaque avis coûte une requête sur le quota du relais. */

  var ia = q("[data-ats-ia]");
  var iaTexte = q("[data-ats-ia-texte]");
  var iaBouton = q("[data-ats-ia-bouton]");
  var memoire = {};   // un avis par offre analysée : pas de requête en double

  function preparerIA() {
    if (!ia) return;
    ia.hidden = !RELAIS;
    var cle = L + "|" + dernier.offre;
    iaTexte.textContent = "";
    if (memoire[cle]) { rendreIA(memoire[cle]); iaBouton.hidden = true; }
    else iaBouton.hidden = false;
  }

  // Texte brut du modèle → paragraphes et listes, par le DOM (jamais innerHTML).
  function rendreIA(texte) {
    iaTexte.textContent = "";
    var liste = null;
    texte.replace(/\r/g, "").replace(/\*\*/g, "").split("\n").forEach(function (ligne) {
      var l = ligne.trim();
      if (!l) { liste = null; return; }
      var tiret = /^[-*•]\s+/.exec(l);
      if (tiret) {
        if (!liste) { liste = el("ul"); iaTexte.appendChild(liste); }
        liste.appendChild(el("li", null, l.slice(tiret[0].length)));
        return;
      }
      liste = null;
      var titre = /^((?:en bref|in short|points?\s*[+−-]|pluses|minuses|à vérifier en entretien|to check in (?:the )?interview)[^:]*:)\s*(.*)$/i.exec(l);
      var p = el("p", titre ? "ats-ia-titre" : null);
      if (titre) {
        p.appendChild(el("b", null, titre[1]));
        if (titre[2]) p.appendChild(document.createTextNode(" " + titre[2]));
      } else p.textContent = l;
      iaTexte.appendChild(p);
    });
  }

  function relais(corps) {
    return fetch(RELAIS, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corps) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) {
          if (r.ok && d.reponse) return d.reponse;
          throw new Error(r.status === 429 && d.erreur === "trop" ? "trop" : "indisponible");
        });
      });
  }

  if (iaBouton) iaBouton.addEventListener("click", function () {
    if (!dernier) return;
    var cle = L + "|" + dernier.offre;
    iaBouton.disabled = true;
    iaTexte.textContent = "";
    iaTexte.appendChild(el("p", "ats-attente", T.iaAttente));
    relais({ mode: "ats-avis", langue: L, offre: dernier.offre,
             analyse: { score: dernier.score, verdict: dernier.verdict, plus: dernier.plus, moins: dernier.moins, ligne: dernier.ligne } })
      .then(function (texte) { memoire[cle] = texte; rendreIA(texte); iaBouton.hidden = true; })
      .catch(function (e) {
        iaTexte.textContent = "";
        iaTexte.appendChild(el("p", "ats-attente", e.message === "trop" ? T.iaTrop : T.iaErreur));
      })
      .then(function () { iaBouton.disabled = false; });
  });

  /* ---------------------------------------------------- L'OFFRE EN PDF */
  /* pdf.js n'est téléchargé qu'au premier fichier : la page reste légère
     pour qui colle simplement le texte. Le PDF est lu sur l'appareil. */

  var fichier = outil.querySelector("[data-ats-fichier]");
  var importer = outil.querySelector("[data-ats-importer]");

  function dire(t) { if (etat) etat.textContent = t || ""; }

  function lirePdf(donnees) {
    return import(PDFJS + "pdf.min.mjs").then(function (pdfjs) {
      pdfjs.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.mjs";
      return pdfjs.getDocument({ data: new Uint8Array(donnees) }).promise;
    }).then(function (doc) {
      var numeros = [];
      for (var i = 1; i <= Math.min(doc.numPages, 10); i++) numeros.push(i);
      return Promise.all(numeros.map(function (i) {
        return doc.getPage(i).then(function (p) { return p.getTextContent(); }).then(function (c) {
          return c.items.map(function (x) { return (x.str || "") + (x.hasEOL ? "\n" : " "); }).join("");
        });
      })).then(function (textes) {
        return { texte: textes.join("\n\n").replace(/[ \t]+\n/g, "\n").trim(), pages: doc.numPages };
      });
    });
  }

  function charger(f) {
    if (!f) return;
    var pdf = /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name);
    dire(pdf ? T.pdfLecture : "");
    f.arrayBuffer()
      .then(function (b) { return pdf ? lirePdf(b) : { texte: new TextDecoder().decode(b), pages: 1 }; })
      .then(function (res) {
        if (res.texte.split(/\s+/).length < 15) { dire(T.pdfVide); return; }
        zone.value = res.texte;
        dire(pdf ? T.pdfOk(res.pages) : "");
        afficher(analyser(zone.value));
      })
      .catch(function () { dire(T.pdfErreur); });
  }

  if (importer && fichier) {
    importer.addEventListener("click", function () { fichier.click(); });
    fichier.addEventListener("change", function () { charger(fichier.files[0]); fichier.value = ""; });
    zone.addEventListener("dragover", function (e) { e.preventDefault(); });
    zone.addEventListener("drop", function (e) {
      if (!e.dataTransfer || !e.dataTransfer.files.length) return;
      e.preventDefault();
      charger(e.dataTransfer.files[0]);
    });
  }

  /* -------------------------------------------- PAS D'OFFRE ÉCRITE ? */
  /* Le recruteur note ce qu'il demande et ce qu'il propose ; l'IA en fait
     une offre propre SANS rien ajouter (consigne du relais), puis l'algo note. */

  var rediger = outil.querySelector("[data-ats-rediger]");
  if (rediger && RELAIS) {
    rediger.hidden = false;
    var miseEnForme = rediger.querySelector("[data-ats-mettre-en-forme]");
    var demande = rediger.querySelector("#ats-demande");
    var propose = rediger.querySelector("#ats-propose");
    var dit = rediger.querySelector("[data-ats-rediger-etat]");
    miseEnForme.addEventListener("click", function () {
      if ((demande.value + " " + propose.value).trim().split(/\s+/).length < 3) { dit.textContent = T.redigeVide; return; }
      miseEnForme.disabled = true;
      dit.textContent = T.redigeAttente;
      relais({ mode: "ats-redaction", demande: demande.value, propose: propose.value })
        .then(function (texte) {
          zone.value = texte;
          dit.textContent = T.redigeOk;
          afficher(analyser(zone.value));
        })
        .catch(function (e) { dit.textContent = e.message === "trop" ? T.iaTrop : T.iaErreur; })
        .then(function () { miseEnForme.disabled = false; });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!zone.value.trim()) { zone.focus(); return; }
    dire("");
    afficher(analyser(zone.value));
  });

  outil.querySelectorAll("[data-ats-exemple]").forEach(function (b) {
    b.addEventListener("click", function () {
      zone.value = EXEMPLES[+b.getAttribute("data-ats-exemple")] || "";
      afficher(analyser(zone.value));
    });
  });

  outil.classList.add("pret");

})(typeof window !== "undefined" ? window : globalThis);
