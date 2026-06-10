import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { complianceItems, type ComplianceItem } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/compliance")({ component: Compliance });

function Compliance() {
  const [items, setItems] = useState<ComplianceItem[]>(complianceItems);
  const score = useMemo(() => {
    const total = items.length;
    const w = items.reduce((s, i) => s + (i.status === "complete" ? 1 : i.status === "in-progress" ? 0.5 : 0), 0);
    return Math.round((w / total) * 100);
  }, [items]);
  const grouped = useMemo(() => {
    const map = new Map<string, ComplianceItem[]>();
    for (const i of items) { const a = map.get(i.category) ?? []; a.push(i); map.set(i.category, a); }
    return Array.from(map.entries());
  }, [items]);
  function toggle(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: i.status === "complete" ? "missing" : "complete" } : i));
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">NDPA Compliance Assistant</h1>
          <p className="text-sm text-muted-foreground">Live checklist mapped to the Nigeria Data Protection Act with a real-time compliance score.</p>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Compliance PDF exported")}><Download className="mr-1 size-4" /> Export audit report</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Compliance score</CardTitle></CardHeader>
          <CardContent className="text-center">
            <div className="relative mx-auto size-40">
              <svg viewBox="0 0 128 128" className="size-40 -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="var(--color-muted)" strokeWidth="10" fill="none" />
                <circle cx="64" cy="64" r="56" stroke="var(--color-primary)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 56} strokeDashoffset={2 * Math.PI * 56 * (1 - score / 100)} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl font-bold">{score}%</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">NDPA Ready</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Resolve missing items to reach 90% — recommended threshold before a regulator audit.</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Risk analysis</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { t: "Consent log gaps", d: "12 customer records missing consent timestamps.", sev: "High" },
              { t: "Data retention", d: "Automated deletion is not configured — records persist indefinitely.", sev: "High" },
              { t: "Data subject requests", d: "No self-service portal for export/correction/deletion.", sev: "Medium" },
              { t: "Access reviews", d: "Quarterly employee access review is overdue by 3 weeks.", sev: "Medium" },
            ].map((r) => (
              <div key={r.t} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                <AlertCircle className={`mt-0.5 size-4 shrink-0 ${r.sev === "High" ? "text-danger" : "text-warning"}`} />
                <div className="flex-1"><div className="text-sm font-medium">{r.t}</div><div className="text-xs text-muted-foreground">{r.d}</div></div>
                <Badge variant="outline" className={r.sev === "High" ? "border-danger/30 text-danger" : "border-warning/30 text-warning"}>{r.sev}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {grouped.map(([category, list]) => {
        const done = list.filter((i) => i.status === "complete").length;
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" />{category}</span>
                <span className="text-xs font-normal text-muted-foreground">{done} / {list.length} complete</span>
              </CardTitle>
              <Progress value={(done / list.length) * 100} className="h-1.5" />
            </CardHeader>
            <CardContent className="space-y-2">
              {list.map((i) => (
                <label key={i.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:bg-accent/30">
                  <Checkbox checked={i.status === "complete"} onCheckedChange={() => toggle(i.id)} className="mt-0.5" />
                  <div className="min-w-0 flex-1"><div className="text-sm font-medium">{i.title}</div><div className="text-xs text-muted-foreground">{i.description}</div></div>
                  <StatusBadge status={i.status} />
                </label>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: ComplianceItem["status"] }) {
  if (status === "complete") return <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary"><CheckCircle2 className="mr-1 size-3" /> Done</Badge>;
  if (status === "in-progress") return <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning"><Clock3 className="mr-1 size-3" /> In progress</Badge>;
  return <Badge variant="outline" className="border-danger/30 bg-danger/10 text-danger"><AlertCircle className="mr-1 size-3" /> Missing</Badge>;
}