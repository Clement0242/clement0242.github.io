/* ============================================================================
   Clément Verdier — comportements du site.

   Amélioration progressive stricte : sans ce fichier, la page reste entière,
   lisible et navigable. AUCUN contenu ne part masqué — c'est la règle qui a
   décidé de tout ce qui suit. Une animation d'entrée ne doit jamais pouvoir
   effacer une page si le script échoue, si l'onglet s'ouvre en arrière-plan
   ou si l'observateur ne se déclenche pas.
   ========================================================================= */

(function () {
  "use strict";

  var doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observable = "IntersectionObserver" in window;

  /* ------------------------------ 1. LE MOMENT ORCHESTRÉ : LA SÉANCE SE REJOUE */
  /* Le profil accélération-vitesse se reconstruit sous les yeux : trame, axes,
     puis les points dans l'ordre des vitesses croissantes, la droite qui balaie
     et les intercepts qui tombent. Armé à l'entrée dans la vue — lancé au
     chargement, il se jouerait pendant qu'on lit encore le titre.
     Le graphique est COMPLET dans le HTML : l'animation n'ajoute rien, elle
     ne fait que retarder ce qui est déjà là. */

  var releve = document.querySelector(".releve");
  if (releve) {
    if (observable) {
      var vigieG = new IntersectionObserver(function (e, obs) {
        if (!e[0].isIntersecting) return;
        releve.classList.add("anim");
        obs.disconnect();
      }, { threshold: 0.25 });
      vigieG.observe(releve);
    } else {
      releve.classList.add("anim");
    }
  }

  /* -------------------------------------- 2. LA GRILLE DE PROJETS EN SÉRIE */
  /* Une liste qui apparaît comme une liste : le décalage dit « ce sont des
     éléments d'un même ensemble ». Plafonné à 0,3 s au total — au-delà, le
     dernier se fait attendre et le procédé devient une taxe.
     C'est le SEUL endroit du site qui rejoue une entrée au défilement. */

  var grille = document.querySelector(".projets");
  if (grille && observable && !doux) {
    var vigieP = new IntersectionObserver(function (e, obs) {
      if (!e[0].isIntersecting) return;
      var cartes = grille.children;
      var pas = Math.min(0.06, 0.3 / Math.max(1, cartes.length));
      Array.prototype.forEach.call(cartes, function (c, i) {
        c.style.animationDelay = (i * pas).toFixed(3) + "s";
      });
      grille.classList.add("serie");
      obs.disconnect();
    }, { threshold: 0.12 });
    vigieP.observe(grille);
  }

  /* ------------------------------------------------- 3. LA BARRE SE DÉTACHE */
  /* Elle prend son ombre dès qu'elle ne repose plus sur le haut de la page :
     un changement d'état, pas un effet. */

  var barre = document.querySelector(".barre");
  if (barre) {
    var poser = function () {
      barre.classList.toggle("detachee", window.scrollY > 8);
    };
    poser();
    window.addEventListener("scroll", poser, { passive: true });
  }

  /* ----------------------------------------------------------- 4. SCROLLSPY */
  /* La barre dit où l'on se trouve. Sans cela, sur une page longue, les cinq
     liens restent inertes et n'aident plus à se situer. */

  var ancres = [].slice.call(document.querySelectorAll('.liens a[href^="#"]'));
  var cibles = ancres
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (cibles.length && observable) {
    var courant = null;
    var vigieS = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = "#" + e.target.id;
        if (id === courant) return;
        courant = id;
        ancres.forEach(function (a) {
          if (a.getAttribute("href") === id) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    cibles.forEach(function (c) { vigieS.observe(c); });
  }

  /* --------------------------------------- 5. LA LANGUE CHOISIE EST RETENUE */
  /* On note le choix, sans JAMAIS rediriger de force : une redirection
     automatique casse le bouton Retour et empêche de consulter volontairement
     l'autre version. La note ne sert qu'à un éventuel usage ultérieur. */

  try {
    document.querySelectorAll(".langue a").forEach(function (a) {
      a.addEventListener("click", function () {
        localStorage.setItem("langue", a.getAttribute("hreflang"));
      });
    });
  } catch (e) { /* navigation privée, stockage bloqué : sans conséquence */ }

})();
