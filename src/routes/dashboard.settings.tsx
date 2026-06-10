import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/settings")({ component: Settings });

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your organisation, team, notifications and billing.</p>
      </div>
      <Tabs defaultValue="org">
        <TabsList>
          <TabsTrigger value="org">Organisation</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="org" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Organisation profile</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" defaultValue="Acme Medical Ltd" />
              <Field label="Industry" defaultValue="Healthcare" />
              <Field label="Headquarters" defaultValue="Lagos, Nigeria" />
              <Field label="Employees" defaultValue="24" />
              <Field label="RC number" defaultValue="RC-1209887" />
              <Field label="NDPA contact email" defaultValue="dpo@acmemed.ng" />
              <div className="sm:col-span-2"><Button className="rounded-xl" onClick={() => toast.success("Organisation profile saved")}>Save changes</Button></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div><CardTitle className="text-base">Team members</CardTitle><p className="text-xs text-muted-foreground">24 of 50 seats used on the Growth plan.</p></div>
              <Button className="rounded-xl font-semibold" onClick={() => toast.success("Invite sent")}><Plus className="mr-1 size-4" /> Invite member</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {employees.map((e) => (
                <div key={e.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <Avatar className="size-9"><AvatarFallback className="bg-primary/15 text-primary">{e.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1"><div className="truncate font-medium">{e.name}</div><div className="truncate text-xs text-muted-foreground">{e.email} · {e.role}</div></div>
                  <Badge variant="outline" className="text-xs">{e.role === "IT Admin" ? "Admin" : "Member"}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => toast.error("Member removed")}><Trash2 className="size-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { t: "Critical alerts via email", d: "Phishing attempts, breaches and unauthorised logins.", on: true },
                { t: "Daily security digest", d: "One summary email every morning at 8am.", on: true },
                { t: "Weekly compliance report", d: "Sent every Monday to all admins.", on: false },
                { t: "SMS for critical incidents", d: "Nigerian numbers only · uses your SMS bundle.", on: true },
                { t: "Slack notifications", d: "Push alerts into your #security channel.", on: false },
              ].map((p) => (
                <div key={p.t} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                  <div><div className="font-medium">{p.t}</div><div className="text-xs text-muted-foreground">{p.d}</div></div>
                  <Switch defaultChecked={p.on} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Security preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { t: "Require MFA for all admins", on: true },
                { t: "Auto-block sign-ins from outside Nigeria", on: false },
                { t: "Force password reset every 90 days", on: true },
                { t: "Allow AI inbox scanning", on: true },
              ].map((p) => (
                <div key={p.t} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                  <div className="font-medium">{p.t}</div>
                  <Switch defaultChecked={p.on} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Billing</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Current plan</div>
                  <div className="font-display text-2xl font-bold">Growth — ₦75,000/month</div>
                  <div className="text-xs text-muted-foreground">Next invoice: Dec 12, 2024 · 24 of 50 seats</div>
                </div>
                <Button className="rounded-xl">Upgrade to Enterprise</Button>
              </div>
              <div>
                <Label className="text-xs">Payment method</Label>
                <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background p-3">
                  <div className="text-sm">Visa ending in 4421 · expires 09/27</div>
                  <Button variant="ghost" size="sm">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}