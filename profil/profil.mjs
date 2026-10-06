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
      items: { fr: ["Python — Pandas, NumPy, Scikit-learn", "Machine learning — clustering, modèles mixtes, bayésien", "R, statistiques appliquées", "SQL, modélisation décisionnelle"],
               en: ["Python — Pandas, NumPy, Scikit-learn", "Machine learning — clustering, mixed models, Bayesian", "R, applied statistics", "SQL, decision modelling"] } },
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
  "ATS maison (https://clement0242.github.io/ats/) : on colle une offre d'emploi, un petit algorithme de NLP/machine learning écrit par Clément (TF-IDF, similarité cosinus, score logistique, calculé dans le navigateur ; l'offre peut aussi être importée en PDF) la compare à son parcours et rend une note sur 100 avec ses points forts ET ses points faibles. Sur demande, une IA gratuite rédige un avis neutre à partir de ce résultat, ou met en forme une offre à partir de notes en vrac. C'est un outil à tester sur le site, pas une ligne du CV.",
  "Analyse des décélérations (recherche, R) : les phases de décélération, le versant le plus coûteux de la locomotion et le plus négligé dans le suivi de charge.",
];

export const interventions = [
  "5 mars 2025 — Séminaire du réseau Grand INSEP « Le développement des jeunes athlètes », INSEP Paris : intervenant de la session « Outils pour la détection et le recrutement », aux côtés d'Adrien Sedeaud et Quentin De Larochelambert (INSEP / IRMES), Cédric Leduc (PSG), Elie Rambaud (OL Academy) et des fédérations de cyclisme, triathlon, aviron et football.",
  "Publication scientifique en cours (titre et revue non encore publics). Ne jamais inventer de référence.",
];

/* --------------------------------------------------- L'ATS MAISON (ats/) */
/* Ce que l'ATS cherche dans une offre, et ce que Clément en a. Généré dans
   assets/js/ats-profil.js par `npm run generer`.
     niveau : 3 = au quotidien / en production, 2 = pratiqué sur projets,
              1 = notions, 0 = non → devient un point « − » (assumé).
     mots   : formes cherchées dans l'offre, en minuscules ; les accents et la
              ponctuation sont ignorés. Un * final accepte toute fin de mot
              (« statisti* » → statistique, statistiques, statisticien).
     poids  : importance dans la note (1 par défaut).
     dit    : ce que l'outil affiche. Ton léger, mais RIEN d'inventé.
   ⚠️ À CONFIRMER par Clément (05/10/2026) : les niveaux 0 et 1 (deep learning,
   cloud AWS/GCP, Docker/Kubernetes, Java/C++, front-end, stage) sont déduits
   de leur ABSENCE du profil, pas d'une déclaration. Corriger ici. */

export const ats = {
  debutPro: "2024-01",   // pour compter les années d'expérience
  competences: [
    // ----- langages et science des données
    { id: "python", niveau: 3, poids: 1.5, nom: { fr: "Python", en: "Python" },
      mots: ["python", "pandas", "numpy", "scipy"],
      dit: { fr: "Tous les jours : pipelines ETL, Pandas, NumPy, Scikit-learn.", en: "Every day: ETL pipelines, Pandas, NumPy, Scikit-learn." } },
    { id: "sql", niveau: 3, poids: 1.5, nom: { fr: "SQL", en: "SQL" },
      mots: ["sql", "mysql", "postgres*", "base* de donnees", "database*", "sgbd"],
      dit: { fr: "MySQL en production (ScoutBase), modélisation de bases fédérales.", en: "MySQL in production (ScoutBase), federation database modelling." } },
    { id: "r", niveau: 3, nom: { fr: "R", en: "R" },
      mots: ["langage r", "rstudio", "tidyverse", "ggplot*", "dplyr", "python r", "r python", "python et r", "r et python", "python ou r", "r ou python", "python and r", "r and python", "python or r", "r or python"],
      dit: { fr: "lme4, sitar, Shiny : la langue maternelle des labos.", en: "lme4, sitar, Shiny: the native tongue of research labs." } },
    { id: "ml", niveau: 2, poids: 1.5, nom: { fr: "Machine learning", en: "Machine learning" },
      mots: ["machine learning", "apprentissage automatique", "ml", "scikit learn", "sklearn", "clustering", "classification", "random forest", "xgboost", "modele* predictif*", "predictive model*", "data scien*", "intelligence artificielle", "ia", "artificial intelligence"],
      dit: { fr: "Clustering de profils de progression (k-means, CAH, fuzzy c-means), validation croisée, Scikit-learn. Et cet ATS, qui lit votre offre en ce moment.", en: "Clustering of progression profiles (k-means, hierarchical, fuzzy c-means), cross-validation, Scikit-learn. And this ATS, which is reading your job ad right now." } },
    { id: "stats", niveau: 3, poids: 1.5, nom: { fr: "Statistiques", en: "Statistics" },
      mots: ["statisti*", "biostat*", "modele* mixte*", "mixed model*", "mixed effect*", "bayesien*", "bayesian", "inference", "econometr*", "series temporelles", "time series", "analyse de survie", "survival analysis", "regression*", "anova"],
      dit: { fr: "Modèles mixtes (lme4), bayésien (Stan), analyse de survie, filtre de Kalman. Diplôme d'ingé en statistique, rien que ça.", en: "Mixed models (lme4), Bayesian (Stan), survival analysis, Kalman filtering. An engineering degree in statistics, no less." } },
    { id: "llm", niveau: 2, nom: { fr: "IA générative / LLM", en: "Generative AI / LLMs" },
      mots: ["llm*", "ia generative", "generative ai", "genai", "openai", "gpt*", "rag", "prompt*", "langchain", "chatbot*", "large language model*"],
      dit: { fr: "L'assistant IA de son site, c'est lui (relais, cascade de modèles, tests de non-régression). Plus un assistant de recherche en langage naturel dans ScoutBase.", en: "The AI assistant on his site is his (relay, model cascade, regression tests). Plus a natural-language search assistant inside ScoutBase." } },
    { id: "dl", niveau: 1, nom: { fr: "Deep learning", en: "Deep learning" },
      mots: ["deep learning", "apprentissage profond", "pytorch", "tensorflow", "keras", "reseau* de neurones", "neural network*", "computer vision", "vision par ordinateur"],
      dit: { fr: "Notions seulement, rien en production. Son ML à lui, c'est le clustering, les modèles mixtes et le bayésien — souvent ce qu'il faut quand on a 22 joueurs et pas 22 millions d'images.", en: "Basics only, nothing in production. His ML is clustering, mixed models and Bayesian stats — usually what you need with 22 players rather than 22 million images." } },

    // ----- ingénierie des données
    { id: "etl", niveau: 3, poids: 1.5, nom: { fr: "Pipelines de données / ETL", en: "Data pipelines / ETL" },
      mots: ["etl", "elt", "pipeline*", "airflow", "ingestion", "data engineer*", "ingenieur* data", "integration de donnees", "data integration", "flux de donnees", "data flow*"],
      dit: { fr: "Pipelines en production à l'INSEP : capteurs, tracking et plateformes de force vers un référentiel unique (Airflow, Azure).", en: "Production pipelines at INSEP: sensors, tracking and force plates into a single repository (Airflow, Azure)." } },
    { id: "api", niveau: 3, nom: { fr: "API", en: "APIs" },
      mots: ["api", "apis", "api rest", "rest api", "restful", "web service*", "connecteur*", "connector*"],
      dit: { fr: "Connecteurs Kinexon et Kinvent, publics sur son GitHub.", en: "Kinexon and Kinvent connectors, public on his GitHub." } },
    { id: "gouvernance", niveau: 3, nom: { fr: "Gouvernance et qualité des données", en: "Data governance & quality" },
      mots: ["gouvernance", "governance", "qualite des donnees", "qualite de la donnee", "data quality", "dictionnaire* de donnees", "data dictionar*", "data catalog*", "referentiel*", "metadonnees", "metadata", "rgpd", "gdpr"],
      dit: { fr: "Cartographie des flux, dictionnaires de données et règles d'intégrité d'un patrimoine fédéral.", en: "Flow mapping, data dictionaries and integrity rules for a national federation's data." } },
    { id: "azure", niveau: 2, nom: { fr: "Azure", en: "Azure" },
      mots: ["azure"],
      dit: { fr: "Base Azure au bout de la chaîne Kinexon → Airflow.", en: "Azure database at the end of the Kinexon → Airflow chain." } },
    { id: "cloud", niveau: 1, nom: { fr: "Cloud AWS / GCP", en: "AWS / GCP cloud" },
      mots: ["aws", "amazon web services", "gcp", "google cloud", "bigquery", "snowflake", "redshift"],
      dit: { fr: "Pas d'AWS ni de GCP au compteur. Azure et Cloudflare Workers, oui : les concepts voyagent.", en: "No AWS or GCP on the clock. Azure and Cloudflare Workers, yes: the concepts travel." } },
    { id: "bigdata", niveau: 0, nom: { fr: "Big data distribué", en: "Distributed big data" },
      mots: ["spark", "pyspark", "hadoop", "databricks", "hive", "kafka", "big data"],
      dit: { fr: "Jamais en production. Ses plus gros volumes (positions de joueurs à 25 Hz, 43 000 tests d'aviron) : Pandas a tenu bon.", en: "Never in production. His biggest volumes (player positions at 25 Hz, 43,000 rowing tests): Pandas held up." } },
    { id: "devops", niveau: 1, nom: { fr: "Conteneurs et DevOps", en: "Containers & DevOps" },
      mots: ["docker", "kubernetes", "k8s", "conteneur*", "container*", "terraform", "ci cd", "devops", "mlops"],
      dit: { fr: "Le minimum vital. Ses applications tournent en production, mais il ne vous montera pas un cluster Kubernetes les yeux fermés.", en: "The bare minimum. His apps run in production, but he won't spin up a Kubernetes cluster blindfolded." } },
    { id: "git", niveau: 2, nom: { fr: "Git", en: "Git" },
      mots: ["git", "github", "gitlab", "versioning", "gestion de versions"],
      dit: { fr: "github.com/Clement0242.", en: "github.com/Clement0242." } },

    // ----- développement et restitution
    { id: "django", niveau: 3, nom: { fr: "Applications web (Django)", en: "Web apps (Django)" },
      mots: ["django", "flask", "fastapi", "backend", "back end", "application* web", "web app*", "developpement web", "web development"],
      dit: { fr: "Django + MySQL : ScoutBase et le monitoring FFBB, tous deux en production.", en: "Django + MySQL: ScoutBase and the FFBB monitoring suite, both in production." } },
    { id: "front", niveau: 1, nom: { fr: "Front-end", en: "Front-end" },
      mots: ["javascript", "typescript", "react", "vue js", "vuejs", "angular", "front end", "frontend"],
      dit: { fr: "Ce qu'il faut pour habiller une application Django. Pas un développeur React.", en: "Enough to dress up a Django app. Not a React developer." } },
    { id: "lourd", niveau: 1, nom: { fr: "Java, C++, Scala…", en: "Java, C++, Scala…" },
      mots: ["java", "scala", "c++", "c#", "golang", "kotlin", "rust"],
      dit: { fr: "Croisés en école d'ingé ; au quotidien, c'est Python, R et SQL.", en: "Met at engineering school; day to day it's Python, R and SQL." } },
    { id: "bi", niveau: 3, poids: 1.2, nom: { fr: "Tableaux de bord / BI", en: "Dashboards / BI" },
      mots: ["power bi", "powerbi", "dax", "power query", "dashboard*", "tableau* de bord", "reporting", "business intelligence", "dataviz", "data visuali*", "visualisation de donnees", "streamlit", "shiny"],
      dit: { fr: "Power BI (DAX, Power Query), Streamlit, R Shiny — et des staffs qui les ouvrent vraiment le lundi matin.", en: "Power BI (DAX, Power Query), Streamlit, R Shiny — and coaching staff who actually open them on Monday morning." } },
    { id: "excel", niveau: 3, poids: 0.5, nom: { fr: "Excel / M365", en: "Excel / M365" },
      mots: ["excel", "m365", "office 365", "microsoft 365", "pack office"],
      dit: { fr: "Avancé. Mais il préfère quand ça finit dans une base.", en: "Advanced. Though he prefers when it ends up in a database." } },
    { id: "scraping", niveau: 2, nom: { fr: "Web scraping", en: "Web scraping" },
      mots: ["scraping", "scraper", "playwright", "selenium", "beautifulsoup", "crawl*"],
      dit: { fr: "Scraper des feuilles de match FFBB (NM1, LF2, Pro B), public sur GitHub.", en: "Scraper for official FFBB match sheets (NM1, LF2, Pro B), public on GitHub." } },
    { id: "comm", niveau: 3, poids: 0.8, nom: { fr: "Vulgarisation, formation des utilisateurs", en: "Communication, user training" },
      mots: ["vulgaris*", "pedagog*", "formation des utilisateurs", "former les utilisateurs", "communication", "storytelling", "parties prenantes", "stakeholder*", "restitution*"],
      dit: { fr: "Il a dû présenter son travail à Tony Parker. Depuis, un comité de direction ne l'impressionne plus.", en: "He once had to present his work to Tony Parker. Since then, boardrooms don't scare him." } },
    { id: "recherche", niveau: 2, nom: { fr: "Recherche scientifique", en: "Scientific research" },
      mots: ["recherche scientifique", "research", "publication*", "article* scientifique*", "laboratoire", "chercheur*", "researcher*"],
      dit: { fr: "Ingénieur de recherche à l'INSEP, une publication en cours, intervenant au séminaire Grand INSEP.", en: "Research engineer at INSEP, one paper in progress, speaker at the Grand INSEP seminar." } },
    { id: "doctorat", niveau: 0, nom: { fr: "Doctorat", en: "PhD" },
      mots: ["doctorat", "phd", "ph d", "docteur", "these de doctorat"],
      dit: { fr: "Pas (encore) de doctorat. Une thèse l'intéresse, cela dit.", en: "No PhD (yet). He'd be interested in one, though." } },
    { id: "diplome", niveau: 3, poids: 0.8, nom: { fr: "Bac+5", en: "Master's level" },
      mots: ["bac+5", "bac +5", "bac 5", "master*", "diplome d ingenieur", "ecole d ingenieur*", "engineering degree", "msc", "grande ecole"],
      dit: { fr: "Deux, même : ingénieur Polytech Lille et master STAPS EOPS.", en: "Two of them: Polytech Lille engineering degree and a sport-science MSc." } },

    // ----- sport
    { id: "sport", niveau: 3, poids: 2, nom: { fr: "Sport de haut niveau", en: "Elite sport" },
      mots: ["sport*", "athlet*", "haut niveau", "high performance", "club* professionnel*", "professional club*", "federation*", "olympi*", "entraineur*", "staff technique", "coaching staff"],
      dit: { fr: "Ingénieur data ET sport scientist : c'est exactement son créneau (INSEP, FFBB, clubs pros).", en: "Data engineer AND sport scientist: exactly his niche (INSEP, French Basketball Federation, pro clubs)." } },
    { id: "capteurs", niveau: 3, poids: 1.5, nom: { fr: "GPS, LPS et capteurs", en: "GPS, LPS & sensors" },
      mots: ["gps", "lps", "gnss", "catapult", "statsports", "kinexon", "imu", "accelerometr*", "capteur*", "sensor*", "wearable*", "tracking", "plateforme* de force", "force plate*", "kinvent", "vald"],
      dit: { fr: "Kinexon (positions à 20-25 Hz), plateformes de force Kinvent, GPS : son quotidien à l'INSEP.", en: "Kinexon (positions at 20-25 Hz), Kinvent force plates, GPS: his daily routine at INSEP." } },
    { id: "charge", niveau: 3, poids: 1.5, nom: { fr: "Charge d'entraînement et monitoring", en: "Training load & monitoring" },
      mots: ["charge d entrainement", "training load", "charge externe", "charge interne", "workload*", "acwr", "monitoring des athletes", "monitoring de la charge", "load monitoring", "suivi des athletes", "athlete monitoring", "rpe", "wellness", "bien etre"],
      dit: { fr: "Il a construit l'application de monitoring de la Fédération Française de Basketball.", en: "He built the French Basketball Federation's athlete-monitoring app." } },
    { id: "physio", niveau: 3, poids: 1.2, nom: { fr: "Sciences du sport", en: "Sport science" },
      mots: ["physiolog*", "biomecani*", "biomechani*", "force vitesse", "force velocity", "vo2*", "sport scien*", "sciences du sport", "staps", "preparat* physique", "strength and conditioning"],
      dit: { fr: "Master STAPS EOPS : il sait ce que la mesure veut dire, pas seulement la calculer.", en: "Sport-science MSc: he knows what the measurement means, not just how to compute it." } },
    { id: "scouting", niveau: 3, poids: 1.2, nom: { fr: "Scouting et analyse de la performance", en: "Scouting & performance analysis" },
      mots: ["scouting", "scout", "scouts", "recrutement de joueurs", "player recruitment", "detection des talents", "detection de talents", "talent identification", "performance analys*", "analyste* performance", "analyse video", "video analys*", "analyse de match", "match analys*"],
      dit: { fr: "ScoutBase : des dizaines de milliers de joueurs, une note par poste et par saison, des rapports de scouts.", en: "ScoutBase: tens of thousands of players, a rating per position and season, scout reports." } },
    { id: "football", niveau: 3, nom: { fr: "Football", en: "Football" },
      mots: ["football", "soccer", "ligue 1", "ligue 2", "premier league"],
      dit: { fr: "Joueur depuis l'âge de 5 ans, stage à l'AS Saint-Étienne, et ScoutBase.", en: "Plays since age 5, internship at AS Saint-Étienne, and ScoutBase." } },
    { id: "basket", niveau: 3, nom: { fr: "Basketball", en: "Basketball" },
      mots: ["basket*", "nba", "fiba", "euroleague"],
      dit: { fr: "Pôle France de l'INSEP : les équipes de France jeunes, au quotidien.", en: "INSEP's national youth basketball programme, every day." } },

    // ----- contrat, langues
    { id: "freelance", niveau: 3, poids: 0.5, nom: { fr: "Freelance / mission", en: "Freelance / contract" },
      mots: ["freelance", "free lance", "independant*", "consultant*", "contractor", "portage salarial"],
      dit: { fr: "Consultant indépendant depuis août 2026 : la facture est prête.", en: "Independent consultant since August 2026: the invoice template is ready." } },
    { id: "stage", niveau: 0, poids: 0.5, nom: { fr: "Stage / alternance", en: "Internship" },
      mots: ["stagiaire", "offre de stage", "stage de fin d etude*", "internship", "intern", "alternance", "alternant*"],
      dit: { fr: "Quatre stages au compteur : il cherche maintenant un poste ou une mission.", en: "Four internships already done: he's now after a job or a contract." } },
    { id: "anglais", niveau: 3, poids: 0.6, nom: { fr: "Anglais", en: "English" },
      mots: ["anglais", "english"],
      dit: { fr: "Courant, C1.", en: "Fluent, C1." } },
    { id: "espagnol", niveau: 3, poids: 0.6, nom: { fr: "Espagnol", en: "Spanish" },
      mots: ["espagnol", "spanish", "castellano"],
      dit: { fr: "C1, appris pendant un an en Argentine.", en: "C1, learnt during a year in Argentina." } },
    { id: "langues", niveau: 0, poids: 0.6, nom: { fr: "Autre langue", en: "Other language" },
      mots: ["allemand", "german", "italien", "italian", "portugais", "portuguese", "neerlandais", "dutch", "chinois", "mandarin", "chinese", "japonais", "japanese", "arabe", "arabic", "russe", "russian"],
      dit: { fr: "Français, anglais, espagnol, et c'est tout. Mais il a appris l'espagnol en un an : ça se discute.", en: "French, English, Spanish, and that's it. He did learn Spanish in a year, though." } },
  ],
};

export const nonRenseigne ="prétentions salariales, date exacte de disponibilité, vie privée, opinions, noms d'athlètes, clients non cités ici, références de personnes à contacter.";
