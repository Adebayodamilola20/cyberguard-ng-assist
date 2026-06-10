import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bell,
  Brain,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  recentAlerts,
  securityTrend,
  severityStyles,
  threatBreakdown,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const score = 88;
  const circ = 2 * Math.PI * 56;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Welcome back, Amaka.</h1>
          <p className="text-sm text-muted-foreground">
            Here's what CyberGuard NG defended for Acme Medical Ltd in the last 24 hours.
          </p>
        </div>
        <Button asChild className="rounded-xl font-semibold">
          <Link to="/dashboard/scam-detector">Run a scam scan <ArrowRight className="ml-1 size-4" /></Link>
        </Button>
      </div>

      {/* Top metric row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Security health
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="relative size-24 shrink-0">
              <svg viewBox="0 0 128 128" className="size-24 -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="var(--color-muted)" strokeWidth="10" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="var(--color-primary)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - score / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold">{score}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Secure</span>
              </div>
            </div>
            <div className="min-w-0 text-sm">
              <div className="flex items-center gap-1 font-semibold text-primary">
                <TrendingUp className="size-3.5" /> +4.2% this week
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Above the Nigerian SME average (62).
              </div>
            </div>
          </CardContent>
        </Card>

        <StatCard label="Threats blocked · 30d" value="1,204" hint="+128 vs prior period" icon={ShieldCheck} tone="success" />
        <StatCard label="Active alerts" value="9" hint="3 critical · 4 medium · 2 low" icon={Bell} tone="warning" />
        <StatCard label="NDPA compliance" value="72%" hint="3 actions to reach 90%" icon={ShieldAlert} tone="info" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Security score · last 7 days</CardTitle>
              <p className="text-xs text-muted-foreground">Daily posture across phishing, breaches and account abuse.</p>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={securityTrend} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" stroke="var(--color-muted-foreground)" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" stroke="var(--color-muted-foreground)" domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#scoreFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Threats by type</CardTitle>
            <p className="text-xs text-muted-foreground">Distribution over the last 30 days.</p>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={threatBreakdown} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={2}>
                    {threatBreakdown.map((d) => (
                      <Cell key={d.name} fill={d.color} stroke="var(--color-card)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1.5 text-xs">
              {threatBreakdown.map((d) => (
                <li key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-mono text-muted-foreground">{d.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Lower grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Recent alerts</CardTitle>
              <p className="text-xs text-muted-foreground">Latest signals from your environment.</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard/alerts">View all <ChevronRight className="ml-1 size-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAlerts.slice(0, 5).map((a) => {
              const sev = severityStyles[a.severity];
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <a.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{a.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.description}</div>
                  </div>
                  <div className="hidden text-xs text-muted-foreground sm:block">{a.time}</div>
                  <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${sev.cls}`}>{sev.label.toUpperCase()}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security recommendations</CardTitle>
            <p className="text-xs text-muted-foreground">High-impact actions to raise your score.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: KeyRound, t: "Reset 2 leaked staff passwords", p: "+6 pts" },
              { icon: GraduationCap, t: "Assign 'Spotting Phishing' to 4 employees", p: "+4 pts" },
              { icon: ShieldCheck, t: "Complete NDPA consent log audit", p: "+5 pts" },
              { icon: Brain, t: "Enable AI inbox scanning on finance@", p: "+3 pts" },
            ].map((r) => (
              <div key={r.t} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <r.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1 text-sm">{r.t}</div>
                <span className="font-mono text-xs text-primary">{r.p}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Employee + activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Employee security score</CardTitle>
            <p className="text-xs text-muted-foreground">Average across your 24 employees.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Safe" value="17" tone="success" />
              <Stat label="At risk" value="5" tone="warning" />
              <Stat label="Compromised" value="2" tone="danger" />
            </div>
            <div className="mt-6 space-y-3">
              <ScoreBar label="Phishing awareness" value={82} />
              <ScoreBar label="Password hygiene" value={64} />
              <ScoreBar label="MFA adoption" value={91} />
              <ScoreBar label="Training completion" value={68} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activity timeline</CardTitle>
            <p className="text-xs text-muted-foreground">What's happened across your workspace.</p>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-l border-border pl-5">
              {[
                { t: "Blocked phishing SMS impersonating GTBank", time: "2 min ago" },
                { t: "Tunde Bakare completed 'Strong Passwords & MFA'", time: "1 hr ago" },
                { t: "NDPA score increased to 72%", time: "3 hr ago" },
                { t: "New sign-in from Port Harcourt for amaka@", time: "5 hr ago" },
                { t: "Weekly compliance report exported as PDF", time: "Yesterday" },
              ].map((e) => (
                <li key={e.t} className="relative">
                  <span className="absolute -left-[26px] top-1.5 grid size-3 place-items-center rounded-full bg-primary ring-4 ring-background">
                    <Activity className="size-2 text-primary-foreground" />
                  </span>
                  <div className="text-sm">{e.t}</div>
                  <div className="text-xs text-muted-foreground">{e.time}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof ShieldCheck;
  tone: "success" | "warning" | "info";
}) {
  const tones = {
    success: "text-primary bg-primary/10",
    warning: "text-warning bg-warning/10",
    info: "text-foreground bg-muted",
  } as const;
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 pt-6">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="mt-1 font-display text-3xl font-bold">{value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
        </div>
        <div className={`grid size-10 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "warning" | "danger" }) {
  const tones = {
    success: "text-primary",
    warning: "text-warning",
    danger: "text-danger",
  } as const;
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className={`font-display text-3xl font-bold ${tones[tone]}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold">{value}</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}