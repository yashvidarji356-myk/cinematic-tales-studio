import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { FadeIn, Reveal, Eyebrow, Parallax, SplitText } from "@/components/motion-primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshar Foshan — Cinematic Hospitality FF&E" },
      { name: "description", content: "Complete hotel furniture solutions, told as cinematic stories of craft, brand and place." },
      { property: "og:title", content: "Akshar Foshan — Cinematic Hospitality FF&E" },
      { property: "og:description", content: "Casegoods, upholstery, lighting and bespoke FF&E for hospitality projects worldwide." },
      { property: "og:image", content: PROJECTS[1].url },
    ],
  }),
  component: Home,
});

const SCOPES = [
  "Hotel Furniture", "Casegoods", "Upholstery", "Lighting & Mirrors",
  "Bathroom Accessories", "Outdoor Furniture", "Project Coordination", "FOB / DDP Logistics",
];

const STORY = [
  { kicker: "Act I", title: "Brief", body: "We translate brand standards, brief decks and floor plans into FF&E reality — across casegoods, upholstery, lighting and bath." },
  { kicker: "Act II", title: "Craft", body: "Our Foshan workshops mill, upholster, finish and inspect every piece against the property's specification book." },
  { kicker: "Act III", title: "Deliver", body: "FOB or DDP, we orchestrate consolidation, documentation and on-site install with one accountable team." },
];

const STATS = [
  { v: "13+", l: "Cooperating facilities" },
  { v: "5+", l: "Years hospitality experience" },
  { v: "240", l: "Keys delivered in 21 days" },
  { v: "360°", l: "Full FF&E coverage" },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const hero = PROJECTS[1].url; // Hilton hotel exterior – cinematic
  const inset = PROJECTS[0].url;
  const inset2 = PROJECTS[4].url;

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      {/* Soft cream radial backdrop with animated glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.95_0.04_310/0.45),transparent_60%),radial-gradient(circle_at_80%_80%,oklch(0.93_0.07_80/0.4),transparent_60%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.4 0.18 305 / 0.25), transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-[460px] w-[460px] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.74 0.12 80 / 0.3), transparent 70%)", filter: "blur(50px)" }}
        animate={{ x: [0, -50, 0], y: [0, -60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-32">
        <div className="relative z-10">
          <Eyebrow>Hospitality FF&amp;E · Est. Foshan</Eyebrow>
          <h1 className="mt-6 text-balance font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95]">
            <span className="block overflow-hidden">
              <SplitText text="Furniture that" />
            </span>
            <span className="block overflow-hidden italic">
              <span className="text-shimmer">
                <SplitText text="tells the story" delay={0.35} />
              </span>
            </span>
            <span className="block overflow-hidden">
              <SplitText text="of a hotel." delay={0.8} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-7 max-w-xl text-pretty text-lg text-muted-foreground"
          >
            Akshar Foshan crafts complete hotel furniture solutions — casegoods, upholstery, lighting,
            mirrors, bathroom accessories — and orchestrates sourcing, QC and logistics for hospitality
            brands worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_20px_50px_-20px_rgba(58,26,74,0.7)]"
            >
              Open the portfolio
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-medium hover:border-foreground/50"
            >
              Start a project
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.12, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <dt className="font-display text-3xl text-foreground">{s.v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.l}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* Cinematic collage */}
        <motion.div style={{ y, scale, opacity }} className="relative grain mx-auto aspect-[4/5] w-full max-w-[560px]">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.2 }}
            className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(58,26,74,0.45)]"
          >
            <img src={hero} alt="Featured hospitality property" className="kenburns h-full w-full object-cover" />
            <div className="vignette absolute inset-0" />
            {/* shimmering edge highlight */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-700 hover:opacity-100" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="absolute -left-6 top-8 w-44 overflow-hidden rounded-2xl border-4 border-cream shadow-2xl float-y md:w-56"
          >
            <img src={inset} alt="Guest room detail" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="absolute -bottom-8 -right-4 w-48 overflow-hidden rounded-2xl border-4 border-cream shadow-2xl float-y-slow md:w-60"
          >
            <img src={inset2} alt="Lounge vignette" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Now manufacturing — 240 keys
          </motion.div>

          {/* Rotating ring badge */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 hidden h-28 w-28 md:block"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9" fill="currentColor" letterSpacing="3">
                <textPath href="#circle">CRAFT · STORY · DELIVER · CRAFT · STORY · DELIVER · </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block"
      >
        <span className="inline-block animate-bounce">↓</span> Scroll the story
      </motion.div>
    </section>
  );
}

function Marquee() {
  const row = [...SCOPES, ...SCOPES];
  return (
    <section className="border-y border-border bg-[oklch(0.16_0.025_290)] py-8 text-cream">
      <div className="overflow-hidden">
        <div className="marquee gap-14 pr-14">
          {row.map((s, i) => (
            <div key={i} className="flex shrink-0 items-center gap-14">
              <span className="font-display text-3xl md:text-5xl">{s}</span>
              <span className="text-gold">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryAct() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <Eyebrow>How a project unfolds</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02]">
            Three acts. One accountable team. <span className="italic text-primary">From brief to install.</span>
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STORY.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(58,26,74,0.35)]">
                <div className="font-display text-[5rem] leading-none text-primary/15 transition-colors group-hover:text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-primary">{s.kicker}</div>
                <h3 className="mt-3 text-3xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedReel() {
  const reel = [PROJECTS[0], PROJECTS[2], PROJECTS[7], PROJECTS[8], PROJECTS[22], PROJECTS[31]];
  return (
    <section className="relative bg-[oklch(0.14_0.02_290)] py-28 text-cream md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <FadeIn>
            <div className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Selected Reel
            </div>
            <h2 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02]">
              A refined portfolio for <span className="italic text-gold">hospitality furniture.</span>
            </h2>
          </FadeIn>
          <Link to="/portfolio" className="hidden shrink-0 text-sm text-cream/80 hover:text-gold md:inline-flex">
            View all 40 frames →
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
          {reel.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06} className={
              i === 0 ? "col-span-2 row-span-2 md:col-span-3 md:row-span-2"
              : i === 1 ? "col-span-2 md:col-span-3"
              : "col-span-1 md:col-span-2"
            }>
              <Link to="/portfolio" className="group relative block h-full overflow-hidden rounded-2xl">
                <div className="aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full">
                  <img
                    src={p.url}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{p.category}</div>
                  <div className="mt-1 font-display text-lg leading-tight text-cream">{p.title}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityRow() {
  const items = [
    { t: "Design Support", d: "Concept review, CAD detailing and sample approval — we collaborate with your design team end-to-end." },
    { t: "Manufacturing", d: "13+ cooperating facilities in Foshan covering casegoods, upholstery, metal, lighting and stone." },
    { t: "Quality Control", d: "Per-piece QC against the property's spec book, with photo and video reporting." },
    { t: "Logistics", d: "FOB or DDP consolidation, documentation and install coordination on-site." },
  ];
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <FadeIn>
            <Eyebrow>Capability</Eyebrow>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.4rem)] leading-[1.02]">
              360° FF&amp;E support, <span className="italic text-primary">under one roof.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Owners, designers, contractors and procurement teams partner with us when the brief
              needs to land on every key, on time, on budget.
            </p>
            <Parallax range={40} className="mt-10 hidden md:block">
              <div className="overflow-hidden rounded-3xl">
                <img src={PROJECTS[6].url} alt="Workshop" className="aspect-[4/3] w-full object-cover" />
              </div>
            </Parallax>
          </FadeIn>

          <div className="space-y-px">
            {items.map((it, i) => (
              <FadeIn key={it.t} delay={i * 0.08}>
                <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-border py-7 transition-colors hover:bg-primary/[0.03]">
                  <div className="font-display text-2xl text-primary/40 transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="text-2xl">{it.t}</h3>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">{it.d}</p>
                  </div>
                  <span className="text-2xl text-primary/30 transition-all group-hover:translate-x-1 group-hover:text-primary">→</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.18_0.03_290)] py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.4_0.18_305/0.4),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <FadeIn>
          <Eyebrow><span className="text-gold">Next chapter</span></Eyebrow>
          <h2 className="mt-5 text-balance font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]">
            Tell us about the property. <br />
            <span className="italic text-gold">We'll script the FF&amp;E.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Share your floor plans, brand standards or a moodboard. We'll come back with a scope,
            a budget envelope and a sample plan within five working days.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-medium text-ink transition-all hover:scale-[1.02]"
          >
            Start a project
            <span>→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StoryAct />
      <FeaturedReel />
      <CapabilityRow />
      <CTA />
    </>
  );
}
