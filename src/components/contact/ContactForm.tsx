"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  CONTACT,
  contactHref,
} from "@/lib/contact";
import { catalogSnapshot,money,PROJECT_COMPLEXITIES,PROJECT_TIMELINES,PROJECT_FEATURES,type Selection } from "@/lib/commercial-catalog";
import { ContactButtons } from "./ContactButtons";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({selection,onSent}:{selection:Selection[];onSent:()=>void}) {
  const { t } = useLanguage();
  const f = t.contact.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");
  useEffect(() => { fetch("/api/session", {cache:"no-store"}).then(r=>r.ok?r.json():null).then(d=>{if(d?.email){setAccount(d.email);setEmail(d.email);}}).catch(()=>{}); }, []);
  const snapshot=catalogSnapshot(selection);
  const [budget, setBudget] = useState("");
  const [complexity,setComplexity]=useState("");
  const [timeline,setTimeline]=useState("");
  const [features,setFeatures]=useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = f.required;
    if (!email.trim()) next.email = f.required;
    else if (!EMAIL_RE.test(email.trim())) next.email = f.invalidEmail;
    if (!message.trim()) next.message = f.required;
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!account) { setStatus("error"); setErrorDetail("Entre na sua conta para enviar e acompanhar o orçamento."); return; }
    if(!snapshot){setStatus("error");setErrorDetail("Selecione pelo menos um serviço no catálogo e responda à manutenção de cada site.");return;}
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setErrorDetail(f.errorValidation);
      return;
    }
    // Soft anti-spam: a human takes a moment to fill a form out.
    if (honeypot.trim() !== "") {
      setStatus("success"); // behave normally; silently drop
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          service:"Catálogo comercial",
          catalogSelections:selection,
          catalogPreferences:{complexity:complexity||null,timeline:timeline||null,features},
          budget,
          message,
          company_website: honeypot,
        }),
      });
      if (res.status === 401) { setStatus("error"); setErrorDetail("Sessão expirada. Entre novamente na área do cliente."); return; }
      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (res.status === 429) {
        setStatus("error");
        setErrorDetail(f.errorRateLimit);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErrorDetail(f.errorGeneric);
        return;
      }
      await res.json();
      onSent();
      setStatus("success");
      setName(""); setEmail(account); setCompany(""); setPhone(""); setBudget(""); setMessage(""); setComplexity("");setTimeline("");setFeatures([]);
    } catch {
      setStatus("error");
      setErrorDetail(f.errorGeneric);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.05]";
  const labelCls = "mb-1.5 block font-mono text-xs tracking-wide text-ink-muted";
  const errorCls = "mt-1.5 text-xs text-red-400";

  if (status === "unconfigured") {
    return (
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
          <div>
            <p className="font-display text-lg font-semibold">{f.unconfiguredTitle}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{f.unconfiguredDesc}</p>
          </div>
        </div>
        <div className="mt-6">
          <ContactButtons />
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="glass flex items-start gap-3 rounded-2xl p-6 sm:p-8" role="status">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden />
        <div><p className="text-sm text-ink">{f.success}</p><a href="/cliente" className="mt-2 block text-sm text-secondary">Abrir meu chat e acompanhar pedido</a><button type="button" className="mt-2 block text-sm underline" onClick={()=>setStatus("idle")}>Fazer novo pedido</button></div>
      </div>
    );
  }

  return (
    <form id="catalog-contact-form" ref={formRef} onSubmit={onSubmit} noValidate className="glass relative rounded-2xl p-6 sm:p-8">
      <h3 className="font-display text-lg font-semibold">2. Descreva seu projeto</h3>
      <p className="mt-1.5 text-sm text-ink-muted">As escolhas do catálogo e a descrição serão enviadas automaticamente ao nosso chat.</p>
      {snapshot?<div className="mt-4 rounded-xl border border-line p-3 text-sm"><p className="font-semibold">{snapshot.items.length} serviço(s) selecionado(s)</p><p>{money(snapshot.one_time_cents)} pagamento único + {money(snapshot.monthly_cents)}/mês</p></div>:<p className="mt-4 text-sm text-amber-300">Complete suas escolhas no catálogo antes de enviar.</p>}
      {!account && <p className="mt-4 rounded-lg border border-line p-3 text-sm">Para enviar e acompanhar seu orçamento, <a className="text-secondary underline" href="/cliente">entre ou crie sua conta</a>.</p>}

      {/* Honeypot — hidden from sighted users, never filled by humans */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="company_website">{f.honeypot}</label>
        <input
          id="company_website" name="company_website" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>{f.name}</label>
          <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} autoComplete="name" />
          {errors.name && <p id="name-error" className={errorCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>{f.email}</label>
          <input id="email" type="email" className={inputCls} readOnly={Boolean(account)} value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} autoComplete="email" />
          {errors.email && <p id="email-error" className={errorCls}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className={labelCls}>{f.company} <span className="text-ink-muted/60">{f.companyOptional}</span></label>
          <input id="company" className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className={labelCls}>WhatsApp (opcional)</label>
          <input id="phone" type="tel" autoComplete="tel" className={inputCls} value={phone} onChange={e=>setPhone(e.target.value)} maxLength={40} placeholder="(11) 99999-9999" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="budget" className={labelCls}>{f.budget}</label>
          <select id="budget" className={inputCls} value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">{f.budgetPlaceholder}</option>
            {["Até R$ 500","R$ 501 a R$ 1.000","R$ 1.001 a R$ 2.000","R$ 2.001 a R$ 3.500","Acima de R$ 3.500","A definir"].map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div><label htmlFor="complexity" className={labelCls}>Complexidade desejada (opcional)</label><select id="complexity" className={inputCls} value={complexity} onChange={e=>setComplexity(e.target.value)}><option value="">Selecione</option>{PROJECT_COMPLEXITIES.map(v=><option key={v}>{v}</option>)}</select></div>
        <div><label htmlFor="timeline" className={labelCls}>Preferência de prazo (opcional)</label><select id="timeline" className={inputCls} value={timeline} onChange={e=>setTimeline(e.target.value)}><option value="">Selecione</option>{PROJECT_TIMELINES.map(v=><option key={v}>{v}</option>)}</select></div>
        <fieldset className="space-y-3 rounded-xl border border-line p-4 sm:col-span-2"><legend className="text-sm font-semibold">Recursos desejados (opcional)</legend><p className="text-xs text-ink-muted">Indique o que você precisa. Recursos fora do escopo escolhido serão avaliados no orçamento; marcar aqui não adiciona preço automaticamente.</p><div className="grid gap-2 sm:grid-cols-2">{PROJECT_FEATURES.map(v=><label key={v} className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-violet-500" checked={features.includes(v)} onChange={()=>setFeatures(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v])}/>{v}</label>)}</div></fieldset>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>{f.message}</label>
          <textarea id="message" rows={5} maxLength={4000} className={`${inputCls} resize-y`} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder={f.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <p id="message-error" className={errorCls}>{errors.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} className="shrink-0" aria-hidden /> {errorDetail}
        </motion.p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting" || !snapshot}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-white transition-all duration-300 hover:bg-primary-soft hover:shadow-glow active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <><Loader2 size={16} className="animate-spin" aria-hidden /> {f.submitting}</>
          ) : (
            <>{f.submit} <Send size={15} aria-hidden /></>
          )}
        </button>
        <p className="font-mono text-[0.68rem] leading-relaxed text-ink-muted">{f.privacy}</p>
      </div>

      {!CONTACT.email && process.env.NODE_ENV !== "production" && (
        <p className="mt-4 font-mono text-[0.68rem] text-ink-muted">
          Dev note: set CONTACT_FORM_WEBHOOK_URL (and optional CONTACT_FORM_WEBHOOK_TOKEN) in the server environment to enable real delivery.
        </p>
      )}
      <a href={contactHref} className="sr-only">{CONTACT.email}</a>
    </form>
  );
}
