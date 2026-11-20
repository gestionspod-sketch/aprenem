/* Aprenem - làmina interactiva: l'esquelet i els músculs (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   Dibuix original i simplificat: esquelet de cara, figura amb els músculs principals i un braç (bíceps i tríceps).
   S'associa al tema md_locomotor (contingut/medi-natural-6.js), que conserva la seva clau de progrés. */
lamReg('locomotor',{nom:'L\'esquelet i els músculs',desc:'Ossos, músculs, tendons i articulacions',ic:'bone',vb:'0 0 1160 800',mw:820,fs:1.15,
 intro:'A l\'esquerra, els ossos principals; al mig, els músculs; a la dreta, com es mou el braç. Toca cada part.',llista:'Ossos i músculs',camp:'Nom',que:'l\'os o el múscul',
 pregunta:'Quin os o múscul',recorda:'L\'esquelet sosté i protegeix; els músculs es contreuen i estiren els ossos gràcies als tendons.',
 parts:{
  crani:{n:1,nom:'Crani',p:[214,62],l:[150,62],s:'l',f:'És la capsa d\'os del cap. Protegeix l\'encèfal. Les seves articulacions són fixes.',q:'protegeix l\'encèfal'},
  clavicula:{n:2,nom:'Clavícula',p:[214,146],l:[150,140],s:'l',lv:1,f:'Os llarg i prim que uneix l\'esternó amb l\'espatla.',q:'uneix l\'esternó amb l\'espatla'},
  costelles:{n:3,nom:'Costelles',a:'costella|caixa toràcica',p:[206,212],l:[150,210],s:'l',f:'Són 12 parells d\'ossos corbats que formen la caixa toràcica. Protegeixen el cor i els pulmons.',q:'protegeixen el cor i els pulmons'},
  humer:{n:4,nom:'Húmer',p:[184,232],l:[150,275],s:'l',f:'És l\'os del braç, entre l\'espatla i el colze.',q:'és l\'os del braç, entre l\'espatla i el colze'},
  radi:{n:5,nom:'Radi i cúbit',a:'radi|cúbit|cúbit i radi',p:[167,385],l:[150,380],s:'l',lv:1,f:'Són els dos ossos de l\'avantbraç, entre el colze i el canell.',q:'són els dos ossos de l\'avantbraç'},
  femur:{n:6,nom:'Fèmur',p:[225,530],l:[150,525],s:'l',f:'És l\'os de la cuixa. És l\'os més llarg i fort del cos.',q:'és l\'os de la cuixa, el més llarg del cos'},
  tibia:{n:7,nom:'Tíbia',a:'tíbia i peroné',p:[219,700],l:[150,690],s:'l',lv:1,f:'És l\'os gros de la cama, entre el genoll i el turmell. Al costat hi ha el peroné, més prim.',q:'és l\'os gros de la cama, entre el genoll i el turmell'},
  columna:{n:8,nom:'Columna vertebral',a:'columna|espinada|vèrtebres',p:[258,300],l:[400,300],s:'r',f:'Està formada per 33 o 34 vèrtebres. Sosté el cos i protegeix la medul·la espinal. Les articulacions entre vèrtebres són semimòbils.',q:'sosté el cos i protegeix la medul·la espinal'},
  pelvis:{n:9,nom:'Pelvis',a:'maluc|ossos del maluc',p:[290,425],l:[400,425],s:'r',f:'Ossos del maluc. Sostenen els òrgans de la panxa i uneixen la columna amb les cames.',q:'uneix la columna amb les cames i sosté els òrgans de la panxa'},
  rotula:{n:10,nom:'Ròtula',p:[287,622],l:[400,615],s:'r',lv:1,f:'Os petit i pla de la part de davant del genoll. El protegeix.',q:'és l\'os petit de davant del genoll'},
  deltoides:{n:11,nom:'Deltoides',p:[754,160],l:[815,150],s:'r',lv:1,f:'Múscul de l\'espatla. Aixeca el braç.',q:'és el múscul de l\'espatla que aixeca el braç'},
  pectorals:{n:12,nom:'Pectorals',a:'pectoral',p:[716,198],l:[815,210],s:'r',f:'Músculs del pit. Mouen els braços cap endavant (com quan fas una abraçada).',q:'són els músculs del pit'},
  abdominals:{n:13,nom:'Abdominals',a:'abdominal',p:[696,282],l:[815,285],s:'r',f:'Músculs de la panxa. Protegeixen els òrgans de dins i ens deixen doblegar el tronc.',q:'són els músculs de la panxa'},
  quadriceps:{n:14,nom:'Quàdriceps',p:[720,500],l:[815,470],s:'r',f:'Múscul gros de la part de davant de la cuixa. Estira la cama (per xutar, saltar, córrer).',q:'és el múscul de davant de la cuixa que estira la cama'},
  biceps:{n:15,nom:'Bíceps',p:[885,620],l:[1030,545],s:'r',f:'Múscul de la part de davant del braç. Quan es contreu (s\'escurça), doblega el colze.',q:'és el múscul de davant del braç que doblega el colze'},
  triceps:{n:16,nom:'Tríceps',p:[880,672],l:[1030,725],s:'r',f:'Múscul de la part de darrere del braç. Quan es contreu, estira el braç. Fa la feina contrària al bíceps.',q:'és el múscul de darrere del braç que l\'estira'},
  tendo:{n:17,nom:'Tendó',a:'tendons',p:[945,624],l:[1030,605],s:'r',f:'Cordó molt resistent que uneix un múscul amb un os. Quan el múscul es contreu, el tendó estira l\'os.',q:'uneix un múscul amb un os'},
  articulacio:{n:18,nom:'Articulació',a:'colze|articulació del colze',p:[940,656],l:[1030,665],s:'r',f:'Unió entre dos ossos (aquí, el colze). Les articulacions mòbils, com el colze o el genoll, permeten el moviment.',q:'és la unió entre dos ossos que permet el moviment'}},
 draw(H){const bn=(a,b,c,d,w=13)=>`<path d="M${a} ${b}L${c} ${d}" stroke="#B5A886" stroke-width="${w+4}" stroke-linecap="round"/><path d="M${a} ${b}L${c} ${d}" stroke="#F5F0E1" stroke-width="${w}" stroke-linecap="round"/>`;
  const rib=i=>{const y=170+i*20;return`<path d="M246 ${y}C214 ${y-6} 194 ${y+10} 200 ${y+28}M254 ${y}C286 ${y-6} 306 ${y+10} 300 ${y+28}" fill="none" stroke="#B5A886" stroke-width="8" stroke-linecap="round"/><path d="M246 ${y}C214 ${y-6} 194 ${y+10} 200 ${y+28}M254 ${y}C286 ${y-6} 306 ${y+10} 300 ${y+28}" fill="none" stroke="#F5F0E1" stroke-width="5" stroke-linecap="round"/>`};
  const vert=Array.from({length:18},(_,i)=>`<rect x="242" y="${128+i*15}" width="16" height="11" rx="3" fill="#F5F0E1" stroke="#B5A886" stroke-width="1.5"/>`).join('');
  const abd=[235,265,295,325].map(y=>`<rect x="657" y="${y}" width="21" height="26" rx="4"/><rect x="682" y="${y}" width="21" height="26" rx="4"/>`).join('');
  return`<g ${H('columna')}>${vert}</g><rect x="245" y="160" width="10" height="92" rx="4" fill="#F5F0E1" stroke="#B5A886" stroke-width="1.5"/>
 <g ${H('costelles')}>${[0,1,2,3,4,5].map(rib).join('')}</g>
 <g ${H('crani')}><ellipse cx="250" cy="72" rx="40" ry="48" fill="#F5F0E1" stroke="#B5A886" stroke-width="3"/><ellipse cx="236" cy="70" rx="9" ry="11" fill="#8D8065"/><ellipse cx="264" cy="70" rx="9" ry="11" fill="#8D8065"/><path d="M240 102h20M244 96v12M250 96v12M256 96v12" stroke="#8D8065" stroke-width="2"/></g>
 <g ${H('clavicula')}>${bn(250,150,192,142,8)}</g>${bn(250,150,308,142,8)}
 <g ${H('humer')}>${bn(192,150,175,300)}</g>${bn(308,150,325,300)}
 <g ${H('radi')}>${bn(172,306,160,440,8)}${bn(182,306,176,440,8)}</g>${bn(328,306,340,440,8)}${bn(318,306,324,440,8)}
 <circle cx="168" cy="462" r="14" fill="#F5F0E1" stroke="#B5A886" stroke-width="2"/><circle cx="332" cy="462" r="14" fill="#F5F0E1" stroke="#B5A886" stroke-width="2"/>
 <g ${H('pelvis')}><path d="M250 395C215 385 200 400 205 440C215 455 235 455 250 445C265 455 285 455 295 440C300 400 285 385 250 395Z" fill="#F5F0E1" stroke="#B5A886" stroke-width="3"/></g>
 <g ${H('femur')}>${bn(228,452,222,608,15)}</g>${bn(272,452,278,608,15)}
 <circle cx="222" cy="622" r="9" fill="#F5F0E1" stroke="#B5A886" stroke-width="2"/><g ${H('rotula')}><circle cx="278" cy="622" r="9" fill="#F5F0E1" stroke="#B5A886" stroke-width="2"/></g>
 <g ${H('tibia')}>${bn(220,636,218,750,11)}${bn(232,636,230,748,6)}</g>${bn(280,636,282,750,11)}${bn(268,636,270,748,6)}
 <text x="250" y="790" font-size="20" font-weight="800" text-anchor="middle" fill="#455A64">L'esquelet</text>
 <path d="M612 150 L585 400M748 150 L775 400" stroke="#FFAB91" stroke-width="28" stroke-linecap="round"/><path d="M652 425 L642 745M708 425 L718 745" stroke="#FFAB91" stroke-width="36" stroke-linecap="round"/>
 <circle cx="680" cy="80" r="40" fill="#FFCCBC" stroke="#E0A88A" stroke-width="2"/><rect x="664" y="112" width="32" height="30" fill="#FFCCBC"/>
 <path d="M622 140 L738 140 L760 200 L746 425 L614 425 L600 200Z" fill="#FFAB91" stroke="#E07A5F" stroke-width="2"/>
 <g ${H('deltoides')}><ellipse cx="608" cy="162" rx="22" ry="28" fill="#E57373" stroke="#B71C1C" stroke-width="2"/><ellipse cx="752" cy="162" rx="22" ry="28" fill="#E57373" stroke="#B71C1C" stroke-width="2"/></g>
 <g ${H('pectorals')}><ellipse cx="652" cy="196" rx="30" ry="24" fill="#EF5350" stroke="#B71C1C" stroke-width="2"/><ellipse cx="708" cy="196" rx="30" ry="24" fill="#EF5350" stroke="#B71C1C" stroke-width="2"/></g>
 <g ${H('abdominals')}><g fill="#E57373" stroke="#B71C1C" stroke-width="2">${abd}</g></g>
 <g ${H('quadriceps')}><ellipse cx="648" cy="505" rx="23" ry="62" fill="#E53935" stroke="#B71C1C" stroke-width="2"/><ellipse cx="712" cy="505" rx="23" ry="62" fill="#E53935" stroke="#B71C1C" stroke-width="2"/></g>
 <text x="680" y="790" font-size="20" font-weight="800" text-anchor="middle" fill="#455A64">Els músculs</text>
 <rect x="815" y="510" width="200" height="250" fill="#fff" stroke="#B0BEC5" stroke-width="2"/><text x="915" y="537" font-size="16" font-weight="700" text-anchor="middle" fill="#607D8B">El braç</text>
 ${bn(830,650,940,650,14)}${bn(940,650,985,565,10)}
 <g ${H('biceps')}><ellipse cx="885" cy="626" rx="48" ry="17" fill="#EF5350" stroke="#B71C1C" stroke-width="2"/></g>
 <g ${H('triceps')}><ellipse cx="880" cy="670" rx="46" ry="13" fill="#C62828" stroke="#7F0000" stroke-width="2"/></g>
 <g ${H('tendo')}><path d="M930 622 L956 620" stroke="#ECEFF1" stroke-width="7" stroke-linecap="round"/><path d="M930 622 L956 620" stroke="#90A4AE" stroke-width="2"/></g>
 <g ${H('articulacio')}><circle cx="940" cy="652" r="12" fill="#FFF8E1" stroke="#8D6E63" stroke-width="3"/></g>`}});
lamWrap('locomotor','md_locomotor',{gen:SK.md_locomotor.gen,pGen:.25});
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO==='function')IC.bone=ICO('<path d="M7 4a2 2 0 0 0-3 3 2 2 0 0 0 3 3l7 7a2 2 0 0 0 3 3 2 2 0 0 0 3-3 2 2 0 0 0-3-3L10 7a2 2 0 0 0-3-3Z"/>')});
