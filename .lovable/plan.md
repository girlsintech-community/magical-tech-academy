## Hogwarts: A Magical Virtual Tech Summer School — Landing Page

A cinematic, story-driven landing page for a 2-week magical tech summer school by Girls Leading Tech.

### Brand & details
- **Program:** Hogwarts: A Magical Virtual Tech Summer School
- **Dates:** 7 June 2026 – 21 June 2026 (free)
- **Audience:** Students 8–18 across India
- **Cohort cap:** **200 total — 150 girls + 50 boys** (gender-based seats; auto-close when full)
- **Contact:** girlsleadingtech@gmail.com

---

### 1. Cinematic Storyline Intro (skippable)

A full-screen game-style opening before the site loads.

- **Background:** royalty-free magical castle / starry-sky video loop, served at the highest quality the browser supports
- **Background music:** original Harry-Potter-inspired orchestral track (ElevenLabs Music — we cannot legally embed YouTube)
- **Voiceover:** ElevenLabs TTS narrator with on-screen subtitles
- **Story beats** (auto-advance, click to skip ahead):
  1. *"In a world where magic meets code…"*
  2. *"You've been chosen to apply to a 14-day journey at the Magical Virtual Tech Summer School."*
  3. *"Only 200 young witches, wizards and builders will be admitted this year."*
  4. *"Four houses await — each with its own gift."* (crests fade in)
  5. *"But first, you must prove your spark. Apply, complete your task, then receive your invitation."*
- **Always-visible controls:** Skip Intro · Mute · Subtitles toggle
- Intro state remembered in localStorage; "Replay Intro" button on the main page

---

### 2. Three-Stage Admission Flow (the new heart of the site)

Every student goes through 3 magical stages before they're officially in:

```text
Stage 1: APPLY            Stage 2: THE TASK              Stage 3: INVITATION
─────────────────         ──────────────────────         ─────────────────────
Application form    →     "Why do you want to join?"  →  Official Hogwarts
(profile + parent)        (short written response,       acceptance letter
                          reviewed by admin)             (emailed + on-screen)
```

**Stage 1 — Application Form** ("Send your owl")
- Fields: Full name, Age (8–18), Gender (girl / boy / prefer not to say), City, Email, Parent/Guardian email, School, Grade, Why this program interests you (1 line)
- On submit:
  - Check seat availability (girls < 150, boys < 50). If full → friendly "The hall is full this year — join the waitlist" screen
  - Save as `status: applied`
  - Show animated "Your owl is on its way 🦉" confirmation
  - Send confirmation email via Lovable transactional email

**Stage 2 — The Task** ("Prove your spark")
- Triggered when admin marks an application as `task_invited`
- Student receives an email with a magic link to a personal task page
- Task page asks: *"Why do you want to join Hogwarts: A Magical Virtual Tech Summer School?"*
  - 150–500 word written response
  - Optional: link to anything they've made (project, drawing, video, GitHub, anything)
- On submit → `status: task_submitted`, confirmation email sent

**Stage 3 — Official Hogwarts Invitation**
- When admin approves → `status: accepted`
- Student receives a beautifully designed acceptance email styled like a Hogwarts letter (wax-seal vibe, parchment colors, Girls Leading Tech crest, program dates, what's next)
- They can also view their letter on-site via their magic link, with confetti + sparkle animation and house assignment reveal

**Lightweight admin dashboard** (password-protected route `/admin`)
- Table of applications with filters by status and gender
- One-click actions: *Invite to Task*, *Accept*, *Reject*, *Waitlist*
- Live seat counter: `Girls 47/150 · Boys 12/50`
- Each action triggers the matching email automatically

---

### 3. Main Landing Page (after intro)

Dark, glowing, sparkling. Floating embers, parallax stars, cursor wand-trail, persistent music toggle.

1. **Hero — The Invitation**
   - Animated parchment unfolds: *"You've been invited to apply to a secret tech summer school"*
   - **Live seat counter:** *"47 / 150 girls · 12 / 50 boys admitted"*
   - CTAs: **Apply Now** · **Become a Mentor** · **Replay Intro**

2. **How You Get In — the 3-stage journey** (animated step cards: Apply → Task → Invitation)

3. **The Four Houses** — Fireforge · Brightmind · Codecraft · Sparkroot (interactive flip cards)

4. **Your 14-Day Journey** — animated timeline (Learn → Build → Showcase)

5. **What You'll Learn** — AI · Design · No-Code · Creativity

6. **Roles** — Explorer → House Captain → Mentor

7. **Project Showcase** — magical-framed example projects

8. **Demo Day countdown** — to 21 June 2026

9. **Whispers from Past Students** — testimonials

10. **Apply (Stage 1 form)** — embedded with seat availability check

11. **Become a Mentor** — name, email, profession, LinkedIn/portfolio, expertise areas, why you want to mentor

12. **Footer** — girlsleadingtech@gmail.com, Girls Leading Tech credit

---

### Interactive magic layer (site-wide)
- Cursor wand-trail with sparkles
- Parallax starfield + drifting embers
- Scroll-triggered section reveals
- 3D tilt on house cards
- Persistent sound toggle (music + voice)
- Live seat counter updates from real applications

---

### Data & emails (technical section)

**Tables (Lovable Cloud):**
- `student_applications` — all profile fields + `status` (applied / task_invited / task_submitted / accepted / rejected / waitlisted) + `gender` + `task_response` + `task_link` + `house` + `magic_token` (for personal task/letter URLs)
- `mentor_applications`
- `admin_users` — via user_roles pattern (separate table, never on profiles)

**Seat enforcement:** server function checks counts inside a transaction before inserting. Hard cap: 150 girls, 50 boys. Anything beyond → `waitlisted`.

**RLS:**
- Public can `INSERT` applications and read their own row only via `magic_token`
- No public `SELECT` of personal data
- Aggregate seat counts exposed via a security-definer function (returns just the numbers)
- Admin actions gated by `has_role(auth.uid(), 'admin')`

**Validation:** zod on both client and server (name/email lengths, age 8–18, word counts on task response).

**Emails (Lovable transactional email):**
- `application-received` — sent on Stage 1 submit
- `task-invitation` — sent when admin invites to task (includes magic link)
- `task-received` — sent on Stage 2 submit
- `hogwarts-acceptance` — the official invitation letter (parchment styling)
- `application-update` — for waitlist / not-selected (kind, encouraging)

**Audio/video assets:**
- Background ambient video: royalty-free magical loop (Pexels)
- Music: ElevenLabs Music original orchestral track
- Narration: ElevenLabs TTS, with subtitles

---

### Out of scope for v1
- Public leaderboard of accepted students (privacy)
- Real-time chat / Discord integration
- Payment / certificates

---

Approve and I'll build the cinematic intro, the full landing page, the 3-stage admission flow, the seat-capped database, the magic-link task & letter pages, the admin dashboard, and all 5 transactional emails in one go.