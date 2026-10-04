/* ============================================================================
   LA SOURCE UNIQUE DU PROFIL DE CLÉMENT.

   Tout ce qui décrit le parcours vit ICI, une seule fois, en français et en
   anglais. `npm run generer` en tire :
     - les blocs Parcours / Formation des pages d'accueil (FR + EN),
     - les blocs Expérience / Formation / Compétences / Langues / Divers et la
       ligne de localisation des CV (FR + EN),
     - chat-worker/profil.js, ce que sait l'assistant.
   Ne JAMAIS retoucher ces blocs à la main dans les .html (ils sont entre des
   marqueurs <!-- GEN:… --> et seront écrasés) : on corrige ici, on régénère.

   Champs :
     site:false          → n'apparaît que dans l'assistant (pas sur le site/CV)
     cv: { … }           → variantes propres au CV (titre, lieu, puces…)
     assistant: [ … ]    → détails supplémentaires que seul l'assistant connaît
   Tout ce qui est écrit ici est PUBLIC (site ou assistant) : jamais un nom
   d'athlète, jamais une donnée confidentielle.
   ========================================================================= */

export const identite = {
  nom: "Clément Verdier",
  mail: "clement.verdier@laposte.net",
  tel: "07 82 19 99 98",
  linkedin: "https://www.linkedin.com/in/cl%C3%A9ment-verdier-a542941b7",
  github: "https://github.com/Clement0242",
  cv: "https://clement0242.github.io/cv/",
  // En-tête du CV
  lieuCv: { fr: "Paris — mobile (permis B + véhicule)", en: "Paris, France — full driving licence" },
  // Pour l'assistant
  lieu: "Basé à Paris. Mobile partout : en France comme à l'étranger. Permis B et véhicule.",
  recherche: "Ouvert à TOUT type d'opportunité : poste salarié (CDI, CDD), freelance/mission, thèse ; temps plein ou partiel ; club professionnel, fédération, laboratoire de recherche ou entreprise de tech sportive ; en France ou à l'étranger. Il répond toujours.",
  resume: "Ingénieur en informatique et statistique (Polytech Lille), formé ensuite à l'optimisation de la performance sportive (master STAPS EOPS). Il travaille à la frontière entre l'architecture des systèmes d'information et les sciences du sport de haut niveau : il sait écrire le pipeline ET savoir ce que la mesure veut dire.",
};

export const pourquoi = [
  "Le sport : grand sportif lui-même (football depuis l'âge de 5 ans), il aime ce que le sport dégage — le dépassement de soi, le dépassement des capacités physiques et de l'être humain.",
  "La data : il veut comprendre POURQUOI. Avoir des chiffres pour comprendre comment un athlète en est arrivé là, et aider à la décision. Pour lui, la data, c'est comme la relecture d'une histoire.",
];

export const personnalite = [
  "Plein d'idées.",
  "Agréable dans un groupe : drôle, joyeux, souriant, sociable.",
  "Hyper curieux, sur tous les domaines (histoire, maths…). Exemple : après son diplôme d'ingénieur, il s'est inscrit en master STAPS parce qu'il sentait qu'il lui manquait des connaissances en physiologie, biologie et biomécanique. Il aime pousser ses recherches jusqu'au bout pour vraiment comprendre le domaine dans lequel il travaille.",
  "Défaut assumé : assez obstiné, il n'aime pas avoir tort — alors il ne parle pas quand il ne sait pas, et il a du mal à croire ce qu'il ne peut pas vérifier. C'est justement ce qui le passionne dans la data : elle permet de tout vérifier, dès que c'est quantifiable.",
  "Centres d'intérêt : économie, histoire, histoire du sport, nouvelles technologies, football (il a été responsable de l'équipe de football de Polytech Lille et a organisé le voyage annuel au ski de l'école).",
];

/* ------------------------------------------------------------ EXPÉRIENCE */
/* ⚠️ Dates À CONFIRMER par Clément (04/10/2026) : le stage « INSEP janv.
   2024 → janv. 2025 » chevauche l'échange en Argentine (mars 2024 → fév.
   2025) et ses rapports parlent d'un stage aviron (avril → août 2024) puis
   d'un stage basket (2024-2025). Corriger ici, une seule fois. */

export const experiences = [
  {
    periode: { fr: ["Jan. 2025", "présent"], en: ["Jan. 2025", "present"] }, iso: "2025-01",
    titre: { fr: "Ingénieur de recherche data & performance analyst", en: "Research data engineer & performance analyst" },
    org: { fr: "INSEP / Fédération Française de Basketball", en: "INSEP / French Basketball Federation" },
    lieu: { fr: "Paris", en: "Paris" },
    puces: {
      fr: [
        "Cartographie des flux de données athlètes, dictionnaires de données et règles de gouvernance pour garantir l'intégrité du patrimoine fédéral.",
        "Pipelines ETL automatisés et connecteurs API en Python et SQL, pour intégrer des flux hétérogènes de capteurs et de systèmes de tracking.",
        "Mécanismes de contrôle qualité et procédures de fiabilisation des données collectées sur le terrain.",
        "Modélisation de la charge d'entraînement, analyse des profils mécaniques (puissance, force-vitesse) et outils d'aide à la décision pour les staffs techniques.",
      ],
      en: [
        "Mapping athlete data flows, building data dictionaries and governance rules to protect the integrity of the federation's data estate.",
        "Automated ETL pipelines and API connectors in Python and SQL, integrating heterogeneous sensor and tracking feeds.",
        "Quality-control mechanisms and procedures that make field-collected data trustworthy.",
        "Training-load modelling, mechanical profiling (power, force–velocity) and decision-support tooling for coaching staff.",
      ],
    },
    cv: {
      puces: {
        fr: [
          "Cartographie des flux de données athlètes, élaboration de dictionnaires de données et définition des règles de gouvernance pour garantir l'intégrité du patrimoine fédéral.",
          "Développement de pipelines ETL automatisés et de connecteurs API en Python et SQL, pour intégrer des flux hétérogènes de capteurs et de systèmes de tracking.",
          "Mise en place de mécanismes de contrôle qualité et de procédures de fiabilisation des données collectées sur le terrain.",
          "Modélisation de la charge d'entraînement, analyse des profils mécaniques (puissance, force-vitesse) et restitution d'outils d'aide à la décision pour les staffs techniques.",
          "Création, évolution et documentation de rapports interactifs sous Power BI ; accompagnement et formation des utilisateurs finaux.",
        ],
        en: [
          "Mapping athlete data flows, building data dictionaries and defining governance rules to protect the integrity of the federation's data estate.",
          "Developing automated ETL pipelines and API connectors in Python and SQL to integrate heterogeneous sensor and tracking feeds.",
          "Implementing quality-control mechanisms and procedures that make field-collected data trustworthy.",
          "Training-load modelling, mechanical profiling (power, force–velocity) and decision-support tooling for coaching staff.",
          "Building, maintaining and documenting advanced interactive Power BI reports; onboarding and training end users.",
        ],
      },
    },
    assistant: [
      "Travaille avec le Pôle France de basket de l'INSEP, c'est-à-dire les équipes de France jeunes (joueurs et joueuses de 15 à 18 ans), en étroite collaboration avec le préparateur physique du Pôle et le laboratoire IRMES.",
      "Mise en place et structuration de la donnée ; connecteurs vers le système de positionnement local Kinexon (LPS, capteurs portés par les joueurs, positions à 20-25 Hz) et les plateformes de force Kinvent.",
      "Contribution à la recherche de haut niveau : rédaction d'articles scientifiques ; une publication est en cours (ne pas en donner le titre ni la revue, non publics).",
      "Travaille en équipe avec le staff (entraîneurs, préparation physique, chercheurs, médecins). Anecdote qu'il aime raconter : il a dû présenter son travail à Tony Parker.",
    ],
  },
  {
    periode: { fr: ["Août 2026", "présent"], en: ["Aug. 2026", "present"] }, iso: "2026-08",
    titre: { fr: "Consultant data & sport science, indépendant", en: "Independent data & sport science consultant" },
    org: { fr: "Activité indépendante", en: "Self-employed" },
    lieu: { fr: "France", en: "France" },
    puces: {
      fr: [
        "Accompagnement de structures sportives professionnelles : conception d'architectures de données, intégration d'API, modélisation statistique.",
        "Conception de tableaux de bord sur mesure et optimisation de flux de données existants.",
      ],
      en: [
        "Supporting professional sport organisations: data architecture design, API integration, advanced statistical modelling.",
        "Bespoke dashboard design and optimisation of existing data flows.",
      ],
    },
    cv: {
      titre: { fr: "Consultant data & sport science — indépendant", en: "Independent data & sport science consultant" },
      puces: {
        fr: [
          "Accompagnement de structures sportives professionnelles : conception d'architectures de données, intégration d'API et modélisation statistique avancée.",
          "Prestations en analyse de données et business intelligence : conception de tableaux de bord sur mesure, optimisation de flux existants.",
        ],
        en: [
          "Supporting professional sport organisations: data architecture design, API integration and advanced statistical modelling.",
          "Data analysis and business intelligence engagements: bespoke dashboard design, optimisation of existing data flows.",
        ],
      },
    },
    assistant: [
      "Sa mission principale : ScoutBase, la plateforme de scouting football (voir PROJETS), qui mêle plusieurs sources de données pour aider la prise de décision dans le recrutement de haut niveau.",
    ],
  },
  {
    periode: { fr: ["Jan. 2024", "jan. 2025"], en: ["Jan. 2024", "Jan. 2025"] }, iso: "2024-01",
    titre: { fr: "Data analyst — stage", en: "Data analyst — internship" },
    org: { fr: "INSEP", en: "INSEP" },
    lieu: { fr: "Paris", en: "Paris" },
    puces: {
      fr: [
        "Nettoyage, traitement et modélisation de données quantitatives de haute performance.",
        "Industrialisation des processus d'analyse, automatisation en Python et SQL.",
        "Tableaux de bord interactifs et documentation technique des indicateurs de suivi athlétique.",
      ],
      en: [
        "Cleaning, processing and modelling quantitative high-performance datasets.",
        "Industrialising analysis workflows through Python and SQL automation.",
        "Interactive dashboards and technical documentation of athlete-monitoring indicators.",
      ],
    },
    cv: {
      titre: { fr: "Data analyst — stage de fin d'études", en: "Data analyst — final-year internship" },
      puces: {
        fr: [
          "Nettoyage, fiabilisation et modélisation de jeux de données quantitatives de haute performance.",
          "Industrialisation des processus d'analyse par automatisation en Python et SQL.",
          "Tableaux de bord interactifs et documentation technique des indicateurs de suivi athlétique.",
        ],
        en: [
          "Cleaning, validating and modelling quantitative high-performance datasets.",
          "Industrialising analysis workflows through Python and SQL automation.",
          "Interactive dashboards and technical documentation of athlete-monitoring indicators.",
        ],
      },
    },
    assistant: [
      "Stage de fin d'études d'ingénieur au laboratoire IRMES de l'INSEP, sous la direction du Dr Adrien Sedeaud, en collaboration avec Yannis Irid (doctorant IRMES & FFBB). Sujet : analyse longitudinale des performances en match des basketteurs du Pôle France.",
      "Données : positions Kinexon (LPS) + statistiques officielles de match NM1/NF1 ; chaîne de collecte automatisée (API Kinexon, Apache Airflow, base de données Azure), analyses en R.",
      "Méthodes : modèles mixtes linéaires (lme4), comparaison de formes de trajectoires (polynômes, splines, GAM ; sélection par AIC/BIC), classification des profils de progression (k-means, hiérarchique, fuzzy c-means), tests adaptatifs (ANOVA / Kruskal-Wallis).",
      "Résultat marquant : avec l'âge, l'efficacité de jeu (évaluation FIBA) progresse alors que l'activité physique brute (accélérations, vitesse moyenne, changements de direction) diminue — les joueurs gagnent en efficacité plutôt qu'en intensité. Les « progresseurs » ne se distinguent pas par une amélioration physique plus rapide mais par un niveau athlétique de base plus élevé (vitesse max, hauteur de saut, accélération max).",
    ],
  },
  {
    site: false,
    periode: { fr: ["2024", "3 mois"], en: ["2024", "3 months"] },
    titre: { fr: "Stage de 4e année d'ingénieur — data science", en: "" },
    org: { fr: "IRMES, INSEP, en partenariat avec la Fédération Française d'Aviron", en: "" },
    lieu: { fr: "Paris", en: "" },
    assistant: [
      "Encadré par Quentin De Larochelambert, projet « Estimation & Trajectoires ». Base de plus de 43 000 tests ergométriques sur 2000 m depuis 1996.",
      "Effet de l'âge relatif : surreprésentation des athlètes nés au 1er trimestre dans le Programme Performance Jeune.",
      "Abandon sportif (courbes de Kaplan-Meier, test du log-rank) : les jeunes femmes abandonnent significativement plus à partir de 16 ans ; les moins performants abandonnent beaucoup plus ; les rameurs nés en fin d'année n'abandonnent pas davantage malgré des performances initiales plus faibles.",
      "Modèles âge-performance (équations de Moore et IMAP) en modèle mixte bayésien (Stan, MCMC/NUTS), avec une procédure de validation croisée qu'il a ajoutée.",
      "Âge biologique : estimation du pic de croissance (package R sitar) et lien avec la performance ; l'étude pilote a incité la Fédération d'aviron à collecter des données plus tôt chez les jeunes.",
    ],
  },
  {
    site: false,
    periode: { fr: ["2023", "2 mois"], en: ["2023", "2 months"] },
    titre: { fr: "Stage de 3e année — aide à la décision", en: "" },
    org: { fr: "AS Saint-Étienne (football)", en: "" },
    lieu: { fr: "Saint-Étienne", en: "" },
    assistant: [
      "Outils d'aide à la décision pour le recrutement et la préparation des matchs : analyse des blessures des joueurs en vue du recrutement, suivi des points gagnés comparés aux 10 dernières saisons de Ligue 2, analyse des performances des arbitres.",
    ],
  },
];

/* ------------------------------------------------------------- FORMATION */

export const formations = [
  {
    periode: { fr: ["2025", "2026"], en: ["2025", "2026"] }, iso: "2025",
    titre: { fr: "Master — Entraînement et optimisation de la performance sportive", en: "MSc — Training and optimisation of athletic performance" },
    org: { fr: "Université Jean Monnet, STAPS", en: "Université Jean Monnet, Sport Science" },
    lieu: { fr: "Saint-Étienne", en: "Saint-Étienne" },
    puces: {
      fr: ["Physiologie de l'effort, biomécanique, planification de la charge d'entraînement, recherche appliquée au sport d'élite."],
      en: ["Exercise physiology, biomechanics, training-load planning, applied research in elite sport."],
    },
    cv: { titre: { fr: "Master — Entraînement et optimisation de la performance sportive (EOPS)", en: "MSc — Training and optimisation of athletic performance" } },
    assistant: [
      "Mémoire : « Profil accélération-vitesse in situ issu d'un système de positionnement local : une preuve de concept chez de jeunes joueurs de basket-ball d'élite » (direction : Damien Freyssenet et Yannis Irid). 22 joueurs et joueuses d'élite suivis en match avec Kinexon, comparés à un sprint linéaire de 28 m.",
      "Traitement : filtre de Kalman + lissage RTS, nettoyage par densité (k-NN), trois méthodes de profil (intervalle de confiance, Tukey, et une enveloppe hyperbolique-exponentielle qu'il a formulée et ajustée par Nelder-Mead).",
      "Résultats : en basket, l'accélération maximale estimée en match est systématiquement surestimée (+18 à 27 %) par rapport au sprint, alors que la vitesse maximale est bien estimée par les méthodes intervalle de confiance et Tukey (biais < 1 %). Conclusion : le profil in situ est un outil complémentaire de suivi, pas un substitut au test de sprint.",
    ],
  },
  {
    periode: { fr: ["2020", "2025"], en: ["2020", "2025"] }, iso: "2020",
    titre: { fr: "Diplôme d'ingénieur — informatique, statistique et IA", en: "Engineering degree — computer science, statistics and AI" },
    org: { fr: "Polytech Lille, filière ISIA", en: "Polytech Lille, ISIA programme" },
    lieu: { fr: "Bac+5", en: "five-year degree" },
    puces: {
      fr: [
        "Architecture des systèmes d'information, gouvernance et modélisation de données.",
        "Programmation avancée (Python, R), bases de données, conception d'API, statistiques appliquées.",
      ],
      en: [
        "Information-systems architecture, data governance and modelling.",
        "Advanced programming (Python, R), databases, API design, applied statistics.",
      ],
    },
    cv: {
      titre: { fr: "Diplôme d'ingénieur (Bac+5) — Informatique, statistique et IA", en: "Engineering degree — computer science, statistics and AI" },
      lieu: { fr: "Lille", en: "Lille" },
      puces: {
        fr: [
          "Architecture des systèmes d'information, gouvernance et modélisation de données, conception d'API.",
          "Programmation avancée (Python, R), bases de données (SQL), statistiques appliquées, business intelligence.",
        ],
        en: [
          "Information-systems architecture, data governance and data modelling, API design.",
          "Advanced programming (Python, R), databases (SQL), applied statistics, business intelligence.",
        ],
      },
    },
  },
  {
    periode: { fr: ["Mars 2024", "fév. 2025"], en: ["Mar. 2024", "Feb. 2025"] }, iso: "2024-03",
    titre: { fr: "Échange universitaire — informatique et statistiques", en: "Exchange year — computer science and statistics" },
    org: { fr: "Universidad Nacional del Sur", en: "Universidad Nacional del Sur" },
    lieu: { fr: "Bahía Blanca, Argentine", en: "Bahía Blanca, Argentina" },
    puces: {
      fr: ["Une année académique complète suivie en espagnol. C'est de là que vient le C1."],
      en: ["A full academic year taught in Spanish. That is where the C1 comes from."],
    },
    cv: {
      titre: { fr: "Échange universitaire — Informatique et statistiques", en: "Exchange year — computer science and statistics" },
      puces: { fr: ["Une année académique complète suivie en espagnol."], en: ["A full academic year taught in Spanish."] },
    },
  },
  {
    site: false,
    periode: { fr: ["2020", "2022"], en: ["2020", "2022"] },
    titre: { fr: "DUT STID (Statistique et informatique décisionnelle)", en: "" },
    org: { fr: "IUT", en: "" },
    lieu: { fr: "Saint-Martin-d'Hères", en: "" },
  },
];

/* ------------------------------------------------- COLONNE DU CV + ASSISTANT */

export const competences = {
  cv: [
    { titre: { fr: "Gouvernance & ingénierie SI", en: "Governance & IS engineering" },
      items: { fr: ["Gouvernance de la donnée", "Cartographie des flux, API, SQL", "Dictionnaires de données", "Contrôle qualité, documentation"],
               en: ["Data governance", "Flow mapping, APIs, SQL", "Data dictionaries", "Quality control, documentation"] } },
    { titre: { fr: "Data science", en: "Data science" },
      items: { fr: ["Python — Pandas, NumPy, Scikit-learn", "R, statistiques appliquées", "SQL, modélisation décisionnelle"],
               en: ["Python — Pandas, NumPy, Scikit-learn", "R, applied statistics", "SQL, decision modelling"] } },
    { titre: { fr: "Sciences du sport", en: "Sport science" },
      items: { fr: ["Physiologie de l'effort", "Modélisation de la charge", "Profils force-vitesse, GPS / LPS"],
               en: ["Exercise physiology", "Training-load modelling", "Force–velocity profiles, GPS / LPS"] } },
    { titre: { fr: "Restitution", en: "Reporting" },
      items: { fr: ["Power BI — DAX, Power Query", "Streamlit, R Shiny", "Excel avancé, M365"],
               en: ["Power BI — DAX, Power Query", "Streamlit, R Shiny", "Advanced Excel, M365"] } },
  ],
  // L'assistant en sait plus que la colonne du CV (qui doit tenir sur 2 pages).
  assistant: [
    "Gouvernance & ingénierie SI : gouvernance de la donnée, cartographie des flux, API REST, SQL, Azure, Apache Airflow, contrôle qualité, documentation.",
    "Data science & statistiques : Python (Pandas, NumPy, SciPy, Scikit-learn, Pingouin), R (lme4, sitar), Stan ; modèles mixtes, modèles bayésiens, analyse de survie, clustering, filtrage de Kalman, tests statistiques, validation croisée, accord de mesures (Bland-Altman, ICC).",
    "Développement : Django, MySQL, scraping (Playwright), applications web en production.",
    "Sciences du sport : physiologie de l'effort, biomécanique, charge d'entraînement, profils force-vitesse et accélération-vitesse, GPS / LPS, âge relatif et maturation.",
    "Restitution : Power BI (DAX, Power Query), Streamlit, R Shiny, Tableau, Excel avancé.",
  ],
};

export const langues = [
  { nom: { fr: "Français", en: "French" }, niveau: { fr: "Natif", en: "Native" }, jauge: 100 },
  { nom: { fr: "Anglais", en: "English" }, niveau: { fr: "Courant — C1", en: "Fluent — C1" }, jauge: 80 },
  { nom: { fr: "Espagnol", en: "Spanish" }, niveau: { fr: "Courant — C1", en: "Fluent — C1" }, jauge: 80 },
];

export const divers = {
  fr: ["Permis B + véhicule", "Basé à Paris, mobile en France"],
  en: ["Full driving licence, own vehicle", "Based in Paris, mobile across France"],
};

/* ------------------------------------------------- RESTE : ASSISTANT SEUL */

export const domaines = [
  "Gouvernance de la donnée : cartographier les flux, écrire les dictionnaires de données, poser les règles d'intégrité.",
  "Pipelines & capteurs : connecteurs API et chaînes ETL qui font entrer GPS, LPS, tracking et plateformes de force dans un référentiel unique, avec contrôles qualité.",
  "Modélisation de l'effort : charge d'entraînement, profils force-vitesse et accélération-vitesse, estimation du potentiel d'un jeune athlète en tenant compte de ses âges relatif, biologique et d'entraînement.",
  "Aide à la décision : tableaux de bord et restitutions utilisables par un staff un lundi matin, et formation des personnes qui s'en servent.",
];

export const projets = [
  "ScoutBase, plateforme de scouting football (en production, application privée — pas sur GitHub) : outil de recrutement de haut niveau qui croise plusieurs sources de données (statistiques de match, données physiques, valeurs marchandes, rapports de scouts) pour aider la décision — vivier de plusieurs dizaines de milliers de joueurs, note de performance par poste et par saison, rapports de terrain cloisonnés par scout, projections de trajectoire, assistant de recherche en langage naturel. Ne pas citer de club client.",
  "Monitoring athlètes basketball (Fédération Française de Basketball, application interne — pas sur GitHub) : agrégation des mesures de charge et de bien-être, restitution aux staffs, alertes sur les écarts.",
  "Récupération de données LPS (public) : client Python pour l'API Kinexon. https://github.com/Clement0242/Kinexon_API_recuperation",
  "Client API Kinvent (public) : participants, protocoles, métriques de force et d'équilibre. https://github.com/Clement0242/Kinvent_api",
  "Extraction des statistiques FFBB (public) : scraper des feuilles de match officielles (NM1, LF2, Pro B). https://github.com/Clement0242/Scrap_NM1_LF2",
  "Analyse des décélérations (recherche, R) : les phases de décélération, le versant le plus coûteux de la locomotion et le plus négligé dans le suivi de charge.",
];

export const interventions = [
  "5 mars 2025 — Séminaire du réseau Grand INSEP « Le développement des jeunes athlètes », INSEP Paris : intervenant de la session « Outils pour la détection et le recrutement », aux côtés d'Adrien Sedeaud et Quentin De Larochelambert (INSEP / IRMES), Cédric Leduc (PSG), Elie Rambaud (OL Academy) et des fédérations de cyclisme, triathlon, aviron et football.",
  "Publication scientifique en cours (titre et revue non encore publics). Ne jamais inventer de référence.",
];

export const nonRenseigne = "prétentions salariales, date exacte de disponibilité, vie privée, opinions, noms d'athlètes, clients non cités ici, références de personnes à contacter.";
