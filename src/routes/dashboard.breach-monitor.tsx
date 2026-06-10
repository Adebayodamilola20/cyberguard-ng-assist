import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, KeyRound, Plus, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/breach-monitor")({ component: BreachMonitor });

const breachHistory = [
  { source: "LinkedIn (2023)", emails: 1, date: "Mar 2024", severity: "High" },
  { source: "Canva (2022)", emails: 2, date: "Aug 2023", severity: "Medium" },
  { source: "MailerLite (2024)", emails: 1, date: "Jan 2024", severity: "High" },
  { source: "Marketing CRM dump", emails: 3, date: "Nov 2023", severity: "High" },
];

function BreachMonitor() {
  const [filter, setFilter] = useState("");
  const list = employees.filter((e) => `${e.name} ${e.email}`.toLowerCase().includes(filter.toLowerCase()));
  const safe = employees.filter((e) => !e.breached).length;
  const atRisk = employees.filter((e) => e.breached && e.status !== "compromised").length;
  const compromised = employees.filter((e) => e.status === "compromised").length;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Breach Monitor</h1>
          <p className="text-sm text-muted-foreground">Continuously scans dark-web dumps for leaked employee credentials.</p>
        </div>
        <Button className="rounded-xl font-semibold" onClick={() => toast.success("Added to monitoring queue")}><Plus className="mr-1 size-4" /> Add employee email</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Kpi label="Safe accounts" value={safe} tone="success" icon={ShieldCheck} />
        <Kpi label="At-risk accounts" value={atRisk} tone="warning" icon={AlertTriangle} />
        <Kpi label="Compromised" value={compromised} tone="danger" icon={KeyRound} />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div><CardTitle className="text-base">Monitored accounts</CardTitle><p className="text-xs text-muted-foreground">Status of every employee email we're tracking.</p></div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search email…" className="h-9 w-64 pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Leaks</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {list.map((e) => (
                <TableRow key={e.id}>
                  <TableCell><div className="font-medium">{e.name}</div><div className="text-xs text-muted-foreground">{e.role}</div></TableCell>
                  <TableCell className="font-mono text-xs">{e.email}</TableCell>
                  <TableCell>
                    {e.status === "safe" ? <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Safe</Badge>
                      : e.status === "at-risk" ? <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">At risk</Badge>
                      : <Badge variant="outline" className="border-danger/30 bg-danger/10 text-danger">Compromised</Badge>}
                  </TableCell>
                  <TableCell className="font-mono">{e.breachCount}</TableCell>
                  <TableCell className="text-right"><Button size="sm" variant="outline" onClick={() => toast.success(`Reset link sent to ${e.email}`)}>Force reset</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Recent breach history</CardTitle><p className="text-xs text-muted-foreground">Where your data was exposed in third-party leaks.</p></CardHeader>
          <CardContent className="space-y-2">
            {breachHistory.map((b) => (
              <div key={b.source} className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
                <div><div className="text-sm font-medium">{b.source}</div><div className="text-xs text-muted-foreground">{b.emails} email(s) exposed · {b.date}</div></div>
                <Badge variant="outline" className={b.severity === "High" ? "border-danger/30 text-danger" : "border-warning/30 text-warning"}>{b.severity}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Recommendations</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {["Force password reset on all compromised accounts within 24 hours", "Enable MFA on every employee email — currently 91% adoption", "Block reuse of breached passwords using a password manager", "Schedule quarterly dark-web sweeps for new exposures"].map((r) => (
              <div key={r} className="flex items-start gap-2 rounded-xl border border-border bg-background p-3"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /><span>{r}</span></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Kpi({ label, value, tone, icon: Icon }: { label: string; value: number; tone: "success" | "warning" | "danger"; icon: typeof ShieldCheck }) {
  const tones = { success: "text-primary bg-primary/10", warning: "text-warning bg-warning/10", danger: "text-danger bg-danger/10" } as const;
  return (
    <Card><CardContent className="flex items-center justify-between pt-6">
      <div><div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</div><div className="mt-1 font-display text-3xl font-bold">{value}</div></div>
      <div className={`grid size-10 place-items-center rounded-lg ${tones[tone]}`}><Icon className="size-5" /></div>
    </CardContent></Card>
  );
}