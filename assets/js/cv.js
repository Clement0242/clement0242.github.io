/* Le bouton d'impression. Il n'existe que si JavaScript répond : sans lui,
   Ctrl+P fait exactement la même chose, et un bouton mort serait pire
   qu'aucun bouton. */
(function () {
  "use strict";
  var b = document.querySelector("[data-imprimer]");
  if (!b) return;
  b.addEventListener("click", function () { window.print(); });
})();
