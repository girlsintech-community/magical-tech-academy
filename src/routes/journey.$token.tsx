import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Mail } from "lucide-react";
import { toast } from "sonner";

type App = {
  id: string;
  full_name: string;
  status: "applied" | "task_invited" | "task_submitted" | "accepted" | "rejected" | "waitlisted";
  house: "fireforge" | "brightmind" | "codecraft" | "sparkroot" | null;
  task_response: string | null;
  task_link: string | null;
  magic_token: string;
};

export const Route = createFileRoute("/journey/$token")({
  component: JourneyPage,
});

function JourneyPage() {
  const { token } = Route.useParams();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.rpc("get_application_by_token", { _token: token });
    setApp((data as App[])?.[0] ?? null);
    setLoading(false);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Starfield />
      <CursorWand />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <a href="/" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold">
          ← Back to school
        </a>
        {loading && (
          <div className="mt-20 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-gold" />
          </div>
        )}
        {!loading && !app && (
          <div className="mt-20 text-center">
            <h1 className="font-display text-3xl text-gold">No such scroll</h1>
            <p className="mt-3 text-muted-foreground">This magical link doesn't seem to exist.</p>
          </div>
        )}
        {app && <View app={app} reload={load} />}
      </main>
    </>
  );
}

function View({ app, reload }: { app: App; reload: () => void }) {
  if (app.status === "applied")
    return (
      <Status icon="🦉" title="Your owl has reached us" body="We're reading your application. If your spark catches our eye, we'll send you a magical task here." />
    );
  if (app.status === "waitlisted")
    return (
      <Status
        icon="✨"
        title="You're on the waitlist"
        body="The hall is full, but we'll write to you the moment a seat opens. Stay magical."
      />
    );
  if (app.status === "rejected")
    return (
      <Status
        icon="🌙"
        title="Not this time, brave soul"
        body="We received many wonderful applications. This wasn't your year — but the world is full of magic, and so are you."
      />
    );
  if (app.status === "task_invited" || app.status === "task_submitted")
    return <TaskForm app={app} reload={reload} />;
  if (app.status === "accepted") return <AcceptanceLetter app={app} />;
  return null;
}

function Status({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="magic-card mt-14 rounded-2xl p-10 text-center"
    >
      <div className="text-5xl">{icon}</div>
      <h1 className="font-display mt-4 text-3xl text-gold">{title}</h1>
      <p className="mt-3 text-foreground/80">{body}</p>
    </motion.div>
  );
}

function TaskForm({ app, reload }: { app: App; reload: () => void }) {
  const [response, setResponse] = useState(app.task_response ?? "");
  const [link, setLink] = useState(app.task_link ?? "");
  const [busy, setBusy] = useState(false);
  const submitted = app.status === "task_submitted";
  const words = response.trim().split(/\s+/).filter(Boolean).length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim().length < 100) return toast.error("Write a bit more — at least 100 characters");
    setBusy(true);
    const { data, error } = await supabase.rpc("submit_task", {
      _token: app.magic_token,
      _response: response,
      _link: link,
    });
    setBusy(false);
    if (error || !data) return toast.error("Could not save — try again");
    toast.success("Your spark has reached us");
    reload();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Stage 2 · The Task</p>
      <h1 className="font-display mt-2 text-4xl">Hello, {app.full_name.split(" ")[0]}</h1>
      <p className="mt-3 text-foreground/80">
        You've been invited to complete a small magical task. Tell us, in your own words:
      </p>
      <p className="font-display mt-4 text-2xl italic text-gold">
        "Why do you want to join Hogwarts: A Magical Virtual Tech Summer School?"
      </p>

      <form onSubmit={submit} className="magic-card mt-8 space-y-4 rounded-2xl p-6">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Your answer · {words} words
          </Label>
          <Textarea
            rows={10}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write from the heart. There are no wrong answers."
            disabled={submitted}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Optional · Link to anything you've made (project, video, drawing, anything)
          </Label>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://…"
            disabled={submitted}
          />
        </div>

        {submitted ? (
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            ✓ Your task is in the headmaster's hands. Watch this page for your invitation.
          </div>
        ) : (
          <Button
            type="submit"
            disabled={busy}
            size="lg"
            className="w-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] text-[color:var(--primary-foreground)]"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Submit my spark
          </Button>
        )}
      </form>
    </motion.div>
  );
}

function AcceptanceLetter({ app }: { app: App }) {
  const houseLabel: Record<string, string> = {
    fireforge: "Fireforge — bold builders",
    brightmind: "Brightmind — curious thinkers",
    codecraft: "Codecraft — strategic creators",
    sparkroot: "Sparkroot — kind collaborators",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="parchment mt-12 p-10 sm:p-14"
    >
      <p className="text-xs uppercase tracking-[0.3em]">Hogwarts · A Magical Virtual Tech Summer School</p>
      <h1 className="font-display mt-3 text-4xl">Dear {app.full_name},</h1>
      <p className="mt-6 text-base leading-relaxed">
        We are pleased to inform you that you have been <strong>accepted</strong> into the 2026 cohort
        of Hogwarts: A Magical Virtual Tech Summer School. Please find enclosed your
        official welcome and house assignment.
      </p>
      {app.house && (
        <p className="font-display mt-6 text-2xl italic">
          You have been sorted into <span className="text-amber-700">{houseLabel[app.house]}</span>.
        </p>
      )}
      <p className="mt-6 leading-relaxed">
        Term begins on <strong>7 June 2026</strong> and concludes with our Demo Day on
        <strong> 21 June 2026</strong>. Join your house, build something magical, and meet a hundred
        kindred souls.
      </p>
      <p className="font-display mt-8 text-2xl">— Girls Leading Tech</p>
      <a
        href="mailto:girlsleadingtech@gmail.com"
        className="mt-8 inline-flex items-center gap-2 text-sm text-amber-800 hover:underline"
      >
        <Mail className="h-4 w-4" /> girlsleadingtech@gmail.com
      </a>
    </motion.div>
  );
}
