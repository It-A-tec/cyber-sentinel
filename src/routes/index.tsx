import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldMark } from "@/components/ShieldMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberShield — Check before you click" },
      {
        name: "description",
        content:
          "Paste a suspicious link or message and CyberShield explains the risk in seconds, with a threat level, security score and a recommended action.",
      },
      { property: "og:title", content: "CyberShield — Check before you click" },
      {
        property: "og:description",
        content:
          "Analyze suspicious links and messages and understand the risks before interacting with them.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    title: "Instant threat verdict",
    body: "Every check returns SAFE, SUSPICIOUS or UNSAFE with a confidence level you can read at a glance.",
  },
  {
    title: "Plain-English reasons",
    body: "See exactly which signals were detected — urgency wording, domain mismatch, credential requests and more.",
  },
  {
    title: "What to do next",
    body: "Each result ends with a clear recommended action, so you never have to guess your next step.",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Paste",
    d: "Drop in a link, SMS, WhatsApp message or email you were not expecting.",
  },
  {
    n: "02",
    t: "Analyze",
    d: "Dozens of link and language rules are scored together into one risk picture.",
  },
  { n: "03", t: "Understand", d: "Read the flagged indicators and the security score out of 100." },
  { n: "04", t: "Act", d: "Follow the recommendation — verify, ignore, or proceed carefully." },
];

function Landing() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden hero-glow">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" />
        <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-20 text-center sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Threat analysis that runs instantly in your browser
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl">
            Know the threat
            <br />
            <span className="text-gradient">before it becomes a breach.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Analyze suspicious links and messages and understand the risks before interacting with
            them.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/analyze"
              className="btn-primary w-full rounded-xl px-7 py-3.5 text-sm sm:w-auto"
            >
              Analyze Now
            </Link>
            <Link
              to="/how-it-works"
              className="w-full rounded-xl border border-border bg-card/60 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              How It Works
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">Check before you click.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6">
              <ShieldMark className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">Paste → Analyze → Understand → Act</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card/40 p-5">
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-3 text-base font-semibold">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/analyze" className="btn-primary inline-flex rounded-xl px-6 py-3 text-sm">
            Try it with an example
          </Link>
        </div>
      </section>
    </div>
  );
}
