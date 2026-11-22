/* Aprenem - làmina interactiva: la cèl·lula animal i la vegetal (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js. */
lamReg('cellula',{nom:'La cèl·lula',desc:'Cèl·lula animal i vegetal',ic:'cell',skill:'md_cellula',vb:'0 0 660 760',mw:520,
 intro:'Compara una cèl·lula animal i una de vegetal. Toca cada part per saber què fa.',llista:'Les parts de la cèl·lula',camp:'Nom de la part',
 pregunta:'Quina part de la cèl·lula',recorda:'Totes les cèl·lules tenen membrana, citoplasma i material genètic. Les vegetals, a més, tenen paret i cloroplasts.',
 parts:{
  membrana:{n:1,nom:'Membrana cel·lular',a:'membrana|membrana plasmàtica',p:[216,166],l:[170,130],s:'l',f:'Capa prima que envolta la cèl·lula i controla què hi entra i què en surt.',q:'envolta la cèl·lula i controla què hi entra i què en surt'},
  citoplasma:{n:2,nom:'Citoplasma',p:[270,188],l:[170,184],s:'l',f:'Líquid gelatinós de l\'interior de la cèl·lula, on hi ha els orgànuls.',q:'és el líquid gelatinós de dins la cèl·lula, on hi ha els orgànuls'},
  nucli:{n:3,nom:'Nucli',p:[350,220],l:[170,238],s:'l',f:'Conté el material genètic (ADN), amb les instruccions per al funcionament de la cèl·lula. En dirigeix l\'activitat.',q:'conté el material genètic i dirigeix l\'activitat de la cèl·lula'},
  mitocondris:{n:4,nom:'Mitocondris',a:'mitocondri',p:[280,270],l:[170,292],s:'l',lv:1,f:'Orgànuls que obtenen l\'energia dels nutrients gràcies a l\'oxigen (respiració cel·lular). Són les «centrals d\'energia» de la cèl·lula.',q:'obtenen l\'energia dels nutrients'},
  paret:{n:5,nom:'Paret cel·lular',a:'paret',p:[492,530],l:[540,500],s:'r',f:'Coberta rígida que només tenen les cèl·lules vegetals (i les dels fongs). Dona forma i protegeix la cèl·lula.',q:'és la coberta rígida que només tenen les cèl·lules vegetals'},
  vacuola:{n:6,nom:'Vacúola',a:'vacúoles',p:[410,590],l:[540,580],s:'r',f:'Bossa que guarda aigua i altres substàncies. A les cèl·lules vegetals és molt grossa.',q:'és la bossa que guarda aigua i substàncies, molt grossa a les cèl·lules vegetals'},
  cloroplasts:{n:7,nom:'Cloroplasts',a:'cloroplast',p:[450,675],l:[540,660],s:'r',f:'Orgànuls verds amb clorofil·la, on es fa la fotosíntesi. Només els tenen les cèl·lules vegetals.',q:'tenen clorofil·la i hi fan la fotosíntesi'}},
 draw(H){const mito=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="24" ry="12" fill="#F08A5D" stroke="#B5532A" stroke-width="2"/><path d="M-16 0 q4 -8 8 0 t8 0 t8 0 t8 0" fill="none" stroke="#B5532A" stroke-width="1.5"/></g>`;
  const clo=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="17" ry="9" fill="#4E9A2E" stroke="#2E6B19" stroke-width="1.5"/><path d="M-10 0h20M-6 -4v8M0 -5v10M6 -4v8" stroke="#8CCB5E" stroke-width="1.2"/></g>`;
  return`<g transform="translate(60 -30)"><g ${H('membrana')}><ellipse cx="300" cy="230" rx="150" ry="120" fill="none" stroke="#D08A4A" stroke-width="7"/></g>
 <g ${H('citoplasma')}><ellipse cx="300" cy="230" rx="146" ry="116" fill="#FCE4C8"/></g>
 <g ${H('mitocondris')}>${mito(380,185,-25)}${mito(220,300,20)}${mito(390,290,35)}</g>
 <g ${H('nucli')}><circle cx="290" cy="225" r="40" fill="#B58AD6" stroke="#7B4FA8" stroke-width="3"/><circle cx="298" cy="218" r="12" fill="#7B4FA8"/></g><text x="300" y="400" font-size="18" font-weight="700" text-anchor="middle" fill="#B5532A">Cèl·lula animal</text></g><g transform="translate(-290 340)">
 <g ${H('paret')}><rect x="520" y="100" width="260" height="260" fill="#B8D98F" stroke="#5E8C31" stroke-width="4"/></g>
 <rect x="532" y="112" width="236" height="236" fill="#E8F5D8" stroke="#8DBB5A" stroke-width="3"/>
 <g ${H('vacuola')}><rect x="610" y="150" width="140" height="160" rx="30" fill="#CFE6F7" stroke="#6A9FCB" stroke-width="2.5"/></g>
 <circle cx="575" cy="170" r="30" fill="#B58AD6" stroke="#7B4FA8" stroke-width="3"/><circle cx="582" cy="164" r="9" fill="#7B4FA8"/>
 <g ${H('cloroplasts')}>${clo(565,250,70)}${clo(570,320,-20)}${clo(650,335,10)}${clo(740,335,-10)}${clo(755,128,15)}</g>
 <text x="650" y="400" font-size="18" font-weight="700" text-anchor="middle" fill="#3F7A2B">Cèl·lula vegetal</text></g>`}});
SK.md_cellula=lamSkill('cellula',{nom:'La cèl·lula',ab:'Cè',errT:'md_cellula',
 teoria:['Tots els éssers vius estan formats per <b>cèl·lules</b>: són la unitat més petita amb vida. Només es poden veure amb el <b>microscopi</b>.','Hi ha éssers <b>unicel·lulars</b> (d\'una sola cèl·lula, com els bacteris) i <b>pluricel·lulars</b> (de moltes cèl·lules, com les persones, que en tenim milions de milions).','Parts de totes les cèl·lules: <b>membrana</b> (l\'envolta), <b>citoplasma</b> (l\'interior, amb orgànuls com els <b>mitocondris</b>) i <b>material genètic</b>, que sovint és dins el <b>nucli</b>.','La <b>cèl·lula vegetal</b> té, a més, <b>paret cel·lular</b>, <b>cloroplasts</b> (per fer la fotosíntesi) i una <b>vacúola</b> molt grossa.','Nivells d\'organització: <b>cèl·lula → teixit → òrgan → aparell o sistema → organisme</b>. Mira la làmina:'],
 bank:mkBank([['Com es diu la unitat més petita que té vida?','cèl·lula|cèl·lules','Tots els éssers vius n\'estan formats.','La <b>cèl·lula</b> és la unitat bàsica de tots els éssers vius.','teixit|òrgan'],
  ['Quin aparell feim servir per veure les cèl·lules?','microscopi','Fa veure les coses molt més grosses.','El <b>microscopi</b> augmenta la imatge centenars de vegades.','lupa|telescopi'],
  ['Com es diuen els éssers vius formats per una sola cèl·lula?','unicel·lulars|unicel·lular','«Uni» vol dir un.','Els bacteris o les amebes són <b>unicel·lulars</b>.','pluricel·lulars|pluricel·lular'],
  ['Com es diuen els éssers vius formats per moltes cèl·lules?','pluricel·lulars|pluricel·lular','«Pluri» vol dir molts.','Les plantes i els animals som <b>pluricel·lulars</b>.','unicel·lulars|unicel·lular'],
  ['Com es diu un grup de cèl·lules iguals que fan la mateixa feina?','teixit|teixits','Per exemple, el muscular o l\'ossi.','Un <b>teixit</b> és un conjunt de cèl·lules semblants que fan la mateixa funció.','òrgan|aparell'],
  ['Com es diu el conjunt de teixits que fan una feina concreta, com el cor o l\'estómac?','òrgan|òrgans','El cor n\'és un.','Un <b>òrgan</b> està format per diversos teixits.','teixit|aparell'],
  ['Quin és el nivell d\'organització que va després de l\'òrgan?','aparell|sistema|aparell o sistema','Per exemple, el digestiu o el respiratori: hi treballen diversos òrgans junts.','Diversos òrgans que treballen junts formen un <b>aparell</b> o <b>sistema</b>.','teixit|organisme'],
  ['Quines són les tres funcions vitals de tots els éssers vius? Escriu la que serveix per tenir descendents.','reproducció','Les tres són nutrició, relació i...','Les funcions vitals són <b>nutrició</b>, <b>relació</b> i <b>reproducció</b>.','nutrició|relació'],
  ['Quina funció vital ens permet captar el que passa al nostre voltant i respondre-hi?','relació','Hi participen els sentits i el sistema nerviós.','La funció de <b>relació</b> ens permet notar els canvis i reaccionar.','nutrició|reproducció'],
  ['Quin científic anglès va veure per primera vegada les cèl·lules, en un tros de suro, l\'any 1665?','Robert Hooke|Hooke','El seu cognom comença per H.','<b>Robert Hooke</b> va veure unes «celletes» al suro i les va anomenar cèl·lules.','',1],
  ['Quina molècula del nucli porta la informació genètica?','ADN|àcid desoxiribonucleic','Són tres lletres.','L\'<b>ADN</b> conté les instruccions per formar i fer funcionar l\'ésser viu.','',1]])});
Object.assign(ERR,{md_cellula:{kid:'Compte! Aquesta part de la cèl·lula té una altra funció. Recorda també quines parts només tenen les cèl·lules vegetals.',par:'Confon les parts de la cèl·lula o els nivells d\'organització'}});
