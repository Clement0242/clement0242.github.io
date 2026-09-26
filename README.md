# clement0242.github.io

Site de présentation de Clément Verdier — ingénieur data, haute performance sportive.
Site **statique** : aucun build, aucune dépendance, aucun outil à installer.
On ouvre un fichier, on l'édite, on pousse.

## Adresse

<https://clement0242.github.io>

## Ce qu'il y a dans le dossier

```
index.html            page française (tout le contenu)
cv/index.html         CV français, mis en page pour l'écran ET pour l'A4
en/index.html         page anglaise
en/cv/index.html      CV anglais
assets/css/site.css   tout le design système (couleurs, typo, composants)
assets/css/cv.css     mise en page du CV, écran et impression
assets/js/site.js     animations et navigation (jamais nécessaires au contenu)
assets/js/cv.js       le bouton « imprimer »
```

## Mettre le site à jour

1. Ouvrir le fichier concerné, modifier le texte, enregistrer.
2. Vérifier dans un navigateur : double-cliquer sur `index.html` suffit.
3. Publier :

```bash
git add -A
git commit -m "maj : ce que j'ai changé"
git push
```

GitHub Pages republie tout seul en une à deux minutes.

⚠️ **Le site est bilingue et les deux versions sont deux fichiers séparés.**
Une modification de contenu dans `index.html` doit être reportée à la main dans
`en/index.html`. C'est le prix à payer pour n'avoir aucun build : assumé, mais à
ne pas oublier, sinon les deux versions divergent en silence.

## Le CV

`cv/index.html` est **à la fois** la page CV du site et la source du PDF.
Pour produire le PDF : ouvrir la page, cliquer « Imprimer ou enregistrer en PDF »,
choisir « Enregistrer au format PDF ». La mise en page A4 est déjà réglée (2 pages).

Il n'y a donc **pas de PDF à maintenir séparément** : on corrige le HTML, le PDF
suit. Les CV taillés pour une entreprise précise sont exclus par `.gitignore` —
ils ne doivent pas se retrouver en ligne.

## Règles de conception à ne pas casser

- **Rien d'essentiel ne dépend de JavaScript.** Toutes les sections sont visibles
  par défaut ; le script ne fait qu'animer et signaler l'état. Si on ajoute une
  animation d'entrée, le contenu doit rester lisible script désactivé.
- **Le graphique du bandeau est dans le HTML**, en SVG complet. Ce n'est pas une
  image : il se redimensionne, il s'imprime, et un lecteur d'écran lit sa
  description. Les valeurs tracées sont **simulées** et c'est écrit dans la page.
- **Le vermillon (`--vermillon`) ne décore jamais.** Il marque ce qui est actif,
  mesuré, ou mis en avant. Utilisé partout, il ne veut plus rien dire.
- **Aucune donnée d'athlète, aucun nom de joueur, aucune capture d'écran réelle**
  d'un outil client. Les projets sont décrits par leur méthode.
- **Contrastes vérifiés** : `--ink-mut` est calibré pour tenir 4,5:1 sur les trois
  fonds du système. Éclaircir cette valeur casse l'accessibilité.
- **Aucun texte sous 12 px** (en dessous, iOS zoome à la sélection).

## À faire

- [ ] Remplir la section **Publications** (titre, revue/congrès, année,
      co-auteurs, DOI) dans `index.html` et `en/index.html`.
- [ ] Relire et valider les descriptions de projets liés à l'INSEP, la FFBB et
      les clubs avant toute diffusion large.
