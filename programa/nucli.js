/* Aprenem - estat, progres, rellotge, veu, IA i components d exercici
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ===================== estat ===================== */
const GEMINI_MODEL='gemini-3.8-flash';   // model per defecte (Google retira els antics per als comptes nous)
const DEF={perfil:{nom:'',curs:6},cfg:{key:'',model:GEMINI_MODEL},sessio:{skills:['frac_equiv','frac_suma_igual'],minuts:30,mode:'combinada',explicacio:'',dictat:'',resum:''},prog:{},log:[],just:[],escrit:[]};
let S;try{S=Object.assign(JSON.parse(JSON.stringify(DEF)),JSON.parse(localStorage.getItem('aprenem_v1')||'{}'))}catch(e){S=JSON.parse(JSON.stringify(DEF))}
// Els aparells que tenien desat un model antic (gemini-1.x / 2.x) passen al model nou
if(!S.cfg||typeof S.cfg!=='object')S.cfg={key:'',model:GEMINI_MODEL};
if(!S.cfg.model||/^gemini-(1|2)\./.test(S.cfg.model))S.cfg.model=GEMINI_MODEL;
const save=()=>{try{localStorage.setItem('aprenem_v1',JSON.stringify(S))}catch(e){}};
const P_=k=>S.prog[k]||(S.prog[k]={att:0,ok:0,sense:0,ajuda:0,errs:{},chk:[],last:0});
let CUR=null,phaseEnd=0;
function record(k,ok,help,chk){const p=P_(k);p.att++;if(ok)p.ok++;if(ok&&!help)p.sense++;if(help)p.ajuda++;if(chk){p.chk.push(ok?1:0);p.chk=p.chk.slice(-6)}p.last=Date.now();if(CUR){CUR.tot++;if(ok)CUR.ok++;(CUR.hist=CUR.hist||[]).push({k,ok,help:!!help,chk:!!chk})}save();if(typeof sessSide==="function")sessSide()}
function recErr(k,t){const p=P_(k);p.errs[t]=(p.errs[t]||0)+1;if(CUR)(CUR.errs=CUR.errs||[]).push({k,t});save()}
function level(k){const p=S.prog[k];if(!p||!p.att)return -1;const c=p.chk.slice(-4);
 if(c.length>=3&&c.reduce((a,b)=>a+b,0)/c.length>=.75&&p.sense>=3)return 2;
 if(p.sense>=3&&p.ok/p.att>=.6)return 1;return 0}
const badge=k=>{const l=level(k);return l<0?'<span class="badge bn">Sense dades</span>':`<span class="badge b${l}">${LV[l]}</span>`};
const genP=k=>({...SK[k].gen(Math.max(0,level(k)),+S.perfil.curs),k});
const timeUp=()=>phaseEnd?Date.now()>phaseEnd:(CUR&&Date.now()>CUR.fin);
function endSession(){if(typeof hideToast==='function')hideToast();if(!CUR)return;const min=(Date.now()-CUR.t0)/60000;if(min>.3||CUR.tot)S.log.push({data:new Date().toISOString(),min:Math.round(min*10)/10,mode:CUR.mode,skills:CUR.skills,tot:CUR.tot,ok:CUR.ok});CUR=null;phaseEnd=0;save()}
/* ---- rellotge: avís a 1 minut, avís a zero i pas automàtic de fase ---- */
let PHASE_NEXT=null,PH_DUE=false,TIME_TOLD=false,CURPI=null;
function toast(msg,label,fn){hideToast();const d=document.createElement('div');d.id='toast';d.setAttribute('role','status');d.innerHTML=`<span>${msg}</span>${label?`<button>${label}</button>`:''}<button class="ghost tx" aria-label="Tancar">✕</button>`;
 if(label)d.querySelector('button').onclick=fn;d.querySelector('.tx').onclick=hideToast;document.body.appendChild(d)}
function hideToast(){const t=$('#toast');if(t)t.remove()}
const nextPhaseNow=()=>{const n=PHASE_NEXT;PH_DUE=false;PHASE_NEXT=null;hideToast();if(n)n()};
const goOn=f=>()=>{if(PH_DUE&&PHASE_NEXT)nextPhaseNow();else f()};
setInterval(()=>{const t=$('#timer');if(!CUR){t.textContent='';t.className='';return}
 const now=Date.now(),left=CUR.fin-now,pl=phaseEnd?phaseEnd-now:null,show=S.perfil.rellotge!==false,ref=pl!=null&&PHASE_NEXT?pl:left;
 t.textContent=show?mmss(Math.max(0,left))+(pl!=null?` · fase ${mmss(Math.max(0,pl))}`:''):'';
 t.className=show?(ref<=0?'t-end':ref<=60000?'t-warn':''):'';
 if(pl!=null&&pl<=0&&PHASE_NEXT&&!PH_DUE){PH_DUE=true;toast(`S'ha acabat el temps d'aquesta part. Quan acabis l'exercici, passarem a <b>${MODES[PH[CURPI+1][0]].nom}</b>.`,'Passar ara',nextPhaseNow)}
 else if(left<=0&&!TIME_TOLD&&!PHASE_NEXT){TIME_TOLD=true;toast('S\'ha acabat el temps de la sessió. Pots acabar l\'exercici que estàs fent.','Acabar ara',()=>{hideToast();finish()})}
},1000);
// Pinta una pantalla. focus=true: pantalla concentrada (exercici, resultat), sense menú lateral ni barra inferior.
// El rellotge (#timer) es mou dins la barra de l'exercici (#tbTm) si n'hi ha.
// Al mòbil el bloc de resposta (.ans5) va fixat a baix: deixam a la pàgina un espai igual a la seva alçada
let ANS_RO=null;
function pinAns(a){if(!window.ResizeObserver)return;if(ANS_RO)ANS_RO.disconnect();
 const fit=()=>{const on=a&&a.isConnected&&getComputedStyle(a).position==='fixed';document.body.style.paddingBottom=on?a.offsetHeight+'px':''};
 ANS_RO=new ResizeObserver(fit);if(a)ANS_RO.observe(a);fit()}
const app=(h,focus=false)=>{const t=$('#timer');if(t)document.body.appendChild(t);if(ANS_RO){ANS_RO.disconnect();ANS_RO=null}document.body.style.paddingBottom='';$('#app').innerHTML=h;document.body.classList.toggle('focus',!!focus);
 const slot=$('#tbTm');if(slot&&t)slot.appendChild(t);window.scrollTo(0,0)};

/* ===================== veu ===================== */
function plain(h){return String(h).replace(/<span class="fr"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/g,' $1 sobre $2 ').replace(/<br>/g,'. ').replace(/<[^>]+>/g,'').replace(/×/g,' per ').replace(/−/g,' menys ').replace(/ : /g,' entre ').replace(/\s+/g,' ').trim()}
function say(t,rate=.9,lang='ca-ES'){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(plain(t));u.lang=lang;u.rate=rate;const vs=speechSynthesis.getVoices(),v=vs.find(v=>v.lang.replace('_','-')===lang)||vs.find(v=>v.lang.slice(0,2)===lang.slice(0,2));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
try{speechSynthesis.getVoices()}catch(e){}
const SRc=()=>window.SpeechRecognition||window.webkitSpeechRecognition;
const micBtn=id=>SRc()?`<button class="sec" type="button" onclick="dictate('${id}',this)">Dictar</button>`:'';
function dictate(id,btn){const SR=SRc();if(!SR)return;const r=new SR();r.lang='ca-ES';r.interimResults=false;btn.textContent='Escoltant...';
 r.onresult=e=>{const t=e.results[0][0].transcript,ta=document.getElementById(id);ta.value=(ta.value?ta.value+' ':'')+t};
 r.onend=r.onerror=()=>btn.textContent='Dictar';r.start()}

/* ===================== IA (Google AI Studio / Gemini, pla gratuït) ===================== */
async function gemini(contents,{json=false,system=''}={}){
 if(!S.cfg.key)throw new Error('La IA no està activada. Els pares la poden activar a Zona famílies → Configuració.');
 const body={contents,generationConfig:{temperature:.4}};
 if(json)body.generationConfig.responseMimeType='application/json';
 if(system)body.systemInstruction={parts:[{text:system}]};
 const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(S.cfg.model)}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':S.cfg.key},body:JSON.stringify(body)});
 const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error?.message||('Error '+r.status));
 return(d.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('');
}
const parseJSON=t=>JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1));
function fileToPart(f){return new Promise((res,rej)=>{const rd=new FileReader();rd.onerror=rej;rd.onload=()=>{const url=rd.result;
 if(!f.type.startsWith('image/'))return res({inline_data:{mime_type:f.type||'application/pdf',data:url.split(',')[1]}});
 const im=new Image();im.onload=()=>{const s=Math.min(1,1600/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);res({inline_data:{mime_type:'image/jpeg',data:c.toDataURL('image/jpeg',.85).split(',')[1]}})};
 im.onerror=()=>res({inline_data:{mime_type:f.type,data:url.split(',')[1]}});im.src=url};rd.readAsDataURL(f)})}
const tutorSys=()=>`Ets el Mestre Òliba, professor particular d'un infant de ${ORD[S.perfil.curs]} de Primària a les Illes Balears. Parles sempre en català, amb frases curtes i to amable i proper.
Temes d'avui: ${(CUR?.skills||S.sessio.skills).map(k=>SUBJ[matOf(k)].nom+' – '+SK[k].nom).join(', ')}. Si el tema és d'anglès, explica en català i posa els exemples en anglès, i anima'l a escriure frases curtes en anglès. ${S.sessio.explicacio?'Resum del llibre: '+S.sessio.explicacio:''}
Normes: no donis mai directament la resposta final d'un exercici; guia amb preguntes i pistes pas a pas. Si s'equivoca, explica l'error amb amabilitat. Fes servir exemples de la vida quotidiana. Màxim 80 paraules per resposta. Si et pregunta coses que no són d'estudi, porta'l amablement de tornada al tema.`;

/* ===================== components d'exercici ===================== */
function guided(c,steps,then,intro='Sembla que costa una mica. El Mestre Òliba t\'ho explica pas a pas:'){let j=0;
 const draw=()=>{c.innerHTML=`<div class="guide5">${OWL(40)}<div><p><b>${intro}</b></p><ol class="steps">${steps.slice(0,j+1).map(s=>`<li>${s}</li>`).join('')}</ol><button class="gs">${j<steps.length-1?'Següent pas':'Ara prova\'n un de semblant'}</button></div></div>`;
  c.querySelector('.gs').onclick=()=>{if(j<steps.length-1){j++;draw()}else then()}};draw()}

// mode: 'prac' (pistes), 'adv' (pistes), 'seal' (sense pistes), 'chk' (sense pistes, un intent)
function exercise(el,k,o){
 let p,t0,wrong,hints,lock=false;const help=o.mode==='prac'||o.mode==='adv';
 const fresh=variant=>{p=genP(k);t0=Date.now();wrong=0;hints=0;lock=false;
  // Píndola «Exercici n de N» (disseny Suau): copia el comptador de la barra superior
  const nb=document.getElementById('tbN'),nt=nb?nb.textContent.trim():'',pill=nt?`<div class="expill">${/^\d/.test(nt)?'Exercici '+nt:esc(nt)}</div>`:'';
  el.innerHTML=`${variant?'<div class="fb info">Mateixa idea, dades noves. Ara demostra que ho has entès!</div>':''}
  <div class="ex5w">${pill}<div class="prob">${p.text}</div>${p.fig?`<div class="fig">${p.fig}</div>`:''}<div class="vis">${o.showVis&&p.vis?p.vis:''}</div>
  <div class="ans5"><div class="ans5-row">${p.fields.map((f,i)=>`<div class="fld${f.wide?' w':f.txt?' t':''}"><label>${f.label}</label><input class="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" data-i="${i}"></div>`).join('')}<span class="okw">${help?`<button class="sec hb" aria-label="Una pista" title="Una pista">${IC.bulb}</button>`:''}<button class="okb">Comprova</button></span></div><div class="fbx" aria-live="polite"></div></div>
  <div class="tools5"><button class="sec sp">${IC.speaker}<span class="l">${p.listen?'Escolta':'Llegeix-m\'ho'}</span><span class="s">${p.listen?'Escolta':'Llegeix'}</span></button>${help&&SK[k].teoria&&SK[k].teoria.length?`<button class="sec th">${IC.cap}<span class="l">Repassa la teoria</span><span class="s">Teoria</span></button>`:''}</div></div>`;
  if(typeof pinAns==='function')pinAns(el.querySelector('.ans5'));
  const ins=el.querySelectorAll('input.ans');ins.forEach(i=>i.onkeydown=e=>{if(e.key==='Enter')check()});if(!p.fig)ins[0].focus({preventScroll:true});
  const speak=()=>p.listen?say(p.listen,.8,'en-GB'):say(p.text);
  el.querySelector('.okb').onclick=check;if(help)el.querySelector('.hb').onclick=hint;el.querySelector('.sp').onclick=speak;
  const th=el.querySelector('.th');if(th)th.onclick=()=>showTheory(k);
  if(p.listen)setTimeout(speak,400);
 };
 const lockAll=()=>{el.querySelectorAll('input.ans,.okb,.hb').forEach(x=>x.disabled=true)};
 function hint(){hints++;if(CUR){CUR.hints=(CUR.hints||0)+1;if(typeof sessSide==='function')sessSide()}if(p.vis)el.querySelector('.vis').innerHTML=p.vis;const h=p.hints[hints-1];
  el.querySelector('.fbx').innerHTML=`<div class="fb info">${h||'Ja no queden més pistes. Llegeix-les una altra vegada i prova-ho!'}</div>`}
 function check(){if(lock)return;
  const ins=[...el.querySelectorAll('input.ans')],raw=ins.map(i=>i.value.trim()),v=raw.map((r,i)=>p.fields[i].txt?(norm(r)||null):parseVal(r)),fb=el.querySelector('.fbx');
  if(v.some(x=>!x)){fb.innerHTML=p.fields[0].txt?'<div class="fb warn">Escriu la resposta.</div>':'<div class="fb warn">Escriu un nombre o una fracció (per exemple <b>12</b>, <b>3/4</b> o <b>2,5</b>).</div>';return}
  const dt=Date.now()-t0;
  const notes=[];
  const match=(f,x)=>{if(!f.txt)return req(f.ans,x);if(f.txt.includes(x))return true;if(!f.loose)return false;
   const fx=fold(x),hit=f.txt.find(t=>fold(t)===fx);
   if(hit){if(art(norm(hit))!==art(x))notes.push(`Compte amb l'ortografia: s'escriu «${esc(hit)}».`);return true}
   const near=fx.length>=7&&f.txt.find(t=>lev(fold(t),fx)<=1);
   if(near){notes.push(`Ho has entès! Però compte amb l'ortografia: s'escriu «${esc(near)}».`);return true}return false};
  if(p.fields.every((f,i)=>match(f,v[i]))){
   const used=hints>0||wrong>0;record(k,true,used,o.mode==='chk');lockAll();
   let note=notes.length?' '+notes.join(' '):'';p.fields.forEach((f,i)=>{if(!f.txt&&raw[i].includes('/')&&raw[i].replace(/\s/g,'')!==fmtR(f.ans))note=` Es pot simplificar: <b>${fmtR(f.ans)}</b>.`});
   fb.innerHTML=`<div class="fb ok">${pick(['Molt bé!','Correcte!','Genial!','Ho has clavat!','Well done!'])}${used?' (amb ajuda)':''}${note}</div><div class="row" style="margin-top:10px"><button class="nx">Continuar →</button>${p.pron?'<button class="sec pr"><svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg> Escolta com es pronuncia</button>':''}</div>`;
   if(p.pron)fb.querySelector('.pr').onclick=()=>say(p.pron,.8,'en-GB');
   const nb=fb.querySelector('.nx');nb.focus();nb.onclick=goOn(()=>o.onDone({ok:true,help:used,p}));return;
  }
  wrong++;const et=p.err?p.err(v):null;if(et)recErr(k,et);
  if(o.mode==='chk'){record(k,false,false,true);lockAll();
   fb.innerHTML=`<div class="fb ko">No és correcte. La resposta era <b>${p.fields.map(ansStr).join(' i ')}</b>. Ho repassarem!</div><button class="nx" style="margin-top:10px">Continuar →</button>`;
   fb.querySelector('.nx').onclick=goOn(()=>o.onDone({ok:false,p}));return;
  }
  if(dt<3500&&wrong===1){recErr(k,'massa_rapid');lock=true;let s=6;
   const upd=()=>fb.innerHTML=`<div class="fb warn">Has respost molt de pressa. Llegeix l'enunciat amb calma i pensa abans de respondre. (${s})</div>`;upd();
   const iv=setInterval(()=>{s--;if(s<=0){clearInterval(iv);lock=false;t0=Date.now()-5000;fb.innerHTML='<div class="fb info">Ara sí: pensa-ho bé i torna-ho a provar.</div>'}else upd()},1000);return;
  }
  if(wrong>=2){record(k,false,true,false);lockAll();guided(fb,p.steps,()=>fresh(true));return}
  fb.innerHTML=et?`<div class="fb err">${OWL(40)}<div>${ERR[et].kid}${help?' Si vols, demana una pista.':''}</div></div>`:`<div class="fb ko">${pick([p.fields[0].txt?'Encara no és correcte. Revisa la resposta.':'Encara no és correcte. Revisa els càlculs.','Gairebé! Torna-ho a mirar amb calma.'])}${help?' Si vols, demana una pista.':''}</div>`;
  t0=Date.now();
 }
 fresh(false);
}

// manipulatiu: pintar una barra o triar grups; primer cal pensar, després es comprova (sense pistes de "massa/poc")
function manip(el,k,onDone){
 let p;for(let t=0;t<12&&!(p&&p.paint);t++)p=genP(k);
 if(!p.paint)return exercise(el,k,{mode:'prac',showVis:true,onDone});
 const P=p.paint,sel=new Set(),seq=[],ord=P.kind==='order';let wrong=0;
 el.innerHTML=`<p class="muted">${ord?'Pensa primer qui menja qui. Després toca-ho per ordre.':'Primer calcula quantes en necessites. Després toca-les.'}</p><div class="prob" style="font-size:22px">${P.label}</div>
  <div class="mz">${ord?`<div class="row">${P.items.map((x,i)=>`<button class="sec" data-i="${i}">${esc(x)}</button>`).join('')}</div><p class="seq" style="font-size:22px;min-height:34px;font-weight:500"></p><button class="ghost clr">↺ Torna a començar</button>`:P.kind==='bar'?barHTML(P.parts,0,true):groupsHTML(P.parts,P.k,0,true)}</div>
  ${ord?'':'<p class="muted">Seleccionats: <b class="cnt">0</b></p>'}<button class="okb" style="margin-top:10px">Comprova</button><div class="fbx"></div>`;
 const showSeq=()=>el.querySelector('.seq').textContent=seq.map(i=>P.items[i]).join(' → ');
 el.querySelectorAll('.mz [data-i]').forEach(d=>d.onclick=()=>{if(el.querySelector('.okb').disabled)return;const i=+d.dataset.i;
  if(ord){if(seq.includes(i))return;seq.push(i);d.disabled=true;showSeq();return}
  sel.has(i)?sel.delete(i):sel.add(i);d.classList.toggle('on');el.querySelector('.cnt').textContent=sel.size});
 if(ord)el.querySelector('.clr').onclick=()=>{if(el.querySelector('.okb').disabled)return;seq.length=0;el.querySelectorAll('.mz [data-i]').forEach(b=>b.disabled=false);showSeq()};
 el.querySelector('.okb').onclick=()=>{const fb=el.querySelector('.fbx');
  if(ord&&seq.length<P.items.length){fb.innerHTML='<div class="fb warn">Encara no has col·locat tots els éssers vius.</div>';return}
  if(ord?seq.every((i,j)=>P.items[i]===P.target[j]):sel.size===P.target){el.querySelector('.okb').disabled=true;
   fb.innerHTML=`<div class="fb ok">Molt bé!</div><label>${P.follow.q}</label><div class="row"><input class="ans fa" autocomplete="off"><button class="fok">Comprova</button></div><div class="fb2"></div>`;
   const fa=fb.querySelector('.fa');fa.focus();
   const go=()=>{const v=fa.value.replace(/\s/g,''),pv=parseVal(v),f2=fb.querySelector('.fb2');
    const ok=P.follow.txt?P.follow.txt.map(fold).includes(fold(fa.value)):P.follow.raw?v===P.follow.raw:(pv&&req(pv,P.follow.ans));
    if(ok){record(k,true,wrong>0);f2.innerHTML='<div class="fb ok">Perfecte!</div><button class="nx" style="margin-top:10px">Continuar →</button>';f2.querySelector('.nx').onclick=goOn(onDone)}
    else if(P.follow.raw&&pv&&req(pv,P.follow.ans))f2.innerHTML='<div class="fb warn">És equivalent, però escriu-la amb el denominador que et demanem.</div>';
    else{wrong++;f2.innerHTML='<div class="fb ko">Revisa-ho: compta les parts que has seleccionat i quantes n\'hi ha en total.</div>'}};
   fb.querySelector('.fok').onclick=go;fa.onkeydown=e=>{if(e.key==='Enter')go()};
  }else{wrong++;
   if(wrong>=2){record(k,false,true);el.querySelector('.okb').disabled=true;guided(fb,p.steps,()=>manip(el,k,onDone))}
   else fb.innerHTML=`<div class="fb ko">No és correcte. No provis a l'atzar: ${ord?'pensa qui fabrica el seu aliment i qui se\'l menja.':'calcula quantes parts necessites i després selecciona-les.'}</div>`;
  }};
}

