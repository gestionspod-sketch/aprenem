/* Aprenem - LENGUA CASTELLANA 6è: ORTOGRAFÍA
   Acentuación (agudas, llanas, esdrújulas, sobresdrújulas), diptongos e hiatos, tilde diacrítica, interrogativos y
   exclamativos (porque / por qué / porqué / por que), b / v, g / j, h (y haber / a ver, hecho / echo, hay / ahí / ay),
   ll / y, x / s y cc / c, signos de puntuación.
   Part de l'app d'estudi. Vegeu CLAUDE.md i la capçalera de contingut/castella.js (fonts). */
(()=>{
const A=CS.A,TIPUS={a:'aguda',l:'llana',e:'esdrújula',s:'sobresdrújula'},TIPUS_ALT={a:['aguda'],l:['llana','grave','plana'],e:['esdrújula','esdrujula'],s:['sobresdrújula','sobreesdrújula','sobresdrujula']};

/* ---------- accentuació ---------- */
// [paraula ben escrita, tipus, nivell]
const ACC=[['café','a'],['sofá','a'],['camión','a'],['también','a'],['francés','a'],['inglés','a'],['jamás','a'],['papá','a'],['colibrí','a',1],['sillón','a'],['compás','a',1],['champú','a'],['ratón','a'],['canción','a'],['autobús','a'],
 ['reloj','a'],['ciudad','a'],['pared','a'],['comer','a'],['feliz','a'],['hotel','a'],['color','a'],['verdad','a'],['nariz','a',1],
 ['árbol','l'],['lápiz','l'],['fácil','l'],['difícil','l'],['césped','l'],['azúcar','l'],['cárcel','l',1],['móvil','l'],['débil','l'],['ángel','l'],['tórax','l',1],['cómic','l'],['álbum','l',1],['fútbol','l'],
 ['casa','l'],['mesa','l'],['examen','l',1],['joven','l',1],['lunes','l'],['libro','l'],['ventana','l'],['origen','l',1],['crisis','l',1],['martes','l'],['imagen','l',1],['volumen','l',1],
 ['música','e'],['pájaro','e'],['plátano','e'],['médico','e'],['teléfono','e'],['sábado','e'],['miércoles','e'],['matemáticas','e'],['brújula','e',1],['murciélago','e'],['lámpara','e'],['máquina','e'],['número','e'],['último','e'],['fantástico','e'],
 ['dígamelo','s',1],['cómetelo','s',1],['cuéntamelo','s',1],['explícaselo','s',1]];
const RULE={a:'Las <b>agudas</b> llevan tilde si acaban en <b>vocal, -n o -s</b> (café, camión, francés).',l:'Las <b>llanas</b> llevan tilde si <b>no</b> acaban en vocal, -n o -s (árbol, lápiz, fácil).',e:'Las <b>esdrújulas</b> llevan tilde <b>siempre</b> (música, pájaro).',s:'Las <b>sobresdrújulas</b> llevan tilde <b>siempre</b> (cuéntamelo).'};

/* ---------- diftongs i hiats ---------- */
// [sense tilde, ben escrita, d = diptongo / h = hiato, nivell]
const DH=[['maiz','maíz','h'],['pais','país','h'],['rio','río','h'],['dia','día','h'],['buho','búho','h'],['oido','oído','h'],['raiz','raíz','h'],['baul','baúl','h',1],['tio','tío','h'],['reir','reír','h',1],['frio','frío','h'],['policia','policía','h'],['increible','increíble','h',1],['grua','grúa','h',1],
 ['poeta','poeta','h'],['leon','león','h'],['teatro','teatro','h'],['aereo','aéreo','h',1],['heroe','héroe','h',1],['caos','caos','h',1],['museo','museo','h'],['pelear','pelear','h',1],
 ['cuidado','cuidado','d'],['ciudad','ciudad','d'],['aire','aire','d'],['peine','peine','d'],['huevo','huevo','d'],['agua','agua','d'],['cielo','cielo','d'],['piano','piano','d'],['camion','camión','d'],['adios','adiós','d'],['despues','después','d'],['nieve','nieve','d'],['cuento','cuento','d'],['bailar','bailar','d'],['causa','causa','d'],['murcielago','murciélago','d',1]];

/* ---------- tilde diacrítica ---------- */
// [frase amb ___, resposta, l'altra forma, explicació]
const DIA=[['Este regalo es para ___.','él','el','él: pronombre personal (él mismo).'],['___ perro de mi vecina ladra mucho.','el','él','el: artículo (el perro).'],['¿___ vienes al cine?','tú','tu','tú: pronombre personal.'],['¿Dónde está ___ mochila?','tu','tú','tu: posesivo (tu mochila).'],
 ['Este bocadillo es para ___.','mí','mi','mí: pronombre (para mí).'],['___ hermana toca el piano.','mi','mí','mi: posesivo (mi hermana).'],['Le pregunté si venía y me dijo que ___.','sí','si','sí: afirmación.'],['___ llueve, nos quedaremos en casa.','si','sí','si: condición.'],
 ['¿Quieres un ___ con limón?','té','te','té: la bebida.'],['Mañana ___ llamo por teléfono.','te','té','te: pronombre.'],['No ___ la respuesta.','sé','se','sé: verbo saber (yo sé).'],['Mi hermano ___ ducha por la mañana.','se','sé','se: pronombre.'],
 ['Quiero ___ chocolate, por favor.','más','mas','más: cantidad.'],['Espero que me ___ la razón.','dé','de','dé: verbo dar.'],['El vaso ___ agua está lleno.','de','dé','de: preposición.'],['___ no ha llegado el autobús.','aún','aun','aún: todavía.'],['Hacía frío y, ___ así, salimos a pasear.','aun','aún','aun: incluso.'],
 ['Hazlo tú ___.','solo','sólo','solo: hoy se escribe sin tilde (sin compañía o solamente).']];

/* ---------- interrogatius ---------- */
// [frase, resposta, opcions, explicació]
const PQ=[['¿___ no viniste ayer?','por qué','porque / por qué / porqué','por qué: en preguntas (directas o indirectas).'],['No vine ___ estaba enfermo.','porque','porque / por qué / porqué','porque: da una causa o explicación.'],['No sé el ___ de su enfado.','porqué','porque / por qué / porqué','porqué: es un sustantivo (el porqué = el motivo).'],
 ['Dime ___ te ríes.','por qué','porque / por qué / porqué','por qué: pregunta indirecta.'],['Me abrigo ___ hace frío.','porque','porque / por qué / porqué','porque: causa.'],['¿___ hora es?','qué','que / qué','qué: interrogativo.'],['Quiero ___ vengas a mi fiesta.','que','que / qué','que: une dos oraciones, no pregunta.'],
 ['¿___ te llamas?','cómo','como / cómo','cómo: interrogativo.'],['Es tan alto ___ su padre.','como','como / cómo','como: compara.'],['¿___ vives?','dónde','donde / dónde','dónde: interrogativo.'],['Esta es la casa ___ nací.','donde','donde / dónde','donde: indica lugar, no pregunta.'],
 ['¿___ es tu cumpleaños?','cuándo','cuando / cuándo','cuándo: interrogativo.'],['Avísame ___ llegues.','cuando','cuando / cuándo','cuando: indica tiempo, no pregunta.'],['No sé ___ ha llamado.','quién','quien / quién','quién: pregunta indirecta.'],['¡___ bonito es este paisaje!','qué','que / qué','qué: exclamativo.'],
 ['¡___ me alegro de verte!','cuánto','cuanto / cuánto','cuánto: exclamativo.'],['No sé ___ cuesta este libro.','cuánto','cuanto / cuánto','cuánto: pregunta indirecta.'],['El chico ___ vino ayer es mi primo.','que','que / qué','que: relativo (el chico que vino).'],
 ['Esa es la razón ___ me fui.','por la que|por que','porque / por qué / por que','por (la) que: preposición + relativo.',1]];

/* ---------- consonants ---------- */
// [paraula, lletra que falta, norma, nivell]
const BV=[['escribir','b','bir'],['recibir','b','bir'],['subir','b','bir'],['hervir','v','bir'],['vivir','v','bir'],['servir','v','bir'],['cantaba','b','aba'],['jugábamos','b','aba'],['paseabas','b','aba'],
 ['también','b','mb'],['cambio','b','mb'],['hombre','b','mb'],['enviar','v','mb'],['invierno','v','mb'],['invitar','v','mb'],['blanco','b','bl'],['brazo','b','bl'],['obstáculo','b','bl',1],['abrigo','b','bl'],
 ['buzón','b','bu'],['burbuja','b','bu'],['buscar','b','bu'],['octavo','v','ivo'],['suave','v','ivo'],['nuevo','v','ivo'],['breve','v','ivo'],['activo','v','ivo'],['deportivo','v','ivo'],
 ['evitar','v','eva'],['evaporar','v','eva'],['amabilidad','b','bil',1],['posibilidad','b','bil',1],['herbívoro','v','voro',1],['carnívoro','v','voro',1],['estuve','v','ir'],['anduve','v','ir'],['tuvo','v','ir'],['iba','b','ir']];
const BV_N={bir:'Los verbos acabados en <b>-bir</b> se escriben con b (escribir, recibir, subir), <b>excepto</b> hervir, servir y vivir.',
 aba:'Las terminaciones <b>-aba, -abas, -ábamos...</b> del pretérito imperfecto se escriben con b (cantaba, jugábamos).',
 mb:'Después de <b>m</b> se escribe <b>b</b> (también, cambio); después de <b>n</b>, <b>v</b> (enviar, invierno).',
 bl:'Delante de otra consonante se escribe <b>b</b>: bl, br, bs (blanco, brazo, obstáculo).',
 bu:'Las palabras que empiezan por <b>bu-, bur-, bus-</b> se escriben con b (buzón, burbuja, buscar).',
 ivo:'Los adjetivos acabados en <b>-avo, -ave, -evo, -eve, -ivo, -iva</b> se escriben con v (octavo, suave, nuevo, breve, activo).',
 eva:'Las palabras que empiezan por <b>eva-, eve-, evi-, evo-</b> se escriben con v (evitar, evaporar).',
 bil:'Las palabras acabadas en <b>-bilidad</b> se escriben con b (amabilidad), excepto movilidad y civilidad.',
 voro:'Las palabras acabadas en <b>-ívoro, -ívora</b> se escriben con v (herbívoro, carnívoro), excepto víbora.',
 ir:'Las formas de los verbos <b>estar, andar, tener e ir</b> que suenan /b/ se escriben con v (estuve, anduve, tuvo, voy), excepto el imperfecto de ir: <b>iba</b>.'};
// homòfons amb b / v: [frase, resposta, l'altra, explicació]
const BVH=[['Mi abuelo ___ que ir al médico.','tuvo','tubo','tuvo: verbo tener.'],['El agua sale por un ___ de plástico.','tubo','tuvo','tubo: pieza hueca y alargada.'],['El domingo vamos a ___ en las elecciones.','votar','botar','votar: dar el voto.'],['La pelota no para de ___.','botar','votar','botar: rebotar.'],
 ['¡Qué paisaje tan ___!','bello','vello','bello: bonito.'],['Tiene mucho ___ en los brazos.','vello','bello','vello: pelo fino del cuerpo.'],['La ___ da leche.','vaca','baca','vaca: el animal.'],['Pusimos las maletas en la ___ del coche.','baca','vaca','baca: portaequipajes del techo del coche.'],
 ['Mi abuela es muy ___.','sabia','savia','sabia: que sabe mucho.'],['La ___ recorre el tronco del árbol.','savia','sabia','savia: líquido que circula por las plantas.']];
const GJ=[['coger','g','ger'],['recoger','g','ger'],['proteger','g','ger'],['elegir','g','ger'],['dirigir','g','ger'],['tejer','j','ger',1],['crujir','j','ger',1],['garaje','j','aje'],['viaje','j','aje'],['mensaje','j','aje'],['paisaje','j','aje'],['equipaje','j','aje'],['traje','j','aje'],
 ['extranjero','j','jero'],['relojería','j','jero'],['cerrajero','j','jero',1],['consejero','j','jero',1],['geografía','g','geo'],['biología','g','geo'],['geometría','g','geo'],['origen','g','gen'],['imagen','g','gen'],['urgente','g','gen'],['inteligencia','g','gen',1],['gente','g','gen'],
 ['dije','j','dije'],['trajo','j','dije'],['condujimos','j','dije',1],['dijeron','j','dije'],['magia','g','gia'],['colegio','g','gia'],['región','g','gia'],['religión','g','gia',1]];
const GJ_N={ger:'Los verbos acabados en <b>-ger, -gir</b> se escriben con g (coger, elegir, dirigir), <b>excepto</b> tejer y crujir.',
 aje:'Las palabras acabadas en <b>-aje, -eje</b> se escriben con j (garaje, viaje, mensaje).',
 jero:'Las palabras acabadas en <b>-jero, -jera, -jería</b> se escriben con j (extranjero, relojería).',
 geo:'Las palabras con <b>geo-</b> (tierra) y <b>-logía</b> (estudio) se escriben con g (geografía, biología).',
 gen:'Las palabras con <b>-gen, -gente, -gencia</b> se escriben con g (origen, urgente, inteligencia).',
 dije:'Si el infinitivo no tiene g ni j y en el pasado suena /j/, se escribe <b>j</b>: decir → dije, traer → trajo, conducir → condujimos.',
 gia:'Las terminaciones <b>-gia, -gio, -gión</b> se escriben con g (magia, colegio, región).'};

/* ---------- la h ---------- */
// [paraula ben escrita, norma, nivell]
const HW=[['hielo','hie'],['hueso','hie'],['huevo','hie'],['huir','hie'],['hierba','hie'],['huele','hie'],['huérfano','hie',1],['humano','hum'],['humedad','hum'],['humo','hum'],['hidrógeno','hidr',1],['hexágono','hidr'],['heptágono','hidr',1],['hipopótamo','hidr'],
 ['había','verb'],['hice','verb'],['hablamos','verb'],['hallaste','verb',1],['habitar','verb'],['ahora','int'],['zanahoria','int'],['almohada','int'],['búho','int'],['prohibir','int',1],['deshacer','int'],
 ['oler','no'],['óseo','no',1],['orfanato','no',1],['oquedad','no',1],['ermita','no',1],['echar','no'],['orilla','no'],['ola','no'],['alumno','no'],['ovalado','no']];
const H_N={hie:'Se escriben con h las palabras que empiezan por <b>hie-, hue-, hui-</b> (hielo, hueso, huir). ¡Ojo! Los de la misma familia que no empiezan así no la llevan: hueso → óseo, huele → oler, huérfano → orfanato.',
 hum:'Se escriben con h las palabras que empiezan por <b>hum-</b> seguido de vocal (humano, humo, humedad).',
 hidr:'Llevan h las palabras que empiezan por <b>hidr-, hiper-, hipo-, hexa-, hepta-</b> (hidrógeno, hexágono, hipopótamo).',
 verb:'Se escriben con h todas las formas de los verbos <b>haber, hacer, hablar, hallar, habitar</b> (había, hice, hablamos).',
 int:'Algunas palabras llevan <b>h intercalada</b> y hay que memorizarlas: ahora, zanahoria, almohada, búho, prohibir, deshacer (des + hacer).',
 no:'Esta palabra <b>no</b> lleva h. Recuerda: «echar» (tirar, poner) no lleva h, aunque «hecho» (de hacer) sí.'};
// homòfons amb h: [frase, resposta, opcions, explicació]
const HH=[['Vamos ___ qué pasa.','a ver','haber / a ver','a ver: preposición a + verbo ver (= vamos a mirar).'],['Tiene que ___ una solución.','haber','haber / a ver','haber: verbo (= existir).'],['Mañana puede ___ tormenta.','haber','haber / a ver','haber: verbo (puede haber).'],['___ si llegamos pronto.','a ver','haber / a ver','a ver: = ojalá, vamos a ver.'],
 ['___ muchos niños en el patio.','hay','hay / ahí / ay','hay: verbo haber.'],['Deja la caja ___, en el suelo.','ahí','hay / ahí / ay','ahí: adverbio de lugar.'],['¡___, qué daño me he hecho!','ay','hay / ahí / ay','¡ay!: interjección de dolor o sorpresa.'],
 ['Ya he ___ los deberes.','hecho','hecho / echo','hecho: participio de hacer.'],['Siempre ___ sal a la ensalada.','echo','hecho / echo','echo: verbo echar (poner, tirar).'],['Una ___ enorme tiró al surfista.','ola','ola / hola','ola: onda del mar.'],['___, ¿cómo estás?','hola','ola / hola','hola: saludo.'],
 ['Mi abuela ___ ido al mercado.','ha','a / ha','ha: verbo haber (ha ido).'],['Voy ___ casa de Marta.','a','a / ha','a: preposición.'],['La vaca come ___ en el prado.','hierba','hierba / hierva','hierba: planta.'],['Espera a que el agua ___.','hierva','hierba / hierva','hierva: verbo hervir.'],
 ['Te espero ___ las cinco.','hasta','hasta / asta','hasta: preposición.'],['La bandera ondea en lo alto del ___.','asta','hasta / asta','asta: palo de la bandera.']];

/* ---------- ll / y ---------- */
const LY=[['pasillo','ll','illo'],['ardilla','ll','illo'],['bombilla','ll','illo'],['cuchillo','ll','illo'],['mantequilla','ll','illo'],['atropellar','ll','llar',1],['brillar','ll','llar'],['aullar','ll','llar'],['chillar','ll','llar'],
 ['huyó','y','uyo'],['construyó','y','uyo'],['leyó','y','uyo'],['cayeron','y','uyo'],['oyeron','y','uyo'],['rey','y','fin'],['hoy','y','fin'],['muy','y','fin'],['ley','y','fin'],['estoy','y','fin'],['convoy','y','fin',1],
 ['lluvia','ll','mem'],['llave','ll','mem'],['calle','ll','mem'],['gallina','ll','mem'],['caballo','ll','mem'],['valle','ll','mem'],['yema','y','mem'],['yegua','y','mem'],['payaso','y','mem'],['playa','y','mem'],['rayo','y','mem'],['mayo','y','mem'],['joya','y','mem'],['yate','y','mem']];
const LY_N={illo:'Se escriben con ll las palabras acabadas en <b>-illo, -illa</b> (pasillo, ardilla).',llar:'Se escriben con ll los verbos acabados en <b>-llar, -ellar, -illar, -ullar</b> (brillar, aullar, atropellar).',
 uyo:'Se escriben con y las formas de verbos cuyo infinitivo no tiene ll ni y (huir → huyó, construir → construyó, leer → leyó, caer → cayeron).',
 fin:'Se escribe y al final de palabra cuando suena /i/ sin acento (rey, hoy, muy, estoy).',mem:'Esta palabra no sigue ninguna regla: hay que memorizarla. Piensa en otras de su familia (lluvia → llover, caballo → caballero).'};
const LYH=[['El niño se ___ del columpio.','cayó','calló','cayó: verbo caer.'],['Cuando entró la maestra, todo el mundo se ___.','calló','cayó','calló: verbo callar (quedarse en silencio).'],['Saltó la ___ del jardín.','valla','vaya','valla: cerca o barrera.'],['Espero que te ___ bien el examen.','vaya','valla','vaya: verbo ir.'],
 ['No creo que ___ nadie en casa.','haya','halla','haya: verbo haber.'],['Siempre se ___ la solución.','halla','haya','halla: verbo hallar (encontrar).',1]];

/* ---------- x / s i cc / c ---------- */
const XS=[['explicar','x','expl'],['exprimir','x','expl'],['expresar','x','expl'],['explorar','x','expl'],['exponer','x','expl'],['extraordinario','x','extra'],['extraterrestre','x','extra'],['extranjero','x','extra'],
 ['espalda','s','es'],['esperar','s','es'],['estrella','s','es'],['escuela','s','es'],['estómago','s','es'],['espuma','s','es'],['esqueleto','s','es',1],['esquina','s','es'],
 ['conexión','x','xion',1],['reflexión','x','xion',1],['examen','x','mem'],['éxito','x','mem'],['taxi','x','mem'],['exacto','x','mem'],['sexto','x','mem'],['texto','x','mem'],['próximo','x','mem'],
 ['acción','cc','cc'],['dirección','cc','cc'],['lección','cc','cc'],['protección','cc','cc',1],['atracción','cc','cc',1],['canción','c','c'],['atención','c','c'],['relación','c','c',1],['estación','c','c'],['emoción','c','c']];
const XS_N={expl:'Se escriben con x las palabras que empiezan por <b>ex-</b> seguido de <b>pl</b> o <b>pr</b> (explicar, exprimir).',extra:'Se escriben con x las palabras con el prefijo <b>extra-</b> (= fuera de): extraordinario, extraterrestre.',
 es:'Si después de <b>es-</b> viene otra consonante que no forma pl o pr, se escribe <b>s</b> (espalda, estrella, escuela).',xion:'Las palabras acabadas en <b>-xión</b> se escriben con x (conexión, reflexión).',mem:'Esta palabra se escribe con x y hay que memorizarla (examen, éxito, taxi, texto).',
 cc:'Se escribe <b>-cción</b> si en la familia hay una palabra con <b>-ct-</b>: acto → acción, director → dirección, lector → lección, protector → protección.',c:'Se escribe <b>-ción</b> (una sola c) si en la familia no hay ninguna palabra con -ct-: cantar → canción, atento → atención.'};

/* ---------- puntuació ---------- */
// [frase amb ▢, respostes, explicació, nivell]
const PUN=[['Compré peras▢ manzanas y plátanos.','coma|una coma','Usamos <b>coma</b> para separar los elementos de una enumeración.'],
 ['Luis▢ ven aquí ahora mismo.','coma|una coma','El nombre de la persona a quien hablamos (vocativo) se separa con <b>coma</b>.'],
 ['Mi hermano, que es médico▢ trabaja en Palma.','coma|una coma','Las aclaraciones van entre <b>comas</b>.'],
 ['En la mochila llevo tres cosas▢ el bocadillo, el agua y la gorra.','dos puntos|dos punts','Los <b>dos puntos</b> anuncian una enumeración.'],
 ['Querida abuela▢ <br>Te escribo desde el campamento.','dos puntos|dos punts','Después del saludo de una carta se ponen <b>dos puntos</b>.'],
 ['Mi madre me dijo▢ «Recoge tu cuarto».','dos puntos|dos punts','Antes de citar las palabras exactas de alguien, se ponen <b>dos puntos</b>.'],
 ['Unos jugaban al fútbol▢ otros, en cambio, leían a la sombra.','punto y coma|punt i coma','El <b>punto y coma</b> separa oraciones relacionadas, sobre todo si ya hay comas.',1],
 ['Me gustan muchas frutas: fresas, kiwis, peras▢','puntos suspensivos|punts suspensius','Los <b>puntos suspensivos</b> indican que la enumeración podría continuar.'],
 ['Abrió la puerta despacio y▢','puntos suspensivos|punts suspensius','Los <b>puntos suspensivos</b> dejan la frase en suspense.'],
 ['▢Qué hora es?','signo de apertura de interrogación|signo de interrogación|interrogación|apertura de interrogación|signo de interrogación de apertura|interrogant','En castellano, las preguntas llevan signo de <b>apertura (¿)</b> y de cierre (?).'],
 ['▢Qué sorpresa tan bonita!','signo de apertura de exclamación|signo de exclamación|exclamación|signo de admiración|admiración|apertura de exclamación|exclamació','En castellano, las exclamaciones llevan signo de <b>apertura (¡)</b> y de cierre (!).'],
 ['▢¿Vienes al parque? ▢preguntó Ana.','raya|rayas|guion largo|guió llarg','En los diálogos, la <b>raya</b> (—) introduce lo que dice cada personaje y las palabras del narrador.',1],
 ['Mi abuelo siempre dice ▢Quien mucho abarca, poco aprieta▢.','comillas|cometes','Las <b>comillas</b> (« ») encierran las palabras exactas que alguien dice o un refrán citado.',1],
 ['Los niños llegaron tarde▢ El autobús se había averiado.','punto|punto y seguido|punt','El <b>punto y seguido</b> separa oraciones de un mismo párrafo.'],
 ['El tren sale a las 9▢30 h.','dos puntos|dos punts','Las horas se escriben con <b>dos puntos</b> (9:30) o con punto (9.30).',1]];
const PUN_NAMES=['coma','dos puntos','punto y coma','puntos suspensivos','interrogación','exclamación','raya','comillas','punto','paréntesis','guion'];

Object.assign(SK,{
 cs_acentuacion:{mat:'castella',ab:'Ac',nom:'Reglas de acentuación',ic:'Ac',curs:[6],
  teoria:['La <b>sílaba tónica</b> es la que suena más fuerte. Según dónde esté, las palabras son:',
   `<table class="mini"><tr><th>Tipo</th><th>Sílaba tónica</th><th>Llevan tilde si…</th><th>Ejemplos</th></tr><tr><td><b>Agudas</b></td><td>la última</td><td>acaban en <b>vocal, -n o -s</b></td><td>café, camión, francés · reloj, ciudad</td></tr><tr><td><b>Llanas</b> (graves)</td><td>la penúltima</td><td><b>no</b> acaban en vocal, -n o -s</td><td>árbol, lápiz, fácil · casa, examen</td></tr><tr><td><b>Esdrújulas</b></td><td>la antepenúltima</td><td><b>siempre</b></td><td>música, pájaro</td></tr><tr><td><b>Sobresdrújulas</b></td><td>antes de la antepenúltima</td><td><b>siempre</b></td><td>cuéntamelo</td></tr></table>`,
   'En castellano solo hay un tipo de tilde: (´). ¡No confundas con el catalán, que tiene abierta y cerrada (è, é)!'],
  gen(lv){const[w,t]=pick(ACC.filter(x=>lv>0||!x[2])),s=CS.strip(w);
   return{text:`Observa la paraula «<b lang="es">${s}</b>».<br>És aguda, llana, esdrúixola o sobreesdrúixola? Escriu-la amb la tilde, si en porta.`,fields:[{label:'Aguda, llana, esdrújula...',txt:TIPUS_ALT[t],loose:true},{label:'Ben escrita',txt:[w],wide:true}],vis:null,
    hints:['Di la palabra en voz alta y da una palmada en cada sílaba. ¿Cuál suena más fuerte?',RULE[t]],
    steps:[`La sílaba tónica de «${s}» hace que sea <b>${TIPUS[t]}</b>.`,RULE[t],w===s?'Por su terminación, esta palabra <b>no</b> lleva tilde.':'Por eso <b>sí</b> lleva tilde.',`Se escribe: <b>${w}</b>.`],
    err:v=>CS.tilde(w,v[1])}}},
 cs_hiatos:{mat:'castella',ab:'Dh',nom:'Diptongos e hiatos',ic:'Dh',curs:[6],
  teoria:['Las vocales pueden ser <b>abiertas</b> (a, e, o) o <b>cerradas</b> (i, u).',
   'Un <b>diptongo</b> son dos vocales seguidas que se pronuncian en la misma sílaba: <b>cie</b>-lo, <b>ciu</b>-dad, <b>ai</b>-re. Se forma con una abierta + una cerrada (sin acento) o con dos cerradas. Siguen las reglas generales: ca-<b>mión</b>, des-<b>pués</b>.',
   'Un <b>hiato</b> son dos vocales seguidas que se pronuncian en sílabas distintas: po-<b>e</b>-ta, le-<b>ón</b>, r<b>í</b>-o.',
   '<b>¡Ojo!</b> Cuando la vocal <b>cerrada (i, u)</b> es la tónica y está junto a una abierta, <b>siempre lleva tilde</b>, aunque no lo pidan las reglas generales: <b>maíz, país, río, búho, día, policía</b>.'],
  gen(lv){const[s,w,t]=pick(DH.filter(x=>lv>0||!x[3])),ty=t==='h'?'hiato':'diptongo',cerr=t==='h'&&/[íú]/.test(w);
   return{text:`Observa la paraula «<b lang="es">${s}</b>».<br>Té diftong o hiat? Escriu-la ben escrita (amb tilde, si en porta).`,fields:[{label:'Diptongo o hiato',txt:[ty],loose:true},{label:'Ben escrita',txt:[w],wide:true}],vis:null,
    hints:['Sepárala en sílabas despacio. ¿Las dos vocales van en la misma sílaba o en sílabas distintas?','Si la i o la u suenan fuertes al lado de a, e, o, hay hiato y llevan tilde (río, maíz).'],
    steps:[t==='h'?`Las vocales se pronuncian en sílabas distintas: es un <b>hiato</b>.`:`Las vocales van en la misma sílaba: es un <b>diptongo</b>.`,cerr?'La vocal cerrada es la tónica: lleva tilde aunque no lo pidan las reglas generales.':w===s?'Según las reglas generales, no lleva tilde.':'Lleva tilde por las reglas generales de acentuación.',`Se escribe: <b>${w}</b>.`],
    err:v=>CS.tilde(w,v[1])||(v[0]&&fold(v[0])===(t==='h'?'diptongo':'hiato')?'cs_hiato':null)}}},
 cs_diacritica:{mat:'castella',ab:'Td',nom:'La tilde diacrítica',ic:'Td',curs:[6],
  teoria:['La <b>tilde diacrítica</b> sirve para distinguir palabras que se escriben igual pero tienen distinto significado o función:',
   `<table class="mini"><tr><td><b>él</b> (pronombre) / el (artículo)</td><td><b>tú</b> (pronombre) / tu (posesivo)</td></tr><tr><td><b>mí</b> (pronombre) / mi (posesivo)</td><td><b>sí</b> (afirmación) / si (condición)</td></tr><tr><td><b>té</b> (bebida) / te (pronombre)</td><td><b>sé</b> (saber) / se (pronombre)</td></tr><tr><td><b>dé</b> (dar) / de (preposición)</td><td><b>más</b> (cantidad) / mas (= pero)</td></tr><tr><td><b>aún</b> (= todavía) / aun (= incluso)</td><td>solo, este, ese: hoy <b>sin</b> tilde</td></tr></table>`],
  gen(){const[f,a,o,ex]=pick(DIA);
   return CS.ex(`Completa la frase amb la paraula que falta:<br><i lang="es">${f.replace('___',CS.gap)}</i> <span class="muted">(${[a,o].sort().join(' / ')})</span>`,[a],{label:'Paraula',hints:['Piensa qué función tiene la palabra en la frase: ¿pronombre, posesivo, artículo, verbo...?','Si se puede cambiar por otra palabra de su clase (él → ella; mi → tu), pruébalo.'],steps:[ex,`Respuesta: <b>${a}</b>.`],err:v=>v===o?'cs_diacritico':null})}},
 cs_porque:{mat:'castella',ab:'Pq',nom:'Porque, por qué, qué, cómo...',ic:'Pq',curs:[6],
  teoria:['Los <b>interrogativos y exclamativos</b> llevan tilde: <b>qué, quién, cuál, cómo, cuándo, cuánto, dónde</b>. Tanto en preguntas directas (¿Qué quieres?) como indirectas (No sé qué quieres).',
   'Cuando no preguntan ni exclaman, van sin tilde: «Quiero <b>que</b> vengas», «Es tan alto <b>como</b> tú».',
   `<table class="mini"><tr><td><b>por qué</b></td><td>pregunta</td><td>¿Por qué lloras?</td></tr><tr><td><b>porque</b></td><td>da la causa</td><td>Lloro porque me duele.</td></tr><tr><td><b>porqué</b></td><td>sustantivo (= el motivo)</td><td>No sé el porqué.</td></tr><tr><td><b>por que</b></td><td>preposición + que</td><td>Esa es la razón por (la) que vine.</td></tr></table>`],
  gen(lv){const[f,a,op,ex]=pick(PQ.filter(x=>lv>0||!x[4]));
   return CS.ex(`Completa la frase:<br><i lang="es">${f.replace('___',CS.gap)}</i> <span class="muted">(${op})</span>`,A(a),{label:'Paraula o paraules',hints:['¿La frase pregunta o exclama (directa o indirectamente)? Entonces lleva tilde.','Porque responde; por qué pregunta; el porqué es un nombre.'],steps:[ex,`Respuesta: <b>${A(a)[0]}</b>.`],
    err:v=>CS.strip(v)===CS.strip(A(a)[0])||op.split(' / ').includes(v)?'cs_interrogativo':null})}},
 cs_bv:{mat:'castella',ab:'Bv',nom:'B y V',ic:'Bv',curs:[6],
  teoria:['En castellano la b y la v suenan igual, así que hay que conocer las <b>reglas</b> y fijarse en las palabras de la misma familia.',...Object.values(BV_N).slice(0,7),'<b>Homófonas:</b> tuvo (tener) / tubo (pieza hueca), votar (elecciones) / botar (pelota), bello (bonito) / vello (pelo), vaca (animal) / baca (del coche).'],
  gen(lv){if(lv>0&&Math.random()<.35){const[f,a,o,ex]=pick(BVH);
    return CS.ex(`Completa la frase:<br><i lang="es">${f.replace('___',CS.gap)}</i> <span class="muted">(${[a,o].sort().join(' / ')})</span>`,[a],{label:'Paraula',hints:['Las dos palabras suenan igual. Piensa qué significa cada una.'],steps:[ex,`Respuesta: <b>${a}</b>.`],err:v=>v===o?'cs_bv':null})}
   const[w,l,r]=pick(BV.filter(x=>lv>0||!x[3])),sw=w.replace(new RegExp(l,'g'),l==='b'?'v':'b');
   return CS.ex(`Escriu la paraula completa (<b>b</b> o <b>v</b>):<br><b lang="es">${CS.gapw(w,l)}</b>`,[w],{label:'Paraula',hints:[BV_N[r],`¿Conoces otra palabra de la misma familia?`],steps:[BV_N[r],`Se escribe: <b>${w}</b>.`],err:v=>v===sw||CS.strip(v)===CS.strip(sw)?'cs_bv':null})}},
 cs_gj:{mat:'castella',ab:'Gj',nom:'G y J',ic:'Gj',curs:[6],
  teoria:['Delante de <b>e, i</b>, la g y la j pueden sonar igual (gente, jefe; gigante, jirafa). Estas reglas te ayudan:',...Object.values(GJ_N)],
  gen(lv){const[w,l,r]=pick(GJ.filter(x=>lv>0||!x[3])),sw=w.replace(new RegExp(l,'g'),l==='g'?'j':'g');
   return CS.ex(`Escriu la paraula completa (<b>g</b> o <b>j</b>):<br><b lang="es">${CS.gapw(w,l)}</b>`,[w],{label:'Paraula',hints:[GJ_N[r],'Fíjate en cómo acaba la palabra o en su infinitivo.'],steps:[GJ_N[r],`Se escribe: <b>${w}</b>.`],err:v=>v===sw||CS.strip(v)===CS.strip(sw)?'cs_gj':null})}},
 cs_h:{mat:'castella',ab:'Hh',nom:'La H',ic:'Hh',curs:[6],
  teoria:['La <b>h</b> no suena, por eso hay que aprender cuándo se escribe:',...Object.values(H_N).slice(0,5),
   `<b>¡No las confundas!</b><table class="mini"><tr><td><b>haber</b> (verbo) / <b>a ver</b> (vamos a mirar)</td><td>Puede haber tormenta. · A ver qué pasa.</td></tr><tr><td><b>hecho</b> (hacer) / <b>echo</b> (echar)</td><td>He hecho los deberes. · Echo sal.</td></tr><tr><td><b>hay</b> (haber) / <b>ahí</b> (lugar) / <b>¡ay!</b></td><td>Hay pan. · Está ahí. · ¡Ay, qué daño!</td></tr><tr><td><b>ha</b> (haber) / <b>a</b> (preposición)</td><td>Ha venido. · Voy a casa.</td></tr><tr><td><b>hola</b> / <b>ola</b> · <b>hasta</b> / <b>asta</b> · <b>hierba</b> / <b>hierva</b></td><td></td></tr></table>`,
   'Recuerda: <b>echar</b> no lleva h. «Hechar» es una falta muy frecuente.'],
  gen(lv){if(Math.random()<.5){const[f,a,op,ex]=pick(HH);
    return CS.ex(`Completa la frase:<br><i lang="es">${f.replace('___',CS.gap)}</i> <span class="muted">(${op})</span>`,[a],{label:'Paraula o paraules',hints:['Prueba a cambiar la palabra: si es un verbo, cámbiala de tiempo (ha ido → había ido; echo → eché).','Fíjate en el significado de cada opción.'],steps:[ex,`Respuesta: <b>${a}</b>.`],
     err:v=>{const o=op.split(' / ').map(x=>x.replace(/[¡!]/g,''));if(/haber|a ver/.test(op)&&o.includes(v))return'cs_haber_aver';if(/hecho/.test(op)&&(o.includes(v)||v==='hechar'||v==='hecho'))return'cs_hecho_echo';return o.includes(v)?'cs_h_homofono':null}})}
   const[w,r]=pick(HW.filter(x=>lv>0||!x[2])),s=w.replace(/(^|[^c])h/g,'$1');
   return CS.ex(`Escriu correctament aquesta paraula (afegeix la <b>h</b> on calgui, si en porta):<br><b lang="es">${s}</b>`,[w],{label:'Paraula',hints:[r==='no'?'Piensa en la regla de hie-, hue-, hum-... ¿Esta palabra empieza así?':H_N[r],'¿Hay alguna palabra de la misma familia que te ayude?'],steps:[H_N[r],`Se escribe: <b>${w}</b>.`],
    err:v=>{if(w==='echar'&&v==='hechar')return'cs_hechar';if(CS.strip(v.replace(/(^|[^c])h/g,'$1'))!==CS.strip(s))return null;return /(^|[^c])h/.test(w)?'cs_h_falta':'cs_h_sobra'}})}},
 cs_lly:{mat:'castella',ab:'Ly',nom:'LL e Y',ic:'Ly',curs:[6],
  teoria:['En muchas zonas la <b>ll</b> y la <b>y</b> suenan igual (yeísmo). Por eso hay que saber las reglas:',...Object.values(LY_N).slice(0,4),'<b>Homófonas:</b> cayó (caer) / calló (callar), valla (cerca) / vaya (ir), haya (haber) / halla (hallar).'],
  gen(lv){if(lv>0&&Math.random()<.35){const[f,a,o,ex]=pick(LYH);
    return CS.ex(`Completa la frase:<br><i lang="es">${f.replace('___',CS.gap)}</i> <span class="muted">(${[a,o].sort().join(' / ')})</span>`,[a],{label:'Paraula',hints:['Las dos suenan igual: piensa en su infinitivo (caer o callar, ir o vallar...).'],steps:[ex,`Respuesta: <b>${a}</b>.`],err:v=>v===o?'cs_lly':null})}
   const[w,l,r]=pick(LY.filter(x=>lv>0||!x[3])),sw=w.split(l).join(l==='ll'?'y':'ll');
   return CS.ex(`Escriu la paraula completa (<b>ll</b> o <b>y</b>):<br><b lang="es">${CS.gapw(w,l)}</b>`,[w],{label:'Paraula',hints:[LY_N[r],'Piensa en palabras de su familia o en su infinitivo.'],steps:[LY_N[r],`Se escribe: <b>${w}</b>.`],err:v=>v===sw||CS.strip(v)===CS.strip(sw)?'cs_lly':null})}},
 cs_x:{mat:'castella',ab:'Xs',nom:'X, S y CC',ic:'Xs',curs:[6],
  teoria:['<b>X o S</b>',XS_N.expl,XS_N.extra,XS_N.es,'Otras palabras con x hay que memorizarlas: examen, éxito, taxi, exacto, texto, próximo.','<b>CC o C</b>',XS_N.cc,XS_N.c],
  gen(lv){const[w,l,r]=pick(XS.filter(x=>lv>0||!x[3])),i=l[0]==='c'?w.lastIndexOf(l+'ión'):w.indexOf(l),shown=w.slice(0,i)+'▢'+w.slice(i+l.length),opt=l==='x'||l==='s'?'x o s':'cc o c',
    sw=w.slice(0,i)+({x:'s',s:'x',cc:'c',c:'cc'})[l]+w.slice(i+l.length);
   return CS.ex(`Escriu la paraula completa (<b>${opt}</b>):<br><b lang="es">${shown.replace('▢',CS.box)}</b>`,[w],{label:'Paraula',hints:[XS_N[r],l.length===2||l==='c'?'Busca una palabra de la familia: ¿tiene -ct-?':'Fíjate en la letra que viene después.'],steps:[XS_N[r],`Se escribe: <b>${w}</b>.`],err:v=>v===sw||CS.strip(v)===CS.strip(sw)?(l==='x'||l==='s'?'cs_xs':'cs_cc'):null})}},
 cs_puntuacion:{mat:'castella',ab:'Pu',nom:'Los signos de puntuación',ic:'Pu',curs:[6],
  teoria:['Los signos de puntuación ayudan a leer y a entender los textos:',
   `<table class="mini"><tr><td><b>,</b> coma</td><td>enumeraciones, vocativos (Luis, ven), aclaraciones</td></tr><tr><td><b>.</b> punto</td><td>final de oración (y seguido, y aparte, final)</td></tr><tr><td><b>;</b> punto y coma</td><td>separa oraciones relacionadas que ya llevan comas</td></tr><tr><td><b>:</b> dos puntos</td><td>antes de una enumeración, de las palabras de alguien y después del saludo de una carta</td></tr><tr><td><b>...</b> puntos suspensivos</td><td>enumeración incompleta, duda, suspense</td></tr><tr><td><b>¿?</b> <b>¡!</b></td><td>preguntas y exclamaciones: en castellano se abren y se cierran</td></tr><tr><td><b>—</b> raya</td><td>en los diálogos, antes de lo que dice cada personaje</td></tr><tr><td><b>« »</b> comillas</td><td>palabras exactas de alguien, refranes, títulos</td></tr></table>`,
   '<b>¡Ojo!</b> En catalán no se usa el signo de apertura (¿ ¡). En castellano es obligatorio: <b>¿</b>Qué hora es<b>?</b>'],
  gen(lv){const[f,a,ex]=pick(PUN.filter(x=>lv>0||!x[3]));
   return CS.ex(`Quin signe de puntuació va a la casella ${CS.box}? Escriu-ne el nom.<br><span lang="es" style="font-size:20px">${f.replace(/▢/g,CS.box)}</span>`,A(a),{loose:true,label:'Nom del signe',hints:['Lee la frase en voz alta: ¿hay una pausa breve, una enumeración, una pregunta, alguien que habla...?',`Empieza por «${a[0].toUpperCase()}».`],steps:[ex,`Respuesta: <b>${A(a)[0]}</b>.`],
    err:v=>PUN_NAMES.some(n=>fold(n)===fold(v))?'cs_puntuacion':null})}}
});

Object.assign(ERR,{
 cs_hiato:{kid:'Compte amb el diftong i el hiat: si les dues vocals van en síl·labes diferents, és un hiat.',par:'Castellà: confon diftongs i hiats'},
 cs_diacritico:{kid:'Les dues paraules existeixen, però no volen dir el mateix. Mira quina funció té la paraula a la frase (pronom, possessiu, verb...).',par:'Castellà: errors amb la tilde diacrítica (tú / tu, él / el, sí / si...)'},
 cs_interrogativo:{kid:'Pensa si la frase pregunta o exclama: llavors porta tilde. «Porque» explica la causa; «por qué» pregunta.',par:'Castellà: confon porque / por qué / porqué i els interrogatius sense tilde'},
 cs_bv:{kid:'Has confós la b i la v. Repassa la norma i pensa en paraules de la mateixa família.',par:'Castellà: confon b i v'},
 cs_gj:{kid:'Has confós la g i la j. Mira com acaba la paraula (-aje, -ger, -gía...).',par:'Castellà: confon g i j'},
 cs_haber_aver:{kid:'Compte! «Haber» és un verb (pot haver-hi); «a ver» vol dir «anem a mirar».',par:'Castellà: confon «haber» i «a ver»'},
 cs_hecho_echo:{kid:'«Hecho» ve de «hacer» (porta h); «echo» ve de «echar» (no en porta).',par:'Castellà: confon «hecho» i «echo» o escriu «hechar»'},
 cs_hechar:{kid:'«Echar» no porta h! És una falta molt freqüent: «hecho» sí que en porta, perquè ve de «hacer».',par:'Castellà: escriu «hechar» amb h'},
 cs_h_homofono:{kid:'Aquestes paraules sonen igual però no volen dir el mateix. Mira el significat de cada una.',par:'Castellà: confon homòfons amb h i sense (hay / ahí / ay, a / ha, ola / hola...)'},
 cs_h_falta:{kid:'Falta la h! Repassa la norma (hie-, hue-, hum-, verbs com haber o hacer...).',par:'Castellà: oblida la h'},
 cs_h_sobra:{kid:'Aquesta paraula no porta h.',par:'Castellà: posa h on no en va'},
 cs_lly:{kid:'Has confós la ll i la y. Repassa la norma (-illo, -llar, huyó, rey...).',par:'Castellà: confon ll i y'},
 cs_xs:{kid:'Has confós la x i la s. Recorda: ex- davant pl i pr (explicar); es- davant les altres consonants (espalda).',par:'Castellà: confon x i s'},
 cs_cc:{kid:'Pensa en la família de la paraula: si té -ct- (acto, director), s\'escriu -cción.',par:'Castellà: confon -cción i -ción'},
 cs_puntuacion:{kid:'És un signe de puntuació, però no el que va aquí. Llegeix la frase en veu alta i mira la taula de la teoria.',par:'Castellà: confon els signes de puntuació'}
});
})();
