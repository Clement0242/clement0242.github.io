/* Rend outils/apercu.html en assets/img/apercu-fr.png et apercu-en.png
   (1200×630). Nécessite Playwright, absent de ce dépôt (zéro dépendance) :
     PLAYWRIGHT=<chemin vers un node_modules/playwright> node outils/apercu.mjs
   À relancer seulement si le portrait, le nom ou le titre changent. */

import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT || "playwright");

const navigateur = await chromium.launch();
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
for (const l of ["fr", "en"]) {
  await page.goto(pathToFileURL(join(RACINE, "outils/apercu.html")).href + "?lang=" + l, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(RACINE, `assets/img/apercu-${l}.png`) });
  console.log(`assets/img/apercu-${l}.png`);
}
await navigateur.close();
