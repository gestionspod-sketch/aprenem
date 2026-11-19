/* Aprenem - làmina interactiva: el cor i l'aparell circulatori (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js. */
lamReg('cor',{nom:'El cor',desc:'Cavitats, artèries i venes',ic:'heart',skill:'md_circulatori',vb:'-40 0 880 600',mw:700,fs:1.25,
 intro:'Toca cada part del cor. En blau, la sang pobra en oxigen; en vermell, la sang rica en oxigen.',llista:'Les parts del cor',camp:'Nom de la part',
 pregunta:'Quina part del cor',recorda:'Recorda: les aurícules són a dalt i reben la sang; els ventricles són a baix i l\'expulsen.',
 parts:{
  caves:{n:1,nom:'Venes caves',a:'vena cava|cava|caves',p:[288,96],l:[140,70],s:'l',f:'Porten al cor la sang pobra en oxigen que torna de tot el cos. Entren a l\'aurícula dreta.',q:'porten al cor la sang que torna de tot el cos'},
  apulmonar:{n:2,nom:'Artèria pulmonar',p:[214,96],l:[140,128],s:'l',f:'Surt del ventricle dret i porta la sang pobra en oxigen cap als pulmons, perquè hi agafi oxigen.',q:'porta la sang del ventricle dret cap als pulmons'},
  ad:{n:3,nom:'Aurícula dreta',p:[300,222],l:[140,222],s:'l',f:'Cavitat de dalt a la dreta del cor (a l\'esquerra del dibuix, perquè el miram de cara). Rep la sang de les venes caves.',q:'rep la sang de les venes caves'},
  valvules:{n:4,nom:'Vàlvules',a:'vàlvula',p:[312,293],l:[140,300],s:'l',lv:1,f:'Portetes que separen aurícules i ventricles. Només s\'obren cap a un costat, perquè la sang no torni enrere.',q:'són les portetes que impedeixen que la sang torni enrere'},
  vd:{n:5,nom:'Ventricle dret',p:[300,400],l:[140,410],s:'l',f:'Cavitat de baix a la dreta. Bombeja la sang cap als pulmons per l\'artèria pulmonar.',q:'bombeja la sang cap als pulmons'},
  aorta:{n:6,nom:'Artèria aorta',a:'aorta',p:[560,42],l:[640,40],s:'r',f:'L\'artèria més grossa del cos. Surt del ventricle esquerre i reparteix la sang rica en oxigen per tot el cos.',q:'és l\'artèria més grossa, que reparteix la sang per tot el cos'},
  vpulmonars:{n:7,nom:'Venes pulmonars',a:'vena pulmonar|pulmonars',p:[560,208],l:[640,170],s:'r',f:'Porten la sang rica en oxigen des dels pulmons fins a l\'aurícula esquerra.',q:'porten la sang rica en oxigen dels pulmons al cor'},
  ae:{n:8,nom:'Aurícula esquerra',p:[452,250],l:[640,250],s:'r',f:'Cavitat de dalt a l\'esquerra del cor. Rep la sang de les venes pulmonars.',q:'rep la sang de les venes pulmonars'},
  ve:{n:9,nom:'Ventricle esquerre',p:[445,400],l:[640,410],s:'r',f:'Cavitat de baix a l\'esquerra. Té la paret més gruixuda perquè ha d\'enviar la sang a tot el cos per l\'artèria aorta.',q:'té la paret més gruixuda i envia la sang a tot el cos'}},
 draw(H){return`<g ${H('apulmonar')}><path d="M342 300 V120 Q342 96 318 96 H190 M342 120 Q342 96 366 96 H570" fill="none" stroke="#3D6CC0" stroke-width="24"/></g>
 <g ${H('caves')}><rect x="270" y="60" width="36" height="104" fill="#4F7FD1" stroke="#2F5AA8" stroke-width="2"/><rect x="175" y="240" width="74" height="32" fill="#4F7FD1" stroke="#2F5AA8" stroke-width="2"/></g>
 <g ${H('vpulmonars')}><rect x="512" y="196" width="76" height="24" fill="#E06666" stroke="#A83232" stroke-width="2"/><rect x="512" y="238" width="76" height="24" fill="#E06666" stroke="#A83232" stroke-width="2"/></g>
 <g ${H('ad')}><rect x="245" y="160" width="125" height="125" rx="30" fill="#7DA6E8" stroke="#2F5AA8" stroke-width="3"/></g>
 <g ${H('ae')}><rect x="390" y="160" width="125" height="125" rx="30" fill="#EC8080" stroke="#A83232" stroke-width="3"/></g>
 <g ${H('vd')}><path d="M245 300 H370 V510 Q290 480 245 380 Z" fill="#4F7FD1" stroke="#2F5AA8" stroke-width="3"/></g>
 <g ${H('ve')}><path d="M390 300 H515 Q520 430 390 530 Z" fill="#D94B4B" stroke="#A83232" stroke-width="3"/></g>
 <g ${H('aorta')}><path d="M425 300 V95 Q425 40 510 40 Q600 40 600 120 V580" fill="none" stroke="#8E2420" stroke-width="30"/><path d="M425 300 V95 Q425 40 510 40 Q600 40 600 120 V580" fill="none" stroke="#C0392B" stroke-width="24"/></g>
 <g ${H('valvules')}><path d="M288 287 L307 301 L326 287 Z M433 287 L452 301 L471 287 Z" fill="#fff" stroke="#555" stroke-width="2"/></g>
 <g font-size="14" font-weight="700"><rect x="40" y="540" width="18" height="18" fill="#4F7FD1"/><text x="66" y="554" fill="#2F5AA8">Sang pobra en oxigen</text><rect x="250" y="540" width="18" height="18" fill="#D94B4B"/><text x="276" y="554" fill="#A83232">Sang rica en oxigen</text></g>`}});
// Pulsacions: comptam batecs durant uns segons i calculam els d'un minut
const md_pols=()=>{const s=pick([10,15,20,30]),k=60/s,b=rnd(Math.ceil(60/k),Math.floor(100/k)),r=b*k;
 return{text:`La Laia es pren el pols al canell i compta <b>${b} batecs en ${s} segons</b>. Quantes pulsacions per minut té?`,fields:[{label:'Pulsacions per minut',ans:R(r)}],vis:null,
  hints:['Un minut té 60 segons. Quantes vegades hi cap el temps que ha comptat?',`60 : ${s} = ${k}. Ara multiplica els batecs per ${k}.`],
  steps:[`Un minut són 60 segons, i 60 : ${s} = ${k}.`,`${b} × ${k} = ${r}.`,`Té <b>${r} pulsacions per minut</b> (un infant en repòs en té entre 70 i 100, més o menys).`],
  err:v=>r!==b*s&&req(v[0],R(b*s))?'md_pols':null}};
SK.md_circulatori=lamSkill('cor',{nom:'L\'aparell circulatori',ab:'Cr',errT:'md_circulatori',gen:md_pols,pGen:.2,
 teoria:['L\'<b>aparell circulatori</b> porta l\'oxigen i els nutrients a totes les cèl·lules i recull les substàncies de rebuig. Està format per la <b>sang</b>, els <b>vasos sanguinis</b> i el <b>cor</b>.','La sang té <b>plasma</b> (la part líquida), <b>glòbuls vermells</b> (porten l\'oxigen), <b>glòbuls blancs</b> (ens defensen dels microbis) i <b>plaquetes</b> (tapen les ferides).','Vasos sanguinis: les <b>artèries</b> porten la sang <b>des del</b> cor; les <b>venes</b> la porten <b>cap al</b> cor; els <b>capil·lars</b>, molt prims, les uneixen i arriben a totes les cèl·lules.','El <b>cor</b> és un múscul amb quatre cavitats: dues <b>aurícules</b> (a dalt) i dos <b>ventricles</b> (a baix). Hi ha dos circuits: la <b>circulació menor</b> (cor → pulmons → cor) i la <b>circulació major</b> (cor → tot el cos → cor). Mira la làmina:'],
 bank:mkBank([['Quins vasos sanguinis porten la sang des del cor cap a la resta del cos?','artèries|artèria','Surten del cor.','Les <b>artèries</b> surten del cor; les venes hi tornen.','venes|vena|capil·lars'],
  ['Quins vasos sanguinis porten la sang de tornada cap al cor?','venes|vena','Són el contrari de les artèries.','Les <b>venes</b> porten la sang cap al cor.','artèries|artèria|capil·lars'],
  ['Com es diuen els vasos sanguinis més prims, que arriben a totes les cèl·lules?','capil·lars|capil·lar','El seu nom ve de «cabell».','Els <b>capil·lars</b> són tan prims com un cabell i uneixen artèries i venes.','artèries|venes'],
  ['Quines cèl·lules de la sang porten l\'oxigen?','glòbuls vermells|glòbul vermell|hematies','Donen el color vermell a la sang.','Els <b>glòbuls vermells</b> porten l\'oxigen dels pulmons a tot el cos.','glòbuls blancs|plaquetes'],
  ['Quines cèl·lules de la sang ens defensen dels microbis?','glòbuls blancs|glòbul blanc|leucòcits','Són les defenses del cos.','Els <b>glòbuls blancs</b> lluiten contra els microbis.','glòbuls vermells|plaquetes'],
  ['Quines parts de la sang tapen les ferides perquè deixin de sagnar?','plaquetes|plaqueta','Formen una crosta.','Les <b>plaquetes</b> fan que la sang es coaguli i tapi la ferida.','glòbuls blancs|glòbuls vermells'],
  ['Com es diu la part líquida de la sang?','plasma','És groguenca i té molta aigua.','El <b>plasma</b> transporta els nutrients i les substàncies de rebuig.','sèrum'],
  ['Quantes cavitats té el cor?','4|quatre','Dues aurícules i dos ventricles.','El cor té <b>4 cavitats</b>: dues aurícules i dos ventricles.','2'],
  ['Com es diu el circuit de la sang que va del cor als pulmons i torna al cor?','circulació menor|menor|circulació pulmonar','És el circuit més curt.','La <b>circulació menor</b> porta la sang als pulmons perquè agafi oxigen.','circulació major|major',1],
  ['Com es diu el circuit de la sang que va del cor a tot el cos i torna al cor?','circulació major|major|circulació general','És el circuit més llarg.','La <b>circulació major</b> reparteix l\'oxigen i els nutrients per tot el cos.','circulació menor|menor',1],
  ['Com es diu el moviment del cor quan es contreu i expulsa la sang?','sístole','El contrari és la diàstole.','A la <b>sístole</b> el cor es contreu i expulsa la sang; a la <b>diàstole</b> es relaxa i s\'omple.','diàstole',1]])});
Object.assign(ERR,{md_circulatori:{kid:'Compte! Pensa cap on va la sang: surt del cor o hi torna? Va als pulmons o a tot el cos?',par:'Confon les parts del cor, els vasos sanguinis o els components de la sang'},
 md_pols:{kid:'Has de calcular els batecs d\'un minut sencer (60 segons): quantes vegades hi cap el temps que s\'ha comptat?',par:'No sap passar els batecs comptats en uns segons a pulsacions per minut'}});
