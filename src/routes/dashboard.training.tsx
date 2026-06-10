import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, Download, GraduationCap, Plus, Users } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { employees, trainingCourses } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/training")({ component: Training });

function Training() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Employee Awareness Training</h1>
          <p className="text-sm text-muted-foreground">Bite-sized quizzes and phishing simulations to build a human firewall.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Training report downloading")}><Download className="mr-1 size-4" /> Report</Button>
          <Button className="rounded-xl font-semibold" onClick={() => toast.success("Simulation campaign queued")}><Plus className="mr-1 size-4" /> Launch simulation</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Kpi icon={Users} label="Enrolled" value="24" />
        <Kpi icon={GraduationCap} label="Avg. completion" value="68%" />
        <Kpi icon={Award} label="Certificates issued" value="17" />
        <Kpi icon={Clock} label="Avg. time / course" value="11 min" />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Course library</CardTitle><p className="text-xs text-muted-foreground">Localised content built for the Nigerian threat landscape.</p></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trainingCourses.map((c) => (
              <div key={c.id} className="flex flex-col rounded-2xl border border-border bg-background p-5">
                <Badge variant="outline" className="w-fit text-xs">{c.difficulty}</Badge>
                <h3 className="mt-3 font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="size-3.5" /> {c.duration}</span>
                  <span>{c.enrolled} enrolled</span>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">Completion</span><span className="font-mono font-semibold">{c.completion}%</span></div>
                  <Progress value={c.completion} className="h-2" />
                </div>
                <Button className="mt-4 rounded-xl" onClick={() => toast.success(`Assigned: ${c.title}`)}>Assign to team</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Employee progress</CardTitle><p className="text-xs text-muted-foreground">Per-employee security and training scores.</p></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Role</TableHead><TableHead>Security score</TableHead><TableHead>Training</TableHead><TableHead className="text-right">Last active</TableHead></TableRow></TableHeader>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell><div className="font-medium">{e.name}</div><div className="text-xs text-muted-foreground">{e.email}</div></TableCell>
                  <TableCell className="text-sm">{e.role}</TableCell>
                  <TableCell><div className="flex items-center gap-2"><span className={`font-mono font-semibold ${e.score >= 80 ? "text-primary" : e.score >= 60 ? "text-warning" : "text-danger"}`}>{e.score}</span><Progress value={e.score} className="h-1.5 w-24" /></div></TableCell>
                  <TableCell><div className="flex items-center gap-2"><span className="w-9 font-mono text-sm">{e.trainingProgress}%</span><Progress value={e.trainingProgress} className="h-1.5 w-24" /></div></TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{e.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <Card><CardContent className="flex items-center justify-between pt-6">
      <div><div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</div><div className="mt-1 font-display text-3xl font-bold">{value}</div></div>
      <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></div>
    </CardContent></Card>
  );
}