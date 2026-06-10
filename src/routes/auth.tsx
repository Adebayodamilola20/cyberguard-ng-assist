import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · CyberGuard NG" },
      { name: "description", content: "Sign in or create a CyberGuard NG account to protect your business." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function fakeSubmit(label: string, redirect?: string) {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(label);
      if (redirect) navigate({ to: redirect });
    }, 700);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left visual */}
      <aside className="relative hidden overflow-hidden bg-card lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="absolute -top-32 -left-20 size-[500px] rounded-full bg-primary/15 blur-3xl" aria-hidden />

        <Link to="/" className="relative flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="size-4" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            CyberGuard <span className="text-primary">NG</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight text-balance">
            Enterprise-grade security for every Nigerian business.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Detect scams, monitor breaches, train staff and stay NDPA compliant — all from one
            intelligent dashboard.
          </p>

          <div className="mt-10 grid gap-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Security score</div>
              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-4xl font-bold">88</span>
                <span className="mb-1.5 text-sm font-semibold text-primary">+4.2%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[88%] rounded-full bg-primary" />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Threats blocked · 30d</div>
              <div className="mt-1 font-display text-4xl font-bold">1,204</div>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground">
          © {new Date().getFullYear()} CyberGuard Technologies Nigeria
        </p>
      </aside>

      {/* Right form */}
      <main className="flex flex-col px-6 py-10 sm:px-12">
        <Link to="/" className="mb-12 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:hidden">
          <ArrowLeft className="size-4" /> Back home
        </Link>

        <div className="mx-auto w-full max-w-sm flex-1">
          {mode === "forgot" ? (
            <ForgotForm
              submitting={submitting}
              onSubmit={(e) => {
                e.preventDefault();
                fakeSubmit("Password reset link sent. Check your inbox.");
                setMode("login");
              }}
              onBack={() => setMode("login")}
            />
          ) : (
            <>
              <h1 className="font-display text-3xl font-bold">
                {mode === "login" ? "Welcome back." : "Create your account."}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "login"
                  ? "Sign in to your CyberGuard NG console."
                  : "Start your 14-day free trial — no credit card required."}
              </p>

              <Button
                variant="outline"
                className="mt-8 h-11 w-full rounded-xl text-sm font-semibold"
                onClick={() => fakeSubmit("Signed in with Google", "/dashboard")}
              >
                <GoogleIcon /> Continue with Google
              </Button>
              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
              </div>

              <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      fakeSubmit("Welcome back to CyberGuard NG", "/dashboard");
                    }}
                  >
                    <Field id="email" label="Work email" type="email" placeholder="you@company.ng" />
                    <Field
                      id="password"
                      label="Password"
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="text-muted-foreground hover:text-foreground"
                          aria-label={showPw ? "Hide password" : "Show password"}
                        >
                          {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      }
                    />
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-muted-foreground">
                        <input type="checkbox" className="size-3.5 rounded border-border" /> Remember me
                      </label>
                      <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                        onClick={() => setMode("forgot")}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Button type="submit" disabled={submitting} className="h-11 w-full rounded-xl font-semibold">
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      fakeSubmit("Account created — welcome to CyberGuard NG", "/dashboard");
                    }}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="first" label="First name" placeholder="Amaka" />
                      <Field id="last" label="Last name" placeholder="Obi" />
                    </div>
                    <Field id="company" label="Business name" placeholder="Acme Medical Ltd" />
                    <Field id="email2" label="Work email" type="email" placeholder="you@company.ng" />
                    <Field id="password2" label="Password" type="password" placeholder="Create a strong password" />
                    <Button type="submit" disabled={submitting} className="h-11 w-full rounded-xl font-semibold">
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : "Start free trial"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      By signing up you agree to our Terms and acknowledge our NDPA-compliant Privacy Notice.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  rightSlot,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input id={id} type={type} placeholder={placeholder} required className="h-11" />
        {rightSlot && <div className="absolute inset-y-0 right-3 grid place-items-center">{rightSlot}</div>}
      </div>
    </div>
  );
}

function ForgotForm({
  submitting,
  onSubmit,
  onBack,
}: {
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <>
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to sign in
      </button>
      <h1 className="font-display text-3xl font-bold">Reset your password.</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your work email and we'll send you a secure reset link.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <Field id="forgot-email" label="Work email" type="email" placeholder="you@company.ng" />
        <Button type="submit" disabled={submitting} className="h-11 w-full rounded-xl font-semibold">
          {submitting ? <Loader2 className="size-4 animate-spin" /> : "Send reset link"}
        </Button>
      </form>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 size-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.6 14.6 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-2H12z"/>
      <path fill="#34A853" d="M3.9 7.4l3.2 2.3c.9-1.8 2.7-3 4.9-3 1.5 0 2.8.5 3.8 1.5l2.7-2.7C16.7 3.6 14.6 2.6 12 2.6 8.2 2.6 4.9 4.6 3.9 7.4z"/>
      <path fill="#FBBC05" d="M12 21.4c2.5 0 4.6-.8 6.1-2.2l-2.9-2.4c-.8.6-1.9 1-3.2 1-2.5 0-4.6-1.7-5.3-4l-3.2 2.5c1.5 2.9 4.5 5.1 8.5 5.1z"/>
      <path fill="#4285F4" d="M21 12.2c0-.6-.1-1.1-.2-2H12v3.9h5.5c-.3 1.4-1.1 2.5-2.4 3.3l2.9 2.4c1.7-1.6 2.9-4 2.9-7.6z"/>
    </svg>
  );
}