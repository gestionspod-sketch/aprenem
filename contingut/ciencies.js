/* Aprenem - contingut de CIENCIES NATURALS
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ===================== CIÈNCIES NATURALS ===================== */
const art=s=>s.replace(/^(el|la|els|les|un|una|uns|unes) /,'').replace(/^l'/,'');
const fold=s=>art(norm(s)).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/·/g,'').replace(/\s*(°\s*c?|graus( centigrads)?)$/,'').trim();
const cap=s=>s[0].toUpperCase()+s.slice(1);
// banc: [pregunta, respostes 'a|b', pista, explicació, confusions típiques 'x|y', nivell]
const mkBank=a=>a.map(([q,ans,h,ex,c,lv])=>({q,a:ans.split('|'),h,ex,c:(c||'').split('|').filter(Boolean),lv:lv||0}));
function qProb(it,errT){const a=it.a[0],w=a.split(' ').length;
 return{text:esc(it.q),fields:[{label:'Resposta',txt:it.a,loose:true,wide:true}],vis:null,
  hints:[it.h||'Rellegeix la teoria del tema.',/^\d/.test(a)?`És un nombre ${a.length===1?'d\'una xifra':`de ${a.length} xifres`}.`:`Comença per «${a[0].toUpperCase()}»${w>1?` i té ${w} paraules`:` i té ${[...a.replace(/·/g,'')].length} lletres`}.`],
  steps:[it.ex||it.h||'Repassa la teoria.',`Resposta: <b>${esc(a)}</b>.`],
  err:v=>errT&&it.c.map(fold).includes(fold(v[0]))?errT:null}}
const bankSkill=(nom,ic,errT,teoria,bank)=>({mat:'ciencies',nom,ic,teoria,bank,gen(lv){return qProb(pick(bank.filter(q=>lv>0||!q.lv)),errT)}});
const CHAINS=[['herba','conill','guilla','àguila'],['algues','peix petit','tonyina','tauró'],['blat','ratolí','serp','àguila'],['fulles','eruga','pardal','falcó'],['plàncton','gamba','peix','gavina'],['herba','saltamartí','granota','serp'],['pi','processionària','mallerenga']];
const ROLES=[['productor','productors'],['consumidor primari','herbívor','primari'],['consumidor secundari','secundari'],['consumidor terciari','terciari']];
const TRANS=[['sòlid','líquid','fusió',[],'Un glaçó de gel es fon dins el got'],['líquid','sòlid','solidificació',[],'Posam aigua al congelador i es converteix en gel'],['líquid','gas','vaporització',['evaporació','ebullició'],'L\'aigua d\'un bassal desapareix amb la calor del sol'],['gas','líquid','condensació',[],'Després de la dutxa, el mirall del bany s\'omple de gotetes'],['sòlid','gas','sublimació',[],'Les boles de naftalina de l\'armari van desapareixent sense fer-se líquides',1]];
const ESTATS=[['una pedra','sòlid'],['l\'oli','líquid'],['l\'aire','gas'],['el vapor d\'aigua','gas'],['el gel','sòlid'],['la llet','líquid'],['la fusta','sòlid'],['l\'aigua de la mar','líquid']];
const VERT=[['el gat','mamífer','té pèl i les cries mamen llet'],['el dofí','mamífer','encara que viu a la mar, respira amb pulmons i alleta les cries',1],['el ratpenat','mamífer','encara que vola, té pèl i alleta les cries',1],['la balena','mamífer','respira amb pulmons i alleta les cries',1],['l\'àguila','au','té plomes i bec i pon ous'],['el pingüí','au','encara que no vola, té plomes i bec i pon ous',1],['la gallina','au','té plomes i bec i pon ous'],['la sargantana','rèptil','té escates i respira amb pulmons'],['la tortuga','rèptil','té escates i closca i respira amb pulmons'],['la serp','rèptil','té escates i respira amb pulmons'],['el cocodril','rèptil','té escates dures i respira amb pulmons'],['la granota','amfibi','té la pell nua i humida, i de petita (capgròs) viu dins l\'aigua'],['la salamandra','amfibi','té la pell nua i humida',1],['el ferreret','amfibi','només viu a Mallorca i té la pell nua i humida',1],['la tonyina','peix','té aletes i escates i respira amb brànquies'],['el tauró','peix','té aletes i respira amb brànquies',1],['el cavall de mar','peix','té aletes i respira amb brànquies',1]];
const GRP={'mamífer':['mamífer','mamífers'],'au':['au','aus','ocell','ocells'],'rèptil':['rèptil','rèptils'],'amfibi':['amfibi','amfibis'],'peix':['peix','peixos']};
const INV=[['la papallona','insecte','té sis potes i el cos dividit en cap, tòrax i abdomen'],['la formiga','insecte','té sis potes i el cos dividit en cap, tòrax i abdomen'],['l\'abella','insecte','té sis potes i ales'],['l\'aranya','aràcnid','té vuit potes'],['l\'escorpí','aràcnid','té vuit potes'],['el pop','mol·lusc','té el cos tou'],['el caragol','mol·lusc','té el cos tou i una closca'],['el cranc','crustaci','té una closca dura i deu potes'],['la gamba','crustaci','té una closca prima i deu potes'],['l\'estrella de mar','equinoderm','té forma d\'estrella i la pell amb espines']];
const IGRP={'insecte':['insecte','insectes'],'aràcnid':['aràcnid','aràcnids'],'mol·lusc':['mol·lusc','mol·luscs'],'crustaci':['crustaci','crustacis'],'equinoderm':['equinoderm','equinoderms']};
const otherGroup=(G,g,x)=>Object.entries(G).some(([k,a])=>k!==g&&a.map(fold).includes(fold(x)));
Object.assign(SK,{
 ci_cos:bankSkill('El cos humà','🫀','ci_organs',
  ['El cos humà funciona gràcies a diversos <b>aparells i sistemes</b> que treballen junts.','<b>Digestiu</b> (estómac, intestins): transforma els aliments en nutrients. <b>Respiratori</b> (pulmons): agafa l\'oxigen de l\'aire. <b>Circulatori</b> (cor, vasos sanguinis): porta la sang per tot el cos. <b>Excretor</b> (ronyons): elimina substàncies de rebuig.','<b>Sistema nerviós</b> (cervell, nervis): controla el cos. <b>Aparell locomotor</b> (ossos i músculs): ens permet moure\'ns.'],
  mkBank([['Quin òrgan bombeja la sang per tot el cos?','cor','Pertany a l\'aparell circulatori i batega.','El <b>cor</b> és un múscul que bombeja la sang per les artèries i les venes.','pulmons|pulmo'],
   ['En quins òrgans entra l\'aire que respiram i s\'agafa l\'oxigen?','pulmons|pulmó','Pertanyen a l\'aparell respiratori.','Als <b>pulmons</b>, l\'oxigen de l\'aire passa a la sang i el diòxid de carboni en surt.','cor'],
   ['Quin òrgan controla tot el cos i ens permet pensar?','cervell|encèfal','És la part principal del sistema nerviós i està protegit pel crani.','El <b>cervell</b> rep la informació dels sentits i dona ordres als músculs.','cor'],
   ['Quins òrgans filtren la sang i fabriquen l\'orina?','ronyons|ronyó','Pertanyen a l\'aparell excretor.','Els <b>ronyons</b> netegen la sang i les substàncies de rebuig surten amb l\'orina.','fetge|bufeta'],
   ['Quin aparell transforma els aliments en nutrients?','aparell digestiu|digestiu|sistema digestiu','Hi participen la boca, l\'estómac i els intestins.','L\'<b>aparell digestiu</b> transforma els aliments en nutrients que passen a la sang.','aparell respiratori|respiratori|aparell circulatori|circulatori'],
   ['Quin aparell porta la sang per tot el cos?','aparell circulatori|circulatori|sistema circulatori','Hi participen el cor i els vasos sanguinis.','L\'<b>aparell circulatori</b> reparteix l\'oxigen i els nutrients per tot el cos.','aparell respiratori|respiratori|aparell digestiu|digestiu'],
   ['Quin aparell està format pels ossos i els músculs?','aparell locomotor|locomotor','Ens permet moure\'ns.','L\'<b>aparell locomotor</b> està format per l\'esquelet (ossos) i els músculs.',''],
   ['Quin gas agafam de l\'aire quan respiram?','oxigen','És el gas que necessiten les cèl·lules.','Respiram per agafar <b>oxigen</b> i expulsar diòxid de carboni.','diòxid de carboni|co2'],
   ['Quin sentit feim servir amb la llengua?','gust','Ens diu si una cosa és dolça, salada, àcida o amarga.','Amb la llengua notam els sabors: és el sentit del <b>gust</b>.','tacte'],
   ['On es fa la major part de la digestió i s\'absorbeixen els nutrients?','intestí prim|intestí','És un tub molt llarg que hi ha després de l\'estómac.','A l\'<b>intestí prim</b> els nutrients passen a la sang.','estómac|estomac',1],
   ['Quins vasos sanguinis porten la sang des del cor cap a la resta del cos?','artèries|artèria','Les venes fan el camí contrari.','Les <b>artèries</b> surten del cor; les venes hi tornen.','venes|vena',1],
   ['Quants ossos té aproximadament el cos d\'una persona adulta?','206','Són més de 200.','Un adult té <b>206</b> ossos. Els infants en tenen més, perquè alguns s\'uneixen en créixer.','',1],
   ['Quin és l\'òrgan més gran del cos, que el cobreix tot?','pell','És l\'òrgan del sentit del tacte.','La <b>pell</b> ens protegeix i ens permet sentir el tacte, el fred i la calor.','',1]])),
 ci_plantes:bankSkill('Les plantes','🌱','ci_plantes',
  ['Les plantes són éssers vius <b>autòtrofs</b>: fabriquen el seu propi aliment.','Fan la <b>fotosíntesi</b>: amb la <b>llum del sol</b>, l\'<b>aigua</b> i el <b>diòxid de carboni</b> de l\'aire fabriquen el seu aliment i alliberen <b>oxigen</b>.','Parts de la planta: l\'<b>arrel</b> absorbeix aigua i sals minerals; la <b>tija</b> les transporta; les <b>fulles</b> fan la fotosíntesi; la <b>flor</b> serveix per reproduir-se.'],
  mkBank([['Com es diu el procés amb què les plantes fabriquen el seu aliment gràcies a la llum del sol?','fotosíntesi','La paraula comença amb «foto», que vol dir llum.','La <b>fotosíntesi</b> passa a les fulles, gràcies a la clorofil·la.','respiració|respiracio'],
   ['Quin gas alliberen les plantes quan fan la fotosíntesi?','oxigen','És el gas que nosaltres necessitam per respirar.','Les plantes alliberen <b>oxigen</b>: per això són tan importants per a la vida.','diòxid de carboni|co2'],
   ['Quin gas agafen les plantes de l\'aire per fer la fotosíntesi?','diòxid de carboni|CO2','És el gas que nosaltres expulsam en respirar.','Les plantes absorbeixen <b>diòxid de carboni</b> (CO₂) i alliberen oxigen.','oxigen'],
   ['Quina part de la planta absorbeix l\'aigua i les sals minerals de la terra?','arrel|arrels','Està davall terra.','L\'<b>arrel</b> fixa la planta a terra i n\'absorbeix l\'aigua i les sals minerals.','tija|fulles|fulla'],
   ['Quina part de la planta fa la fotosíntesi?','fulles|fulla','Són verdes i reben molta llum.','Les <b>fulles</b> tenen clorofil·la i hi fan la fotosíntesi.','arrel|flor|tija'],
   ['Quina part de la planta la sosté dreta i transporta l\'aigua?','tija|tronc','En els arbres és dura i es diu tronc.','La <b>tija</b> (o el tronc) sosté la planta i transporta la saba.','arrel'],
   ['Quina part de la planta serveix per reproduir-se i després forma el fruit?','flor|flors','Sovint és de colors i atreu les abelles.','La <b>flor</b> és l\'òrgan reproductor; després es converteix en fruit amb llavors.','fruit|llavor'],
   ['Com es diu la substància verda de les fulles que capta la llum?','clorofil·la','Dona el color verd a les plantes.','La <b>clorofil·la</b> capta la llum del sol per fer la fotosíntesi.','',1],
   ['Com es diuen els éssers vius que fabriquen el seu propi aliment?','autòtrofs|autòtrof','«Auto» vol dir un mateix.','Les plantes són <b>autòtrofes</b>; els animals som heteròtrofs.','heteròtrofs|heterotrof',1],
   ['Com es diu el transport del pol·len d\'una flor a una altra?','pol·linització','Les abelles i el vent hi ajuden.','La <b>pol·linització</b> permet que la flor formi el fruit i les llavors.','fecundació|germinació',1],
   ['Com es diu el moment en què una llavor comença a créixer i treu l\'arrel?','germinació','Necessita aigua, aire i una temperatura adequada.','La <b>germinació</b> és el naixement d\'una nova planta a partir d\'una llavor.','pol·linització',1]])),
 ci_ecosis:{mat:'ciencies',nom:'Ecosistemes i cadenes tròfiques',ic:'🦊',
  teoria:['Un <b>ecosistema</b> està format pels éssers vius i el medi on viuen (aigua, terra, clima...).','Una <b>cadena tròfica</b> mostra qui menja qui. La fletxa vol dir «és menjat per»: herba → conill → guilla.','<b>Productors</b>: plantes i algues (fan la fotosíntesi). <b>Consumidors primaris</b>: herbívors que mengen productors. <b>Consumidors secundaris</b>: carnívors que mengen herbívors. <b>Terciaris</b>: mengen altres carnívors. Els <b>descomponedors</b> (fongs i bacteris) transformen les restes en sals minerals.'],
  gen(){const ch=pick(CHAINS),i=rnd(0,ch.length-1),chs=`<b>${ch.join(' → ')}</b>`,role=i===0?'el productor':'el '+ROLES[i][0];
   const paint={kind:'order',items:[...ch].sort(()=>Math.random()-.5),target:ch,label:'Ordena aquesta cadena tròfica: toca primer el <b>productor</b>, després qui se\'l menja, i així successivament.',follow:{q:'Qui és el <b>consumidor primari</b> d\'aquesta cadena?',txt:[ch[1]]}};
   const st=[`La fletxa vol dir «és menjat per». El primer, «${ch[0]}», és el productor.`,`Després venen els consumidors per ordre: primari, secundari${ch.length>3?', terciari':''}.`,`«${ch[i]}» està a la posició ${i+1}: és ${role}.`];
   if(Math.random()<.5)return{text:`Cadena tròfica: ${chs}<br>Quin paper té «${ch[i]}»?`,fields:[{label:'Paper (productor, consumidor...)',txt:ROLES[i],loose:true,wide:true}],vis:null,paint,
    hints:['El primer de la cadena fabrica el seu aliment; els altres són consumidors (primari, secundari...).',i===0?'Fa la fotosíntesi.':`Està a la posició ${i+1}: és el consumidor número ${i}.`],steps:st,
    err:v=>ROLES.some((r,j)=>j!==i&&r.map(fold).includes(fold(v[0])))?'ci_cadena':null};
   return{text:`Cadena tròfica: ${chs}<br>Qui és ${role}?`,fields:[{label:'Ésser viu',txt:[ch[i]],loose:true,wide:true}],vis:null,paint,
    hints:['Recorda: la fletxa vol dir «és menjat per». Compta des del principi.',i===0?'És qui fa la fotosíntesi.':`El consumidor ${['','primari','secundari','terciari'][i]} és a la posició ${i+1}.`],steps:st,
    err:v=>ch.some((x,j)=>j!==i&&fold(x)===fold(v[0]))?'ci_cadena':null};
  }},
 ci_materia:{mat:'ciencies',nom:'La matèria i els canvis d\'estat',ic:'🧊',
  teoria:['La matèria pot estar en tres <b>estats</b>: <b>sòlid</b> (té forma pròpia), <b>líquid</b> (s\'adapta al recipient) i <b>gas</b> (ocupa tot l\'espai).','Canvis d\'estat: <b>fusió</b> (sòlid → líquid), <b>solidificació</b> (líquid → sòlid), <b>vaporització</b> (líquid → gas; si és lenta, <b>evaporació</b>), <b>condensació</b> (gas → líquid), <b>sublimació</b> (sòlid → gas).','L\'aigua es congela a <b>0 °C</b> i bull a <b>100 °C</b> (a nivell de la mar).'],
  gen(lv){const r=Math.random();
   if(r<.5){const t=pick(TRANS.filter(x=>lv>0||!x[5])),inv=TRANS.find(x=>x[0]===t[1]&&x[1]===t[0]),ctx=Math.random()<.5;
    return{text:ctx?`${t[4]}.<br>Quin canvi d'estat és?`:`Com es diu el pas de l'estat <b>${t[0]}</b> a l'estat <b>${t[1]}</b>?`,fields:[{label:'Canvi d\'estat',txt:[t[2],...t[3]],loose:true,wide:true}],vis:null,
     hints:[ctx?'De quin estat surt i a quin estat arriba?':'Repassa la llista de canvis d\'estat de la teoria.',`És el pas de ${t[0]} a ${t[1]}. Comença per «${t[2][0].toUpperCase()}».`],
     steps:[`La matèria passa de ${t[0]} a ${t[1]}.`,`Aquest canvi s'anomena <b>${t[2]}</b>.`,...(inv?[`El canvi contrari (de ${inv[0]} a ${inv[1]}) és la ${inv[2]}.`]:[])],
     err:v=>inv&&fold(v[0])===fold(inv[2])?'ci_canvis':null}}
   if(r<.8){const[x,e]=pick(ESTATS),why=e==='sòlid'?'té forma pròpia':e==='líquid'?'no té forma pròpia: s\'adapta al recipient':'ocupa tot l\'espai disponible';
    return{text:`En quin estat es troba ${x} a temperatura ambient?`,fields:[{label:'Estat',txt:e==='gas'?['gas','gasós']:[e],loose:true}],vis:null,
     hints:['Té forma pròpia? S\'adapta al recipient? Ocupa tot l\'espai?',`Comença per «${e[0].toUpperCase()}».`],steps:[`${cap(x)} ${why}.`,`Per tant, està en estat <b>${e}</b>.`]}}
   const bull=Math.random()<.5;
   return{text:`A quants graus centígrads ${bull?'bull':'es congela'} l'aigua (a nivell de la mar)?`,fields:[{label:'Graus (°C)',txt:[bull?'100':'0'],loose:true}],vis:null,
    hints:[bull?'És un nombre rodó i força alt.':'És el nombre més petit que no és negatiu.',bull?'Té tres xifres.':'Té una sola xifra.'],
    steps:[bull?'L\'aigua passa de líquid a gas (bull) a <b>100 °C</b>.':'L\'aigua passa de líquid a sòlid (es congela) a <b>0 °C</b>.','Recorda: 0 °C → gel · 100 °C → bull.']}
  }},
 ci_classif:{mat:'ciencies',nom:'Classificació dels animals',ic:'🐸',
  teoria:['Els animals <b>vertebrats</b> tenen esquelet intern amb columna vertebral. Els <b>invertebrats</b> no en tenen.','Vertebrats: <b>mamífers</b> (pèl, alleten les cries), <b>aus</b> (plomes, bec, ponen ous), <b>rèptils</b> (escates, respiren amb pulmons), <b>amfibis</b> (pell nua i humida; de petits viuen dins l\'aigua) i <b>peixos</b> (aletes, respiren amb brànquies).','Invertebrats: <b>insectes</b> (6 potes), <b>aràcnids</b> (8 potes), <b>mol·luscs</b> (cos tou), <b>crustacis</b> (closca dura), <b>equinoderms</b> (pell amb espines)...'],
  gen(lv){if(lv>0&&Math.random()<.4){const[n,g,f]=pick(INV);
    return{text:`A quin grup d'invertebrats pertany ${n}?`,fields:[{label:'Grup',txt:IGRP[g],loose:true,wide:true}],vis:null,
     hints:['Compta les potes i mira com és el cos.',`Fixa't: ${f}.`],steps:[`${cap(n)} ${f}.`,`Per tant, és un <b>${g}</b>.`],err:v=>otherGroup(IGRP,g,v[0])?'ci_classificacio':null}}
   const[n,g,f]=pick(VERT.filter(x=>lv>0||!x[3]));
   return{text:`A quin grup de vertebrats pertany ${n}?`,fields:[{label:'Grup',txt:GRP[g],loose:true,wide:true}],vis:null,
    hints:['Pensa: té pèl, plomes, escates o pell nua? Com respira?',`Pista: ${f}.`],steps:[`${cap(n)} ${f}.`,`Per tant, és ${g==='au'?'una':'un'} <b>${g}</b>.`],err:v=>otherGroup(GRP,g,v[0])?'ci_classificacio':null};
  }},
 ci_energia:bankSkill('L\'energia','⚡','ci_energia',
  ['L\'<b>energia</b> és la capacitat de produir canvis: moure, escalfar, il·luminar...','Fonts <b>renovables</b> (no s\'esgoten): solar (sol), eòlica (vent), hidràulica (aigua), geotèrmica (calor de la Terra), biomassa.','Fonts <b>no renovables</b> (s\'esgoten i contaminen més): petroli, carbó, gas natural i urani (nuclear).'],
  mkBank([['Com es diu l\'energia que s\'obté de la llum del sol?','solar','Ve del Sol.','L\'energia <b>solar</b> s\'aprofita amb plaques solars.','eòlica|hidràulica'],
   ['Com es diu l\'energia que s\'obté del vent?','eòlica','Els aerogeneradors l\'aprofiten.','L\'energia <b>eòlica</b> ve del vent (Èol era el déu grec del vent).','solar|hidràulica'],
   ['Com es diu l\'energia que s\'obté de l\'aigua dels rius i embassaments?','hidràulica|hidroelèctrica','Ve de l\'aigua en moviment.','L\'energia <b>hidràulica</b> aprofita la força de l\'aigua que cau.','eòlica|solar'],
   ['Quin aparell transforma la força del vent en electricitat?','aerogenerador|molí de vent','És com un molí de vent modern.','Un <b>aerogenerador</b> té unes pales que giren amb el vent i produeixen electricitat.','placa solar'],
   ['Quin aparell transforma la llum del sol en electricitat?','placa solar|placa fotovoltaica|panell solar|plaques solars','Sovint es posa a les teulades.','Les <b>plaques solars</b> (fotovoltaiques) transformen la llum en electricitat.','aerogenerador'],
   ['Com es diu l\'energia que produeix llum, com la d\'una bombeta?','lluminosa','Ens permet veure-hi.','L\'energia <b>lluminosa</b> és la de la llum.',''],
   ['Com es diu l\'energia que s\'obté de la calor de l\'interior de la Terra?','geotèrmica','«Geo» vol dir Terra i «tèrmica», calor.','L\'energia <b>geotèrmica</b> aprofita la calor de dins la Terra.','solar',1],
   ['Com es diu l\'energia que s\'obté cremant restes de plantes, fusta o residus orgànics?','biomassa','Ve de la matèria dels éssers vius.','La <b>biomassa</b> és renovable si es tornen a plantar els arbres.','',1],
   ['Quin tipus d\'energia té un cos que es mou?','cinètica','Ve d\'una paraula grega que vol dir moviment.','L\'energia <b>cinètica</b> és l\'energia del moviment.','',1],
   ['Quin tipus d\'energia ens donen els aliments?','química','Està guardada dins les substàncies.','Els aliments tenen energia <b>química</b>, que el cos transforma per moure\'s i créixer.','',1],
   ['Quin combustible fòssil, líquid i negre, es fa servir per fer benzina?','petroli','S\'extreu de sota terra o de sota la mar.','El <b>petroli</b> és una font no renovable: tard o d\'hora s\'esgotarà.','carbó|gas natural',1]])),
 ci_univers:bankSkill('La Terra i l\'Univers','🌍','ci_moviments',
  ['El <b>Sistema Solar</b> té una estrella, el <b>Sol</b>, i <b>8 planetes</b>: Mercuri, Venus, la Terra, Mart, Júpiter, Saturn, Urà i Neptú.','La Terra fa dos moviments: <b>rotació</b> (gira sobre ella mateixa en 24 hores → el dia i la nit) i <b>translació</b> (fa una volta al Sol en un any → les estacions).','La <b>Lluna</b> és el satèl·lit de la Terra. Tarda uns 28 dies a fer-li una volta, i per això en veiem les <b>fases</b>.'],
  mkBank([['Com es diu el moviment de la Terra sobre ella mateixa, que produeix el dia i la nit?','rotació','La Terra gira com una baldufa.','La <b>rotació</b> dura 24 hores: la cara que mira el Sol és de dia.','translació'],
   ['Com es diu el moviment de la Terra al voltant del Sol?','translació','Dura un any.','La <b>translació</b> dura 365 dies i 6 hores i, amb la inclinació de la Terra, produeix les estacions.','rotació'],
   ['Quantes hores tarda la Terra a fer una volta sencera sobre ella mateixa?','24|vint-i-quatre','És el que dura un dia sencer.','La rotació dura <b>24 hores</b>.','365'],
   ['Quants dies tarda la Terra a fer una volta al Sol?','365|tres-cents seixanta-cinc','És el que dura un any.','La translació dura <b>365 dies</b> (i unes 6 hores; per això cada 4 anys hi ha un any de traspàs).','24'],
   ['Quants planetes té el Sistema Solar?','8|vuit','Mercuri, Venus, la Terra...','El Sistema Solar té <b>8 planetes</b>.','9|nou'],
   ['Quin és el planeta més proper al Sol?','Mercuri','És el planeta més petit.','<b>Mercuri</b> és el primer planeta i el més petit.','Venus'],
   ['Quin és el planeta més gran del Sistema Solar?','Júpiter','És un gegant de gas amb una gran taca vermella.','<b>Júpiter</b> és tan gran que hi cabrien més de 1.000 Terres.','Saturn'],
   ['Com es diu el satèl·lit natural de la Terra?','Lluna','La veiem de nit al cel.','La <b>Lluna</b> fa una volta a la Terra cada 28 dies, més o menys.',''],
   ['Quina estrella hi ha al centre del Sistema Solar?','Sol','Ens dona llum i calor.','El <b>Sol</b> és una estrella. Tots els planetes hi giren al voltant.',''],
   ['Quin planeta es coneix com el planeta vermell?','Mart','És el quart planeta.','<b>Mart</b> és vermell perquè la seva terra té molt de ferro rovellat.','Júpiter',1],
   ['Com es diu la galàxia on vivim?','Via Làctia','Té nom de llet.','Vivim a la <b>Via Làctia</b>, una galàxia amb milers de milions d\'estrelles.','',1],
   ['Com es diuen les diferents formes amb què veiem la Lluna (plena, creixent...)?','fases|fases de la Lluna','Canvien al llarg del mes.','Les <b>fases de la Lluna</b> són: lluna nova, quart creixent, lluna plena i quart minvant.','',1]])),
 ci_llibre:{mat:'ciencies',nom:'Preguntes del llibre',ic:'',
  get teoria(){return['Avui repassarem les preguntes del teu llibre.',...(S.sessio.explicacio?[esc(S.sessio.explicacio)]:[]),'Llegeix bé cada pregunta i respon amb les teves paraules. Si no ho saps, demana una pista.']},
  gen(lv){const pq=(S.sessio.preguntes||[]).filter(x=>x.q&&x.a);
   if(!pq.length){const sk=pick(['ci_cos','ci_plantes','ci_energia','ci_univers']);return qProb(pick(SK[sk].bank.filter(q=>lv>0||!q.lv)),null)}
   const it=pick(pq);return qProb({q:it.q,a:String(it.a).split('|').map(s=>s.trim()).filter(Boolean),h:it.h||'',ex:it.ex||'',c:[]},null)}}
});
