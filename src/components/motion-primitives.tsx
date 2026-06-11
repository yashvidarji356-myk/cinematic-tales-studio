import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}

export function Parallax({ children, range = 120, className }: { children: ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/80">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
        className="h-px bg-primary/60"
      />
      {children}
    </div>
  );
}

/** Letter-by-letter cinematic rise */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              initial={{ y: "110%", opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: delay + (wi * 0.05) + ci * stagger,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="inline-block"
              style={{ transformOrigin: "50% 100%" }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** Tilt card that responds to pointer */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Marquee text reused */
export function CinemaMarquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="marquee gap-14 pr-14">
        {row.map((s, i) => (
          <div key={i} className="flex shrink-0 items-center gap-14">
            <span className="font-display text-3xl md:text-5xl">{s}</span>
            <span className="text-gold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

