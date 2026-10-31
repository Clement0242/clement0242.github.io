/* Vérifie le moteur du test de détente (assets/js/detente.js) sur des sauts
   synthétiques dont on connaît le vrai temps de vol. Local, instantané :
       npm run tester-detente
   Ajouter un cas dès qu'un vrai saut donne une mesure absurde (enregistrer
   la courbe depuis la console du téléphone et la coller ici). */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const bac = {}; bac.window = bac;
vm.createContext(bac);
vm.runInContext(readFileSync(join(RACINE, "assets/js/detente.js"), "utf8"), bac);
const { DETENTE } = bac;
const G = DETENTE.G;

/* Un saut : debout, flexion, poussée, vol de `vol` s, réception — échantillonné
   à `hz`, avec un bruit gaussien grossier et un décalage de phase aléatoire
   (le capteur ne tombe jamais pile sur le décollage). */
function saut({ vol, hz = 60, bruit = 0.06, decalage = 0, debutVol = 1.4, duree = 3.2 }) {
  let graine = 12345;
  const alea = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647 - 0.5; };
  const e = [];
  for (let t = decalage; t <= duree * 1000; t += 1000 / hz) {
    const s = t / 1000;
    let a;
    if (s < debutVol - 0.6) a = 1;
    else if (s < debutVol - 0.3) a = 0.6;
    else if (s < debutVol) a = 2.1;
    else if (s < debutVol + vol) a = 0.03;
    else if (s < debutVol + vol + 0.15) a = 3.2;
    else a = 1;
    e.push({ t, a: Math.max(0, a + alea() * bruit * 2) * G });
  }
  return e;
}
const vraie = (vol) => (100 * G * vol * vol) / 8;

let echecs = 0;
function verifier(nom, ok, detail = "") {
  if (!ok) echecs++;
  console.log(`${ok ? "ok   " : "ÉCHEC"} ${nom}${detail ? "  " + detail : ""}`);
}

const ex = DETENTE.mesurer(DETENTE.exemple());
verifier("saut d'exemple ≈ 37 cm", ex.ok && Math.abs(ex.hauteur - 37.1) < 1.5, ex.ok ? ex.hauteur.toFixed(1) + " cm" : ex.raison);

for (const hz of [60, 100]) {
  for (const vol of [0.3, 0.45, 0.6]) {
    for (const decalage of [0, 7, 13]) {
      const m = DETENTE.mesurer(saut({ vol, hz, decalage }));
      const ecart = m.ok ? m.hauteur - vraie(vol) : NaN;
      verifier(`${hz} Hz, vol ${vol} s (${vraie(vol).toFixed(1)} cm), décalage ${decalage} ms`,
        m.ok && Math.abs(ecart) < (hz === 60 ? 2.0 : 1.2), m.ok ? `écart ${ecart >= 0 ? "+" : ""}${ecart.toFixed(2)} cm` : m.raison);
    }
  }
}

const immobile = Array.from({ length: 200 }, (_, i) => ({ t: i * 16.7, a: G * (1 + 0.05 * Math.sin(i)) }));
let m = DETENTE.mesurer(immobile);
verifier("téléphone immobile → aucun saut", !m.ok && m.raison === "aucun");

m = DETENTE.mesurer(saut({ vol: 1.3 }));
verifier("chute libre de 1,3 s → téléphone lancé", !m.ok && m.raison === "lance");

m = DETENTE.mesurer(saut({ vol: 0.5, debutVol: 0.6 }).filter((s) => s.t > 700));
verifier("enregistrement commencé en plein vol → coupé", !m.ok && m.raison === "coupe");

m = DETENTE.mesurer(saut({ vol: 0.05 }));
verifier("trou de 50 ms (secousse) → aucun saut", !m.ok && m.raison === "aucun");

verifier("liste vide → aucun saut", DETENTE.mesurer([]).raison === "aucun");

if (echecs) { console.error(`\n${echecs} échec(s).`); process.exit(1); }
console.log("\nTous les cas passent.");
