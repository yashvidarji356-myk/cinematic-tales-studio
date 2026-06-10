import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { toast } from "sonner";
import { PROJECTS } from "@/data/projects";
import { FadeIn, Eyebrow, Reveal } from "@/components/motion-primitives";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Akshar Foshan" },
      { name: "description", content: "Tell us about your property. We come back with a scope, sample plan and budget envelope within five working days." },
      { property: "og:title", content: "Contact — Akshar Foshan" },
      { property: "og:description", content: "Start a hospitality FF&E project with the Akshar Foshan studio." },
      { property: "og:image", content: PROJECTS[4].url },
    ],
  }),
  component: Contact,
});

const SCOPES = ["Casegoods", "Upholstery", "Lighting & Mirrors", "Bath Accessories", "Outdoor", "Full FF&E"];

const submissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  company: z.string().trim().max(200, "Company is too long").optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  location: z.string().trim().max(200, "Location is too long").optional().or(z.literal("")),
  scope: z.array(z.string()).max(20),
  brief: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(5000, "Brief is too long"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof submissionSchema>, string>>;

function Contact() {
  const [sent, setSent] = useState(false);
  const [scope, setScope] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const toggle = (s: string) =>
    setScope((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      location: String(fd.get("location") ?? ""),
      scope,
      brief: String(fd.get("brief") ?? ""),
    };

    const parsed = submissionSchema.safeParse(raw);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        company: parsed.data.company || null,
        email: parsed.data.email,
        location: parsed.data.location || null,
        scope: parsed.data.scope,
        brief: parsed.data.brief,
      });
      if (error) throw error;
      toast.success("Brief received — we'll be in touch within 5 working days.");
      setSent(true);
    } catch (err) {
      console.error("contact submission failed", err);
      toast.error("Something went wrong. Please email info@aksharfoshan.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,oklch(0.92_0.06_310/0.55),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20">
          <FadeIn>
            <Eyebrow>Start the conversation</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]">
              <Reveal>Tell us about the</Reveal>{" "}
              <Reveal className="italic text-primary">property.</Reveal>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Drop your floor plans, brand book or moodboard. We'll come back within five working days
              with scope, budget envelope and a sample plan.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">✓</div>
                  <h2 className="mt-6 font-display text-3xl">Brief received.</h2>
                  <p className="mt-3 text-muted-foreground">
                    Thank you. A project manager will reach out within five working days with next steps.
                  </p>
                  <button
                    onClick={() => { setSent(false); setScope([]); setErrors({}); }}
                    className="mt-8 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-primary/5"
                  >
                    Submit another brief
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div className="grid gap-7 md:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Jane Doe" required error={errors.name} />
                    <Field label="Company" name="company" placeholder="Studio / Brand / Owner group" error={errors.company} />
                    <Field label="Email" name="email" type="email" placeholder="you@studio.com" required error={errors.email} />
                    <Field label="Property location" name="location" placeholder="City, Country" error={errors.location} />
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Scope (multi-select)</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SCOPES.map((s) => {
                        const on = scope.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggle(s)}
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                              on
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Brief <span className="text-primary">*</span></label>
                    <textarea
                      name="brief"
                      required
                      rows={5}
                      maxLength={5000}
                      placeholder="Property type, key count, brand standards, timeline…"
                      className={`mt-3 w-full resize-none rounded-2xl border bg-background px-5 py-4 text-sm focus:outline-none ${
                        errors.brief ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                    />
                    {errors.brief && <p className="mt-2 text-xs text-destructive">{errors.brief}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_20px_50px_-20px_rgba(58,26,74,0.6)] disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : <>Send the brief <span>→</span></>}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-3xl">
                <img src={PROJECTS[4].url} alt="Studio" className="aspect-[4/5] w-full object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rounded-3xl border border-border bg-card p-7">
                <Eyebrow>Studio</Eyebrow>
                <div className="mt-4 space-y-3 text-sm">
                  <Row k="Address" v="Foshan, Guangdong, China" />
                  <Row k="Email" v={<a href="mailto:info@aksharfoshan.com" className="hover:text-primary">info@aksharfoshan.com</a>} />
                  <Row k="Hours" v="Mon–Sat · 09:00–18:00 CST" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-primary">Response time</div>
                <p className="mt-3 font-display text-2xl leading-snug">
                  We reply to every brief within <span className="italic">5 working days.</span>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required, error }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`mt-3 w-full rounded-full border bg-background px-5 py-3.5 text-sm focus:outline-none ${
          error ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
        }`}
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{k}</span>
      <span className="text-right text-foreground">{v}</span>
    </div>
  );
}
