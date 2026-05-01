import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";

const EXPERTISE = ["AI", "Design", "No-Code", "Web Dev", "Storytelling", "Career"];

const schema = z.object({
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  profession: z.string().trim().min(2).max(120),
  linkedin_url: z.string().trim().url().max(300).optional().or(z.literal("")),
  expertise: z.array(z.string()).min(1, "Pick at least one area"),
  why_mentor: z.string().trim().min(20, "Tell us a bit more").max(800),
});

export function MentorForm() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    profession: "",
    linkedin_url: "",
    expertise: [] as string[],
    why_mentor: "",
  });

  const toggle = (x: string) =>
    setForm((f) => ({
      ...f,
      expertise: f.expertise.includes(x) ? f.expertise.filter((e) => e !== x) : [...f.expertise, x],
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Check the form");
    setBusy(true);
    const d = parsed.data;
    const { data, error } = await supabase.rpc("apply_as_mentor", {
      _full_name: d.full_name,
      _email: d.email,
      _profession: d.profession,
      _linkedin: d.linkedin_url || "",
      _expertise: d.expertise,
      _why: d.why_mentor,
    });
    setBusy(false);
    if (error || !data) return toast.error("Something went wrong");
    setDone(true);
    toast.success("Thank you, kind wizard. We'll be in touch.");
  };

  if (done)
    return (
      <div className="parchment mx-auto max-w-xl p-8 text-center">
        <div className="text-4xl">✨</div>
        <h3 className="font-display mt-2 text-2xl">Your message is in the headmaster's hands</h3>
        <p className="mt-2 text-sm">
          We'll reach out at <strong>{form.email}</strong> as we shortlist mentors.
        </p>
      </div>
    );

  return (
    <div className="envelope mx-auto w-full max-w-xl">
      <div className="wax-seal">M</div>
      <form onSubmit={submit} className="envelope-inner space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Full name">
          <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        </F>
        <F label="Email">
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </F>
        <F label="Profession">
          <Input value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} />
        </F>
        <F label="LinkedIn / portfolio (optional)">
          <Input value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} />
        </F>
      </div>
      <F label="Areas of expertise">
        <div className="flex flex-wrap gap-2">
          {EXPERTISE.map((x) => {
            const on = form.expertise.includes(x);
            return (
              <button
                type="button"
                key={x}
                onClick={() => toggle(x)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  on
                    ? "border-[color:var(--gold)] bg-[color:var(--gold)]/20 text-gold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {x}
              </button>
            );
          })}
        </div>
      </F>
      <F label="Why do you want to mentor these students?">
        <Textarea rows={4} value={form.why_mentor} onChange={(e) => setForm({ ...form, why_mentor: e.target.value })} />
      </F>
      <Button
        type="submit"
        disabled={busy}
        size="lg"
        className="w-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--gold)] text-[color:var(--primary-foreground)]"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
        Apply to mentor
      </Button>
    </form>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
