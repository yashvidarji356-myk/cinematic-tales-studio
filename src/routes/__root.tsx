import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl">404</h1>
        <h2 className="mt-4 text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has been moved or never existed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input px-5 py-2.5 text-sm font-medium hover:bg-accent/40">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Akshar Foshan — Hospitality FF&E, Cinematic Furniture Stories" },
      { name: "description", content: "Akshar Foshan crafts complete hotel furniture solutions — casegoods, upholstery, lighting and bespoke FF&E for hospitality projects worldwide." },
      { name: "author", content: "Akshar Foshan" },
      { property: "og:title", content: "Akshar Foshan — Hospitality FF&E" },
      { property: "og:description", content: "Cinematic storytelling for complete hotel furniture solutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 w-[min(96%,1180px)] -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3" : "top-5"
      }`}
    >
      <div
        className={`relative flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-border/70 bg-background/80 shadow-[0_12px_40px_-20px_rgba(58,26,74,0.45)]"
            : "border-border/40 bg-background/55"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-7h6v7" />
            </svg>
          </span>
          <div className="leading-tight">
            <div className="font-display text-base">Akshar Foshan</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Hospitality FF&amp;E</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{l.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_10px_30px_-10px_rgba(58,26,74,0.6)] md:inline-flex"
        >
          Request Catalog
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
        >
          <span className="space-y-1.5">
            <span className={`block h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-2 rounded-2xl border border-border/70 bg-background/95 p-3 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary/10"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Request Catalog
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-[oklch(0.16_0.025_290)] text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-7h6v7" />
              </svg>
            </span>
            <div className="font-display text-xl">Akshar Foshan</div>
          </div>
          <p className="mt-6 max-w-sm text-sm text-cream/70">
            Complete hospitality FF&amp;E — designed, manufactured and delivered with cinematic attention to every detail.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/50">Explore</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/85 hover:text-gold">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/50">Scope</div>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/85">
            <li>Casegoods</li><li>Upholstery</li><li>Lighting &amp; Mirrors</li><li>Bath Accessories</li><li>FOB / DDP Logistics</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/50">Studio</div>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/85">
            <li>Foshan, Guangdong</li>
            <li>China</li>
            <li className="pt-2"><a href="mailto:hello@aksharfoshan.com" className="hover:text-gold">hello@aksharfoshan.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/55 md:flex-row">
          <div>© {new Date().getFullYear()} Akshar Foshan Hotel Furniture. All rights reserved.</div>
          <div>Crafted for hospitality, story by story.</div>
        </div>
      </div>
    </footer>
  );
}

function PageTransitions() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
      >
        <Outlet />
      </motion.main>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <PageTransitions />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
