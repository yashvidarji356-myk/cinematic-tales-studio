import { createFileRoute, Link } from "@tanstack/react-router";
import { PROJECTS } from "@/data/projects";
import { FadeIn, Eyebrow, Parallax, Reveal } from "@/components/motion-primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Akshar Foshan" },
      { name: "description", content: "Foshan-based makers of hospitality furniture for hotel brands, designers and contractors worldwide." },
      { property: "og:title", content: "About — Akshar Foshan" },
      { property: "og:description", content: "The story, the studio and the workshops behind Akshar Foshan." },
      { property: "og:image", content: PROJECTS[6].url },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { y: "2020", t: "Studio founded", d: "Set up in Foshan with two cooperating workshops and a single brand client." },
  { y: "2021", t: "First brand program", d: "Delivered a multi-property casegoods refresh for a US extended-stay brand." },
  { y: "2023", t: "Capability expansion", d: "Lighting, mirrors and bath accessories added under one program manager." },
  { y: "2024", t: "Thirteen facilities", d: "Network grew to 13+ cooperating facilities across casegoods, upholstery, metal and stone." },
  { y: "2026", t: "Catalog 02", d: "Released the cinematic 2026 collection — the catalog this website is built around." },
];

const VALUES = [
  { t: "Honest craft", d: "We show the workshop floor without filters. The grain, the press, the people." },
  { t: "Brand discipline", d: "Marriott. Hilton. IHG. We've delivered against the spec book — exactly to the spec book." },
  { t: "One throat to choke", d: "Single program manager, single QC report, single shipping consolidation." },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,oklch(0.92_0.06_310/0.5),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-6 pb-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <FadeIn>
              <Eyebrow>Foshan, Guangdong · Hospitality FF&amp;E</Eyebrow>
              <h1 className="mt-6 text-balance text-[clamp(2.4rem,6vw,5rem)] leading-[0.98]">
                <Reveal>We build the rooms</Reveal>{" "}
                <Reveal className="italic text-primary">guests remember.</Reveal>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Akshar Foshan is a Foshan-based hospitality FF&amp;E house. We work alongside hotel owners,
                interior designers, brand teams and contractors to land complete furniture programs —
                from a single refresh floor to a full new-build property.
              </p>
            </FadeIn>
          </div>
          <Parallax range={50}>
            <FadeIn delay={0.2}>
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img src={PROJECTS[9].url} alt="Akshar Foshan studio" className="aspect-[4/5] w-full object-cover" />
              </div>
            </FadeIn>
          </Parallax>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4">
          {[
            { v: "13+", l: "Cooperating facilities" },
            { v: "5+", l: "Years in hospitality" },
            { v: "40", l: "Frames in the 2026 reel" },
            { v: "21 days", l: "Fastest 240-key turn" },
          ].map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.06}>
              <div>
                <div className="font-display text-5xl text-primary md:text-6xl">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-tight">
              Three principles we won't compromise.
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <FadeIn key={v.t} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-card p-8">
                  <div className="font-display text-7xl text-primary/15">{`0${i + 1}`}</div>
                  <h3 className="mt-2 text-2xl">{v.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative bg-[oklch(0.14_0.02_290)] py-28 text-cream md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-8 bg-gold/60" /> The story so far
            </div>
            <h2 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight">
              Five years, one focus: <span className="italic text-gold">hospitality.</span>
            </h2>
          </FadeIn>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-cream/15 md:grid-cols-5">
            {TIMELINE.map((t, i) => (
              <FadeIn key={t.y} delay={i * 0.08}>
                <li className="h-full bg-[oklch(0.16_0.025_290)] p-6 transition-colors hover:bg-[oklch(0.19_0.03_290)]">
                  <div className="font-display text-3xl text-gold">{t.y}</div>
                  <div className="mt-4 text-sm font-medium text-cream">{t.t}</div>
                  <p className="mt-2 text-xs text-cream/65">{t.d}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Workshop strip */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <Eyebrow>Inside the workshop</Eyebrow>
              <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-tight">
                Real machines, real makers — <span className="italic text-primary">no embellishment.</span>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Our cooperating workshops in Foshan run CNC milling, edge banding, assembly, spray and
                curing, and final QC under one roof. We share photo and video reports at every stage so
                you always know what's on the line.
              </p>
              <Link
                to="/portfolio"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground"
              >
                See the workshop frames →
              </Link>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4">
              {[6, 11, 21, 38].map((idx, i) => (
                <FadeIn key={idx} delay={i * 0.08} className={i % 3 === 0 ? "translate-y-6" : ""}>
                  <div className="overflow-hidden rounded-2xl">
                    <img src={PROJECTS[idx].url} alt="Workshop" className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] hover:scale-110" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
