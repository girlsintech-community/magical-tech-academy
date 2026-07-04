import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, ScrollText, Sparkles } from "lucide-react";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { ScrollToTop } from "@/components/magic/ScrollToTop";
import { SoundToggle } from "@/components/magic/SoundToggle";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/scrolls")({
  component: ScrollsPage,
  head: () => ({
    meta: [
      { title: "Scholar Scrolls ~ hogwartz Stories" },
      {
        name: "description",
        content:
          "Fifteen short scholar story scrolls from hogwartz Summer School reflections, lessons, favourite moments and advice.",
      },
      { property: "og:title", content: "Scholar Scrolls ~ hogwartz Stories" },
      {
        property: "og:description",
        content: "A short blog series built from real scholar reflections from hogwartz Summer School.",
      },
    ],
  }),
});

const SCROLLS = [
  {
    name: "Urmi Agarwal",
    house: "Astra 🌌",
    age: 13,
    title: "The Sorting Ceremony That Built Confidence",
    hook: "Urmi found the first spark of belonging in the house reveal and carried it into professor-led activities.",
    favourite: "The activities that I got to do with the professors was my favourite part.",
    lesson: "To have faith in myself and gain my confidence.",
    advice: "Believe in yourself and never give up.",
    tag: "Confidence",
  },
  {
    name: "Devanshi Arora",
    house: "Astra 🌌",
    age: 13,
    title: "Interactive Sessions, New Friends, Braver Questions",
    hook: "Devanshi’s scroll is about opening up, finding memorable sessions and leaving with more confidence in AI and communication.",
    favourite: "Definitely the interactive sessions.",
    lesson: "To be more confident in myself and how to monitor AI and vibe coding.",
    advice: "Have fun, make friends, open up and do not hold back.",
    tag: "Friendship",
  },
  {
    name: "Riddhish Singh",
    house: "Luno 🌙",
    age: 11,
    title: "Age Does Not Matter When You Are Building the Future",
    hook: "Riddhish saw every class as a doorway into AI, public speaking and building like a young innovator.",
    favourite: "All the sessions.",
    lesson: "How to build with AI, master public speaking, navigate LinkedIn and embrace technology.",
    advice: "Age does not matter when you are building the future. Learn, create and do it. Do not stop.",
    tag: "Building",
  },
  {
    name: "Ayesha Arif Khan",
    house: "Nyx 🌑",
    age: 18,
    title: "The Eldest Night Owl in the Castle",
    hook: "Ayesha’s reflection captures the warmth of doubts being cleared, friendly competition and confidence earned in public.",
    favourite: "The last LinkedIn competition and when children used to clear their doubts so lovingly.",
    lesson: "How to be confident.",
    advice: "Be competitive and try learning as much as you can.",
    tag: "Competition",
  },
  {
    name: "Harshita Saharan",
    house: "Nyx 🌑",
    age: 16,
    title: "A Useful Session with Professor Daksh",
    hook: "Harshita’s scroll is about meeting new people, working across age groups and learning to speak boldly.",
    favourite: "Meeting new people.",
    lesson: "How to work with different age groups of people.",
    advice: "Be bold and confident, because this is the place where you can ask without hesitation.",
    tag: "Boldness",
  },
  {
    name: "Suhana Ruhul Mondal",
    house: "Astra 🌌",
    age: 15,
    title: "A Graduation Ceremony to Remember",
    hook: "Even during exams, Suhana carried the magic of the graduation ceremony and psychology conversations with her.",
    favourite: "Mostly all of it, but I really loved the graduation ceremony.",
    lesson: "A lot of things.",
    advice: "Be interactive, confident and curious. Do not feel shy asking questions.",
    tag: "Curiosity",
  },
  {
    name: "Saras Pramod Patil",
    house: "Luno 🌙",
    age: 13,
    title: "From Product to Prototype",
    hook: "Saras remembered the first session most: building websites through vibe coding and turning ideas into prototypes.",
    favourite: "The Sorting Ceremony.",
    lesson: "How to build confidence.",
    advice: "Try your best and be confident interacting with people.",
    tag: "Prototype",
  },
  {
    name: "Urvi Bhat",
    house: "Astra 🌌",
    age: 15,
    title: "The Silent Scholar Who Enjoyed Every Class",
    hook: "Urvi may have been quiet, but her reflection shows how much the sessions and public speaking lessons stayed with her.",
    favourite: "Sessions.",
    lesson: "Public speaking skills.",
    advice: "Take the fullest from the classes.",
    tag: "Voice",
  },
  {
    name: "Drishti Gupta",
    house: "Nova ⚡",
    age: 10,
    title: "AI, Communication, Coding and Entrepreneurship",
    hook: "Drishti loved the way professors explained concepts and made the castle feel fun while teaching serious skills.",
    favourite: "The way professors explained the concept and made it fun.",
    lesson: "To excel in AI, communication, coding and entrepreneurship.",
    advice: "It is the best experience you will ever get.",
    tag: "Leadership",
  },
  {
    name: "Anvita Bhardwaj",
    house: "Nyx 🌑",
    age: 13,
    title: "Communication Skills and a House Called Unity",
    hook: "Anvita’s scroll celebrates learning new things, communication skills and the power of engaging with great professors.",
    favourite: "Learning new things was my favourite part.",
    lesson: "Communication skills.",
    advice: "Join if you want to learn new things and engage with nice people and great professors.",
    tag: "Unity",
  },
  {
    name: "Nikita Dhull",
    house: "Nyx 🌑",
    age: 16,
    title: "The Conversation That Helped Her Speak Up",
    hook: "Nikita was inspired by Uddipa’s session, then found another turning point when Manik helped her speak through shyness.",
    favourite: "The last session when I talked to Manik sir and he helped me come out of my shyness.",
    lesson: "Build, think, confidence.",
    advice: "Just go for it. You are surely going to learn something new.",
    tag: "Courage",
  },
  {
    name: "Advika Mathur",
    house: "Astra 🌌",
    age: 10,
    title: "Making My Own App",
    hook: "Advika’s highlight was hands-on vibe coding: building something real and discovering the joy of inventing.",
    favourite: "Vibe coding and making my own app, being hands on.",
    lesson: "How to be a good inventor.",
    advice: "You get to interact with many cool people, some of them your age.",
    tag: "Inventor",
  },
  {
    name: "Isha Yanvi",
    house: "Astra 🌌",
    age: 11,
    title: "The First App, The First Friends",
    hook: "Isha remembered the first session because everyone met, learned and began making games and apps together.",
    favourite: "Meeting new friends.",
    lesson: "Making games and apps and learning new things about English.",
    advice: "Be happy to join, learn and keep trying even when something takes time to understand.",
    tag: "Joy",
  },
  {
    name: "P. John Antony",
    house: "Nyx 🌑",
    age: 17,
    title: "Looking Up to Great People",
    hook: "John found Professor Uddipa’s session on research and opportunities informative, and left with deep gratitude for the team.",
    favourite: "Manik Sir spent his valuable time to bring the professors to us.",
    lesson: "There are always great people we should look up to and strive to learn from.",
    advice: "Enjoy your time in hogwartz Summer School. It is a really good summer program.",
    tag: "Research",
  },
  {
    name: "Saransh Bhola",
    house: "Luno 🌙",
    age: 13,
    title: "Explore New AI Tools",
    hook: "Saransh’s reflection is short and direct: attend every session, explore new AI tools and keep the quiz energy alive.",
    favourite: "All activities.",
    lesson: "Explore new AI tools.",
    advice: "Attend every session.",
    tag: "AI Tools",
  },
];

function ScrollsPage() {
  return (
    <>
      <Starfield />
      <CursorWand />
      <SoundToggle />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 overflow-hidden pt-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[#090612] to-background" />
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-gold">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to the gates
          </Link>

          <section className="mt-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">The Reflection Scrolls</p>
            <h1 className="font-display mt-3 text-4xl sm:text-6xl">
              <span className="shimmer-text">15 scholar stories</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/75 sm:text-base">
              Short blog scrolls shaped from our scholars&apos; own reflections: favourite moments, lessons learned and messages for the next class.
            </p>
          </section>

          <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SCROLLS.map((scroll, index) => (
              <motion.article
                key={scroll.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (index % 6) * 0.05 }}
                className="magic-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6"
              >
                <div className="absolute -right-6 -top-6 text-6xl opacity-10 transition group-hover:opacity-30">✦</div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Scroll {String(index + 1).padStart(2, "0")}</p>
                    <h2 className="font-display mt-3 text-2xl leading-tight text-gold">{scroll.title}</h2>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/35 bg-background/50 text-gold">
                    <ScrollText className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-foreground/78">{scroll.hook}</p>

                <div className="mt-5 rounded-2xl border border-[color:var(--gold)]/20 bg-background/45 p-4">
                  <Quote className="h-4 w-4 text-gold" />
                  <p className="mt-2 text-sm italic leading-6 text-foreground/85">“{scroll.advice}”</p>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <p><span className="text-gold">Favourite spell:</span> <span className="text-foreground/78">{scroll.favourite}</span></p>
                  <p><span className="text-gold">What it taught:</span> <span className="text-foreground/78">{scroll.lesson}</span></p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-foreground/60">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/30 px-3 py-1">
                      <Sparkles className="h-3 w-3 text-gold" /> {scroll.tag}
                    </span>
                    <span>{scroll.name}</span>
                    <span>{scroll.house}</span>
                    <span>Age {scroll.age}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}