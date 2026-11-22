/* Aprenem - LENGUA CASTELLANA 6è: GRAMÁTICA
   Categorías gramaticales, sustantivo (género y número), adjetivo (grados), determinantes y pronombres, conjugación
   regular, tiempos y modos (y formas no personales), verbos irregulares, adverbios, preposiciones y conjunciones,
   sujeto y predicado (sujeto omitido), predicado nominal y verbal (atributo), complementos del verbo (CD, CI, CC;
   lo / la / le), clases de oraciones (modalidad; simples y compuestas).
   Part de l'app d'estudi. Vegeu CLAUDE.md i la capçalera de contingut/castella.js (fonts). */
(()=>{
const A=CS.A,F=CS.first;

/* ---------- categories ---------- */
const CAT={sus:'sustantivo|nombre|nom|substantiu',adj:'adjetivo|adjetivo calificativo|adjectiu',ver:'verbo|verb',adv:'adverbio|adverbi',det:'determinante|determinant|artículo|demostrativo|posesivo|numeral|indefinido',
 pro:'pronombre|pronom|pronombre personal|pronom personal',pre:'preposición|preposició',con:'conjunción|conjunció',int:'interjección|interjecció'};
const CAT_DEF={sus:'nombra personas, animales, cosas o ideas (gato, alegría)',adj:'dice cómo es un sustantivo (amarilla, tranquilo)',ver:'expresa una acción o un estado y se conjuga (juegan, viven)',adv:'indica cómo, cuándo, dónde o cuánto; no varía (mañana, aquí, rápidamente)',
 det:'acompaña al sustantivo y lo presenta: artículos, demostrativos, posesivos, numerales, indefinidos (los, este, mi, tres)',pro:'sustituye a un sustantivo (ella, nosotros, los)',pre:'une palabras y no varía (a, con, de, desde, en, sobre)',con:'une palabras u oraciones (y, o, pero)',int:'expresa una emoción o sensación por sí sola (¡ay!, ¡uf!)'};
const CAT_S=[['El *gato* duerme en el sofá.','sus'],['La casa *amarilla* es grande.','adj'],['Los niños *juegan* en el patio.','ver'],['Llegaremos *mañana* por la tarde.','adv'],['*Este* libro es mío.','det'],['*Ella* canta muy bien.','pro'],['Voy al colegio *en* bicicleta.','pre'],['Quiero pan *y* queso.','con'],
 ['*¡Uf!*, qué calor hace.','int'],['Corre muy *rápidamente*.','adv'],['He leído *tres* cuentos.','det'],['*Nosotros* iremos a la playa.','pro'],['El mar está *tranquilo*.','adj'],['La *alegría* es contagiosa.','sus'],['Te espero *desde* las cinco.','pre'],['Iré, *pero* tarde.','con'],
 ['Mis primos *viven* en Ibiza.','ver'],['*Nunca* como brócoli.','adv'],['*¡Ay!*, me he pillado el dedo.','int'],['Lo dejé *aquí*.','adv'],['Sus zapatos son *nuevos*.','adj'],['¿Vienes *o* te quedas?','con'],['El libro está *sobre* la mesa.','pre'],['*Mi* perro se llama Coco.','det'],
 ['Ayer *los* vi en el parque.','pro',1],['*Los* pájaros cantan al amanecer.','det'],['La *amistad* es un tesoro.','sus'],['Mi abuela *cocina* de maravilla.','ver'],['*Bajo* la mesa duerme el perro.','pre',1],['No quiero *ni* frío *ni* calor.','con',1]];

/* ---------- substantiu ---------- */
// [singular, plural, explicació, nivell]
const PL=[['lápiz','lápices','z → c delante de -es.'],['pez','peces','z → c delante de -es.'],['luz','luces','z → c delante de -es.'],['nariz','narices','z → c delante de -es.'],['examen','exámenes','Al añadir -es se convierte en esdrújula: lleva tilde.',1],['joven','jóvenes','Al añadir -es se convierte en esdrújula: lleva tilde.'],
 ['canción','canciones','Al añadir -es pasa a ser llana acabada en -s: pierde la tilde.'],['autobús','autobuses','Pasa a ser llana acabada en -s: pierde la tilde.'],['ratón','ratones','Pasa a ser llana acabada en -s: pierde la tilde.'],['jueves','jueves','Las palabras llanas acabadas en -s no cambian en plural.'],['crisis','crisis','Las palabras llanas acabadas en -s no cambian en plural.',1],
 ['mes','meses','Las palabras de una sílaba acabadas en -s añaden -es.'],['reloj','relojes','Acaba en consonante: añade -es.'],['ley','leyes','Acaba en -y: añade -es.'],['rey','reyes','Acaba en -y: añade -es.'],['sofá','sofás','Acaba en vocal tónica: añade -s.'],['papá','papás','Acaba en vocal tónica: añade -s.'],
 ['árbol','árboles','Acaba en consonante: añade -es.'],['volumen','volúmenes','Se convierte en esdrújula: lleva tilde.',1],['carácter','caracteres','Cambia la sílaba tónica: caracteres (sin tilde).',1],['régimen','regímenes','Cambia la sílaba tónica: regímenes.',1],['paraguas','paraguas','Las palabras llanas acabadas en -s no cambian en plural.'],['menú','menús','Acaba en vocal tónica: añade -s.'],['champú','champús','Acaba en vocal tónica: añade -s.'],['virus','virus','Las palabras llanas acabadas en -s no cambian en plural.',1]];
// [masculí, femení]
const FEM=[['actor','actriz'],['poeta','poetisa|poeta'],['caballo','yegua'],['toro','vaca'],['yerno','nuera'],['padre','madre'],['rey','reina'],['héroe','heroína'],['alcalde','alcaldesa'],['príncipe','princesa'],['emperador','emperatriz'],['carnero','oveja'],['gallo','gallina'],['conde','condesa'],['tigre','tigresa|tigre'],['duque','duquesa'],['hombre','mujer'],['caballero','dama'],['padrino','madrina'],['marido','mujer|esposa'],['médico','médica'],['juez','jueza'],['presidente','presidenta'],['piloto','piloto']];

/* ---------- adjectiu ---------- */
const SUP=[['fácil','facilísimo|facilísima'],['amable','amabilísimo|amabilísima'],['rico','riquísimo|riquísima'],['feliz','felicísimo|felicísima'],['joven','jovencísimo|jovencísima'],['antiguo','antiquísimo|antiquísima|antigüísimo'],['bueno','buenísimo|bonísimo|óptimo|buenísima'],['malo','malísimo|pésimo|malísima'],
 ['alto','altísimo|altísima'],['rápido','rapidísimo|rapidísima'],['largo','larguísimo|larguísima'],['fuerte','fortísimo|fuertísimo'],['limpio','limpísimo|limpísima'],['grande','grandísimo|máximo|grandísima'],['pequeño','pequeñísimo|mínimo|pequeñísima'],['nuevo','novísimo|nuevísimo'],['blanco','blanquísimo|blanquísima'],['amargo','amarguísimo|amarguísima']];
const CMPI=[['Este helado está ___ que el de ayer. <span class="muted">(más bueno)</span>','mejor'],['Hoy me encuentro ___ que ayer. <span class="muted">(más malo)</span>','peor'],['Mi hermana tiene catorce años: es ___ que yo. <span class="muted">(más grande)</span>','mayor'],['Mi primo tiene ocho años: es ___ que yo. <span class="muted">(más pequeño)</span>','menor'],['Esta película es ___ que la otra. <span class="muted">(más mala)</span>','peor'],['Tu idea es ___ que la mía. <span class="muted">(más buena)</span>','mejor']];
const GRAD=[['Ana es tan alta como su madre.','comparativo de igualdad|igualdad|comparativo igualdad'],['Este libro es más interesante que aquel.','comparativo de superioridad|superioridad|comparativo superioridad'],['El tren es menos rápido que el avión.','comparativo de inferioridad|inferioridad|comparativo inferioridad'],['La sopa está riquísima.','superlativo|superlativo absoluto'],
 ['Pablo es el más alto de la clase.','superlativo relativo|superlativo'],['La casa es grande.','positivo|grado positivo'],['Estoy muy cansado.','superlativo|superlativo absoluto'],['Marta es igual de simpática que Laura.','comparativo de igualdad|igualdad|comparativo igualdad'],['Este ejercicio es facilísimo.','superlativo|superlativo absoluto'],['Mi gato es más dormilón que el tuyo.','comparativo de superioridad|superioridad']];

/* ---------- determinants i pronoms ---------- */
const DET=[['*Esta* mochila pesa mucho.','demostrativo'],['*Aquellos* árboles son pinos.','demostrativo'],['*Esos* zapatos son nuevos.','demostrativo'],['*Mis* abuelos viven en Menorca.','posesivo'],['*Nuestra* clase es grande.','posesivo'],['*Su* casa es azul.','posesivo'],
 ['*Tres* niños llegaron tarde.','numeral|numeral cardinal|cardinal'],['Es la *primera* vez que vengo.','numeral|numeral ordinal|ordinal'],['*Algunos* alumnos traen fruta.','indefinido'],['*Muchas* personas vinieron.','indefinido'],['*Ningún* coche pasó por la calle.','indefinido'],['*Cada* alumno tiene su libro.','indefinido'],
 ['*Los* perros ladran.','artículo|artículo determinado|artículo definido|determinado'],['*Unas* niñas cantaban.','artículo|artículo indeterminado|artículo indefinido|indeterminado'],['¿*Qué* libro lees?','interrogativo'],['¡*Qué* día tan bonito!','exclamativo'],['¿*Cuántos* hermanos tienes?','interrogativo',1],['*El* cielo está nublado.','artículo|artículo determinado|artículo definido|determinado']];
const DP=[['Quiero *este* pastel.','determinante'],['Quiero *este*.','pronombre'],['*Muchos* niños juegan al fútbol.','determinante'],['*Muchos* no vinieron a la excursión.','pronombre'],['He comprado *dos* manzanas.','determinante'],['He comprado *dos*.','pronombre'],['*Aquel* coche es muy rápido.','determinante'],['Prefiero *aquel*.','pronombre'],
 ['*Alguien* ha llamado a la puerta.','pronombre'],['*Nadie* sabe la respuesta.','pronombre'],['*Mi* lápiz es rojo.','determinante'],['¿*Cuál* prefieres?','pronombre'],['*Ese* niño es mi primo.','determinante'],['*Ese* es mi primo.','pronombre']];
const PERS=[['Pedro y yo','nosotros'],['Marta y Laura','ellas'],['Mi primo y mi prima','ellos'],['Tú y Pablo','vosotros'],['La profesora','ella'],['El abuelo','él'],['Mis hermanos','ellos'],['Tú y Ana','vosotras|vosotros'],['Ana y yo','nosotras|nosotros']];

/* ---------- adverbis i nexes ---------- */
const ADV=[['*Aquí* hace mucho calor.','lugar'],['Llegaré *pronto*.','tiempo'],['Lo hizo muy *bien*.','modo'],['Come *poco*.','cantidad'],['*Sí*, quiero ir a la excursión.','afirmación'],['*No* tengo hambre.','negación'],['*Quizás* venga mañana.','duda'],['*Ayer* llovió mucho.','tiempo'],
 ['Vive muy *lejos*.','lugar'],['Habla *despacio*, por favor.','modo'],['Estoy *muy* cansado.','cantidad'],['*Tampoco* lo sé.','negación'],['*Siempre* llega tarde.','tiempo'],['Lo explicó *claramente*.','modo'],['*Seguramente* lloverá.','duda',1],['*También* quiero helado.','afirmación'],['Ponlo *encima*.','lugar'],['Corre *bastante*.','cantidad']];
const ADV_ALT={lugar:'lugar|de lugar|lloc',tiempo:'tiempo|de tiempo|temps',modo:'modo|de modo|manera',cantidad:'cantidad|de cantidad|quantitat',afirmación:'afirmación|de afirmación|afirmació',negación:'negación|de negación|negació',duda:'duda|de duda|dubte'};
const PREP=['a','ante','bajo','cabe','con','contra','de','desde','durante','en','entre','hacia','hasta','mediante','para','por','según','sin','so','sobre','tras'];
const PREP_ALT={durante:'durante|en',mediante:'mediante|para'};   // listes antigues sense «durante» ni «mediante»
const CONJ=[['padres ___ hijos','c','e'],['Fernando ___ Isabel','c','e'],['agua ___ hielo','c','y'],['madre ___ hija','c','e'],['ciencias ___ historia','c','e'],['tigres ___ leones','c','y'],['ayer ___ hoy','c','y'],['niños ___ niñas','c','y'],
 ['siete ___ ocho','d','u'],['uno ___ otro','d','u'],['plata ___ oro','d','u'],['minutos ___ horas','d','u'],['este ___ aquel','d','o'],['frío ___ calor','d','o'],['mujeres ___ hombres','d','u'],['sí ___ no','d','o']];

/* ---------- l'oració ---------- */
// [oració, subjecte, errors típics (respostes que donen un error concret)]
const SUJ=[['Mi hermano juega al baloncesto los sábados.','mi hermano'],['Las flores del jardín son preciosas.','las flores del jardín'],['Mañana vendrán mis abuelos.','mis abuelos'],['Los alumnos de sexto preparan una obra de teatro.','los alumnos de sexto'],['El sol calienta la tierra.','el sol'],
 ['En el bosque viven muchos animales.','muchos animales'],['Tú y yo haremos el trabajo.','tú y yo'],['La maestra nos explicó un cuento.','la maestra'],['Me gustan mucho las fresas.','las fresas','yo|me|a mí'],['Este verano ha llegado mi prima de Sevilla.','mi prima de sevilla'],['Por la ventana entraba un aire fresco.','un aire fresco'],
 ['A mi padre le encanta el chocolate.','el chocolate','mi padre|a mi padre|él'],['Ayer se rompió el jarrón del salón.','el jarrón del salón']];
const SOM=[['Hemos ganado el partido.','nosotros|nosotras'],['Mañana iré al dentista.','yo'],['¿Has terminado los deberes?','tú'],['Comieron paella en la playa.','ellos|ellas|ustedes'],['Estáis muy contentos.','vosotros'],['Cantas muy bien.','tú'],['Llegaremos tarde al cine.','nosotros|nosotras'],['Lavé los platos después de cenar.','yo'],['Corréis mucho.','vosotros|vosotras'],['Vivimos cerca del mar.','nosotros|nosotras'],['Escribiste una carta preciosa.','tú']];
// [oració, n = nominal / v = verbal, atribut]
const PRED=[['Mi abuela es muy simpática.','n','muy simpática'],['El cielo está nublado.','n','nublado'],['Tu hermano parece cansado.','n','cansado'],['Los niños juegan en el parque.','v'],['Mi tía escribe novelas.','v'],['La sopa está caliente.','n','caliente'],['Pedro es el capitán del equipo.','n','el capitán del equipo'],['Ana estudia en la biblioteca.','v'],
 ['Mis vecinos son de Menorca.','n','de menorca'],['El perro ladró toda la noche.','v'],['Las ventanas están abiertas.','n','abiertas'],['Mi amiga compró un regalo.','v'],['Estos pasteles parecen deliciosos.','n','deliciosos'],['El tren salió a las ocho.','v']];
const CMP_ALT={cd:'complemento directo|cd|c d|objeto directo|od|complement directe',ci:'complemento indirecto|ci|c i|objeto indirecto|oi|complement indirecte',cc:'complemento circunstancial|cc|c c|circunstancial|complement circumstancial'};
const CC_ALT={lugar:'lugar|de lugar|lloc',tiempo:'tiempo|de tiempo|temps',modo:'modo|de modo|manera',compañía:'compañía|de compañía|companyia',instrumento:'instrumento|de instrumento|medio|instrument',cantidad:'cantidad|de cantidad|quantitat',causa:'causa|de causa',finalidad:'finalidad|de finalidad|fin|finalitat'};
// [oració amb *complement*, tipus, classe de CC]
const CMP=[['Marta compró *un libro* en la feria.','cd'],['Mi padre prepara *la cena*.','cd'],['Hemos visto *a tu hermano*.','cd'],['Leo *cuentos de piratas*.','cd'],['El perro mordió *la pelota*.','cd'],['Saludé *a mis vecinos*.','cd'],
 ['El cartero entregó una carta *a mi vecina*.','ci'],['Regalé flores *a mi madre*.','ci'],['Pedro contó un secreto *a sus amigos*.','ci'],['Escribí un mensaje *a mi abuelo*.','ci'],['La maestra explicó el problema *a los alumnos*.','ci'],
 ['Jugamos *en el patio*.','cc','lugar'],['Vendré *mañana*.','cc','tiempo'],['Habla *muy despacio*.','cc','modo'],['Fui al cine *con mis primos*.','cc','compañía'],['Cortó el pan *con un cuchillo*.','cc','instrumento'],['Comes *demasiado*.','cc','cantidad'],['Nos vemos *el sábado*.','cc','tiempo'],
 ['Viven *cerca del mar*.','cc','lugar'],['No salimos *por la lluvia*.','cc','causa'],['Estudia *para aprobar*.','cc','finalidad'],['Bailaba *con mucha alegría*.','cc','modo']];
// substitució pel pronom: [oració amb *complement*, pronom, tipus]
const PRN=[['Compré *las manzanas*.','las','cd'],['Vi *a Luis* en el parque.','lo','cd'],['Vi *a Laura* en el parque.','la','cd'],['Llamé *a mis primas*.','las','cd'],['Leí *el cuento*.','lo','cd'],['Trajo *los libros*.','los','cd'],
 ['Escribí una carta *a Laura*.','le','ci'],['Di un regalo *a mis primas*.','les','ci'],['Dije la verdad *a mi madre*.','le','ci'],['Pedí ayuda *a los profesores*.','les','ci'],['Conté un chiste *a mi abuela*.','le','ci']];
// [oració, modalitat (formes acceptades)]
const MOD=[['Mañana es martes.','enunciativa|enunciativa afirmativa|declarativa|afirmativa'],['No me gusta el queso.','enunciativa negativa|negativa|enunciativa|declarativa negativa'],['¿Qué hora es?','interrogativa'],['¡Qué día tan bonito!','exclamativa'],['Cierra la puerta, por favor.','imperativa|exhortativa'],
 ['Ojalá apruebe el examen.','desiderativa|optativa'],['Quizás llueva esta tarde.','dubitativa'],['Tal vez venga mi tío.','dubitativa'],['Que tengas un buen viaje.','desiderativa|optativa'],['Lávate las manos antes de comer.','imperativa|exhortativa'],['¿Vendrás a la fiesta?','interrogativa'],['¡Cuánta gente hay aquí!','exclamativa'],['El museo no abre los lunes.','enunciativa negativa|negativa|enunciativa']];
// [oració, nombre de verbs conjugats, simple / compuesta]
const SC=[['Mi hermana lee y yo dibujo.',2,'compuesta'],['El tren llegó tarde.',1,'simple'],['Quiero que vengas.',2,'compuesta'],['Los pájaros cantan en el árbol.',1,'simple'],['Llovía, pero salimos a pasear.',2,'compuesta'],['Mis amigos y yo jugamos al ajedrez.',1,'simple'],
 ['Comí pronto porque tenía hambre.',2,'compuesta'],['Hemos visitado el museo.',1,'simple'],['Voy a estudiar mucho.',1,'simple'],['Cuando llegues, llámame.',2,'compuesta'],['Ana canta, Pedro toca la guitarra y Luis baila.',3,'compuesta']];

const RARE=['caber','satisfacer','haber','conducir','morir','traer'];
const SLOT=[['presente','yo','pres',0],['pretérito perfecto simple','yo','pps',0],['pretérito perfecto simple','él / ella','pps',2],['futuro simple','yo','fut',0],['participio','','part']];

Object.assign(SK,{
 cs_categorias:{mat:'castella',ab:'Cg',nom:'Las categorías gramaticales',ic:'Cg',curs:[6],
  teoria:['Cada palabra pertenece a una <b>categoría gramatical</b>. Unas son <b>variables</b> (cambian de género, número, persona...) y otras <b>invariables</b>.',
   `<table class="mini">${Object.keys(CAT_DEF).map(k=>`<tr><td><b>${F(CAT[k])}</b></td><td>${CAT_DEF[k]}</td></tr>`).join('')}</table>`,
   'Truco: el <b>sustantivo</b> puede ir detrás de «el / la»; el <b>adjetivo</b> responde a «¿cómo es?»; el <b>verbo</b> se puede conjugar (yo…, tú…); el <b>adverbio</b> no cambia nunca.'],
  gen(lv){const[o,c]=pick(CAT_S.filter(x=>lv>0||!x[2])),w=CS.star(o);
   return CS.ex(`De quina categoria gramatical és la paraula destacada?<br><i lang="es">${CS.mark(o)}</i>`,A(CAT[c]),{loose:true,label:'Categoria (en castellà)',hints:['Piensa qué hace la palabra: nombra, describe, expresa una acción, indica cómo o cuándo, acompaña al sustantivo, lo sustituye, une...',`Empieza por «${F(CAT[c])[0].toUpperCase()}».`],
    steps:[`«${w}» ${CAT_DEF[c]}.`,`Por tanto, es un <b>${F(CAT[c])}</b>.`],err:v=>Object.values(CAT).some(s=>A(s).some(x=>fold(x)===fold(v)))?'cs_categoria':null})}},
 cs_sustantivo:{mat:'castella',ab:'Su',nom:'El sustantivo: género y número',ic:'Su',curs:[6],
  teoria:['El <b>sustantivo</b> nombra personas, animales, cosas o ideas. Puede ser <b>común</b> (perro) o <b>propio</b> (Laura), <b>concreto</b> (mesa) o <b>abstracto</b> (alegría), <b>individual</b> (oveja) o <b>colectivo</b> (rebaño).',
   '<b>Número:</b> el plural se forma con <b>-s</b> (casas, sofás) o <b>-es</b> si acaba en consonante o en -y (relojes, leyes). Si acaba en <b>-z</b>, cambia a <b>c</b>: lápiz → lápices. Las llanas acabadas en -s no cambian: el lunes → los lunes.',
   '<b>¡Ojo con las tildes!</b> Al hacer el plural puede cambiar el tipo de palabra: joven → <b>jóvenes</b> (esdrújula), canción → <b>canciones</b> (llana, sin tilde).',
   '<b>Género:</b> el femenino suele formarse con <b>-a</b> (niño → niña), pero hay otros: <b>-esa</b> (alcaldesa), <b>-isa</b> (poetisa), <b>-triz</b> (actriz), <b>-ina</b> (heroína), y palabras distintas (caballo → yegua, toro → vaca, yerno → nuera).'],
  gen(lv){if(Math.random()<.6){const[s,p,ex]=pick(PL.filter(x=>lv>0||!x[3]));
    return CS.ex(`Escriu el <b>plural</b> de: <b lang="es">el ${s}</b> → los ___`,[p],{label:'Plural',hints:['¿Acaba en vocal, en consonante, en -z o en -s?','Cuando lo tengas, comprueba si al crecer la palabra cambia la tilde.'],steps:[ex,`Se escribe: <b>los ${p}</b>.`],
     err:v=>/z$/.test(s)&&v===s+'es'?'cs_plural_z':CS.strip(v)===CS.strip(p)?'cs_plural_tilde':null})}
   const[m,f]=pick(FEM);
   return CS.ex(`Escriu el <b>femení</b> de: <b lang="es">${m}</b>`,A(f),{label:'Femenino',hints:['Algunos femeninos se forman con -a, otros con -esa, -isa, -triz, -ina...','Y algunos son una palabra totalmente distinta (padrastro → madrastra).'],steps:[`El femenino de «${m}» es <b>${A(f).join(' / ')}</b>.`]})}},
 cs_adjetivo:{mat:'castella',ab:'Aj',nom:'El adjetivo y sus grados',ic:'Aj',curs:[6],
  teoria:['El <b>adjetivo</b> dice cómo es el sustantivo y concuerda con él en género y número: casa <b>blanca</b>, coches <b>rápidos</b>.',
   `<b>Grados del adjetivo:</b><table class="mini"><tr><td><b>Positivo</b></td><td>La casa es grande.</td></tr><tr><td><b>Comparativo</b> de igualdad</td><td>tan … como / igual de … que</td></tr><tr><td>de superioridad</td><td>más … que</td></tr><tr><td>de inferioridad</td><td>menos … que</td></tr><tr><td><b>Superlativo</b> absoluto</td><td>muy alto, altísimo</td></tr><tr><td>relativo</td><td>el más alto de la clase</td></tr></table>`,
   'Superlativos con cambios: rico → <b>riquísimo</b>, feliz → <b>felicísimo</b>, joven → <b>jovencísimo</b>, antiguo → <b>antiquísimo</b>.',
   'Comparativos especiales: más bueno → <b>mejor</b>, más malo → <b>peor</b>, más grande (edad) → <b>mayor</b>, más pequeño → <b>menor</b>. ¡Nunca digas «más mejor»!'],
  gen(lv){const r=Math.random();
   if(r<.4){const[a,s]=pick(SUP);return CS.ex(`Escriu el <b>superlatiu absolut</b> (acabat en -ísimo) de: <b lang="es">${a}</b>`,A(s),{label:'Superlativo',hints:['Quita la vocal final y añade -ísimo: lento → lentísimo.','¡Ojo con los cambios de letra! c → qu, z → c, g → gu (fresco → fresquísimo, vago → vaguísimo).'],steps:[`${a} → <b>${A(s)[0]}</b>${A(s).length>1?` (también: ${A(s).slice(1).join(', ')})`:''}.`]})}
   if(r<.7){const[f,a]=pick(CMPI);return CS.ex(`Completa amb una sola paraula:<br><i lang="es">${f.replace('___',CS.gap)}</i>`,[a],{label:'Paraula',hints:['Algunos adjetivos tienen un comparativo especial de una sola palabra.','Fíjate en el adjetivo que aparece entre paréntesis después de «más»: ¿cuál es su comparativo de una sola palabra?'],steps:[`El comparativo especial es <b>${a}</b>. No se dice «más ${a}».`],err:v=>/^m[aá]s /.test(v)?'cs_mas_mejor':null})}
   const[o,g]=pick(GRAD);return CS.ex(`En quin grau està l'adjectiu d'aquesta oració?<br><i lang="es">${o}</i>`,A(g),{loose:true,label:'Grado',hints:['¿Hay una comparación (tan, más, menos... que)? ¿Hay muy o -ísimo?','Positivo: sin comparar; comparativo: compara dos cosas; superlativo: el grado máximo.'],steps:[`Es <b>${A(g)[0]}</b>.`]})}},
 cs_determinantes:{mat:'castella',ab:'Dt',nom:'Determinantes y pronombres',ic:'Dt',curs:[6],
  teoria:['Los <b>determinantes</b> acompañan al sustantivo y lo presentan:',
   `<table class="mini"><tr><td><b>Artículos</b></td><td>el, la, los, las (determinados) · un, una, unos, unas (indeterminados)</td></tr><tr><td><b>Demostrativos</b></td><td>este, ese, aquel… (cerca / medio / lejos)</td></tr><tr><td><b>Posesivos</b></td><td>mi, tu, su, nuestro, vuestro…</td></tr><tr><td><b>Numerales</b></td><td>cardinales (tres) y ordinales (primero)</td></tr><tr><td><b>Indefinidos</b></td><td>algún, ningún, mucho, poco, cada, varios…</td></tr><tr><td><b>Interrogativos y exclamativos</b></td><td>¿qué…?, ¿cuántos…?, ¡qué…!</td></tr></table>`,
   'Los <b>pronombres</b> sustituyen al sustantivo. Si la palabra va <b>con</b> un sustantivo, es determinante (quiero <b>este</b> pastel); si va <b>sola</b>, es pronombre (quiero <b>este</b>).',
   '<b>Pronombres personales:</b> yo, tú, él / ella, nosotros / nosotras, vosotros / vosotras, ellos / ellas; y me, te, se, lo, la, le, nos, os, los, las, les.'],
  gen(lv){const r=Math.random();
   if(r<.5){const[o,t]=pick(DET.filter(x=>lv>0||!x[2]));return CS.ex(`Quina mena de <b>determinant</b> és la paraula destacada?<br><i lang="es">${CS.mark(o)}</i>`,A(t),{loose:true,label:'Clase de determinante',hints:['¿Indica cercanía, posesión, número, cantidad imprecisa, pregunta...?','Mira la tabla de la teoría.'],steps:[`«${CS.star(o)}» es un determinante <b>${A(t)[0]}</b>.`],err:v=>/^(pronombre|pronom)/.test(fold(v))?'cs_det_pron':null})}
   if(r<.8||lv===0){const[o,t]=pick(DP);return CS.ex(`La paraula destacada, és un <b>determinant</b> o un <b>pronom</b>?<br><i lang="es">${CS.mark(o)}</i>`,t==='determinante'?['determinante','determinant']:['pronombre','pronom'],{loose:true,label:'Determinante o pronombre',hints:['¿La palabra va acompañando a un sustantivo o va sola?'],steps:[t==='determinante'?'Va delante de un sustantivo y lo acompaña: es <b>determinante</b>.':'No acompaña a ningún sustantivo, lo sustituye: es <b>pronombre</b>.'],err:v=>'cs_det_pron'})}
   const[s,p]=pick(PERS);return CS.ex(`Substitueix el subjecte per un <b>pronom personal</b>:<br><i lang="es"><b>${s}</b> …</i>`,A(p),{label:'Pronombre',hints:['¿Es singular o plural? ¿Incluye a la persona que habla (yo) o a quien escucha (tú)?','Si hay un masculino en el grupo, usamos el masculino plural.'],steps:[`${s} → <b>${A(p)[0]}</b>.`],err:v=>CS.tilde(A(p)[0],v)})}},
 cs_conjugar:{mat:'castella',ab:'Vb',nom:'Conjugar verbos regulares',ic:'Vb',curs:[6],
  teoria:['Los verbos tienen tres <b>conjugaciones</b> según el infinitivo: <b>1.ª -ar</b> (cantar), <b>2.ª -er</b> (temer) y <b>3.ª -ir</b> (vivir). Los verbos <b>regulares</b> mantienen la raíz y toman las terminaciones del modelo.',
   'Cada forma verbal tiene <b>raíz</b> (cant-) y <b>desinencia</b> (-amos), que indica la <b>persona</b> (1.ª, 2.ª, 3.ª), el <b>número</b> (singular, plural), el <b>tiempo</b> y el <b>modo</b>.',
   '<b>Tiempos simples</b> (una palabra): canto, cantaba, canté, cantaré, cantaría. <b>Tiempos compuestos</b> (haber + participio): he cantado, había cantado, habré cantado.',
   '¡Ojo con la tilde! <b>canto</b> (presente, yo) no es lo mismo que <b>cantó</b> (pasado, él). Consulta la <b>Tabla de conjugación</b> del material.'],
  gen(lv){const[inf,ca]=pick(CS.VERBS),T=lv===0?['pres','imp','pps','fut']:lv===1?['pres','imp','pps','fut','cond','ppc','plus','subj']:Object.keys(CS.T),t=pick(T),pi=rnd(0,5),forms=CS.conj(inf,t),ans=forms[pi];
   return CS.ex(`Conjuga el verb <b lang="es">${inf}</b> <span class="muted">(${ca})</span> en <b lang="es">${CS.T[t]}</b>:<br><b lang="es">${CS.PERS[pi]}</b> ___`,[ans],{label:'Forma verbal',
    hints:[`«${inf}» es de la ${CS.MODEL[CS.conjOf(inf)]}.`,(m=>`Fíjate en el verbo modelo «${m}»: ${CS.PERS[pi]} ${CS.conj(m,t)[pi]}. Haz lo mismo con «${inf}».`)({ar:['cantar','saltar'],er:['temer','comer'],ir:['vivir','subir']}[CS.conjOf(inf)].find(m=>m!==inf))],
    steps:[`«${inf}» es de la ${CS.MODEL[CS.conjOf(inf)]}.`,`${CS.cap(CS.T[t])}: ${forms.map((f,i)=>CS.PERS[i].split(' / ')[0]+' '+f).join(', ')}.`,`Respuesta: <b>${CS.PERS[pi]} ${ans}</b>.`],
    err:v=>{if(CS.strip(v)===CS.strip(ans))return'cs_verbo_tilde';if(forms.includes(v))return'cs_persona';if(Object.keys(CS.T).some(o=>CS.conj(inf,o)[pi]===v))return'cs_tiempo';return null}})}},
 cs_tiempos:{mat:'castella',ab:'Tv',nom:'Tiempos y modos verbales',ic:'Tv',curs:[6],
  teoria:['El verbo tiene tres <b>modos</b>: <b>indicativo</b> (hechos reales: canto), <b>subjuntivo</b> (deseos, dudas, posibilidades: ojalá cante) e <b>imperativo</b> (órdenes: ¡canta!).',
   `<table class="mini"><tr><th>Tiempo (indicativo)</th><th>Ejemplo</th></tr><tr><td>Presente</td><td>canto, temes, vive</td></tr><tr><td>Pretérito imperfecto</td><td>cantaba, temías</td></tr><tr><td>Pretérito perfecto simple</td><td>canté, temiste, vivió</td></tr><tr><td>Futuro simple</td><td>cantaré, vivirás</td></tr><tr><td>Condicional simple</td><td>cantaría, temeríamos</td></tr><tr><td>Pretérito perfecto compuesto</td><td>he cantado</td></tr><tr><td>Pretérito pluscuamperfecto</td><td>había cantado</td></tr><tr><td>Futuro compuesto</td><td>habré cantado</td></tr><tr><th>Subjuntivo</th><th></th></tr><tr><td>Presente de subjuntivo</td><td>(que) cante, temas, viva</td></tr></table>`,
   'Las <b>formas no personales</b> no se conjugan: <b>infinitivo</b> (cantar, temer, vivir), <b>gerundio</b> (cantando, temiendo, viviendo) y <b>participio</b> (cantado, temido, vivido).'],
  gen(lv){const[inf]=pick(CS.VERBS);
   if(Math.random()<.25){const k=pick(['infinitivo','gerundio','participio']),f=k==='infinitivo'?inf:k==='gerundio'?CS.ger(inf):CS.part(inf);
    return CS.ex(`Quina forma no personal del verb és «<b lang="es">${f}</b>»?`,[k,{infinitivo:'infinitiu',gerundio:'gerundi',participio:'participi'}[k]],{loose:true,label:'Infinitivo, gerundio o participio',hints:['Infinitivo: -ar, -er, -ir. Gerundio: -ando, -iendo. Participio: -ado, -ido.'],steps:[`«${f}» es un <b>${k}</b>.`]})}
   const T=lv===0?['pres','imp','pps','fut']:lv===1?['pres','imp','pps','fut','cond','ppc','plus','subj']:Object.keys(CS.T),t=pick(T),pi=rnd(0,5),f=CS.conj(inf,t)[pi],
    all=Object.keys(CS.T).filter(o=>CS.conj(inf,o).includes(f)),acc=[...new Set(all.flatMap(o=>CS.T_ALT[o]))];
   return CS.ex(`En quin temps verbal està la forma «<b lang="es">${f}</b>» (verb <b lang="es">${inf}</b>)?`,acc,{loose:true,label:'Tiempo verbal',
    hints:['¿Es una sola palabra (tiempo simple) o lleva el verbo haber delante (tiempo compuesto)?',t==='subj'?'Piensa: ¿se podría decir «ojalá…» o «quiero que…» delante?':'Fíjate en la terminación: -aba / -ía, -é / -í, -ré, -ría…'],
    steps:[CS.COMPUESTOS.includes(t)?`Lleva el auxiliar haber (${f.split(' ')[0]}): es un tiempo compuesto.`:t==='subj'?'Se puede decir «quiero que…» delante: es modo subjuntivo.':'Es un tiempo simple del modo indicativo.',`Es <b>${all.map(o=>CS.T[o]).join('</b> o <b>')}</b>.`],
    err:v=>t==='subj'&&/^presente( de indicativo)?$/.test(fold(v))?'cs_modo':Object.values(CS.T_ALT).flat().some(x=>fold(x)===fold(v))?'cs_tiempo_nombre':null})}},
 cs_irregulares:{mat:'castella',ab:'Ir',nom:'Verbos irregulares',ic:'Ir',curs:[6],
  teoria:['Los verbos <b>irregulares</b> cambian la raíz o las terminaciones del modelo en algunos tiempos: <b>tener</b> → tengo, tuve; <b>hacer</b> → hago, hice, hizo, hecho.',
   'Los tiempos donde más cambian son el <b>presente</b> (quiero, puedo, conozco), el <b>pretérito perfecto simple</b> (anduve, conduje, dije, supe), el <b>futuro</b> (tendré, saldré, cabré) y el <b>participio</b> (escrito, roto, vuelto, abierto, dicho).',
   'Errores frecuentes: <b>andé</b> ✗ → anduve ✓ · <b>conducí</b> ✗ → conduje ✓ · <b>satisfació</b> ✗ → satisfizo ✓ · <b>rompido</b> ✗ → roto ✓ · <b>escribido</b> ✗ → escrito ✓ · <b>cabo</b> ✗ → quepo ✓.',
   'Consulta la lista completa en la <b>Tabla de conjugación</b> (pestaña «irregulares»).'],
  gen(lv){const opts=[];CS.IRR.filter(r=>lv>0||!RARE.includes(r[0])).forEach(r=>SLOT.forEach((s,si)=>{const ok=r[si+1],reg=s[2]==='part'?CS.part(r[0]):CS.conj(r[0],s[2])[s[3]];if(ok!==reg)opts.push([r,s,ok,reg])}));
   const[r,s,ans,reg]=pick(opts);
   return CS.ex(`Escriu la forma del verb <b lang="es">${r[0]}</b> <span class="muted">(${r[6]})</span>:<br><b lang="es">${s[0]}${s[1]?', '+s[1]:''}</b> → ___`,[ans],{label:'Forma verbal',
    hints:['Es un verbo irregular: no sigue el modelo regular.',`Piensa en una frase: ${s[2]==='part'?'«He …»':s[2]==='fut'?'«Mañana yo …»':s[2]==='pps'?'«Ayer '+(s[3]?'él':'yo')+' …»':'«Ahora yo …»'}.`],
    steps:[`Si fuera regular sería «${reg}», pero <b>${r[0]}</b> es irregular.`,`Respuesta: <b>${ans}</b>.`],err:v=>v===reg||CS.strip(v)===CS.strip(reg)?'cs_irregular':CS.tilde(ans,v)})}},
 cs_nexos:{mat:'castella',ab:'Nx',nom:'Adverbios, preposiciones y conjunciones',ic:'Nx',curs:[6],
  teoria:['Son palabras <b>invariables</b>: nunca cambian de forma.',
   `<b>Adverbios</b>: indican circunstancias.<table class="mini"><tr><td>Lugar</td><td>aquí, allí, cerca, lejos, encima</td></tr><tr><td>Tiempo</td><td>hoy, ayer, pronto, siempre, nunca</td></tr><tr><td>Modo</td><td>bien, mal, despacio, rápidamente</td></tr><tr><td>Cantidad</td><td>mucho, poco, muy, bastante, demasiado</td></tr><tr><td>Afirmación / negación / duda</td><td>sí, también · no, tampoco · quizás, acaso</td></tr></table>`,
   `<b>Preposiciones</b> (unen palabras): ${PREP.join(', ')}. (<i>Cabe</i> y <i>so</i> ya casi no se usan; hoy también se consideran preposiciones <i>versus</i> y <i>vía</i>.)`,
   '<b>Conjunciones</b> (unen palabras u oraciones): copulativas <b>y, e, ni</b> (suman); disyuntivas <b>o, u</b> (eligen); adversativas <b>pero, sino</b> (oponen).',
   '<b>y → e</b> delante de palabras que empiezan por <b>i-</b> o <b>hi-</b> (padres <b>e</b> hijos), pero no delante de <b>hie-</b> (agua <b>y</b> hielo). <b>o → u</b> delante de <b>o-</b> u <b>ho-</b> (siete <b>u</b> ocho).'],
  gen(lv){const r=Math.random();
   if(r<.45){const[o,t]=pick(ADV.filter(x=>lv>0||!x[2]));return CS.ex(`L'adverbi destacat, de quina classe és?<br><i lang="es">${CS.mark(o)}</i>`,A(ADV_ALT[t]),{loose:true,label:'Clase de adverbio',hints:['Pregúntate: ¿dónde?, ¿cuándo?, ¿cómo?, ¿cuánto? ¿O afirma, niega o expresa duda?'],steps:[`«${CS.star(o)}» es un adverbio de <b>${t}</b>.`]})}
   if(r<.7){const i=rnd(2,PREP.length-1),a=PREP_ALT[PREP[i]]?A(PREP_ALT[PREP[i]]):[PREP[i]];return CS.ex(`Escriu la preposició que va a continuació a la llista:<br><b lang="es">${PREP[i-2]}, ${PREP[i-1]}, ___</b>`,a,{loose:true,label:'Preposición',hints:['Repite la lista en voz alta empezando por la primera («a»): ¿cuál viene después de las dos que ves?',`Empieza por «${PREP[i][0]}».`],steps:[`La lista: ${PREP.join(', ')}.`,`Respuesta: <b>${a.join(' / ')}</b>.`]})}
   const[p,t,a]=pick(CONJ);return CS.ex(`Escriu la conjunció que falta (${t==='c'?'<b>y</b> o <b>e</b>: sumam':'<b>o</b> o <b>u</b>: triam'}):<br><b lang="es">${p.replace('___',CS.gap)}</b>`,[a],{label:'Conjunción',hints:['Fíjate en cómo empieza (cómo suena) la palabra que va detrás.','y → e delante de i-, hi- (no hie-); o → u delante de o-, ho-.'],steps:[a==='e'?'La palabra siguiente empieza por el sonido /i/: y → <b>e</b>.':a==='u'?'La palabra siguiente empieza por el sonido /o/: o → <b>u</b>.':`No hace falta cambiar: <b>${a}</b>.`],err:v=>['y','e','o','u'].includes(v)?'cs_conjuncion':null})}},
 cs_sujeto:{mat:'castella',ab:'Sp',nom:'Sujeto y predicado',ic:'Sp',curs:[6],
  teoria:['La <b>oración</b> tiene dos partes: el <b>sujeto</b> (de quién se dice algo) y el <b>predicado</b> (lo que se dice del sujeto; su núcleo es el verbo).',
   'Para encontrar el sujeto, busca el <b>verbo</b> y pregunta <b>¿quién?</b> o <b>¿qué?</b> Comprueba la <b>concordancia</b>: si cambias el sujeto de número, el verbo también cambia (el gato duerme → los gatos duermen).',
   'El sujeto no siempre va al principio: «Mañana vendrán <b>mis abuelos</b>». Con verbos como <b>gustar</b> o <b>encantar</b>, el sujeto es lo que gusta: «Me gustan <b>las fresas</b>».',
   'A veces el sujeto no aparece: es el <b>sujeto omitido</b> (o elíptico). Lo sabemos por la terminación del verbo: «Hemos ganado» → <b>nosotros</b>.'],
  gen(lv){if(Math.random()<.4){const[o,p]=pick(SOM);
    return CS.ex(`Aquesta oració té el <b>subjecte omès</b>. Quin pronom personal és el subjecte?<br><i lang="es">${o}</i>`,A(p),{loose:true,label:'Sujeto omitido',hints:['Fíjate en la terminación del verbo: ¿qué persona es?','Prueba a poner delante del verbo los pronombres personales, uno a uno, hasta encontrar el que concuerda.'],steps:['La terminación del verbo nos dice la persona.',`El sujeto omitido es <b>${A(p)[0]}</b>.`]})}
   const[o,s,e]=pick(SUJ.filter(x=>lv>0||!x[2]));
   return CS.ex(`Escriu el <b>subjecte</b> d'aquesta oració:<br><i lang="es">${o}</i>`,[s],{loose:true,label:'Sujeto',hints:['Busca el verbo y pregúntale: ¿quién? o ¿qué?','Comprueba la concordancia: si cambias el sujeto a plural o a singular, el verbo también cambia.'],
    steps:['Buscamos el verbo y le preguntamos ¿quién? o ¿qué?',`El sujeto es: <b>${s}</b>. El resto de la oración es el predicado.`],err:v=>e&&A(e).some(x=>fold(x)===fold(v))?'cs_sujeto_gustar':null})}},
 cs_predicado:{mat:'castella',ab:'Pn',nom:'Predicado nominal y verbal',ic:'Pn',curs:[6],
  teoria:['El <b>predicado nominal</b> tiene un verbo <b>copulativo</b> (<b>ser, estar, parecer</b>) y un <b>atributo</b>, que dice cómo es o cómo está el sujeto: «Mi abuela es <b>muy simpática</b>».',
   'El atributo concuerda con el sujeto y se puede sustituir por <b>lo</b>: «Mi abuela lo es».',
   'El <b>predicado verbal</b> tiene cualquier otro verbo, que expresa una acción: «Los niños <b>juegan</b> en el parque».'],
  gen(lv){const[o,t,at]=pick(PRED);
   if(t==='n'&&lv>0&&Math.random()<.5)return CS.ex(`Aquesta oració té predicat nominal. Escriu-ne l'<b>atribut</b>:<br><i lang="es">${o}</i>`,[at],{loose:true,label:'Atributo',hints:['Busca el verbo copulativo (ser, estar, parecer).','El atributo es lo que va con él y dice cómo es o cómo está el sujeto.'],steps:['El verbo es copulativo.',`El atributo es <b>${at}</b> (se puede cambiar por «lo»).`]});
   const a=t==='n'?['nominal','predicado nominal']:['verbal','predicado verbal'];
   return CS.ex(`El predicat d'aquesta oració, és <b>nominal</b> o <b>verbal</b>?<br><i lang="es">${o}</i>`,a,{loose:true,label:'Nominal o verbal',hints:['¿El verbo es ser, estar o parecer?'],steps:[t==='n'?`El verbo es copulativo y lleva atributo («${at}»): predicado <b>nominal</b>.`:'El verbo expresa una acción: predicado <b>verbal</b>.'],err:v=>'cs_predicado'})}},
 cs_complementos:{mat:'castella',ab:'Cm',nom:'Los complementos del verbo',ic:'Cm',curs:[6],
  teoria:['El <b>complemento directo (CD)</b> es la persona, el animal o la cosa sobre la que recae la acción. Se sustituye por <b>lo, la, los, las</b>: «Compré <b>las manzanas</b>» → «<b>Las</b> compré». Si es una persona, lleva <b>a</b>: «Vi <b>a Luis</b>» → «<b>Lo</b> vi».',
   'El <b>complemento indirecto (CI)</b> es quien recibe el beneficio o el daño de la acción. Lleva <b>a</b> (o para) y se sustituye por <b>le, les</b>: «Regalé flores <b>a mi madre</b>» → «<b>Le</b> regalé flores».',
   'Los <b>complementos circunstanciales (CC)</b> indican circunstancias: de <b>lugar</b> (en el patio), <b>tiempo</b> (mañana), <b>modo</b> (despacio), <b>cantidad</b> (demasiado), <b>compañía</b> (con mis primos), <b>instrumento</b> (con un cuchillo), <b>causa</b> (por la lluvia), <b>finalidad</b> (para aprobar).',
   '<b>¡Ojo!</b> No uses <b>le</b> para el CD (✗ «Le vi a Laura» → ✓ «La vi») ni <b>la</b> para el CI (✗ «La di un regalo» → ✓ «Le di un regalo»).'],
  gen(lv){if(Math.random()<.35){const[o,p,t]=pick(PRN);
    return CS.ex(`Quin pronom (<b>lo, la, los, las, le, les</b>) substitueix el complement destacat?<br><i lang="es">${CS.mark(o)}</i>`,[p],{label:'Pronombre',hints:['Primero decide: ¿es complemento directo o indirecto?','CD → lo, la, los, las. CI → le, les.'],steps:[`«${CS.star(o)}» es complemento ${t==='cd'?'directo':'indirecto'}.`,`Se sustituye por <b>${p}</b>.`],err:v=>t==='cd'&&['le','les'].includes(v)?'cs_leismo':t==='ci'&&['la','las','lo','los'].includes(v)?'cs_laismo':null})}
   const[o,t,c]=pick(CMP),A1=A(CMP_ALT[t]),wrongCI=t==='cd'?A(CMP_ALT.ci):t==='ci'?A(CMP_ALT.cd):[];
   const fields=[{label:'Complement',txt:A1,loose:true,wide:true}];if(t==='cc'&&lv>0)fields.push({label:'De què? (lugar, tiempo...)',txt:A(CC_ALT[c]),loose:true,wide:true});
   return{text:`Quin complement és el fragment destacat?${t==='cc'&&lv>0?' Si és circumstancial, digues també de què.':''}<br><i lang="es">${CS.mark(o)}</i>`,fields,vis:null,
    hints:['Prueba a sustituirlo: si es lo / la / los / las, es CD; si es le / les, es CI.','Si responde a ¿dónde?, ¿cuándo?, ¿cómo?, ¿con quién?, ¿con qué?, ¿por qué?, ¿para qué?, es CC.'],
    steps:[t==='cd'?'Se puede sustituir por lo, la, los, las.':t==='ci'?'Se puede sustituir por le, les.':`Responde a una pregunta de circunstancia: es de <b>${c}</b>.`,`Es <b>${A1[0]}</b>${t==='cc'?` de ${c}`:''}.`],
    err:v=>wrongCI.some(x=>fold(x)===fold(v[0]))?'cs_cd_ci':null}}},
 cs_oraciones:{mat:'castella',ab:'Or',nom:'Clases de oraciones',ic:'Or',curs:[6],
  teoria:['Según la <b>intención</b> del hablante (modalidad), las oraciones son:',
   `<table class="mini"><tr><td><b>Enunciativas</b> (afirmativas o negativas)</td><td>informan</td><td>Mañana es martes. · No me gusta el queso.</td></tr><tr><td><b>Interrogativas</b></td><td>preguntan</td><td>¿Qué hora es?</td></tr><tr><td><b>Exclamativas</b></td><td>expresan emoción</td><td>¡Qué día tan bonito!</td></tr><tr><td><b>Imperativas</b> (exhortativas)</td><td>ordenan o piden</td><td>Cierra la puerta.</td></tr><tr><td><b>Desiderativas</b></td><td>expresan un deseo</td><td>Ojalá apruebe.</td></tr><tr><td><b>Dubitativas</b></td><td>expresan duda</td><td>Quizás llueva.</td></tr></table>`,
   'Según el número de verbos: la oración <b>simple</b> tiene un solo verbo conjugado (los tiempos compuestos y las perífrasis cuentan como uno: «he visitado», «voy a estudiar»); la oración <b>compuesta</b> tiene dos o más: «Mi hermana lee <b>y</b> yo dibujo».'],
  gen(lv){if(lv>0&&Math.random()<.45){const[o,n,t]=pick(SC);
    return{text:`Quantes formes verbals conjugades té aquesta oració? És simple o composta?<br><i lang="es">${o}</i>`,fields:[{label:'Nombre de verbs',txt:[String(n),['','uno','dos','tres'][n],['','un','dos','tres'][n]]},{label:'Simple o compuesta',txt:t==='simple'?['simple']:['compuesta','composta'],loose:true}],vis:null,
     hints:['Subraya los verbos conjugados. «He visitado» o «voy a estudiar» cuentan como uno.','Un solo verbo → simple; dos o más → compuesta.'],steps:[`Tiene ${n} forma${n>1?'s':''} verbal${n>1?'es':''} conjugada${n>1?'s':''}.`,`Es una oración <b>${t}</b>.`]}}
   const[o,m]=pick(MOD);
   return CS.ex(`Quina mena d'oració és, segons la intenció de qui parla?<br><i lang="es">${o}</i>`,A(m),{loose:true,label:'Modalidad',hints:['¿Informa, pregunta, expresa emoción, ordena, desea o duda?','Fíjate en palabras como ojalá (deseo) o quizás, tal vez (duda).'],steps:[`Es una oración <b>${A(m)[0]}</b>.`]})}}
});

Object.assign(ERR,{
 cs_categoria:{kid:'És una categoria gramatical, però no la d\'aquesta paraula. Pensa què fa a la frase.',par:'Castellà: confon les categories gramaticals'},
 cs_plural_z:{kid:'Compte! Quan una paraula acaba en -z, el plural es fa amb -ces: lápiz → lápices.',par:'Castellà: plural en -zes (lápizes)'},
 cs_plural_tilde:{kid:'El plural és bo, però mira la tilde: en fer-se més llarga, la paraula pot guanyar-la o perdre-la (joven → jóvenes, canción → canciones).',par:'Castellà: errors de tilde en el plural'},
 cs_mas_mejor:{kid:'«Mejor», «peor», «mayor» i «menor» ja són comparatius: no hi posis «más» davant.',par:'Castellà: diu «más mejor» o «más peor»'},
 cs_det_pron:{kid:'Mira si la paraula acompanya un nom (determinant) o el substitueix (pronom).',par:'Castellà: confon determinants i pronoms'},
 cs_verbo_tilde:{kid:'Gairebé! Revisa la tilde: canto (present, jo) no és el mateix que cantó (passat, ell).',par:'Castellà: errors de tilde en les formes verbals'},
 cs_persona:{kid:'La forma existeix, però és d\'una altra persona. Mira bé el subjecte.',par:'Castellà: confon la persona del verb'},
 cs_tiempo:{kid:'Aquesta forma és d\'un altre temps verbal. Revisa quin temps et demanen.',par:'Castellà: confon els temps verbals'},
 cs_modo:{kid:'És present, però de subjuntiu (es pot dir «quiero que…» davant).',par:'Castellà: confon l\'indicatiu i el subjuntiu'},
 cs_tiempo_nombre:{kid:'És un temps verbal, però no aquest. Fixa\'t en la terminació i en si porta «haber».',par:'Castellà: no reconeix els temps verbals'},
 cs_irregular:{kid:'Això seria si el verb fos regular! Aquest verb és irregular: mira la taula de verbs irregulars.',par:'Castellà: regularitza verbs irregulars (andé, conducí, rompido...)'},
 cs_conjuncion:{kid:'Escolta com comença la paraula següent: y → e davant i- / hi-, o → u davant o- / ho-.',par:'Castellà: no aplica el canvi y → e, o → u'},
 cs_sujeto_gustar:{kid:'Amb «gustar» o «encantar», el subjecte és la cosa que agrada, no la persona.',par:'Castellà: no troba el subjecte amb verbs com «gustar»'},
 cs_predicado:{kid:'Si el verb és ser, estar o parecer amb un atribut, el predicat és nominal; si no, és verbal.',par:'Castellà: confon predicat nominal i verbal'},
 cs_cd_ci:{kid:'Prova de substituir-lo: lo / la / los / las → complement directe; le / les → complement indirecte.',par:'Castellà: confon el complement directe i l\'indirecte'},
 cs_leismo:{kid:'És un complement directe: es substitueix per lo, la, los, las (no per le). Dir «le» aquí és leísmo.',par:'Castellà: leísmo (le en lloc de lo / la)'},
 cs_laismo:{kid:'És un complement indirecte: es substitueix per le o les. Dir «la» o «lo» aquí és laísmo o loísmo.',par:'Castellà: laísmo / loísmo (la o lo en lloc de le)'}
});
})();
