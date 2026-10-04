# clement0242.github.io

Site de présentation de Clément Verdier — ingénieur data, haute performance sportive.
Site **statique** : aucun build, aucune dépendance, aucun outil à installer.
On ouvre un fichier, on l'édite, on pousse.

## Adresse

<https://clement0242.github.io>

## Le dossier

```
index.html            page française (tout le contenu)
cv/index.html         CV français — écran ET mise en page A4
en/index.html         page anglaise
en/cv/index.html      CV anglais
assets/css/site.css   design système : couleurs, typo, composants, animations
assets/css/cv.css     mise en page du CV (palette claire, propre au document)
assets/js/site.js     carrousels, projecteur, navigation
assets/js/cv.js       le bouton « imprimer »
assets/js/chat.js     l'assistant « Une question sur Clément ? »
chat-worker/          le relais de l'assistant (Cloudflare Worker) — garde la clé OpenRouter
assets/img/projets/   TES CAPTURES D'ÉCRAN (voir LISEZ-MOI.txt dedans)
```

## Ajouter des captures d'écran à un projet

C'est la manipulation la plus courante, et elle ne demande aucun outil.

1. Déposer les images dans `assets/img/projets/`.
2. Dans `index.html`, trouver le projet concerné, puis le bloc en commentaire
   qui commence par `<!-- CAPTURES :`.
3. Retirer les marqueurs de commentaire (`<!--` et `-->`) et corriger le nom du
   fichier, le texte `alt` et la légende. Dupliquer le bloc `<figure class="vue">`
   autant de fois qu'il y a d'images.
4. Faire la même chose dans `en/index.html` (le chemin y commence par `../`).

Les flèches, les pastilles et le clavier apparaissent **tout seuls** dès qu'il y
a plus d'une vue. Avec une seule, le carrousel se replie : pas de flèche qui ne
mène nulle part.

⚠️ **Ces images partent sur un site public et permanent.** Vérifier qu'aucune ne
laisse voir un nom d'athlète, une date de naissance, une donnée médicale ou un
identifiant. Flouter ou remplacer par des données factices si besoin.

## Publier une modification

```bash
git add -A
git commit -m "maj : ce que j'ai changé"
git push
```

GitHub Pages republie tout seul en une à deux minutes.

⚠️ **Le site est bilingue, en deux fichiers séparés.** Une modification de
contenu dans `index.html` doit être reportée à la main dans `en/index.html`.
C'est le prix du zéro-build : assumé, mais à ne pas oublier, sinon les deux
versions divergent en silence.

## Le CV

`cv/index.html` est **à la fois** la page CV du site et la source du PDF.
Pour produire le PDF : ouvrir la page, cliquer « Imprimer ou enregistrer en
PDF », choisir « Enregistrer au format PDF ». La mise en page A4 est réglée
(2 pages).

Il n'y a donc **pas de PDF à maintenir séparément** : on corrige le HTML, le PDF
suit. Les CV taillés pour une entreprise précise sont exclus par `.gitignore` —
ils ne doivent pas se retrouver en ligne.

## Le profil : une seule source

**Tout le parcours vit dans `profil/profil.mjs`** (FR + EN) : expériences,
formations, compétences, langues, localisation, et ce que seul l'assistant
connaît (personnalité, stages détaillés, mémoire, projets). On ne retouche
JAMAIS à la main les blocs entre `<!-- GEN:… -->` dans les pages : ils sont
écrasés à la génération.

```bash
npm run generer     # réécrit les 4 pages + chat-worker/profil.js
npm run verifier    # échoue si une page n'est plus à jour (avant un commit)
npm run tester      # questions de référence sur l'assistant LOCAL
npm run deployer    # generer → tester → déploie l'assistant (stoppe si un test échoue)
```

Un champ `site: false` n'apparaît que dans l'assistant ; un bloc `cv: {…}`
donne la variante propre au CV. Les tests vivent dans
`outils/cas-assistant.mjs` : ajouter un cas à chaque mauvaise réponse
constatée en vrai. La clé de test se met dans `chat-worker/.dev.vars`
(`OPENROUTER_API_KEY=…`, ignoré par Git).

## L'assistant conversationnel

Les visiteurs posent leurs questions à un assistant IA qui ne connaît QUE
`chat-worker/profil.js` (repris du site et du CV). Modèles **gratuits**
OpenRouter uniquement, en cascade : Nemotron 3 Ultra 550B → Nemotron 3 Super →
Qwen 3.8 27B → routeur `openrouter/free`.

⚠️ **La clé OpenRouter ne va JAMAIS dans le site** (dépôt et pages publics :
n'importe qui la lirait). Elle vit dans un secret Cloudflare ; le navigateur
parle au relais, qui seul la connaît, impose les modèles gratuits et limite le
débit par IP.

Déploiement (une fois, compte Cloudflare gratuit) :

```bash
cd chat-worker
npx wrangler login
npx wrangler secret put OPENROUTER_API_KEY   # coller la clé quand demandé
npx wrangler deploy                          # affiche l'URL *.workers.dev
```

URL en service : https://clement-assistant.clement-verdier.workers.dev (déjà
branchée). En cas de changement, coller la nouvelle URL dans `data-endpoint="…"` de la balise `chat.js` des
**quatre** pages (`index.html`, `en/index.html`, `cv/index.html`,
`en/cv/index.html`). Tant que l'attribut est vide, l'assistant n'apparaît pas.

Mettre à jour ce que sait l'assistant : modifier `profil/profil.mjs` puis
`npm run deployer`. Tout ce qui y est écrit devient public.

## Règles de conception à ne pas casser

- **Rien d'essentiel ne dépend de JavaScript.** Toutes les sections sont
  visibles par défaut ; le script n'ajoute que le carrousel au clic, le
  projecteur et l'état de la navigation. Le carrousel se balaie déjà au doigt
  sans script (défilement par accroche natif).
- **Direction claire et épurée** (refonte du 03/10/2026) : papier blanc cassé,
  encre, un seul accent bleu nuit (`--accent`) réservé aux liens, dates et états
  actifs. Pas de halo, de grain, de dégradé ni de lueur — c'était ce qui faisait
  « site généré par IA ». Nom et grands titres en Instrument Serif.
- **Un seul moment animé** : l'apparition du bandeau. Si on ajoute une entrée en
  fondu sur chaque section, l'effet devient un tic et la page se met à ramer.
- ⚠️ **`.cv-bloc` et `.chat-panneau` doivent garder `padding-block: 0`.** `site.css` pose
  `section { padding-block: clamp(64px, 10vw, 140px) }`, et les blocs du CV sont
  des `<section>` (le panneau du chat aussi) : sans cette remise à zéro le CV
  s'étire sur quatre pages et le chat se tasse au milieu de son cadre.
- ⚠️ **Ne pas remettre `overflow-x: hidden` sur `body`** : cela casse la barre
  de navigation collante sur Safari. Les halos sont déjà bornés par `.quart`.
- **Contrastes vérifiés** au rendu réel, composite alpha compris. `--gris-2` et
  `--p-mut` sont calibrés au seuil : les éclaircir casse l'accessibilité.
- **Aucun texte sous 12 px** (en dessous, iOS zoome à la sélection).
- **Aucune donnée d'athlète, aucun nom de joueur** nulle part.

## À faire

- [ ] Remplir la section **Publications** (titre, revue/congrès, année,
      co-auteurs, DOI) dans `index.html` et `en/index.html`. Le gabarit est
      juste au-dessus, dans l'entrée du séminaire INSEP.
- [ ] Déposer les captures d'écran des projets.
- [ ] Relire et valider les descriptions liées à l'INSEP, la FFBB et les clubs
      avant diffusion large.
