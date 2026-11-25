import Link from "next/link";
import { ContactSection } from "@/components/contact/ContactSection";

export default function CatalogPage() {
  return <main id="home">
    <header className="container-x flex items-center justify-between py-5">
      <Link href="/" className="text-2xl font-bold tracking-tight">nexworthy</Link>
      <div className="flex gap-4"><Link href="/?proposta=1">Cadastro guiado</Link><Link href="/cliente">Área do cliente</Link></div>
    </header>
    <ContactSection />
  </main>;
}
