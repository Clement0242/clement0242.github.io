/* Ce que l'assistant sait de Clément — et RIEN d'autre.
   Repris du site, du CV, de ses réponses du 04/10/2026 et de ses trois
   rapports (stage 4A aviron, stage 5A basket, mémoire de master EOPS).
   À mettre à jour en même temps qu'eux, puis redéployer le Worker
   (`npx wrangler deploy`). Tout ce qui est écrit ici devient public par la
   bouche de l'assistant : ne rien y mettre qu'on ne publierait pas sur le
   site — et jamais un nom d'athlète. */

export const PROFIL = `
IDENTITÉ
- Clément Verdier, ingénieur data spécialisé dans la haute performance sportive.
- Basé à Paris. Mobile partout : en France comme à l'étranger. Permis B et véhicule.
- Contact : clement.verdier@laposte.net · 07 82 19 99 98 · LinkedIn : https://www.linkedin.com/in/cl%C3%A9ment-verdier-a542941b7 · GitHub : https://github.com/Clement0242 · CV : https://clement0242.github.io/cv/
- Ouvert à TOUT type d'opportunité : poste salarié (CDI, CDD), freelance/mission, thèse ; temps plein ou partiel ; club professionnel, fédération, laboratoire de recherche ou entreprise de tech sportive ; en France ou à l'étranger. Il répond toujours.

EN UNE PHRASE
Ingénieur en informatique et statistique (Polytech Lille), formé ensuite à l'optimisation de la performance sportive (master STAPS EOPS). Il travaille à la frontière entre l'architecture des systèmes d'information et les sciences du sport de haut niveau : il sait écrire le pipeline ET savoir ce que la mesure veut dire.

POURQUOI LE SPORT ET LA DATA (ses mots, à reformuler librement)
- Le sport : grand sportif lui-même (football depuis l'âge de 5 ans), il aime ce que le sport dégage — le dépassement de soi, le dépassement des capacités physiques et de l'être humain.
- La data : il veut comprendre POURQUOI. Avoir des chiffres pour comprendre comment un athlète en est arrivé là, et aider à la décision. Pour lui, la data, c'est comme la relecture d'une histoire.

PERSONNALITÉ
- Plein d'idées.
- Agréable dans un groupe : drôle, joyeux, souriant, sociable.
- Hyper curieux, sur tous les domaines (histoire, maths…). Exemple : après son diplôme d'ingénieur, il s'est inscrit en master STAPS parce qu'il sentait qu'il lui manquait des connaissances en physiologie, biologie et biomécanique. Il aime pousser ses recherches jusqu'au bout pour vraiment comprendre le domaine dans lequel il travaille.
- Défaut assumé : assez obstiné, il n'aime pas avoir tort — alors il ne parle pas quand il ne sait pas, et il a du mal à croire ce qu'il ne peut pas vérifier. C'est justement ce qui le passionne dans la data : elle permet de tout vérifier, dès que c'est quantifiable.
- Centres d'intérêt : économie, histoire, histoire du sport, nouvelles technologies, football (il a été responsable de l'équipe de football de Polytech Lille et a organisé le voyage annuel au ski de l'école).

EXPÉRIENCE
1. Ingénieur de recherche data & performance analyst — INSEP / Fédération Française de Basketball, Paris (janvier 2025 → aujourd'hui)
   - Travaille avec le Pôle France de basket de l'INSEP, c'est-à-dire les équipes de France jeunes (joueurs et joueuses de 15 à 18 ans), en étroite collaboration avec le préparateur physique du Pôle et le laboratoire IRMES.
   - Mise en place et structuration de la donnée : cartographie des flux de données athlètes, dictionnaires de données, règles de gouvernance pour garantir l'intégrité du patrimoine de données fédéral.
   - Pipelines automatisés et connecteurs API (Python, SQL) : notamment le système de positionnement local Kinexon (LPS, capteurs portés par les joueurs, positions à 20-25 Hz) et les plateformes de force Kinvent, avec contrôle qualité des données terrain.
   - Modélisation de la charge d'entraînement, profils mécaniques (accélération-vitesse, force-vitesse), outils d'aide à la décision pour le staff, rapports Power BI et formation des utilisateurs.
   - Contribution à la recherche de haut niveau : rédaction d'articles scientifiques ; une publication est en cours (ne pas en donner le titre ni la revue, non publics).
   - Il travaille en équipe avec le staff (entraîneurs, préparation physique, chercheurs, médecins). Anecdote qu'il aime raconter : il a dû présenter son travail à Tony Parker.
2. Consultant data & sport science, indépendant — France (août 2026 → aujourd'hui)
   - Sa mission principale : la plateforme de scouting football ci-dessous, qui mêle plusieurs sources de données pour aider la prise de décision dans le recrutement de haut niveau.
   - Plus largement : architecture de données, intégration d'API, modélisation statistique, tableaux de bord sur mesure pour des structures sportives.
3. Stage de fin d'études d'ingénieur — Laboratoire IRMES, INSEP, Paris (année 2024-2025), sous la direction du Dr Adrien Sedeaud, en collaboration avec Yannis Irid (doctorant IRMES & FFBB)
   - Sujet : analyse longitudinale des performances en match des basketteurs du Pôle France.
   - Données : positions Kinexon (LPS) + statistiques officielles de match NM1/NF1 ; chaîne de collecte automatisée (API Kinexon, Apache Airflow, base de données Azure), analyses en R.
   - Méthodes : modèles mixtes linéaires (lme4), comparaison de formes de trajectoires (polynômes, splines, GAM ; sélection par AIC/BIC), classification des profils de progression (k-means, hiérarchique, fuzzy c-means), tests adaptatifs (ANOVA / Kruskal-Wallis).
   - Résultat marquant : avec l'âge, l'efficacité de jeu (évaluation FIBA) progresse alors que l'activité physique brute (accélérations, vitesse moyenne, changements de direction) diminue — les joueurs gagnent en efficacité plutôt qu'en intensité. Les « progresseurs » ne se distinguent pas par une amélioration physique plus rapide mais par un niveau athlétique de base plus élevé (vitesse max, hauteur de saut, accélération max).
4. Stage de 4e année d'ingénieur (3 mois, 2024) — IRMES, INSEP, en partenariat avec la Fédération Française d'Aviron, encadré par Quentin De Larochelambert (projet « Estimation & Trajectoires »)
   - Base de plus de 43 000 tests ergométriques sur 2000 m depuis 1996.
   - Effet de l'âge relatif : surreprésentation des athlètes nés au 1er trimestre dans le Programme Performance Jeune.
   - Abandon sportif (courbes de Kaplan-Meier, test du log-rank) : les jeunes femmes abandonnent significativement plus à partir de 16 ans ; les moins performants abandonnent beaucoup plus ; les rameurs nés en fin d'année n'abandonnent pas davantage malgré des performances initiales plus faibles.
   - Modèles âge-performance (équations de Moore et IMAP) en modèle mixte bayésien (Stan, MCMC/NUTS), avec une procédure de validation croisée qu'il a ajoutée.
   - Âge biologique : estimation du pic de croissance (package R sitar) et lien avec la performance ; l'étude pilote a incité la Fédération d'aviron à collecter des données plus tôt chez les jeunes.
5. Stage de 3e année (2 mois, 2023) — AS Saint-Étienne (football) : outils d'aide à la décision pour le recrutement et la préparation des matchs (analyse des blessures des joueurs en vue du recrutement, suivi des points gagnés comparés aux 10 dernières saisons de Ligue 2, analyse des performances des arbitres).

FORMATION
- Master STAPS Évaluation et Optimisation de la Performance Sportive (EOPS), Université Jean Monnet, Saint-Étienne (2025 → 2026) : physiologie de l'effort, biomécanique, planification de la charge, recherche appliquée.
  Mémoire : « Profil accélération-vitesse in situ issu d'un système de positionnement local : une preuve de concept chez de jeunes joueurs de basket-ball d'élite » (direction : Damien Freyssenet et Yannis Irid). 22 joueurs et joueuses d'élite suivis en match avec Kinexon, comparés à un sprint linéaire de 28 m. Traitement : filtre de Kalman + lissage RTS, nettoyage par densité (k-NN), trois méthodes de profil (intervalle de confiance, Tukey, et une enveloppe hyperbolique-exponentielle qu'il a formulée et ajustée par Nelder-Mead). Résultats : en basket, l'accélération maximale estimée en match est systématiquement surestimée (+18 à 27 %) par rapport au sprint, alors que la vitesse maximale est bien estimée par les méthodes intervalle de confiance et Tukey (biais < 1 %). Conclusion : le profil in situ est un outil complémentaire de suivi, pas un substitut au test de sprint.
- Diplôme d'ingénieur (Bac+5) informatique, statistique et IA, Polytech Lille, filière ISIA (jusqu'en 2025).
- DUT STID (Statistique et informatique décisionnelle), Saint-Martin-d'Hères (2020 → 2022).
- Échange universitaire en informatique et statistiques, Universidad Nacional del Sur, Bahía Blanca, Argentine : une année académique complète suivie en espagnol.

CE QU'IL FAIT (4 terrains, une même chaîne)
- Gouvernance de la donnée : cartographier les flux, écrire les dictionnaires de données, poser les règles d'intégrité.
- Pipelines & capteurs : connecteurs API et chaînes ETL qui font entrer GPS, LPS, tracking et plateformes de force dans un référentiel unique, avec contrôles qualité.
- Modélisation de l'effort : charge d'entraînement, profils force-vitesse et accélération-vitesse, estimation du potentiel d'un jeune athlète en tenant compte de ses âges relatif, biologique et d'entraînement.
- Aide à la décision : tableaux de bord et restitutions utilisables par un staff un lundi matin, et formation des personnes qui s'en servent.

COMPÉTENCES
- Gouvernance & ingénierie SI : gouvernance de la donnée, cartographie des flux, API REST, SQL, Azure, Apache Airflow, contrôle qualité, documentation.
- Data science & statistiques : Python (Pandas, NumPy, SciPy, Scikit-learn, Pingouin), R (lme4, sitar), Stan ; modèles mixtes, modèles bayésiens, analyse de survie, clustering, filtrage de Kalman, tests statistiques, validation croisée, accord de mesures (Bland-Altman, ICC).
- Développement : Django, MySQL, scraping (Playwright), applications web en production.
- Sciences du sport : physiologie de l'effort, biomécanique, charge d'entraînement, profils force-vitesse et accélération-vitesse, GPS / LPS, âge relatif et maturation.
- Restitution : Power BI (DAX, Power Query), Streamlit, R Shiny, Tableau, Excel avancé.
- Langues : français natif, anglais courant (C1), espagnol courant (C1).

PROJETS
- ScoutBase, plateforme de scouting football (en production, application privée — pas sur GitHub) : outil de recrutement de haut niveau qui croise plusieurs sources de données (statistiques de match, données physiques, valeurs marchandes, rapports de scouts) pour aider la décision — vivier de plusieurs dizaines de milliers de joueurs, note de performance par poste et par saison, rapports de terrain cloisonnés par scout, projections de trajectoire, assistant de recherche en langage naturel. Ne pas citer de club client.
- Monitoring athlètes basketball (Fédération Française de Basketball, application interne — pas sur GitHub) : agrégation des mesures de charge et de bien-être, restitution aux staffs, alertes sur les écarts.
- Récupération de données LPS (public) : client Python pour l'API Kinexon. https://github.com/Clement0242/Kinexon_API_recuperation
- Client API Kinvent (public) : participants, protocoles, métriques de force et d'équilibre. https://github.com/Clement0242/Kinvent_api
- Extraction des statistiques FFBB (public) : scraper des feuilles de match officielles (NM1, LF2, Pro B). https://github.com/Clement0242/Scrap_NM1_LF2
- Analyse des décélérations (recherche, R) : les phases de décélération, le versant le plus coûteux de la locomotion et le plus négligé dans le suivi de charge.

INTERVENTIONS & PUBLICATIONS
- 5 mars 2025 — Séminaire du réseau Grand INSEP « Le développement des jeunes athlètes », INSEP Paris : intervenant de la session « Outils pour la détection et le recrutement », aux côtés d'Adrien Sedeaud et Quentin De Larochelambert (INSEP / IRMES), Cédric Leduc (PSG), Elie Rambaud (OL Academy) et des fédérations de cyclisme, triathlon, aviron et football.
- Publication scientifique en cours (titre et revue non encore publics). Ne jamais inventer de référence.

NON RENSEIGNÉ (dire que l'information n'est pas sur le site et renvoyer vers le mail) : prétentions salariales, date exacte de disponibilité, vie privée, opinions, noms d'athlètes, clients non cités ici, références de personnes à contacter.
`;
