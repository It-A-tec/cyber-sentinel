import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  analyze,
  EXAMPLE_INPUT,
  loadHistory,
  saveHistory,
  shortLabel,
  timeAgo,
  type AnalysisResult,
  type HistoryEntry,
  type InputKind,
  type ThreatLevel,
} from "@/lib/analysis";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Threat analysis dashboard — CyberShield" },
      {
        name: "description",
        content:
          "Paste a URL, message or email and get an instant threat level, security score, detected indicators and a recommended action.",
      },
      { property: "og:title", content: "Threat analysis dashboard — CyberShield" },
      {
        property: "og:description",
        content: "Instant threat level, security score and recommended action for any suspicious link or message.",
      },
    ],
  }),
  component: Dashboard,
});

const KINDS: { id: InputKind; label: string }[] = [
  { id: "url", label: "URL" },
  { id: "message", label: "Message" },
  { id: "email", label: "Email" },
];

const LEVEL_STYLES: Record<ThreatLevel, { text: string; ring: string; bg: string }> = {
  SAFE: { text: "text-success", ring: "stroke-success", bg: "bg-success/10 border-success/40" },
  SUSPICIOUS: { text: "text-warning", ring: "stroke-warning", bg: "bg-warning/10 border-warning/40" },
  UNSAFE: { text: "text-destructive", ring: "stroke-destructive", bg: "bg-destructive/10 border-destructive/40" },
};

function ScoreRing({ score, level }: { score: number; level: ThreatLevel }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 128 128" className="h-32 w-32 shrink-0 -rotate-90">
      <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" className="stroke-secondary" />
      <circle
        cx="64"
        cy="64"
        r={r}
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        className={LEVEL_STYLES[level].ring}
        strokeDasharray={c}
        strokeDashoffset={c - (c * score) / 100}
        style={{ transition: "stroke-dashoffset .7s ease" }}
      />
    </svg>
  );
}

function Dashboard() {
  const [kind, setKind] = useState<InputKind>("url");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzed, setAnalyzed] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => setHistory(loadHistory()), []);

  const canAnalyze = content.trim().length > 2 && !busy;

  function runAnalysis() {
    if (!canAnalyze) return;
    setBusy(true);
    const value = content;
    window.setTimeout(() => {
      const res = analyze(value, kind);
      setResult(res);
      setAnalyzed(value);
      const entry: HistoryEntry = {
        id: `${Date.now()}`,
        label: shortLabel(value),
        level: res.level,
        score: res.score,
        at: Date.now(),
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 12);
        saveHistory(next);
        return next;
      });
      setBusy(false);
    }, 550);
  }

  function clearHistory() {
    setHistory([]);
    saveHistory([]);
  }

  const styles = useMemo(() => (result ? LEVEL_STYLES[result.level] : null), [result]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold sm:text-3xl">Threat analysis</h1>
          <p className="mt-1 text-sm text-muted-foreground">Paste anything suspicious — we'll explain the risk.</p>
        </div>
        <button
          onClick={() => {
            setKind("message");
            setContent(EXAMPLE_INPUT);
            setResult(null);
          }}
          className="shrink-0 rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Try Example
        </button>
      </header>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="glass-card rounded-2xl p-5 sm:p-6">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Input type</span>
          <div className="mt-3 inline-flex w-full rounded-xl border border-border bg-background/60 p-1">
            {KINDS.map((k) => (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  kind === k.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={7}
            placeholder="Paste a suspicious URL or message here..."
            className="mt-4 w-full resize-y rounded-xl border border-input bg-background/70 p-4 font-mono text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={runAnalysis}
              disabled={!canAnalyze}
              className="btn-primary w-full rounded-xl px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
            >
              {busy ? "Analyzing…" : "Analyze Threat"}
            </button>
            {content && (
              <button
                onClick={() => {
                  setContent("");
                  setResult(null);
                }}
                className="w-full rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Your content is analyzed only to generate the security assessment.
          </p>
        </section>

        <section className="min-w-0">
          {!result ? (
            <div className="flex h-full min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/25 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Your result appears here: threat level, security score, detected indicators and a recommended action.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className={`rounded-2xl border p-5 sm:p-6 ${styles!.bg}`}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <div className="min-w-0">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Threat level</span>
                    <p className={`font-mono text-3xl font-bold sm:text-4xl ${styles!.text}`}>{result.level}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>
                  </div>
                  <ScoreRing score={result.score} level={result.level} />
                </div>
                <div className="mt-4 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Threat confidence</p>
                    <p className="font-mono text-lg font-semibold">{result.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Security score</p>
                    <p className="font-mono text-lg font-semibold">{result.score}/100</p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${
                          result.level === "SAFE" ? "bg-success" : result.level === "SUSPICIOUS" ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${result.score}%`, transition: "width .7s ease" }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">Lower scores indicate higher potential risk.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 sm:p-6">
                <h2 className="text-base font-semibold">Why was this flagged?</h2>
                {result.indicators.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    No risk indicators were detected in the submitted content.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {result.indicators.map((i) => (
                      <div key={i.label} className="rounded-xl border border-border bg-background/50 p-3">
                        <p className="text-sm font-semibold">{i.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{i.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass-card rounded-2xl p-5 sm:p-6">
                <h2 className="text-base font-semibold">Recommended action</h2>
                <p className="mt-2 text-sm text-muted-foreground">{result.recommendation}</p>
                <p className="mt-3 truncate font-mono text-xs text-muted-foreground">Checked: {shortLabel(analyzed)}</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="mt-10 glass-card rounded-2xl p-5 sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <h2 className="truncate text-base font-semibold">Recent checks</h2>
          {history.length > 0 && (
            <button onClick={clearHistory} className="shrink-0 text-xs text-muted-foreground hover:text-foreground">
              Clear history
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Your analysis history will appear here, stored only on this device.</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Content</th>
                  <th className="px-3 py-2 font-medium">Result</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Score</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="border-t border-border">
                    <td className="max-w-[10rem] truncate px-3 py-2.5 font-mono text-xs sm:max-w-xs">{h.label}</td>
                    <td className={`px-3 py-2.5 font-mono text-xs font-bold ${LEVEL_STYLES[h.level].text}`}>{h.level}</td>
                    <td className="hidden px-3 py-2.5 font-mono text-xs sm:table-cell">{h.score}/100</td>
                    <td className="hidden px-3 py-2.5 text-xs text-muted-foreground sm:table-cell">{timeAgo(h.at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
