import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recentAlerts, severityStyles, type Severity } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/alerts")({ component: Alerts });

function Alerts() {
  const [severity, setSeverity] = useState<Severity | "all">("all");
  const list = recentAlerts.filter((a) => severity === "all" || a.severity === severity);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Account Protection Alerts</h1>
          <p className="text-sm text-muted-foreground">Suspicious logins, failed attempts, device changes and high-risk activity in real time.</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <Select value={severity} onValueChange={(v) => setSeverity(v as Severity | "all")}>
            <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Alert timeline</CardTitle></CardHeader>
        <CardContent>
          <ol className="relative space-y-5 border-l border-border pl-6">
            {list.map((a) => {
              const sev = severityStyles[a.severity];
              return (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[30px] top-1.5 grid size-4 place-items-center rounded-full bg-card ring-4 ring-background">
                    <span className={`size-2 rounded-full ${a.severity === "critical" || a.severity === "high" ? "bg-danger" : a.severity === "medium" ? "bg-warning" : "bg-primary"}`} />
                  </span>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground"><a.icon className="size-4" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.description}{a.location ? ` · ${a.location}` : ""}</div>
                      </div>
                      <Badge variant="outline" className={sev.cls}>{sev.label}</Badge>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                      <strong className="text-foreground">Recommended:</strong>
                      {a.category === "phishing" && "Quarantine message, notify recipient, run scan on sender domain."}
                      {a.category === "login" && "Force re-authentication, verify device, enable MFA if missing."}
                      {a.category === "breach" && "Reset password, revoke active sessions, audit recent activity."}
                      {a.category === "device" && "Confirm device with the user, block if unrecognised."}
                      {a.category === "compliance" && "Open the NDPA checklist and resolve the missing item."}
                    </div>
                    <div className="mt-3 flex gap-2"><Button size="sm" variant="outline">Investigate</Button><Button size="sm" variant="ghost">Mark resolved</Button></div>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}