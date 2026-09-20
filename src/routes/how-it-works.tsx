import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How CyberShield works — threat signals explained" },
      {
        name: "description",
        content:
          "See which link and language signals CyberShield checks, how the security score is built, and what each threat level means.",
      },
      { property: "og:title", content: "How CyberShield works" },
      {
        property: "og:description",
        content:
          "The link and language signals behind every CyberShield verdict, explained simply.",
      },
    ],
  }),
  component: HowItWorks,
});

const LINK_SIGNALS = [
  "HTTP instead of HTTPS",
  "IP address used instead of a domain",
  "Excessive subdomains",
  "Shortened or obfuscated links",
  "Low-reputation domain endings",
  "Domain mismatch with a known brand",
  "Suspicious redirect parameters",
  "Excessively long addresses",
];

const TEXT_SIGNALS = [
  "Urgency and deadline pressure",
  "Account suspension threats",
  "Requests for passwords",
  "Requests for one-time codes",
  "Requests for financial details",
  "Prize and reward scams",
  "Impersonation language",
  "Embedded suspicious links",
];

const LEVELS = [
  { l: "SAFE", c: "text-success", d: "No obvious indicators of malicious activity were found." },
  {
    l: "SUSPICIOUS",
    c: "text-warning",
    d: "Warning signs were detected — verify the source before acting.",
  },
  {
    l: "UNSAFE",
    c: "text-destructive",
    d: "Strong indicators of phishing or malicious behaviour were detected.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="text-3xl font-bold sm:text-4xl">How CyberShield works</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        CyberShield reads what you paste and scores it against dozens of known phishing and scam
        patterns. Each matching signal adds risk; the combined risk becomes a security score out of
        100 and a plain threat level.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Link signals</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {LINK_SIGNALS.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Message signals</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {TEXT_SIGNALS.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-semibold">What each verdict means</h2>
      <div className="mt-4 space-y-3">
        {LEVELS.map((v) => (
          <div key={v.l} className="rounded-2xl border border-border bg-card/40 p-5">
            <span className={`font-mono text-sm font-bold ${v.c}`}>{v.l}</span>
            <p className="mt-1.5 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Privacy</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Analysis runs inside your browser. Your content is analyzed only to generate the security
          assessment, and your recent checks are stored locally on your own device — never uploaded.
        </p>
      </div>

      <div className="mt-10">
        <Link to="/analyze" className="btn-primary inline-flex rounded-xl px-6 py-3 text-sm">
          Analyze Now
        </Link>
      </div>
    </div>
  );
}
