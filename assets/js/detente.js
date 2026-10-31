/* ============================================================================
   Le test de détente — « Combien sautez-vous ? »

   On saute téléphone plaqué contre la poitrine ; l'accéléromètre mesure le
   temps de vol, et la hauteur s'en déduit : h = g · t² / 8. C'est la méthode
   des tapis de contact et de l'application My Jump ; une plateforme de force
   fait mieux (1 000 Hz contre 60 à 100 Hz ici, d'où ± 2 cm environ).

   Pourquoi ça marche : en vol, le téléphone est en chute libre et son
   accéléromètre (gravité comprise) lit presque 0 g. Le décollage et
   l'atterrissage sont les deux franchissements d'un seuil bas.

   Tout se passe sur l'appareil : aucune donnée envoyée, rien d'enregistré.
   Le moteur (DETENTE.mesurer) ne touche pas au DOM : il tourne sous Node pour
   les tests (outils/tester-detente.mjs).
   ========================================================================= */

(function (racine) {
  "use strict";

  /* ======================================================== 1. LE MOTEUR */

  var G = 9.81;
  var SEUIL = 0.35 * G;      // sous ce seuil : en l'air
  var VOL_MIN = 0.12;        // s — en dessous, c'est un tremblement (≈ 2 cm)
  var VOL_MAX = 1.0;         // s — au-dessus (1,2 m), le téléphone a été lancé

  /* Instant (ms) où la courbe franchit le seuil entre deux échantillons :
     interpolation linéaire, plus précise que l'échantillon le plus proche. */
  function croisement(a, b) {
    if (a.a === b.a) return (a.t + b.t) / 2;
    return a.t + (SEUIL - a.a) * (b.t - a.t) / (b.a - a.a);
  }

  /* echantillons : [{ t: ms, a: norme de l'accélération gravité comprise, m/s² }]
     → { ok, hauteur (cm), vol (s), decollage, atterrissage (ms) }
       ou { ok: false, raison: "aucun" | "lance" | "court" } */
  function mesurer(echantillons) {
    var e = echantillons || [];
    var meilleur = null, debut = -1;
    for (var i = 0; i <= e.length; i++) {
      var enLair = i < e.length && e[i].a < SEUIL;
      if (enLair && debut < 0) debut = i;
      if (!enLair && debut >= 0) {
        var fin = i - 1;
        var duree = (e[fin].t - e[debut].t) / 1000;
        if (!meilleur || duree > meilleur.duree) meilleur = { debut: debut, fin: fin, duree: duree };
        debut = -1;
      }
    }
    if (!meilleur || meilleur.debut === 0 || meilleur.fin === e.length - 1) {
      // Pas de phase basse, ou coupée par le début / la fin de l'enregistrement.
      return { ok: false, raison: meilleur && meilleur.duree >= VOL_MIN ? "coupe" : "aucun" };
    }
    var decollage = croisement(e[meilleur.debut - 1], e[meilleur.debut]);
    var atterrissage = croisement(e[meilleur.fin], e[meilleur.fin + 1]);
    var vol = (atterrissage - decollage) / 1000;
    if (vol < VOL_MIN) return { ok: false, raison: "aucun" };
    if (vol > VOL_MAX) return { ok: false, raison: "lance" };
    return {
      ok: true,
      vol: vol,
      hauteur: 100 * G * vol * vol / 8,
      decollage: decollage,
      atterrissage: atterrissage
    };
  }

  /* Un saut de démonstration (≈ 37 cm), pour qui ouvre la page sur un
     ordinateur. Pseudo-aléatoire graine fixe : la courbe est toujours la même. */
  function exemple() {
    var graine = 7;
    function bruit() { graine = (graine * 16807) % 2147483647; return (graine / 2147483647 - 0.5); }
    var e = [];
    for (var t = 0; t <= 3000; t += 1000 / 60) {
      var s = t / 1000, a;
      if (s < 0.8) a = 1;                                             // debout
      else if (s < 1.1) a = 1 - 0.45 * Math.sin((s - 0.8) / 0.3 * Math.PI);  // flexion
      else if (s < 1.40) a = 1 + 1.3 * Math.sin((s - 1.1) / 0.3 * Math.PI); // poussée
      else if (s < 1.95) a = 0.04;                                    // vol (0,55 s)
      else if (s < 2.25) a = 1 + 2.6 * Math.exp(-(s - 1.95) * 14) * Math.cos((s - 1.95) * 30); // réception
      else a = 1;
      e.push({ t: t, a: Math.max(0, (a + bruit() * (s >= 1.40 && s < 1.95 ? 0.04 : 0.08))) * G });
    }
    return e;
  }

  /* Ordres de grandeur, CMJ mains sur la poitrine (sans élan de bras). */
  var REPERES = [
    { cm: 20, fr: "Femme non sportive", en: "Untrained woman" },
    { cm: 30, fr: "Homme non sportif", en: "Untrained man" },
    { cm: 42, fr: "Basketteur pro", en: "Pro basketball player" },
    { cm: 50, fr: "Volleyeur élite", en: "Elite volleyball player" }
  ];

  racine.DETENTE = { mesurer: mesurer, exemple: exemple, REPERES: REPERES, G: G, SEUIL: SEUIL };

  /* ===================================================== 2. L'INTERFACE */

  if (typeof document === "undefined") return;
  var outil = document.querySelector("[data-detente]");
  if (!outil) return;

  var EN = (document.documentElement.lang || "fr").slice(0, 2) === "en";
  var L = EN ? "en" : "fr";

  var T = EN ? {
    pret: "Get ready: phone against your chest, arms crossed.",
    compte: ["3", "2", "1"],
    saute: "Jump!",
    analyse: "Measuring…",
    permission: "Your phone asked for permission to use its motion sensors — tap Start again and allow it.",
    refus: "Motion sensors were refused. Allow them in your browser settings, or look at the example below.",
    capteur: "No accelerometer detected. Open this page on your phone — or look at an example jump.",
    raisons: {
      aucun: "No jump detected. Keep the phone tight against your chest and jump for real: the accelerometer doesn't judge.",
      coupe: "The jump was cut off by the recording window. Jump right on “Jump!”.",
      lance: "That flight time is beyond human. Did the phone take off on its own?"
    },
    verdicts: [
      [55, "Elite level. Check that you didn't throw the phone."],
      [42, "Pro basketball player level. Shall we call the federation?"],
      [32, "Good level: above the adult average."],
      [22, "Honest. An after-work crowd would applaud."],
      [10, "Monday-morning-meeting jump."],
      [0, "The phone barely left the ground. Try again — jump like nobody's measuring."]
    ],
    vol: "flight time", essai: "Attempt", meilleur: "best", exemple: "example jump",
    courbe: "Acceleration measured by the phone (in g). Shaded: the flight, when the phone is in free fall."
  } : {
    pret: "Préparez-vous : téléphone plaqué contre la poitrine, bras croisés.",
    compte: ["3", "2", "1"],
    saute: "Sautez !",
    analyse: "Mesure…",
    permission: "Votre téléphone a demandé l'accès aux capteurs de mouvement : touchez de nouveau « Commencer » et autorisez-le.",
    refus: "L'accès aux capteurs de mouvement a été refusé. Autorisez-le dans les réglages du navigateur, ou regardez l'exemple ci-dessous.",
    capteur: "Aucun accéléromètre détecté. Ouvrez cette page sur votre téléphone — ou regardez un saut d'exemple.",
    raisons: {
      aucun: "Pas de saut détecté. Gardez le téléphone bien plaqué et sautez vraiment : l'accéléromètre ne juge pas.",
      coupe: "Le saut a été coupé par la fenêtre d'enregistrement. Sautez dès le « Sautez ! ».",
      lance: "Ce temps de vol dépasse l'humain. Le téléphone serait-il parti tout seul ?"
    },
    verdicts: [
      [55, "Niveau élite. Vérifiez que vous n'avez pas lancé le téléphone."],
      [42, "Niveau basketteur pro. On appelle la fédération ?"],
      [32, "Bon niveau : au-dessus de la moyenne des adultes."],
      [22, "Honnête. Un public d'after-work applaudirait."],
      [10, "Saut de réunion du lundi matin."],
      [0, "Le téléphone a à peine décollé. Recommencez en sautant comme si personne ne mesurait."]
    ],
    vol: "temps de vol", essai: "Essai", meilleur: "meilleur", exemple: "saut d'exemple",
    courbe: "Accélération mesurée par le téléphone (en g). En grisé : le vol, quand le téléphone est en chute libre."
  };

  var bouton = outil.querySelector("[data-detente-go]");
  var boutonEx = outil.querySelector("[data-detente-exemple]");
  var message = outil.querySelector("[data-detente-message]");
  var resultat = outil.querySelector("[data-detente-resultat]");
  var q = function (s) { return outil.querySelector(s); };
  var essais = [];

  function dire(t, fort) {
    message.textContent = t || "";
    message.classList.toggle("fort", !!fort);
  }

  function virgule(x, d) { var s = x.toFixed(d); return EN ? s : s.replace(".", ","); }

  /* -------------------------------------------------- ENREGISTREMENT */

  var echantillons = [], ecoute = false, t0 = 0;

  function surMouvement(ev) {
    var g = ev.accelerationIncludingGravity;
    if (!g || g.x == null) return;
    echantillons.push({ t: performance.now() - t0, a: Math.sqrt(g.x * g.x + g.y * g.y + g.z * g.z) });
  }

  function autoriser() {
    // iOS 13+ : la permission DOIT être demandée pendant le geste (le clic).
    if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
      return DeviceMotionEvent.requestPermission();
    }
    return Promise.resolve("granted");
  }

  function vibrer(ms) { if (navigator.vibrate) navigator.vibrate(ms); }

  function lancer() {
    bouton.disabled = true;
    autoriser().then(function (etat) {
      if (etat !== "granted") { dire(T.refus); bouton.disabled = false; return; }
      echantillons = []; t0 = performance.now();
      if (!ecoute) { window.addEventListener("devicemotion", surMouvement); ecoute = true; }
      dire(T.pret, true);
      var etapes = T.compte.slice();
      var i = 0;
      var minuteur = setInterval(function () {
        if (i < etapes.length) { dire(etapes[i], true); vibrer(40); i++; return; }
        clearInterval(minuteur);
        // Aucun échantillon reçu pendant le compte à rebours : pas de capteur.
        if (!echantillons.length) {
          window.removeEventListener("devicemotion", surMouvement); ecoute = false;
          dire(T.capteur); bouton.disabled = false; boutonEx.hidden = false;
          return;
        }
        echantillons = [];          // on ne garde que la fenêtre du saut
        t0 = performance.now();
        dire(T.saute, true); vibrer(200);
        setTimeout(terminer, 3200);
      }, 900);
    }).catch(function () { dire(T.permission); bouton.disabled = false; });
  }

  function terminer() {
    window.removeEventListener("devicemotion", surMouvement); ecoute = false;
    bouton.disabled = false;
    var m = mesurer(echantillons);
    if (!m.ok) { dire(T.raisons[m.raison] || T.raisons.aucun); return; }
    vibrer([60, 60, 60]);
    dire("");
    essais.push(m.hauteur);
    afficher(m, echantillons, false);
  }

  /* ------------------------------------------------------- AFFICHAGE */

  function afficher(m, e, demo) {
    resultat.hidden = false;
    q("[data-detente-cm]").textContent = virgule(m.hauteur, 1);
    q("[data-detente-vol]").textContent = T.vol + " " + Math.round(m.vol * 1000) + " ms" + (demo ? " · " + T.exemple : "");
    q("[data-detente-verdict]").textContent = T.verdicts.filter(function (v) { return m.hauteur >= v[0]; })[0][1];

    // Les repères, avec le saut placé parmi eux.
    var echelle = q("[data-detente-echelle]");
    echelle.textContent = "";
    var max = Math.max(60, m.hauteur + 5);
    REPERES.concat([{ cm: m.hauteur, fr: "Vous", en: "You", vous: true }])
      .sort(function (a, b) { return a.cm - b.cm; })
      .forEach(function (r) {
        var li = document.createElement("li");
        if (r.vous) li.className = "vous";
        var nom = document.createElement("span"); nom.textContent = r[L];
        var piste = document.createElement("i");
        var barre = document.createElement("b"); barre.style.width = (100 * r.cm / max).toFixed(1) + "%";
        piste.appendChild(barre);
        var val = document.createElement("em"); val.textContent = Math.round(r.cm) + " cm";
        li.appendChild(nom); li.appendChild(piste); li.appendChild(val);
        echelle.appendChild(li);
      });

    // Les essais de la séance.
    var liste = q("[data-detente-essais]");
    liste.textContent = "";
    if (!demo && essais.length > 1) {
      var best = Math.max.apply(null, essais);
      essais.forEach(function (h, i) {
        var li = document.createElement("li");
        li.textContent = T.essai + " " + (i + 1) + " : " + virgule(h, 1) + " cm" + (h === best ? " — " + T.meilleur : "");
        liste.appendChild(li);
      });
    }
    liste.hidden = !liste.children.length;

    tracer(e, m);
    resultat.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* La courbe, en SVG : c'est la donnée brute, celle qu'un préparateur
     physique lirait sur sa plateforme de force. */
  function tracer(e, m) {
    var svg = q("[data-detente-courbe]");
    // Dessinée à la largeur réelle : les graduations restent à 12 px, même
    // sur un téléphone (un viewBox fixe les réduirait à 6 px).
    var W = Math.round(svg.getBoundingClientRect().width) || 600, H = Math.max(160, Math.round(W * 0.3)), P = 24;
    var tMax = e[e.length - 1].t || 1;
    var aMax = 4 * G;
    var x = function (t) { return P + (W - 2 * P) * t / tMax; };
    var y = function (a) { return H - P - (H - 2 * P) * Math.min(a, aMax) / aMax; };
    var points = e.map(function (s) { return x(s.t).toFixed(1) + "," + y(s.a).toFixed(1); }).join(" ");
    var lignesG = [0, 1, 2, 3, 4].map(function (k) {
      var yy = y(k * G).toFixed(1);
      return '<line class="grille" x1="' + P + '" x2="' + (W - P) + '" y1="' + yy + '" y2="' + yy + '"/>' +
             '<text class="axe" x="2" y="' + (+yy + 4) + '">' + k + "g</text>";
    }).join("");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.innerHTML =
      lignesG +
      '<rect class="vol" x="' + x(m.decollage).toFixed(1) + '" y="' + P + '" width="' + (x(m.atterrissage) - x(m.decollage)).toFixed(1) + '" height="' + (H - 2 * P) + '"/>' +
      '<polyline class="trace" points="' + points + '"/>';
    q("[data-detente-legende]").textContent = T.courbe;
  }

  bouton.addEventListener("click", lancer);
  boutonEx.addEventListener("click", function () {
    var e = exemple();
    afficher(mesurer(e), e, true);
  });

  outil.classList.add("pret");

})(typeof window !== "undefined" ? window : globalThis);
