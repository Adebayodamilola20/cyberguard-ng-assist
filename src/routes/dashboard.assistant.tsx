import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/dashboard/assistant")({ component: Assistant });

type Msg = { role: "user" | "ai"; content: string };

const suggested = [
  "What should I do if a staff member clicked a phishing link?",
  "Explain NDPA in two minutes for my team.",
  "How do I spot a fake bank alert SMS?",
  "Is it safe to receive payments via WhatsApp?",
];

function reply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("phish") || t.includes("clicked")) return "Act in this order:\n1. Reset the staff member's password and revoke all active sessions.\n2. Enable MFA on the account immediately.\n3. Run a Breach Monitor scan on their email.\n4. If money was transferred, contact the bank's fraud desk within the hour and report to EFCC's Cybercrime portal.\n5. Send the message to /scam-detector so the AI can flag similar attempts.";
  if (t.includes("ndpa") || t.includes("data protect")) return "The Nigeria Data Protection Act (NDPA, 2023) gives Nigerians rights over their personal data. For your team: (1) only collect data you actually need, (2) tell people why and get consent, (3) protect it with encryption and access controls, (4) delete it when no longer needed, (5) report breaches within 72 hours.";
  if (t.includes("bank") || t.includes("sms")) return "Real Nigerian banks never ask you to verify your account by clicking a link, and never ask for BVN, PIN or OTP via SMS. Red flags: urgent language, lookalike domains, generic greetings, threats to suspend your account. If unsure, call the bank using the number on your card — never one from the message.";
  if (t.includes("whatsapp") || t.includes("payment")) return "WhatsApp is encrypted but a common vector for impersonation. Best practice: never accept new account numbers via WhatsApp without a confirmation call to a trusted number, enable two-step verification, and treat 'urgent CEO' messages from new numbers as suspicious until verified.";
  return "Great question. Based on your current setup at Acme Medical Ltd, I'd recommend reviewing the related alert in your dashboard and following the recommended action. Want me to open the relevant module?";
}

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", content: "Hi Amaka 👋 I'm your CyberGuard AI assistant. Ask me about threats you've seen, NDPA, or what to do after a security incident." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, typing]);
  function send(q?: string) {
    const value = (q ?? input).trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", content: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => { setMessages((m) => [...m, { role: "ai", content: reply(value) }]); setTyping(false); }, 700);
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="flex h-[calc(100vh-10rem)] flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary"><Bot className="size-5" /></div>
            <div><CardTitle className="text-base">CyberGuard AI Assistant</CardTitle><p className="text-xs text-muted-foreground">Trained on Nigerian cyber threats · NDPA-aware</p></div>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary"><Sparkles className="mr-1 size-3" /> Online</Badge>
        </CardHeader>
        <CardContent ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto py-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "ai" && <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Bot className="size-4" /></div>}
              <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border bg-background"}`}>{m.content}</div>
              {m.role === "user" && <div className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"><User className="size-4" /></div>}
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="grid size-8 place-items-center rounded-full bg-primary/15 text-primary"><Bot className="size-4" /></div>
              <span className="flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-primary" />
              </span>
            </div>
          )}
        </CardContent>
        <div className="border-t p-4">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask CyberGuard anything…" className="h-11" />
            <Button type="submit" className="h-11 rounded-xl px-4"><Send className="size-4" /></Button>
          </form>
        </div>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">Suggested prompts</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {suggested.map((s) => (
              <button key={s} onClick={() => send(s)} className="w-full rounded-xl border border-border bg-background p-3 text-left text-sm transition-colors hover:border-primary/30 hover:bg-primary/5">{s}</button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">What I can do</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>· Explain alerts in plain English</p>
            <p>· Recommend next actions for any incident</p>
            <p>· Walk you through NDPA obligations</p>
            <p>· Generate awareness messages for staff</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}