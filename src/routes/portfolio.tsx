import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  PROJECTS,
  CATEGORIES,
  COLLECTIONS,
  collectionFor,
  featuredIn,
  projectsIn,
  type Category,
} from "@/data/projects";
import { FadeIn, Eyebrow } from "@/components/motion-primitives";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Akshar Foshan Hospitality FF&E Collections" },
      { name: "description", content: "Browse the Akshar Foshan collections — Guest Rooms, Suites, Lobby, Casegoods, Brand Programs and the Foshan workshop. Stats, palettes and featured frames per category." },
      { property: "og:title", content: "Collections — Akshar Foshan" },
      { property: "og:description", content: "Seven hospitality FF&E collections with stats, palettes and featured frames from the 2026 catalog." },
      { property: "og:image", content: PROJECTS[0].url },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const activeCollection = filter !== "All" ? collectionFor(filter) : null;

  function selectCategory(c: "All" | Category) {
    setFilter(c);
    requestAnimationFrame(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((lightbox + 1) % PROJECTS.length);
      if (e.key === "ArrowLeft") setLightbox(((lightbox - 1) + PROJECTS.length) % PROJECTS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.92_0.05_310/0.5),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16">
          <FadeIn>
            <Eyebrow>The 2026 Catalog · 7 collections · 40 frames</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[0.98]">
              Collections, not categories.{" "}
              <span className="italic text-primary">Each one a working brief.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Seven hospitality FF&E collections — built on our Foshan floor, shipped to brand
              standard. Open a collection to read the brief, the stats and a featured frame.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Collections grid */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((col, i) => {
              const items = projectsIn(col.category);
              const hero = items[0];
              const stack = featuredIn(col.category, 4).slice(1);
              return (
                <motion.button
                  key={col.category}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => selectCategory(col.category)}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_30px_60px_-30px_oklch(0.3_0.08_310/0.45)]"
                >
                  {/* Hero image */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-muted">
                    <img
                      src={hero.url}
                      alt={col.category}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full bg-cream/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cream backdrop-blur">
                      Collection · 0{i + 1}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                      <div className="font-display text-3xl leading-tight md:text-4xl">
                        {col.category}
                      </div>
                      <div className="mt-1 text-sm text-cream/75">{items.length} frames</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <p className="font-display text-lg italic text-primary/90">{col.tagline}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {col.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 border-y border-border py-4">
                      {col.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-display text-lg leading-tight text-foreground">
                            {s.value}
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Featured strip */}
                    <div>
                      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Featured picks
                      </div>
                      <div className="flex gap-2">
                        {stack.map((p) => (
                          <div
                            key={p.id}
                            className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                          >
                            <img
                              src={p.url}
                              alt={p.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.1]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">{col.palette}</div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Open collection
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter + gallery */}
      <section ref={galleryRef} className="relative scroll-mt-28 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-12 md:flex-row md:items-end">
              <div>
                <Eyebrow>Browse all frames</Eyebrow>
                <h2 className="mt-4 text-balance text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight">
                  {activeCollection ? activeCollection.category : "The full 40-frame index"}
                </h2>
                {activeCollection && (
                  <p className="mt-3 max-w-xl text-muted-foreground">
                    {activeCollection.tagline}
                  </p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{items.length}</span> /{" "}
                {PROJECTS.length}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground/75 hover:border-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {c}
                    <span className="ml-2 text-xs opacity-60">
                      {c === "All"
                        ? PROJECTS.length
                        : PROJECTS.filter((p) => p.category === c).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <motion.div
            layout
            className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
          >
            <AnimatePresence>
              {items.map((p, i) => (
                <motion.button
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: (i % 9) * 0.04 }}
                  onClick={() => setLightbox(PROJECTS.indexOf(p))}
                  className="group relative block w-full overflow-hidden rounded-2xl bg-muted text-left"
                >
                  <img
                    src={p.url}
                    alt={p.title}
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="mt-1 font-display text-xl leading-tight">{p.title}</div>
                    <div className="mt-1 text-xs text-cream/70">{p.location}</div>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground/70 opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                    {p.id}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          <FadeIn>
            <div className="mt-24 rounded-3xl border border-border bg-card p-10 text-center md:p-16">
              <Eyebrow>Want the full catalog?</Eyebrow>
              <h2 className="mt-5 text-balance text-[clamp(1.8rem,4vw,3rem)] leading-tight">
                Request the high-resolution PDF for your project file.
              </h2>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:shadow-[0_20px_50px_-20px_rgba(58,26,74,0.6)]"
              >
                Request catalog <span>→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(((lightbox - 1) + PROJECTS.length) % PROJECTS.length);
              }}
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 md:left-8"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % PROJECTS.length);
              }}
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 md:right-8"
              aria-label="Next"
            >
              →
            </button>
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
              aria-label="Close"
            >
              ✕
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="grid w-full max-w-6xl gap-6 md:grid-cols-[1.6fr_1fr]"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={PROJECTS[lightbox].url}
                  alt={PROJECTS[lightbox].title}
                  className="h-full max-h-[80vh] w-full object-cover"
                />
              </div>
              <div className="self-center text-cream">
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                  {PROJECTS[lightbox].category} · {PROJECTS[lightbox].year}
                </div>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">
                  {PROJECTS[lightbox].title}
                </h3>
                {PROJECTS[lightbox].brand && (
                  <div className="mt-2 text-sm text-cream/70">For {PROJECTS[lightbox].brand}</div>
                )}
                <div className="mt-1 text-sm text-cream/70">{PROJECTS[lightbox].location}</div>
                <p className="mt-6 text-cream/80">{PROJECTS[lightbox].blurb}</p>
                <Link
                  to="/contact"
                  onClick={() => setLightbox(null)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink"
                >
                  Discuss a similar project →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
