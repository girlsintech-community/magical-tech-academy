import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "./HousesSection";

const FAQS = [
  {
    question: "Are applications still open?",
    answer: "Applications are now closed. We received applications until 14 June 2026 and are grateful to every young builder who sent us their owl.",
  },
  {
    question: "When does hogwartz take place?",
    answer: "The 14-day virtual summer school runs from 14 June to 28 June 2026.",
  },
  {
    question: "Who is hogwartz for?",
    answer: "The programme is designed for curious students aged 8–18 from across India who want to build with technology and imagination.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <SectionHeader
          eyebrow="The Restricted Section"
          title="Frequently asked questions"
          subtitle="Answers carried straight from the Headmistress’s desk."
        />
        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-[color:var(--gold)]/25">
              <AccordionTrigger className="text-left font-display text-lg text-foreground hover:text-gold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-foreground/70">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}