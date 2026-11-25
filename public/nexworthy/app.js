"use strict";
const $ = selector => document.querySelector(selector);
const key = "edward_onboarding_v1";
const initial = () => ({step:1,name:"",email:"",whatsapp:"",company:"",selectedServices:[],chosenServices:[],note:"",wantsWhatsApp:true,maintenance:"",hosting:"Preciso de orientação",domain:"Preciso de orientação"});
let state = initial(), moving = false, sending = false, frame = 0, loadingTimer;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const labels = ["Contato","Serviços","Perfil","Opções","Proposta"];
const cash = value => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(value);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
const icon = (path,cls="") => '<svg aria-hidden="true" viewBox="0 0 24 24" class="svg '+cls+'"><path d="'+path+'"/></svg>';
const tick = () => icon("M4 12l5 5L20 6","tick");
const hasWeb = () => state.chosenServices.some(id => ["sites","lojas"].includes(id));
function persist(){try{localStorage.setItem(key,JSON.stringify(state));}catch{}}
function forget(){try{localStorage.removeItem(key);}catch{}}
function errors(){
  const out={};
  if((state.name.match(/\p{L}/gu)||[]).length<2 || !/^[\p{L}\p{M} '\u2019-]+$/u.test(state.name.trim()))out.name="Informe um nome com pelo menos duas letras, sem números.";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()))out.email="Informe um e-mail válido.";
  if(!/^\d{10,11}$/.test(state.whatsapp.replace(/\D/g,"")))out.whatsapp="Informe o DDD e o número completo.";
  return out;
}
function mask(value){
  let digits=value.replace(/\D/g,"");
  if(digits.length>11&&digits.startsWith("55"))digits=digits.slice(2);
  digits=digits.slice(0,11);
  if(digits.length<3)return digits?"("+digits:"";
  const tail=digits.slice(2), split=tail.length>8?5:4;
  const prefix=tail.length>8?tail[0]+" "+tail.slice(1,split):tail.slice(0,split);
  return "("+digits.slice(0,2)+") "+prefix+(tail.length>split?"-"+tail.slice(split):"");
}
function restore(){
  try{
    const d=JSON.parse(localStorage.getItem(key));
    if(!d || !Number.isInteger(d.step) || d.step<1 || d.step>5)return false;
    const clean=initial();
    for(const field of ["name","email","whatsapp","company","note","maintenance","hosting","domain"])if(typeof d[field]==="string")clean[field]=d[field];
    clean.selectedServices=Object.keys(services).filter(id=>Array.isArray(d.selectedServices)&&d.selectedServices.includes(id));
    clean.chosenServices=clean.selectedServices.filter(id=>Array.isArray(d.chosenServices)&&d.chosenServices.includes(id));
    clean.wantsWhatsApp=d.wantsWhatsApp!==false;
    state=clean;
    state.step=Object.keys(errors()).length?1:!clean.selectedServices.length?Math.min(d.step,2):!clean.chosenServices.length||hasWeb()&&!["Sim","Não"].includes(state.maintenance)?Math.min(d.step,4):d.step;
    return true;
  }catch{return false;}
}
function field(id,label,placeholder,type,completion,max,optional=false){
  const index=["name","email","whatsapp","company"].indexOf(id);
  return '<label class="field" style="--delay:'+index*80+'ms">'+label+(optional?' <span class="optional">(opcional)</span>':'')+'<input id="'+id+'" type="'+type+'" autocomplete="'+completion+'" maxlength="'+max+'" placeholder="'+placeholder+'" value="'+escapeHTML(state[id])+'" aria-describedby="'+id+'-error" '+(optional?'':'required')+'><span class="err" id="'+id+'-error" aria-live="polite"></span></label>';
}
function head(title,sub){return '<div class="eyebrow">ETAPA 0'+state.step+' / 05</div><h2 tabindex="-1">'+title+'</h2><p class="sub">'+sub+'</p>';}
const actions=(next,disabled=false)=>'<div class="actions"><button data-back>Voltar</button><button class="primary" id="next" '+(disabled?'disabled':'')+'>'+next+'</button></div>';
const price=s=>s.amount===null?"Sob consulta":"A partir de "+cash(s.amount)+(s.monthly?"/mês":"");
function totals(){
  let once=0, monthly=hasWeb()&&state.maintenance==="Sim"?150:0;
  for(const id of state.chosenServices){const s=services[id];if(s.monthly)monthly+=s.amount;else once+=s.amount||0;}
  return {once,monthly};
}
function summary(final=false){
  return '<aside class="summary"><h3>Sua proposta</h3><p id="selection"></p><div class="total"><span>Pagamento único</span><strong id="once"></strong></div><div class="total"><span>Mensalidade</span><strong id="monthly"></strong></div><p id="consult" class="muted"></p>'+(final?'':'<button id="next" class="primary">Solicitar proposta →</button>')+'</aside>';
}
let displayed={once:0,monthly:0};
function updateSummary(animate=false){
  const target=totals(),start={...displayed},t=performance.now();
  $("#selection").textContent=state.chosenServices.map(id=>services[id].title).join(" · ")||"Nenhum serviço escolhido.";
  $("#consult").textContent=state.chosenServices.includes("sistemas")?"Sistemas e automações têm valor sob consulta.":"Valores iniciais estimados.";
  cancelAnimationFrame(frame);
  function draw(now){const p=animate&&!reduced.matches?Math.min(1,(now-t)/400):1;
    for(const k of ["once","monthly"]){displayed[k]=start[k]+(target[k]-start[k])*(1-(1-p)**3);$("#"+k).textContent=cash(displayed[k]);}
    if(p<1)frame=requestAnimationFrame(draw);
  }
  draw(t);
  if($("#next"))$("#next").disabled=!state.chosenServices.length||(hasWeb()&&!["Sim","Não"].includes(state.maintenance));
}
function setupSelect(id,label,values){
  return '<label class="field">'+label+'<select id="'+id+'">'+values.map(v=>'<option '+(state[id]===v?'selected':'')+' value="'+escapeHTML(v)+'">'+(v||"Escolha uma opção")+'</option>').join("")+'</select></label>';
}
function infrastructure(){
  return hasWeb()?setupSelect("maintenance","Manutenção mensal (R$ 150/mês)",["","Sim","Não"])+setupSelect("hosting","Hospedagem",["Preciso de orientação","Já tenho hospedagem","Usar hospedagem do pacote","Vou contratar diretamente"])+setupSelect("domain","Domínio",["Preciso de orientação","Já tenho domínio","Registrar domínio próprio","Usar subdomínio"]):"";
}
function render(focus=false){
  clearTimeout(loadingTimer);cancelAnimationFrame(frame);
  const n=state.step, screen=$("#screen");
  document.body.className="step"+n;
  $("#position").textContent=n===6?"Proposta enviada":"Etapa "+n+" de 5";
  $("#meter i").style.width=Math.min(n,5)*20+"%";
  $("#meter").setAttribute("aria-valuenow",Math.min(n,5));
  $("#trail").innerHTML=labels.map((l,i)=>'<li class="'+(i<n?'active':'')+'" '+(i+1===n?'aria-current="step"':'')+'>'+l+'</li>').join("");
  if(n===1)screen.innerHTML=head("Seus dados","Como podemos entrar em contato com você?")+'<form id="basics" novalidate>'+field("name","Nome completo","Seu nome e sobrenome","text","name",120)+field("email","E-mail","voce@empresa.com.br","email","email",160)+field("whatsapp","WhatsApp","(11) 9 9999-9999","tel","tel-national",22)+field("company","Nome da empresa","Nome do seu negócio","text","organization",160,true)+'<button class="primary wide pulse">Continuar →</button></form>';
  if(n===2)screen.innerHTML=head("O que você está buscando?","Selecione tudo que faz sentido pro seu negócio.")+'<div class="grid">'+Object.entries(services).map(([id,s],i)=>'<div class="stagger" style="--delay:'+i*100+'ms"><button class="choice" data-select="'+id+'" aria-pressed="'+state.selectedServices.includes(id)+'"><span class="cardhead">'+icon(s.icon)+tick()+'</span><strong>'+s.label+'</strong><small>'+s.short+'</small></button></div>').join("")+'</div>'+actions("Ver opções disponíveis →",!state.selectedServices.length);
  if(n===3){
    screen.innerHTML='<div class="loading"><div class="orbit" aria-hidden="true">'+[0,120,240].map(a=>'<i style="--angle:'+a+'deg"></i>').join("")+'</div><h2 tabindex="-1" aria-live="polite">Analisando suas necessidades...</h2><div class="loadbar"><i></i></div></div>';
    const start=performance.now(),msgs=["Analisando suas necessidades...","Montando seu pacote personalizado...","Quase lá..."];
    function advance(){const elapsed=performance.now()-start;if(elapsed>=2200){state.step=4;persist();render(true);return;}
      const i=Math.min(2,Math.floor(elapsed/600));$("#screen h2").textContent=msgs[i];loadingTimer=setTimeout(advance,(i<2?(i+1)*600:2200)-elapsed);}
    loadingTimer=setTimeout(advance,600);
  }
  if(n===4){
    screen.innerHTML=head("Montamos tudo pra você, "+escapeHTML(state.name.trim().split(/\s+/)[0]),"Baseado no que você escolheu, aqui estão as melhores opções.")+'<div class="options"><div>'+state.selectedServices.map((id,i)=>{const s=services[id],on=state.chosenServices.includes(id);return '<article class="offer '+(on?'chosen':'')+'" style="--delay:'+i*120+'ms"><div class="cardhead">'+icon(s.icon)+'<span class="badge">'+s.deadline+'</span></div><h3>'+s.title+'</h3><p class="muted">'+s.description+'</p><ul>'+s.includes.map(v=>'<li>'+v+'</li>').join("")+'</ul><div class="cardhead"><strong>'+price(s)+'</strong><button data-choose="'+id+'" aria-pressed="'+on+'">'+(on?'Escolhido':'Quero esse')+tick()+'</button></div></article>';}).join("")+'<div id="infra">'+infrastructure()+'</div><button data-back>Voltar</button></div>'+summary()+'</div>';
    updateSummary();
  }
  if(n===5){screen.innerHTML=head("Falta pouco! Conta mais um detalhe","Confira sua seleção antes de enviar.")+summary(true)+'<label class="field">Descreva brevemente seu projeto ou dúvida <span class="optional">(opcional)</span><textarea id="note" maxlength="2000" placeholder="O que você gostaria de construir?">'+escapeHTML(state.note)+'</textarea></label><label class="checkbox"><input id="wantsWhatsApp" type="checkbox" '+(state.wantsWhatsApp?'checked':'')+'>Quero receber o orçamento pelo WhatsApp</label><div id="feedback" role="status"></div>'+actions("Enviar solicitação 🚀",!state.chosenServices.length);updateSummary();}
  if(n===6)screen.innerHTML='<div class="success">'+Array.from({length:13},(_,i)=>'<i style="--x:'+((i*17)%100)+'%;--color:'+["#bd83ff","#39d5bc","#ffab95"][i%3]+';--delay:'+i*40+'ms"></i>').join("")+'<div class="circle">'+tick()+'</div><h2 tabindex="-1">Solicitação enviada!</h2><p>Vamos entrar em contato em até 2h úteis.</p><button id="reset" class="primary">Voltar ao início</button></div>';
  screen.className="enter";
  if(focus){screen.querySelector("h2")?.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
}
async function go(n){
  if(moving||sending)return;
  moving=true;$("#screen").className="leave";
  await new Promise(resolve=>setTimeout(resolve,reduced.matches?0:300));
  state.step=n;persist();moving=false;render(true);
}
function validateField(id){
  const msg=errors()[id]||"",el=$("#"+id);
  $("#"+id+"-error").textContent=msg;el.setAttribute("aria-invalid",String(Boolean(msg)));return !msg;
}
$("#screen").addEventListener("submit",e=>{
  e.preventDefault();const bad=["name","email","whatsapp"].filter(id=>!validateField(id));
  if(bad.length)$("#"+bad[0]).focus();else go(2);
});
$("#screen").addEventListener("focusout",e=>{if(["name","email","whatsapp"].includes(e.target.id))validateField(e.target.id);});
$("#screen").addEventListener("input",e=>{
  const el=e.target,id=el.id;if(!Object.hasOwn(initial(),id))return;
  if(id==="whatsapp")el.value=mask(el.value);
  state[id]=id==="wantsWhatsApp"?el.checked:el.value;
  if(el.getAttribute("aria-invalid")==="true")validateField(id);
  if(state.step===4)updateSummary(true);persist();
});
function reset(){forget();state=initial();displayed={once:0,monthly:0};render(true);}
function proposal(){
  const t=totals();
  const lines=["Interesses: "+state.selectedServices.map(id=>services[id].label).join(", "),"Serviços solicitados:"];
  for(const id of state.chosenServices){const s=services[id];lines.push("• "+s.title+" — "+price(s)+" · "+s.deadline);}
  if(hasWeb())lines.push("Manutenção mensal: "+state.maintenance+(state.maintenance==="Sim"?" · R$ 150/mês":""),"Hospedagem: "+state.hosting,"Domínio: "+state.domain);
  lines.push("Estimativa: "+cash(t.once)+" + "+cash(t.monthly)+"/mês"+(state.chosenServices.includes("sistemas")?" + serviço sob consulta":""),"Orçamento pelo WhatsApp: "+(state.wantsWhatsApp?"Sim":"Não"),"E-mail de contato: "+state.email,"Descrição: "+(state.note.trim()||"Não informada."));
  return {name:state.name,phone:state.whatsapp,company:state.company,service:"Proposta Nexworthy",market:"BR",message:lines.join("\n")};
}
async function submit(){
  if(sending||!state.chosenServices.length)return;
  sending=true;$("#next").disabled=true;$("#next").textContent="Enviando…";
  const notice=$("#feedback");notice.textContent="";
  try{
    const res=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(proposal())});
    if(res.status===401){notice.innerHTML='Entre ou crie sua conta para vincular a proposta ao chat. Depois, volte aqui e envie. <a href="/cliente" target="_blank" rel="noopener"><u>Abrir área do cliente ↗</u></a>';return;}
    if(res.status===429)throw Error("Aguarde 30 segundos antes de tentar novamente.");
    if(!res.ok || !(await res.json()).id)throw Error("Não foi possível confirmar o envio. Seu progresso está salvo.");
    forget();state.step=6;render(true);
  }catch(e){notice.textContent=e instanceof TypeError?"Verifique sua conexão e tente novamente.":e.message;}
  finally{sending=false;if(state.step===5){$("#next").disabled=false;$("#next").textContent="Enviar solicitação 🚀";}}
}
$("#screen").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b||moving||sending)return;
  if(b.hasAttribute("data-back"))return go(state.step===4?2:state.step-1);
  if(b.id==="reset")return reset();
  if(b.dataset.select||b.dataset.choose){
    const choose=Boolean(b.dataset.choose),id=b.dataset.choose||b.dataset.select,prop=choose?"chosenServices":"selectedServices";
    const on=!state[prop].includes(id);state[prop]=on?[...state[prop],id]:state[prop].filter(v=>v!==id);
    state.chosenServices=state.chosenServices.filter(v=>state.selectedServices.includes(v));
    b.setAttribute("aria-pressed",String(on));
    if(choose){b.closest("article").classList.toggle("chosen",on);b.innerHTML=(on?"Escolhido":"Quero esse")+tick();$("#infra").innerHTML=infrastructure();updateSummary(true);}
    else{b.classList.remove("bounce");void b.offsetWidth;b.classList.add("bounce");$("#next").disabled=!state.selectedServices.length;}
    persist();return;
  }
  if(b.id==="next"){if(state.step===5)submit();else go(state.step+1);}
});
const saved=restore();if(saved){$("#resume").showModal();}
$("#restart").onclick=()=>{$("#resume").close();reset();};
$("#continue").onclick=()=>{$("#resume").close();render(true);};
$("#resume").addEventListener("cancel",e=>e.preventDefault());
if(saved){const draft=state;state=initial();render();state=draft;}else render();
// Render a folded violet ribbon using a projected parametric surface.
function drawRibbon(){
  const canvas=$("#sculpture"),ctx=canvas.getContext("2d");
  if(!ctx)return;
  const W=canvas.width,H=canvas.height,faces=[];
  const point=(t,v)=>{
    const radius=1.02+.36*Math.cos(3*t)+v*.27*Math.cos(2*t);
    const x=radius*Math.cos(2*t), y=radius*Math.sin(2*t), z=.54*Math.sin(3*t)+v*.36*Math.sin(2*t+.6);
    return [W*.49+(x*.89-y*.43)*141,H*.49+(x*.24+y*.50-z*.83)*135,x*.36+y*.75+z*.55];
  };
  for(let i=0;i<210;i++)for(let j=0;j<9;j++){
    const a=i/210*2*Math.PI,b=(i+1)/210*2*Math.PI,v=j/9*2-1,u=(j+1)/9*2-1;
    const p=[point(a,v),point(b,v),point(b,u),point(a,u)];
    const l=22+34*(.5+.5*Math.cos(a*4+.7))+15*(j/9);
    faces.push({p,z:p.reduce((sum,q)=>sum+q[2],0)/4,color:'hsl('+(258+21*Math.sin(a*2))+',86%,'+l+'%)'});
  }
  for(const face of faces.sort((a,b)=>a.z-b.z)){ctx.beginPath();face.p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=face.color;ctx.fill();ctx.strokeStyle=face.color;ctx.lineWidth=.7;ctx.stroke();}
}
drawRibbon();
