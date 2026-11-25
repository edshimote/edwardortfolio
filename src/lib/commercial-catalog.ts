// Canonical commercial catalog, synchronized with the Supabase validation migration.
export type Offer={id:string;category:string;name:string;price_cents:number;deadline:string;scope:string;monthly:boolean;website:boolean};
export type Selection={id:string;maintenance:"yes"|"no"|null};
export type CatalogLine=Offer & {maintenance:"yes"|"no"|null;maintenance_cents:number};
export type CatalogSnapshot={version:1;items:CatalogLine[];one_time_cents:number;monthly_cents:number};
export const MAINTENANCE_CENTS=15000;
export const MAINTENANCE_ID="manutencao-mensal-opcional";
export const CATALOG:Offer[]=[
  {
    "id": "landing-page-basica",
    "category": "Sites",
    "name": "Landing page básica",
    "price_cents": 40000,
    "deadline": "3 dias úteis",
    "scope": "Uma página com até 4 blocos e botão de contato.",
    "monthly": false,
    "website": true
  },
  {
    "id": "landing-page-profissional",
    "category": "Sites",
    "name": "Landing page profissional",
    "price_cents": 60000,
    "deadline": "5 dias úteis",
    "scope": "Uma página com até 7 blocos, formulário e WhatsApp.",
    "monthly": false,
    "website": true
  },
  {
    "id": "landing-page-premium",
    "category": "Sites",
    "name": "Landing page premium",
    "price_cents": 80000,
    "deadline": "7 dias úteis",
    "scope": "Até 10 blocos, animações e medição básica de ações.",
    "monthly": false,
    "website": true
  },
  {
    "id": "portfolio-profissional",
    "category": "Sites",
    "name": "Portfólio profissional",
    "price_cents": 60000,
    "deadline": "5 dias úteis",
    "scope": "Até 4 páginas e 10 projetos.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-institucional",
    "category": "Sites",
    "name": "Site institucional",
    "price_cents": 90000,
    "deadline": "7 dias úteis",
    "scope": "Até 3 páginas, contato, mapa e redes sociais.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-empresarial-completo",
    "category": "Sites",
    "name": "Site empresarial completo",
    "price_cents": 140000,
    "deadline": "10 dias úteis",
    "scope": "Até 5 páginas, formulário e SEO básico.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-premium-personalizado",
    "category": "Sites",
    "name": "Site premium personalizado",
    "price_cents": 180000,
    "deadline": "15 dias úteis",
    "scope": "Até 7 páginas e animações leves.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-com-painel-administrativo",
    "category": "Sites",
    "name": "Site com painel administrativo",
    "price_cents": 200000,
    "deadline": "15 dias úteis",
    "scope": "Até 5 páginas e edição de uma categoria de conteúdo.",
    "monthly": false,
    "website": true
  },
  {
    "id": "reformulacao-de-site",
    "category": "Sites",
    "name": "Reformulação de site",
    "price_cents": 70000,
    "deadline": "7 dias úteis",
    "scope": "Reformulação de até 3 páginas.",
    "monthly": false,
    "website": true
  },
  {
    "id": "cardapio-digital-em-pdf",
    "category": "Cardápios",
    "name": "Cardápio digital em PDF",
    "price_cents": 25000,
    "deadline": "3 dias úteis",
    "scope": "Até 4 páginas e 40 itens.",
    "monthly": false,
    "website": false
  },
  {
    "id": "cardapio-digital-profissional",
    "category": "Cardápios",
    "name": "Cardápio digital profissional",
    "price_cents": 45000,
    "deadline": "5 dias úteis",
    "scope": "Até 50 itens, categorias e QR Code.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-institucional-com-cardapio",
    "category": "Cardápios",
    "name": "Site institucional com cardápio",
    "price_cents": 100000,
    "deadline": "8 dias úteis",
    "scope": "Até 3 páginas e cardápio de 50 itens.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-completo-com-sistema-de-pedidos",
    "category": "Cardápios",
    "name": "Site completo com sistema de pedidos",
    "price_cents": 200000,
    "deadline": "12 dias úteis",
    "scope": "Até 50 itens, carrinho e pedido via WhatsApp.",
    "monthly": false,
    "website": true
  },
  {
    "id": "catalogo-digital",
    "category": "Lojas virtuais",
    "name": "Catálogo digital",
    "price_cents": 50000,
    "deadline": "5 dias úteis",
    "scope": "Até 30 produtos, sem checkout.",
    "monthly": false,
    "website": true
  },
  {
    "id": "loja-com-pedidos-via-whatsapp",
    "category": "Lojas virtuais",
    "name": "Loja com pedidos via WhatsApp",
    "price_cents": 100000,
    "deadline": "8 dias úteis",
    "scope": "Até 40 produtos, carrinho e pedido via WhatsApp.",
    "monthly": false,
    "website": true
  },
  {
    "id": "loja-virtual-completa",
    "category": "Lojas virtuais",
    "name": "Loja virtual completa",
    "price_cents": 200000,
    "deadline": "15 dias úteis",
    "scope": "Até 50 produtos, checkout e painel padrão.",
    "monthly": false,
    "website": true
  },
  {
    "id": "e-commerce-avancado",
    "category": "Lojas virtuais",
    "name": "E-commerce avançado",
    "price_cents": 300000,
    "deadline": "20 dias úteis",
    "scope": "Até 100 produtos, 1 integração e painel padrão.",
    "monthly": false,
    "website": true
  },
  {
    "id": "scripts-personalizados",
    "category": "Sistemas e automações",
    "name": "Scripts personalizados",
    "price_cents": 25000,
    "deadline": "3 dias úteis",
    "scope": "Um script para uma tarefa.",
    "monthly": false,
    "website": false
  },
  {
    "id": "bots-personalizados",
    "category": "Sistemas e automações",
    "name": "Bots personalizados",
    "price_cents": 45000,
    "deadline": "5 dias úteis",
    "scope": "Um bot com até 5 comandos.",
    "monthly": false,
    "website": false
  },
  {
    "id": "automacao-de-processos",
    "category": "Sistemas e automações",
    "name": "Automação de processos",
    "price_cents": 60000,
    "deadline": "7 dias úteis",
    "scope": "Um fluxo com até 3 etapas e 1 serviço externo.",
    "monthly": false,
    "website": false
  },
  {
    "id": "integracao-de-sistemas-e-apis",
    "category": "Sistemas e automações",
    "name": "Integração de sistemas e APIs",
    "price_cents": 70000,
    "deadline": "8 dias úteis",
    "scope": "2 serviços, até 3 operações.",
    "monthly": false,
    "website": false
  },
  {
    "id": "painel-administrativo",
    "category": "Sistemas e automações",
    "name": "Painel administrativo",
    "price_cents": 120000,
    "deadline": "10 dias úteis",
    "scope": "Até 3 telas e gestão de um tipo de registro.",
    "monthly": false,
    "website": false
  },
  {
    "id": "sistema-empresarial-inicial",
    "category": "Sistemas e automações",
    "name": "Sistema empresarial inicial",
    "price_cents": 350000,
    "deadline": "25 dias úteis",
    "scope": "Login, até 3 módulos simples e 1 perfil.",
    "monthly": false,
    "website": false
  },
  {
    "id": "integracao-com-inteligencia-artificial",
    "category": "Sistemas e automações",
    "name": "Integração com inteligência artificial",
    "price_cents": 120000,
    "deadline": "10 dias úteis",
    "scope": "Um recurso de IA via API em sistema existente.",
    "monthly": false,
    "website": false
  },
  {
    "id": "configuracao-de-campanhas",
    "category": "Tráfego pago",
    "name": "Configuração de campanhas",
    "price_cents": 30000,
    "deadline": "3 dias úteis",
    "scope": "Uma plataforma e uma campanha.",
    "monthly": false,
    "website": false
  },
  {
    "id": "meta-ads",
    "category": "Tráfego pago",
    "name": "Meta Ads",
    "price_cents": 60000,
    "deadline": "30 dias corridos",
    "scope": "Até 2 campanhas e relatório mensal.",
    "monthly": true,
    "website": false
  },
  {
    "id": "google-ads",
    "category": "Tráfego pago",
    "name": "Google Ads",
    "price_cents": 70000,
    "deadline": "30 dias corridos",
    "scope": "Até 2 campanhas e relatório mensal.",
    "monthly": true,
    "website": false
  },
  {
    "id": "meta-ads-google-ads",
    "category": "Tráfego pago",
    "name": "Meta Ads + Google Ads",
    "price_cents": 100000,
    "deadline": "30 dias corridos",
    "scope": "Até 2 campanhas por plataforma.",
    "monthly": true,
    "website": false
  },
  {
    "id": "gestao-avancada-de-trafego",
    "category": "Tráfego pago",
    "name": "Gestão avançada de tráfego",
    "price_cents": 150000,
    "deadline": "30 dias corridos",
    "scope": "Até 6 campanhas, testes e acompanhamento semanal.",
    "monthly": true,
    "website": false
  },
  {
    "id": "manutencao-mensal-opcional",
    "category": "Suporte",
    "name": "Manutenção mensal opcional",
    "price_cents": 15000,
    "deadline": "Mensal",
    "scope": "Até 1 hora de pequenos ajustes.",
    "monthly": true,
    "website": false
  },
  {
    "id": "atualizacao-mensal-de-cardapio",
    "category": "Suporte",
    "name": "Atualização mensal de cardápio",
    "price_cents": 8000,
    "deadline": "Mensal",
    "scope": "Até 15 alterações de itens ou preços.",
    "monthly": true,
    "website": false
  },
  {
    "id": "pagina-adicional",
    "category": "Suporte",
    "name": "Página adicional",
    "price_cents": 20000,
    "deadline": "3 dias úteis",
    "scope": "Uma página de até 5 seções.",
    "monthly": false,
    "website": false
  },
  {
    "id": "correcoes-e-melhorias",
    "category": "Suporte",
    "name": "Correções e melhorias",
    "price_cents": 25000,
    "deadline": "3 dias úteis",
    "scope": "Um chamado de até 2 horas.",
    "monthly": false,
    "website": false
  },
  {
    "id": "otimizacao-para-buscas-seo",
    "category": "Suporte",
    "name": "Otimização para buscas (SEO)",
    "price_cents": 35000,
    "deadline": "5 dias úteis",
    "scope": "SEO técnico de até 5 páginas.",
    "monthly": false,
    "website": false
  },
  {
    "id": "otimizacao-de-desempenho",
    "category": "Suporte",
    "name": "Otimização de desempenho",
    "price_cents": 30000,
    "deadline": "5 dias úteis",
    "scope": "Ajustes em até 5 páginas.",
    "monthly": false,
    "website": false
  },
  {
    "id": "integracoes-adicionais",
    "category": "Suporte",
    "name": "Integrações adicionais",
    "price_cents": 40000,
    "deadline": "5 dias úteis",
    "scope": "Uma integração simples.",
    "monthly": false,
    "website": false
  }
];
export const CATEGORIES=[...new Set(CATALOG.map(o=>o.category))];
export const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
export function catalogSnapshot(input:unknown,strict=true):CatalogSnapshot|null{
 if(!Array.isArray(input)||!input.length||input.length>CATALOG.length)return null;
 const ids=new Set<string>();const items:CatalogLine[]=[];
 for(const choice of input){if(!choice||typeof choice!=="object"||typeof choice.id!=="string"||ids.has(choice.id))return null;const o=CATALOG.find(i=>i.id===choice.id);if(!o)return null;ids.add(o.id);const m=choice.maintenance;if(o.website&&strict&&m!=="yes"&&m!=="no")return null;if(!o.website&&m!=null)return null;const maintenance=o.website&&(m==="yes"||m==="no")?m:null;items.push({...o,maintenance,maintenance_cents:maintenance==="yes"?MAINTENANCE_CENTS:0});}
 if(items.some(i=>i.website)&&ids.has(MAINTENANCE_ID))return null;
 return {version:1,items,one_time_cents:items.reduce((sum,i)=>sum+(i.monthly?0:i.price_cents),0),monthly_cents:items.reduce((sum,i)=>sum+(i.monthly?i.price_cents:0)+i.maintenance_cents,0)};
}
