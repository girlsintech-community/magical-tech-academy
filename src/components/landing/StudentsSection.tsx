import { motion } from "framer-motion";
import { Linkedin, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/landing/HousesSection";
import aaravAsset from "@/assets/student-aarav_dua.jpg.asset.json";
import urviAsset from "@/assets/student-urvi.jpg.asset.json";
import shaistaAsset from "@/assets/student-shaista.jpeg.asset.json";
import abhaAsset from "@/assets/student-abha.jpg.asset.json";
import ishaAsset from "@/assets/student-isha.jpeg.asset.json";
import drishtiAsset from "@/assets/student-drishti_gupta.jpg.asset.json";
import riddhishAsset from "@/assets/student-riddhish_singh.jpg.asset.json";
import hariniAsset from "@/assets/student-harini.jpg.asset.json";
import advikaAsset from "@/assets/student-advika_mathur.jpg.asset.json";
import evinAsset from "@/assets/student-evin_jason.jpeg.asset.json";
import urmiAsset from "@/assets/student-urmi.jpeg.asset.json";
import devanshiAsset from "@/assets/student-devanshi.jpg.asset.json";
import anvitaAsset from "@/assets/student-anvita.png.asset.json";
import harshitaAsset from "@/assets/student-harshita.jpg.asset.json";
import ericAsset from "@/assets/student-eric_jadon.jpg.asset.json";
import akshitaAsset from "@/assets/student-akshita_1.jpg.asset.json";
import suhanaAsset from "@/assets/student-suhana.jpg.asset.json";
import saranshAsset from "@/assets/student-saransh.png.asset.json";
import harshilAsset from "@/assets/student-harshil_vegad.jpg.asset.json";
import sarasAsset from "@/assets/student-saras_patil.jpg.asset.json";
import manideepAsset from "@/assets/student-manideep.jpg.asset.json";
import johnAsset from "@/assets/student-John_Antony.jpeg.asset.json";
import kavishaAsset from "@/assets/student-kavisha.jpg.asset.json";
import dakshikaAsset from "@/assets/student-dakshika.jpeg.asset.json";
import venkatAsset from "@/assets/student-venkat.png.asset.json";
import ayeshaAsset from "@/assets/student-ayesha.jpg.asset.json";
import nikitaAsset from "@/assets/student-nikita_dhull.jpg.asset.json";
import lavanyaAsset from "@/assets/student-lavanya.jpg.asset.json";

const PHOTOS: Record<string, string> = {
  "Aarav Dua": aaravAsset.url,
  "Urvi Bhat": urviAsset.url,
  "Shaista Kalra": shaistaAsset.url,
  "Abha Chiney": abhaAsset.url,
  "S. A. Isha Yanvi": ishaAsset.url,
  "Drishti Gupta": drishtiAsset.url,
  "Riddhish Singh": riddhishAsset.url,
  "Harini": hariniAsset.url,
  "Advika Mathur": advikaAsset.url,
  "Evin Jason P": evinAsset.url,
  "Urmi Agarwal": urmiAsset.url,
  "Devanshi Arora": devanshiAsset.url,
  "Anvita Bhardwaj": anvitaAsset.url,
  "Harshita Saharan": harshitaAsset.url,
  "Eric Jadon P": ericAsset.url,
  "Akshita B": akshitaAsset.url,
  "Suhana Mondal": suhanaAsset.url,
  "Saransh Bhola": saranshAsset.url,
  "Harshil Vegad": harshilAsset.url,
  "Saras Pramod Patil": sarasAsset.url,
  "Gogula Manideep": manideepAsset.url,
  "P. John Antony": johnAsset.url,
  "Kavisha Joshi": kavishaAsset.url,
  "Dakshika Gupta": dakshikaAsset.url,
  "Venkata Sai Chebolu": venkatAsset.url,
  "Ayesha Arif Khan": ayeshaAsset.url,
};

type Student = {
  name: string;
  location: string;
  age: number | null;
  gender: string;
  linkedin: string | null;
  school: string;
};

const STUDENTS: Student[] = [
  { name: "Evin Jason P", location: "Nagercoil, Tamilnadu", age: 9, gender: "Boy", linkedin: null, school: "Arunachala World School" },
  { name: "Advika Mathur", location: "Jodhpur, Rajasthan", age: 10, gender: "Girl", linkedin: null, school: "Delhi Public School, Pal Road" },
  { name: "Drishti Gupta", location: "Tamil Nadu", age: 10, gender: "Girl", linkedin: null, school: "Arunachala World School, Nagercoil" },
  { name: "Harini", location: "Bangalore, Karnataka", age: 11, gender: "Girl", linkedin: null, school: "Bangalore International Academy" },
  { name: "S. A. Isha Yanvi", location: "Tamilnadu", age: 11, gender: "Girl", linkedin: null, school: "Arunachala's World School" },
  { name: "Riddhish Singh", location: "Ludhiana, Punjab", age: 11, gender: "Boy", linkedin: "https://www.linkedin.com/in/riddhish-singh-075324368/", school: "DCM Young Entrepreneurs School" },
  { name: "Urmi Agarwal", location: "Mumbai, Maharashtra", age: 12, gender: "Girl", linkedin: null, school: "Kendriya Vidyalaya Bhandup" },
  { name: "Akshita B", location: "Chennai", age: 12, gender: "Girl", linkedin: null, school: "Srimathi Sundaravalli Memorial School" },
  { name: "Eric Jadon P", location: "Nagercoil, Tamilnadu", age: 12, gender: "Boy", linkedin: null, school: "Arunachala World School" },
  { name: "Saras Pramod Patil", location: "Ahilyanagar, Maharashtra", age: 13, gender: "Boy", linkedin: "https://www.instagram.com/itz.saras11", school: "Orchids The International School" },
  { name: "Anvita Bhardwaj", location: "Chandigarh", age: 13, gender: "Girl", linkedin: null, school: "Saupin's School, Chandigarh" },
  { name: "Harshil Vegad", location: "Mumbai, Maharashtra", age: 13, gender: "Boy", linkedin: "https://www.instagram.com/harshilvegad18", school: "St. Francis D'Assisi High School" },
  { name: "Devanshi Arora", location: "Delhi", age: 13, gender: "Girl", linkedin: null, school: "Springdales School, Dhaula Kuan" },
  { name: "Saransh Bhola", location: "Ambala", age: 13, gender: "Boy", linkedin: "https://www.instagram.com/creative_singer_studio/", school: "Radha Lal Geeta Vidya Mandir" },
  { name: "Aarav Dua", location: "Panipat, Haryana", age: 14, gender: "Boy", linkedin: null, school: "St. Mary's Convent Sr Sec School" },
  { name: "Urvi Bhat", location: "Bengaluru, Karnataka", age: 15, gender: "Girl", linkedin: null, school: "Jnanodaya School" },
  { name: "Suhana Mondal", location: "Navi Mumbai", age: 15, gender: "Girl", linkedin: null, school: "MNR School of Excellence" },
  { name: "Kavisha Joshi", location: "Bhopal, Madhya Pradesh", age: 16, gender: "Girl", linkedin: null, school: "The Ivy Global School" },
  { name: "Harshita Saharan", location: "Bangalore, Karnataka", age: 16, gender: "Girl", linkedin: "https://www.linkedin.com/in/harshita-saharan-a14368377", school: "Global Indian International School, Whitefield" },
  { name: "P. John Antony", location: "Hyderabad, Telangana", age: 17, gender: "Boy", linkedin: "https://www.linkedin.com/in/john-antony-2006503a6/", school: "Narayana Junior College" },
  { name: "Gogula Manideep", location: "Telangana", age: 17, gender: "Boy", linkedin: "https://www.instagram.com/_manideep_gogula_778", school: "Alphores Junior College" },
  { name: "Shaista Kalra", location: "New Delhi", age: 17, gender: "Girl", linkedin: null, school: "Vasant Valley" },
  { name: "Ayesha Arif Khan", location: "Mumbai, Maharashtra", age: 17, gender: "Girl", linkedin: "https://www.instagram.com/crepusculo_moon02", school: "M. H. Saboo Siddik College of Engineering" },
  { name: "Venkata Sai Chebolu", location: "Vishakhapatnam, Andhra Pradesh", age: 17, gender: "Boy", linkedin: null, school: "GICE" },
  { name: "Dakshika Gupta", location: "Jaipur, Rajasthan", age: 17, gender: "Girl", linkedin: "https://www.instagram.com/duckshika", school: "Tilak Public School, Triveni Nagar" },
  { name: "Lavanya Anand", location: "Delhi NCR", age: 18, gender: "Girl", linkedin: null, school: "Ursuline Convent Senior Secondary School" },
  { name: "Abha Chiney", location: "Amravati, Maharashtra", age: 18, gender: "Girl", linkedin: null, school: "Narayana Vidyalam" },
  { name: "Nikita Dhull", location: "Panchkula, Haryana", age: 18, gender: "Girl", linkedin: null, school: "P. M. L. S. D. Public School, Sec 32" },
];

const HOUSE_COLORS = ["#c69749", "#7a5cff", "#e75a5a", "#4ea38a"];

function monogram(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export function StudentsSection() {
  return (
    <section id="students" className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[#0b0716] to-background" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="Class of 2026"
          title="Our young scholars"
          subtitle={`Meet the ${STUDENTS.length} witches and wizards, ages 9 to 18, from across India who answered the owl's call.`}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STUDENTS.map((s, i) => {
            const color = HOUSE_COLORS[i % HOUSE_COLORS.length];
            const Card: any = s.linkedin ? "a" : "div";
            const linkProps = s.linkedin
              ? { href: s.linkedin, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <motion.div
                key={s.name + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 6) * 0.05 }}
              >
                <Card
                  {...linkProps}
                  className="magic-card group relative flex h-full flex-col overflow-hidden rounded-3xl"
                >
                  <div
                    className="absolute inset-x-0 top-0 z-10 h-[2px] opacity-80"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />
                  <div className="absolute -right-6 -top-6 z-10 text-6xl opacity-10 transition group-hover:opacity-30">✦</div>

                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {PHOTOS[s.name] ? (
                      <img
                        src={PHOTOS[s.name]}
                        alt={s.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 30% 20%, ${color}44, transparent 65%), linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))`,
                        }}
                      >
                        <span
                          className="font-display text-8xl"
                          style={{ color, textShadow: `0 0 24px ${color}88` }}
                        >
                          {monogram(s.name)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent" />
                    <Sparkles className="absolute right-3 top-3 h-4 w-4 text-gold/80" />
                  </div>

                  <div className="flex flex-col gap-2 p-6">
                    <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color }}>
                      {s.age ? `Year ${s.age}` : "Scholar"}{s.age && s.gender ? " , " : ""}{s.gender}
                    </p>
                    <h3 className="font-display text-2xl text-gold">{s.name}</h3>
                    <p className="flex items-center gap-1.5 text-xs text-foreground/75">
                      <MapPin className="h-3 w-3 shrink-0" /> {s.location}
                    </p>
                    <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="mt-0.5 h-3 w-3 shrink-0" />
                      <span className="line-clamp-2">{s.school}</span>
                    </p>
                    {s.linkedin && (
                      <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 px-3 py-1.5 text-[11px] text-foreground/85 transition group-hover:border-[color:var(--gold)] group-hover:text-gold">
                        <Linkedin className="h-3.5 w-3.5" /> View scroll
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
