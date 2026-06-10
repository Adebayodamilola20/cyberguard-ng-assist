import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Link2, Mail, Paperclip, Sparkles, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { samplePhishingMessage } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/scam-detector")({ component: ScamDetector });

type Result = {
  score: number;
  level: "Safe" | "Suspicious" | "Dangerous";
  reasons: { ok: boolean; text: string }[];
  actions: string[];
};

function analyze(text: string): Result {
  const t = text.toLowerCase();
  let score = 5;
  const reasons: Result["reasons"] = [];
  const triggers: [RegExp, number, string][] = [
    [/urgent|immediately|within \d+ (min|hour)/i, 22, "Urgency pressure (common phishing tactic)"],
    [/click\s*(the\s*)?link|https?:\/\/[^\s]*verify|reactivate|secure-/i, 25, "Suspicious link asking you to verify or reactivate"],
    [/bvn|nin|otp|password|pin/i, 20, "Asks for sensitive credentials (BVN, NIN, OTP, PIN)"],
    [/zenith|gtbank|access|first bank|uba|fidelity/i, 12, "Impersonates a Nigerian bank brand"],
    [/invest|returns|guaranteed|crypto|forex/i, 18, "Investment-scam keywords (guaranteed returns)"],
    [/dear (valued )?customer|sir\/madam/i, 8, "Generic greeting instead of your name"],
    [/support@[a-z-]+(-ng|-secure|-support)\./i, 15, "Spoofed support-style sender domain"],
  ];
  for (const [re, pts, msg] of triggers) {
    if (re.test(t)) { score += pts; reasons.push({ ok: false, text: msg }); }
  }
  if (reasons.length === 0) {
    reasons.push({ ok: true, text: "No phishing keywords detected" }, { ok: true, text: "Tone matches normal business communication" });
  }
  score = Math.min(98, score);
  const level: Result["level"] = score >= 65 ? "Dangerous" : score >= 30 ? "Suspicious" : "Safe";
  const actions = level === "Dangerous"
    ? ["Do not click any links or reply to the sender", "Report to your IT admin and forward to report@cyberguard.ng", "If a staff member clicked, reset their password and revoke sessions", "Notify your bank's fraud desk if money was transferred"]
    : level === "Suspicious"
      ? ["Verify the sender via a known phone number", "Hover over links before clicking; confirm domain spelling", "Run another scan if context changes"]
      : ["Looks safe, but stay vigilant", "When in doubt, confirm with the sender on a trusted channel"];
  return { score, level, reasons, actions };
}

function ScamDetector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [tab, setTab] = useState("message");
  function run() { const v = text.trim(); if (!v) return; setResult(analyze(v)); }
  const tone = result?.level === "Dangerous" ? "text-danger border-danger/40 bg-danger/10"
    : result?.level === "Suspicious" ? "text-warning border-warning/40 bg-warning/10"
    : "text-primary border-primary/40 bg-primary/10";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">AI Scam Detector</h1>
          <p className="text-sm text-muted-foreground">Paste a suspicious message, link, email or screenshot. Our AI returns a risk score in seconds.</p>
        </div>
        <Badge variant="outline" className="gap-1 border-primary/30 text-primary"><Sparkles className="size-3" /> Powered by CyberGuard AI</Badge>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Analyse content</CardTitle></CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="message"><Mail className="mr-1 size-3.5" /> Message</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="link"><Link2 className="mr-1 size-3.5" /> Link</TabsTrigger>
                <TabsTrigger value="screenshot"><Paperclip className="mr-1 size-3.5" /> Screenshot</TabsTrigger>
              </TabsList>
              <TabsContent value="message" className="mt-4 space-y-3">
                <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the suspicious WhatsApp / SMS message here…" rows={8} />
                <Button variant="ghost" size="sm" onClick={() => setText(samplePhishingMessage)}>Use a sample phishing message</Button>
              </TabsContent>
              <TabsContent value="email" className="mt-4">
                <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste full email headers and body…" rows={8} />
              </TabsContent>
              <TabsContent value="link" className="mt-4 space-y-2">
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="https://suspicious-domain.com/verify" />
                <p className="text-xs text-muted-foreground">We check the domain reputation, redirect chain and known phishing kits.</p>
              </TabsContent>
              <TabsContent value="screenshot" className="mt-4">
                <label className="grid cursor-pointer place-items-center rounded-xl border-2 border-dashed border-border bg-background py-12 text-center text-sm text-muted-foreground hover:border-primary/40">
                  <Upload className="mb-3 size-6" />
                  Drop a screenshot here, or click to upload.
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setText(`Uploaded screenshot: ${f.name}\n(AI OCR would run here)`); }} />
                </label>
              </TabsContent>
            </Tabs>
            <div className="mt-5 flex gap-2">
              <Button onClick={run} className="rounded-xl font-semibold"><Sparkles className="mr-1 size-4" /> Analyse now</Button>
              <Button variant="outline" onClick={() => { setText(""); setResult(null); }}>Clear</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Risk verdict</CardTitle></CardHeader>
          <CardContent>
            {!result ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Submit content to see the AI verdict and recommended actions.</div>
            ) : (
              <div className="space-y-5">
                <div className={`rounded-2xl border p-5 ${tone}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-widest">Risk score</div>
                    {result.level === "Safe" ? <CheckCircle2 className="size-5" /> : <AlertTriangle className="size-5" />}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2"><span className="font-display text-5xl font-bold">{result.score}</span><span className="text-sm font-semibold">/ 100</span></div>
                  <Progress value={result.score} className="mt-3 h-2" />
                  <div className="mt-2 text-sm font-semibold">{result.level}</div>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Why</div>
                  <ul className="space-y-2 text-sm">
                    {result.reasons.map((r) => (
                      <li key={r.text} className="flex items-start gap-2">
                        {r.ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> : <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />}
                        <span className={r.ok ? "text-muted-foreground" : ""}>{r.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recommended actions</div>
                  <ol className="list-decimal space-y-1 pl-4 text-sm text-muted-foreground">{result.actions.map((a) => <li key={a}>{a}</li>)}</ol>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">What we look for</CardTitle><p className="text-xs text-muted-foreground">CyberGuard AI is trained on Nigerian-specific threat patterns.</p></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Phishing indicators", d: "Urgency, fake login pages, lookalike domains, spoofed senders." },
              { t: "Fraud indicators", d: "Account-takeover language, fake invoice patterns, BVN/NIN requests." },
              { t: "Fake bank alerts", d: "Spoofed bank brands, fake credit/debit notifications, suspicious short codes." },
              { t: "Investment scams", d: "Guaranteed returns, crypto/forex pump schemes, MLM-style recruitment." },
              { t: "Impersonation attempts", d: "CEO fraud, vendor impersonation, fake HR/payroll requests." },
              { t: "Malware indicators", d: "Suspicious attachments, obfuscated links, drive-by download URLs." },
            ].map((i) => (
              <div key={i.t} className="rounded-xl border border-border bg-background p-4">
                <div className="font-semibold">{i.t}</div>
                <p className="mt-1 text-xs text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}