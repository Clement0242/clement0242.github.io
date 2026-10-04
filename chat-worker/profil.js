/* Ce que l'assistant sait de Clément — et RIEN d'autre.
   Repris du site et du CV. À mettre à jour en même temps qu'eux, puis
   redéployer le Worker (`npx wrangler deploy`). Tout ce qui est écrit ici
   devient public par la bouche de l'assistant : ne rien y mettre qu'on ne
   publierait pas sur le site. */

export const PROFIL = `
IDENTITÉ
- Clément Verdier, ingénieur data spécialisé dans la haute performance sportive.
- Basé à Paris, mobile partout en France et en déplacement. Permis B et véhicule.
- Contact : clement.verdier@laposte.net · 07 82 19 99 98 · LinkedIn : https://www.linkedin.com/in/cl%C3%A9ment-verdier-a542941b7 · GitHub : https://github.com/Clement0242 · CV : https://clement0242.github.io/cv/
- Ouvert à : un poste salarié, une mission ponctuelle, ou une simple question de méthode sur un jeu de données de terrain. Il répond toujours.

EN UNE PHRASE
Ingénieur en informatique et statistique (Polytech Lille), formé ensuite à l'optimisation de la performance sportive (master STAPS EOPS). Il travaille à la frontière entre l'architecture des systèmes d'information et les sciences du sport de haut niveau : il sait écrire le pipeline ET savoir ce que la mesure veut dire.

EXPÉRIENCE
1. Ingénieur de recherche data & performance analyst — INSEP / Fédération Française de Basketball, Paris (janvier 2025 → aujourd'hui)
   - Cartographie des flux de données athlètes, dictionnaires de données et règles de gouvernance pour garantir l'intégrité du patrimoine de données fédéral.
   - Pipelines ETL automatisés et connecteurs API en Python et SQL pour intégrer des flux hétérogènes de capteurs et de systèmes de tracking.
   - Contrôle qualité et procédures de fiabilisation des données collectées sur le terrain.
   - Modélisation de la charge d'entraînement, analyse des profils mécaniques (puissance, force-vitesse), outils d'aide à la décision pour les staffs techniques.
   - Rapports interactifs Power BI (création, évolution, documentation) et formation des utilisateurs.
2. Consultant data & sport science, indépendant — France (août 2026 → aujourd'hui)
   - Accompagnement de structures sportives professionnelles : architecture de données, intégration d'API, modélisation statistique.
   - Tableaux de bord sur mesure, optimisation de flux de données existants.
3. Data analyst, stage de fin d'études — INSEP, Paris (janvier 2024 → janvier 2025)
   - Nettoyage, fiabilisation et modélisation de données quantitatives de haute performance.
   - Industrialisation des analyses (automatisation Python et SQL), tableaux de bord interactifs, documentation des indicateurs de suivi athlétique.

FORMATION
- Master Entraînement et optimisation de la performance sportive (EOPS), Université Jean Monnet, STAPS, Saint-Étienne (2025 → 2026) : physiologie de l'effort, biomécanique, planification de la charge, recherche appliquée au sport d'élite.
- Diplôme d'ingénieur (Bac+5) informatique, statistique et IA, Polytech Lille, filière ISIA (2020 → 2025) : architecture des SI, gouvernance et modélisation de données, conception d'API, Python, R, SQL, statistiques appliquées, business intelligence.
- Échange universitaire en informatique et statistiques, Universidad Nacional del Sur, Bahía Blanca, Argentine (mars 2024 → février 2025) : une année académique complète suivie en espagnol.

CE QU'IL FAIT (4 terrains, une même chaîne)
- Gouvernance de la donnée : cartographier les flux, écrire les dictionnaires de données, poser les règles d'intégrité — sans quoi chaque staff recalcule son propre indicateur et plus personne ne compare rien.
- Pipelines & capteurs : connecteurs API et chaînes ETL qui font entrer GPS, LPS, tracking et plateformes de force dans un référentiel unique, avec contrôles qualité.
- Modélisation de l'effort : charge d'entraînement, profils force-vitesse, estimation du potentiel d'un jeune athlète en tenant compte de ses âges relatif, biologique et d'entraînement.
- Aide à la décision : tableaux de bord et restitutions utilisables par un staff un lundi matin, et formation des personnes qui s'en servent.

COMPÉTENCES
- Gouvernance & ingénierie SI : gouvernance de la donnée, cartographie des flux, API REST, SQL, dictionnaires de données, contrôle qualité, documentation.
- Data science : Python (Pandas, NumPy, Scikit-learn), R, statistiques appliquées, SQL, modélisation décisionnelle.
- Développement : Django, MySQL, scraping (Playwright), applications web en production.
- Sciences du sport : physiologie de l'effort, modélisation de la charge, profils force-vitesse, GPS / LPS.
- Restitution : Power BI (DAX, Power Query), Streamlit, R Shiny, Excel avancé, Microsoft 365.
- Langues : français natif, anglais courant (C1), espagnol courant (C1).

PROJETS
- Plateforme de scouting football (en production) : application web Django/MySQL/Python de recrutement pour une cellule de scouting professionnelle — vivier de plusieurs dizaines de milliers de joueurs, note de performance par poste et par saison, rapports de terrain cloisonnés par scout, projections de trajectoire, assistant de recherche en langage naturel.
- Monitoring athlètes basketball (Fédération Française de Basketball) : application Django de suivi — agrégation des mesures de charge et de bien-être, restitution aux staffs, alertes sur les écarts.
- Récupération de données LPS : client Python pour l'API Kinexon (positions brutes, sauts détectés, session par session, journalisation). https://github.com/Clement0242/Kinexon_API_recuperation
- Client API Kinvent : client Python de l'API publique Kinvent (participants, protocoles, métriques de force et d'équilibre). https://github.com/Clement0242/Kinvent_api
- Extraction des statistiques FFBB : scraper des feuilles de match officielles (NM1, LF2, Pro B), statistiques individuelles ligne à ligne. https://github.com/Clement0242/Scrap_NM1_LF2
- Analyse des décélérations (recherche, R) : travail de cinquième année sur les phases de décélération, le versant le plus coûteux de la locomotion et le plus négligé dans le suivi de charge.

INTERVENTIONS
- 5 mars 2025 — Séminaire du réseau Grand INSEP « Le développement des jeunes athlètes », INSEP Paris : intervenant de la session « Outils pour la détection et le recrutement », aux côtés d'Adrien Sedeaud et Quentin De Larochelambert (INSEP / IRMES), Cédric Leduc (PSG), Elie Rambaud (OL Academy) et des fédérations de cyclisme, triathlon, aviron et football.
- Publications : aucune référence publiée à ce jour sur le site — ne jamais en inventer.

NON RENSEIGNÉ (répondre que l'information n'est pas sur le site et renvoyer vers le mail) : prétentions salariales, date exacte de disponibilité, vie privée, opinions, références de personnes à contacter.
`;
