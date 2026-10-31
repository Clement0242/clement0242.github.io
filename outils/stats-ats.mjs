/* Ce que testent les recruteurs sur l'ATS maison : lit les statistiques
   anonymes du relais (GET /stats) et les résume.
       npm run stats              les 30 derniers jours
       npm run stats -- 7         les 7 derniers jours
   Le jeton est lu dans chat-worker/.dev.vars (STATS_TOKEN=…, non versionné)
   et doit être le même que le secret Cloudflare :
       cd chat-worker && npx wrangler secret put STATS_TOKEN */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const RELAIS = "https://clement-assistant.clement-verdier.workers.dev";
const JOURS = Number(process.argv[2]) || 30;

function jeton() {
  if (process.env.STATS_TOKEN) return process.env.STATS_TOKEN;
  try {
    const m = readFileSync(join(RACINE, "chat-worker/.dev.vars"), "utf8").match(/STATS_TOKEN\s*=\s*"?([^"\s]+)/);
    if (m) return m[1];
  } catch { /* absent */ }
  console.error("Jeton introuvable : ajouter STATS_TOKEN=… dans chat-worker/.dev.vars");
  process.exit(2);
}

// Le lexique, pour afficher des noms plutôt que des ids.
const bac = {}; bac.window = bac;
new Function("window", readFileSync(join(RACINE, "assets/js/ats-profil.js"), "utf8"))(bac);
const NOMS = Object.fromEntries(bac.ATS_PROFIL.competences.map((c) => [c.id, c.nom.fr]));
const nom = (id) => NOMS[id] || id;

const r = await fetch(RELAIS + "/stats", { headers: { Authorization: "Bearer " + jeton() } });
if (!r.ok) { console.error(`Refusé (${r.status}) : le jeton local ne correspond pas au secret Cloudflare ?`); process.exit(1); }
const { jours, recents } = await r.json();

const depuis = new Date(Date.now() - JOURS * 864e5).toISOString().slice(0, 10);
const retenus = Object.entries(jours).filter(([k]) => k.slice(2) >= depuis).sort();
const total = { n: 0, somme: 0, tranches: Array(10).fill(0), demandees: {}, manques: {}, sport: 0, langues: {}, sources: {} };
for (const [, j] of retenus) {
  total.n += j.n; total.somme += j.somme; total.sport += j.sport;
  j.tranches.forEach((v, i) => (total.tranches[i] += v));
  for (const champ of ["demandees", "manques", "langues", "sources"])
    for (const [k, v] of Object.entries(j[champ] || {})) total[champ][k] = (total[champ][k] || 0) + v;
}

if (!total.n) { console.log(`Aucune analyse sur les ${JOURS} derniers jours.`); process.exit(0); }

const pct = (v) => `${Math.round((100 * v) / total.n)} %`;
const top = (o, n = 10) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
const barre = (v, max) => "█".repeat(Math.round((20 * v) / Math.max(1, max)));

console.log(`\nATS maison — ${JOURS} derniers jours\n`);
console.log(`Analyses            ${total.n}  (offres dans le sport : ${pct(total.sport)})`);
console.log(`Note moyenne        ${Math.round(total.somme / total.n)}/100`);
console.log(`Langue              ${top(total.langues).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
console.log(`Source              ${top(total.sources).map(([k, v]) => `${k} ${v}`).join(" · ")}`);

console.log(`\nRépartition des notes`);
const maxT = Math.max(...total.tranches);
total.tranches.forEach((v, i) => console.log(`  ${String(i * 10).padStart(2)}-${String(i * 10 + 9).padStart(2)}  ${barre(v, maxT)} ${v || ""}`));

console.log(`\nCe que les offres demandent le plus`);
for (const [id, v] of top(total.demandees)) console.log(`  ${pct(v).padStart(5)}  ${nom(id)}`);

console.log(`\nTes vrais points faibles (demandés, que tu n'as pas ou peu)`);
const manques = top(total.manques);
if (!manques.length) console.log("  aucun pour l'instant");
for (const [id, v] of manques) console.log(`  ${pct(v).padStart(5)}  ${nom(id)}`);

console.log(`\nPar jour`);
const maxJ = Math.max(...retenus.map(([, j]) => j.n));
for (const [k, j] of retenus.slice(-14)) console.log(`  ${k.slice(2)}  ${barre(j.n, maxJ)} ${j.n}  (moy. ${Math.round(j.somme / j.n)})`);

console.log(`\n5 dernières analyses`);
for (const e of recents.slice(-5).reverse()) {
  const plus = e.c.filter((id) => !id.startsWith("~")).slice(0, 5).map(nom).join(", ");
  console.log(`  ${e.t}  ${String(e.s).padStart(3)}/100  [${e.l}, ${e.src}]  ${plus}${e.x ? `  · ${e.x[0]} ans demandés` : ""}`);
}
console.log();
