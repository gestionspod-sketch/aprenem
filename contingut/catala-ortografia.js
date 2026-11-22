/* Aprenem - LLENGUA CATALANA 6è: ORTOGRAFIA
   Diftongs i hiats, accent diacrític, parelles que fan dubtar (perquè / per què...), puntuació i majúscules,
   x / ix / tx / ig, m / n, consonants finals (c / g, t / d), vocals àtones en els verbs i guionet.
   Part de l'app d'estudi. Vegeu CLAUDE.md i la capçalera de contingut/catala.js (fonts). */
(()=>{
const gapWord=(w,seg)=>{const i=w.indexOf(seg);return w.slice(0,i)+'__'+w.slice(i+seg.length)};

/* ---------- diftongs i hiats ---------- */
// [paraula, síl·labes, diftong|hiat, nivell]
const DH=[['cuina','cui-na','diftong'],['reina','rei-na','diftong'],['feina','fei-na','diftong'],['causa','cau-sa','diftong'],['boira','boi-ra','diftong'],['ciutat','ciu-tat','diftong'],['quatre','qua-tre','diftong'],['aigua','ai-gua','diftong',1],['guant','guant','diftong',1],['neu','neu','diftong'],['riu','riu','diftong',1],
 ['poema','po-e-ma','hiat'],['teatre','te-a-tre','hiat'],['veïna','ve-ï-na','hiat'],['raïm','ra-ïm','hiat'],['país','pa-ís','hiat'],['diari','di-a-ri','hiat'],['lleó','lle-ó','hiat'],['cruel','cru-el','hiat',1],['oceà','o-ce-à','hiat',1],['suar','su-ar','hiat',1],['reüll','re-üll','hiat',1]];

/* ---------- accent diacrític ---------- */
// [frase amb la paraula ben escrita entre *asteriscs*, explicació]
const DIAC=[['El teu germà *és* molt alt.','és: verb ser (ell és)'],['La nena *es* renta les mans.','es: pronom (es renta)'],
 ['Avui ho has fet molt *bé*.','bé: adverbi (contrari de malament)'],['El *be* bela dins el corral.','be: l\'animal (xai)'],
 ['Vull *més* sopa, per favor.','més: quantitat'],['El *mes* de maig és el meu preferit.','mes: part de l\'any'],
 ['Tinc una *mà* bruta de pintura.','mà: part del cos'],['*Ma* germana viu a Maó.','ma: possessiu (la meva)'],
 ['Voldria viatjar per tot el *món*.','món: la Terra'],['*Mon* pare treballa al port.','mon: possessiu (el meu)'],
 ['Hi ha un *pèl* dins la sopa.','pèl: cabell'],['Passejam *pel* parc.','pel: contracció de per + el'],
 ['No *sé* on són les claus.','sé: verb saber (jo sé)'],['La mare *se* n\'ha anat a fer feina.','se: pronom'],
 ['Digues que *sí*.','sí: afirmació'],['*Si* plou, no sortirem.','si: condició'],
 ['Els meus cosins *són* de Menorca.','són: verb ser (ells són)'],['Tinc molta *son*.','son: ganes de dormir'],
 ['La mestra *té* un gat negre.','té: verb tenir (ella té)'],['Vull un *te* amb llimona.','te: la beguda'],
 ['*Què* vols per berenar?','què: pregunta (quina cosa)'],['Diu *que* vindrà demà.','que: uneix dues oracions'],
 ['Els grecs creien en més d\'un *déu*.','déu: divinitat'],['Em *deu* cinc euros.','deu: verb deure (o el nombre 10)'],
 ['El *sòl* del bosc és humit.','sòl: el terra'],['El *sol* surt per l\'est.','sol: l\'astre (o «tot sol»)'],
 ['Aquest llibre ja té molt d\'*ús*.','ús: acció de fer servir'],['Demà *us* telefonaré.','us: pronom (a vosaltres)'],
 ['Jo *soc* de Palma.','soc: des del 2017 ja no porta accent',1],['La mare *dona* pa al nin.','dona: des del 2017 ja no porta accent (verb donar)',1],['Ell *ve* de l\'escola.','ve: verb venir, mai no ha portat accent',1]];

/* ---------- parelles que fan dubtar ---------- */
// [frase amb ___, resposta, l'altra forma, explicació]
const PAR=[['___ no has vingut a classe?','per què','perquè','per què = per quin motiu (pregunta)'],['No he vingut ___ estava malalt.','perquè','per què','perquè = explica la causa'],['No sé ___ plora.','per què','perquè','per què = pregunta indirecta (per quin motiu)'],['Estudia molt ___ vol aprovar.','perquè','per què','perquè = causa o finalitat'],
 ['No és blau, ___ verd.','sinó','si no','sinó = «al contrari» (després d\'una negació)'],['___ estudies, no aprovaràs.','si no','sinó','si no = «en cas que no»'],['No vull aigua, ___ suc.','sinó','si no','sinó = «al contrari»'],['Telefona\'m ___ pots venir.','si no','sinó','si no = «en cas que no»'],
 ['Canta i balla ___.','alhora','a l\'hora','alhora = al mateix temps'],['El tren ha arribat ___.','a l\'hora','alhora','a l\'hora = puntual, a l\'hora prevista'],['Vam arribar tots ___.','alhora','a l\'hora','alhora = al mateix temps'],['___ de sopar, tothom a taula!','a l\'hora','alhora','a l\'hora de = en el moment de'],
 ['Va sonar el timbre i ___ tothom va sortir.','aleshores','a les hores','aleshores = en aquell moment, llavors'],['Prenc el xarop ___ que m\'ha dit el metge.','a les hores','aleshores','a les hores = a les hores del rellotge'],['Primer vam dinar i ___ vam anar a la platja.','aleshores','a les hores','aleshores = llavors, després']];

/* ---------- puntuació i majúscules ---------- */
const PUNT_NOM={dp:['dos punts'],com:['cometes'],coma:['coma','comes'],par:['parèntesis','parèntesi','parentesis'],ps:['punts suspensius'],pc:['punt i coma'],ex:['signe d\'exclamació','exclamació','admiració','signe d\'admiració'],int:['signe d\'interrogació','interrogació','interrogant'],gui:['guió','guió llarg','guió de diàleg','ratlla']};
const PUNT_DEF={dp:'Els dos punts (:) van davant d\'una enumeració o de les paraules exactes que diu algú.',com:'Les cometes (« ») encerclen les paraules exactes que diu algú o un títol.',coma:'La coma (,) separa els elements d\'una enumeració, aïlla el nom de qui cridam i les explicacions dins la frase.',par:'Els parèntesis ( ) encerclen una explicació o un aclariment que es podria treure.',ps:'Els punts suspensius (...) indiquen que la frase queda oberta o que la llista podria continuar.',pc:'El punt i coma (;) separa dues parts llargues d\'una frase que tenen relació.',ex:'El signe d\'exclamació (!) va al final d\'una frase que expressa emoció.',int:'El signe d\'interrogació (?) va al final d\'una pregunta.',gui:'El guió (—) introdueix el que diu cada personatge en un diàleg.'};
const PUNT=[['La mestra va dir[ ] «Obriu el llibre».','dp'],['Necessito tres coses[ ] un llapis, una goma i un regle.','dp'],['A la motxilla duc: llibres, llapis, colors[ ]','ps'],['Va cridar: [ ]Socors![ ]','com'],['Comprarem pomes[ ] peres i plàtans.','coma'],['Joan[ ] vine aquí de seguida!','coma'],
 ['Llegiu el capítol tres [ ]pàgina 25[ ].','par'],['Els cetacis [ ]dofins, balenes, orques...[ ] són mamífers.','par'],['Uns preferien anar a la platja[ ] els altres, a la muntanya.','pc',1],['Quina sorpresa tan bona[ ]','ex'],['A quina hora surt el tren[ ]','int'],['[ ]Bon dia, Marta! —va dir en Pere.','gui',1],['Palma[ ] la capital de Mallorca[ ] té molts de museus.','coma',1],['El meu llibre preferit és [ ]Les aventures d\'en Tom Sawyer[ ].','com',1]];
// [frase, paraules que han d'anar amb majúscula ('cap' si no n'hi ha cap), explicació]
const MAJ=[['Ahir vaig anar a sóller amb el tren.','sóller','Els noms de ciutats i pobles van amb majúscula.'],['El meu gos es diu bruc.','bruc','Els noms propis d\'animals van amb majúscula.'],['La meva cosina viu a menorca.','menorca','Els noms d\'illes i països van amb majúscula.'],['Aquest estiu visitarem frança.','frança','Els noms de països van amb majúscula.'],
 ['El dilluns anirem al museu.','cap','Els dies de la setmana van amb minúscula.'],['Al juliol farem vacances.','cap','Els mesos de l\'any van amb minúscula.'],['Al juliol anirem a eivissa.','eivissa','Els mesos van amb minúscula, però els noms d\'illes, amb majúscula.'],['La meva veïna és francesa.','cap','Els gentilicis (francesa, mallorquí) van amb minúscula.'],
 ['He llegit un poema de joan alcover.','joan alcover','Els noms i llinatges de persones van amb majúscula.'],['El riu ebre és molt llarg.','ebre','Els noms de rius van amb majúscula (riu va amb minúscula).'],['Ens banyarem a la mediterrània.','mediterrània','Els noms de mars van amb majúscula.']];

/* ---------- x, ix, tx, ig ---------- */
const XIX=[['caixa','ix'],['peix','ix'],['baixar','ix'],['coixí','ix'],['guix','ix'],['xocolata','x'],['xarop','x'],['panxa','x'],['marxar','x'],['punxa','x'],
 ['cotxe','tx'],['fletxa','tx'],['despatx','tx'],['cartutxera','tx',1],['maig','ig'],['raig','ig'],['mig','ig'],['puig','ig'],['desig','ig',1],['passeig','ig'],['roig','ig'],['lleig','ig',1]];
const XIX_N={x:'S\'escriu x a principi de paraula (xarop) i darrere consonant (panxa, marxar).',ix:'Darrere vocal, el so «x» s\'escriu ix (caixa, peix, coixí).',tx:'El so fort «tx» enmig o a final de paraula s\'escriu tx (cotxe, fletxa, despatx).',ig:'A final de paraula, darrere vocal, el so «tx» s\'escriu ig (maig, roig, passeig).'};

/* ---------- m i n ---------- */
const MN=[['camp','m'],['també','m'],['impossible','m'],['bombó','m'],['temps','m'],['comprar','m'],['immens','m',1],['empènyer','m',1],['tomba','m'],
 ['convidar','n'],['enveja','n'],['canvi','n'],['inventar','n'],['enfadat','n'],['confiar','n'],['enviar','n'],['invisible','n'],['tramvia','m',1]];
const MN_OK=MN.filter(x=>!x[3]);

/* ---------- consonants finals ---------- */
// [paraula, lletra final, derivat que ajuda, nivell]
const FIN=[['amic','c','amiga'],['groc','c','groga'],['foc','c','foguera'],['sec','c','seca'],['poc','c','poca'],['llarg','g','llarga'],['sang','g','sagnar'],['fang','g','fangós'],['blanc','c','blanca'],['banc','c','banqueta'],['porc','c','porquet'],['bosc','c','boscos'],['càstig','g','castigar',1],
 ['verd','d','verda'],['sord','d','sorda'],['fort','t','forta'],['alt','t','alta'],['buit','t','buida'],['nebot','t','neboda'],['mut','t','muda'],['mort','t','morta'],['gran','n','grans']];
const FIN_OK=FIN.filter(x=>x[1]!=='n');

/* ---------- vocals àtones en els verbs ---------- */
// [forma completa, lletra amagada, forma on la vocal és tònica (sona clara)]
const VAT=[['menjàvem','e','menjo'],['pescarem','e','pesco'],['pesava','e','peso'],['cremaria','e','cremo'],['llançarem','a','llanço'],['tancaria','a','tanco'],['pagarem','a','pago'],['canviaré','a','canvio'],['xerrarem','e','xerro'],['tallarem','a','tallo'],['ballàvem','a','ballo'],['pensarem','e','penso'],['semblava','e','semblo'],
 ['pujarem','u','pujo'],['tornaria','o','torno'],['robaven','o','robo'],['fumava','u','fumo'],['posarem','o','poso'],['buscàvem','u','busco'],['comprarem','o','compro'],['jugaríem','u','jugo'],['cuinarem','u','cuino'],['tocaven','o','toco']];
// verbs amb alternança o / u: àtona o, tònica u
const OU=[['cosir','cus','cusen'],['tossir','tus','tussen'],['escopir','escup','escupen'],['collir','cull','cullen'],['sortir','surt','surten']];

/* ---------- guionet ---------- */
const UN=['zero','u','dos','tres','quatre','cinc','sis','set','vuit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
const UN_BAL={17:['desset'],18:['devuit'],19:['denou']};
const DES={2:'vint',3:'trenta',4:'quaranta',5:'cinquanta',6:'seixanta',7:'setanta',8:'vuitanta',9:'noranta'};
// Escriu un nombre (1-999) amb lletres. Retorna totes les formes acceptades (la primera, l'estàndard).
function numCat(n){const out=[];
 const u2=k=>k===1?['u','un']:k<20?[UN[k],...(UN_BAL[k]||[])]:null;
 const tens=k=>{if(k<20)return u2(k);const d=Math.floor(k/10),u=k%10;if(!u)return[DES[d]];return u2(u).map(x=>DES[d]+(d===2?'-i-':'-')+x)};
 const h=Math.floor(n/100),r=n%100;const pre=h===0?['']:h===1?['cent']:[UN[h]+'-cents'];
 for(const p of pre){if(!r)out.push(p);else for(const t of tens(r))out.push(p?p+' '+t:t)}
 return out}
// [verb, pronom (forma plena), resultat]
const GV=[['compra','les','compra-les'],['menja','ho','menja-ho'],['renta','et',"renta't"],['dona','li','dona-li'],['mira','els',"mira'ls"],['agafa','la','agafa-la'],['seu','et','seu-te'],['escolta','em',"escolta'm"],['explica','ens',"explica'ns"],['porta','ho','porta-ho'],['digues','ho','digues-ho'],
 ['obrir','la','obrir-la'],['fer','ho','fer-ho'],['menjar','el','menjar-lo'],['comprar','els','comprar-los'],['rentar','es','rentar-se'],['vendre','les','vendre-les'],['veure','el',"veure'l"],['beure','en',"beure'n"],['dir','li','dir-li']];

Object.assign(SK,{
 ca_diftongs:{mat:'catala',ab:'Dh',curs:[6],nom:'Diftongs i hiats',
  teoria:['Quan dues vocals van juntes, poden pronunciar-se en la <b>mateixa síl·laba</b> (<b>diftong</b>) o en <b>síl·labes diferents</b> (<b>hiat</b>).',
   `<table class="mini"><tr><th>Diftong</th><td>dues vocals en una síl·laba: una de les dues és una i o una u que sona fluixa</td><td><b>cui</b>-na, <b>rei</b>-na, <b>cau</b>-sa, <b>qua</b>-tre, <b>neu</b></td></tr><tr><th>Hiat</th><td>dues vocals en síl·labes diferents</td><td>po-<b>e</b>-ma, te-<b>a</b>-tre, ra-<b>ï</b>m, pa-<b>í</b>s</td></tr></table>`,
   'Els diftongs més habituals acaben en i o u: <b>ai, ei, oi, ui, au, eu, iu, ou</b> (boira, feina, ciutat), o comencen per <b>gu / qu</b> + vocal (quatre, guant, aigua).',
   'Dues vocals fortes (a, e, o) sempre fan hiat: te-a-tre, po-e-ma. La <b>dièresi</b> i l\'<b>accent</b> ens avisen d\'un hiat: ve-ï-na, pa-ís.',
   'Per separar síl·labes, escriu-les amb guionets: <b>cui-na</b>, <b>po-e-ma</b>.'],
  gen(lv){const[w,s,t]=pick(DH.filter(x=>lv>0||!x[3]));
   return{text:`Separa en síl·labes la paraula «<b>${w}</b>» (amb guionets, així: ca-sa).<br>Les vocals que van juntes fan diftong o hiat?`,
    fields:[{label:'Síl·labes',txt:[s],wide:true},{label:'Diftong o hiat',txt:[t],loose:true}],vis:null,
    hints:['Digues la paraula a poc a poc i pica de mans a cada síl·laba.','Si les dues vocals sonen en un sol cop de veu, és diftong; si sonen en dos cops, és hiat.'],
    steps:[`Picam de mans: <b>${s}</b> (${s.split('-').length} síl·laba${s.split('-').length>1?'es':''}).`,t==='diftong'?'Les dues vocals sonen juntes en una síl·laba: és un <b>diftong</b>.':'Les dues vocals sonen en síl·labes diferents: és un <b>hiat</b>.'],
    err:v=>v[0]===s&&fold(v[1])!==t?'ca_diftong_hiat':null}}},

 ca_diacritic:{mat:'catala',ab:'Ad',curs:[6],nom:'L\'accent diacrític',
  teoria:['L\'<b>accent diacrític</b> serveix per distingir dues paraules que s\'escriuen igual però volen dir coses diferents.',
   `<table class="mini"><tr><td><b>bé</b> (adverbi) / be (xai)</td><td><b>déu</b> (divinitat) / deu (deure, 10)</td></tr><tr><td><b>és</b> (ser) / es (pronom)</td><td><b>mà</b> (part del cos) / ma (la meva)</td></tr><tr><td><b>més</b> (quantitat) / mes (de l'any)</td><td><b>món</b> (la Terra) / mon (el meu)</td></tr><tr><td><b>pèl</b> (cabell) / pel (per + el)</td><td><b>què</b> (pregunta) / que</td></tr><tr><td><b>sé</b> (saber) / se (pronom)</td><td><b>sí</b> (afirmació) / si (condició)</td></tr><tr><td><b>sòl</b> (terra) / sol (astre)</td><td><b>són</b> (ser) / son (dormir)</td></tr><tr><td><b>té</b> (tenir) / te (beguda)</td><td><b>ús</b> (fer servir) / us (pronom)</td></tr><tr><td><b>vós</b> (pronom) / vos (pronom)</td><td></td></tr></table>`,
   'Des de l\'any 2017, moltes paraules ja <b>no</b> porten accent diacrític: <b>soc</b>, <b>dona</b>, <b>vens</b>, <b>net</b>, <b>os</b>, <b>adeu</b>...'],
  gen(lv){const[f,ex]=pick(DIAC.filter(x=>lv>0||!x[2])),w=caStar(f),s=CA_STRIP(w);
   return caEx(`Escriu correctament la paraula destacada (amb accent si en porta):<br><i>${f.replace(/\*(.+?)\*/,`<b><u>${s}</u></b>`)}</i>`,[w],{label:'Paraula',
    hints:['Pensa què vol dir la paraula en aquesta frase.','Mira la taula: només porten accent diacrític unes poques paraules.'],
    steps:[`Aquí és «${ex}».`,`S'escriu: <b>${caLow(w)}</b>.`],
    err:v=>v[0]===caLow(w)?null:CA_STRIP(v[0])===caLow(s)?(['soc','dona','ve'].includes(caLow(w))?'ca_diacritic_vell':'ca_diacritic'):null})}},

 ca_parelles:{mat:'catala',ab:'Pq',curs:[6],nom:'Perquè o per què? Sinó o si no?',
  teoria:['Algunes paraules sonen igual però s\'escriuen junt o separat segons el que volen dir:',
   `<table class="mini"><tr><td><b>per què</b> = per quin motiu (pregunta)</td><td><b>perquè</b> = causa o finalitat</td></tr><tr><td><b>sinó</b> = al contrari (després d'un «no»)</td><td><b>si no</b> = en cas que no</td></tr><tr><td><b>alhora</b> = al mateix temps</td><td><b>a l'hora</b> = puntual, en el moment de</td></tr><tr><td><b>aleshores</b> = llavors, en aquell moment</td><td><b>a les hores</b> = a les hores del rellotge</td></tr></table>`,
   'Truc: si pots posar «per quin motiu», és <b>per què</b>. Si pots posar «en cas que no», és <b>si no</b>.'],
  gen(){const[f,a,b,ex]=pick(PAR);
   return caEx(`Completa la frase amb <b>${[a,b].sort().join('</b> o <b>')}</b>:<br><i>${f}</i>`,[a],{label:'Paraula que hi falta',
    hints:['Prova de canviar-ho per «per quin motiu», «en cas que no», «al mateix temps» o «llavors». Quina té sentit?','Llegeix la frase sencera en veu alta.'],
    steps:[ex+'.',`La frase queda: <b>${caCap(f.replace('___',a))}</b>`],
    err:v=>v[0]===b?'ca_parella':null})}},

 ca_puntuacio:{mat:'catala',ab:'Pu',curs:[6],nom:'Puntuació i majúscules',
  teoria:['Els <b>signes de puntuació</b> organitzen el text i ens ajuden a llegir-lo bé:',
   `<table class="mini">${Object.entries(PUNT_DEF).map(([k,d])=>`<tr><td><b>${PUNT_NOM[k][0]}</b></td><td>${d}</td></tr>`).join('')}</table>`,
   'Les <b>majúscules</b> van a principi de text i després de punt, i en els noms propis: persones (Joan Alcover), animals (Bruc), pobles i ciutats (Sóller), illes i països (Menorca, França), rius i mars (l\'Ebre, la Mediterrània).',
   'Van amb <b>minúscula</b>: els dies de la setmana (dilluns), els mesos (juliol) i els gentilicis (mallorquí, francesa).'],
  gen(lv){if(Math.random()<.55){const[f,k]=pick(PUNT.filter(x=>lv>0||!x[2])),twice=f.split('[ ]').length>2;
    return caEx(`Quin signe de puntuació hi falta${twice?' (als dos llocs)':''}?<br><i>${f.replace(/\[ \]/g,'<b style="color:var(--s-catala)">[ ]</b>')}</i>`,PUNT_NOM[k],{label:'Nom del signe',loose:true,
     hints:['Què hi ha després del buit: una llista, les paraules d\'algú, una explicació, una pregunta...?','Mira la taula de la teoria.'],
     steps:[PUNT_DEF[k],`Hi falta: <b>${PUNT_NOM[k][0]}</b>.`]})}
   const[f,a,ex]=pick(MAJ);
   return caEx(`Quina paraula (o paraules) d'aquesta frase s'ha d'escriure amb majúscula? Si no n'hi ha cap, escriu «cap».<br><i>${f}</i>`,a==='cap'?['cap','cap paraula','cap ni una']:[a],{label:'Paraula',loose:true,
    hints:['Busca noms propis: persones, animals, pobles, illes, països, rius, mars.','Recorda: dies, mesos i gentilicis van amb minúscula.'],
    steps:[ex,a==='cap'?'No n\'hi ha cap més que la primera paraula de la frase.':`S'escriu amb majúscula: <b>${a.split(' ').map(caCap).join(' ')}</b>.`]})}},

 ca_x_ix:{mat:'catala',ab:'Xi',curs:[6],nom:'Les grafies x, ix, tx i ig',
  teoria:['El so de <b>x</b> (com a «xocolata») i el so més fort <b>tx</b> (com a «cotxe») es poden escriure de maneres diferents:',
   `<table class="mini">${Object.entries(XIX_N).map(([k,d])=>`<tr><td><b>${k}</b></td><td>${d}</td></tr>`).join('')}</table>`,
   'Compte amb el plural de les paraules acabades en <b>-ig</b>: passeig → passejos (o passeigs), roig → rojos, lleig → lletjos.'],
  gen(lv){const[w,seg]=pick(XIX.filter(x=>lv>0||!x[2]));
   return caEx(`Escriu la paraula completa:<br><b>${gapWord(w,seg)}</b> <span class="muted">(x / ix / tx / ig)</span>`,[w],{label:'Paraula',
    hints:['On és el so: a principi de paraula, darrere consonant, darrere vocal, a final de paraula?','Sona suau (x) o fort (tx)?'],
    steps:[XIX_N[seg],`S'escriu: <b>${w}</b>.`],
    err:v=>{if(v[0]===w)return null;const alt=['x','ix','tx','ig'].filter(s=>s!==seg).map(s=>w.replace(seg,s));return alt.includes(v[0])?'ca_x_ix':null}})}},

 ca_m_n:{mat:'catala',ab:'Mn',curs:[6],nom:'La m i la n',
  teoria:['Davant de <b>p</b>, <b>b</b> i <b>m</b> s\'escriu <b>m</b>: ca<b>m</b>p, ta<b>m</b>bé, co<b>m</b>prar, i<b>m</b>possible, i<b>m</b>mens.',
   'Davant de <b>v</b> i de <b>f</b> s\'escriu <b>n</b>: co<b>n</b>vidar, e<b>n</b>veja, ca<b>n</b>vi, e<b>n</b>fadat, co<b>n</b>fiar.',
   'Excepció que cal recordar: <b>tramvia</b> (tram + via).'],
  gen(lv){const[w,l]=pick(MN_OK.filter(x=>lv>0||!x[2])),i=w.search(l==='m'?/m(?=[pbmv])/:/n(?=[vf])/),g=w.slice(0,i)+'_'+w.slice(i+1);
   return caEx(`Escriu la paraula completa:<br><b>${g}</b> <span class="muted">(m / n)</span>`,[w],{label:'Paraula',
    hints:['Mira quina lletra ve just després del buit.','Davant p, b, m → m. Davant v, f → n.'],
    steps:[w==='tramvia'?'És una excepció: tram + via.':l==='m'?`Davant «${w[i+1]}» s'escriu m.`:`Davant «${w[i+1]}» s'escriu n.`,`S'escriu: <b>${w}</b>.`],
    err:v=>v[0]!==w&&v[0]===g.replace('_',l==='m'?'n':'m')?'ca_m_n':null})}},

 ca_finals:{mat:'catala',ab:'Cf',curs:[6],nom:'Consonants finals: c / g i t / d',
  teoria:['A final de paraula sentim el mateix so per a <b>c</b> i <b>g</b>, o per a <b>t</b> i <b>d</b>. Com ho sabem?',
   '<b>Darrere consonant</b>, mira una paraula de la mateixa família: si té g o d, escriu <b>g</b> o <b>d</b> (llar<b>g</b> → llarga, ver<b>d</b> → verda); si té c, qu o t, escriu <b>c</b> o <b>t</b> (blan<b>c</b> → blanca, for<b>t</b> → forta).',
   '<b>Darrere vocal</b>, quasi sempre s\'escriu <b>c</b> i <b>t</b>, encara que la família tingui g o d: ami<b>c</b> (amiga), gro<b>c</b> (groga), bui<b>t</b> (buida), nebo<b>t</b> (neboda). Excepció: <b>càstig</b>.'],
  gen(lv){const[w,l,d]=pick(FIN_OK.filter(x=>lv>0||!x[3])),g=w.slice(0,-1)+'_',other={c:'g',g:'c',t:'d',d:'t'}[l],afterV=/[aeiouàèéíòóú]$/.test(w.slice(0,-1));
   return caEx(`Escriu la paraula completa:<br><b>${g}</b> <span class="muted">(${l==='c'||l==='g'?'c / g':'t / d'})</span><br><span class="muted">Pista de família: ${d}</span>`,[w],{label:'Paraula',
    hints:['La lletra just d\'abans del guió baix (_) és una vocal o una consonant?',afterV?'Darrere vocal, quasi sempre c o t.':'Darrere consonant, fixa\'t en la paraula de la família.'],
    steps:[w==='càstig'?'«Càstig» és una excepció: s\'escriu amb g.':afterV?`Darrere vocal s'escriu ${l} (encara que digui «${d}»).`:`Darrere consonant, la família ens ho diu: ${d} → ${l}.`,`S'escriu: <b>${w}</b>.`],
    err:v=>v[0]===w.slice(0,-1)+other?'ca_final':null})}},

 ca_vocals_atones:{mat:'catala',ab:'Va',curs:[6],nom:'Vocals àtones en els verbs',
  teoria:['Quan una vocal no és la síl·laba forta (és <b>àtona</b>), la a i la e (i la o i la u) sovint sonen igual. Per saber com s\'escriu, busca una forma del verb on aquesta vocal sigui <b>tònica</b>:',
   `<table class="mini"><tr><td>m<b>e</b>njàvem</td><td>← jo m<b>e</b>njo</td></tr><tr><td>ll<b>a</b>nçarem</td><td>← jo ll<b>a</b>nço</td></tr><tr><td>p<b>u</b>jarem</td><td>← jo p<b>u</b>jo</td></tr><tr><td>t<b>o</b>rnaria</td><td>← jo t<b>o</b>rno</td></tr></table>`,
   'Compte! Uns quants verbs canvien la <b>o</b> àtona per <b>u</b> quan és tònica: <b>cosir</b> (ell cus), <b>tossir</b> (tus), <b>escopir</b> (escup), <b>collir</b> (cull), <b>sortir</b> (surt). L\'infinitiu s\'escriu amb <b>o</b>: mai «cusir» ni «surtir».'],
  gen(lv){if(lv>0&&Math.random()<.4){const[inf,f3,f6]=pick(OU),sh=Math.random()<.5?`ell ${f3}`:`ells ${f6}`;
    return caEx(`Quin és l'infinitiu del verb de «<b>${sh}</b>»?`,[inf],{label:'Infinitiu',
     hints:['Aquest verb canvia una vocal quan és tònica.','L\'infinitiu té una o on el present té una u.'],
     steps:[`Present: ${sh}. La u és tònica.`,`A l'infinitiu és àtona i s'escriu amb o: <b>${inf}</b>.`],
     err:v=>v[0]===inf.replace('o','u')?'ca_vocal_ou':null})}
   const[w,l,t]=pick(VAT),i=w.search(/[aeou]/),gw=w.slice(0,i)+'_'+w.slice(i+1);
   return caEx(`Escriu la forma verbal completa:<br><b>${gw}</b> <span class="muted">(${l==='a'||l==='e'?'a / e':'o / u'})</span>`,[w],{label:'Forma verbal',
    hints:['Busca una forma del mateix verb on aquesta vocal soni forta (jo ...).',`Pensa en «jo ${t.slice(0,i)}…».`],
    steps:[`Forma tònica: <b>jo ${t}</b>. La vocal sona clara: ${l}.`,`S'escriu: <b>${w}</b>.`],
    err:v=>v[0]===gw.replace('_',{a:'e',e:'a',o:'u',u:'o'}[l])?'ca_vocal_atona':null})}},

 ca_guionet:{mat:'catala',ab:'Gu',curs:[6],nom:'El guionet',
  teoria:['El <b>guionet</b> (-) és un traç curt que uneix paraules. El feim servir:',
   '1. En els <b>nombres</b>: entre les desenes i les unitats (trenta-dos, noranta-nou) i, si hi ha «i», entre les tres parts (vint-i-tres). També en les centenes: dos-cents, cinc-cents.',
   '2. Entre el <b>verb</b> i els <b>pronoms febles</b> que van darrere: compra-les, menja-ho, dona-li, menjar-lo. Si el pronom s\'apostrofa, va amb apòstrof: renta\'t, mira\'ls.',
   '3. En alguns <b>mots compostos</b>, sobretot si la segona paraula comença per r, s o x: para-sol, gira-sol, penja-robes. (En canvi: gratacel, rentaplats.)',
   'Les formes balears <b>desset, devuit, denou</b> també són correctes.'],
  gen(lv){if(Math.random()<.5){const n=lv>0?rnd(21,999):rnd(21,99),a=numCat(n);
    return caEx(`Escriu amb lletres el nombre <b>${n}</b>.`,a,{label:'Amb lletres',
     hints:['Entre les desenes i les unitats va un guionet. De 21 a 29 s\'afegeix «-i-».','Les centenes: cent, dos-cents, tres-cents... (amb guionet a partir de dos-cents).'],
     steps:[n>=100?`${Math.floor(n/100)*100} → ${numCat(Math.floor(n/100)*100)[0]}.`:'Desenes i unitats s\'uneixen amb guionet.',`${n} s'escriu: <b>${a[0]}</b>.`],
     err:v=>!a.includes(v[0])&&a.map(x=>x.replace(/-/g,' ')).includes(v[0].replace(/-/g,' '))?'ca_guionet_nombre':null})}
   const[vb,pr,a]=pick(GV);
   return caEx(`Uneix el verb i el pronom feble (amb guionet o apòstrof):<br><b>${vb} + ${pr}</b>`,[a],{label:'Resultat',
    hints:['Darrere el verb, el pronom es lliga amb guionet o amb apòstrof.','Si el verb acaba en vocal, em, et, el, els, ens... s\'apostrofen (\'m, \'t, \'l, \'ls, \'ns). Si acaba en consonant o en u, prenen la forma plena (-me, -te, -lo, -los, -nos, -se).'],
    steps:[a.includes("'")?'El verb acaba en vocal: el pronom s\'apostrofa.':`El pronom es lliga amb guionet${/-(lo|los|se|te|nos|ne)$/.test(a)?' i pren la forma plena':''}.`,`Resultat: <b>${a}</b>.`],
    err:v=>v[0]!==a&&v[0].replace(/[-' ]/g,'')===a.replace(/[-' ]/g,'')?'ca_guionet_feble':null})}}
});

Object.assign(ERR,{
 ca_diftong_hiat:{kid:'Les síl·labes estan bé! Però revisa: si les vocals estan a la mateixa síl·laba és diftong; si estan separades, hiat.',par:'Confon diftong i hiat'},
 ca_diacritic:{kid:'Pensa què vol dir la paraula aquí. Només unes poques paraules porten accent diacrític.',par:'Errors amb l\'accent diacrític'},
 ca_diacritic_vell:{kid:'Des del 2017, aquesta paraula ja no porta accent (soc, dona, ve).',par:'Posa accents diacrítics antics (sóc, dóna)'},
 ca_parella:{kid:'Gairebé! Però aquí va l\'altra forma. Prova de canviar-la per «per quin motiu», «en cas que no» o «al mateix temps».',par:'Confon perquè / per què, sinó / si no, alhora / a l\'hora'},
 ca_x_ix:{kid:'Revisa la regla: x a principi o darrere consonant, ix darrere vocal, tx so fort, ig a final darrere vocal.',par:'Confon x, ix, tx i ig'},
 ca_m_n:{kid:'Davant p, b i m s\'escriu m; davant v i f, n.',par:'Confon m i n davant consonant'},
 ca_final:{kid:'Mira la lletra d\'abans: darrere vocal, quasi sempre c o t; darrere consonant, pensa en la família.',par:'Errors amb les consonants finals (c/g, t/d)'},
 ca_vocal_atona:{kid:'Busca una forma del verb on aquesta vocal soni forta (jo...).',par:'Confon a/e o o/u àtones en els verbs'},
 ca_vocal_ou:{kid:'Aquest verb té u quan és tònica (cus, surt), però l\'infinitiu s\'escriu amb o.',par:'Escriu «cusir», «surtir» en lloc de cosir, sortir'},
 ca_guionet_nombre:{kid:'Les paraules són bones, però falten els guionets: trenta-dos, vint-i-tres, dos-cents.',par:'No posa guionets en els nombres'},
 ca_guionet_feble:{kid:'Les lletres són bones, però revisa si va guionet (-) o apòstrof (\').',par:'Confon guionet i apòstrof amb els pronoms febles'}
});
})();
