// Central site config for SEO/metadata. Set NEXT_PUBLIC_SITE_URL in the deploy environment to the
// real production domain once one exists (see DEPLOYMENT.md). Falls back to a placeholder so the
// site still builds locally; the placeholder is never presented as a real/confirmed URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://edwarddigital.vercel.app";

export const SITE_NAME = "Edward Digital";
export const SITE_TITLE = "Edward Digital — Sites, sistemas e automações para empresas";
export const SITE_DESCRIPTION =
  "Desenvolvimento de sites, cardápios digitais, lojas virtuais, sistemas e automações para empresas brasileiras.";

export const PROJECT_ROUTES = [
  "northstar-barber",
  "ember-oak",
  "northline-logistics",
  "vanta-store",
  "flowcore-automation",
  "nexus-bot-console",
  "beyond-the-screen",
] as const;
