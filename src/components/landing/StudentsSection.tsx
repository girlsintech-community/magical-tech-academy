import { motion } from "framer-motion";
import { Linkedin, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/landing/HousesSection";
import aaravAsset from "@/assets/student-aarav_dua.jpg.asset.json";
import urviAsset from "@/assets/student-urvi.jpg.asset.json";
import shaistaAsset from "@/assets/student-shaista.jpeg.asset.json";
import abhaAsset from "@/assets/student-abha.jpg.asset.json";
import ishaAsset from "@/assets/student-isha.jpeg.asset.json";
import drishtiAsset from "@/assets/student-drishti_gupta.jpg.asset.json";

const PHOTOS: Record<string, string> = {
  "Aarav Dua": aaravAsset.url,
  "Urvi Bhat": urviAsset.url,
  "Shaista Kalra": shaistaAsset.url,
  "Abha Chiney": abhaAsset.url,
  "S. A. Isha Yanvi": ishaAsset.url,
  "Drishti Gupta": drishtiAsset.url,
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STUDENTS.map((s, i) => {
            const color = HOUSE_COLORS[i % HOUSE_COLORS.length];
            const Card: any = s.linkedin ? "a" : "div";
            const linkProps = s.linkedin
              ? { href: s.linkedin, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <motion.div
                key={s.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              >
                <Card
                  {...linkProps}
                  className="magic-card group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl p-4"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] opacity-70"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />
                  <div
                    className="relative grid h-16 w-16 shrink-0 overflow-hidden place-items-center rounded-xl font-display text-2xl"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${color}55, transparent 70%), rgba(255,255,255,0.04)`,
                      border: `1px solid ${color}66`,
                      color,
                      textShadow: `0 0 12px ${color}88`,
                    }}
                  >
                    {PHOTOS[s.name] ? (
                      <img src={PHOTOS[s.name]} alt={s.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      monogram(s.name)
                    )}
                    <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-gold opacity-70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg leading-tight text-foreground">
                      {s.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold/80">
                      {s.age ? `Year ${s.age}` : ""}
                      {s.age && s.gender ? " , " : ""}
                      {s.gender}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-foreground/70">
                      <MapPin className="h-3 w-3 shrink-0" /> {s.location}
                    </p>
                    <p className="mt-1 flex items-start gap-1 text-[11px] text-muted-foreground">
                      <GraduationCap className="mt-0.5 h-3 w-3 shrink-0" />
                      <span className="line-clamp-2">{s.school}</span>
                    </p>
                    {s.linkedin && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-gold opacity-80 transition group-hover:translate-x-0.5">
                        <Linkedin className="h-3 w-3" /> View scroll
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
