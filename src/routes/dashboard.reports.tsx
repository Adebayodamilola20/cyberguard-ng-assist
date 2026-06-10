import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, GraduationCap, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/reports")({ component: Reports });

const reportTypes = [
  { icon: ShieldCheck, title: "Security posture report", desc: "Health score trend, threats blocked, top risks and recommendations.", range: "Last 30 days" },
  { icon: ShieldAlert, title: "Threat intelligence report", desc: "All detected scams, phishing campaigns and account-protection alerts.", range: "Last 30 days" },
  { icon: GraduationCap, title: "Employee training report", desc: "Per-employee scores, course completion and certificates issued.", range: "All time" },
  { icon: FileText, title: "NDPA compliance report", desc: "Compliance score, completed controls and outstanding items for auditors.", range: "Current snapshot" },
];

const recentExports = [
  { name: "Q3 Security Posture.pdf", size: "1.2 MB", date: "Today, 09:14" },
  { name: "October Training Roster.csv", size: "48 KB", date: "Yesterday" },
  { name: "NDPA Audit Snapshot.pdf", size: "920 KB", date: "Nov 28, 2024" },
  { name: "Phishing Campaign Results.csv", size: "62 KB", date: "Nov 20, 2024" },
];

function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Reports Center</h1>
        <p className="text-sm text-muted-foreground">Generate board-ready, auditor-ready and operator-ready reports in one click.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map((r) => (
          <Card key={r.title}>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><r.icon className="size-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold">{r.title}</h3>
                  <Badge variant="outline" className="text-xs">{r.range}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => toast.success("PDF export started")}><Download className="mr-1 size-4" /> Export PDF</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success("CSV export started")}><Download className="mr-1 size-4" /> Export CSV</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Sparkles className="size-4 text-primary" /> AI-generated executive summary</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-border bg-background p-5 text-sm leading-relaxed text-muted-foreground">
            <p><strong className="text-foreground">Acme Medical Ltd security posture improved by 4.2% this week,</strong> reaching a score of 88/100. CyberGuard NG blocked 1,204 threats over the last 30 days, primarily phishing (42%) and fraud attempts (18%).</p>
            <p className="mt-3">Two employee accounts were found in third-party credential leaks and have been flagged for forced reset. NDPA compliance currently stands at 72% — three high-impact controls (automated retention, consent log gaps and a data subject portal) will close the gap to 90%.</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Recent exports</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {recentExports.map((e) => (
            <div key={e.name} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
              <FileText className="size-4 text-muted-foreground" />
              <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{e.name}</div><div className="text-xs text-muted-foreground">{e.size} · {e.date}</div></div>
              <Button size="sm" variant="ghost"><Download className="size-4" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}