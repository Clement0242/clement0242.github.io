/* Régénère, depuis profil/profil.mjs, les blocs marqués <!-- GEN:… --> des
   quatre pages et chat-worker/profil.js. Aucune dépendance : `node`.

     npm run generer            écrit les fichiers
     npm run generer -- --check  échoue si un fichier n'est pas à jour
                                  (à lancer avant un commit) */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as P from "../profil/profil.mjs";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const VERIF = process.argv.includes("--check");

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const visibles = (liste) => liste.filter((e) => e.site !== false);
// Une variante du CV l'emporte sur la valeur commune, champ par champ.
const cvDe = (e, champ) => (e.cv && e.cv[champ]) || e[champ];

/* ----------------------------------------------------------------- RENDUS */

function poste(e, l) {
  const [debut, fin] = e.periode[l];
  return [
    `        <article class="poste">`,
    `          <p class="poste-date"><b>${esc(debut)}</b> → ${esc(fin)}</p>`,
    `          <div>`,
    `            <h3>${esc(e.titre[l])}</h3>`,
    `            <p class="poste-lieu">${esc(e.org[l])} <em>— ${esc(e.lieu[l])}</em></p>`,
    `            <ul>`,
    ...e.puces[l].map((p) => `              <li>${esc(p)}</li>`),
    `            </ul>`,
    `          </div>`,
    `        </article>`,
  ].join("\n");
}

function blocCv(e, l) {
  const [debut, fin] = e.periode[l];
  return [
    `        <section class="cv-bloc">`,
    `          <div class="cv-bloc-tete">`,
    `            <h3>${esc(cvDe(e, "titre")[l])}</h3>`,
    `            <time datetime="${e.iso}">${esc(debut)} — ${esc(fin)}</time>`,
    `          </div>`,
    `          <p class="cv-ou">${esc(cvDe(e, "org")[l])} <em>— ${esc(cvDe(e, "lieu")[l])}</em></p>`,
    `          <ul>`,
    ...cvDe(e, "puces")[l].map((p) => `            <li>${esc(p)}</li>`),
    `          </ul>`,
    `        </section>`,
  ].join("\n");
}

const competencesCv = (l) => P.competences.cv.map((g) => [
  `        <div class="cv-groupe">`,
  `          <b>${esc(g.titre[l])}</b>`,
  `          <ul>`,
  ...g.items[l].map((i) => `            <li>${esc(i)}</li>`),
  `          </ul>`,
  `        </div>`,
].join("\n")).join("\n\n");

const languesCv = (l) => P.langues.map((x) => [
  `        <div class="cv-langue">`,
  `          <b>${esc(x.nom[l])}</b><i>${esc(x.niveau[l])}</i>`,
  `          <div class="cv-jauge"><span style="width:${x.jauge}%"></span></div>`,
  `        </div>`,
].join("\n")).join("\n");

const diversCv = (l) => [
  `        <div class="cv-groupe">`,
  `          <ul>`,
  ...P.divers[l].map((d) => `            <li>${esc(d)}</li>`),
  `          </ul>`,
  `        </div>`,
].join("\n");

/* ------------------------------------------------------------- ASSISTANT */

function ligneAssistant(e) {
  const [debut, fin] = e.periode.fr;
  // Hors site, la « fin » est une durée (« 3 mois »), pas une date.
  const tete = `${e.titre.fr} — ${e.org.fr}, ${e.lieu.fr} (${debut}${e.site === false ? ", " : " → "}${fin})`;
  const puces = [...(e.site === false ? [] : e.puces.fr), ...(e.assistant || [])];
  return [tete, ...puces.map((p) => `   - ${p}`)].join("\n");
}

function profilAssistant() {
  const num = (liste) => liste.map((e, i) => `${i + 1}. ${ligneAssistant(e)}`).join("\n");
  const puces = (liste) => liste.map((t) => `- ${t}`).join("\n");
  const I = P.identite;
  const texte = `
IDENTITÉ
- ${I.nom}, ingénieur data spécialisé dans la haute performance sportive.
- ${I.lieu}
- Contact : ${I.mail} · ${I.tel} · LinkedIn : ${I.linkedin} · GitHub : ${I.github} · CV : ${I.cv}
- ${I.recherche}

EN UNE PHRASE
${I.resume}

POURQUOI LE SPORT ET LA DATA (ses mots, à reformuler librement)
${puces(P.pourquoi)}

PERSONNALITÉ
${puces(P.personnalite)}

EXPÉRIENCE
${num(P.experiences)}

FORMATION
${num(P.formations)}

CE QU'IL FAIT (4 terrains, une même chaîne)
${puces(P.domaines)}

COMPÉTENCES
${puces(P.competences.assistant)}
- Langues : ${P.langues.map((x) => `${x.nom.fr.toLowerCase()} ${x.niveau.fr.toLowerCase()}`).join(", ")}.

PROJETS
${puces(P.projets)}

INTERVENTIONS & PUBLICATIONS
${puces(P.interventions)}

NON RENSEIGNÉ (dire que l'information n'est pas sur le site et renvoyer vers le mail) : ${P.nonRenseigne}
`;
  return `/* FICHIER GÉNÉRÉ par outils/generer.mjs depuis profil/profil.mjs.
   NE PAS MODIFIER À LA MAIN : corriger profil/profil.mjs puis \`npm run generer\`. */

export const PROFIL = ${JSON.stringify(texte)};
`;
}

/* ------------------------------------------------------------- ÉCRITURE */

function remplacer(fichier, blocs) {
  const chemin = join(RACINE, fichier);
  let s = readFileSync(chemin, "utf8");
  for (const [nom, contenu] of Object.entries(blocs)) {
    const re = new RegExp(`<!-- GEN:${nom} -->[\\s\\S]*?<!-- /GEN:${nom} -->`);
    if (!re.test(s)) throw new Error(`${fichier} : marqueur GEN:${nom} introuvable`);
    s = s.replace(re, () => `<!-- GEN:${nom} -->\n${contenu}\n<!-- /GEN:${nom} -->`);
  }
  return ecrire(fichier, s);
}

let perimes = [];
function ecrire(fichier, contenu) {
  const chemin = join(RACINE, fichier);
  let avant = "";
  try { avant = readFileSync(chemin, "utf8"); } catch { /* nouveau fichier */ }
  if (avant.replace(/\r\n/g, "\n") === contenu.replace(/\r\n/g, "\n")) return;
  if (VERIF) perimes.push(fichier);
  else { writeFileSync(chemin, contenu); console.log("régénéré :", fichier); }
}

for (const [page, l] of [["index.html", "fr"], ["en/index.html", "en"]]) {
  remplacer(page, {
    experiences: "\n" + visibles(P.experiences).map((e) => poste(e, l)).join("\n\n") + "\n",
    formations: "\n" + visibles(P.formations).map((e) => poste(e, l)).join("\n\n") + "\n",
  });
}

for (const [page, l] of [["cv/index.html", "fr"], ["en/cv/index.html", "en"]]) {
  remplacer(page, {
    lieu: `        <span>${esc(P.identite.lieuCv[l])}</span>`,
    experiences: visibles(P.experiences).map((e) => blocCv(e, l)).join("\n\n"),
    formations: "\n" + visibles(P.formations).map((e) => blocCv(e, l)).join("\n\n"),
    competences: competencesCv(l),
    langues: languesCv(l),
    divers: diversCv(l),
  });
}

ecrire("chat-worker/profil.js", profilAssistant());

if (VERIF && perimes.length) {
  console.error("Pas à jour (lancer `npm run generer`) :\n  " + perimes.join("\n  "));
  process.exit(1);
}
if (VERIF) console.log("Tout est à jour avec profil/profil.mjs.");
