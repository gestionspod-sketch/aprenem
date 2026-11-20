/* Aprenem - làmines interactives: mapa físic i mapa polític d'Espanya, i el tema «L'organització territorial» (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   Mapa dibuixat a partir de coordenades aproximades (longitud, latitud) de la costa i les fronteres, simplificades:
   serveix per situar-se, no és un mapa exacte. Les Canàries van en un requadre (no són al seu lloc real).
   El mapa físic s'associa al tema md_relleu (contingut/medi-social-6.js), que conserva la seva clau de progrés. */
const ESP=(lo,la)=>[Math.round((lo+10)*60),Math.round((44-la)*75)];
const ESC=(lo,la)=>[Math.round(15+(lo+18.3)*38),Math.round(575+(29.6-la)*45)];   // requadre de les Canàries
const espPath=(pts,f=ESP)=>pts.map((q,i)=>(i?'L':'M')+f(q[0],q[1]).join(' ')).join('')+'Z';
const espLine=(pts,f=ESP)=>pts.map((q,i)=>(i?'L':'M')+f(q[0],q[1]).join(' ')).join('');
const ESP_FRONT=[[-7.4,37.18],[-7.5,37.5],[-7.0,38.0],[-7.3,38.4],[-7.0,38.9],[-7.5,39.6],[-7.0,39.65],[-6.9,40.2],[-6.85,41.0],[-6.2,41.6],[-6.6,41.95],[-7.2,41.88],[-8.2,42.1],[-8.88,41.87]];
const ESP_COSTA=[[-8.88,41.87],[-8.9,42.25],[-9.0,42.6],[-9.3,42.9],[-9.2,43.2],[-8.3,43.4],[-8.0,43.7],[-7.0,43.55],[-5.7,43.58],[-4.5,43.4],[-3.8,43.48],[-2.9,43.4],[-1.8,43.38],
 [-1.4,43.05],[-0.7,42.88],[0.7,42.82],[1.45,42.6],[1.75,42.45],[3.17,42.43],[3.3,42.3],[3.2,41.9],[2.2,41.4],[1.2,41.1],[0.9,40.8],[0.6,40.6],[0.0,40.0],[-0.3,39.5],[0.1,39.0],[0.2,38.75],
 [-0.5,38.3],[-0.7,37.65],[-1.3,37.55],[-1.9,36.95],[-2.2,36.73],[-3.0,36.75],[-4.4,36.7],[-5.0,36.45],[-5.35,36.15],[-5.6,36.0],[-6.0,36.2],[-6.3,36.5],[-6.4,36.8],[-6.9,37.15],[-7.4,37.18]];
const ESP_PT=[[-8.88,41.87],[-8.7,41.2],[-8.9,40.6],[-9.0,40.2],[-9.4,39.4],[-9.5,38.75],[-9.2,38.65],[-8.9,38.5],[-8.8,38.1],[-8.8,37.4],[-9.0,37.0],[-8.6,37.1],[-7.9,37.0],[-7.4,37.18],...ESP_FRONT.slice(1)];
const ESP_ILLES=[[[2.35,39.55],[2.7,39.78],[3.2,39.96],[3.12,39.82],[3.48,39.71],[3.3,39.45],[3.05,39.27],[2.75,39.5],[2.62,39.55],[2.5,39.45]],[[3.8,40.0],[4.1,40.08],[4.32,39.88],[4.2,39.82],[3.85,39.92]],
 [[1.2,38.95],[1.45,39.1],[1.62,39.03],[1.55,38.88],[1.35,38.85]],[[1.38,38.73],[1.55,38.68],[1.45,38.64]]];
const ESP_CAN=[[-17.85,28.7,9,14],[-18.0,27.75,8,6],[-17.25,28.1,7,7],[-16.55,28.3,18,10],[-15.6,27.95,12,11],[-14.0,28.4,9,22],[-13.65,29.05,7,13]];
// Fons comú dels dos mapes: mar, França, Àfrica, Portugal, Espanya, Balears i el requadre de les Canàries
function espBase(fill){const fr='M528 0L510 38L492 49L558 82L642 90L702 113L790 118L783 75L840 38L900 30L900 0Z',af='M228 690L228 630L282 607L360 660L426 652L492 667L560 690Z';
 return`<rect x="-60" y="-40" width="960" height="730" fill="#D6ECFA"/><path d="${fr}" fill="#E8E4DA" stroke="#B9B2A3" stroke-width="2"/><path d="${af}" fill="#E8E4DA" stroke="#B9B2A3" stroke-width="2"/>
 <path d="${espPath(ESP_PT)}" fill="#EDE8DC" stroke="#9E9686" stroke-width="2"/><path d="${espPath(ESP_COSTA)}" fill="${fill}" stroke="#6D6252" stroke-width="2.5"/>
 ${ESP_ILLES.map(i=>`<path d="${espPath(i)}" fill="${fill}" stroke="#6D6252" stroke-width="2"/>`).join('')}
 <text x="700" y="30" font-size="16" fill="#8A8170" font-style="italic">França</text><text x="96" y="330" font-size="16" fill="#8A8170" font-style="italic" transform="rotate(-80 96 330)">Portugal</text><text x="470" y="682" font-size="15" fill="#8A8170" font-style="italic">Àfrica</text>
 <rect x="8" y="572" width="200" height="104" fill="#D6ECFA" stroke="#90A4AE" stroke-width="2"/>${ESP_CAN.map(([lo,la,rx,ry])=>{const[x,y]=ESC(lo,la);return`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="#6D6252" stroke-width="2"/>`}).join('')}`}
/* ---------- Mapa físic ---------- */
const ESP_SERRES={pirineus:[[-1.5,43.0],[0,42.75],[1.5,42.55],[2.8,42.4]],cantabrica:[[-7.0,43.0],[-5.5,43.05],[-4.0,43.05],[-3.0,43.0]],central:[[-7.0,40.25],[-5.5,40.3],[-4.2,40.75],[-3.2,41.1]],
 iberic:[[-3.0,42.2],[-2.0,41.6],[-1.2,40.7],[-0.6,40.0]],morena:[[-7.0,38.1],[-5.5,38.2],[-4.0,38.3],[-2.8,38.35]],betics:[[-5.6,36.6],[-4.0,37.0],[-3.1,37.05],[-2.0,37.5],[-0.8,38.4]]};
const ESP_RIUS={minyo:[[-7.6,43.0],[-7.9,42.4],[-8.2,42.1],[-8.85,41.9]],duero:[[-2.8,41.9],[-4.0,41.6],[-5.5,41.5],[-6.5,41.2],[-8.6,41.15]],tajo:[[-1.8,40.4],[-3.0,40.0],[-4.0,39.9],[-5.5,39.75],[-7.0,39.65],[-8.2,39.3],[-9.1,38.7]],
 guadiana:[[-3.0,39.1],[-4.5,39.0],[-6.3,38.9],[-7.0,38.6],[-7.4,37.9],[-7.4,37.2]],guadalquivir:[[-2.8,37.9],[-3.8,37.95],[-4.8,37.85],[-6.0,37.4],[-6.35,36.8]],
 ebre:[[-4.2,43.0],[-2.6,42.6],[-1.6,42.0],[-0.9,41.65],[0.3,41.2],[0.85,40.7]],xuquer:[[-1.9,40.4],[-1.6,39.6],[-0.9,39.1],[-0.25,39.15]]};
const pt=(lo,la,f=ESP)=>{const q=f(lo,la);return{p:q,l:q}};
lamReg('espfis',{nom:'Mapa físic d\'Espanya',desc:'Serralades, rius, cims i mars',ic:'mountain',vb:'-60 -40 960 730',mw:860,fs:1.25,
 intro:'Les serralades són en marró i els rius en blau. Toca cada número per saber-ne més. (Mapa simplificat: les Canàries són al requadre.)',llista:'Relleu, rius i mars',camp:'Nom',que:'l\'element del mapa',
 pregunta:'Quin element del relleu o de les aigües d\'Espanya',recorda:'La Meseta Central és al centre, envoltada de serralades. Els rius llargs van a l\'Atlàntic; l\'Ebre, a la Mediterrània.',
 parts:{
  pirineus:{n:1,nom:'Pirineus',a:'els pirineus|serralada pirinenca',...pt(0.8,42.68),s:'c',f:'Serralada que fa de frontera amb França. Hi ha l\'Aneto (3.404 m), el cim més alt dels Pirineus.',q:'fa de frontera entre Espanya i França'},
  cantabrica:{n:2,nom:'Serralada Cantàbrica',a:'serralada cantàbrica|cordillera cantàbrica|serra cantàbrica',...pt(-5.0,43.05),s:'c',f:'Serralada del nord, paral·lela a la costa de la mar Cantàbrica. Hi ha els Picos de Europa.',q:'és al nord, paral·lela a la costa cantàbrica'},
  central:{n:3,nom:'Sistema Central',...pt(-4.8,40.45),s:'c',f:'Serralada que divideix la Meseta en dues parts: la submeseta nord i la submeseta sud. Hi ha la serra de Guadarrama, vora Madrid.',q:'divideix la Meseta en dues parts'},
  iberic:{n:4,nom:'Sistema Ibèric',...pt(-1.7,41.35),s:'c',f:'Serralada que tanca la Meseta per l\'est. Hi neixen rius com el Tajo i el Duero.',q:'tanca la Meseta per l\'est'},
  morena:{n:5,nom:'Sierra Morena',a:'serra morena',...pt(-3.5,38.32),s:'c',f:'Serralada que tanca la Meseta pel sud i la separa de la depressió del Guadalquivir.',q:'tanca la Meseta pel sud'},
  betics:{n:6,nom:'Sistemes Bètics',a:'serralada bètica|serralades bètiques|bètics|sistema bètic',...pt(-1.4,37.95),s:'c',f:'Serralades del sud, vora la Mediterrània. Inclouen Sierra Nevada, amb el Mulhacén. Les Balears són la continuació d\'aquestes serralades sota la mar.',q:'són al sud, vora la Mediterrània, i inclouen Sierra Nevada'},
  meseta:{n:7,nom:'Meseta Central',a:'meseta|la meseta',...pt(-2.8,39.6),s:'c',f:'Gran altiplanura del centre de la península, a uns 600-800 m d\'altitud. Ocupa gairebé la meitat del territori.',q:'és la gran altiplanura del centre de la península'},
  mulhacen:{n:8,nom:'Mulhacén',...pt(-3.31,37.05),s:'c',lv:1,f:'El cim més alt de la península Ibèrica (3.479 m), a Sierra Nevada.',q:'és el cim més alt de la península Ibèrica'},
  teide:{n:9,nom:'Teide',a:'el teide',...pt(-16.55,28.3,ESC),s:'c',lv:1,f:'El cim més alt d\'Espanya (3.715 m). És un volcà de l\'illa de Tenerife.',q:'és el cim més alt d\'Espanya, un volcà de Tenerife'},
  minyo:{n:10,nom:'Miño',a:'minho|minyo',...pt(-8.0,42.35),s:'c',lv:1,f:'Riu de Galícia. En el seu darrer tram fa de frontera amb Portugal. Desemboca a l\'oceà Atlàntic.',q:'és el riu de Galícia que fa de frontera amb Portugal'},
  duero:{n:11,nom:'Duero',a:'douro|duer',...pt(-5.0,41.5),s:'c',f:'Riu de la submeseta nord. Passa per Castella i Lleó i desemboca a l\'Atlàntic, a Porto (Portugal).',q:'travessa la submeseta nord i desemboca a Porto'},
  tajo:{n:12,nom:'Tajo',a:'tejo|tage|tajo',...pt(-5.0,39.8),s:'c',f:'El riu més llarg de la península (uns 1.000 km). Passa per Toledo i desemboca a l\'Atlàntic, a Lisboa.',q:'és el riu més llarg de la península i desemboca a Lisboa'},
  guadiana:{n:13,nom:'Guadiana',...pt(-5.2,38.95),s:'c',f:'Riu de la submeseta sud. En el seu darrer tram fa de frontera amb Portugal i desemboca a l\'Atlàntic.',q:'travessa la submeseta sud i fa frontera amb Portugal al final'},
  guadalquivir:{n:14,nom:'Guadalquivir',...pt(-4.8,37.85),s:'c',f:'Riu d\'Andalusia. Passa per Còrdova i Sevilla i desemboca a l\'Atlàntic. És navegable fins a Sevilla.',q:'és el riu d\'Andalusia que passa per Sevilla'},
  ebre:{n:15,nom:'Ebre',a:'l\'ebre',...pt(-1.2,41.85),s:'c',f:'El riu més cabalós de la península (el que porta més aigua). Desemboca a la Mediterrània i hi forma un gran delta.',q:'és el riu més cabalós, que forma un delta a la Mediterrània'},
  xuquer:{n:16,nom:'Xúquer',a:'júcar',...pt(-1.3,39.45),s:'c',lv:1,f:'Riu del vessant mediterrani que desemboca prop de València.',q:'és un riu mediterrani que desemboca prop de València'},
  atlantic:{n:17,nom:'Oceà Atlàntic',a:'atlàntic|l\'atlàntic|oceà atlàntic',...pt(-9.5,41.2),s:'c',f:'L\'oceà de l\'oest. Hi desemboquen els rius del vessant atlàntic: Miño, Duero, Tajo, Guadiana i Guadalquivir.',q:'és l\'oceà de l\'oest on desemboquen el Duero i el Tajo'},
  mediterrania:{n:18,nom:'Mar Mediterrània',a:'mediterrània|la mediterrània|mar mediterrani',...pt(2.0,40.4),s:'c',f:'La mar de l\'est i del sud. Hi són les Illes Balears. Hi desemboquen l\'Ebre, el Xúquer i el Segura.',q:'és la mar on hi ha les Illes Balears'},
  cantabric:{n:19,nom:'Mar Cantàbrica',a:'mar cantàbric|cantàbric',...pt(-5.5,44.15),s:'c',lv:1,f:'La mar del nord de la península. Els seus rius són curts i cabalosos.',q:'és la mar del nord de la península'},
  balears:{n:20,nom:'Illes Balears',a:'balears|les balears',...pt(2.95,39.62),s:'c',f:'Arxipèlag de la Mediterrània: Mallorca, Menorca, Eivissa, Formentera i illots com Cabrera.',q:'és l\'arxipèlag de la Mediterrània'},
  canaries:{n:21,nom:'Illes Canàries',a:'canàries|les canàries',...pt(-14.4,28.95,ESC),s:'c',f:'Arxipèlag volcànic de l\'oceà Atlàntic, a prop d\'Àfrica. Té set illes principals.',q:'és l\'arxipèlag volcànic de l\'Atlàntic'}},
 draw(H){const ser=k=>`<g ${H(k)}><path d="${espLine(ESP_SERRES[k])}" fill="none" stroke="#A0522D" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/><path d="${espLine(ESP_SERRES[k])}" fill="none" stroke="#7B3F1D" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/></g>`;
  const riu=k=>`<g ${H(k)}><path d="${espLine(ESP_RIUS[k])}" fill="none" stroke="#fff0" stroke-width="14"/><path d="${espLine(ESP_RIUS[k])}" fill="none" stroke="#1E88E5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const cim=(k,q)=>`<g ${H(k)}><path d="M${q[0]} ${q[1]-16}l11 18h-22Z" fill="#5D4037" stroke="#fff" stroke-width="1.5"/></g>`;
  const[mx,my]=ESP(-3.9,40.1);
  return`${espBase('#F3E7C9')}
 <g ${H('meseta')}><ellipse cx="${mx}" cy="${my}" rx="165" ry="120" fill="#E9CF94" opacity=".7"/></g>
 ${Object.keys(ESP_SERRES).map(ser).join('')}${Object.keys(ESP_RIUS).map(riu).join('')}${cim('mulhacen',ESP(-3.31,37.05))}${cim('teide',ESC(-16.55,28.3))}
 <g ${H('atlantic')}><rect x="-55" y="160" width="70" height="140" fill="#fff0"/></g><g ${H('mediterrania')}><rect x="640" y="250" width="160" height="60" fill="#fff0"/></g><g ${H('cantabric')}><rect x="180" y="-35" width="200" height="40" fill="#fff0"/></g>
 <g ${H('balears')}><circle cx="790" cy="340" r="70" fill="#fff0"/></g><g ${H('canaries')}><rect x="10" y="574" width="196" height="100" fill="#fff0"/></g>`}});
lamWrap('espfis','md_relleu',{pBank:.45});
/* ---------- Mapa polític: comunitats autònomes ---------- */
// [id, nom, sinònims, capital (i sinònims), províncies, lon, lat, nivell]
const CCAA=[['galicia','Galícia','galicia','Santiago de Compostel·la|Santiago|Santiago de Compostela',4,-7.9,42.75],['asturies','Astúries','asturias|principat d\'astúries','Oviedo',1,-5.9,43.3],
 ['cantabria','Cantàbria','cantabria','Santander',1,-4.0,43.15],['basc','País Basc','euskadi|país vasco','Vitòria|Vitòria-Gasteiz|Vitoria|Gasteiz|Vitoria-Gasteiz',3,-2.65,43.05],
 ['navarra','Navarra','comunitat foral de navarra','Pamplona|Iruña|Pamplona-Iruña',1,-1.6,42.68],['rioja','La Rioja','rioja','Logronyo|Logroño',1,-2.45,42.25],
 ['arago','Aragó','aragón','Saragossa|Zaragoza',3,-0.7,41.5],['catalunya','Catalunya','cataluña','Barcelona',4,1.5,41.8],['castellalleo','Castella i Lleó','castilla y león|castella-lleó','Valladolid',9,-4.7,41.7],
 ['madrid','Comunitat de Madrid','madrid','Madrid',1,-3.7,40.45],['manxa','Castella-la Manxa','castella la manxa|castilla-la mancha|castilla la mancha','Toledo',5,-3.4,39.25],
 ['valenciana','Comunitat Valenciana','país valencià|valència|comunitat valenciana','València|Valencia',3,-0.5,39.62],['murcia','Regió de Múrcia','múrcia|murcia','Múrcia|Murcia',1,-1.5,38.0],
 ['extremadura','Extremadura','','Mèrida|Mérida',2,-6.2,39.2],['andalusia','Andalusia','andalucía','Sevilla',8,-4.6,37.4],['balears','Illes Balears','balears|les balears','Palma',1,3.0,39.6],
 ['canaries','Canàries','illes canàries|les canàries','Las Palmas de Gran Canària i Santa Cruz de Tenerife|Las Palmas de Gran Canaria|Santa Cruz de Tenerife|Las Palmas|Santa Cruz',2,-15.6,28.0],
 ['ceuta','Ceuta','ciutat autònoma de ceuta','Ceuta',0,-5.3,35.9,1],['melilla','Melilla','ciutat autònoma de melilla','Melilla',0,-2.95,35.3,1]];
const ccaaCap=c=>c[3].split('|')[0];
lamReg('esppol',{nom:'Mapa polític d\'Espanya',desc:'Les 17 comunitats autònomes i les seves capitals',ic:'map',vb:'-60 -40 960 730',mw:860,fs:1.25,
 intro:'Cada número és una comunitat autònoma (o una ciutat autònoma). Toca-la per saber-ne la capital i les províncies. Les Canàries són al requadre.',llista:'Comunitats i ciutats autònomes',camp:'Comunitat autònoma',que:'la comunitat autònoma',
 pregunta:'Quina comunitat autònoma',recorda:'Espanya té 17 comunitats autònomes, 2 ciutats autònomes (Ceuta i Melilla), 50 províncies i més de 8.100 municipis.',
 parts:Object.fromEntries(CCAA.map(([k,nom,a,cap,pr,lo,la,lv],i)=>{const q=(k==='canaries'?ESC:ESP)(lo,la),c1=cap.split('|')[0];
  return[k,{n:i+1,nom,a:a||undefined,p:q,l:q,s:'c',lv:lv||(['rioja','navarra','cantabria','asturies','murcia','extremadura'].includes(k)?1:0),
   f:pr?`Capital: <b>${c1}</b>. ${pr===1?'Té una sola província.':`Té ${pr} províncies.`}${k==='balears'?' Cada illa té el seu Consell Insular.':''}`:`És una ciutat autònoma, al nord d\'Àfrica.`,
   q:pr?`té la capital a ${c1}`:`és la ciutat autònoma ${k==='ceuta'?'de davant de Gibraltar':'més a l\'est'}, al nord d\'Àfrica`}]})),
 draw(H){return`${espBase('#FFF3D6')}${CCAA.map(([k,,,,,lo,la])=>{const[x,y]=(k==='canaries'?ESC:ESP)(lo,la);return`<g ${H(k)}><circle cx="${x}" cy="${y}" r="16" fill="#F4A261" opacity=".55"/></g>`}).join('')}`}});
function md_comunitatsGen(lv){const L=CCAA.filter(c=>c[4]&&(lv>0||!['rioja','navarra','cantabria','asturies','murcia','extremadura'].includes(c[0]))),c=pick(L),t=Math.random();
 const caps=c[3].split('|'),otherCap=v=>CCAA.some(o=>o!==c&&o[3].split('|').map(fold).includes(fold(v))),otherCom=v=>CCAA.some(o=>o!==c&&[o[1],...(o[2]?o[2].split('|'):[])].map(fold).includes(fold(v)));
 if(t<.45&&c[0]!=='madrid')return{text:`Quina és la capital de la comunitat autònoma de <b>${c[1]}</b>?`,fields:[{label:'Capital',txt:caps,loose:true,wide:true}],vis:null,
  hints:['Pensa en la ciutat on hi ha el govern i el parlament de la comunitat.',`Comença per «${caps[0][0]}».`],steps:[`La capital de ${c[1]} és <b>${caps[0]}</b>.`],err:v=>otherCap(v[0])?'md_capital':null};
 if(t<.8&&c[0]!=='madrid')return{text:`De quina comunitat autònoma és capital <b>${caps[0]}</b>?`,fields:[{label:'Comunitat autònoma',txt:[c[1],...(c[2]?c[2].split('|'):[])],loose:true,wide:true}],vis:null,
  hints:['Mira el mapa polític d\'Espanya.',`Comença per «${c[1].replace(/^(La|Les|El|Els) /,'')[0]}».`],steps:[`${caps[0]} és la capital de <b>${c[1]}</b>.`],err:v=>otherCom(v[0])?'md_capital':null};
 const pr=c[4];return{text:`Quantes províncies té la comunitat autònoma de <b>${c[1]}</b>?`,fields:[{label:'Províncies',ans:R(pr)}],vis:null,
  hints:['Les comunitats amb una sola província tenen el mateix nom que la província (o gairebé).',`Capital: ${caps[0]}.`],steps:[`${c[1]} té <b>${pr}</b> ${pr===1?'província':'províncies'}.`,'Recorda: entre totes, Espanya té 50 províncies.']}}
SK.md_comunitats=lamSkill('esppol',{nom:'L\'organització territorial d\'Espanya',ab:'CA',errT:'md_capital',gen:md_comunitatsGen,pGen:.45,pBank:.3,
 teoria:['Espanya s\'organitza en tres tipus de territoris: <b>municipis</b>, <b>províncies</b> i <b>comunitats autònomes</b>.','El <b>municipi</b> és el territori d\'un poble o d\'una ciutat. El governa l\'<b>ajuntament</b>, amb el <b>batle</b> o la batlessa (alcalde) i els regidors, que trien els veïns. Hi ha més de 8.100 municipis.','Les <b>províncies</b> agrupen municipis. N\'hi ha <b>50</b>. Moltes les governa una <b>diputació</b>. A les Illes Balears, en lloc de diputació, cada illa té un <b>Consell Insular</b>.','Hi ha <b>17 comunitats autònomes</b> i <b>2 ciutats autònomes</b> (Ceuta i Melilla). Cada comunitat té el seu <b>Estatut d\'autonomia</b>, un <b>parlament</b> que fa lleis, un <b>govern</b> amb un president i una <b>capital</b>.','Algunes comunitats tenen <b>llengua pròpia</b> a més del castellà: el català (Catalunya, Illes Balears i Comunitat Valenciana, on en diuen valencià), el gallec (Galícia) i el basc o euskera (País Basc i part de Navarra). Mira el mapa:'],
 bank:mkBank([['Quantes comunitats autònomes té Espanya?','17|disset','Són més de 15 i menys de 20.','Espanya té <b>17 comunitats autònomes</b>.','19|50'],
  ['Quantes províncies té Espanya?','50|cinquanta','És un nombre rodó.','Espanya té <b>50 províncies</b>.','17|52'],
  ['Com es diuen les dues ciutats autònomes, al nord d\'Àfrica? Escriu-ne una.','Ceuta|Melilla','Són davant de les costes d\'Andalusia.','<b>Ceuta</b> i <b>Melilla</b> són ciutats autònomes.','Gibraltar|Tànger'],
  ['Quina institució governa un municipi?','ajuntament','El presideix el batle.','L\'<b>ajuntament</b> governa el municipi.','diputació|consell insular'],
  ['Com es diu la llei bàsica de cada comunitat autònoma?','Estatut d\'autonomia|Estatut','El de les Balears és de 1983.','Cada comunitat té el seu <b>Estatut d\'autonomia</b>.','Constitució'],
  ['Quina és la comunitat autònoma més gran d\'Espanya?','Castella i Lleó|Castilla y León','Té 9 províncies.','<b>Castella i Lleó</b> és la més extensa.','Andalusia|Castella-la Manxa'],
  ['Quina és la comunitat autònoma amb més habitants?','Andalusia|Andalucía','És al sud i té 8 províncies.','<b>Andalusia</b> té més de 8 milions d\'habitants.','Catalunya|Comunitat de Madrid'],
  ['Quina és la capital d\'Espanya?','Madrid','També és capital d\'una comunitat autònoma.','<b>Madrid</b> és la capital d\'Espanya.','Toledo'],
  ['Quina institució governa cada illa de les Balears?','Consell Insular|consell','N\'hi ha quatre: Mallorca, Menorca, Eivissa i Formentera.','Cada illa té un <b>Consell Insular</b>.','diputació|ajuntament'],
  ['Com es diu la llengua pròpia del País Basc?','basc|euskera','També se\'n diu euskera.','El <b>basc</b> o euskera és una llengua molt antiga.','gallec|català',1],
  ['Quantes comunitats autònomes estan formades per illes?','2|dues|dos','Una a la Mediterrània i una a l\'Atlàntic.','Les <b>Illes Balears</b> i les <b>Canàries</b>.','1|3',1]])});
Object.assign(ERR,{md_capital:{kid:'Compte! Aquesta és la capital (o el nom) d\'una altra comunitat autònoma. Mira bé el mapa polític.',par:'Confon les comunitats autònomes i les seves capitals'}});
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO==='function')IC.mountain=ICO('<path d="M2 20 9 7l4 6 3-4 6 11Z"/><path d="m7.5 10 1.5 2 1.5-2"/>')});
