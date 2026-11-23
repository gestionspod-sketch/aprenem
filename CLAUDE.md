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

**Suau (l'actual):** estil suau i amable aprovat pel propietari a partir de les maquetes de `disseny/suau/` (Inici i Exercici i Resultat de mòbil, Inici d'ordinador; les dades són inventades). **Manté l'estructura de pantalles i la lògica de la v5** (vegeu més avall); només canvia l'aspecte. La norma antiga de «botons i targetes rectangulars» **queda anul·lada**: ara els cantons arrodonits són la norma.
- **Lletra Poppins** (Google Fonts, amb la del sistema de reserva). Tinta `#1E1B3A`, text suau `#8A879E`. Fons de l'app `#F1F4F8` a l'ordinador amb panells blancs; al mòbil, fons blanc.
- **Colors:** lila d'accent `#8B6CF0` (fosc `#6E4FE0` / `#4B2FB8`), taronja càlid `#F2853A`. Targetes pastel: préssec `#FDE3B8` (continua), lavanda `#E3D9FD` (objectiu i ratxa, amb l'òliba), cel `#D6E8FD`, menta `#D4F1E4`, rosa `#FBDDEB`, llima `#DDF3C9` (maneres de practicar).
- **Assignatures:** cada una té tres variables a `estil/app.css`: `--s-<assig>` color fort (barres), `--t-<assig>` rajola pastel i `--d-<assig>` color fosc (text i icona). `sujC(m)` (`inici.js`) les posa com a `--c`, `--t` i `--d`.
- **Formes:** cantons de 18-28 px a les targetes, 20 px als camps de resposta, botons en **píndola**. Ombres suaus només on cal, sense vores pertot. Botó principal lila; el de «Continua» de l'inici, taronja.
- **Mascota:** l'òliba rodona lila (`OWLM()` a `pantalles.js`), també com a logotip a dalt del menú.
- **Logotip** (proposta A triada pel propietari el 23-11-2026): l'òliba rodona + «aprenem» en Poppins 600 (`disseny/logo/aprenem-logo.svg`, `aprenem-oliba.svg`). Icones de l'app: `icones/icona.svg` (òliba blanca sobre quadrat lila), `icones/favicon.svg` (versió simplificada per a mides petites) i `icones/apple-touch-icon.png` (180 px, pantalla d'inici de l'iPhone).
- **Closca:** ordinador i tauleta = **barra d'icones blanca i arrodonida** amb l'òliba a dalt (dins Assignatures, una rajola per assignatura). Mòbil (<768 px) = **barra inferior blanca** amb els cantons de dalt arrodonits (només icones).
- **Inici:** data i salutació, cercador, targeta préssec «Continua on ho deixares» (anell de % de la unitat) + targeta lavanda «Objectiu d'avui» (minuts, ratxa i l'òliba), «Com vols practicar?» (6 rajoles pastel), assignatures (rajola pastel + barra del seu color). A sota: missió d'avui, la setmana (ratxa) i el consell de l'òliba.
- **Exercici:** full blanc arrodonit; figura a dalt, píndola «Exercici n de N» (copia el comptador de la barra superior), enunciat centrat; error típic en un requadre groc suau `#FFF4DE` amb l'òliba; camp de resposta lavanda amb vora lila, botó rodó de pista i «Comprova» lila a baix (fixats a baix al mòbil).
- **Resultat:** panell lavanda amb la píndola blanca «Tema acabat», l'anell d'encerts i el nivell actual; a sota xifres grans i lleugeres (a la primera, temps, precisió, pistes), nivell amb què li falta, «Per vigilar» (groc) i punts forts (menta), i els botons.

**v5 (substituïda per Suau; queda a l'historial, commit `d2b10d4`):** disseny d'**aplicació professional** per a ordinador, tauleta i mòbil, a partir de les maquetes de `disseny/v5/` (continuen sent la referència de **l'estructura** de cada pantalla).
- Lletra Lexend. Tinta `#14213D`, fons `#F4F6FA`, targetes blanques amb vora fina `#E2E7EF`. Etiquetes en majúscules petites (12 px, gris `#64708A`).
- Cantons rectes a tot arreu.
- **Un sol botó taronja** d'acció per pantalla (`#F26B1D`, ombra inferior: «es pitja»); botons secundaris blancs amb vora.
- Colors d'assignatura: Català `#E0457B`, Castellà `#F08A24`, Mates `#3B6FE0`, Anglès `#D6453D`, Medi `#2BA36B`, Música `#7B5CE0` (variables `--s-<assig>`). Nivells: sense començar `#E2E7EF`, en procés `#F5B946`, comprèn `#7FA2F0`, domina `#14213D`.
- Error típic: requadre ambre amb barra a l'esquerra i la **marca de l'òliba** (a la v5, quadrat blau marí). Icones de línia; cap emoticona decorativa.
- **Closca:** ordinador (≥1024 px) = menú lateral (Inici, Assignatures amb les assignatures dins, Practicar, Aventura, El meu progrés; Famílies a baix, amb PIN) + columna principal (+ columna dreta a l'inici: objectiu del dia, setmana de la ratxa, missió i consell de l'òliba). Tauleta = menú lateral només amb icones i la columna dreta passa a baix. Mòbil (<768 px) = sense menú lateral, **barra inferior** (Inici, Assignatures, Progrés, Famílies).
- Inici: salutació i data, cercador, «Continua on ho deixares» (passos de la unitat), «Com vols practicar?» (6 maneres), assignatures amb % i segments de domini per unitat.
- Assignatura: capçalera del color amb % après → **unitats com un camí vertical** (fetes / la d'ara oberta amb els temes i Aprendre / Practicar / «Fer la prova de la unitat» / pendents, que s'obren en tocar-les) i, al costat, làmines, material i «Per repassar».
- Exercici: **pantalla concentrada** (sense menú): barra superior (sortir, assignatura · tema, segments de progrés, n de N, rellotge), enunciat, camp de resposta gran, pista / llegeix-m'ho / teoria; al mòbil la resposta i «Comprova» queden fixades a baix. A l'ordinador, panell «Aquesta sessió».
- Resultat: anell d'encerts, a la primera / temps / precisió, barra de nivell (En procés / Comprèn / Domina) amb què li falta per pujar, errors típics i punts forts.
- Pantalles: `programa/inici.js` (closca, inici, assignatures, practicar, el meu progrés, assignatura), `programa/pantalles.js` (exercici, resultat, modes, famílies, PIN), estils a `estil/app.css`.

**v4 (substituïda per la v5; guardada a l'etiqueta git `disseny-v4`):** estil inspirat en Smartick (franja blau cel amb símbols blancs suaus i vora en ona, un únic botó d'acció taronja, maneres de practicar en targetes blanques amb icona de color, fons blanc-blau clar). La v3 es va trobar freda i «d'oficina». La v4 és **per a nens de Primària**: colors vius i plens (no pàl·lids), lletra gruixuda, botons grans que «es pitgen» (ombra inferior), dibuixos a les assignatures i l'òliba a la franja. **Botons i targetes rectangulars** (petició expressa del propietari).
- Inici: franja blava (òliba, salutació, objectiu del dia, ratxa, «Famílies») → **«Com vols practicar?» just davall la franja** (6 rajoles de colors) → missió d'avui → continua → assignatures (rajoles grans de color amb dibuix).
- **Les làmines i el material d'estudi van dins cada assignatura**, mai a l'inici.
- Assignatura: capçalera del color de l'assignatura amb dibuix i % après → làmines/material → unitats (número, temes amb Aprendre / Practicar, prova de la unitat).

**v3 (substituïda per la v4; queda a l'historial, commit `f64e445`):**

**v3 = barreja triada pel propietari:** base **acadèmica i estructurada** (unitats com el llibre, barra de domini per temes, prova de la unitat), **targetes il·lustrades** (franja de color amb icona gran) per a «Continua on ho deixares», assignatures i làmines, i **només un element de joc**: objectiu del dia (anell de minuts) i ratxa de dies seguits. Sense punts ni nivells.
- Inici: franja blau marí amb salutació + objectiu del dia + ratxa + botó discret «Famílies»; «Continua on ho deixares»; «Missió d'avui»; assignatures amb domini; làmines i material; altres modes.
- Assignatura: domini de l'assignatura (segments per tema: no començat / en procés / comprèn / domina), material, i una targeta per unitat amb els temes (Aprendre / Practicar) i «Fer la prova».
- Les unitats es defineixen a `contingut/unitats.js`; les pantalles, a `programa/inici.js`.

Base comuna (v2 i v3). Públic: 11-12 anys → **sobri, no infantil**.
- **Tipografia del sistema** (San Francisco a l'iPhone, Segoe UI a Windows). Sense Google Fonts. *(La v5 sí que fa servir Lexend.)*
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
estil/app.css                   estils (disseny Suau)
disseny/suau/                   maquetes aprovades del disseny Suau (referència visual)
disseny/v5/                     maquetes del disseny v5 (estructura de les pantalles)
programa/utils.js               utilitats: fraccions, nombres...
programa/dades-app.js           assignatures, modes, errors típics (ERR), aventura, dictats
programa/aventura.js            motor de l'AVENTURA: registre ILLES, mapa, gemmes, segell, tresor, ajudes AV (secció 5)
contingut/aventura-<assig>.js   una illa d'aventura per assignatura (p. ex. aventura-mates.js)
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

### Aventura: motor i illes (una illa nova per assignatura)
L'**Aventura** és un mapa d'illa: l'òliba salta d'estació en estació i cada estació és un **joc que es fa movent coses** (manipulatiu). El motor és `programa/aventura.js` (no cal tocar-lo); cada assignatura hi afegeix la seva illa des d'un arxiu propi, `contingut/aventura-<assig>.js`, posat **al final del bloc de l'assignatura** a `index.html`. Exemple complet: `contingut/aventura-mates.js` (illa de Mates, 4 estacions). Prototip aprovat: `disseny/aventura/prototip-mates.html`.

**Com tria el motor què es juga** (`AVENTURA.plan`): l'assignatura més present a `CUR.skills` que tingui illa → l'illa amb més estacions que practiquin aquests temes → les estacions que hi toquen (màxim 2-4 segons els minuts). Els temes de la sessió que cap estació practica surten com a **estació d'exercici escrit** (`exercise(..., {mode:'adv'})`, amb pistes); si en surten menys de 3, s'hi afegeixen altres estacions de l'illa. **Sempre** acaba amb el **segell** (el posa el motor: `exercise(..., {mode:'seal', one:true})`, escrit, sense pistes, un sol intent, dades noves, amb un tema de la sessió) i la pantalla del **tresor**. Si cap tema té illa → aventura clàssica (`mAdvClassic`, `pantalles.js`). Si s'acaba el temps de la fase, es salta directament al segell.

**Registrar una illa:**
```js
(ILLES.angles=ILLES.angles||[]).push({id:'illa-verbs', nom:'L\'Illa dels Verbs',
  mapa:{mar:'#BFE6F5', sorra:'#F6E3B4', herba:'#CDE9B5', deco:'<circle .../>'},   // o mapa:pts=>'svg complet 700×340'
  segell:{nom:'La porta del guardià', desc:'text curt del mapa', txt:'«Frase del guardià»'},
  estacions:[ estacio1, estacio2, ... ]});
```
**Una estació** = `{id, nom, desc, skills:['id_tema',...], minMs?, render(el, api)}`. `render` dibuixa el joc dins `el` (enunciat, SVG, botons; el botó de comprovar és de l'estació) i es torna a cridar amb dades noves quan cal. Els temes de `skills` han d'existir a `SK`.

**L'`api` que rep `render`:**
| | |
|---|---|
| `api.k` | tema on es guarda el resultat (el primer de `skills` que és a la sessió) |
| `api.ks` | temes de `skills` que són a la sessió · `api.lv` nivell 0-2 del tema (per graduar la dificultat) · `api.curs` |
| `api.ok({msg, help})` | resposta correcta: desa `record(k, true, ajuda)`, mostra `msg` (HTML) en verd, la gemma si toca i el botó «Continua el camí» |
| `api.fail({msg, err, steps, k})` | resposta incorrecta. Aplica sol el bloqueig de «massa de pressa» (primer intent), desa l'error típic `err` (codi d'`ERR`, al tema `k` o `api.k`) i compta errors: 1r error → mostra `msg` (o el text d'`ERR`); 2n error → desa el fallat i fa `explain(steps)`. Torna `'lock'` (no ha comptat; no esborris res), `'retry'` (pots treure les peces mal posades) o `'explain'` |
| `api.explain(steps, intro?)` | explicació guiada pas a pas (`guided`) i, en acabar, `newData()` |
| `api.newData()` | torna a començar l'estació amb dades noves |
| `api.tooFast()` | `true` (i bloqueja 6 s amb «Pensa abans de respondre») si respon abans de 3,5 s (`minMs`) i encara no ha fallat |
| `api.restart()` | torna a posar en marxa aquest rellotge (p. ex. en començar la 2a part d'una estació) |
| `api.tip(html, 'info'\|'ok'\|'warn'\|'err')` · `api.clear()` | quadre de l'òliba sota el joc |
| `api.hint(html)` | una ajuda: es mostra i **la gemma es perd** |
| `api.errors` | errors de la ronda actual |

**Gemmes:** una per estació (i pel segell), només si es fa **sense cap error ni ajuda** (tornar al mapa no esborra els errors). **Progrés:** cada ronda d'una estació és un exercici: un sol `record()` (com `exercise`), errors a `recErr()`, així que el nivell, la zona famílies i el resultat funcionen igual.

**Ajudes `AV`** (per a les estacions): `AV.owl(s)` / `AV.owlG(x,y,s)` òliba en HTML / dins un SVG · `AV.frac(n,d)` fracció HTML simplificada · `AV.dc(x)` decimal amb coma · `AV.num(text)` llegeix «12», «2,5», «3/4» · `AV.shuf(a)` · `AV.pt(svg,e)` coordenades del viewBox · `AV.anim(ms, e=>{...}, fi)` animació per temps · `AV.drag(svg,{items, onDrop, onTap, onTapEmpty, disabled})` arrossegar amb dit/ratolí + «toca per triar i toca per posar» (els grups no poden tenir `transform` propi; després d'`onDrop` cal tornar a dibuixar) · `AV.answer(label)` + `AV.onAnswer(el, fn)` fila de resposta escrita. Classes CSS: `av-stage` (SVG del joc, `touch-action:none`), `av-tray` + `av-chip` (peces/botons), `av-row`, `av-count`, `av-tip`.

**Normes pedagògiques de les estacions (obligatòries):** res d'endevinar — el manipulatiu **amaga la resposta visual** fins que es comprova (p. ex. el forat del pont amb boira i els taulons dibuixats iguals; la recta sense nombres entremig); el feedback **mai diu «massa / poc»**: explica l'error (què ha fet i per què no va); 2 errors → `explain` i dades noves (ho fa `fail`); dades **generades per codi** amb la solució calculada i diferents a cada partida; errors típics amb codi a `ERR` (prefix de l'assignatura, p. ex. `mt_av_...`); que es pugui jugar **amb el dit a l'iPhone** (provar a 390 px: peces i punts prou grans; si cal, un SVG més estret a mòbil, com el riu de Mates) i amb el ratolí.

## 6. Provar i publicar

- **GitHub:** https://github.com/gestionspod-sketch/aprenem (públic). La branca `main` es publica sola a **GitHub Pages**: https://gestionspod-sketch.github.io/aprenem/ (aquí la IA sí pot funcionar). Cada tasca gran es fa en una branca pròpia i s'ajunta a `main` quan el propietari la dona per bona.
- Git i GitHub CLI estan instal·lats a `C:\Program Files\Git\cmd` i `C:\Program Files\GitHub CLI` (si no són al PATH, cal posar-hi aquestes carpetes). Commits amb l'adreça privada `338169047+gestionspod-sketch@users.noreply.github.com`.
- **Abans de cada publicació a `main`:** `powershell -ExecutionPolicy Bypass -File eines\versio.ps1` (posa `?v=` nou als arxius d'`index.html`; si no, els navegadors i l'iPhone poden carregar arxius vells fins a 10 minuts i barrejar versions).
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

Aventura interactiva: motor (`programa/aventura.js`) i illa de Matemàtiques (`contingut/aventura-mates.js`). **Pendent:** una illa per a Català, Castellà, Anglès, Medi i Música (secció 5, «Aventura: motor i illes»; una sessió per assignatura, només amb arxius de la seva assignatura).

Pendent (per ordre):
1. ~~Decidir si la v3 passa a `main`~~ Fet: la v3 és l'actual. (La v2 queda al commit `8ffe380` i a `versions/aprenem-v2-un-sol-arxiu.html`.)
2. ~~Temari complet de 6è~~ Fet (PR #1-#4, publicat a `main`): Matemàtiques 15 unitats / 49 temes, Anglès 10 / 38, Medi 14 / 37 (natural i social, 7 làmines), Música 11 / 19. Curs per defecte: 6è. **Pendent: el temari complet de 5è** amb el mateix procediment (secció 9).
3. (antic) **Desenvolupar el temari complet** de cada assignatura per a 5è i 6è (el propietari indicarà per on començar).
3. **Més làmines** (ciències sobretot: aparell digestiu, circulatori, la planta, la cèl·lula, el sistema solar...).
4. **Activar la IA** (un altre dia, quan el contingut estigui fet).
5. Més endavant: comptes d'usuari i progrés compartit entre aparells; altres cursos; altres idiomes.

## 8. Assignatures i registres

- Assignatures (`SUBJ`, a `programa/dades-app.js`): `catala` **Català** (Llengua catalana i literatura; `contingut/catala.js`, 10 unitats de 6è, formes balears acceptades) · `mates` Matemàtiques · `angles` Anglès · `ciencies` **Medi** (Coneixement del medi natural, social i cultural; la clau continua sent `ciencies` per no perdre el progrés) · `musica` **Música** (llenguatge musical).
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
