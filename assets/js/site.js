/* ============================================================================
   Clément Verdier — comportements du site.

   Amélioration progressive stricte : sans ce fichier, la page reste entière,
   lisible et navigable. AUCUN contenu ne part masqué. Le carrousel se balaie
   au doigt (défilement par accroche natif) même script désactivé ; les
   flèches et les pastilles ne font qu'ajouter le clic.
   ========================================================================= */

(function () {
  "use strict";

  var doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observable = "IntersectionObserver" in window;

  /* ============================================ 1. CARROUSELS DE CAPTURES */

  document.querySelectorAll("[data-vues]").forEach(function (bloc) {
    var piste = bloc.querySelector(".vues-piste");
    var vues  = piste ? piste.querySelectorAll(".vue") : [];
    var prec  = bloc.querySelector(".vues-nav.prec");
    var suiv  = bloc.querySelector(".vues-nav.suiv");
    var points = bloc.querySelector(".vues-points");

    /* Une seule vue = pas de carrousel. Afficher des flèches qui ne mènent
       nulle part serait pire que de ne rien afficher : la carte promettrait
       des captures qui n'existent pas. */
    if (!piste || vues.length < 2) {
      if (prec) prec.remove();
      if (suiv) suiv.remove();
      if (points) points.remove();
      return;
    }
    bloc.classList.add("a-plusieurs");

    var nom = bloc.getAttribute("data-vues") || "ce projet";
    var courant = 0;

    /* Les pastilles sont construites ici et pas dans le HTML : leur nombre
       dépend des captures réellement déposées. Écrites en dur, elles
       mentiraient dès qu'on en ajoute ou qu'on en retire une. */
    if (points) {
      vues.forEach(function (v, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Voir la vue " + (i + 1) + " sur " + vues.length + " — " + nom);
        b.addEventListener("click", function () { aller(i); });
        points.appendChild(b);
      });
    }

    function aller(i) {
      i = Math.max(0, Math.min(vues.length - 1, i));
      piste.scrollTo({ left: vues[i].offsetLeft - piste.offsetLeft, behavior: doux ? "auto" : "smooth" });
    }

    function marquer(i) {
      courant = i;
      if (points) {
        Array.prototype.forEach.call(points.children, function (b, k) {
          if (k === i) b.setAttribute("aria-current", "true");
          else b.removeAttribute("aria-current");
        });
      }
      /* Les extrémités désactivent leur flèche : un bouton qui ne fait rien
         doit le dire, pas rester actif et paraître cassé. */
      if (prec) prec.disabled = i === 0;
      if (suiv) suiv.disabled = i === vues.length - 1;
    }

    if (prec) prec.addEventListener("click", function () { aller(courant - 1); });
    if (suiv) suiv.addEventListener("click", function () { aller(courant + 1); });

    /* On suit le défilement réel (doigt, molette, clic) plutôt que de tenir
       un compteur de notre côté : sinon un balayage au doigt désynchronise
       les pastilles de ce qui est affiché. */
    var attente;
    piste.addEventListener("scroll", function () {
      clearTimeout(attente);
      attente = setTimeout(function () {
        var i = Math.round(piste.scrollLeft / piste.clientWidth);
        if (i !== courant) marquer(i);
      }, 80);
    }, { passive: true });

    /* Flèches du clavier quand la piste a le focus. */
    piste.setAttribute("tabindex", "0");
    piste.setAttribute("role", "group");
    piste.setAttribute("aria-label", "Captures — " + nom + ", " + vues.length + " vues");
    piste.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); aller(courant + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); aller(courant - 1); }
    });

    marquer(0);
  });

  /* =========================================== 2. LA GRILLE DE PROJETS */
  /* Une liste qui apparaît comme une liste. Décalage total plafonné à 0,3 s :
     au-delà, le dernier se fait attendre et le procédé devient une taxe.
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

  /* ============================================ 3. PROJECTEUR AU CURSEUR */
  /* La nappe lumineuse suit le pointeur sur la carte visée. Coupée sur les
     appareils sans pointeur fin : sur un écran tactile elle resterait figée
     là où le doigt a touché en dernier, ce qui ne désigne plus rien. */

  if (!doux && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".projet").forEach(function (carte) {
      carte.addEventListener("pointermove", function (e) {
        var r = carte.getBoundingClientRect();
        carte.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        carte.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      });
    });
  }

  /* ================================================ 4. LA BARRE SE DÉTACHE */

  var barre = document.querySelector(".barre");
  if (barre) {
    var poser = function () { barre.classList.toggle("detachee", window.scrollY > 8); };
    poser();
    window.addEventListener("scroll", poser, { passive: true });
  }

  /* ============================================================ 5. SCROLLSPY */

  var ancres = [].slice.call(document.querySelectorAll('.liens a[href^="#"]'));
  var cibles = ancres
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (cibles.length && observable) {
    var courantId = null;
    var vigieS = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = "#" + e.target.id;
        if (id === courantId) return;
        courantId = id;
        ancres.forEach(function (a) {
          if (a.getAttribute("href") === id) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    cibles.forEach(function (c) { vigieS.observe(c); });
  }

  /* ================================= 6. LE RUBAN S'ARRÊTE HORS DE L'ÉCRAN */
  /* Une boucle qui tourne sans être vue consomme du temps machine et de la
     batterie pour rien. */

  var ruban = document.querySelector(".ruban-piste");
  if (ruban && observable && !doux) {
    new IntersectionObserver(function (e) {
      ruban.style.animationPlayState = e[0].isIntersecting ? "running" : "paused";
    }).observe(ruban);
  }

  /* ==================================== 7. LA LANGUE CHOISIE EST RETENUE */
  /* On note le choix, sans JAMAIS rediriger de force : une redirection
     automatique casse le bouton Retour et empêche de consulter volontairement
     l'autre version. */

  try {
    document.querySelectorAll(".langue a").forEach(function (a) {
      a.addEventListener("click", function () {
        localStorage.setItem("langue", a.getAttribute("hreflang"));
      });
    });
  } catch (e) { /* navigation privée, stockage bloqué : sans conséquence */ }

})();
