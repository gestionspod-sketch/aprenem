/* Aprenem - contingut de LENGUA CASTELLANA Y LITERATURA (6è de Primària)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   La interfície (enunciats, etiquetes, avisos) és en català; el contingut (teoria, exemples, frases, pistes i
   passos) és en castellà. Les respostes s'escriuen sempre: no hi ha opcions per clicar.
   El temari de Castellà està repartit en aquests arxius (s'han de carregar en aquest ordre):
     castella.js              base: utilitats (CS), conjugació dels verbs, verbs irregulars, errors típics comuns,
                              material (tabla de conjugación) i el tema «Las lenguas de España»
     castella-ortografia.js   acentuación, diptongos e hiatos, tilde diacrítica, interrogativos (porque / por qué...),
                              b / v, g / j, h (haber / a ver, hecho / echo...), ll / y, x / s y cc / c, puntuación
     castella-gramatica.js    categorías gramaticales, sustantivo (género y número), adjetivo (grados), determinantes y
                              pronombres, conjugación regular, tiempos y modos, verbos irregulares, adverbios y nexos,
                              sujeto y predicado (sujeto omitido), predicado nominal y verbal, complementos (CD, CI, CC,
                              lo / la / le), clases de oraciones
     castella-lexico.js       sinónimos y antónimos, polisemia, familias de palabras, prefijos y sufijos, compuestas,
                              campos semánticos, frases hechas y refranes, préstamos, catalanismos e incorrecciones
     castella-literatura.js   géneros literarios, recursos literarios, métrica y rima, comprensión lectora
     castella-unitats.js      les 14 unitats, en l'ordre habitual del llibre de 6è
   FONTS
   - Decret 31/2022, d'1 d'agost, pel qual s'estableix el currículum de l'Educació Primària a les Illes Balears
     (BOIB extr. núm. 101, 2-8-2022), àrea de Lengua Castellana y Literatura, saberes básicos del 3r ciclo:
     A. Las lenguas y sus hablantes (biografía lingüística, diversidad lingüística de España y del entorno, lenguas
     en contacto e interferencias); B. Comunicación (géneros discursivos, comprensión e interpretación de textos);
     C. Educación literaria (lectura de obras, géneros, recursos literarios básicos, verso: medida y rima);
     D. Reflexión sobre la lengua (categorías gramaticales; el verbo: persona, número, tiempo, modo, conjugación
     regular e irregular; el sujeto y el predicado, concordancia; complementos; modalidades oracionales;
     procedimientos de formación de palabras; relaciones semánticas; normas ortográficas y de acentuación, signos
     de puntuación). Currículums per àrees de la Conselleria: https://www.caib.es/sites/lomloe/ca/curraculums_per_arees/
     Decret 41/2025 (modificació dels criteris d'avaluació de Primària): no canvia els sabers d'aquest temari.
   - Real Decreto 157/2022 (enseñanzas mínimas de Primaria), anexo de Lengua Castellana y Literatura.
   - Estructura habitual dels llibres de 6è (Santillana «Saber Hacer» / «Construyendo mundos», Anaya «Aprender es
     crecer», SM «Revuela»): cada unidad tiene vocabulario, gramática y ortografía; la gramática va de las clases de
     palabras (sustantivo, adjetivo, determinantes, pronombres) al verbo (conjugación, tiempos, modos, irregulares),
     las palabras invariables (adverbio, preposición, conjunción) y la oración (sujeto, predicado, complementos,
     clases de oraciones); la literatura (géneros, recursos, métrica) cierra el curso.
   - Real Academia Española y ASALE: Ortografía de la lengua española (2010), Nueva gramática (2009-2011), Diccionario
     de la lengua española y Diccionario panhispánico de dudas (formas correctas, leísmo y laísmo, dequeísmo,
     extranjerismos y su adaptación). Interferencias del catalán: Libro de estilo de la RAE (2018) y guías de las
     universidades de las Illes Balears y de Cataluña sobre catalanismos frecuentes.
   Tots els textos, frases i lectures són originals. */

/* ---------- utilitats comunes (les fan servir tots els arxius de Castellà) ---------- */
const CS={
 A:s=>s.split('|'),
 first:s=>s.split('|')[0],
 strip:s=>s.normalize('NFD').replace(/́/g,'').normalize('NFC'),          // treu les tildes (deixa ñ i ü)
 mark:s=>s.replace(/\*(.+?)\*/g,'<b><u>$1</u></b>'),                              // «el *gato*» → paraula destacada
 star:s=>(s.match(/\*(.+?)\*/)||[])[1]||'',
 box:'<b style="color:var(--s-castella)">▢</b>',                                  // forat d'una lletra o d'un signe
 gap:'<b style="color:var(--s-castella)">___</b>',
 cap:s=>s[0].toUpperCase()+s.slice(1),
 es:s=>`<i lang="es">${s}</i>`,
 // la resposta v (ja normalitzada per l'app) coincideix amb alguna de les acceptades?
 ok(ans,v,loose){return loose?ans.some(a=>fold(a)===fold(v)):ans.some(a=>norm(a)===v)},
 // exercici d'una resposta escrita. o: {label, loose, hints, steps, err(v), fig}
 ex(text,ans,o={}){return{text,fields:[{label:o.label||'Resposta',txt:o.loose?ans:ans.map(a=>norm(a)),loose:!!o.loose,wide:true}],vis:null,fig:o.fig,
  hints:o.hints||[],steps:o.steps||[`Respuesta: <b>${ans[0]}</b>.`],err:o.err?(v=>CS.ok(ans,v[0],!!o.loose)?null:o.err(v[0])):undefined}},
 // escriu la paraula amb un forat: gapw('cabeza','z') → cabe▢a (totes les aparicions)
 gapw(w,seg){return w.split(seg).join('▢').replace(/▢/g,CS.box)},
 // error d'accent: mateixa paraula sense tenir en compte les tildes
 tilde(correct,v){if(v===norm(correct))return null;if(CS.strip(v)!==CS.strip(norm(correct)))return null;
  return CS.strip(correct)===correct?'cs_tilde_sobra':CS.strip(v)===v?'cs_tilde_falta':'cs_tilde_lugar'}
};

/* ---------- el verb ---------- */
CS.PERS=['yo','tú','él / ella','nosotros / nosotras','vosotros / vosotras','ellos / ellas'];
CS.T={pres:'presente',imp:'pretérito imperfecto',pps:'pretérito perfecto simple',fut:'futuro simple',cond:'condicional simple',
 ppc:'pretérito perfecto compuesto',plus:'pretérito pluscuamperfecto',futc:'futuro compuesto',subj:'presente de subjuntivo'};
CS.T_ALT={pres:['presente','presente de indicativo'],imp:['pretérito imperfecto','imperfecto','pretérito imperfecto de indicativo','copretérito'],
 pps:['pretérito perfecto simple','perfecto simple','pretérito indefinido','indefinido','pretérito perfecto simple de indicativo'],
 fut:['futuro simple','futuro','futuro imperfecto','futuro de indicativo'],cond:['condicional simple','condicional','pospretérito'],
 ppc:['pretérito perfecto compuesto','perfecto compuesto','pretérito perfecto','antepresente'],plus:['pretérito pluscuamperfecto','pluscuamperfecto','antecopretérito'],
 futc:['futuro compuesto','futuro perfecto','antefuturo'],subj:['presente de subjuntivo','presente subjuntivo','subjuntivo presente','presente del subjuntivo']};
CS.SIMPLES=['pres','imp','pps','fut','cond'];CS.COMPUESTOS=['ppc','plus','futc'];
CS.HAB={ppc:['he','has','ha','hemos','habéis','han'],plus:['había','habías','había','habíamos','habíais','habían'],futc:['habré','habrás','habrá','habremos','habréis','habrán']};
const CS_END={ar:{pres:['o','as','a','amos','áis','an'],imp:['aba','abas','aba','ábamos','abais','aban'],pps:['é','aste','ó','amos','asteis','aron'],subj:['e','es','e','emos','éis','en']},
 er:{pres:['o','es','e','emos','éis','en'],imp:['ía','ías','ía','íamos','íais','ían'],pps:['í','iste','ió','imos','isteis','ieron'],subj:['a','as','a','amos','áis','an']},
 ir:{pres:['o','es','e','imos','ís','en'],imp:['ía','ías','ía','íamos','íais','ían'],pps:['í','iste','ió','imos','isteis','ieron'],subj:['a','as','a','amos','áis','an']}};
CS.conjOf=inf=>CS.strip(inf).slice(-2);
CS.part=inf=>inf.slice(0,-2)+(CS.conjOf(inf)==='ar'?'ado':'ido');
CS.ger=inf=>inf.slice(0,-2)+(CS.conjOf(inf)==='ar'?'ando':'iendo');
// Conjuga un verb REGULAR (també serveix per saber com seria «regularitzat» un verb irregular)
CS.conj=(inf,t)=>{const c=CS.conjOf(inf),st=inf.slice(0,-2),base=CS.strip(inf);
 if(CS_END[c][t])return CS_END[c][t].map(e=>st+e);
 if(t==='fut')return['é','ás','á','emos','éis','án'].map(e=>base+e);
 if(t==='cond')return['ía','ías','ía','íamos','íais','ían'].map(e=>base+e);
 return CS.HAB[t].map(h=>h+' '+CS.part(inf))};
// verbs regulars sense canvis ortogràfics: [infinitiu, traducció]
CS.VERBS=[['cantar','cantar'],['saltar','saltar'],['bailar','ballar'],['mirar','mirar'],['nadar','nedar'],['pintar','pintar'],['escuchar','escoltar'],['ayudar','ajudar'],['trabajar','fer feina'],['lavar','rentar'],['estudiar','estudiar'],['caminar','caminar'],
 ['comer','menjar'],['beber','beure'],['temer','témer'],['correr','córrer'],['aprender','aprendre'],['vender','vendre'],['barrer','escombrar'],['meter','ficar'],
 ['vivir','viure'],['partir','partir'],['subir','pujar'],['recibir','rebre'],['decidir','decidir'],['unir','unir'],['cumplir','complir'],['permitir','permetre'],['escupir','escopir']];
CS.MODEL={ar:'1.ª conjugación (-ar), como cantar',er:'2.ª conjugación (-er), como temer',ir:'3.ª conjugación (-ir), como vivir'};
// verbs irregulars: [infinitiu, present (yo), perfecte simple (yo), perfecte simple (él), futur (yo), participi, traducció]
CS.IRR=[['ser','soy','fui','fue','seré','sido','ser'],['ir','voy','fui','fue','iré','ido','anar'],['estar','estoy','estuve','estuvo','estaré','estado','estar'],['tener','tengo','tuve','tuvo','tendré','tenido','tenir'],
 ['hacer','hago','hice','hizo','haré','hecho','fer'],['decir','digo','dije','dijo','diré','dicho','dir'],['poner','pongo','puse','puso','pondré','puesto','posar'],['venir','vengo','vine','vino','vendré','venido','venir'],
 ['querer','quiero','quise','quiso','querré','querido','voler'],['poder','puedo','pude','pudo','podré','podido','poder'],['saber','sé','supe','supo','sabré','sabido','saber'],['traer','traigo','traje','trajo','traeré','traído','dur'],
 ['conducir','conduzco','conduje','condujo','conduciré','conducido','conduir'],['andar','ando','anduve','anduvo','andaré','andado','caminar'],['caber','quepo','cupe','cupo','cabré','cabido','cabre'],['dar','doy','di','dio','daré','dado','donar'],
 ['ver','veo','vi','vio','veré','visto','veure'],['oír','oigo','oí','oyó','oiré','oído','sentir'],['caer','caigo','caí','cayó','caeré','caído','caure'],['salir','salgo','salí','salió','saldré','salido','sortir'],
 ['pedir','pido','pedí','pidió','pediré','pedido','demanar'],['dormir','duermo','dormí','durmió','dormiré','dormido','dormir'],['pensar','pienso','pensé','pensó','pensaré','pensado','pensar'],['volver','vuelvo','volví','volvió','volveré','vuelto','tornar'],
 ['escribir','escribo','escribí','escribió','escribiré','escrito','escriure'],['romper','rompo','rompí','rompió','romperé','roto','rompre'],['abrir','abro','abrí','abrió','abriré','abierto','obrir'],['morir','muero','morí','murió','moriré','muerto','morir'],
 ['jugar','juego','jugué','jugó','jugaré','jugado','jugar'],['haber','he','hube','hubo','habré','habido','haver'],['satisfacer','satisfago','satisfice','satisfizo','satisfaré','satisfecho','satisfer']];

/* ---------- errors típics comuns ---------- */
Object.assign(ERR,{
 cs_tilde_falta:{kid:'Falta la tilde! Mira si és aguda, plana (llana) o esdrúixola i com acaba.',par:'Castellà: oblida posar la tilde'},
 cs_tilde_sobra:{kid:'Aquesta paraula no porta tilde. Repassa les regles d\'accentuació del castellà.',par:'Castellà: posa tildes on no en van'},
 cs_tilde_lugar:{kid:'La tilde no és a la síl·laba bona. Digues la paraula en veu alta: quina síl·laba sona més forta?',par:'Castellà: posa la tilde a una síl·laba equivocada'}
});

/* ---------- tema: las lenguas de España ---------- */
// [pregunta, respostes acceptades, explicació, nivell]
const CS_LENG=[['¿Qué lengua es oficial en toda España?','castellano|español|el castellano|el español','El castellano o español es la lengua oficial de todo el Estado.'],
 ['Además del castellano, ¿qué otra lengua es oficial en las Illes Balears?','catalán|el catalán|catala','En las Illes Balears son oficiales el catalán y el castellano.'],
 ['Además del castellano, ¿qué lengua es oficial en Galicia?','gallego|el gallego','En Galicia se habla gallego.'],
 ['Además del castellano, ¿qué lengua es oficial en el País Vasco?','euskera|vasco|euskara|el euskera|el vasco','En el País Vasco y en parte de Navarra se habla euskera (vasco).'],
 ['¿Cómo se llama el catalán en la Comunitat Valenciana?','valenciano|el valenciano','En la Comunitat Valenciana el catalán recibe el nombre de valenciano.'],
 ['¿De qué lengua antigua vienen el castellano, el catalán y el gallego?','latín|el latín','Vienen del latín, la lengua de los romanos.'],
 ['¿Cómo se llaman las lenguas que vienen del latín?','románicas|romances|lenguas románicas|lenguas romances|neolatinas','Se llaman lenguas románicas o romances: castellano, catalán, gallego, francés, italiano, portugués...'],
 ['¿Qué lengua de España NO viene del latín y es mucho más antigua?','euskera|vasco|euskara|el euskera','El euskera es anterior a la llegada de los romanos.',1],
 ['¿Cómo se llama a una persona que habla dos lenguas?','bilingüe|bilingue','Una persona bilingüe habla dos lenguas.'],
 ['¿Cómo se llama a una persona que habla muchas lenguas?','plurilingüe|políglota|multilingüe|plurilingue|poliglota','Una persona plurilingüe (o políglota) habla varias lenguas.'],
 ['¿Cómo se llama la manera de hablar una lengua propia de una zona, como el andaluz o el canario?','dialecto|variedad dialectal|variedad|un dialecto','Son variedades (dialectos) del castellano.',1],
 ['¿Qué registro usamos para hablar con los amigos: formal o informal?','informal|coloquial|registro informal|registro coloquial','Con los amigos usamos un registro informal o coloquial.'],
 ['¿Qué registro usamos para escribir una carta al alcalde: formal o informal?','formal|registro formal|culto','Con personas que no conocemos o con autoridades, usamos el registro formal.'],
 ['Cuando usamos una palabra de otra lengua sin adaptarla (por ejemplo, decir «plegar» en castellano), cometemos una...','interferencia|interferencias|un catalanismo|catalanismo|barbarismo','Las interferencias son errores que se producen al mezclar dos lenguas. Si vienen del catalán, se llaman catalanismos.',1],
 ['¿Hablar con acento andaluz, canario o mallorquín es hablar peor?','no|no es peor|no, es igual de correcto','Todos los acentos y variedades son igual de válidos. Burlarse de cómo habla alguien es un prejuicio lingüístico.'],
 ['¿Cuál es la lengua de signos que usan muchas personas sordas en España? Escribe sus siglas.','lse|lengua de signos española|lengua de signos','La lengua de signos española (LSE) también es una lengua reconocida.',1]];
Object.assign(SK,{
 cs_lenguas:{mat:'castella',ab:'Le',nom:'Las lenguas de España',ic:'Le',curs:[6],
  teoria:['En España se hablan varias lenguas. El <b>castellano</b> o <b>español</b> es oficial en todo el Estado. Además, en algunas comunidades hay otras lenguas oficiales: el <b>catalán</b> (Cataluña, Illes Balears y, con el nombre de <b>valenciano</b>, la Comunitat Valenciana), el <b>gallego</b> (Galicia), el <b>euskera</b> o vasco (País Vasco y Navarra) y el <b>aranés</b> (Val d\'Aran).',
   'El castellano, el catalán y el gallego son <b>lenguas románicas</b>: vienen del <b>latín</b>. El euskera es mucho más antiguo y no viene del latín.',
   'Cada lengua tiene <b>dialectos</b> o variedades según la zona: andaluz, canario... (del castellano); mallorquín, menorquín, ibicenco... (del catalán).',
   'Hablamos de manera distinta según la situación: con amigos usamos el registro <b>informal</b> (coloquial); en un examen o con una autoridad, el registro <b>formal</b>.',
   'Todas las lenguas y todos los acentos son igual de valiosos: reírse de cómo habla alguien es un <b>prejuicio lingüístico</b>. También procuramos usar un <b>lenguaje no discriminatorio</b>, que no excluya ni ofenda a nadie (por ejemplo, decir «el alumnado» o «los niños y las niñas»).',
   'Cuando dos lenguas conviven, a veces se mezclan sin querer: son las <b>interferencias</b>. En castellano, las que vienen del catalán se llaman <b>catalanismos</b> (por ejemplo, «plegar» en lugar de «salir del trabajo»).'],
  gen(lv){const[q,a,ex]=pick(CS_LENG.filter(x=>lv>0||!x[3]));
   return CS.ex(`Respon la pregunta:<br><i lang="es">${q}</i>`,CS.A(a),{loose:true,label:'Resposta',hints:['Relee la teoría: lenguas oficiales, origen latino, dialectos y registros.',`Empieza por «${CS.first(a)[0].toUpperCase()}».`],steps:[ex,`Respuesta: <b>${CS.first(a)}</b>.`]})}}
});

/* ---------- material: tabla de conjugación ---------- */
MATERIAL.castella=[{obre:'csConjTable()',ic:'list',nom:'Tabla de conjugación',desc:'Verbos modelo (cantar, temer, vivir) y verbos irregulares'}];
function csConjTable(model='cantar'){endSession();const tabs=['cantar','temer','vivir','irregulares'];
 const head=`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-castella)">Material · Castellà</div><h2>Tabla de conjugación</h2><p class="muted">Modo indicativo y presente de subjuntivo. Toca un verbo.</p></div><button class="ghost" onclick="subject('castella')">← Tornar</button></div>
 <div class="tabs">${tabs.map(v=>`<button data-v="${v}" class="${v===model?'on':''}">${v}</button>`).join('')}</div>`;
 let body;
 if(model==='irregulares')body=`<div class="card"><p style="margin-top:0">Formas que más cuestan. Fíjate sobre todo en el <b>pretérito perfecto simple</b> (anduve, conduje, dije) y en el <b>participio</b> (hecho, dicho, escrito).</p><div class="tablewrap"><table class="vt"><tr><th>Infinitivo</th><th>Presente (yo)</th><th>Pret. perfecto simple (yo)</th><th>Pret. perfecto simple (él)</th><th>Futuro (yo)</th><th>Participio</th><th class="muted">Català</th></tr>
  ${CS.IRR.map(r=>`<tr><td><b>${r[0]}</b></td>${r.slice(1,6).map(f=>`<td>${f}</td>`).join('')}<td class="muted">${r[6]}</td></tr>`).join('')}</table></div></div>`;
 else{const c=CS.conjOf(model);body=`<div class="card"><p style="margin-top:0"><b>${model}</b> · ${CS.MODEL[c]} · gerundio: <b>${CS.ger(model)}</b> · participio: <b>${CS.part(model)}</b></p>
  <h3>Tiempos simples</h3><div class="tablewrap"><table class="vt"><tr><th>Persona</th>${[...CS.SIMPLES,'subj'].map(t=>`<th>${CS.T[t]}</th>`).join('')}</tr>
  ${CS.PERS.map((p,i)=>`<tr><td><b>${p}</b></td>${[...CS.SIMPLES,'subj'].map(t=>`<td>${CS.conj(model,t)[i]}</td>`).join('')}</tr>`).join('')}</table></div>
  <h3>Tiempos compuestos (haber + participio)</h3><div class="tablewrap"><table class="vt"><tr><th>Persona</th>${CS.COMPUESTOS.map(t=>`<th>${CS.T[t]}</th>`).join('')}</tr>
  ${CS.PERS.map((p,i)=>`<tr><td><b>${p}</b></td>${CS.COMPUESTOS.map(t=>`<td>${CS.conj(model,t)[i]}</td>`).join('')}</tr>`).join('')}</table></div></div>`}
 app(head+body+`<div class="card"><h3>Practica</h3><div class="row"><button data-p="cs_conjugar">Conjugar verbos</button><button class="sec" data-p="cs_tiempos">Reconocer el tiempo</button><button class="sec" data-p="cs_irregulares">Verbos irregulares</button></div></div>`);
 document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>csConjTable(b.dataset.v));
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15))}
