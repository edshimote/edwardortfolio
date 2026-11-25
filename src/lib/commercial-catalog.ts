// Canonical commercial catalog, synchronized with the Supabase validation migration.
export type Offer={id:string;category:string;name:string;price_cents:number;deadline:string;scope:string;monthly:boolean;website:boolean};
export type Selection={id:string;maintenance:"yes"|"no"|null};
export type CatalogLine=Offer & {maintenance:"yes"|"no"|null;maintenance_cents:number};
export const PROJECT_COMPLEXITIES=["Não sei / preciso de orientação","Simples","Intermediário","Avançado"];
export const PROJECT_TIMELINES=["Flexível","Prazo normal","Urgente"];
export const PROJECT_FEATURES=["Painel administrativo","Pagamentos online","Mais de um idioma","Login de usuários","Integração com sistemas/API","Identidade visual do site","WhatsApp","Formulário de contato","SEO"];
export type ProjectPreferences={infrastructure?:Infrastructure;complexity:string|null;timeline:string|null;features:string[]};
export type Market="BR"|"US";
export type Currency="BRL"|"USD";
export type CatalogSnapshot={market?:Market;currency?:Currency;preferences?:ProjectPreferences;version:1;items:CatalogLine[];one_time_cents:number;monthly_cents:number};
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
export const US_CATALOG:Offer[]=[
  {
    "id": "landing-page-basica",
    "category": "Websites",
    "name": "Basic landing page",
    "price_cents": 25000,
    "deadline": "3 business days",
    "scope": "One page, up to 4 sections and a contact button.",
    "monthly": false,
    "website": true
  },
  {
    "id": "landing-page-profissional",
    "category": "Websites",
    "name": "Professional landing page",
    "price_cents": 40000,
    "deadline": "5 business days",
    "scope": "One page, up to 7 sections, a form and WhatsApp.",
    "monthly": false,
    "website": true
  },
  {
    "id": "landing-page-premium",
    "category": "Websites",
    "name": "Premium landing page",
    "price_cents": 55000,
    "deadline": "7 business days",
    "scope": "Up to 10 sections, animations and basic event tracking.",
    "monthly": false,
    "website": true
  },
  {
    "id": "portfolio-profissional",
    "category": "Websites",
    "name": "Professional portfolio",
    "price_cents": 40000,
    "deadline": "5 business days",
    "scope": "Up to 4 pages and 10 projects.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-institucional",
    "category": "Websites",
    "name": "Business website",
    "price_cents": 60000,
    "deadline": "7 business days",
    "scope": "Up to 3 pages, contact, map and social links.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-empresarial-completo",
    "category": "Websites",
    "name": "Complete business website",
    "price_cents": 90000,
    "deadline": "10 business days",
    "scope": "Up to 5 pages, a form and basic SEO.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-premium-personalizado",
    "category": "Websites",
    "name": "Custom premium website",
    "price_cents": 120000,
    "deadline": "15 business days",
    "scope": "Up to 7 pages and light animations.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-com-painel-administrativo",
    "category": "Websites",
    "name": "Website with admin dashboard",
    "price_cents": 140000,
    "deadline": "15 business days",
    "scope": "Up to 5 pages and editing one content category.",
    "monthly": false,
    "website": true
  },
  {
    "id": "reformulacao-de-site",
    "category": "Websites",
    "name": "Website redesign",
    "price_cents": 45000,
    "deadline": "7 business days",
    "scope": "Redesign of up to 3 pages.",
    "monthly": false,
    "website": true
  },
  {
    "id": "cardapio-digital-em-pdf",
    "category": "Menus",
    "name": "PDF digital menu",
    "price_cents": 15000,
    "deadline": "3 business days",
    "scope": "Up to 4 pages and 40 items.",
    "monthly": false,
    "website": false
  },
  {
    "id": "cardapio-digital-profissional",
    "category": "Menus",
    "name": "Professional digital menu",
    "price_cents": 30000,
    "deadline": "5 business days",
    "scope": "Up to 50 items, categories and QR code.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-institucional-com-cardapio",
    "category": "Menus",
    "name": "Restaurant website with menu",
    "price_cents": 70000,
    "deadline": "8 business days",
    "scope": "Up to 3 pages and a 50-item menu.",
    "monthly": false,
    "website": true
  },
  {
    "id": "site-completo-com-sistema-de-pedidos",
    "category": "Menus",
    "name": "Website with ordering system",
    "price_cents": 140000,
    "deadline": "12 business days",
    "scope": "Up to 50 items, cart and orders through WhatsApp.",
    "monthly": false,
    "website": true
  },
  {
    "id": "catalogo-digital",
    "category": "Online stores",
    "name": "Digital product catalog",
    "price_cents": 35000,
    "deadline": "5 business days",
    "scope": "Up to 30 products, no checkout.",
    "monthly": false,
    "website": true
  },
  {
    "id": "loja-com-pedidos-via-whatsapp",
    "category": "Online stores",
    "name": "Store with WhatsApp ordering",
    "price_cents": 70000,
    "deadline": "8 business days",
    "scope": "Up to 40 products, cart and orders through WhatsApp.",
    "monthly": false,
    "website": true
  },
  {
    "id": "loja-virtual-completa",
    "category": "Online stores",
    "name": "Complete online store",
    "price_cents": 140000,
    "deadline": "15 business days",
    "scope": "Up to 50 products, standard checkout and dashboard.",
    "monthly": false,
    "website": true
  },
  {
    "id": "e-commerce-avancado",
    "category": "Online stores",
    "name": "Advanced e-commerce",
    "price_cents": 220000,
    "deadline": "20 business days",
    "scope": "Up to 100 products, one integration and a standard dashboard.",
    "monthly": false,
    "website": true
  },
  {
    "id": "scripts-personalizados",
    "category": "Systems & automation",
    "name": "Custom scripts",
    "price_cents": 15000,
    "deadline": "3 business days",
    "scope": "One script for one task.",
    "monthly": false,
    "website": false
  },
  {
    "id": "bots-personalizados",
    "category": "Systems & automation",
    "name": "Custom bots",
    "price_cents": 30000,
    "deadline": "5 business days",
    "scope": "One bot with up to 5 commands.",
    "monthly": false,
    "website": false
  },
  {
    "id": "automacao-de-processos",
    "category": "Systems & automation",
    "name": "Process automation",
    "price_cents": 40000,
    "deadline": "7 business days",
    "scope": "One workflow, up to 3 steps and one external service.",
    "monthly": false,
    "website": false
  },
  {
    "id": "integracao-de-sistemas-e-apis",
    "category": "Systems & automation",
    "name": "Systems and API integration",
    "price_cents": 50000,
    "deadline": "8 business days",
    "scope": "Two services and up to 3 operations.",
    "monthly": false,
    "website": false
  },
  {
    "id": "painel-administrativo",
    "category": "Systems & automation",
    "name": "Admin dashboard",
    "price_cents": 85000,
    "deadline": "10 business days",
    "scope": "Up to 3 screens and management of one record type.",
    "monthly": false,
    "website": false
  },
  {
    "id": "sistema-empresarial-inicial",
    "category": "Systems & automation",
    "name": "Starter business system",
    "price_cents": 250000,
    "deadline": "25 business days",
    "scope": "Login, up to 3 simple modules and one user role.",
    "monthly": false,
    "website": false
  },
  {
    "id": "integracao-com-inteligencia-artificial",
    "category": "Systems & automation",
    "name": "AI integration",
    "price_cents": 85000,
    "deadline": "10 business days",
    "scope": "One AI API feature in an existing system.",
    "monthly": false,
    "website": false
  },
  {
    "id": "configuracao-de-campanhas",
    "category": "Paid ads",
    "name": "Campaign setup",
    "price_cents": 20000,
    "deadline": "3 business days",
    "scope": "One platform and one campaign.",
    "monthly": false,
    "website": false
  },
  {
    "id": "meta-ads",
    "category": "Paid ads",
    "name": "Meta Ads management",
    "price_cents": 40000,
    "deadline": "30 calendar days",
    "scope": "Up to 2 campaigns and a monthly report.",
    "monthly": true,
    "website": false
  },
  {
    "id": "google-ads",
    "category": "Paid ads",
    "name": "Google Ads management",
    "price_cents": 45000,
    "deadline": "30 calendar days",
    "scope": "Up to 2 campaigns and a monthly report.",
    "monthly": true,
    "website": false
  },
  {
    "id": "meta-ads-google-ads",
    "category": "Paid ads",
    "name": "Meta Ads + Google Ads",
    "price_cents": 70000,
    "deadline": "30 calendar days",
    "scope": "Up to 2 campaigns per platform.",
    "monthly": true,
    "website": false
  },
  {
    "id": "gestao-avancada-de-trafego",
    "category": "Paid ads",
    "name": "Advanced ads management",
    "price_cents": 100000,
    "deadline": "30 calendar days",
    "scope": "Up to 6 campaigns, testing and weekly monitoring.",
    "monthly": true,
    "website": false
  },
  {
    "id": "manutencao-mensal-opcional",
    "category": "Support",
    "name": "Optional monthly maintenance",
    "price_cents": 9900,
    "deadline": "Monthly",
    "scope": "Up to one hour of minor changes per month.",
    "monthly": true,
    "website": false
  },
  {
    "id": "atualizacao-mensal-de-cardapio",
    "category": "Support",
    "name": "Monthly menu updates",
    "price_cents": 5000,
    "deadline": "Monthly",
    "scope": "Up to 15 item or price updates.",
    "monthly": true,
    "website": false
  },
  {
    "id": "pagina-adicional",
    "category": "Support",
    "name": "Additional page",
    "price_cents": 12500,
    "deadline": "3 business days",
    "scope": "One page with up to 5 sections.",
    "monthly": false,
    "website": false
  },
  {
    "id": "correcoes-e-melhorias",
    "category": "Support",
    "name": "Fixes and improvements",
    "price_cents": 17500,
    "deadline": "3 business days",
    "scope": "One support request, up to 2 hours.",
    "monthly": false,
    "website": false
  },
  {
    "id": "otimizacao-para-buscas-seo",
    "category": "Support",
    "name": "Search optimization (SEO)",
    "price_cents": 25000,
    "deadline": "5 business days",
    "scope": "Technical SEO for up to 5 pages.",
    "monthly": false,
    "website": false
  },
  {
    "id": "otimizacao-de-desempenho",
    "category": "Support",
    "name": "Performance optimization",
    "price_cents": 20000,
    "deadline": "5 business days",
    "scope": "Improvements for up to 5 pages.",
    "monthly": false,
    "website": false
  },
  {
    "id": "integracoes-adicionais",
    "category": "Support",
    "name": "Additional integrations",
    "price_cents": 27500,
    "deadline": "5 business days",
    "scope": "One simple integration.",
    "monthly": false,
    "website": false
  }
];
export const getCatalog=(market:Market)=>market==="US"?US_CATALOG:CATALOG;
export const currencyFor=(market:Market):Currency=>market==="US"?"USD":"BRL";
export const maintenanceFor=(market:Market)=>market==="US"?9900:MAINTENANCE_CENTS;
export const PROJECT_COMPLEXITIES_EN=["Not sure / need guidance","Simple","Intermediate","Advanced"];
export const PROJECT_TIMELINES_EN=["Flexible","Standard timeline","Urgent"];
export const PROJECT_FEATURES_EN=["Admin dashboard","Online payments","Multiple languages","User login","Systems/API integration","Website visual identity","WhatsApp","Contact form","SEO"];
export const CATEGORIES=[...new Set(CATALOG.map(o=>o.category))];
export const money=(cents:number,currency:Currency="BRL")=>new Intl.NumberFormat(currency==="USD"?"en-US":"pt-BR",{style:"currency",currency}).format(cents/100);
export function catalogSnapshot(input:unknown,strict=true,market:Market="BR"):CatalogSnapshot|null{
 if(!Array.isArray(input)||!input.length||input.length>CATALOG.length)return null;
 const catalog=getCatalog(market);
 const ids=new Set<string>();const items:CatalogLine[]=[];
 for(const choice of input){if(!choice||typeof choice!=="object"||typeof choice.id!=="string"||ids.has(choice.id))return null;const o=catalog.find(i=>i.id===choice.id);if(!o)return null;ids.add(o.id);const m=choice.maintenance;if(o.website&&strict&&m!=="yes"&&m!=="no")return null;if(!o.website&&m!=null)return null;const maintenance=o.website&&(m==="yes"||m==="no")?m:null;items.push({...o,maintenance,maintenance_cents:maintenance==="yes"?maintenanceFor(market):0});}
 if(items.some(i=>i.website)&&ids.has(MAINTENANCE_ID))return null;
 return {version:1,market,currency:currencyFor(market),items,one_time_cents:items.reduce((sum,i)=>sum+(i.monthly?0:i.price_cents),0),monthly_cents:items.reduce((sum,i)=>sum+(i.monthly?i.price_cents:0)+i.maintenance_cents,0)};
}

export const INFRA_OPTIONS={
 hosting:[["existing","Já tenho hospedagem","I already have hosting"],["self","Vou contratar e pagar diretamente","I will purchase and pay directly"],["assisted","Quero ajuda para escolher e configurar","I need help choosing and configuring hosting"],["undecided","Preciso de orientação","I need guidance"],["not_applicable","Não se aplica","Not applicable"]],
 domain:[["existing","Já tenho domínio","I already have a domain"],["new","Quero registrar um domínio próprio","I want to register a custom domain"],["subdomain","Subdomínio, se compatível com o projeto","Subdomain, if suitable for the project"],["undecided","Preciso de orientação","I need guidance"],["not_applicable","Não se aplica","Not applicable"]],
 extras:[["email","E-mail profissional","Business email"],["database","Banco de dados / armazenamento","Database / storage"],["api","APIs e integrações pagas","Paid APIs and integrations"],["licenses","Licenças e ferramentas","Licenses and tools"],["ads","Verba de anúncios","Advertising budget"]]
} as const;
export type Infrastructure={hosting:string;domain:string;extras:string[];acknowledged:true};
export function infrastructureLabel(kind:keyof typeof INFRA_OPTIONS,value:string,en=false){return INFRA_OPTIONS[kind].find(o=>o[0]===value)?.[en?2:1]??value;}
export function validInfrastructure(input:unknown,website:boolean):input is Infrastructure{
 if(!input||typeof input!=="object")return false;
 const x=input as Partial<Infrastructure>;
 return x.acknowledged===true&&INFRA_OPTIONS.hosting.some(o=>o[0]===x.hosting)&&INFRA_OPTIONS.domain.some(o=>o[0]===x.domain)&&(!website||(x.hosting!=="not_applicable"&&x.domain!=="not_applicable"))&&Array.isArray(x.extras)&&x.extras.length<=INFRA_OPTIONS.extras.length&&new Set(x.extras).size===x.extras.length&&x.extras.every(v=>INFRA_OPTIONS.extras.some(o=>o[0]===v));
}
