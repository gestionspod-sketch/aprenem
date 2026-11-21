/* Aprenem - pantalles: inici, assignatures, modes, zona families
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ===================== pantalles principals ===================== */
// Mascota (disseny Suau): l'òliba rodona lila. Els paràmetres bg i beak es mantenen per compatibilitat.
const OWLM=(s=40,bg,beak)=>`<svg class="owl5" viewBox="0 0 120 120" width="${s}" height="${s}" aria-hidden="true"><ellipse cx="60" cy="72" rx="40" ry="42" fill="#8B6CF0"/><ellipse cx="60" cy="86" rx="25" ry="24" fill="#EDE6FF"/><path d="M26 42 34 22 48 36ZM94 42 86 22 72 36Z" fill="#8B6CF0"/><circle cx="45" cy="56" r="15" fill="#fff"/><circle cx="75" cy="56" r="15" fill="#fff"/><circle cx="47" cy="57" r="6" fill="#1E1B3A"/><circle cx="73" cy="57" r="6" fill="#1E1B3A"/><path d="M55 68h10l-5 8Z" fill="#F2853A"/></svg>`;
const OWL=(s=56)=>OWLM(s);
const sc=k=>`--c:var(--s-${matOf(k)})`;
const modeBtn=(k,m,extra='')=>`<button type="button" class="mode${extra}" data-m="${k}"><span class="tile">${m.ic}</span><span><b>${m.nom}</b><small>${m.desc}</small></span></button>`;
const kid=()=>home();

/* ---------- Accés de les famílies amb PIN ---------- */
let PARENT_OK=false;
const pinHash=p=>{let h=5381;for(const c of 'aprenem:'+p)h=((h<<5)+h+c.charCodeAt(0))>>>0;return h.toString(36)};
function closeModal(){const m=$('#modal');if(m)m.remove()}
function modal(html,cls=''){closeModal();const d=document.createElement('div');d.id='modal';d.className='modal-bg';d.innerHTML=`<div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div>`;d.onclick=e=>{if(e.target===d)closeModal()};document.body.appendChild(d);const i=d.querySelector('input');if(i)i.focus()}
const pinInput=(id,ph)=>`<input id="${id}" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="${ph}" style="font-size:26px;text-align:center;letter-spacing:.3em;margin-top:6px">`;
function askPin(){
 if(!S.pin){modal(`<h3 style="margin-top:0"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> Crea el PIN de la família</h3><p class="muted" style="margin-top:0">La primera vegada, triau un PIN de 4 xifres. El demanarem cada vegada que entreu a la zona de famílies, perquè els infants no la puguin obrir.</p>
  <label for="p1">PIN nou</label>${pinInput('p1','••••')}<label for="p2">Repetiu el PIN</label>${pinInput('p2','••••')}
  <div id="pm"></div><div class="row" style="margin-top:16px;justify-content:flex-end"><button class="ghost" onclick="closeModal()">Cancel·lar</button><button id="pok">Crear i entrar</button></div>`);
  const go=()=>{const a=$('#p1').value.trim(),b=$('#p2').value.trim();
   if(!/^\d{4,8}$/.test(a)){$('#pm').innerHTML='<div class="fb warn">El PIN ha de tenir entre 4 i 8 xifres.</div>';return}
   if(a!==b){$('#pm').innerHTML='<div class="fb warn">Els dos PIN no coincideixen. Torna-ho a provar.</div>';return}
   S.pin=pinHash(a);save();closeModal();PARENT_OK=true;parent('sessio')};
  $('#pok').onclick=go;$('#p2').onkeydown=e=>{if(e.key==='Enter')go()};return}
 modal(`<h3 style="margin-top:0"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> Zona de famílies</h3><p class="muted" style="margin-top:0">Escriviu el PIN per entrar.</p>${pinInput('p1','••••')}<div id="pm"></div>
  <div class="row" style="margin-top:16px;justify-content:space-between;align-items:center"><button class="ghost" id="pfg" style="min-height:42px;padding:8px 12px;font-size:15px">He oblidat el PIN</button><span class="row"><button class="ghost" onclick="closeModal()">Cancel·lar</button><button id="pok">Entrar</button></span></div>`);
 const go=()=>{if(pinHash($('#p1').value.trim())===S.pin){closeModal();PARENT_OK=true;parent('sessio')}else{$('#pm').innerHTML='<div class="fb ko">PIN incorrecte.</div>';$('#p1').value='';$('#p1').focus()}};
 $('#pok').onclick=go;$('#p1').onkeydown=e=>{if(e.key==='Enter')go()};
 $('#pfg').onclick=()=>{const a=rnd(23,89),b=rnd(23,89);
  modal(`<h3 style="margin-top:0">He oblidat el PIN</h3><p class="muted" style="margin-top:0">Per crear-ne un de nou, resoleu aquesta operació. No s'esborra cap dada de progrés.</p><p style="font-size:26px;font-weight:400;text-align:center">${a} × ${b} = ?</p><input id="p1" inputmode="numeric" style="font-size:24px;text-align:center"><div id="pm"></div>
   <div class="row" style="margin-top:16px;justify-content:flex-end"><button class="ghost" onclick="closeModal()">Cancel·lar</button><button id="pok">Comprovar</button></div>`);
  $('#pok').onclick=()=>{if(+$('#p1').value.trim()===a*b){S.pin='';save();askPin()}else $('#pm').innerHTML='<div class="fb ko">No és correcte.</div>'}}
}

/* ---------- Pàgina d'assignatura ---------- */


/* ---------- Taula de verbs ---------- */
function verbTable(tab='irr',back='kid'){endSession();let all=+S.perfil.curs>=6;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><h2>Taula de verbs</h2><p class="muted">Infinitiu, passat simple, participi i traducció. Toca un verb per escoltar-lo.</p></div><div class="row noprint"><button class="ghost" id="vback">← Tornar</button><button class="ghost" onclick="window.print()">Imprimir</button></div></div>
 <div class="tabs noprint"><button data-t="irr" class="${tab==='irr'?'on':''}">Verbs irregulars</button><button data-t="reg" class="${tab==='reg'?'on':''}">Verbs regulars</button></div>
 <div class="card"><div class="row noprint" style="align-items:center;margin-bottom:6px"><input id="vq" placeholder="Cerca un verb, en anglès o en català..." style="flex:1;min-width:220px"><label class="chk" style="margin:0"><input type="checkbox" id="va" ${all?'checked':''}> Tots (6è)</label></div><p class="muted" id="vn" style="margin:8px 0 0;font-size:15px"></p><div class="tablewrap"><table class="vt" id="vtb"></table></div></div>
 ${tab==='irr'?`<div class="card"><h3>Truc: aprèn-los per famílies</h3><div class="grid">${FAM.map(f=>`<div class="stat" style="background:var(--kobg)"><b style="font-size:16px;color:var(--s-angles)">${f.n[0].toUpperCase()+f.n.slice(1)}</b><span>${f.v.map(x=>{const y=IRR.find(i=>i.b===x);return`${x} → <b>${y.p[0]}</b>`}).join('<br>')}</span></div>`).join('')}</div></div>`
 :`<div class="card"><h3>Regles del passat regular</h3><div class="tablewrap"><table class="mini"><tr><th>Regla</th><th>Exemple</th></tr><tr><td>Normalment: + <b>-ed</b></td><td>walk → walked</td></tr><tr><td>Acaba en -e: només + <b>-d</b></td><td>dance → danced</td></tr><tr><td>Consonant + y: <b>-ied</b></td><td>study → studied</td></tr><tr><td>Vocal + y: + -ed</td><td>play → played</td></tr><tr><td>Vocal curta + consonant: <b>doble</b></td><td>stop → stopped</td></tr></table></div></div>`}
 <div class="card noprint"><h3>Practica'ls</h3><p class="muted" style="margin-top:0">Exercicis nous cada vegada, sense poder endevinar: s'han d'escriure.</p><div class="row">
 ${tab==='irr'?'<button data-p="en_irr_past">Passat dels irregulars</button><button class="sec" data-p="en_irr_pp">Participi dels irregulars</button><button class="sec" data-p="en_irr_inf">De quin verb ve?</button>':'<button data-p="en_reg_past">Passat dels regulars</button>'}<button class="sec" data-p="en_verb_sig">Significat dels verbs</button></div></div>`);
 document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>verbTable(b.dataset.t,back));
 $('#vback').onclick=()=>back==='kid'?kid():subject(back);
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15));
 const draw=()=>{const q=fold($('#vq').value),list=(tab==='irr'?IRR:REG).filter(v=>(all||!v.h)&&(!q||[v.b,...v.p,...v.ca].some(x=>fold(x).includes(q))));
  $('#vn').textContent=`${list.length} verbs${all?'':' bàsics (marca «Tots» per veure els de 6è)'}`;
  $('#vtb').innerHTML=`<tr><th>Infinitiu</th><th>Passat</th><th>Participi</th><th>Traducció</th>${tab==='reg'?'<th class="rg">Regla</th>':''}<th class="noprint sp"></th></tr>`+
   list.map(v=>`<tr data-s="${v.b}, ${v.p[0]}, ${v.pp[0]}"><td><b>${v.b}</b></td><td><b style="color:var(--s-angles)">${v.p.join(' / ')}</b></td><td><b style="color:var(--pri)">${v.pp.join(' / ')}</b></td><td>${caList(v)}</td>${tab==='reg'?`<td class="rg"><small>${regRule(v.b)}</small></td>`:''}<td class="noprint sp"><button class="ghost" style="min-height:38px;padding:4px 12px"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg></button></td></tr>`).join('')||'<tr><td colspan="6" class="muted">Cap verb coincideix amb la cerca.</td></tr>';
  $('#vtb').querySelectorAll('tr[data-s]').forEach(r=>r.onclick=()=>{say(r.dataset.s,.8,'en-GB');r.classList.add('spk');setTimeout(()=>r.classList.remove('spk'),900)})};
 $('#vq').oninput=draw;$('#va').onchange=e=>{all=e.target.checked;draw()};draw();
}

/* ---------- Temari ---------- */
function temari(forParent,el){const T=TEMARI.angles,c=+S.perfil.curs>=6?6:5;
 const html=`${forParent?'':`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><h2>Temari d'anglès</h2><p class="muted">Què s'aprèn a 5è i 6è de Primària.</p></div><button class="ghost" onclick="kid()">← Tornar</button></div>`}
 <div class="fb info" style="margin:0 0 18px">Temari orientatiu basat en els continguts habituals d'anglès del 3r cicle de Primària. Comprovau-lo amb el llibre i la programació de l'escola: amb fotos del llibre, la IA ajusta la sessió al que fa a classe.</div>
 ${[5,6].map(n=>`<div class="card subj" style="--c:var(--s-angles)"><div class="exhead"><h3 style="margin:0">${ORD[n]} de Primària</h3>${n===c?'<span class="chip" style="--c:var(--s-angles)">El teu curs</span>':''}</div>
  ${T[n].map(([t,sk])=>`<div class="sk"><span class="tile" style="--c:var(--s-angles);width:40px;height:40px;font-size:18px">${sk.length?IC.check:'<span class="muted">–</span>'}</span><span style="flex:1"><b style="font-weight:500">${t}</b><small>${sk.length?sk.map(k=>SK[k].nom).join(' · '):'Exercicis properament'}</small></span>
  ${sk.length?(forParent?`<button class="sec" data-add="${sk.join(',')}" style="min-height:42px;padding:8px 14px">+ Sessió</button>`:`<button class="sec" data-pr="${sk.join(',')}" style="min-height:42px;padding:8px 14px">Practicar</button>`):''}</div>`).join('')}</div>`).join('')}`;
 if(forParent){el.innerHTML=html+'<p class="muted" id="tmok"></p>'}else app(html);
 document.querySelectorAll('[data-pr]').forEach(b=>b.onclick=()=>start('exercicis',b.dataset.pr.split(','),15));
 document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const sk=b.dataset.add.split(',');S.sessio.skills=[...new Set([...S.sessio.skills,...sk])];save();b.textContent='Afegit';b.disabled=true;$('#tmok').textContent='Temes afegits a la sessió d\'avui. Revisau-la a la pestanya «Sessió d\'avui».'});
}

const PH=[['professor',.15],['aventura',.4],['exercicis',.25],['comprovacio',.2]];
function start(mode,ovSkills,ovMin){const skills=ovSkills||S.sessio.skills,min=ovMin||S.sessio.minuts;
 if(!skills.length&&mode!=='escriptura'){app(`<div class="card" style="text-align:center;max-width:560px;margin:40px auto 0">${OWL(64)}<h3>Encara no hi ha cap tema triat</h3><p class="muted">Els pares han de triar almenys un tema a la Zona famílies, o pots entrar a una assignatura des de l'inici.</p><button onclick="home()">Tornar a l'inici</button></div>`);return}
 CUR={t0:Date.now(),fin:Date.now()+min*60000,tot:0,ok:0,mode,skills:skills.slice()};phaseEnd=0;
 TIME_TOLD=false;
 if(mode==='combinada')return phase(0);
 runMode(mode,null,finish);
}
function phase(i){if(i>=PH.length)return finish();phaseEnd=Date.now()+S.sessio.minuts*PH[i][1]*60000;runMode(PH[i][0],i,()=>phase(i+1))}
// Pantalla concentrada (v5): barra superior (sortir, assignatura · tema, segments de progrés, n de N, rellotge),
// fases de la sessió combinada, columna de l'exercici i panell «Aquesta sessió».
function runMode(mode,pi,done){done=once(done);hideToast();CURPI=pi;PH_DUE=false;PHASE_NEXT=pi!=null&&pi<PH.length-1?done:null;CUR.cm=mode;
 app(`<header class="tb5"><button class="x5" id="xq" aria-label="Sortir de la sessió" title="Sortir">${IC.x}</button><div class="tb5-t" id="tbT"><i></i><span>${MODES[mode].nom}</span></div><div class="tb5-seg" id="tbS" aria-hidden="true"></div><span class="tb5-n" id="tbN"></span><span class="tb5-tm" id="tbTm"></span></header>
 <div class="fx5">${pi!=null?`<div class="fx5-top"><div class="stepper">${PH.map((p,j)=>`<div class="stp ${j===pi?'on':j<pi?'done':''}"><i>${j<pi?'✓':j+1}</i><span>${MODES[p[0]].nom}</span></div>`).join('')}</div>${pi<PH.length-1?'<button class="ghost" id="skip">Següent fase →</button>':''}</div>`:''}
 <div class="fx5-body"><div class="fx5-main" id="stage"></div><aside class="fx5-side" id="fxSide"></aside></div></div>`,true);
 $('#xq').onclick=()=>{hideToast();finish()};const sk=$('#skip');if(sk)sk.onclick=done;
 sessSide();
 ({professor:mProf,aventura:mAdv,exercicis:mEx,comprovacio:mChk,escriptura:mWrite})[mode]($('#stage'),done);
}
// Barra superior: k = tema actual, states = segments ('ok' a la primera, 'help' amb ajuda, 'ko' fallat, 'cur' actual, '' pendent)
const hst=h=>h.ok?(h.help?'help':'ok'):'ko';
function setBar(k,states,label){const t=$('#tbT');if(!t)return;
 if(k&&SK[k]){t.style.setProperty('--c',`var(--s-${matOf(k)})`);t.querySelector('span').textContent=`${SUBJ[matOf(k)].nom} · ${plain(SK[k].nom)}`}
 $('#tbS').innerHTML=(states||[]).map(s=>`<span class="${s}"></span>`).join('');$('#tbN').textContent=label||''}
const exLbl=k=>`<span class="lbl" style="${sc(k)};color:color-mix(in srgb,var(--c) 80%,#000)">${SUBJ[matOf(k)].nom} · ${SK[k].nom}</span>`;
// Panell lateral «Aquesta sessió» (ordinador)
function sessSide(){const el=$('#fxSide');if(!el||!CUR)return;const h=CUR.hist||[],first=h.filter(x=>x.ok&&!x.help).length,help=h.filter(x=>x.ok&&x.help).length,min=Math.floor((Date.now()-CUR.t0)/60000);
 const how={comprovacio:'Exercicis nous, <b>sense pistes</b> i amb un sol intent. Així sabrem què ja domines i què cal reforçar.',aventura:(typeof AVENTURA!=='undefined'&&AVENTURA.plan(CUR.skills))?'Recorre l\'illa prova a prova. Al final hi ha el <b>segell</b>: un exercici nou, <b>sense pistes</b> i amb un sol intent. Les gemmes només s\'aconsegueixen a la primera i sense ajuda.':'Cada prova té un <b>segell</b>: el mateix exercici amb dades noves i <b>sense pistes</b>. Les gemmes només s\'aconsegueixen sense ajuda.',
  professor:'Primer llegeix l\'explicació, després mira un exemple resolt pas a pas i al final practica amb ajuda.',escriptura:'Escriu al quadern amb la teva millor lletra. Quan acabis, fes una foto i corregeix-ho.'}[CUR.cm]
  ||'Si falles <b>2 vegades</b>, et mostrarem la solució pas a pas i després en faràs un de <b>nou</b>, amb altres nombres.';
 el.innerHTML=`<div class="card"><span class="lbl">Aquesta sessió</span><div class="sess5"><div><b style="color:#23885A">${first}</b><span>a la primera</span></div><div><b style="color:#B07A00">${help}</b><span>amb ajuda</span></div><div><b>${min}</b><span>${min===1?'minut':'minuts'}</span></div><div><b>${CUR.hints||0}</b><span>${CUR.hints===1?'pista usada':'pistes usades'}</span></div></div></div>
 <div class="card howto5"><span class="lbl">Com funciona</span>${how}</div>`}
// Què li falta per pujar de nivell (mateixos criteris que level() a nucli.js)
function nextStep(k){const p=S.prog[k],l=level(k);
 if(l<0)return'Comença practicant aquest tema.';
 if(l===0){const need=Math.max(0,3-(p.sense||0)),low=p.ok/p.att<.6;return`Per arribar a <b>Comprèn</b>: ${need?`encerta ${need} ${need===1?'exercici':'exercicis'} més sense ajuda${low?' i':''}`:''}${low?' puja els encerts per sobre del 60%':''}.`}
 if(l===1)return'Per arribar a <b>Domina</b>: fes la comprovació final sense pistes (75% o més).';
 return'Ho domines! Fes una comprovació de tant en tant perquè no se t\'oblidi.'}
function finish(){const c=CUR;endSession();hideToast();if(!c)return home();
 const h=c.hist||[],tot=c.tot,pc=tot?Math.round(c.ok/tot*100):0,first=h.filter(x=>x.ok&&!x.help).length,min=Math.max(1,Math.round((Date.now()-c.t0)/60000));
 const ks=c.skills.filter(k=>SK[k]),m=ks.length?matOf(ks[0]):'mates',one=ks.length===1;
 const R=82,C=2*Math.PI*R,ringR=`<svg class="res5-ring" width="190" height="190" viewBox="0 0 190 190" role="img" aria-label="${c.ok} de ${tot} encerts"><circle cx="95" cy="95" r="${R}" fill="none" stroke="#D2C4FB" stroke-width="7"/>${pc>0?`<circle cx="95" cy="95" r="${R}" fill="none" stroke="#8B6CF0" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C*pc/100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 95 95)"/>`:''}<circle cx="95" cy="95" r="62" fill="#fff"/><text x="95" y="100" text-anchor="middle" font-family="Poppins,system-ui" font-weight="300" font-size="44" fill="#1E1B3A">${c.ok}/${tot}</text><text x="95" y="124" text-anchor="middle" font-family="Poppins,system-ui" font-size="13" fill="#8A879E">encerts</text></svg>`;
 const lvB=k=>{const l=level(k);return`<div class="lvl5"><div class="lvl5-h"><span>${one?'El teu nivell en aquest tema':SK[k].nom}</span><em>Ara: ${LV_TXT[l+1]}</em></div><div class="lvl5-b">${[0,1,2].map(j=>`<i class="${l>=j?'l'+(j+1):''}"></i>`).join('')}</div><div class="lvl5-l"><span>En procés${l>=0?' ✓':''}</span><span>Comprèn${l>=1?' ✓':''}</span><span>Domina${l>=2?' ✓':''}</span></div><p>${nextStep(k)}</p></div>`};
 // errors típics d'aquesta sessió i punts forts
 const ec={};(c.errs||[]).forEach(e=>{const id=e.k+'|'+e.t;ec[id]=(ec[id]||0)+1});
 const errs=Object.entries(ec).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([id,n])=>{const[k,t]=id.split('|');return`<div class="res5-i"><span class="w">!</span><div><b>${SK[k].nom}.</b> ${t==='massa_rapid'?'Has respost massa de pressa: llegeix amb calma i pensa abans de respondre.':ERR[t].kid}${n>1?` <span class="muted">(${n} vegades)</span>`:''}</div></div>`});
 const good=ks.filter(k=>{const hk=h.filter(x=>x.k===k);return hk.length&&hk.every(x=>x.ok&&!x.help)}).slice(0,3).map(k=>`<div class="res5-i"><span class="g">✓</span><div><b>${SK[k].nom}.</b> Tot bé a la primera.</div></div>`);
 if(!good.length&&first)good.push(`<div class="res5-i"><span class="g">✓</span><div>Has encertat <b>${first}</b> ${first===1?'exercici':'exercicis'} a la primera.</div></div>`);
 // següent pas: el mateix tema si encara costa, o el tema següent de la unitat
 let nx=null;if(one){const lk=ks[0],U=unitsOf(m),all=U.flatMap(u=>u[1]),i=all.indexOf(lk);
  nx=level(lk)<1&&tot?{k:lk,mode:'exercicis',txt:`Torna a practicar: ${plain(SK[lk].nom)}`}:i>=0&&all[i+1]?{k:all[i+1],mode:level(all[i+1])<0?'professor':'exercicis',txt:`Continua: ${plain(SK[all[i+1]].nom)} →`}:null}
 const title=!tot?'Sessió acabada!':pc>=80?'Molt bona feina!':pc>=50?'Bona feina!':'Equivocar-se també és aprendre!';
 const nowLv=one?`${plain(SK[ks[0]].nom)} · ara <b>${LV_TXT[level(ks[0])+1]}</b>`:`${SUBJ[m].nom}${ks.length>1?` · ${ks.length} temes`:''}`;
 app(`<div class="res5" style="--c:var(--s-${m})"><div class="res5-in">
  <div class="res5-hero"><span class="res5-pill">${one?'Tema acabat':'Sessió acabada'}</span><h1>${title}</h1>
   ${tot?ringR:OWL(150)}<p>${nowLv}</p></div>
  <div class="res5-st"><div><span>A la primera</span><b>${first} de ${tot||0}</b></div><div><span>Temps</span><b>${min} min</b></div><div><span>Precisió</span><b>${tot?pc+'%':'—'}</b></div><div><span>Pistes</span><b>${c.hints||0}</b></div></div>
  <div class="card res5-lv">${ks.slice(0,4).map(lvB).join('')}</div>
  ${tot?`<div class="res5-2"><div class="res5-w"><b>Per vigilar</b>${errs.join('')||'<div class="res5-i"><span class="g">✓</span><div>Cap error típic en aquesta sessió.</div></div>'}</div>
   <div class="res5-g"><b>El que ja fas molt bé</b>${good.join('')||'<div class="res5-i"><span class="w">·</span><div>Continua practicant: cada exercici t\'ajuda a aprendre.</div></div>'}</div></div>`:''}
  <div class="res5-btn"><button class="${nx?'sec':''}" onclick="home()">Tornar a l'inici</button>${nx?`<button id="rNx">${esc(nx.txt)}</button>`:''}</div></div></div>`,true);
 if(nx)$('#rNx').onclick=()=>start(nx.mode,[nx.k],15)}

/* ---------- Mode 1: professor particular ---------- */
function mProf(el,done){const ks=CUR.skills;let i=0;
 el.innerHTML='<div id="pa"></div><div id="chatbox"></div>';chatUI($('#chatbox'));const pa=$('#pa');
 function theory(){if(i>=ks.length)return end();const s=SK[ks[i]];
  const extra=i===0&&S.sessio.explicacio?`<div class="fb info" style="white-space:pre-line"><b>Del teu llibre:</b> ${esc(S.sessio.explicacio)}</div>`:'';
  const pb=()=>setBar(ks[i],ks.map((_,j)=>j<i?"ok":j===i?"cur":""),`Tema ${i+1} de ${ks.length}`);pb();
  pa.innerHTML=`<div class="card">${exLbl(ks[i])}<h2 style="margin:6px 0 0">${s.nom}</h2><div class="owl" style="margin-top:16px"><div class="ic">${OWL(44)}</div><div class="bub">${s.teoria.map(t=>`<p>${t}</p>`).join('')}${extra}</div></div>${s.fig?`<div class="fig" style="margin-top:16px">${s.fig()}</div>`:''}
  <div class="row" style="margin-top:18px;justify-content:flex-end"><button class="sec" id="spk">${IC.speaker} Llegeix-m'ho</button><button id="go">Ho he llegit → Veure un exemple</button></div></div>`;
  $('#spk').onclick=()=>say(s.teoria.join(' ')+' '+(i===0?S.sessio.explicacio:''));$('#go').onclick=example}
 function example(){const p=genP(ks[i]);let j=0;
  const draw=()=>{pa.innerHTML=`<div class="card">${exLbl(ks[i])}<h3 style="margin:6px 0 0">Exemple resolt</h3><div class="prob">${p.text}</div><ol class="steps">${p.steps.slice(0,j).map(s=>`<li>${s}</li>`).join('')}</ol>
   ${j<p.steps.length?`<p class="muted">Abans de mirar-ho: què creus que toca fer ara?</p><button id="nx">Mostra el pas ${j+1}</button>`:'<button id="nx">Ara tu! </button>'}</div>`;
   $('#nx').onclick=()=>{if(j<p.steps.length){j++;draw()}else practice(2)}};draw()}
 function practice(n){let c=0;pa.innerHTML=`<div class="card">${exLbl(ks[i])}<h3 style="margin:6px 0 0">Practica amb ajuda</h3><div id="ex"></div></div>`;
  const next=()=>{if(c>=n){i++;return theory()}c++;exercise($('#ex'),ks[i],{mode:'prac',onDone:next})};next()}
 function end(){setBar(null,ks.map(()=>'ok'),'');pa.innerHTML='<div class="card"><h3 style="margin-top:0">Molt bé! Has repassat tots els temes.</h3><button id="fin">Continuar →</button></div>';$('#fin').onclick=done}
 theory();
}
function chatUI(el){
 if(!S.cfg.key){el.innerHTML='<p class="muted" style="font-size:15px">Si els teus pares activen la IA, podràs fer preguntes al Mestre Òliba.</p>';return}
 const hist=[];el.innerHTML=`<div class="card"><h3 style="margin-top:0">Tens algun dubte? Pregunta al Mestre Òliba</h3><div class="chat" id="cl"></div><div class="row" style="align-items:center"><input id="cq" placeholder="Escriu la teva pregunta..." style="flex:1;min-width:180px">${micBtn('cq')}<button id="cs">Envia</button></div></div>`;
 const add=(r,t)=>{const d=document.createElement('div');d.className='msg '+(r==='user'?'u':'m');d.textContent=t;$('#cl').appendChild(d);$('#cl').scrollTop=1e9;return d};
 const send=async()=>{const q=$('#cq').value.trim();if(!q)return;$('#cq').value='';add('user',q);hist.push({role:'user',parts:[{text:q}]});const w=add('model','...');
  try{const a=await gemini(hist,{system:tutorSys()});w.textContent=a;hist.push({role:'model',parts:[{text:a}]})}catch(e){w.textContent=''+e.message;hist.pop()}};
 $('#cs').onclick=send;$('#cq').onkeydown=e=>{if(e.key==='Enter')send()};
}

/* ---------- Mode 2: aventura clàssica (assignatures sense illa; el motor nou és a aventura.js) ---------- */
function mAdvClassic(el,done){const ks=CUR.skills;
 const mins=phaseEnd?(phaseEnd-Date.now())/60000:S.sessio.minuts;const n=Math.max(3,Math.min(STAGES.length,Math.round(mins/2.5)));
 let st=0,gems=0;
 function stage(){if(st>=n||(st>0&&timeUp()))return win();const s0=STAGES[st],k=ks[st%ks.length];setBar(k,STAGES.slice(0,n).map((x,j)=>j<st?"ok":j===st?"cur":""),`Prova ${st+1} de ${n}`);
  el.innerHTML=`<div class="card adv"><div class="advtop"><span>L'Illa dels Nombres Perduts</span><span class="gems">Gemmes: ${gems}</span></div><div class="path">${STAGES.slice(0,n).map((x,j)=>`<div class="st ${j<st?'done':j===st?'cur':''}">${j<st?IC.check:j+1}</div>`).join('')}</div>
  <div class="eyebrow">Prova ${st+1} de ${n}</div><h3 style="margin:0 0 4px">${s0.nom}</h3><p class="muted" style="margin:0">${s0.txt}</p><div id="ex" class="advbox"></div></div>`;
  exercise($('#ex'),k,{mode:'adv',onDone:()=>seal(k)})}
 function seal(k){$('#ex').innerHTML='<div class="fb info"><b>Segell del guardià:</b> la porta només s\'obre del tot si ho tornes a fer amb dades noves i <b>sense pistes</b>.</div><div id="ex2" style="margin-top:12px"></div>';
  exercise($('#ex2'),k,{mode:'seal',onDone:r=>{if(!r.help)gems++;const nx=()=>{st++;stage()};(st===1||st===3)?justify(el,k,r.p,nx):nx()}})}
 function win(){setBar(null,STAGES.slice(0,n).map(()=>"ok"),"");el.innerHTML=`<div class="card adv" style="text-align:center">${OWLM(64,"#F26B1D","#14213D")}<h2>Has superat l'aventura!</h2><p>Has aconseguit <b>${gems}</b> ${gems===1?'gemma':'gemmes'} (només s'aconsegueixen sense ajuda).</p><p>Superar l'aventura és un gran pas. Per saber si ho domines de veritat, cal fer exercicis nous sense pistes.</p><button id="c">Continuar →</button></div>`;$('#c').onclick=done}
 stage();
}
function justify(el,k,p,next){
 el.innerHTML=`<div class="card"><div class="owl"><div class="ic">${OWL(40)}</div><div><b>El guardià vol saber com ho has pensat.</b><p>Explica amb les teves paraules els passos que has fet per resoldre:</p><div style="font-size:20px">${p.text}</div></div></div>
 <textarea id="jt" rows="3" placeholder="Primer he..." style="margin-top:12px"></textarea><div class="row" style="margin-top:10px"><button id="js">Enviar explicació</button>${micBtn('jt')}</div><div id="jf"></div></div>`;
 $('#js').onclick=async()=>{const t=$('#jt').value.trim();
  if(t.length<15){$('#jf').innerHTML='<div class="fb warn">Explica-ho una mica més: què has fet primer? I després?</div>';return}
  const rec={data:new Date().toISOString(),k,text:t};S.just.push(rec);save();$('#js').disabled=true;
  if(S.cfg.key){$('#jf').innerHTML='<div class="fb info">El Mestre Òliba ho està llegint...</div>';
   try{const j=parseJSON(await gemini([{role:'user',parts:[{text:`Un infant de ${ORD[S.perfil.curs]} de Primària ha resolt correctament aquest exercici: "${plain(p.text)}" (solució: ${p.fields.map(ansStr).join(', ')}). Explica com ho ha fet: "${t}". Valora si l'explicació mostra que entén el procediment. Respon NOMÉS amb JSON: {"enten": true o false, "comentari": "1-2 frases en català, amables, adreçades a l'infant; si falta algun pas, fes-li una pregunta"}`}]}],{json:true}));
    rec.ia=j.enten?'entén el procediment':'explicació incompleta';save();$('#jf').innerHTML=`<div class="fb ${j.enten?'ok':'warn'}">${esc(j.comentari)}</div>`}
   catch(e){$('#jf').innerHTML='<div class="fb ok">Gràcies! Els teus pares podran llegir la teva explicació.</div>'}}
  else $('#jf').innerHTML='<div class="fb ok">Gràcies! Els teus pares podran llegir la teva explicació.</div>';
  $('#jf').insertAdjacentHTML('beforeend','<button id="jn" style="margin-top:10px">Continuar l\'aventura →</button>');$('#jn').onclick=next};
}

/* ---------- Mode 3: exercicis interactius ---------- */
function mEx(el,done){const ks=CUR.skills;let r=0;
 function next(){if(r>0&&timeUp()){el.innerHTML='<div class="card"><p>S\'ha acabat el temps d\'exercicis. Bona feina!</p><button id="c">Continuar →</button></div>';$('#c').onclick=done;return}
  const k=ks[r%ks.length];r++;{const sg=[...(CUR.hist||[]).slice(-7).map(hst),"cur"];while(sg.length<8)sg.push("");setBar(k,sg,`Repte ${r}`)}el.innerHTML=`<div class="card ex5">${exLbl(k)}<div id="ex"></div></div>`;
  if(r%2===1&&(k==='frac_equiv'||k==='frac_de_nombre'||k==='ci_ecosis'))manip($('#ex'),k,next);else exercise($('#ex'),k,{mode:'prac',showVis:true,onDone:next})}
 next();
}

/* ---------- Comprovació ---------- */
function mChk(el,done){const ks=CUR.skills,n=Math.min(8,Math.max(4,ks.length*2));let i=0;const res=[];
 el.innerHTML='<div class="card"><p style="margin-top:0">Exercicis nous, <b>sense pistes</b>. Així sabrem què ja domines i què cal reforçar.</p><div id="ex"></div></div>';
 const nx=()=>{if(i>=n)return show();const k=ks[i%ks.length];i++;setBar(k,Array.from({length:n},(_,j)=>j<res.length?(res[j]?"ok":"ko"):j===res.length?"cur":""),`${i} de ${n}`);$('#ex').innerHTML=`<div style="margin-top:14px">${exLbl(k)}</div><div id="ex2"></div>`;exercise($('#ex2'),k,{mode:'chk',onDone:r=>{res.push(r.ok);nx()}})};
 function show(){setBar(null,res.map(x=>x?"ok":"ko"),`${n} de ${n}`);el.innerHTML=`<div class="card"><h3 style="margin-top:0">Resultat: ${res.filter(x=>x).length} de ${n}</h3>${ks.map(k=>`<div class="topic5" style="${sc(k)}"><span class="ab5">${abOf(k)}</span><span class="tn"><b>${SK[k].nom}</b><small>${SUBJ[matOf(k)].nom}</small></span>${lvTag(k)}</div>`).join('')}<div style="margin-top:16px"></div><button id="c">Continuar →</button></div>`;$('#c').onclick=done}
 nx();
}

/* ---------- Escriptura a mà ---------- */
const DICT_EN={5:"My name is Pau. I have got a dog called Max. He is brown and white. We play in the park every day.",6:"Last summer I went to Menorca with my family. We swam in the sea and ate ice cream. It was the best holiday ever!"};
function mWrite(el,done){setBar(null,[],"");const en=S.sessio.dictatLang==='en',D=en?DICT_EN:DICTATS,txt=(S.sessio.dictat||D[S.perfil.curs]||D[5]).trim(),fr=(txt.match(/[^.!?]+[.!?]*/g)||[txt]).map(s=>s.trim()).filter(Boolean);let tipus='dictat';
 el.innerHTML='<div class="card"><p style="margin-top:0">Agafa el teu <b>quadern i un llapis</b>. Avui no escriuràs a la pantalla!</p><div class="row"><button id="td">Dictat</button><button class="sec" id="tc">Còpia</button></div><div id="w" style="margin-top:14px"></div></div><div id="res"></div>';
 const show=()=>{$('#td').className=tipus==='dictat'?'':'sec';$('#tc').className=tipus==='copia'?'':'sec';
  $('#w').innerHTML=(tipus==='dictat'?`<p>Escolta cada frase i escriu-la al quadern. La pots escoltar tantes vegades com vulguis.</p><div class="row">${fr.map((f,i)=>`<button class="sec" data-f="${i}"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg> Frase ${i+1}</button>`).join('')}</div>`
   :`<p>Copia aquest text al quadern amb la teva millor lletra:</p><div class="card" style="font-size:22px;font-family:Georgia,serif">${esc(txt)}</div>`)+
   '<h3>Quan acabis, fes una foto del quadern</h3><input type="file" id="ph" accept="image/*" capture="environment"><div class="row" style="margin-top:10px"><button id="cr">Corregeix</button></div>';
  $('#w').querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>say(fr[+b.dataset.f],.7,en?'en-GB':'ca-ES'));$('#cr').onclick=correct};
 $('#td').onclick=()=>{tipus='dictat';show()};$('#tc').onclick=()=>{tipus='copia';show()};show();
 async function correct(){const f=$('#ph').files[0],res=$('#res');
  if(!S.cfg.key){res.innerHTML=`<div class="card"><h3 style="margin-top:0">Corregeix-ho tu mateix</h3><p>Compara el que has escrit amb el text correcte:</p><div class="card" style="font-size:20px">${esc(txt)}</div><p>Revisa: majúscules accents punts i comes paraules oblidades</p><p class="muted">Amb la IA activada, l'app corregirà la foto automàticament.</p><button id="fi2">He acabat</button></div>`;$('#fi2').onclick=done;return}
  if(!f){res.innerHTML='<div class="fb warn">Primer fes o tria una foto del quadern.</div>';return}
  res.innerHTML='<div class="fb info">El Mestre Òliba està llegint el teu quadern...</div>';
  try{const part=await fileToPart(f);
   const prompt=`Ets un mestre de Primària de les Illes Balears que corregeix un exercici escrit a mà per un infant de ${ORD[S.perfil.curs]}. El text està en ${en?'anglès (és la classe d\'anglès; les explicacions per a l\'infant, escriu-les en català)':'català'}.
Tipus d'exercici: ${tipus==='dictat'?'dictat':'còpia'}. Text de referència (el que havia d'escriure): "${txt}".
Mira la foto del quadern i compara-la amb el text de referència. Respon NOMÉS amb JSON:
{"transcripcio":"el que llegeixes que ha escrit","llegibilitat":"bona|regular|difícil","errors":[{"escrit":"...","correcte":"...","tipus":"ortografia|accentuació|puntuació|majúscules|paraula oblidada|gramàtica|altre","explicacio":"explicació breu i amable per a l'infant","confianca":"segura|dubtosa"}],"valoracio":"2 frases positives i concretes","consell_lletra":"un consell sobre la lletra, només sobre el que es veu clarament","exercici_proposat":"un exercici curt per practicar el que ha fallat"}
Marca "dubtosa" quan no puguis llegir bé la lletra i no estiguis segur de si és un error real o una mala lectura teva. No t'inventis errors.`;
   const j=parseJSON(await gemini([{role:'user',parts:[part,{text:prompt}]}],{json:true})),errs=j.errors||[];
   S.escrit.push({data:new Date().toISOString(),tipus,errors:errs.map(e=>({escrit:e.escrit,correcte:e.correcte,tipus:e.tipus,confianca:e.confianca}))});save();
   res.innerHTML=`<div class="card"><h3 style="margin-top:0">Correcció</h3><p>${esc(j.valoracio)}</p>
   ${errs.length?`<ul>${errs.map(e=>`<li class="${e.confianca==='dubtosa'?'err-dub':''}">${e.confianca==='dubtosa'?'<i>No ho llegeixo bé:</i> ':''}<b>${esc(e.escrit)}</b> → <b>${esc(e.correcte)}</b> <span class="muted">(${esc(e.tipus)})</span><br><span style="color:var(--ink)">${esc(e.explicacio)}</span></li>`).join('')}</ul>`:'<p class="err-ok">No he trobat errors!</p>'}
   ${j.consell_lletra?`<p><b>Sobre la lletra:</b> ${esc(j.consell_lletra)}</p>`:''}
   ${j.exercici_proposat?`<div class="fb info">📝 <b>Per practicar:</b> ${esc(j.exercici_proposat)}</div>`:''}
   <details style="margin-top:10px"><summary class="muted">El que he llegit</summary><p>${esc(j.transcripcio)}</p></details>
   <p class="muted" style="font-size:14px">Els errors marcats amb són dubtosos: potser la IA no ha llegit bé la lletra. Comproveu-ho amb el quadern.</p><button id="fi2">He acabat</button></div>`;$('#fi2').onclick=done;
  }catch(e){res.innerHTML=`<div class="fb ko">No s'ha pogut corregir: ${esc(e.message)}</div>`}}
}

/* ===================== zona pares ===================== */
function parent(tab){endSession();if(!PARENT_OK)return askPin();nav('families');const T={sessio:'Sessió d\'avui',prog:'Progrés',tem:'Temari',cfg:'Configuració'};
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><h2>Zona famílies</h2><p class="muted">Prepareu la sessió d'avui i seguiu el progrés${S.perfil.nom?' de '+esc(S.perfil.nom):''}.</p></div><button class="ghost" onclick="home()"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> Sortir</button></div><div class="tabs">${Object.entries(T).map(([k,v])=>`<button class="${k===tab?'on':''}" onclick="parent('${k}')">${v}</button>`).join('')}</div><div id="pz"></div>`);
 ({sessio:pSessio,prog:pProg,tem:el=>temari(true,el),cfg:pCfg})[tab]($('#pz'))}

function recom(){const L=Object.keys(SK).map(k=>({k,l:level(k),e:Object.values(S.prog[k]?.errs||{}).reduce((a,b)=>a+b,0)}));
 const weak=L.filter(x=>x.l===0).sort((a,b)=>b.e-a.e).map(x=>x.k),comp=L.filter(x=>x.l===1).map(x=>x.k),nous=L.filter(x=>x.l<0).map(x=>x.k);
 const nm=a=>a.map(k=>SK[k].nom).join('</b> i <b>');
 if(weak.length)return{skills:weak.slice(0,2),mode:'combinada',text:`Cal reforçar <b>${nm(weak.slice(0,2))}</b>. Recomanem una <b>sessió combinada</b>: explicació, pràctica guiada i comprovació.`};
 if(comp.length)return{skills:comp.slice(0,2),mode:'aventura',text:`Ja comprèn <b>${nm(comp.slice(0,2))}</b>. Per arribar a dominar-ho ha d'aplicar-ho sense ajuda: recomanem l'<b>aventura</b> i després una comprovació.`};
 if(nous.length)return{skills:[nous[0]],mode:'professor',text:`Encara no ha treballat <b>${SK[nous[0]].nom}</b>. Recomanem començar amb el <b>professor particular</b>.`};
 return{skills:S.sessio.skills,mode:'comprovacio',text:'Domina tots els temes treballats. Feu una <b>comprovació</b> ràpida per mantenir-ho, o introduïu temari nou amb fotos del llibre.'}}

function pSessio(el){const s=S.sessio,r=recom();let mode=s.mode;
 el.innerHTML=`<div class="card"><h3 style="margin-top:0">Preparar la sessió amb IA</h3>
 ${S.cfg.key?'':'<div class="fb warn" style="margin-top:0">Per preparar sessions a partir de fotos cal una clau gratuïta de Google AI Studio (pestanya <b>Configuració</b>). Mentrestant, podeu preparar la sessió manualment aquí davall.</div>'}
 <label>Fotos o documents del llibre o de les fitxes</label><input type="file" id="fi" accept="image/*,application/pdf" multiple>
 <label>Què ha d'estudiar? (podeu escriure o dictar)</label><textarea id="ins" rows="3" placeholder="Ex.: Demà té un examen de fraccions. Té 30 minuts per estudiar. Prepara activitats perquè ho entengui i comprova si està preparat."></textarea>
 <div class="row" style="margin-top:10px"><button id="ai" ${S.cfg.key?'':'disabled'}>Preparar amb IA</button>${micBtn('ins')}</div><div id="aist"></div></div>
 <div class="card"><h3 style="margin-top:0">Sessió d'avui</h3>${s.resum?`<div class="fb info" style="margin-top:0">${esc(s.resum)}</div>`:''}
 <label>Temes</label>${Object.entries(SUBJ).map(([m,sb])=>`<div class="subjh"><span class="tile" style="--c:var(--s-${m});width:36px;height:36px;font-size:18px">${sb.ic}</span>${sb.nom}</div>`+skillsOf(m).map((k,i,a)=>{const v=SK[k];return(v.bloc&&v.bloc!==SK[a[i-1]]?.bloc?`<div class="bloch">${v.bloc}</div>`:'')+`<label class="chk"><input type="checkbox" value="${k}" ${s.skills.includes(k)?'checked':''}><span>${v.ic}</span> ${v.nom} ${badge(k)}</label>`}).join('')).join('')}
 <label>Preguntes de ciències del llibre (opcional, una per línia: <i>pregunta = resposta</i>). Es fan servir al tema «Preguntes del llibre».</label><textarea id="pq" rows="3" placeholder="Quin òrgan bombeja la sang? = cor">${esc((s.preguntes||[]).map(x=>`${x.q} = ${x.a}`).join('\n'))}</textarea>
 <label>Vocabulari d'anglès de la unitat (opcional, una paraula per línia: <i>cat = gat</i>)</label><textarea id="vo" rows="3" placeholder="cat = gat&#10;dog = gos">${esc((s.vocab||[]).map(w=>`${w.en} = ${w.ca}`).join('\n'))}</textarea>
 <label>Temps disponible (minuts)</label><select id="mi">${[...new Set([10,15,20,30,45,60,+s.minuts])].sort((a,b)=>a-b).map(m=>`<option ${m==s.minuts?'selected':''}>${m}</option>`).join('')}</select>
 <label>Com estudiarà avui?</label><div class="grid" id="md">${Object.entries(MODES).map(([k,m])=>modeBtn(k,m,k===mode?' sel':'')).join('')}</div>
 <label>Explicació del llibre (opcional; la veurà al mode Professor)</label><textarea id="ex" rows="3">${esc(s.explicacio)}</textarea>
 <label>Text per al dictat o la còpia (opcional)</label><textarea id="dc" rows="3" placeholder="Si ho deixau buit, s'usarà un text de mostra.">${esc(s.dictat)}</textarea>
 <label>Idioma del dictat</label><select id="dl"><option value="ca" ${s.dictatLang!=='en'?'selected':''}>Català</option><option value="en" ${s.dictatLang==='en'?'selected':''}>Anglès</option></select>
 <div class="row" style="margin-top:14px;align-items:center"><button id="sv">Desar la sessió</button><span id="svok" class="muted"></span></div></div>
 <div class="card"><h3 style="margin-top:0">Recomanació</h3><p>${r.text}</p><button class="sec" id="ap">Aplicar la recomanació</button></div>`;
 el.querySelectorAll('#md .mode').forEach(b=>b.onclick=()=>{mode=b.dataset.m;el.querySelectorAll('#md .mode').forEach(x=>x.classList.toggle('sel',x===b))});
 const collect=()=>{S.sessio={...S.sessio,skills:[...el.querySelectorAll('label.chk input:checked')].map(i=>i.value),minuts:+$('#mi').value,mode,explicacio:$('#ex').value.trim(),dictat:$('#dc').value.trim(),dictatLang:$('#dl').value,
  preguntes:$('#pq').value.split('\n').map(l=>{const i=l.lastIndexOf('=');return i<0?null:{q:l.slice(0,i).trim(),a:l.slice(i+1).trim()}}).filter(x=>x&&x.q&&x.a).map(x=>({...x,...((S.sessio.preguntes||[]).find(o=>o.q===x.q&&o.a===x.a)||{})})),
  vocab:$('#vo').value.split('\n').map(l=>l.split('=')).filter(x=>x.length>1&&x[0].trim()&&x[1].trim()).map(([en,ca])=>{en=en.trim();const old=(S.sessio.vocab||[]).find(w=>w.en===en);return{en,ca:ca.trim(),em:old?.em||''}})}};
 $('#sv').onclick=()=>{collect();if(!S.sessio.skills.length&&mode!=='escriptura'){$('#svok').textContent='Triau almenys un tema.';return}save();$('#svok').textContent='Desada. L\'infant ja la té a la seva zona.'};
 $('#ap').onclick=()=>{S.sessio={...S.sessio,skills:r.skills,mode:r.mode};save();pSessio(el);$('#svok').textContent='Recomanació aplicada.'};
 $('#ai').onclick=async()=>{const st=$('#aist'),files=[...$('#fi').files],ins=$('#ins').value.trim();
  if(!files.length&&!ins){st.innerHTML='<div class="fb warn">Afegiu alguna foto o escriviu què ha d\'estudiar.</div>';return}
  // es desa el que hi ha marcat al formulari (encara que no s'hagi premut «Desar») i la IA ho respecta
  collect();const marked=S.sessio.skills.filter(k=>SK[k]);
  st.innerHTML='<div class="fb info">Llegint el material i preparant la sessió... Pot tardar fins a un minut: no tanqueu la pàgina.</div>';$('#ai').disabled=true;
  try{const parts=await Promise.all(files.map(fileToPart));
   const nomK=k=>SUBJ[matOf(k)].nom+' – '+SK[k].nom;
   parts.push({text:`Ets l'assistent pedagògic d'una aplicació d'estudi en català per a infants de Primària (currículum de les Illes Balears). Assignatures de l'app: ${Object.values(SUBJ).map(s=>s.nom).join(', ')}. L'infant fa ${ORD[S.perfil.curs]} de Primària.
Els pares han enviat ${files.length} foto(s)/document(s) del temari i aquesta instrucció: "${ins||'(cap)'}".
${marked.length?`MOLT IMPORTANT: els pares ja han marcat a mà els temes que entren (${marked.map(k=>k+': '+nomK(k)).join('; ')}). Aquests temes es mantenen tots i no se n'hi afegeix cap altre: a "habilitats" posa exactament aquests ids. Centra l'explicació, el resum, el dictat i les preguntes en aquests temes.
`:''}Habilitats disponibles a l'app (id: assignatura – nom): ${Object.keys(SK).map(k=>k+': '+nomK(k)).join('; ')}.
Respon NOMÉS amb JSON:
{"habilitats":[ids de la llista que encaixen amb el temari],"minuts":nombre o null,"mode":"combinada"|"professor"|"aventura"|"exercicis"|"escriptura"|"comprovacio"|null,"resum_pares":"2-3 frases: què has entès del temari i què treballarà la sessió","explicacio_infant":"explicació breu i clara del concepte principal, adaptada a l'infant i basada en el llibre (màxim 120 paraules; si els pares demanen un resum, fes un resum dels temes en punts curts, un per línia començant per «- », de fins a 220 paraules)","dictat":"si el temari és de llengua (català o anglès) o demanen escriptura, 3-5 frases per dictar en aquella llengua; si no, cadena buida","dictat_idioma":"ca"|"en","vocabulari":[{"en":"paraula anglesa","ca":"traducció catalana","emoji":"un emoji que la representi"}] (si el temari és d'anglès, fins a 20 paraules de la unitat; si no, llista buida),"preguntes":[{"q":"pregunta curta sobre el llibre","a":"resposta curta (1-3 paraules); si hi ha sinònims vàlids, separa'ls amb |","h":"pista que no doni la resposta","ex":"explicació breu per a l'infant"}] (si el temari és de Medi (ciències naturals o socials), 8-12 preguntes de resposta curta i inequívoca extretes del llibre, i afegeix "ci_llibre" a habilitats; si no, llista buida),"fora_abast":"si part del temari no encaixa amb cap habilitat disponible, explica-ho breument; si no, cadena buida"}
Si hi ha un examen proper, prioritza el mode "combinada" (acaba amb comprovació).`});
   const j=parseJSON(await gemini([{role:'user',parts}],{json:true})),sk=(j.habilitats||[]).filter(k=>SK[k]);
   // amb temes marcats, la IA no els canvia (només hi pot sumar «Preguntes del llibre» si n'ha generat)
   const skills=marked.length?[...new Set([...marked,...(sk.includes('ci_llibre')&&Array.isArray(j.preguntes)&&j.preguntes.length?['ci_llibre']:[])])]:(sk.length?sk:S.sessio.skills);
   S.sessio={...S.sessio,skills,minuts:+j.minuts||S.sessio.minuts,mode:MODES[j.mode]?j.mode:S.sessio.mode,explicacio:j.explicacio_infant||'',dictat:j.dictat||S.sessio.dictat,dictatLang:j.dictat?(j.dictat_idioma==='en'?'en':'ca'):S.sessio.dictatLang,
    preguntes:Array.isArray(j.preguntes)&&j.preguntes.length?j.preguntes.filter(x=>x.q&&x.a).map(x=>({q:String(x.q),a:String(x.a),h:x.h||'',ex:x.ex||''})):S.sessio.preguntes,
    vocab:Array.isArray(j.vocabulari)&&j.vocabulari.length?j.vocabulari.filter(w=>w.en&&w.ca).map(w=>({en:String(w.en).trim(),ca:String(w.ca).trim(),em:w.emoji||''})):S.sessio.vocab,resum:(j.resum_pares||'')+(j.fora_abast?' '+j.fora_abast:'')};
   save();pSessio(el);$('#svok').textContent=marked.length?`Sessió preparada amb IA i desada. S'han mantingut els ${marked.length} temes que havíeu marcat.`:'Sessió preparada amb IA i desada. Revisau-la si voleu.';
  }catch(e){st.innerHTML=`<div class="fb ko">No s'ha pogut preparar: ${esc(e.message)}</div>`;$('#ai').disabled=false}};
}

function pProg(el){const log=S.log,tot=log.reduce((a,b)=>a+b.min,0),wk=log.filter(l=>Date.now()-new Date(l.data)<7*864e5).reduce((a,b)=>a+b.min,0);
 const errs=[];for(const[k,p]of Object.entries(S.prog))for(const[t,n]of Object.entries(p.errs))if(ERR[t]&&SK[k])errs.push({k,t,n});errs.sort((a,b)=>b.n-a.n);
 const stat=(v,l)=>`<div class="stat"><b>${v}</b><span class="muted">${l}</span></div>`;
 el.innerHTML=`<div class="card"><h3 style="margin-top:0">Resum${S.perfil.nom?' de '+esc(S.perfil.nom):''}</h3><div class="grid">${stat(Math.round(wk)+' min','aquesta setmana')}${stat(log.length,'sessions')}${stat(Math.round(tot)+' min','en total')}</div></div>
 <div class="card"><h3 style="margin-top:0">Què sap fer</h3><div class="tablewrap"><table><tr><th>Tema</th><th>Nivell</th><th>Exercicis</th><th>Encerts</th><th>Sense ajuda</th></tr>${Object.entries(SUBJ).map(([m,sb])=>`<tr class="grp-h"><th colspan="5">${sb.ic} ${sb.nom}</th></tr>`+skillsOf(m).map(k=>[k,SK[k]]).map(([k,v])=>{const p=S.prog[k];return`<tr><td><div class="row" style="align-items:center;flex-wrap:nowrap;gap:10px"><span class="tile" style="${sc(k)};width:36px;height:36px;font-size:18px">${v.ic}</span><b style="font-weight:500">${v.nom}</b></div></td><td>${badge(k)}</td><td>${p?.att||0}</td><td>${p?.att?Math.round(p.ok/p.att*100)+'%':'—'}</td><td>${p?.sense||0}</td></tr>`}).join('')).join('')}</table></div>
 <p class="muted" style="font-size:14px"><b>En procés:</b> necessita ajuda o explicacions. <b>Comprèn:</b> resol exercicis sense pistes. <b>Domina:</b> supera la comprovació amb exercicis nous i sense ajuda.</p></div>
 <div class="card"><h3 style="margin-top:0">Errors habituals</h3>${errs.length?'<ul>'+errs.slice(0,6).map(e=>`<li>${ERR[e.t].par} <span class="muted">(${SK[e.k].nom}, ${e.n} ${e.n>1?'vegades':'vegada'})</span></li>`).join('')+'</ul>':'<p class="muted">Encara no hi ha dades.</p>'}</div>
 <div class="card"><h3 style="margin-top:0">Com explica el que fa</h3>${S.just.slice(-5).reverse().map(j=>`<p>«${esc(j.text)}» <span class="muted">— ${SK[j.k]?.nom||''}${j.ia?' · IA: '+esc(j.ia):''}</span></p>`).join('')||'<p class="muted">Les explicacions que escrigui durant l\'aventura apareixeran aquí.</p>'}</div>
 <div class="card"><h3 style="margin-top:0">Escriptura a mà</h3>${S.escrit.slice(-5).reverse().map(w=>`<p><b>${new Date(w.data).toLocaleDateString('ca')}</b> · ${w.tipus}: ${w.errors.length} errors (${w.errors.filter(e=>e.confianca==='dubtosa').length} dubtosos)${w.errors.length?' — '+w.errors.slice(0,4).map(e=>esc(e.escrit+' → '+e.correcte)).join(', '):''}</p>`).join('')||'<p class="muted">Encara no hi ha dades.</p>'}</div>
 <div class="card"><h3 style="margin-top:0">Recomanació per a la propera sessió</h3><p>${recom().text}</p></div>
 <div class="card"><h3 style="margin-top:0">Darreres sessions</h3>${log.length?`<div class="tablewrap"><table><tr><th>Data</th><th>Minuts</th><th>Mode</th><th>Encerts</th></tr>${log.slice(-8).reverse().map(l=>`<tr><td>${new Date(l.data).toLocaleString('ca',{dateStyle:'short',timeStyle:'short'})}</td><td>${l.min}</td><td>${MODES[l.mode]?.ic||''} ${MODES[l.mode]?.nom||l.mode}</td><td>${l.ok}/${l.tot}</td></tr>`).join('')}</table></div>`:'<p class="muted">Encara no hi ha sessions.</p>'}</div>
 <button class="ghost" id="rs">Esborrar tot el progrés</button>`;
 let arm=false;$('#rs').onclick=()=>{if(!arm){arm=true;$('#rs').textContent='Segur? Torna a pitjar per esborrar-ho tot (no es pot desfer)';$('#rs').style.color='var(--ko)';return}S.prog={};S.log=[];S.just=[];S.escrit=[];save();parent('prog')}}

function pCfg(el){const c=S.cfg,p=S.perfil;
 el.innerHTML=`<div class="card"><h3 style="margin-top:0">Infant</h3><label>Nom</label><input id="nm" value="${esc(p.nom)}">
 <label>Curs</label><select id="cu">${[1,2,3,4,5,6].map(n=>`<option value="${n}" ${n==p.curs?'selected':''} ${n<5?'disabled':''}>${ORD[n]} de Primària${n<5?' (properament)':''}</option>`).join('')}</select>
 <label class="chk" style="margin-top:14px"><input type="checkbox" id="rl" ${p.rellotge!==false?'checked':''}> Mostrar el rellotge de compte enrere a l'infant</label><small>Si l'amagau, l'app igualment avisa quan toca canviar de part o acabar.</small>
 <div class="row" style="margin-top:14px;align-items:center"><button id="sv0">Desar</button><span id="st0" class="muted"></span></div></div>
 <div class="card"><h3 style="margin-top:0"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> PIN de la zona de famílies</h3><p class="muted" style="margin-top:0">Serveix perquè els infants no puguin entrar aquí.</p><button class="sec" id="cpin">Canviar el PIN</button></div>
 <div class="card"><h3 style="margin-top:0">Intel·ligència artificial <span class="badge bn">opcional</span></h3>
 ${window.APRENEM_WEB?'<div class="fb ko" style="margin-top:0">Esteu fent servir la versió publicada a Claude (la del mòbil). Aquesta versió no pot connectar amb Google, i per tant la IA no hi funciona. Per fer servir la IA, obriu l\'arxiu <b>aprenem-beta.html</b> des de l\'ordinador.</div>':''}
 <p><b>No cal configurar res per fer servir l'app.</b> Les explicacions, l'aventura, els exercicis, la comprovació i el seguiment funcionen sense IA.</p>
 <p>La IA és un extra que fa quatre coses:</p>
 <ul class="steps-ai"><li>Llegir les fotos del llibre i preparar la sessió tota sola.</li><li>Respondre els dubtes de l'infant (xat amb el Mestre Òliba).</li><li>🗣️ Valorar si l'infant explica bé com ha resolt un exercici.</li><li>Corregir la foto del quadern (dictats i còpies).</li></ul>
 <p>Per activar-la cal una <b>clau gratuïta de Google</b>, com una contrasenya que deixa que l'app parli amb la IA de Google (Gemini). Es fa una sola vegada i tarda uns 5 minuts:</p>
 <ol class="steps-ai"><li>Obriu <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> i entrau amb un compte de Google (el del Gmail serveix).</li><li>Pitjau el botó <b>Create API key</b> (Crear clau).</li><li>Copiau la clau que surt. És un codi llarg que comença per <code class="k">AQ.</code> o per <code class="k">AIza</code>.</li><li>Enganxau-la al quadre de davall i pitjau <b>Desar</b>.</li><li>Pitjau <b>Provar la connexió</b>. Si surt «Connexió correcta», ja està.</li></ol>
 <label for="ky">Clau de Google (enganxau-la aquí)</label><input id="ky" type="password" value="${esc(c.key)}" placeholder="AQ... o AIza..." autocomplete="off">
 <details style="margin-top:12px"><summary class="muted">Opcions avançades</summary><label for="mo">Model de Gemini</label><input id="mo" value="${esc(c.model)}"><small>Deixau-hi «${GEMINI_MODEL}» si no sabeu què és.</small></details>
 <div class="row" style="margin-top:16px;align-items:center"><button id="sv">Desar</button><button class="sec" id="ts">Provar la connexió</button></div><div id="st"></div>
 <div class="fb warn"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> La clau només es guarda en aquest aparell. Quan feu servir la IA, el text i les fotos s'envien a Google, que al pla gratuït les pot fer servir per millorar els seus productes. <b>No envieu fotos amb la cara, el nom complet o altres dades personals de l'infant.</b></div></div>`;
 const keep=()=>{S.perfil={nom:$('#nm').value.trim(),curs:+$('#cu').value,rellotge:$('#rl').checked};S.cfg={key:$('#ky').value.trim(),model:$('#mo').value.trim()||GEMINI_MODEL};save()};
 const msg=(cls,t)=>$('#st').innerHTML=`<div class="fb ${cls}">${t}</div>`;
 $('#sv0').onclick=()=>{keep();$('#st0').textContent='Desat.'};
 $('#cpin').onclick=()=>{S.pin='';save();askPin()};
 $('#sv').onclick=()=>{keep();msg('ok',S.cfg.key?'Clau desada. Ara pitjau «Provar la connexió».':'Desat. No hi ha cap clau: l\'app funcionarà sense IA.')};
 $('#ts').onclick=async()=>{keep();if(!S.cfg.key)return msg('warn','Primer enganxau la clau al quadre «Clau de Google» i pitjau «Desar». Si no en teniu, seguiu els 5 passos de dalt.');
  msg('info','Provant la connexió amb Google...');
  try{await gemini([{role:'user',parts:[{text:'Respon només amb la paraula: correcte'}]}]);msg('ok','Connexió correcta. La IA ja està activada.')}
  catch(e){msg('ko',window.APRENEM_WEB?'En aquesta versió publicada la IA no pot funcionar. Feu-la servir des de l\'arxiu de l\'ordinador.':/API key not valid|API_KEY_INVALID/i.test(e.message)?'La clau no és vàlida. Comprovau que l\'heu copiada sencera, sense espais.':/fetch/i.test(e.message)?'No s\'ha pogut connectar. Comprovau la connexió a internet.':'No ha funcionat: '+esc(e.message))}}}

