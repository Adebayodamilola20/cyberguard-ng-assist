import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Bot,
  Brain,
  CheckCircle2,
  FileText,
  GraduationCap,
  KeyRound,
  PlayCircle,
  Quote,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberGuard NG — Your AI Security Team for Every Business" },
      { name: "description", content: "AI-powered cybersecurity for Nigerian SMEs. Detect scams, monitor breaches, train staff and stay NDPA compliant from one dashboard." },
      { property: "og:title", content: "CyberGuard NG — AI Security for Nigerian SMEs" },
      { property: "og:description", content: "Detect scams, monitor breaches, train employees and stay NDPA compliant from one intelligent dashboard." },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Brain,
    title: "AI Scam Detection",
    desc: "Paste a message, link, or screenshot. Our AI flags phishing, fake bank alerts, investment scams and impersonation attempts in seconds.",
  },
  {
    icon: KeyRound,
    title: "Breach Monitoring",
    desc: "Continuously scan dark-web dumps for leaked employee credentials and get alerted the moment a password is exposed.",
  },
  {
    icon: Bell,
    title: "Account Protection Alerts",
    desc: "Real-time alerts for suspicious logins, unusual locations, device changes and brute-force attempts across your workspace.",
  },
  {
    icon: GraduationCap,
    title: "Employee Awareness Training",
    desc: "Bite-sized quizzes and simulated phishing campaigns turn your team into a human firewall — with progress tracking and certificates.",
  },
  {
    icon: ShieldCheck,
    title: "NDPA Compliance Assistant",
    desc: "Live checklist mapped to the Nigeria Data Protection Act with a compliance score and improvement recommendations.",
  },
  {
    icon: FileText,
    title: "Reports & Audit Trail",
    desc: "One-click security, compliance and training reports. Export as PDF or CSV for boards, auditors and regulators.",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect your workspace",
    body: "Add your team's emails, domains and apps in under 5 minutes. No code, no IT team required.",
  },
  {
    n: "02",
    title: "Let the AI watch your back",
    body: "CyberGuard NG monitors logins, leaks and inboxes 24/7, scoring your security posture in real time.",
  },
  {
    n: "03",
    title: "Act on clear, plain-English guidance",
    body: "Every alert comes with a risk score and a specific next step — written for business owners, not engineers.",
  },
];

const testimonials = [
  {
    name: "Tola A.",
    role: "MD, Lagos Retail Chain",
    body: "We blocked a ₦4.2M wire fraud attempt the same week we switched on CyberGuard NG. It paid for itself immediately.",
  },
  {
    name: "Dr. Eze",
    role: "Administrator, Abuja Hospital",
    body: "Patient data is sensitive. The NDPA assistant gave us a clear roadmap and our auditors signed off without back-and-forth.",
  },
  {
    name: "Pst. Williams",
    role: "Lead Pastor, Port Harcourt",
    body: "Our church finance team gets phishing emails every week. The scam detector flags them before anyone clicks.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "₦25,000",
    cadence: "/month",
    blurb: "For small teams getting their security in order.",
    cta: "Start free trial",
    featured: false,
    items: [
      "Up to 10 employees",
      "AI scam detector",
      "Breach monitoring",
      "Basic NDPA checklist",
      "Email alerts",
    ],
  },
  {
    name: "Growth",
    price: "₦75,000",
    cadence: "/month",
    blurb: "For growing SMEs with real compliance needs.",
    cta: "Start free trial",
    featured: true,
    items: [
      "Up to 50 employees",
      "Everything in Starter",
      "Employee training & simulations",
      "Full NDPA compliance assistant",
      "Account protection alerts",
      "PDF & CSV reports",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "For schools, hospitals and multi-branch businesses.",
    cta: "Talk to sales",
    featured: false,
    items: [
      "Unlimited employees",
      "Everything in Growth",
      "Dedicated security analyst",
      "Custom training content",
      "SLA & priority response",
      "Single sign-on",
    ],
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="size-4" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              CyberGuard <span className="text-primary">NG</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">Stories</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block">
              Login
            </Link>
            <Button asChild className="rounded-full font-semibold">
              <Link to="/auth">Get protected</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-32 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <Badge variant="outline" className="mb-6 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              AI-powered security · built for Nigeria
            </Badge>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance lg:text-7xl">
              Your AI Security Team for{" "}
              <span className="text-primary">Every Business.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              CyberGuard NG gives Nigerian SMEs, schools, hospitals and churches enterprise-grade
              cybersecurity — scam detection, breach monitoring, employee training and NDPA
              compliance — all from one dashboard. No security team required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-xl px-7 text-base font-semibold">
                <Link to="/auth">Start free trial <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-7 text-base font-semibold">
                <Link to="/dashboard"><PlayCircle className="mr-1 size-4" /> See the dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> No credit card</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Setup in 5 minutes</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> NDPA-ready</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-warning/20 blur-3xl" aria-hidden />
            <div className="relative rounded-3xl border border-border bg-card p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border px-3 py-2 text-xs text-muted-foreground">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-muted" />
                  <span className="size-2.5 rounded-full bg-muted" />
                  <span className="size-2.5 rounded-full bg-muted" />
                </div>
                <span className="font-mono">app.cyberguard.ng / overview</span>
                <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Security score</div>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="font-display text-5xl font-bold">88</span>
                    <span className="mb-2 text-sm font-semibold text-primary">+4.2%</span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[88%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">Above Nigerian SME average</div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Threats blocked · 30d</div>
                  <div className="mt-2 font-display text-5xl font-bold">1,204</div>
                  <div className="mt-4 flex items-end gap-1">
                    {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="w-3 rounded-sm bg-primary/70" style={{ height: `${h * 0.4}px` }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5 md:col-span-2">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Recent alerts</div>
                    <span className="text-[10px] font-mono text-primary">LIVE</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-xl border border-danger/20 bg-danger/5 p-3">
                      <ShieldAlert className="size-4 text-danger" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">Phishing SMS impersonating GTBank</div>
                        <div className="text-[11px] text-muted-foreground">Target: Accounts Payable · 2 min ago</div>
                      </div>
                      <span className="rounded bg-danger/10 px-1.5 py-0.5 text-[10px] font-bold text-danger">CRITICAL</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                      <KeyRound className="size-4 text-warning" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">tunde@acmemed.ng found in credential leak</div>
                        <div className="text-[11px] text-muted-foreground">2024 marketing-tool breach · 1 hr ago</div>
                      </div>
                      <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[10px] font-bold text-warning">HIGH</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 opacity-80">
                      <CheckCircle2 className="size-4 text-primary" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">Vendor invoice verified</div>
                        <div className="text-[11px] text-muted-foreground">flutterwave.com · 3 hr ago</div>
                      </div>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">SAFE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 py-8 text-xs uppercase tracking-widest text-muted-foreground sm:px-6 lg:gap-14 lg:px-8">
          <span>Protecting 500+ Nigerian organisations</span>
          <span className="hidden sm:inline">·</span>
          <span>SMEs · Startups · Hospitals · Schools · Churches · Retail</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 text-primary">Features</Badge>
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance lg:text-5xl">
            One platform. The entire security stack.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything a Nigerian SME needs to detect, prevent and respond to cyber threats — without
            hiring a dedicated security team.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group bg-card p-8 transition-colors hover:bg-accent/40">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 text-primary">How it works</Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance lg:text-5xl">
              From zero to protected in an afternoon.
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-card p-8">
                <div className="font-display text-5xl font-bold text-primary/30">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant tease */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 text-primary">
              <Sparkles className="mr-1 size-3" /> AI assistant
            </Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance lg:text-5xl">
              Ask anything. Get plain-English security advice.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our cybersecurity chatbot understands Nigerian business context — bank scams, BVN
              fraud, NDPA obligations and CAC filing risks. Get instant guidance whenever a threat
              shows up.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Explains threats in plain language",
                "Suggests next actions for owners and staff",
                "Connected to your alerts, breach data and compliance score",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <Bot className="size-5" />
              </div>
              <div>
                <div className="font-semibold">CyberGuard Assistant</div>
                <div className="text-xs text-muted-foreground">Online · Trained on Nigerian threats</div>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary/15 p-3 text-foreground">
                A staff member clicked a link in a fake bank email. What do I do?
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-background p-3 text-muted-foreground">
                <p className="font-medium text-foreground">Act in this order:</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4">
                  <li>Reset their password immediately and revoke active sessions.</li>
                  <li>Enable MFA on the account if it isn't already.</li>
                  <li>Run a breach scan on the affected email from <em>Breach Monitor</em>.</li>
                  <li>If a payment was made, contact the bank's fraud desk within the hour.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 text-primary">Customers</Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance lg:text-5xl">
              Trusted by Nigerian leaders.
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-8">
                <Quote className="size-6 text-primary" />
                <blockquote className="mt-4 text-foreground">"{t.body}"</blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-primary/15 font-semibold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <figcaption>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </figcaption>
                </div>
                <div className="mt-4 flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 text-primary">Pricing</Badge>
          <h2 className="font-display text-4xl font-bold tracking-tight text-balance lg:text-5xl">
            Plans that fit every business.
          </h2>
          <p className="mt-4 text-muted-foreground">Pay in Naira. Cancel anytime. 14-day free trial on all plans.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                p.featured
                  ? "border-primary bg-primary/[0.06] shadow-xl shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl font-bold">{p.price}</span>
                <span className="mb-2 text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{i}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 h-11 rounded-xl font-semibold ${p.featured ? "" : "bg-foreground text-background hover:bg-foreground/90"}`}
              >
                <Link to="/auth">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-primary-foreground text-balance lg:text-5xl">
                Secure your business today.
              </h2>
              <p className="mt-4 max-w-lg text-primary-foreground/80">
                Join 500+ Nigerian organisations using CyberGuard NG to protect operations,
                employees and customer data.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Button asChild size="lg" className="h-12 rounded-xl bg-background px-7 text-foreground hover:bg-background/90">
                <Link to="/auth">Create free account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="mailto:sales@cyberguard.ng">Contact sales</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded bg-primary text-primary-foreground">
              <Shield className="size-3.5" />
            </div>
            <span className="font-display font-bold">CyberGuard NG</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CyberGuard Technologies Nigeria. Built for SME resilience.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">NDPA Guide</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
