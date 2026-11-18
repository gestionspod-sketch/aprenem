# Aprenem — app d'estudi amb IA per a Primària

Document del projecte. Qualsevol persona (o sessió de Claude) que hi treballi l'ha de llegir abans de començar.

## 1. Què és

Aplicació web educativa perquè infants de **5è i 6è de Primària** (11-12 anys) estudiïn de manera personalitzada:
professor particular, aventura, exercicis interactius, comprovació i escriptura a mà amb foto.
Més endavant: la resta de Primària i l'ESO.

- **Idioma:** tot en **català** (variant de les Illes Balears acceptada: *varen*, *davall*...). Currículum de les Illes Balears.
- **Assignatures actuals:** Matemàtiques, Anglès, Ciències naturals.
- **Cost zero:** sense subscripcions. IA opcional amb la clau gratuïta de Google AI Studio (Gemini).
- **Dues zones:** l'app s'obre a la **zona infant**. La **zona famílies** és darrere un botó discret («Famílies», a la franja blava) amb **PIN**.

## 2. Principis pedagògics (no negociables)

1. **El joc motiva, però l'objectiu és aprendre.** Superar una aventura no vol dir dominar un tema.
2. **Res d'assaig i error:** les respostes s'**escriuen** (no hi ha opcions per clicar a l'atzar).
   - Si respon massa ràpid i malament → bloqueig curt i missatge «pensa abans de respondre».
   - 2 errors al mateix exercici → **explicació guiada pas a pas** i després un exercici **nou amb dades diferents**.
   - A l'aventura, cada prova té un **segell**: el mateix concepte amb dades noves i sense pistes.
   - En els manipulatius (barres, grups, cadenes), el feedback no diu «massa / poc» (evitaria la cerca a cegues).
3. **Solucions verificables:** els exercicis es generen per codi amb la solució calculada. La IA no inventa exercicis puntuables.
4. **Tres nivells per tema:** *En procés* (necessita ajuda) · *Comprèn* (≥3 encerts sense ajuda i ≥60 %) · *Domina* (comprovació final sense pistes ≥75 %).
5. **Errors típics detectats** (p. ex. sumar denominadors, «goed», «didn't went») → missatge específic a l'infant i resum per als pares.
6. Els errors serveixen per aprendre, no per castigar. To amable, frases curtes.

## 3. Disseny (v3 — l'actual, publicada a `main`)

**v3 = barreja triada pel propietari:** base **acadèmica i estructurada** (unitats com el llibre, barra de domini per temes, prova de la unitat), **targetes il·lustrades** (franja de color amb icona gran) per a «Continua on ho deixares», assignatures i làmines, i **només un element de joc**: objectiu del dia (anell de minuts) i ratxa de dies seguits. Sense punts ni nivells.
- Inici: franja blau marí amb salutació + objectiu del dia + ratxa + botó discret «Famílies»; «Continua on ho deixares»; «Missió d'avui»; assignatures amb domini; làmines i material; altres modes.
- Assignatura: domini de l'assignatura (segments per tema: no començat / en procés / comprèn / domina), material, i una targeta per unitat amb els temes (Aprendre / Practicar) i «Fer la prova».
- Les unitats es defineixen a `contingut/unitats.js`; les pantalles, a `programa/inici.js`.

Base comuna (v2 i v3). Públic: 11-12 anys → **sobri, no infantil**.
- **Tipografia del sistema** (San Francisco a l'iPhone, Segoe UI a Windows). Sense Google Fonts.
- **Botons i targetes rectangulars, sense cantons arrodonits.** Sense ombres «inflades».
- **Icones de línia** (SVG, `programa/icones.js`) per a assignatures i modes. Cada tema té un **codi de 2 lletres** (Fe, Ir, Pp, Rs...) en lloc d'emoticones.
- Emoticones només com a **contingut** (p. ex. dibuixos del vocabulari d'anglès), mai com a decoració.
- Colors: blau marí `--navy` per a la franja i l'aventura; un color per assignatura: Matemàtiques `--s-mates` (blau), Anglès `--s-angles` (granat), Ciències `--s-ciencies` (verd).
- Ha de funcionar a **iPhone** (mida mòbil), iPad i ordinador.
- **Làmines il·lustrades** (SVG interactiu) per explicar continguts, sobretot de ciències: amb noms / sense noms (prova), toc per veure la funció de cada part, i exercicis «quina part és el número N?».

La **v1** (disseny més infantil) es conserva a `versions/aprenem-v1.html` només com a referència.

## 4. Estructura dels arxius

```
index.html                      obre l'app (doble clic) — carrega la resta
estil/app.css                   estils (base + disseny v2 al final)
programa/utils.js               utilitats: fraccions, nombres...
programa/dades-app.js           assignatures, modes, errors típics (ERR), aventura, dictats
programa/nucli.js               estat i progrés, rellotge, veu, IA (Gemini), components d'exercici
programa/pantalles.js           pantalles: inici, assignatura, taula de verbs, temari, modes, zona famílies, PIN
programa/icones.js              icones de línia i codis de tema (s'aplica al final)
contingut/matematiques.js       temes de matemàtiques
contingut/angles.js             temes d'anglès + taula de verbs (IRR, REG) + TEMARI
contingut/ciencies.js           temes de ciències + utilitats de text (norm, fold...)
contingut/lamines/*.js          una làmina per arxiu (p. ex. aparell-respiratori.js)
contingut/unitats.js            unitats de cada assignatura (UNITS) i llista de làmines (LAMINES)
programa/inici.js               pantalles v3: inici i pàgina d'assignatura
eines/construir.ps1             genera la versió d'un sol arxiu (publicar + còpia de seguretat)
publica/                        arxius generats per publicar a Claude (no editar a mà)
versions/                       còpies antigues i còpies automàtiques (no editar)
```

L'ordre de càrrega és el d'`index.html`. Els arxius de `contingut/` només afegeixen temes a l'objecte `SK`.

## 5. Com afegir contingut

### Un tema nou (skill)
Afegir-lo a l'arxiu de l'assignatura amb `Object.assign(SK,{ id:{...} })`:
```js
id_tema:{mat:'ciencies', nom:'Nom visible', ic:'xx', bloc:'(opcional, agrupa temes)',
  teoria:['paràgraf HTML', ...],               // mode Professor
  fig:()=>svg,                                 // (opcional) làmina dins la teoria
  gen(lv, curs){ return {                      // lv: 0 en procés, 1 comprèn, 2 domina
    text:'enunciat HTML', fig:'(opcional) svg',
    fields:[{label:'Resposta', ans:R(3,4)}]      // numèric/fracció...
         // o [{label, txt:['resposta','sinònim'], loose:true, wide:true}]  // text
    hints:['pista 1 (no dona la resposta)','pista 2'],
    steps:['pas 1','pas 2','resultat'],         // explicació guiada
    err:v=>'codi_error'|null                    // errors típics → afegir-los a ERR (dades-app.js)
  }}}
```
- `loose:true` accepta majúscules, accents i articles («el cor»), i avisa de l'ortografia.
- Afegir el **codi de 2 lletres** a `AB` (`programa/icones.js`).
- Si és d'anglès i ha de sortir en un ordre concret: `SK_ORDER` i `TEMARI` (`contingut/angles.js`).

### Una làmina nova
Copiar `contingut/lamines/aparell-respiratori.js`: un objecte amb les parts (número, nom, sinònims acceptats, punt, posició de l'etiqueta, funció), una funció que dibuixa l'SVG (`mode:'labels'|'numbers'`, `hi:` part destacada), el tema d'exercicis i la pantalla. Afegir el `<script>` a `index.html` i l'accés a la pàgina de l'assignatura (`subject()` a `pantalles.js`).

## 6. Provar i publicar

- **GitHub:** https://github.com/gestionspod-sketch/aprenem (públic). La branca `main` es publica sola a **GitHub Pages**: https://gestionspod-sketch.github.io/aprenem/ (aquí la IA sí pot funcionar). Cada tasca gran es fa en una branca pròpia i s'ajunta a `main` quan el propietari la dona per bona.
- Git i GitHub CLI estan instal·lats a `C:\Program Files\Git\cmd` i `C:\Program Files\GitHub CLI` (si no són al PATH, cal posar-hi aquestes carpetes). Commits amb l'adreça privada `338169047+gestionspod-sketch@users.noreply.github.com`.
- **Provar a l'ordinador:** doble clic a `index.html` (Chrome o Edge).
- **Generar la versió d'un sol arxiu:** `powershell -ExecutionPolicy Bypass -File eines\construir.ps1`
  → `publica\aprenem.html` (per publicar) i una còpia datada a `versions\`.
- **Publicar a Claude (iPhone):** publicar `publica\aprenem.html` a l'enllaç de la v2. A la versió publicada **la IA no funciona** (Claude no deixa connectar amb Google) ni el micròfon ni imprimir.
  - v2: https://claude.ai/artifact/ULUEf99sMTz4nBws1zPvqY
  - v1: https://claude.ai/artifact/WihwPNiQ2ARU4W4Fa2fKdj
- El progrés es guarda al navegador de cada aparell (localStorage, clau `aprenem_v1`). No es comparteix entre aparells.

## 7. Estat i propers passos

Fet: 3 assignatures (31 temes), 6 modes, aventura, comprovació, escriptura amb foto, zona famílies amb PIN,
taula de 68 verbs irregulars i 40 regulars (infinitiu, passat, participi, traducció), temari d'anglès 5è-6è,
làmina de l'aparell respiratori, rellotge amb avisos i pas automàtic de fase, disseny v2.

Pendent (per ordre):
1. ~~Decidir si la v3 passa a `main`~~ Fet: la v3 és l'actual. (La v2 queda al commit `8ffe380` i a `versions/aprenem-v2-un-sol-arxiu.html`.)
2. **Desenvolupar el temari complet** de cada assignatura per a 5è i 6è (el propietari indicarà per on començar).
3. **Més làmines** (ciències sobretot: aparell digestiu, circulatori, la planta, la cèl·lula, el sistema solar...).
4. **Activar la IA** (un altre dia, quan el contingut estigui fet).
5. Més endavant: comptes d'usuari i progrés compartit entre aparells; altres cursos; altres idiomes.

## 8. Normes de treball

- Treballar per **tasques petites**: una sessió per tema o per làmina.
- Abans de canviar res gros, **generar una còpia** (`eines\construir.ps1`).
- No posar mai dades personals de l'infant al codi. La clau de la IA només es guarda al navegador.
- Textos en català correcte; explicacions curtes i adaptades a 11-12 anys.
