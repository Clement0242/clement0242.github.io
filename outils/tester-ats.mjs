/* Rejoue des offres de référence sur l'ATS maison (assets/js/ats.js) et
   vérifie que chaque note tombe dans sa fourchette. Local, gratuit, instantané :
       npm run tester-ats
   À relancer après toute retouche des poids (ats.js) ou du lexique
   (export « ats » de profil/profil.mjs, puis `npm run generer`).
   Ajouter un cas dès qu'une vraie offre donne une note absurde. */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const bac = { console };
bac.window = bac;
vm.createContext(bac);
for (const f of ["assets/js/ats-profil.js", "assets/js/ats.js"]) {
  vm.runInContext(readFileSync(join(RACINE, f), "utf8"), bac, { filename: f });
}
const { ATS } = bac;
// Date figée : les années d'expérience ne doivent pas faire bouger les tests.
const maintenant = new Date(2026, 9, 5);

const CAS = [
  { nom: "data scientist, club de foot (FR)", min: 85, max: 99, texte: `
Data scientist — Cellule performance d'un club de football professionnel
Rattaché(e) au responsable de la performance, vous rejoignez le staff sciences du sport.
- Collecter et fiabiliser les données GPS et de charge d'entraînement des joueurs
- Développer des pipelines de données en Python et SQL
- Construire des modèles prédictifs (machine learning) pour le suivi de la charge
- Restituer les résultats au staff technique via des tableaux de bord Power BI
Profil recherché : Bac+5, 2 ans d'expérience minimum, anglais courant.
Appréciés :
- Connaissance du scouting
- Notions de deep learning` },
  { nom: "sport scientist, fédération (EN)", min: 80, max: 99, texte: `
Sport Scientist / Data Analyst — National Federation
Join our high performance unit supporting national teams.
You will manage athlete monitoring (GPS, force plates, wellness), build automated
data pipelines in Python and R, and deliver dashboards to coaches.
Requirements: MSc in sport science or statistics, strong statistical skills
(mixed models), fluent English, 3 years of experience.` },
  { nom: "data engineer fintech Spark/K8s/AWS (FR)", min: 25, max: 55, texte: `
Data engineer senior — Scale-up fintech
Vous concevez notre plateforme data temps réel à grande échelle.
- Pipelines de streaming avec Kafka et Spark
- Déploiement sur AWS avec Docker, Kubernetes et Terraform
- Développement en Scala et Python
- Responsable de la gouvernance et de la qualité des données
Profil : 5 ans d'expérience minimum en data engineering. Anglais professionnel.` },
  { nom: "data analyst BI généraliste (FR)", min: 60, max: 84, texte: `
Data analyst (H/F) — groupe de distribution
Au sein de la direction financière, vous construisez les tableaux de bord Power BI
de pilotage des ventes, écrivez les requêtes SQL et automatisez les extractions en
Python. Vous présentez les analyses aux parties prenantes métier.
Profil : Bac+5 en statistique ou école d'ingénieur, 2 ans d'expérience, Excel avancé.` },
  { nom: "ML engineer deep learning (EN)", min: 12, max: 45, texte: `
Machine Learning Engineer — Computer Vision
Train and deploy deep learning models (PyTorch, TensorFlow) for image recognition.
MLOps on GCP with Docker and Kubernetes. Strong Python. PhD in machine learning
or computer vision required. 4+ years of experience.` },
  { nom: "boulanger (FR)", min: 0, max: 15, texte: `
Boulanger / Boulangère (H/F) — boulangerie artisanale
Notre boulangerie familiale recherche un(e) boulanger(ère) passionné(e).
- Pétrissage, façonnage et cuisson du pain
- Préparation des viennoiseries
- Respect des règles d'hygiène et de sécurité alimentaire
Horaires : 4 h – 12 h. Ambiance familiale, baby-foot en salle de pause.` },
];

// Vérifications ponctuelles du moteur.
const CONTROLES = [
  ["« 3+ years of experience » → 3", () => ATS.analyser("We need 3+ years of experience in Python.", { maintenant }).xp.demandees === 3],
  ["« expérience de 5 ans » → 5", () => ATS.analyser("Une expérience de 5 ans minimum est attendue.", { maintenant }).xp.demandees === 5],
  ["« jeunes de 15 ans » ≠ expérience", () => ATS.analyser("Suivi des jeunes de 15 ans au pôle.", { maintenant }).xp.demandees === null],
  ["« j'ai » ne déclenche pas l'IA", () => !ATS.analyser("Ce que j'ai à vous dire.", { maintenant }).trouves.length],
  ["« Appréciés : » rend la suite souhaitée", () => {
    const r = ATS.analyser("Python requis.\nAppréciés :\n- Spark", { maintenant });
    return r.trouves.find((t) => t.c.id === "bigdata").souhait && !r.trouves.find((t) => t.c.id === "python").souhait;
  }],
  ["« tableau de bord » ≠ Tableau mais = BI", () => ATS.analyser("Construire un tableau de bord.", { maintenant }).trouves.some((t) => t.c.id === "bi")],
];

let echecs = 0;
for (const c of CAS) {
  const r = ATS.analyser(c.texte, { maintenant });
  const ok = r.score >= c.min && r.score <= c.max;
  if (!ok) echecs++;
  const plus = r.trouves.filter((t) => t.c.niveau >= 2).map((t) => t.c.id).join(" ");
  const moins = r.trouves.filter((t) => t.c.niveau < 2).map((t) => t.c.id).join(" ");
  console.log(`${ok ? "ok  " : "ÉCHEC"} ${String(r.score).padStart(3)} [${c.min}-${c.max}] ${c.nom}`);
  console.log(`       cov ${r.variables.couverture.toFixed(2)} sim ${r.similarite.toFixed(3)} sport ${r.variables.sport} écart ${r.variables.ecart.toFixed(1)} | + ${plus} | − ${moins}`);
}
for (const [nom, f] of CONTROLES) {
  const ok = f();
  if (!ok) echecs++;
  console.log(`${ok ? "ok  " : "ÉCHEC"} ${nom}`);
}
if (echecs) { console.error(`\n${echecs} échec(s).`); process.exit(1); }
console.log("\nTous les cas passent.");
