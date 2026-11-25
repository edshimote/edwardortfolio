import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { headers,cookies } from "next/headers";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { CONTACT } from "@/lib/contact";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Edward Digital" },
  description: SITE_DESCRIPTION,
  keywords: [
    "full-stack developer",
    "web development",
    "automation specialist",
    "custom software developer",
    "React developer",
    "Next.js developer",
    "chatbot development",
    "business automation",
    "freelance developer for US businesses",
  ],
  authors: [{ name: "Eduardo" }],
  creator: "Eduardo",
  alternates: {
    canonical: "/",
    // Single-URL i18n (client-side language toggle, no per-language routes): both language
    // variants live at the same address. x-default + explicit en-US/pt-BR tags tell search
    // engines the page serves both audiences rather than implying separate URLs that don't exist.
    languages: { "en-US": "/", "pt-BR": "/", "x-default": "/" },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: process.env.APP_MODE==="admin" ? {index:false,follow:false} : { index: true, follow: true, googleBot: { index: true, follow: true } },
};
export const viewport: Viewport = { themeColor: "#07090F", width: "device-width", initialScale: 1 };

// Person/ProfessionalService structured data — only real, confirmed facts (no invented company,
// US address, awards or testimonials). Email pulled from the single source of truth.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "$$",
  areaServed: [{ "@type": "Country", name: "Brazil" }, { "@type": "Country", name: "United States" }],
  ...(CONTACT.email ? { email: CONTACT.email } : {}),
  founder: { "@type": "Person", name: "Eduardo", jobTitle: "Full-Stack Developer & Automation Specialist" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h=await headers();const c=await cookies();const saved=c.get("edward-market")?.value;const country=h.get("x-vercel-ip-country");const locale=process.env.APP_MODE==="admin"?"pt":saved==="pt"||saved==="en"?saved:country?country==="BR"?"pt":"en":(h.get("accept-language")||"pt").toLowerCase().startsWith("pt")?"pt":"en";
  return (
    <html lang={locale==="pt"?"pt-BR":"en-US"} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <LanguageProvider initialLocale={locale}>
          <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2">Skip to content</a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
