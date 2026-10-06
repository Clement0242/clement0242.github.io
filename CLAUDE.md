# CLAUDE.md

Site de présentation et CV de Clément Verdier (ingénieur data, haute performance
sportive), publié par GitHub Pages sur <https://clement0242.github.io>.
Le README est le mode d'emploi détaillé : le lire avant toute modification non triviale.

## Principes

- **Statique, zéro build, zéro dépendance.** HTML/CSS/JS à la main, servis tels
  quels. Ne jamais introduire de framework, bundler ou paquet npm côté site.
  `package.json` ne sert qu'aux scripts Node (sans dépendances).
- **Tout est en français** : textes, noms de variables, de classes CSS, de
  fichiers, commentaires, messages de commit. Garder ce style (ex. `.vues-piste`,
  `aller()`, `marquer()`).
- **JS du site en ES5, IIFE, `"use strict"`, amélioration progressive** : sans
  script, la page reste entière. Rien d'essentiel ne dépend de JS.
- Commentaires denses qui expliquent le *pourquoi* (voir `site.js`, `site.css`).

## Commandes

```bash
npm run generer        # régénère les blocs GEN des 4 pages + chat-worker/profil.js + assets/js/ats-profil.js
npm run verifier       # échoue si une page générée n'est plus à jour — lancer avant chaque commit
npm run tester-ats     # cas de référence de l'ATS maison (local, gratuit, instantané)
npm run tester         # cas de référence de l'assistant (coûte 10-20 requêtes OpenRouter)
npm run deployer       # generer → tester → wrangler deploy (relais de l'assistant)
```

Pas de serveur de dev : ouvrir les `.html` dans le navigateur suffit.

## Architecture

- **Source unique du profil : `profil/profil.mjs`** (FR + EN). `outils/generer.mjs`
  en tire les blocs entre `<!-- GEN:xxx -->` et `<!-- /GEN:xxx -->` de
  `index.html`, `en/index.html`, `cv/index.html`, `en/cv/index.html`, ainsi que
  `chat-worker/profil.js` et `assets/js/ats-profil.js`. **Ne jamais éditer ces
  blocs ni ces fichiers générés à la main** : modifier `profil.mjs` puis
  `npm run generer`.
  - `site: false` → visible seulement par l'assistant ; `cv: {…}` → variante CV ;
    `assistant: […]` → détails que seul l'assistant connaît.
- **Bilingue en fichiers séparés** : tout contenu hors bloc GEN modifié dans une
  page FR doit être reporté dans la page EN (chemins relatifs avec `../` en plus).
- **CV** (`cv/index.html`) = page web ET source du PDF (impression A4, **2 pages**
  max). Tout ajout au CV doit être vérifié à l'impression.
- **Assistant** : `assets/js/chat.js` (client) → `chat-worker/` (Cloudflare Worker,
  garde la clé OpenRouter, modèles gratuits, 800 req/jour). La clé ne va
  **jamais** dans le dépôt.
- **ATS maison** (`ats/`, `en/ats/`) : outil 100 % navigateur (TF-IDF, cosinus,
  score logistique) — `assets/js/ats.js` (moteur + interface),
  `assets/js/ats-profil.js` (généré depuis `ats` dans `profil.mjs`).
  La note ne fait aucun appel réseau. Sur clic seulement, le relais rédige un
  avis neutre (`mode: "ats-avis"`) ou met en forme des notes (`"ats-redaction"`).
  Ces outils restent des démos sur le site : ils ne vont pas dans le CV.

## Règles à ne pas casser

- Direction visuelle « dossier bien tenu » : fond `--fond`, encre, **un seul
  accent** `--accent`. Pas de halo, dégradé, grain, lueur. Titres en Instrument Serif.
- Une seule animation d'entrée (le bandeau) + l'apparition de la grille de projets.
- `.cv-bloc` et `.chat-panneau` gardent `padding-block: 0` (sinon `section` les gonfle).
- Pas d'`overflow-x: hidden` sur `body` (casse la barre collante sur Safari).
- Aucun texte < 12 px ; ne pas éclaircir `--mut`, `--gris-2`, `--p-mut` (contrastes au seuil).
- **Tout est public** : aucun nom d'athlète, aucune donnée médicale ou
  confidentielle, aucun client non cité. Ne jamais inventer une compétence ou
  une référence : en cas de doute, demander à Clément.
- Les CV taillés pour une entreprise (`CV_Clement_Verdier_*.pdf`) restent hors Git.
