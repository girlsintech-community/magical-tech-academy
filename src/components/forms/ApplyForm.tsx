import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  full_name: z.string().trim().min(2, "Tell us your full name").max(80),
  age: z.coerce.number().int().min(8, "Must be 8 or older").max(18, "Must be 18 or younger"),
  gender: z.enum(["girl", "boy", "prefer_not_to_say"]),
  city: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  parent_email: z.string().trim().email("Parent email needed").max(160),
  school: z.string().trim().min(2).max(120),
  grade: z.string().trim().min(1).max(20),
  why_interested: z.string().trim().min(10, "A short sentence please").max(280),
});

type Result =
  | { success: true; magic_token: string; status: string; message: string }
  | { success: false; magic_token: null; status: null; message: string };

export function ApplyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    age: "" as string,
    gender: "girl" as "girl" | "boy" | "prefer_not_to_say",
    city: "",
    email: "",
    parent_email: "",
    school: "",
    grade: "",
    why_interested: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setSubmitting(true);
    const d = parsed.data;
    const { data, error } = await supabase.rpc("apply_to_program", {
      _full_name: d.full_name,
      _age: d.age,
      _gender: d.gender,
      _city: d.city,
      _email: d.email,
      _parent_email: d.parent_email,
      _school: d.school,
      _grade: d.grade,
      _why: d.why_interested,
    });
    setSubmitting(false);
    if (error) {
      toast.error("The owl got lost, please try again");
      return;
    }
    const r = (data as Result[])?.[0];
    if (r?.success) {
      toast.success(r.message);
      setResult(r);
    } else {
      toast.error(r?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="envelope"
          >
            <div className="wax-seal">H</div>
            <form onSubmit={submit} className="envelope-inner space-y-5">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-900/70">
                  By Owl Post, Ministry of Magical Education
                </p>
                <h2 className="font-display mt-1 text-2xl text-amber-950">
                  Your Application Letter
                </h2>
              </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <Input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
              </Field>
              <Field label="Age (8 to 18)">
                <Input
                  type="number"
                  min={8}
                  max={18}
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                />
              </Field>

              <Field label="Gender">
                <select
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value as typeof form.gender)}
                  className="h-9 w-full rounded-md border border-input bg-input/40 px-3 text-sm"
                >
                  <option value="girl">Girl</option>
                  <option value="boy">Boy</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </Field>
              <Field label="City">
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
              </Field>

              <Field label="Your email">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
              <Field label="Parent or guardian email">
                <Input
                  type="email"
                  value={form.parent_email}
                  onChange={(e) => update("parent_email", e.target.value)}
                />
              </Field>

              <Field label="School">
                <Input value={form.school} onChange={(e) => update("school", e.target.value)} />
              </Field>
              <Field label="Grade or class">
                <Input value={form.grade} onChange={(e) => update("grade", e.target.value)} />
              </Field>
            </div>

            <Field label="Why does this program interest you? (1 line)">
              <Textarea
                rows={2}
                maxLength={280}
                value={form.why_interested}
                onChange={(e) => update("why_interested", e.target.value)}
              />
            </Field>

            <p className="text-xs text-muted-foreground">
              Note: A girl applies as <em>girl</em>, a boy as <em>boy</em>. We have 75 seats for
              girls and 25 for boys this year. Once seats are full, you'll join the waitlist.
            </p>

            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] text-[color:var(--primary-foreground)] hover:opacity-95"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending your owl,
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Send my application
                </>
              )}
            </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="parchment p-8 text-center sm:p-12"
          >
            <div className="text-5xl">🦉</div>
            <h3 className="font-display mt-3 text-3xl">{result.message}</h3>
            {result.status === "waitlisted" ? (
              <p className="mt-3 text-sm">
                We will write to you the moment a seat opens. Stay magical.
              </p>
            ) : (
              <p className="mt-3 text-sm">
                Watch your inbox. If your profile sparks our interest, you will receive a short
                magical task. Complete it well, and your official hogwartz invitation will arrive.
              </p>
            )}
            <div className="mt-6 rounded-md border border-amber-700/40 bg-white/40 p-4 text-left text-xs">
              <div className="font-semibold uppercase tracking-wider text-amber-900">
                Your magic token
              </div>
              <code className="mt-1 block break-all">{result.magic_token}</code>
              <p className="mt-2 text-amber-900/80">
                Save this. You will use it to view your task and your acceptance letter.
                Visit <strong>/journey/{result.magic_token}</strong>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
