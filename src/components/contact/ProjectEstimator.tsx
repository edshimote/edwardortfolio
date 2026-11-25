"use client";
import { useState } from "react";
import { ESTIMATOR_APPLY_EVENT, type ServiceId } from "@/lib/contact";

type Offer = [string,number,string,string,ServiceId];
const categories: Record<string,Offer[]> = {
 "Sites":[
 ["Landing page básica",400,"3 dias úteis","Uma página com até 4 blocos e botão de contato.","web"],
 ["Landing page profissional",600,"5 dias úteis","Uma página com até 7 blocos, formulário e WhatsApp.","web"],
 ["Landing page premium",800,"7 dias úteis","Até 10 blocos, animações e medição básica de ações.","web"],
 ["Portfólio profissional",600,"5 dias úteis","Até 4 páginas e 10 projetos.","web"],
 ["Site institucional",900,"7 dias úteis","Até 3 páginas, contato, mapa e redes sociais.","web"],
 ["Site empresarial completo",1400,"10 dias úteis","Até 5 páginas, formulário e SEO básico.","web"],
 ["Site premium personalizado",1800,"15 dias úteis","Até 7 páginas e animações leves.","web"],
 ["Site com painel administrativo",2000,"15 dias úteis","Até 5 páginas e edição de uma categoria de conteúdo.","web"],
 ["Reformulação de site",700,"7 dias úteis","Reformulação de até 3 páginas.","web"]],
 "Cardápios":[
 ["Cardápio digital em PDF",250,"3 dias úteis","Até 4 páginas e 40 itens.","web"],
 ["Cardápio digital profissional",450,"5 dias úteis","Até 50 itens, categorias e QR Code.","web"],
 ["Site institucional com cardápio",1000,"8 dias úteis","Até 3 páginas e cardápio de 50 itens.","web"],
 ["Site completo com sistema de pedidos",2000,"12 dias úteis","Até 50 itens, carrinho e pedido via WhatsApp.","web"]],
 "Lojas virtuais":[
 ["Catálogo digital",500,"5 dias úteis","Até 30 produtos, sem checkout.","web"],
 ["Loja com pedidos via WhatsApp",1000,"8 dias úteis","Até 40 produtos, carrinho e pedido via WhatsApp.","web"],
 ["Loja virtual completa",2000,"15 dias úteis","Até 50 produtos, checkout e painel padrão.","web"],
 ["E-commerce avançado",3000,"20 dias úteis","Até 100 produtos, 1 integração e painel padrão.","web"]],
 "Sistemas e automações":[
 ["Scripts personalizados",250,"3 dias úteis","Um script para uma tarefa.","auto"],
 ["Bots personalizados",450,"5 dias úteis","Um bot com até 5 comandos.","bots"],
 ["Automação de processos",600,"7 dias úteis","Um fluxo com até 3 etapas e 1 serviço externo.","auto"],
 ["Integração de sistemas e APIs",700,"8 dias úteis","2 serviços, até 3 operações.","auto"],
 ["Painel administrativo",1200,"10 dias úteis","Até 3 telas e gestão de um tipo de registro.","soft"],
 ["Sistema empresarial inicial",3500,"25 dias úteis","Login, até 3 módulos simples e 1 perfil.","soft"],
 ["Integração com inteligência artificial",1200,"10 dias úteis","Um recurso de IA via API em sistema existente.","soft"]],
 "Tráfego pago":[
 ["Configuração de campanhas",300,"3 dias úteis","Uma plataforma e uma campanha.","auto"],
 ["Meta Ads",600,"30 dias corridos","Até 2 campanhas e relatório mensal.","auto"],
 ["Google Ads",700,"30 dias corridos","Até 2 campanhas e relatório mensal.","auto"],
 ["Meta Ads + Google Ads",1000,"30 dias corridos","Até 2 campanhas por plataforma.","auto"],
 ["Gestão avançada de tráfego",1500,"30 dias corridos","Até 6 campanhas, testes e acompanhamento semanal.","auto"]],
 "Suporte":[
 ["Manutenção mensal opcional",150,"Mensal","Até 1 hora de pequenos ajustes.","web"],
 ["Atualização mensal de cardápio",80,"Mensal","Até 15 alterações de itens ou preços.","web"],
 ["Página adicional",200,"3 dias úteis","Uma página de até 5 seções.","web"],
 ["Correções e melhorias",250,"3 dias úteis","Um chamado de até 2 horas.","soft"],
 ["Otimização para buscas (SEO)",350,"5 dias úteis","SEO técnico de até 5 páginas.","web"],
 ["Otimização de desempenho",300,"5 dias úteis","Ajustes em até 5 páginas.","web"],
 ["Integrações adicionais",400,"5 dias úteis","Uma integração simples.","auto"]]
};
const money=(v:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
export function ProjectEstimator(){
 const [category,setCategory]=useState("Sites");
 return <div className="glass rounded-2xl p-6 sm:p-8"><p className="font-mono text-xs text-secondary">CATÁLOGO COMERCIAL</p><h3 className="mt-2 font-display text-2xl font-semibold">Escolha seu serviço</h3><p className="mt-2 text-sm text-ink-muted">Preços fixos para os escopos indicados. Landing page é uma única página que apresenta uma oferta e incentiva o contato.</p><div className="mt-5 flex flex-wrap gap-2">{Object.keys(categories).map(k=><button type="button" aria-pressed={category===k} key={k} onClick={()=>setCategory(k)} className={"rounded-full border px-4 py-2 text-sm "+(category===k?"border-primary bg-primary/15":"border-line")}>{k}</button>)}</div><div className="mt-5 grid gap-3 sm:grid-cols-2">{categories[category].map(([name,value,deadline,scope,service])=>{const monthly=deadline==="Mensal"||deadline==="30 dias corridos";const price=money(value)+(monthly?"/mês":"");return <article key={name} className="flex flex-col gap-2 rounded-xl border border-line p-4"><h4 className="font-semibold">{name}</h4><p className="text-xl font-semibold text-secondary">{price}</p><p className="text-xs text-ink-muted">{deadline}</p><p className="flex-1 text-sm text-ink-muted">{scope}</p><button type="button" className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-white" onClick={()=>window.dispatchEvent(new CustomEvent(ESTIMATOR_APPLY_EVENT,{detail:{service,summary:"Serviço solicitado: "+name+"\nPreço de catálogo: "+price+"\nEscopo: "+scope+"\nPrazo estimado: "+deadline}}))}>Solicitar orçamento</button></article>})}</div><p className="mt-5 text-xs text-ink-muted">Até duas rodadas de ajustes no escopo. Prazos após aprovação e recebimento de materiais. Domínio, hospedagem, licenças, APIs e verba publicitária à parte. Sem garantia de vendas.</p></div>;
}
