/* Aprenem - contingut de MÚSICA: bloc «El meu instrument» (ensenyaments elementals)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Es carrega després de contingut/musica-lm.js (usa lmStaff, lmNoteTxt, lmF, lmCfg...).

   Per a cada instrument: una làmina SVG interactiva amb les parts (amb noms / sense noms, toc per veure la funció),
   una mica de teoria (com produeix el so, com es cuida) i un tema d'exercicis verificables (quina part és el número N,
   quina part fa..., família, i exercicis propis: digitacions de la flauta, cordes a l'aire del violí i la guitarra,
   transport del clarinet en si♭, mecanisme del piano). Tot és genèric: cada infant tria el seu instrument a la targeta
   «Nivell de Música» (es guarda només en aquell aparell).

   Fonts: programacions didàctiques de flauta travessera, piano, violí, clarinet i guitarra de grau elemental de
   conservatoris públics (p. ex. CPM d'Altea, guies docents de conservatoris de Màlaga i Múrcia, 2024-2026) i l'ordre
   habitual dels mètodes d'iniciació (postura, respiració i emissió; primeres notes sol-la-si a la flauta; cordes a
   l'aire al violí i a la guitarra...). Del mètode de flauta «Flautissimo» no s'ha trobat l'índice publicat: els
   continguts segueixen la seqüència general de les programacions. Les digitacions són les bàsiques del sistema Boehm. */

/* ===================== dades dels instruments ===================== */
// parts: [id, nom, sinònims 'a|b', x, y (punt), lx, ly (etiqueta), funció]
const IM_C='#1F2A44',IM_MET='#CBD5E1',IM_FUS='#B7793E',IM_FOS='#7C4A1E';
const IM={
 flauta:{nom:'Flauta travessera',art:'la flauta travessera',de:'de la flauta travessera',sub:'fusta',vb:'0 0 640 210',
  teoria:['La <b>flauta travessera</b> és de metall, però és de la família de <b>vent fusta</b>: el so es produeix quan l\'aire xoca contra la vora del <b>forat de l\'embocadura</b> (un bisell), sense canya.','Té tres parts que s\'encaixen: el <b>cap</b> (amb l\'embocadura i la corona), el <b>cos</b> (amb la majoria de claus) i el <b>peu</b>. La flauta es toca de costat, cap a la dreta.','Amb les <b>claus</b> tapam forats i allargam o escurçam el tub: com més llarg, més greu. Per pujar una <b>octava</b> amb la mateixa digitació, s\'ha de bufar amb l\'aire més ràpid i els llavis més tancats.','Per començar: postura relaxada, respiració abdominal (diafragma) i emissió amb la síl·laba «tu». Després de tocar, s\'eixuga l\'interior amb la baqueta i un drap.'],
  parts:[['corona','Corona','corona|tap',18,104,40,48,'Tapa l\'extrem del cap. Dins hi ha un tap que ajuda a afinar.'],
   ['emb','Embocadura','embocadura|placa de l\'embocadura|placa|forat de l\'embocadura|bisell',100,93,120,30,'És la placa on es recolza el llavi de baix. L\'aire xoca contra la vora del forat i fa el so.'],
   ['cap','Cap','cap|capçal|cabeça|cap de la flauta',152,104,152,178,'La primera part de la flauta: té la corona i l\'embocadura. Movent-la una mica s\'afina l\'instrument.'],
   ['claus','Claus','claus|clau|claus del cos|tapes',300,104,300,30,'Es pitgen amb els dits per tapar els forats i canviar la longitud del tub (i, per tant, la nota).'],
   ['polze','Clau del polze','clau del polze|polze|clau de si|clau del si',240,118,238,198,'Es toca amb el polze de la mà esquerra, per davall de la flauta.'],
   ['cos','Cos','cos|cos de la flauta|cos central',470,104,450,178,'La part central i més llarga, on hi ha la majoria de claus.'],
   ['peu','Peu','peu|peu de la flauta',575,104,590,178,'La darrera part. Té les claus que toca el dit petit (el menovell) de la mà dreta per fer les notes més greus.']],
  draw(){let s=`<rect x="20" y="95" width="600" height="18" rx="4" fill="${IM_MET}" stroke="${IM_C}" stroke-width="1.5"/><rect x="10" y="92" width="14" height="24" rx="3" fill="#94A3B8" stroke="${IM_C}"/>
   <ellipse cx="100" cy="93" rx="24" ry="9" fill="#E2E8F0" stroke="${IM_C}" stroke-width="1.5"/><ellipse cx="100" cy="93" rx="8" ry="3.6" fill="${IM_C}"/>
   <rect x="187" y="93" width="7" height="22" fill="#94A3B8" stroke="${IM_C}"/><rect x="517" y="93" width="7" height="22" fill="#94A3B8" stroke="${IM_C}"/>
   <rect x="232" y="113" width="16" height="8" rx="2" fill="#E2E8F0" stroke="${IM_C}"/><path d="M220 104H460M535 104H610" stroke="#94A3B8" stroke-width="2"/>`;
   for(const x of[255,282,309,372,399,426])s+=`<circle cx="${x}" cy="104" r="8" fill="#E2E8F0" stroke="${IM_C}" stroke-width="1.5"/><circle cx="${x}" cy="104" r="2.6" fill="${IM_C}"/>`;
   s+=`<ellipse cx="333" cy="112" rx="6" ry="4" fill="#E2E8F0" stroke="${IM_C}"/><ellipse cx="452" cy="112" rx="7" ry="4" fill="#E2E8F0" stroke="${IM_C}"/>`;
   for(const x of[548,575,602])s+=`<circle cx="${x}" cy="104" r="7" fill="#E2E8F0" stroke="${IM_C}" stroke-width="1.5"/>`;return s}},
 piano:{nom:'Piano',art:'el piano',de:'del piano',sub:'percudida',vb:'0 0 600 310',
  teoria:['El <b>piano</b> és un instrument de <b>corda percudida</b>: en pitjar una tecla, un <b>martellet</b> colpeja les cordes. Té 88 tecles (52 blanques i 36 negres) i més de 200 cordes.','Quan pitges la tecla, l\'<b>apagador</b> s\'aixeca i deixa vibrar la corda; quan la deixes anar, l\'apagador torna a caure i el so s\'atura.','Té normalment tres <b>pedals</b>: el de la <b>dreta</b> (de ressonància) aixeca tots els apagadors i el so continua; el de l\'<b>esquerra</b> (una corda) fa el so més suau; el del <b>mig</b> (tonal) sosté només algunes notes.','El piano de <b>cua</b> té les cordes horitzontals i el <b>vertical</b>, verticals. Es llegeix en dos pentagrames: clau de sol (mà dreta) i clau de fa (mà esquerra).'],
  parts:[['teclat','Teclat','teclat|tecles',42,150,40,100,'El conjunt de 88 tecles blanques i negres.'],
   ['tapa','Tapa','tapa|tapa del piano|coberta',300,104,330,50,'Es pot obrir perquè el so surti amb més força cap al públic.'],
   ['faristol','Faristol','faristol|atril',96,131,110,70,'On es posa la partitura.'],
   ['caixa','Caixa','caixa|moble|caixa de ressonància|caixa del piano',300,172,470,178,'El moble de fusta. Dins hi ha l\'arpa de metall, les cordes i la taula harmònica, que amplifica el so.'],
   ['pedals','Pedals','pedals|pedal|pedalera',150,256,150,300,'Es pitgen amb els peus: el de la dreta allarga el so; el de l\'esquerra el fa més suau.'],
   ['potes','Potes','potes|pota|cames',505,240,560,290,'Aguanten el piano.'],
   ['tecla','Tecla (mecanisme)','tecla|palanca',260,268,248,298,'Quan la pitges, l\'altre extrem puja i empeny el martellet.'],
   ['martellet','Martellet','martellet|martell|macillo',330,236,330,206,'Està recobert de feltre. Colpeja la corda i torna enrere de seguida.'],
   ['corda','Corda','corda|cordes',420,222,450,206,'Vibra quan el martellet la colpeja. Les cordes greus són més llargues i gruixudes.'],
   ['apagador','Apagador','apagador|apagadors|smorzador',402,214,420,268,'Toca la corda i l\'atura. S\'aixeca quan pitges la tecla o el pedal de la dreta.']],
  draw(){return`<path d="M60 150L520 70L545 150Z" fill="#334155" stroke="${IM_C}" stroke-width="1.5"/><path d="M330 150L330 92" stroke="#94A3B8" stroke-width="3"/>
   <path d="M60 150H545Q560 150 560 165V190H60Z" fill="#1E293B" stroke="${IM_C}" stroke-width="1.5"/><rect x="18" y="146" width="48" height="12" fill="#fff" stroke="${IM_C}"/><rect x="22" y="142" width="40" height="5" fill="${IM_C}"/>
   <path d="M86 146L100 118L108 120L96 146Z" fill="#475569" stroke="${IM_C}"/><rect x="72" y="190" width="14" height="78" fill="#1E293B"/><rect x="498" y="190" width="14" height="78" fill="#1E293B"/>
   <rect x="144" y="190" width="12" height="58" fill="#1E293B"/><rect x="132" y="248" width="36" height="10" fill="#1E293B"/><path d="M138 258l-6 6M150 258v8M162 258l6 6" stroke="#D4A017" stroke-width="3"/>
   <rect x="200" y="204" width="260" height="88" fill="#F8FAFC" stroke="#94A3B8" stroke-dasharray="4 3"/><text x="206" y="218" font-size="11" fill="#64748B">dins el piano</text>
   <path d="M215 272L330 258" stroke="${IM_FOS}" stroke-width="7" stroke-linecap="round"/><rect x="210" y="270" width="40" height="8" fill="#fff" stroke="${IM_C}"/><path d="M300 262V242" stroke="${IM_FOS}" stroke-width="3"/>
   <ellipse cx="330" cy="236" rx="9" ry="6" fill="#E2E8F0" stroke="${IM_C}"/><path d="M330 242V262" stroke="${IM_FOS}" stroke-width="3"/><path d="M240 224H452" stroke="#64748B" stroke-width="2"/><rect x="395" y="210" width="14" height="12" fill="#475569"/>`}},
 violi:{nom:'Violí',art:'el violí',de:'del violí',sub:'fregada',vb:'0 0 600 260',
  teoria:['El <b>violí</b> és el més agut i petit de la família de <b>corda fregada</b>. Es toca amb un <b>arc</b> de crins de cavall untat amb <b>colofònia</b>, que fa vibrar les cordes.','Té 4 cordes afinades per quintes: <b>sol, re, la, mi</b> (de greu a agut). Es llegeix en clau de sol.','Les vibracions passen pel <b>pont</b> a la <b>caixa de ressonància</b>, que les amplifica; el so surt per les <b>efes</b>. Dins hi ha l\'<b>ànima</b>, un bastonet que uneix la tapa i el fons.','Amb els dits de la mà esquerra es premen les cordes contra el <b>diapasó</b> per fer notes diferents. També es poden pinçar les cordes amb el dit: <i>pizzicato</i>.'],
  parts:[['voluta','Voluta','voluta|cargol|caragol',52,130,40,70,'L\'extrem decoratiu en forma d\'espiral.'],
   ['clavilles','Clavilles','clavilles|clavilla|claviller',96,112,110,40,'Giren per tensar o destensar les cordes i afinar-les.'],
   ['mastil','Mànec','mànec|manec|mastil|màstil',190,130,190,200,'La part llarga on es recolza la mà esquerra.'],
   ['diapaso','Diapasó','diapasó|diapaso',300,130,260,40,'La fusta negra sota les cordes; s\'hi premen les cordes amb els dits.'],
   ['cordes','Cordes','cordes|corda',360,126,360,238,'Quatre cordes: sol, re, la, mi.'],
   ['pont','Pont','pont|cavallet',443,130,470,30,'Aguanta les cordes i passa la vibració a la caixa.'],
   ['efes','Efes','efes|efa|forats en f|obertures en f|oides',420,165,400,238,'Obertures en forma de f per on surt el so.'],
   ['cordal','Cordal','cordal|cordial',500,130,540,40,'On es lliguen les cordes per l\'extrem de baix.'],
   ['barbada','Barbada','barbada|mentonera',548,172,570,238,'On es recolza la barbeta per aguantar el violí.'],
   ['caixa','Caixa de ressonància','caixa de ressonància|caixa|cos|caixa de ressonancia',300,78,250,238,'El cos de fusta buit que amplifica el so.']],
  draw(){return`<path d="M240 130C240 70 280 55 320 65C350 72 360 85 380 85C400 85 410 70 450 60C520 45 560 80 560 130C560 180 520 215 450 200C410 190 400 175 380 175C360 175 350 188 320 195C280 205 240 190 240 130Z" fill="${IM_FUS}" stroke="${IM_FOS}" stroke-width="2.5"/>
   <rect x="110" y="121" width="140" height="18" fill="${IM_FUS}" stroke="${IM_FOS}"/><rect x="72" y="118" width="45" height="24" rx="4" fill="${IM_FUS}" stroke="${IM_FOS}"/><circle cx="54" cy="130" r="15" fill="${IM_FUS}" stroke="${IM_FOS}" stroke-width="2"/><path d="M54 130m-8 0a8 8 0 1 0 8-8a4 4 0 1 0 4 4" fill="none" stroke="${IM_FOS}" stroke-width="2"/>
   ${[82,96,110].map((x,i)=>`<rect x="${x-3}" y="${i%2?136:104}" width="7" height="20" rx="2" fill="#3B2412"/>`).join('')}<rect x="150" y="119" width="250" height="22" fill="#111827"/>
   <path d="M410 98c8-14 18-6 12 4s-4 22 8 14M410 162c8-14 18-6 12 4s-4 22 8 14" fill="none" stroke="#3B2412" stroke-width="3"/><path d="M470 118L535 124V136L470 142Z" fill="#111827"/><ellipse cx="548" cy="172" rx="14" ry="20" fill="#111827"/>
   <rect x="440" y="110" width="6" height="40" fill="#F5DEB3" stroke="${IM_FOS}"/>${[124,128,132,136].map(y=>`<path d="M100 ${y}H500" stroke="#E5E7EB" stroke-width="1.2"/>`).join('')}`}},
 clarinet:{nom:'Clarinet',art:'el clarinet',de:'del clarinet',sub:'fusta',vb:'0 0 640 200',
  teoria:['El <b>clarinet</b> és de <b>vent fusta</b> i té <b>canya simple</b>: una làmina de canya subjectada al <b>bec</b> amb l\'<b>abraçadora</b>, que vibra quan bufam.','Té cinc peces: <b>bec</b>, <b>barrilet</b>, <b>cos superior</b> (mà esquerra), <b>cos inferior</b> (mà dreta) i <b>campana</b>. Sol ser de fusta de banús.','El clarinet més habitual és en <b>si♭</b>: és un instrument <b>transpositor</b>. Quan llegeix un do, sona un si♭: tot sona una <b>2a major més greu</b> del que està escrit.','La <b>clau de registre</b> (del polze) fa pujar una 12a (octava i quinta), no una octava com a la flauta. Les canyes s\'han de guardar netes i seques.'],
  parts:[['bec','Bec','bec|boquilla|embocadura',30,99,40,40,'On es posa la boca. La canya hi va subjectada per davall.'],
   ['canya','Canya','canya|llengüeta|lengüeta',48,114,30,170,'La làmina que vibra quan hi bufam (canya simple).'],
   ['abracadora','Abraçadora','abraçadora|abrazadera|lligadura',58,102,110,170,'Subjecta la canya al bec.'],
   ['barrilet','Barrilet','barrilet|barril',100,102,105,40,'La peça curta entre el bec i el cos. Estirant-la una mica s\'afina.'],
   ['superior','Cos superior','cos superior|cos de dalt|part superior',225,102,220,40,'Es toca amb la mà esquerra. Darrere té la clau de registre i el forat del polze.'],
   ['inferior','Cos inferior','cos inferior|cos de baix|part inferior',425,102,420,40,'Es toca amb la mà dreta. Té el suport per al polze dret.'],
   ['claus','Claus i anells','claus|anells|claus i anells|clau',300,102,320,170,'Tapen els forats per canviar la nota.'],
   ['campana','Campana','campana|pavelló|pabellón',585,102,590,40,'L\'extrem que s\'eixampla i projecta el so.']],
  draw(){return`<path d="M20 98L60 92V112L24 106Z" fill="#111827" stroke="${IM_C}"/><rect x="26" y="111" width="44" height="4" fill="#E9C46A" stroke="#B08900"/><rect x="50" y="90" width="16" height="24" rx="2" fill="#CBD5E1" stroke="${IM_C}"/>
   <rect x="80" y="90" width="42" height="24" rx="3" fill="#1F2937" stroke="${IM_C}"/><rect x="122" y="92" width="210" height="20" fill="#1F2937" stroke="${IM_C}"/><rect x="332" y="92" width="190" height="20" fill="#1F2937" stroke="${IM_C}"/>
   <rect x="120" y="89" width="6" height="26" fill="#CBD5E1"/><rect x="328" y="89" width="8" height="26" fill="#CBD5E1"/><rect x="518" y="89" width="8" height="26" fill="#CBD5E1"/>
   <path d="M522 92Q570 92 620 72V132Q570 112 522 112Z" fill="#1F2937" stroke="${IM_C}"/><path d="M140 100H500" stroke="#94A3B8" stroke-width="1.5"/>
   ${[190,225,260,370,405,440].map(x=>`<circle cx="${x}" cy="102" r="7" fill="none" stroke="#CBD5E1" stroke-width="2.5"/>`).join('')}${[300,480].map(x=>`<ellipse cx="${x}" cy="96" rx="9" ry="4" fill="#CBD5E1"/>`).join('')}`}},
 guitarra:{nom:'Guitarra',art:'la guitarra',de:'de la guitarra',sub:'pincada',vb:'0 0 640 260',
  teoria:['La <b>guitarra</b> és un instrument de <b>corda pinçada</b>: les cordes es pincen amb els dits de la mà dreta (o amb una pua). La guitarra clàssica té cordes de niló.','Té 6 cordes. De la 6a (la més greu) a la 1a (la més aguda): <b>mi, la, re, sol, si, mi</b>.','Amb la mà esquerra es premen les cordes entre els <b>trasts</b> del <b>mànec</b>: cada trast puja un semitò. El so s\'amplifica a la <b>caixa de ressonància</b> i surt per la <b>boca</b>.','La música de guitarra s\'escriu en clau de sol, però sona una octava més greu del que està escrit.'],
  parts:[['pala','Pala','pala|capçal|clavijero',52,130,40,60,'L\'extrem del mànec on hi ha les clavilles.'],
   ['clavilles','Clavilles','clavilles|clavilla|mecanisme',40,112,60,30,'Giren per afinar les cordes.'],
   ['mastil','Mànec','mànec|manec|mastil|màstil',150,130,150,200,'La part llarga on es premen les cordes.'],
   ['trasts','Trasts','trasts|trast',230,130,240,40,'Barretes de metall: cada espai entre trasts és un semitò.'],
   ['boca','Boca','boca|forat|forat de ressonància',400,130,400,40,'El forat rodó per on surt el so.'],
   ['pont','Pont','pont|cordal',546,130,580,40,'On es lliguen les cordes a la tapa.'],
   ['cordes','Cordes','cordes|corda',320,126,310,238,'Sis cordes: mi, la, re, sol, si, mi.'],
   ['caixa','Caixa de ressonància','caixa de ressonància|caixa|cos|tapa harmònica|caixa de ressonancia',490,190,520,238,'El cos buit que amplifica el so.']],
  draw(){return`<path d="M300 130C300 50 360 40 400 55C430 65 440 85 460 85C480 85 490 60 540 50C600 40 625 90 625 130C625 170 600 220 540 210C490 200 480 175 460 175C440 175 430 195 400 205C360 220 300 210 300 130Z" fill="#E9C27A" stroke="${IM_FOS}" stroke-width="2.5"/>
   <circle cx="400" cy="130" r="32" fill="#3B2412"/><circle cx="400" cy="130" r="38" fill="none" stroke="${IM_FOS}" stroke-width="3"/><rect x="95" y="118" width="215" height="24" fill="#5B3416" stroke="${IM_FOS}"/>
   ${[120,148,174,198,220,240,258,275,290].map(x=>`<path d="M${x} 118V142" stroke="#D1D5DB" stroke-width="2"/>`).join('')}<path d="M20 108H95V152H20Z" fill="#5B3416" stroke="${IM_FOS}"/>
   ${[30,52,74].flatMap(x=>[`<circle cx="${x}" cy="104" r="5" fill="#E5E7EB" stroke="${IM_C}"/>`,`<circle cx="${x}" cy="156" r="5" fill="#E5E7EB" stroke="${IM_C}"/>`]).join('')}<rect x="540" y="112" width="12" height="36" fill="#3B2412"/>
   ${[121,124,127,130,133,136,139].slice(0,6).map(y=>`<path d="M30 ${y+1}H548" stroke="#F3F4F6" stroke-width="1.1"/>`).join('')}`}}};

/* ---------- digitacions bàsiques de la flauta travessera (sistema Boehm) ---------- */
// T polze (clau de si) · 1 2 3 dits de la mà esquerra · G clau de sol♯ (menovell esquerre) · 4 5 6 dits de la mà dreta · P clau de mi♭ (menovell dret)
const IM_DIG=[['re',4,0,'T123456'],['mi',4,0,'T12345P'],['fa',4,0,'T1234P'],['fa',4,1,'T1236P'],['sol',4,0,'T123P'],['sol',4,1,'T123GP'],['la',4,0,'T12P'],['si',4,-1,'T14P'],['si',4,0,'T1P'],['do',5,0,'1P'],['do',5,1,'P'],['re',5,0,'T23456'],['mi',5,0,'T12345P'],['fa',5,0,'T1234P'],['sol',5,0,'T123P'],['la',5,0,'T12P']];
const imDigNote=d=>({l:MU_N.indexOf(d[0])+7*(d[1]-4),a:d[2]});
function imDigSVG(code,lab){const on=k=>code.includes(k),C=(x,y,r,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${on(k)?IM_C:'#fff'}" stroke="${IM_C}" stroke-width="2"/>`;
 return`<svg viewBox="0 0 300 92" width="300" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="Digitació de flauta travessera">
  <text x="20" y="14" font-size="10" fill="#64748B">mà esquerra</text><text x="170" y="14" font-size="10" fill="#64748B">mà dreta</text>
  <rect x="14" y="58" width="20" height="10" rx="3" fill="${on('T')?IM_C:'#fff'}" stroke="${IM_C}" stroke-width="2"/><text x="24" y="84" text-anchor="middle" font-size="9" fill="#64748B">polze</text>
  ${C(54,40,11,'1')}${C(84,40,11,'2')}${C(114,40,11,'3')}<ellipse cx="136" cy="60" rx="7" ry="5" fill="${on('G')?IM_C:'#fff'}" stroke="${IM_C}" stroke-width="2"/>
  <path d="M152 22V74" stroke="#CBD5E1" stroke-width="2"/>${C(176,40,11,'4')}${C(206,40,11,'5')}${C(236,40,11,'6')}<ellipse cx="262" cy="60" rx="8" ry="5" fill="${on('P')?IM_C:'#fff'}" stroke="${IM_C}" stroke-width="2"/>
  ${lab?`<text x="150" y="88" text-anchor="middle" font-size="12" font-weight="800" fill="${MU_HI}">${lab}</text>`:''}</svg>`}

/* ---------- SVG genèric d'un instrument amb les parts numerades ---------- */
function imSVG(id,{mode='labels',hi=null}={}){const I=IM[id],show=mode==='labels';let s=I.draw();
 I.parts.forEach(([pid,nom,,x,y,lx,ly],i)=>{const h=hi===pid,c=h?'#1E3FD0':'#121C4D';
  s+=`<g data-part="${pid}" style="cursor:pointer">`;
  if(show)s+=`<path d="M${x} ${y}L${lx} ${ly+(ly<y?6:-14)}" stroke="${c}" stroke-width="1" opacity=".6"/><text x="${lx}" y="${ly}" text-anchor="middle" font-size="13" font-weight="700" fill="${h?'#1E3FD0':'#334155'}" paint-order="stroke" stroke="#fff" stroke-width="4">${nom}</text>`;
  s+=`<circle cx="${x}" cy="${y}" r="${h?12:10}" fill="${c}" stroke="#fff" stroke-width="2"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${i+1}</text><circle cx="${x}" cy="${y}" r="18" fill="transparent"/></g>`});
 return`<svg class="lamsvg" viewBox="${I.vb}" role="img" aria-label="${I.nom}: parts">${s}</svg>`}

/* ===================== temes (un per instrument) ===================== */
// amaga a la pista (o a l'enunciat) el nom de la part i els seus sinònims
const imHide=(t,p)=>[p[1],...p[2].split('|')].filter(w=>w.length>=3).sort((a,b)=>b.length-a.length).reduce((h,w)=>h.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),'…'),String(t).replace(/<\/?b>/g,''));
function imGen(id,lv){const I=IM,X=I[id],ty=pick(lv?['num','num','func','fam','prop','prop']:['num','num','func','prop']);
 const parts=X.parts,pAns=p=>p[2].split('|');
 const errP=p=>v=>parts.some(q=>q!==p&&muIs(v[0],pAns(q))&&!muIs(v[0],pAns(p)))?'im_part':null;
 if(ty==='num'){const i=rnd(0,parts.length-1),p=parts[i];
  return{text:`Observa ${X.art}. Com es diu la part número <b>${i+1}</b>?`,fig:imSVG(id,{mode:'numbers',hi:p[0]}),fields:[muA(pAns(p),'Part')],
   hints:[`Pista: ${imHide(p[7],p)}`,`Comença per «${p[1][0]}».`],steps:[`El número ${i+1} és: <b>${p[1]}</b>.`,p[7]],err:errP(p)}}
 if(ty==='func'){const p=pick(parts);
  return{text:`Quina part ${X.de} és aquesta? <i>${imHide(p[7],p)}</i>`,fields:[muA(pAns(p),'Part')],
   hints:['Mira la làmina de l\'instrument amb els noms.',`Comença per «${p[1][0]}» (${p[1].split(' ').length} paraula${p[1].split(' ').length>1?'es':''}).`],steps:[`És: <b>${p[1]}</b>.`],err:errP(p)}}
 if(ty==='fam')return{text:`A quina família i subfamília pertany ${X.art}? (Per exemple: «corda fregada», «vent metall».)`,fields:[muA(muSubTxt(X.sub),'Família i subfamília')],
  hints:['Pensa com es produeix el so: vibra una corda, hi bufam, o el picam?',id==='flauta'?'Compte: és de metall, però el so es fa bufant per un bisell, com a la flauta dolça.':'Després pensa com es fa vibrar.'],
  steps:[`${muCap(X.art)}: <b>${muSubTxt(X.sub)[0]}</b>.`],err:v=>id==='flauta'&&muIs(v[0],muSubTxt('metall').concat(['metall']))?'mu_flauta':muIs(v[0],Object.keys(MU_SUB).filter(k=>k!==X.sub).flatMap(muSubTxt))?'mu_familia':null};
 return X.prop(lv)}

IM.flauta.prop=function(lv){const ds=lv?IM_DIG:IM_DIG.filter(d=>!d[2]&&d[1]===4||d[0]==='do'&&!d[2]),d=pick(ds),n=imDigNote(d);
 if(lv&&Math.random()<.3){const z=pick(IM_DIG.filter(x=>x[1]===4&&!x[2])),k=z[3].replace(/[TGP]/g,'').length;
  return{text:`Quants dits (sense comptar el polze ni els menovells) es tapen per fer el <b>${z[0]}</b> greu (${z[0]}4) a la flauta travessera?`,fields:[{label:'Dits',ans:R(k)}],
   hints:['Mira la taula de digitacions de la làmina.','Com més greu és la nota, més dits es tapen.'],steps:[`${muCap(z[0])}4: ${imDigSVG(z[3])}`,`Es tapen <b>${k}</b> dits.`],err:null}}
 return{text:'Quina nota fa aquesta digitació de flauta travessera? (Negre = clau pitjada.)',fig:imDigSVG(d[3]),fields:[lmNF(n)],
  hints:['Com més claus pitjades, més llarg és el tub i més greu la nota.','Compta quants dits pitgen claus a cada mà (a més del polze) i recorda la taula de la làmina.'],
  steps:['Compta els dits de cada mà i recorda la taula: re (tots), mi, fa, sol (mà esquerra), la, si, do (només un dit), do♯ (tot obert).',`És el <b>${lmNom(n)}</b>${d[1]===5&&['mi','fa','sol','la'].includes(d[0])?' (igual que la nota greu, però bufant més ràpid)':''}.`],
  err:v=>lmLetterOnly(v[0],n)?'mu_alteracio_oblida':null}};
IM.violi.prop=function(lv){const S=['sol','re','la','mi'];
 if(lv&&Math.random()<.4)return{text:'Escriu les 4 cordes del violí, de la més <b>greu</b> a la més <b>aguda</b>.',fields:S.map((s,i)=>lmF([s],`${i+1}a`,false)),
  hints:['Van per quintes justes: de cada corda a la següent hi ha una 5a.','Si en recordes una, troba les altres pujant o baixant una 5a.'],steps:[`De greu a agut: <b>${S.join(', ')}</b> (per quintes).`],err:v=>v.join()===[...S].reverse().join()?'im_cordes':null};
 const i=rnd(0,3),q=pick(['nom','int']);
 if(q==='int'&&i<3)return{text:`Quin interval hi ha entre la corda de <b>${S[i]}</b> i la de <b>${S[i+1]}</b> del violí?`,fields:[lmF(lmIntTxt(5,'J'),'Interval')],
  hints:['Compta les notes de la primera a la segona.','Les cordes del violí estan afinades totes igual.'],steps:[`${S[i]} → ${S[i+1]}: 5 notes, 7 semitons → <b>5a justa</b>.`],err:null};
 const ord=['més greu','segona més greu','segona més aguda','més aguda'][i];
 return{text:`Quina nota fa la corda <b>${ord}</b> del violí, tocada a l'aire (sense prémer)?`,fields:[lmF([S[i]],'Nota',false)],
  hints:['De greu a agut, les cordes van per quintes.',i===3?'La més greu és el sol: puja tres quintes.':'La més aguda és el mi: baixa de 5a en 5a.'],steps:[`Cordes: sol, re, la, mi. La ${ord} és el <b>${S[i]}</b>.`],err:v=>lmIn(v[0],[S[3-i]])&&S[3-i]!==S[i]?'im_cordes':null}};
IM.guitarra.prop=function(lv){const S=['mi','si','sol','re','la','mi'];// 1a ... 6a
 const k=rnd(1,6);if(lv&&Math.random()<.35){const t=rnd(1,lv>1?5:3),c=pick([6,5,4]),base={6:{l:-12,a:0},5:{l:-9,a:0},4:{l:-6,a:0}}[c],n=lmUp(base,1,'J'),s=lmS(base)+t,opts=[];
   for(let l=base.l;l<base.l+4;l++)for(const a of[-1,0,1])if(lmS({l,a})===s)opts.push({l,a});
   return{text:`A la guitarra, quina nota fa la <b>${c}a corda</b> (${LM_L[lmMod(base.l,7)]}) prement-la al <b>trast ${t}</b>? (Cada trast puja un semitò.)`,fields:[lmF(opts.flatMap(lmNoteTxt),'Nota')],
    hints:['Cada trast puja un semitò.','Recorda que entre mi-fa i si-do només hi ha un semitò.'],steps:[`${muCap(LM_L[lmMod(base.l,7)])} + ${t} semitons = <b>${opts.map(lmNom).join(' o ')}</b>.`],err:null}}
 return{text:`Quina nota fa la <b>${k}a corda</b> de la guitarra, tocada a l'aire?`,fields:[lmF([S[k-1]],'Nota',false)],
  hints:['La 6a és la més greu i la 1a la més aguda.','La 6a i la 1a fan la mateixa nota, a dues octaves. Entre les altres hi ha quartes, menys entre la 3a i la 2a, que hi ha una tercera.'],steps:['Cordes de la 6a a la 1a: mi, la, re, sol, si, mi.',`La ${k}a corda és el <b>${S[k-1]}</b>.`],err:v=>lmIn(v[0],[S[6-k]])&&S[6-k]!==S[k-1]?'im_cordes':null}};
IM.clarinet.prop=function(lv){const w={l:rnd(0,9),a:lv>1?pick([0,0,1,-1]):0},s=lmDown(w,2,'M');
 if(Math.abs(s.a)>1)return this.prop(lv);
 return{text:`Un clarinet en si♭ llegeix la nota <b>${lmNom(w)}</b>. Quina nota <b>sona</b> realment?`,fig:lmStaff([{n:w.l,acc:w.a,d:'n'}],{minW:150}),fields:[lmNF(s)],
  hints:['El clarinet en si♭ sona una 2a major més greu del que està escrit.','Baixa una nota i comprova que hi hagi 2 semitons (un to).'],
  steps:['Clarinet en si♭: quan llegeix do, sona si♭ (2a major avall).',`${muCap(lmNom(w))} − 2a major = <b>${lmNom(s)}</b>.`],err:v=>lmLetterOnly(v[0],s)?'lm_int_classe':null}};
IM.piano.prop=function(lv){const B=muMk([
  ['Quantes tecles té un piano modern?','88','Són més de 80 i menys de 90.','El piano té <b>88</b> tecles: 52 blanques i 36 negres.'],
  ['Quin pedal del piano allarga el so de les notes (aixeca tots els apagadors)?','dret|el dret|el de la dreta|pedal dret|ressonància|pedal de ressonància|forte','És el que més s\'usa.','És el pedal <b>dret</b> (de ressonància).','esquerre|el de l\'esquerra'],
  ['Quina peça del piano colpeja la corda quan pitges una tecla?','martellet|el martellet|martell','És recoberta de feltre.','És el <b>martellet</b>.','apagador'],
  ['Quina peça atura la vibració de la corda quan deixes anar la tecla?','apagador|l\'apagador|apagadors','El seu nom diu el que fa.','És l\'<b>apagador</b>.','martellet'],
  ['Amb quina clau es llegeix normalment la mà esquerra del piano?','clau de fa|fa|clau de fa en 4a','És la clau dels sons greus.','La mà esquerra es llegeix en <b>clau de fa</b> (en 4a).','clau de sol'],
  ['Quin pedal del piano fa el so més suau (pedal «una corda»)?','esquerre|el esquerre|el de l\'esquerra|pedal esquerre|una corda','Està a l\'altre costat del pedal de ressonància.','És el pedal <b>esquerre</b> (una corda).','dret|el de la dreta',1],
  ['Com es diu el piano que té les cordes horitzontals, molt usat als concerts?','piano de cua|de cua|cua','Té forma allargada, com una cua.','És el <b>piano de cua</b>.','vertical',1],
  ['Quantes tecles negres té un piano de 88 tecles?','36','88 tecles en total i 52 són blanques.','88 − 52 = <b>36</b> tecles negres.','',2]]);
 if(Math.random()<.4){const s=rnd(0,11),ok=muChromTxt(s);
  return{text:'Quina nota és la tecla marcada del piano?',fig:imKeySVG(s),fields:[muA(ok,'Nota')],hints:['Busca el grup de dues tecles negres: el do és la tecla blanca de l\'esquerra.','Les tecles negres tenen dos noms (amb ♯ o amb ♭).'],steps:[`Comptant des del do: <b>${ok[0]}</b>.`],err:null}}
 return muFromBank(B,'im_part',lv)};
function imKeySVG(s){const W=[0,2,4,5,7,9,11],Bk=[1,3,6,8,10],bx={1:28,3:68,6:148,8:188,10:228};let o='';
 W.forEach((x,i)=>o+=`<rect x="${i*40+1}" y="1" width="39" height="130" fill="${x===s?'#FDE2CF':'#fff'}" stroke="${IM_C}" stroke-width="1.5"/>`);
 Bk.forEach(x=>o+=`<rect x="${bx[x]}" y="1" width="25" height="80" fill="${x===s?MU_HI:IM_C}"/>`);
 const cx=W.includes(s)?W.indexOf(s)*40+20:bx[s]+12;o+=`<text x="${cx}" y="${W.includes(s)?120:72}" text-anchor="middle" font-size="18" font-weight="800" fill="${W.includes(s)?MU_HI:'#fff'}">?</text>`;
 return`<svg viewBox="0 0 282 132" width="282" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="Teclat">${o}</svg>`}

for(const id of Object.keys(IM)){const X=IM[id],ab={flauta:'Ft',piano:'Pn',violi:'Vl',clarinet:'Cl',guitarra:'Gt'}[id];
 SK['im_'+id]={mat:'musica',ab,nom:`${X.nom}: parts i funcionament`,teoria:[...X.teoria,'Mira la làmina i toca cada part per saber-ne més:'],fig:()=>imSVG(id),gen(lv){return imGen(id,lv)}}}

Object.assign(ERR,{
 im_part:{kid:'Aquesta és una altra part de l\'instrument. Mira la làmina amb els noms i fixa\'t on és cada part.',par:'Confon les parts del seu instrument'},
 im_cordes:{kid:'Ho has girat! Recorda l\'ordre de les cordes de greu a agut (o de la 6a a la 1a a la guitarra).',par:'Inverteix l\'ordre de les cordes de l\'instrument'}});

/* ===================== làmina genèrica d'instrument ===================== */
function laminaInstrument(id){endSession();const X=IM[id];let mode='labels',hi=null;
 const dig=id==='flauta'?`<div class="card"><h3 style="margin-top:0">Digitacions bàsiques</h3><p class="muted" style="margin-top:0">Negre = clau pitjada. Polze, 3 dits i menovell de la mà esquerra · 3 dits i menovell de la mà dreta. El professor o professora et pot ensenyar digitacions alternatives.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">${IM_DIG.map(d=>`<div style="border:1px solid #E2E8F0;padding:6px">${imDigSVG(d[3],lmNomC(imDigNote(d))+d[1])}</div>`).join('')}</div>
  <p style="margin-bottom:0">De <b>mi5 a la5</b> la posició és la mateixa que a l'octava greu: canvia l'aire (més ràpid i amb els llavis més tancats). El <b>re5</b> s'aixeca el primer dit.</p></div>`
  :id==='violi'?`<div class="card"><h3 style="margin-top:0">Cordes a l'aire</h3>${lmStaff([{n:-3,d:'r',lab:'sol'},{n:1,d:'r',lab:'re'},{n:5,d:'r',lab:'la'},{n:9,d:'r',lab:'mi'}],{minW:240})}${muSndBtn(lmEv([{l:-3,a:0},{l:1,a:0},{l:5,a:0},{l:9,a:0}]),'Escolta les cordes')}</div>`
  :id==='guitarra'?`<div class="card"><h3 style="margin-top:0">Cordes a l'aire (de la 6a a la 1a)</h3><p style="font-size:20px;font-weight:800;margin:0 0 6px">mi – la – re – sol – si – mi</p>${muSndBtn(lmEv([{l:-12,a:0},{l:-9,a:0},{l:-6,a:0},{l:-3,a:0},{l:-1,a:0},{l:2,a:0}]),'Escolta les cordes')}</div>`
  :id==='clarinet'?`<div class="card"><h3 style="margin-top:0">Instrument transpositor (si♭)</h3><p style="margin:0">Escrit → sona: do → si♭ · re → do · mi → re · fa → mi♭ · sol → fa · la → sol · si → la. Tot sona una <b>2a major</b> més greu.</p></div>`:'';
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-musica)">Làmina · El meu instrument</div><h2>${X.nom}</h2><p class="muted">Toca cada part per saber com es diu i per a què serveix.</p></div><button class="ghost" onclick="subject('musica')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="im1" class="on">Amb noms</button><button id="im2">Sense noms (posa't a prova)</button></div><div id="isvg"></div></div>
 <div><div class="card" id="iinfo"></div><div class="row"><button id="ia">Aprendre el tema</button><button class="sec" id="ip">Practicar</button></div></div></div>${dig}`);
 const info=()=>{const P=X.parts,p=P.find(q=>q[0]===hi);$('#iinfo').innerHTML=p?`<div class="eyebrow" style="color:var(--s-musica)">Part ${P.indexOf(p)+1} de ${P.length}</div><h3 style="margin:4px 0 8px">${mode==='labels'?p[1]:'Com es diu?'}</h3><p style="margin:0">${mode==='labels'?p[7]:'Digues el nom en veu alta i després canvia a «Amb noms» per comprovar-ho.'}</p>`
   :`<h3 style="margin-top:0">Parts ${X.de}</h3><ol class="steps" style="margin:0">${P.map(q=>`<li><a href="#" data-go="${q[0]}">${q[1]}</a></li>`).join('')}</ol>`;
  $('#iinfo').querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();hi=a.dataset.go;draw()})};
 const draw=()=>{$('#isvg').innerHTML=imSVG(id,{mode,hi});$('#isvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw()});info()};
 $('#im1').onclick=()=>{mode='labels';$('#im1').className='on';$('#im2').className='';draw()};
 $('#im2').onclick=()=>{mode='numbers';$('#im2').className='on';$('#im1').className='';draw()};
 $('#ia').onclick=()=>start('professor',['im_'+id],15);$('#ip').onclick=()=>start('exercicis',['im_'+id],15);draw()}
for(const id of Object.keys(IM))lmAddLamina({obre:`laminaInstrument('${id}')`,nom:`${IM[id].nom}: parts`,desc:id==='flauta'?'Les parts de la flauta i les digitacions bàsiques':'Les parts de l\'instrument i com sona',ic:'music',lm:true,ins:id});

/* ===================== unitat «El meu instrument» ===================== */
// Segons l'instrument triat a «Nivell de Música»: només aquell, o tots si no se n'ha triat cap.
LM_EXTRA.push(c=>{const show=c.nivell!=='pri',ins=IM[c.ins]?c.ins:null,ks=ins?['im_'+ins]:Object.keys(IM).map(k=>'im_'+k);
 const hidden=Object.keys(IM).map(k=>'im_'+k).filter(k=>!ks.includes(k));
 return[show?[`El meu instrument${ins?': '+IM[ins].nom.toLowerCase():''}`,ks]:['El meu instrument',ks,[0]],...(hidden.length?[['Altres instruments',hidden,[0]]]:[])]});
const IM_LIST=Object.keys(IM).map(k=>[k,IM[k].nom]);
