// Central contact config (real values provided by the owner). Stage 5 adds the full form + estimator.
export const CONTACT: {
  email: string | null;
  github: string | null;
  linkedin: string | null;
} = {
  email: "shimoteeduardo3@gmail.com",
  // Not supplied by the owner yet — set a full profile URL to show the button. Never invent one.
  github: null,
  linkedin: null,
};

export const contactHref = CONTACT.email ? `mailto:${CONTACT.email}` : "#contact";

// Services offered, reused by the contact form's "Service Required" field (labels come from
// t.services.cards[id].title — same six ids already used across Services/Terminal, kept in sync).
export const SERVICE_IDS = ["web", "bots", "auto", "soft", "ui", "xp"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

// Illustrative, non-binding USD estimate ranges for the Project Estimator. Shown ONLY alongside an
// explicit "not a quote" disclaimer. Reuses the same six service ids as SERVICE_IDS/services.cards.
export const ESTIMATOR = {
  complexity: { simple: 1, standard: 1.6, advanced: 2.6 } as const,
  baseUSD: { web: 600, bots: 450, auto: 500, soft: 1200, ui: 400, xp: 900 } as const,
  timelineMultiplier: { flexible: 1, standard: 1.1, urgent: 1.35 } as const,
  featureUSD: 150,
};
export type Complexity = keyof typeof ESTIMATOR.complexity;
export type Timeline = keyof typeof ESTIMATOR.timelineMultiplier;

// Dispatched by ProjectEstimator's "Request a Custom Quote"; ContactForm listens and prefills
// itself without losing the visitor's selections (see PROJECT_CONTEXT.md "Stage 5").
export const ESTIMATOR_APPLY_EVENT = "estimator:apply";
export type EstimatorApplyDetail = { service: ServiceId; summary: string };
