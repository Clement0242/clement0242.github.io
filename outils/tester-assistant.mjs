/* Rejoue les questions de référence (outils/cas-assistant.mjs) sur le code
   LOCAL du relais (chat-worker/worker.js + profil.js régénéré) — donc AVANT
   de déployer. La clé est lue dans chat-worker/.dev.vars (non versionné) :
       OPENROUTER_API_KEY=sk-or-…
   Sortie en erreur si un cas échoue deux fois de suite (les modèles gratuits
   varient : un échec isolé est retenté une fois). */

import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { CAS } from "./cas-assistant.mjs";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");

function cle() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;
  try {
    const m = readFileSync(join(RACINE, "chat-worker/.dev.vars"), "utf8").match(/OPENROUTER_API_KEY\s*=\s*"?([^"\s]+)/);
    if (m) return m[1];
  } catch { /* absent */ }
  console.error("Clé introuvable : créer chat-worker/.dev.vars avec OPENROUTER_API_KEY=…");
  process.exit(2);
}

const worker = (await import(pathToFileURL(join(RACINE, "chat-worker/worker.js")).href)).default;
const env = { OPENROUTER_API_KEY: cle() };
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function demander(q) {
  const r = await worker.fetch(new Request("http://localhost/", {
    method: "POST",
    headers: { "Origin": "http://localhost:8000", "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: q }] }),
  }), env);
  const d = await r.json();
  return d.reponse || `[ERREUR ${r.status} ${d.erreur}]`;
}

function verdict(cas, rep) {
  const manque = (cas.doit || []).filter((m) => !m.test(rep)).map(String);
  const interdit = (cas.interdit || []).filter((m) => m.test(rep)).map(String);
  return { ok: !manque.length && !interdit.length && !rep.startsWith("[ERREUR"), manque, interdit };
}

let echecs = 0;
for (const cas of CAS) {
  let rep, v;
  for (let essai = 0; essai < 2; essai++) {
    rep = await demander(cas.q);
    v = verdict(cas, rep);
    if (v.ok) break;
    await pause(3000);
  }
  console.log(`${v.ok ? "OK   " : "ÉCHEC"} ${cas.q}`);
  if (!v.ok) {
    echecs++;
    if (v.manque.length) console.log("      manque :", v.manque.join(", "));
    if (v.interdit.length) console.log("      interdit présent :", v.interdit.join(", "));
    console.log("      réponse :", rep.replace(/\s+/g, " ").slice(0, 400));
  }
  await pause(1500);
}

console.log(`\n${CAS.length - echecs}/${CAS.length} cas réussis.`);
process.exit(echecs ? 1 : 0);
