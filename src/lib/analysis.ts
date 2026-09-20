export type ThreatLevel = "SAFE" | "SUSPICIOUS" | "UNSAFE";
export type InputKind = "url" | "message" | "email";

export interface Indicator {
  label: string;
  detail: string;
  weight: number;
}

export interface AnalysisResult {
  level: ThreatLevel;
  score: number; // 0-100, higher = safer
  confidence: number; // 0-100
  indicators: Indicator[];
  recommendation: string;
  summary: string;
}

export interface HistoryEntry {
  id: string;
  label: string;
  level: ThreatLevel;
  score: number;
  at: number;
}

const URL_RE = /\bhttps?:\/\/[^\s<>"']+|\bwww\.[^\s<>"']+/gi;
const IP_RE = /https?:\/\/(\d{1,3}\.){3}\d{1,3}/i;
const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "rb.gy", "cutt.ly"];
const SUSPICIOUS_TLDS = [".zip", ".xyz", ".top", ".click", ".gq", ".tk", ".ml", ".cf", ".ru", ".cn", ".info", ".mov"];
const BRANDS = ["paypal", "apple", "microsoft", "google", "amazon", "netflix", "facebook", "instagram", "whatsapp", "bank", "hdfc", "sbi", "icici", "dhl", "fedex"];

function push(list: Indicator[], label: string, detail: string, weight: number) {
  if (!list.some((i) => i.label === label)) list.push({ label, detail, weight });
}

function analyzeUrl(raw: string, out: Indicator[]) {
  const url = raw.trim();
  let host = "";
  try {
    host = new URL(url.startsWith("http") ? url : `http://${url}`).hostname.toLowerCase();
  } catch {
    host = url.toLowerCase();
  }

  if (/^http:\/\//i.test(url)) push(out, "Insecure connection", "The link uses HTTP instead of HTTPS, so traffic is not encrypted.", 18);
  if (IP_RE.test(url)) push(out, "IP address instead of domain", "Legitimate services rarely link directly to a raw IP address.", 28);

  const labels = host.split(".").filter(Boolean);
  if (labels.length >= 4) push(out, "Excessive subdomains", `“${host}” stacks several subdomains, a common way to hide the real destination.`, 20);

  if (SHORTENERS.some((s) => host.endsWith(s))) push(out, "Shortened / obfuscated link", "A link shortener hides the true destination until you click it.", 22);
  const tld = SUSPICIOUS_TLDS.find((t) => host.endsWith(t));
  if (tld) push(out, "Low-reputation domain", `The “${tld}” domain ending is frequently abused in phishing campaigns.`, 16);

  const brand = BRANDS.find((b) => host.includes(b));
  if (brand && !new RegExp(`(^|\\.)${brand}\\.(com|net|org|in|co\\.uk)$`).test(host)) {
    push(out, "Domain mismatch", `The address mentions “${brand}” but is not the official ${brand} domain.`, 30);
  }

  if (/[0-9]/.test(host) && /[a-z]/.test(host) && /(0|1|3|5)/.test(host) && brand === undefined && labels.length > 1) {
    push(out, "Unusual characters in domain", "Digits substituted for letters are a classic look-alike trick.", 12);
  }
  if (/xn--/.test(host)) push(out, "Unusual characters in domain", "The domain uses punycode, which can disguise look-alike characters.", 24);
  if (url.length > 90) push(out, "Excessively long URL", "Very long links are often used to bury the real destination.", 12);
  if (/[?&](redirect|url|next|goto|continue)=/i.test(url)) push(out, "Suspicious redirect", "The link carries a redirect parameter that can forward you elsewhere.", 20);
  if (/(login|verify|secure|update|account|signin|confirm|wallet|otp)/i.test(url)) push(out, "Credential-harvesting path", "The address points at a login or verification page, typical of phishing.", 16);
}

const MESSAGE_RULES: { re: RegExp; label: string; detail: string; weight: number }[] = [
  { re: /\b(urgent|immediately|right now|within 24 hours|last warning|act now|expires today)\b/i, label: "Urgency pressure", detail: "The text pushes you to act fast so you skip normal checks.", weight: 20 },
  { re: /\b(suspend|suspended|deactivat|blocked|locked|terminat|closed)\b/i, label: "Account suspension threat", detail: "Threatening to close your account is a standard scare tactic.", weight: 22 },
  { re: /\b(password|passcode|pin|credential|login details)\b/i, label: "Request for credentials", detail: "Legitimate organisations never ask for your password.", weight: 30 },
  { re: /\b(otp|one[- ]time (code|password)|verification code|2fa code)\b/i, label: "Request for OTP", detail: "Sharing a one-time code hands over full account access.", weight: 32 },
  { re: /\b(bank account|credit card|cvv|upi|debit card|wire transfer|payment details|iban)\b/i, label: "Request for financial data", detail: "The message asks for payment or banking information.", weight: 28 },
  { re: /\b(won|winner|prize|lottery|reward|claim your|free gift|cash bonus)\b/i, label: "Prize / reward scam", detail: "Unexpected winnings are one of the oldest scam formats.", weight: 24 },
  { re: /\b(verify your account|confirm your identity|validate your|re-?activate)\b/i, label: "Potential phishing language", detail: "Verification requests by link are a hallmark of phishing.", weight: 22 },
  { re: /\b(dear (customer|user|sir\/madam)|valued customer)\b/i, label: "Impersonation language", detail: "Generic greetings suggest a bulk message, not a real contact.", weight: 12 },
  { re: /\b(ceo|manager|hr team|it (support|helpdesk)|support team)\b.*\b(request|need|asap|gift card)\b/i, label: "Impersonation language", detail: "The sender claims authority to pressure you into acting.", weight: 18 },
  { re: /[!]{2,}|[A-Z]{6,}/, label: "Unusual characters", detail: "Heavy capitals and exclamation marks are typical of scam blasts.", weight: 8 },
];

export function analyze(content: string, kind: InputKind): AnalysisResult {
  const text = content.trim();
  const indicators: Indicator[] = [];

  const urls = text.match(URL_RE) ?? [];
  if (kind === "url" && urls.length === 0 && text) analyzeUrl(text, indicators);
  urls.forEach((u) => analyzeUrl(u, indicators));

  if (kind !== "url" || urls.length > 0) {
    for (const rule of MESSAGE_RULES) if (rule.re.test(text)) push(indicators, rule.label, rule.detail, rule.weight);
  }
  if (kind !== "url" && urls.length > 0) {
    push(indicators, "Embedded link", "The message contains a link, which scammers use to reach a fake page.", 8);
  }
  if (urls.length > 2) push(indicators, "Suspicious redirects", "Multiple links in one message spread the chance of a bad click.", 10);

  const raw = indicators.reduce((s, i) => s + i.weight, 0);
  const score = Math.max(2, Math.min(100, Math.round(100 - Math.min(98, raw * 0.9))));

  const level: ThreatLevel = score >= 75 ? "SAFE" : score >= 45 ? "SUSPICIOUS" : "UNSAFE";
  const confidence = Math.min(97, 55 + indicators.length * 9 + (level === "SAFE" ? 12 : 0));

  const recommendation =
    level === "SAFE"
      ? "No obvious threats were detected. Continue to remain cautious and check the sender if anything feels off."
      : level === "SUSPICIOUS"
        ? "Do not provide credentials or financial information until you verify the sender and destination."
        : "Avoid opening the link or responding to the message. Verify the sender through an independent channel.";

  const summary =
    level === "SAFE"
      ? "The content does not show obvious indicators of malicious activity."
      : level === "SUSPICIOUS"
        ? "Potential warning signs were detected. Verify the source before you act."
        : "Strong indicators of phishing or malicious behaviour were detected.";

  return {
    level,
    score,
    confidence,
    indicators: indicators.sort((a, b) => b.weight - a.weight).slice(0, 8),
    recommendation,
    summary,
  };
}

export const EXAMPLE_INPUT =
  "URGENT! Your account will be suspended today. Verify your account immediately: http://secure-paypal.account-verify.xyz/login?redirect=http://192.168.4.11/otp";

const KEY = "cybershield.history.v1";

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 12)));
  } catch {
    /* ignore */
  }
}

export function shortLabel(content: string) {
  const text = content.trim().replace(/\s+/g, " ");
  const url = text.match(URL_RE)?.[0];
  if (url) {
    try {
      return new URL(url.startsWith("http") ? url : `http://${url}`).hostname;
    } catch {
      return url.slice(0, 34);
    }
  }
  return text.length > 34 ? `${text.slice(0, 34)}…` : text || "Empty input";
}

export function timeAgo(ts: number) {
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (s < 60) return "Just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return `${Math.round(h / 24)} d ago`;
}
