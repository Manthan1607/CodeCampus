# Build Prompt: CodeCampus — Full-Stack Coding Education Platform

## Vision

Build **CodeCampus**, a modern, full-stack coding education platform built on the
provided concept. This is not a demo, mockup, or portfolio piece — it is a
**production-grade edtech application** that could be shipped to real students,
mentors, recruiters, and admins today.

## Design Language

Create a **clean, professional, modern light UI**:

- No dark theme, no excessive gradients, no neon/glassmorphism effects, no
  generic "AI-generated" or "vibe-coded" aesthetic.
- The product should feel like a polished, well-funded startup: simple layout
  grids, strong typographic hierarchy, consistent 8px spacing scale, restrained
  motion/micro-interactions, and excellent baseline usability (WCAG AA
  contrast, keyboard navigation, focus states).
- Establish a real design system: color tokens, typography scale, spacing
  scale, elevation/shadow scale, and a reusable component library (buttons,
  inputs, modals, tables, cards, toasts, tabs, badges) — not one-off styled
  elements per page.
- Support both desktop and mobile breakpoints with a true responsive layout,
  not just scaled-down desktop views.

## Core Features (with expected depth)

### 1. Roles & Dashboards
- **Student**: enrolled courses, progress tracking, XP/streak widgets, active
  battles, recent submissions.
- **Mentor**: assigned mentees, live session scheduling, review queue for
  student submissions.
- **Recruiter**: talent search, saved candidates, shortlists, outreach status.
- **Admin**: user management, content management, platform analytics,
  moderation queue.
- Each dashboard must reflect **real data from the database**, scoped by role
  and permissions — not shared mock data across roles.

### 2. Authentication & Authorization
- Email/password auth plus OAuth (Google/GitHub) using a real provider
  (e.g., NextAuth/Auth.js).
- Role-based access control (RBAC) enforced both on the API layer and in the
  UI (route guards, not just hidden buttons).
- Session handling with secure, httpOnly cookies; refresh token rotation;
  password hashing (bcrypt/argon2); rate-limited login attempts.
- Email verification and password reset flows that actually send email
  (or a realistic dev-mode email preview).

### 3. Interactive Coding IDE
- Monaco Editor integration with language-aware syntax highlighting,
  IntelliSense where available, and per-problem starter code.
- Multi-tab file support for problems requiring more than one file.
- Persist in-progress code per user/problem (autosave + explicit save).

### 4. Code Execution Engine
- Real code execution for **C++, Python, and JavaScript** via Judge0
  (self-hosted or API-based).
- Submission pipeline: queue → execute in sandbox → capture stdout/stderr/exit
  code → compare against test cases → return verdict (Accepted, Wrong Answer,
  TLE, Runtime Error, Compile Error).
- Handle execution timeouts, memory limits, and concurrent submission load
  gracefully (queue with Redis, not synchronous blocking calls).
- Store submission history per user per problem with diffing/version view.

### 5. DSA Learning Module
- Structured curriculum: topics → subtopics → problems, with prerequisite
  gating.
- Interactive visualizations for core data structures/algorithms (e.g.,
  array/pointer manipulation, tree traversal, graph BFS/DFS, sorting) built
  as real animated components, not static GIFs.
- Theory, Video, Practice, and Quiz modes per topic, each backed by real
  content records in the database and real progress tracking.

### 6. AI Tutor
- Conversational AI tutor for explanations, hints, and debugging assistance,
  integrated via a real LLM API call (server-side, with the API key kept out
  of the client).
- Context-aware: the tutor should receive the student's current
  problem/code/error as context, not operate as a generic chatbot.
- Rate-limit and log AI usage per user; handle API failures gracefully with
  clear UI fallback states (not silent failure).

### 7. Live Mentorship & Real-Time Chat
- Real-time chat using Socket.io, with persisted message history in
  PostgreSQL.
- Session scheduling with calendar/availability logic (timezone-aware).
- Presence indicators (online/offline/typing) driven by actual socket
  connections, not hardcoded.

### 8. 1v1 Coding Battles & Leaderboards
- Real-time matchmaking and live battle state sync via Socket.io.
- Server-authoritative scoring (client cannot self-report a win).
- Leaderboards computed from real submission/battle data, paginated and
  cached (Redis) for performance, with global and time-windowed (weekly/
  monthly) views.

### 9. Gamification
- XP, streaks, badges, and achievements driven by real triggering events
  (submission accepted, daily login, battle won, course completed) — not
  decorative static numbers.
- Streak logic must correctly handle timezones and "freeze"/grace-day rules
  if included.

### 10. Projects, Certificates, Portfolios & College Rankings
- Project submission and review workflow.
- Certificate generation (real PDF generation, e.g., via a library, not a
  static image swap) tied to actual course/track completion.
- Public student portfolio pages assembled from real profile, project, and
  achievement data.
- College/institution rankings aggregated from real student performance data.

### 11. Recruiter Talent Search
- Filterable, paginated search across student profiles (skills, DSA rating,
  projects, location, availability) backed by real indexed database queries
  — not client-side filtering of a small mock array.
- Candidate shortlisting and status tracking persisted per recruiter.

### 12. Learning Reels
- A short-form vertical video feed (reels-style) dedicated to bite-sized
  coding/DSA explanations, scoped to a small, well-defined slice — not a
  general social feed.
- **Upload flow**: users (students/mentors, gated by role) can upload short
  videos (e.g., ≤60–90s) with a title, topic/tag, and optional linked
  problem/course. Store the file in real object storage (e.g., S3-compatible
  bucket or local disk in dev), with a database record for metadata, owner,
  status (processing/published), and view/like counts.
- **Existing reels feed**: a scrollable/swipeable feed of published reels,
  filterable by topic/tag, paginated from real data (no hardcoded video
  array). Each reel plays inline with basic controls (play/pause, mute,
  progress).
- **AI-assisted explanation** (the core differentiator): after upload, call
  an AI/LLM pipeline server-side to generate a text explanation/summary and
  captions for the reel:
  - Transcribe the audio track (e.g., speech-to-text) if the video has
    narration.
  - Generate a structured written explanation (key concept, step-by-step
    breakdown, related DSA topic) from the transcript, displayed alongside
    the video as an expandable panel — not a decorative caption.
  - Auto-generate tags/topic classification so the reel is discoverable in
    the feed filters, rather than relying only on manual tagging.
  - Handle processing asynchronously (queue the AI job, show a
    "processing" status on the reel until it completes) so uploads don't
    block on AI latency.
- Likes/views/comments on reels persisted per user, with the same
  validation/auth/rate-limiting standards as the rest of the platform.
- Moderation hook for Admin: flagged reels go into the existing admin
  moderation queue rather than a separate ad hoc system.

### 13. Notifications & Progress Analytics
- Real notification system (in-app, with unread state) triggered by real
  events (submission graded, mentor message, battle invite, etc.), delivered
  via Socket.io and persisted for retrieval on reload.
- Analytics dashboards (progress over time, topic mastery, submission
  success rate) computed from real historical submission data, rendered with
  a real charting library.

## Technical Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js / NestJS (or Express, if simpler is justified) +
  TypeScript
- **Database**: PostgreSQL, accessed via Prisma ORM with proper schema
  migrations
- **Real-time**: Socket.io for chat, battles, presence, and notifications
- **Caching/Queues**: Redis for leaderboard caching, session/rate-limit
  state, and execution job queuing
- **Code Execution**: Judge0 (self-hosted via Docker or API)
- **Auth**: NextAuth/Auth.js or equivalent, with RBAC middleware

## Architecture & Engineering Standards

1. **No fake functionality of any kind.**
   Do not create fake buttons, dummy interactions, static dashboards, or
   visual-only features. **Every visible feature must work end-to-end.**

2. **Connect the complete data flow for every feature:**
   `UI → API → Database → Real-time services (where applicable) → User feedback`
   A feature is not "done" if any link in that chain is stubbed out.

3. **Realistic seed data.**
   Use seed scripts to populate realistic data (users, problems, submissions,
   courses) where necessary for the app to feel alive, but keep seed data
   **clearly separate from application logic** — no logic branches that only
   work because of hardcoded seed values.

4. **Clean architecture.**
   - Layered structure (controllers/routes → services → data access), not
     business logic embedded in route handlers or React components.
   - Reusable, composable components on the frontend; no copy-pasted UI
     blocks across pages.
   - Centralized API client with typed request/response contracts (shared
     types between frontend and backend where feasible).

5. **Validation & error handling.**
   - Input validation on every API endpoint (e.g., Zod/class-validator),
     not just client-side form checks.
   - Consistent error response shape and proper HTTP status codes.
   - User-facing error states for every async operation (loading, error,
     empty, success) — no silent failures or infinite spinners.

6. **Authentication & authorization enforced server-side**, on every
   protected route and socket event, not assumed from client state.

7. **Responsive design** verified across mobile and desktop breakpoints for
   every screen, including the IDE, chat, and dashboards.

## UI Polish & Hero Header (Refinement Pass)

This applies to the **existing, already-built** CodeCampus app — this is a
polish/refinement pass, not a rebuild. Do not touch working backend logic;
scope changes to styling, layout, and the new header component.

### Landing/Hero Section
Design a bold, **editorial/cinematic-style hero section** for the landing
page — inspired by movie-poster layouts, not a generic SaaS hero with a
centered headline and stock illustration.

**Layout:**
- Asymmetric split composition: one side holds a massive, oversized headline
  (product name / core value prop) in a heavy, condensed, all-caps display
  font that dominates the section — the typography itself is the hero
  visual.
- The other side (or overlapping the headline) holds a large cutout
  illustration, 3D object, or mascot bleeding off the edge of the frame,
  layered *in front of* the headline text so the two interlock rather than
  sit in separate boxes.
- Thin top navbar: logo/wordmark on the left, small-caps nav links separated
  by dots in the center, 1–2 circular icon buttons on the right (search,
  menu/profile).
- A rotating/curved badge or seal element near the hero visual — a small
  circular text-on-a-path element (e.g., "Start Learning," a status stamp)
  for visual interest.
- Below the headline: a horizontal row of small credential/meta labels in
  uppercase, letter-spaced type, mimicking a cast/credits line (e.g.,
  "10K+ Students," "500+ Mentors," "50K+ Submissions Judged").
- One strong primary CTA (pill or sharp-cornered button), paired with a
  secondary circular icon button (e.g., a "preview/play" style button that
  scrolls to a demo).
- A subtle marquee/ticker strip (scrolling feature or topic names — DSA,
  System Design, AI Tutor, Battles, etc.) along one edge for texture.

**Typography:**
- One dramatic, oversized display typeface for the hero phrase (condensed,
  bold, tight letter-spacing) — reserved for this moment, not reused
  elsewhere at this scale.
- A clean uppercase sans for nav, labels, and meta info, generously
  letter-spaced.
- Strong size contrast between hero type and supporting text — no
  mid-sized filler text competing for attention.

**Color, adapted to our light theme:**
- Light neutral background, near-black/charcoal text for the headline, and a
  single confident accent color (the platform's primary brand color) used
  sparingly — for the CTA, the badge seal, and one or two accent shapes —
  rather than as a dark background wash.
- Keep contrast crisp and editorial: dark text on off-white/white, accent
  color as punctuation, not fill. This is the light-theme translation of a
  poster-style dark hero, not a literal dark import.

**Motion:**
- Subtle parallax/depth on scroll (headline and hero visual moving at
  slightly different speeds), a slow hover-tilt on the hero image, and a
  gentle marquee scroll — restrained, not flashy. Respect
  `prefers-reduced-motion`.
- The hero visual/badge can carry the "3D-look" animated effect described
  below; the two should read as one cohesive header, not separate add-ons.

**Feel:** confident, high-contrast, editorial/cinematic — the headline and
hero visual should feel art-directed for CodeCampus specifically, not
assembled from generic hero-section defaults.

### "Less Vibe-Coded" Direction
To avoid the generic AI-generated look, apply real design discipline:
- **No purple/blue gradient-on-dark clichés**, no default glassmorphism
  cards, no generic "glow" effects, no stock hero illustrations.
- Pick a deliberate, narrow color palette (1 primary, 1 accent, a neutral
  gray scale) and a real typographic pairing (e.g., a distinctive
  display/heading font + a clean body font) — not default system fonts with
  default weights everywhere.
- Use intentional whitespace and a clear grid — avoid centering everything
  with no asymmetry or hierarchy.
- Micro-interactions (button hovers, card lifts, input focus states) should
  be consistent across the whole app, defined once in the design system/
  component library, not re-implemented ad hoc per page.
- Every screen should look like it was designed with intent for *this*
  product, not generated from a generic template.

### Light Theme
- Convert/confirm the entire app (not just the header) to a **clean light
  theme**: light neutral backgrounds, dark text for contrast (WCAG AA
  minimum), and color used sparingly for emphasis (primary actions, status
  badges, charts) rather than as background fills.
- Remove any remaining dark-theme defaults, dark cards on light pages, or
  inconsistent theming between sections/dashboards.
- If a dark mode toggle already exists, light must be the **default** and
  the more thoroughly polished of the two — but the priority for this pass
  is a fully consistent light theme across every existing page (dashboards,
  IDE, chat, reels feed, profiles, etc.), not just new pages.

## Figma UI/UX Prompt — Storytelling Design System (All Pages)

Use this as a standalone brief for designing CodeCampus in Figma. The goal is
a **narrative, storytelling-driven UI/UX** — every page should read like a
sequence in a story (problem → journey → payoff), not a flat stack of
disconnected sections. Cool, purposeful animation should feel native to the
brand, not bolted on.

### Overall Direction
- Design the **entire product as a connected story**: landing page = the
  "pitch," onboarding = the "invitation," dashboards = the "world," IDE/
  battles/reels = the "action," profile/certificates = the "payoff."
  Maintain consistent visual motifs (shapes, iconography, color accents)
  that recur across this journey so the product feels like one narrative,
  not separate screens stitched together.
- Editorial/cinematic tone (per the hero direction already defined): bold
  oversized typography, asymmetric layouts, confident whitespace, one
  accent color used as punctuation — light theme throughout.
- Every page should open with a clear "scene-setting" moment (a headline +
  visual) before revealing supporting content, mimicking how a story
  reveals context before detail.

### Pages/Frames to Design
1. **Header/Navbar** (persistent component)
   - Logo, small-caps nav links, icon buttons, and a subtle state change on
     scroll (e.g., shrinks/adds shadow) — design both default and
     scrolled states as separate variants.
   - Mobile variant: collapses into a full-screen animated menu overlay
     (design the open/closed states + transition notes).

2. **Landing Page**
   - Hero section (editorial/cinematic, per existing hero spec): oversized
     headline, large cutout visual, credential ticker row, primary CTA.
   - "Story beats" as you scroll: Problem (why learning to code is hard) →
     Solution (CodeCampus's approach) → Features showcase (IDE, AI Tutor,
     Battles, Reels — each as its own mini scene with a supporting visual)
     → Social proof (testimonials/college rankings) → Final CTA section.
   - Design each feature "beat" with a consistent card/section template so
     the rhythm feels intentional, not random.

3. **Auth Pages** (Sign up / Log in / Forgot password)
   - Split-screen layout: form on one side, an illustrative/animated brand
     moment on the other (continuing the story visually, not just a plain
     form page).

4. **Onboarding Flow** (role selection, interest/skill selection, welcome)
   - Multi-step, progress-indicated flow with a distinct animated
     transition between steps (design as Figma prototype flows with Smart
     Animate between frames).

5. **Student / Mentor / Recruiter / Admin Dashboards**
   - Each with a distinct but visually related layout (shared component
     library, role-specific emphasis): widgets, progress rings, activity
     feed, quick actions.

6. **Coding IDE Screen**
   - Editor + problem panel + AI Tutor side panel + run/submit states
     (idle, running, success, error) as separate frames/variants.

7. **DSA Learning Module**
   - Topic map/roadmap view (visual, node-based progression — a literal
     "path" reinforcing the storytelling metaphor), topic detail page with
     Theory/Video/Practice/Quiz tabs.

8. **Battles & Leaderboard**
   - Matchmaking/waiting state, live battle screen, results/victory screen
     (design a celebratory micro-animation moment for wins — confetti,
     rank-up reveal, etc.).

9. **Learning Reels Feed**
   - Vertical swipeable feed frame, individual reel detail with AI
     explanation panel, upload flow.

10. **Profile / Portfolio / Certificates**
    - Public portfolio page (the "payoff" screen — should feel like a
      showcase/trophy moment), certificate design, achievements/badges grid.

11. **Recruiter Talent Search**
    - Filter sidebar + candidate grid/list, candidate detail panel.

12. **Notifications & Analytics**
    - Notification center (dropdown + full page), analytics dashboard with
      chart components.

### Animation & Interaction Notes (for Figma prototyping)
- Use **Smart Animate** between key states/frames to simulate: hero
  scroll-parallax, card hover-lift, page-to-page transitions in onboarding,
  tab switches (underline slide), and the battle victory reveal.
- Define a small set of reusable motion patterns (fade+rise for content
  entering on scroll, scale+shadow for hover, slide for tab/step changes)
  and apply them consistently rather than inventing new motion per screen.
- Annotate each animated moment with intended easing and duration (e.g.,
  "300ms ease-out, rise 12px + fade") so it translates cleanly to
  development handoff.
- Keep motion purposeful: it should reinforce the story beat (reveal,
  reward, transition) — never decorative movement with no narrative role.

### Deliverables
- A Figma file with: a documented design system page (colors, type scale,
  spacing, components), all page frames listed above at desktop + mobile
  breakpoints, interactive prototype links connecting the storytelling flow
  end-to-end, and annotations for animation/motion handoff.

## Build Process

- Build **feature-by-feature**, in the order listed above (or a justified
  reordering), completing each feature's full stack (DB schema → API →
  UI → real-time layer, as applicable) before moving to the next.
- After each feature, **test it manually against realistic scenarios** and
  fix errors immediately — do not leave TODOs, placeholder components, or
  "// implement later" comments in the codebase.
- Prefer incremental, verifiable progress over broad scaffolding that looks
  complete but doesn't function.

## Definition of Done

The final result should look and behave like a **real, production-ready
edtech startup product** — not an AI-generated prototype. Every feature
listed above should be clickable, functional, and backed by real data and
real logic, with a UI polished enough to demo to investors or onboard real
users.