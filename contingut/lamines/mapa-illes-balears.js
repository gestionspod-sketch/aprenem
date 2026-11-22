/* Aprenem - làmina interactiva: mapa de les Illes Balears (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   Contorns simplificats a partir de coordenades aproximades (longitud, latitud). */
const IBP=([lo,la])=>[Math.round(60+(lo-1.15)*215),Math.round(40+(40.12-la)*278)];
const IBpath=a=>'M'+a.map(p=>IBP(p).join(' ')).join(' L')+'Z';
const IB={
 mallorca:[[2.35,39.58],[2.40,39.62],[2.48,39.67],[2.55,39.71],[2.62,39.75],[2.69,39.79],[2.76,39.83],[2.84,39.86],[2.94,39.90],[3.05,39.93],[3.13,39.93],[3.21,39.96],[3.17,39.92],[3.10,39.90],[3.09,39.87],[3.15,39.88],[3.19,39.88],[3.12,39.84],[3.10,39.81],[3.12,39.76],[3.20,39.74],[3.30,39.75],[3.37,39.73],[3.45,39.74],[3.48,39.71],[3.44,39.66],[3.39,39.61],[3.36,39.55],[3.32,39.50],[3.27,39.43],[3.22,39.37],[3.14,39.32],[3.06,39.27],[3.00,39.30],[2.95,39.34],[2.86,39.36],[2.79,39.38],[2.76,39.46],[2.73,39.52],[2.66,39.56],[2.60,39.54],[2.55,39.52],[2.52,39.46],[2.47,39.48],[2.45,39.52],[2.40,39.53],[2.37,39.55]],
 menorca:[[3.83,40.00],[3.87,40.04],[3.95,40.06],[4.03,40.06],[4.09,40.09],[4.13,40.06],[4.20,40.04],[4.27,39.99],[4.31,39.93],[4.32,39.87],[4.25,39.82],[4.18,39.84],[4.08,39.88],[3.96,39.92],[3.86,39.92],[3.81,39.95]],
 eivissa:[[1.21,38.97],[1.30,39.01],[1.40,39.06],[1.47,39.10],[1.53,39.11],[1.60,39.07],[1.62,39.02],[1.56,38.98],[1.49,38.94],[1.45,38.90],[1.40,38.86],[1.38,38.83],[1.31,38.86],[1.24,38.87],[1.21,38.91]],
 formentera:[[1.38,38.73],[1.44,38.75],[1.48,38.72],[1.52,38.68],[1.58,38.67],[1.59,38.65],[1.52,38.65],[1.46,38.68],[1.40,38.65],[1.38,38.68]],
 cabrera:[[2.90,39.16],[2.96,39.17],[2.98,39.13],[2.94,39.12],[2.91,39.13]],
 dragonera:[[2.30,39.59],[2.34,39.60],[2.33,39.57],[2.30,39.57]]};
lamReg('illes',{nom:'Mapa de les Illes Balears',desc:'Illes, serres, ciutats i badies',ic:'island',skill:'md_illes',vb:'0 0 800 480',mw:720,fs:1.2,
 intro:'Toca cada lloc del mapa per saber-ne més coses.',llista:'Llocs del mapa',que:'el lloc',camp:'Nom del lloc',
 pregunta:'Quin lloc de les Illes Balears',recorda:'Gimnèsies: Mallorca, Menorca i Cabrera. Pitiüses: Eivissa i Formentera.',
 parts:{
  mallorca:{n:1,nom:'Mallorca',p:[457,190],l:[560,262],s:'r',f:'L\'illa més gran de l\'arxipèlag. Hi ha la Serra de Tramuntana, el Pla i les Serres de Llevant. La capital és Palma.',q:'és l\'illa més gran de l\'arxipèlag'},
  menorca:{n:2,nom:'Menorca',p:[683,92],l:[650,170],s:'r',f:'L\'illa més oriental (la primera on surt el sol). És Reserva de la Biosfera des de 1993 i té molts monuments talaiòtics. La capital és Maó.',q:'és l\'illa més oriental i Reserva de la Biosfera'},
  eivissa:{n:3,nom:'Eivissa',p:[105,352],l:[250,330],s:'r',f:'L\'illa més gran de les Pitiüses. La seva capital també es diu Eivissa (Vila). Dalt Vila és Patrimoni de la Humanitat.',q:'és l\'illa més gran de les Pitiüses'},
  formentera:{n:4,nom:'Formentera',p:[122,437],l:[250,440],s:'r',f:'L\'illa habitada més petita, al sud d\'Eivissa. La capital és Sant Francesc Xavier.',q:'és l\'illa habitada més petita, al sud d\'Eivissa'},
  cabrera:{n:5,nom:'Cabrera',p:[443,310],l:[560,330],s:'r',f:'Illa petita al sud de Mallorca. És Parc Nacional Maritimoterrestre des de 1991 i gairebé no hi viu ningú.',q:'és una illa petita al sud de Mallorca que és Parc Nacional'},
  tramuntana:{n:6,nom:'Serra de Tramuntana',a:'tramuntana|serra tramuntana',p:[376,152],l:[262,110],s:'l',f:'La serralada més alta de les Illes, al nord-oest de Mallorca. És Patrimoni Mundial de la UNESCO (paisatge cultural) des de 2011.',q:'és la serralada del nord-oest de Mallorca, Patrimoni Mundial'},
  puig:{n:7,nom:'Puig Major',p:[415,130],l:[330,60],s:'l',f:'La muntanya més alta de les Illes Balears (1.436 m), a la Serra de Tramuntana.',q:'és la muntanya més alta de les Illes Balears'},
  palma:{n:8,nom:'Palma',p:[382,193],l:[300,256],s:'l',f:'Capital de Mallorca i de la comunitat autònoma. És la ciutat més poblada de les Illes.',q:'és la capital de la comunitat autònoma'},
  mao:{n:9,nom:'Maó',p:[730,104],l:[760,176],s:'l',f:'Capital de Menorca. Té un dels ports naturals més grans de la Mediterrània.',q:'és la capital de Menorca'},
  ciutadella:{n:10,nom:'Ciutadella',p:[638,74],l:[560,40],s:'l',lv:1,f:'Ciutat de l\'oest de Menorca. Va ser la capital de l\'illa fins al segle XVIII.',q:'és la ciutat de l\'oest de Menorca, antiga capital de l\'illa'},
  alcudia:{n:11,nom:'Badia d\'Alcúdia',a:'alcúdia',p:[500,126],l:[570,140],s:'r',lv:1,f:'Gran badia del nord-est de Mallorca. Al costat hi ha el Parc Natural de s\'Albufera, una zona humida molt important per als ocells.',q:'és la badia del nord-est de Mallorca, al costat de s\'Albufera'},
  bpalma:{n:12,nom:'Badia de Palma',p:[393,222],l:[300,300],s:'l',lv:1,f:'Badia del sud de Mallorca, on hi ha la ciutat de Palma i el seu port.',q:'és la badia on hi ha la capital'},
  dragonera:{n:13,nom:'Sa Dragonera',a:'dragonera',p:[312,190],l:[240,194],s:'l',lv:1,f:'Illot allargat a l\'oest de Mallorca, davant Sant Elm. És Parc Natural.',q:'és l\'illot allargat de l\'oest de Mallorca'}},
 draw(H){const isl=(k,extra='')=>`<g ${H(k)}><path d="${IBpath(IB[k])}" fill="#EADBAA" stroke="#9C8450" stroke-width="2" stroke-linejoin="round"/>${extra}</g>`;
  const tr=[[2.40,39.60],[2.55,39.68],[2.70,39.76],[2.85,39.82],[3.02,39.88]].map(IBP);
  const dot=(k,lo,la)=>{const[x,y]=IBP([lo,la]);return`<g ${H(k)}><circle cx="${x}" cy="${y}" r="7" fill="#C0392B" stroke="#fff" stroke-width="2.5"/></g>`};
  const[px,py]=IBP([2.80,39.80]);
  return`<rect width="800" height="480" fill="#CFE8F7"/>
 <g ${H('alcudia')}><ellipse cx="503" cy="124" rx="22" ry="12" fill="#B4DAF2"/></g><g ${H('bpalma')}><ellipse cx="392" cy="224" rx="26" ry="13" fill="#B4DAF2"/></g>
 ${isl('mallorca')}${isl('menorca')}${isl('eivissa')}${isl('formentera')}${isl('cabrera')}${isl('dragonera')}
 <g ${H('tramuntana')}><path d="M${tr.map(p=>p.join(' ')).join(' L')}" fill="none" stroke="#8A6A3A" stroke-width="9" stroke-linecap="round" opacity=".55"/>${tr.slice(0,4).map(([x,y],i)=>`<path d="M${x+8} ${y+4} l9 -14 l9 14Z" fill="#8A6A3A"/>`).join('')}</g>
 <g ${H('puig')}><path d="M${px-11} ${py+8} L${px} ${py-12} L${px+11} ${py+8}Z" fill="#5C3D1E" stroke="#fff" stroke-width="1.5"/></g>
 ${dot('palma',2.65,39.57)}${dot('mao',4.26,39.89)}${dot('ciutadella',3.84,40.00)}
 <g font-size="13" font-style="italic" fill="#3B6E95" text-anchor="middle"><text x="620" y="400">Mar Mediterrània</text><text x="620" y="418">(mar Balear)</text></g>
 <g font-size="12" fill="#5B6B7B"><path d="M740 420 v-36" stroke="#5B6B7B" stroke-width="2"/><path d="M734 392 l6 -12 l6 12Z" fill="#5B6B7B"/><text x="740" y="440" text-anchor="middle" font-weight="700">N</text></g>`}});
SK.md_illes=lamSkill('illes',{nom:'Les Illes Balears: el territori',ab:'IB',errT:'md_illes',pBank:.5,
 teoria:['Les <b>Illes Balears</b> són un arxipèlag de la mar Mediterrània. Es divideixen en dos grups: les <b>Gimnèsies</b> (Mallorca, Menorca i Cabrera) i les <b>Pitiüses</b> (Eivissa i Formentera), a més de molts d\'illots.','<b>Mallorca</b> té tres grans zones de relleu: la <b>Serra de Tramuntana</b> al nord-oest (amb el <b>Puig Major</b>, 1.436 m, la muntanya més alta), el <b>Pla</b> al centre i les <b>Serres de Llevant</b> a l\'est.','<b>Menorca</b> és més plana; el punt més alt és el <b>Toro</b>. A <b>Eivissa</b>, el punt més alt és <b>sa Talaiassa</b>.','A les Illes no hi ha rius: hi ha <b>torrents</b>, que només duen aigua quan plou molt. També hi ha zones humides, com <b>s\'Albufera</b> de Mallorca i <b>ses Salines</b> d\'Eivissa i Formentera. El clima és <b>mediterrani</b>. Mira el mapa:'],
 bank:mkBank([['Com es diu el grup d\'illes format per Eivissa i Formentera?','Pitiüses','El nom ve dels pins (en grec).','Eivissa i Formentera són les <b>Pitiüses</b>, les «illes dels pins».','Gimnèsies'],
  ['Com es diu el grup d\'illes format per Mallorca, Menorca i Cabrera?','Gimnèsies','Comença per G.','Mallorca, Menorca i Cabrera són les <b>Gimnèsies</b>.','Pitiüses'],
  ['Quina és la capital de la comunitat autònoma de les Illes Balears?','Palma|Palma de Mallorca','És la ciutat més gran de Mallorca.','<b>Palma</b> és la capital de Mallorca i de tota la comunitat autònoma.','Maó|Eivissa|Ciutadella'],
  ['Quina és la capital de Menorca?','Maó','Té un port natural molt gran.','La capital de Menorca és <b>Maó</b>.','Ciutadella|Palma'],
  ['Quina és la capital de Formentera?','Sant Francesc Xavier|Sant Francesc','Duu el nom d\'un sant.','La capital de Formentera és <b>Sant Francesc Xavier</b>.','La Savina|Eivissa',1],
  ['Quina és la muntanya més alta de les Illes Balears?','Puig Major','És a la Serra de Tramuntana.','El <b>Puig Major</b> (1.436 m) és el cim més alt de les Illes.','Massanella|Toro|Puig de Massanella'],
  ['Quina serralada ocupa el nord-oest de Mallorca?','Serra de Tramuntana|Tramuntana','Té el nom d\'un vent del nord.','La <b>Serra de Tramuntana</b> és Patrimoni Mundial des de 2011.','Serres de Llevant|Llevant'],
  ['Quina serralada hi ha a l\'est de Mallorca?','Serres de Llevant|Serra de Llevant|Llevant','Llevant vol dir per on surt el sol.','Les <b>Serres de Llevant</b> són més baixes que la Tramuntana.','Serra de Tramuntana|Tramuntana',1],
  ['Com es diu la zona plana del centre de Mallorca?','Pla|el Pla|Pla de Mallorca','És al centre de l\'illa, entre la serra de Tramuntana i les serres de Llevant, i s\'hi conrea molt.','El <b>Pla de Mallorca</b> és una zona plana i agrícola.','Raiguer'],
  ['Com es diuen els cursos d\'aigua de les Illes que només duen aigua quan plou molt?','torrents|torrent','No són rius.','A les Illes no hi ha rius: hi ha <b>torrents</b>.','rius|riu'],
  ['Com es diu la muntanya més alta de Menorca?','Toro|el Toro|Monte Toro','Té nom d\'animal.','El <b>Toro</b> és el punt més alt de Menorca.','Puig Major',1],
  ['Com es diu la zona humida més gran de Mallorca, al costat de la badia d\'Alcúdia?','Albufera|s\'Albufera|Albufera de Mallorca','Hi viuen molts ocells.','<b>S\'Albufera</b> és un Parc Natural molt important per als ocells.','Salines|ses Salines',1],
  ['Quina illa de les Balears és Parc Nacional?','Cabrera','És al sud de Mallorca.','<b>Cabrera</b> és Parc Nacional Maritimoterrestre des de 1991.','Dragonera|Formentera',1]])});
Object.assign(ERR,{md_illes:{kid:'Compte! Has dit un altre lloc de les Illes. Mira bé el mapa: on és cada illa, cada serra i cada ciutat?',par:'Confon els llocs del mapa de les Illes Balears'}});
