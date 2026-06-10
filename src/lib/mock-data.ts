import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CheckCircle2,
  Globe,
  KeyRound,
  Mail,
  MapPin,
  Shield,
  ShieldAlert,
  UserCog,
} from "lucide-react";

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export const severityStyles: Record<Severity, { label: string; cls: string }> = {
  critical: { label: "Critical", cls: "bg-danger/15 text-danger border-danger/30" },
  high: { label: "High", cls: "bg-danger/10 text-danger border-danger/20" },
  medium: { label: "Medium", cls: "bg-warning/15 text-warning border-warning/30" },
  low: { label: "Low", cls: "bg-primary/15 text-primary border-primary/30" },
  info: { label: "Info", cls: "bg-muted text-muted-foreground border-border" },
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category: "phishing" | "login" | "breach" | "device" | "compliance";
  location?: string;
  time: string;
  icon: LucideIcon;
};

export const recentAlerts: Alert[] = [
  {
    id: "a1",
    title: "Suspicious SMS impersonating GTBank",
    description: "Phishing link detected in message to Accounts Payable.",
    severity: "critical",
    category: "phishing",
    location: "Lagos, NG",
    time: "2 min ago",
    icon: Mail,
  },
  {
    id: "a2",
    title: "Unusual login from Port Harcourt",
    description: "New device signed in for amaka@acmemed.ng.",
    severity: "high",
    category: "login",
    location: "Port Harcourt, NG",
    time: "18 min ago",
    icon: MapPin,
  },
  {
    id: "a3",
    title: "Employee email found in leaked database",
    description: "tunde@acmemed.ng appeared in a 2024 credential dump.",
    severity: "high",
    category: "breach",
    time: "1 hr ago",
    icon: KeyRound,
  },
  {
    id: "a4",
    title: "Multiple failed login attempts",
    description: "6 failed attempts on finance@acmemed.ng within 4 minutes.",
    severity: "medium",
    category: "login",
    location: "Unknown",
    time: "3 hr ago",
    icon: ShieldAlert,
  },
  {
    id: "a5",
    title: "MFA disabled by admin",
    description: "Two-factor turned off for a staff account.",
    severity: "medium",
    category: "device",
    time: "Yesterday",
    icon: UserCog,
  },
  {
    id: "a6",
    title: "NDPA consent log gap detected",
    description: "12 customer records missing consent timestamps.",
    severity: "low",
    category: "compliance",
    time: "Yesterday",
    icon: Shield,
  },
  {
    id: "a7",
    title: "Vendor domain verified",
    description: "invoices@flutterwave.com confirmed as a trusted sender.",
    severity: "info",
    category: "phishing",
    time: "2 days ago",
    icon: CheckCircle2,
  },
  {
    id: "a8",
    title: "Sign-in from unrecognized browser",
    description: "Edge browser used by david@acmemed.ng for the first time.",
    severity: "low",
    category: "device",
    location: "Abuja, NG",
    time: "2 days ago",
    icon: Globe,
  },
  {
    id: "a9",
    title: "Investment scam pattern flagged",
    description: "WhatsApp message promising 35% weekly returns blocked.",
    severity: "high",
    category: "phishing",
    time: "3 days ago",
    icon: AlertTriangle,
  },
];

export const securityTrend = [
  { day: "Mon", score: 78, threats: 12 },
  { day: "Tue", score: 81, threats: 8 },
  { day: "Wed", score: 82, threats: 14 },
  { day: "Thu", score: 85, threats: 6 },
  { day: "Fri", score: 84, threats: 9 },
  { day: "Sat", score: 87, threats: 3 },
  { day: "Sun", score: 88, threats: 4 },
];

export const threatBreakdown = [
  { name: "Phishing", value: 42, color: "var(--color-chart-1)" },
  { name: "Fraud", value: 18, color: "var(--color-chart-3)" },
  { name: "Account abuse", value: 14, color: "var(--color-chart-2)" },
  { name: "Malware", value: 9, color: "var(--color-chart-4)" },
  { name: "Other", value: 17, color: "var(--color-chart-5)" },
];

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  score: number;
  trainingProgress: number;
  breached: boolean;
  breachCount: number;
  status: "safe" | "at-risk" | "compromised";
  lastActive: string;
};

export const employees: Employee[] = [
  {
    id: "e1",
    name: "Amaka Obi",
    email: "amaka@acmemed.ng",
    role: "Finance Manager",
    score: 92,
    trainingProgress: 100,
    breached: false,
    breachCount: 0,
    status: "safe",
    lastActive: "Just now",
  },
  {
    id: "e2",
    name: "Tunde Bakare",
    email: "tunde@acmemed.ng",
    role: "Operations Lead",
    score: 64,
    trainingProgress: 60,
    breached: true,
    breachCount: 2,
    status: "at-risk",
    lastActive: "12 min ago",
  },
  {
    id: "e3",
    name: "Chinwe Eze",
    email: "chinwe@acmemed.ng",
    role: "HR Director",
    score: 88,
    trainingProgress: 90,
    breached: false,
    breachCount: 0,
    status: "safe",
    lastActive: "1 hr ago",
  },
  {
    id: "e4",
    name: "David Okafor",
    email: "david@acmemed.ng",
    role: "IT Admin",
    score: 95,
    trainingProgress: 100,
    breached: false,
    breachCount: 0,
    status: "safe",
    lastActive: "3 hr ago",
  },
  {
    id: "e5",
    name: "Funmi Adeyemi",
    email: "funmi@acmemed.ng",
    role: "Sales Lead",
    score: 41,
    trainingProgress: 25,
    breached: true,
    breachCount: 4,
    status: "compromised",
    lastActive: "Yesterday",
  },
  {
    id: "e6",
    name: "Kelechi Nwosu",
    email: "kelechi@acmemed.ng",
    role: "Customer Care",
    score: 73,
    trainingProgress: 75,
    breached: false,
    breachCount: 0,
    status: "safe",
    lastActive: "Yesterday",
  },
  {
    id: "e7",
    name: "Bisi Lawal",
    email: "bisi@acmemed.ng",
    role: "Marketing",
    score: 58,
    trainingProgress: 40,
    breached: true,
    breachCount: 1,
    status: "at-risk",
    lastActive: "2 days ago",
  },
];

export type ComplianceItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "complete" | "in-progress" | "missing";
};

export const complianceItems: ComplianceItem[] = [
  {
    id: "c1",
    category: "Data collection",
    title: "Lawful basis documented for each data type",
    description: "Maintain a register of data collected and the lawful basis under NDPA Article 5.",
    status: "complete",
  },
  {
    id: "c2",
    category: "Data collection",
    title: "Privacy notice published on all customer-facing channels",
    description: "Notice must cover purpose, retention, third parties and data subject rights.",
    status: "complete",
  },
  {
    id: "c3",
    category: "Data storage",
    title: "Encryption at rest for customer databases",
    description: "All production databases must use AES-256 at rest.",
    status: "complete",
  },
  {
    id: "c4",
    category: "Data storage",
    title: "Backup retention policy with off-site copies",
    description: "Daily encrypted backups stored in a separate region.",
    status: "in-progress",
  },
  {
    id: "c5",
    category: "Data retention",
    title: "Automated deletion of expired customer records",
    description: "Records past the 7-year retention window should be removed automatically.",
    status: "missing",
  },
  {
    id: "c6",
    category: "Consent management",
    title: "Granular consent capture and audit log",
    description: "Each consent event timestamped with IP and version of the privacy notice.",
    status: "in-progress",
  },
  {
    id: "c7",
    category: "Consent management",
    title: "Self-service data subject access portal",
    description: "Users can request export, correction or deletion of their data.",
    status: "missing",
  },
  {
    id: "c8",
    category: "Security controls",
    title: "MFA enforced for all employee accounts",
    description: "Multi-factor authentication required for every staff login.",
    status: "complete",
  },
  {
    id: "c9",
    category: "Security controls",
    title: "Quarterly access reviews completed",
    description: "Review every employee's access permissions every 3 months.",
    status: "in-progress",
  },
  {
    id: "c10",
    category: "Security controls",
    title: "Incident response runbook approved by leadership",
    description: "Documented playbook for breach notification within 72 hours.",
    status: "complete",
  },
];

export type TrainingCourse = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  enrolled: number;
  completion: number;
};

export const trainingCourses: TrainingCourse[] = [
  {
    id: "t1",
    title: "Spotting Phishing Emails",
    description: "Recognize fake bank alerts, fake invoices and impersonation attempts common in Nigeria.",
    duration: "12 min",
    difficulty: "Beginner",
    enrolled: 24,
    completion: 87,
  },
  {
    id: "t2",
    title: "Strong Passwords & MFA",
    description: "Build passwords attackers can't crack and turn on multi-factor everywhere.",
    duration: "8 min",
    difficulty: "Beginner",
    enrolled: 24,
    completion: 92,
  },
  {
    id: "t3",
    title: "WhatsApp & Social Engineering",
    description: "Defend against vendor impersonation, CEO fraud and fake investment offers.",
    duration: "15 min",
    difficulty: "Intermediate",
    enrolled: 21,
    completion: 64,
  },
  {
    id: "t4",
    title: "NDPA for Every Employee",
    description: "How the Nigeria Data Protection Act applies to day-to-day handling of customer data.",
    duration: "20 min",
    difficulty: "Intermediate",
    enrolled: 18,
    completion: 41,
  },
  {
    id: "t5",
    title: "Handling a Suspected Breach",
    description: "What to do in the first hour after spotting suspicious activity on your account.",
    duration: "10 min",
    difficulty: "Advanced",
    enrolled: 12,
    completion: 28,
  },
];

export const samplePhishingMessage = `From: Zenith Bank Security <secure-alerts@zenithbank-ng-support.com>
Subject: URGENT: Unusual activity on your Zenith account

Dear Valued Customer,

We noticed a transaction of ₦740,500 on your account. If you did not authorise this, click the secure link below within 30 minutes to reverse it. Failure to act will result in your account being suspended.

https://zenith-secure-verify.com/reactivate

Zenith Bank Security Team`;