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

## 3. Disseny

**v4 (l'actual, publicada a `main`):** estil inspirat en Smartick (franja blau cel amb símbols blancs suaus i vora en ona, un únic botó d'acció taronja, maneres de practicar en targetes blanques amb icona de color, fons blanc-blau clar). La v3 es va trobar freda i «d'oficina». La v4 és **per a nens de Primària**: colors vius i plens (no pàl·lids), lletra gruixuda, botons grans que «es pitgen» (ombra inferior), dibuixos a les assignatures i l'òliba a la franja. **Botons i targetes rectangulars** (petició expressa del propietari).
- Inici: franja blava (òliba, salutació, objectiu del dia, ratxa, «Famílies») → **«Com vols practicar?» just davall la franja** (6 rajoles de colors) → missió d'avui → continua → assignatures (rajoles grans de color amb dibuix).
- **Les làmines i el material d'estudi van dins cada assignatura**, mai a l'inici.
- Assignatura: capçalera del color de l'assignatura amb dibuix i % après → làmines/material → unitats (número, temes amb Aprendre / Practicar, prova de la unitat).

**v3 (substituïda per la v4; queda a l'historial, commit `f64e445`):**

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
contingut/musica.js             contingut de MÚSICA (llenguatge musical)
programa/inici.js               pantalles: inici i pàgina d'assignatura (unitats, làmines, material)
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
2. ~~Temari complet de 6è~~ Fet (PR #1-#4, publicat a `main`): Matemàtiques 15 unitats / 49 temes, Anglès 10 / 38, Medi 14 / 37 (natural i social, 7 làmines), Música 11 / 19. Curs per defecte: 6è. **Pendent: el temari complet de 5è** amb el mateix procediment (secció 9).
3. (antic) **Desenvolupar el temari complet** de cada assignatura per a 5è i 6è (el propietari indicarà per on començar).
3. **Més làmines** (ciències sobretot: aparell digestiu, circulatori, la planta, la cèl·lula, el sistema solar...).
4. **Activar la IA** (un altre dia, quan el contingut estigui fet).
5. Més endavant: comptes d'usuari i progrés compartit entre aparells; altres cursos; altres idiomes.

## 8. Assignatures i registres

- Assignatures (`SUBJ`, a `programa/dades-app.js`): `mates` Matemàtiques · `angles` Anglès · `ciencies` **Medi** (Coneixement del medi natural, social i cultural; la clau continua sent `ciencies` per no perdre el progrés) · `musica` **Música** (llenguatge musical).
- Cada arxiu de contingut **només afegeix** coses als registres (definits a `dades-app.js`, que es carrega abans):
  - `Object.assign(SK,{ id:{mat:'...', ab:'Xx', curs:[6], ...} })` — temes. `ab` = codi de 2 lletres; `curs` = cursos on surt (sense `curs` = tots).
  - `UNITS.<assig> = [[nom, [ids], (opcional) [cursos]], ...]` — unitats en l'ordre del llibre.
  - `(LAMINES.<assig>=LAMINES.<assig>||[]).push({obre:'funcio()', nom, desc, ic})` — des de l'arxiu de la làmina.
  - `MATERIAL.<assig> = [{obre:'funcio()', nom, desc, ic}]` — taules, temaris...
  - `Object.assign(ERR,{codi:{kid:'missatge a l\'infant', par:'descripció per als pares'}})` — errors típics.
- `index.html` té un **bloc per assignatura** (`<!-- ===== MEDI ===== -->` ... `<!-- fi medi -->`): els `<script>` nous d'una assignatura van només dins el seu bloc.

## 9. Desenvolupar el temari d'un curs (una sessió per assignatura)

Objectiu: el temari **complet de 6è** (i després 5è) de cada assignatura, segons el **currículum oficial de les Illes Balears** (LOMLOE, Decret 32/2022, sabers bàsics del 3r cicle de Primària), contrastat amb l'estructura habitual dels llibres de 6è. Anotar les fonts a la capçalera de l'arxiu.

Cada sessió:
1. Treballa en una **branca pròpia**: `temari-6e-<assignatura>`, sortint de `main`.
2. **Només toca els arxius de la seva assignatura**: `contingut/<assignatura>*.js` (pot crear-ne de nous, p. ex. `contingut/medi-social.js`), `contingut/lamines/*.js` de la seva assignatura i el seu bloc d'`index.html`. **No toca** `programa/`, `estil/` ni els arxius d'altres assignatures. Si necessita un component nou (un tipus d'exercici que no existeix), el fa dins el seu propi arxiu de contingut o ho explica al PR.
3. Per a cada unitat: temes amb teoria clara (11-12 anys, català correcte), exemples, exercicis **verificables** generats per codi (variats, amb nivells `lv`), pistes que no donen la resposta, explicació pas a pas (`steps`) i errors típics (`ERR`). Respostes escrites (res d'opcions per endevinar). Làmines interactives (SVG) on ajudin a entendre: sobretot a Medi.
4. Marca els temes nous de 6è amb `curs:[6]` (els que ja hi ha serveixen per a 5è i 6è).
5. Prova-ho al navegador (`.claude/serve.ps1`, p. ex. port 8772 per no xocar) amb el curs posat a 6è, a mida d'ordinador i de mòbil, i comprova que **cap generador falla ni dona l'error típic amb la resposta correcta**.
6. Fa commits petits, puja la branca i obre un **PR cap a `main`**. El propietari decideix quan s'ajunta.

## 10. Normes de treball

- Treballar per **tasques petites**: una sessió per tema o per làmina.
- Abans de canviar res gros, **generar una còpia** (`eines\construir.ps1`).
- No posar mai dades personals de l'infant al codi. La clau de la IA només es guarda al navegador.
- Textos en català correcte; explicacions curtes i adaptades a 11-12 anys.
