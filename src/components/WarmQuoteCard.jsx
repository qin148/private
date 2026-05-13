import { pickWarmQuote } from "../data/warmQuotes.js";
import { useMemo } from "react";

export default function WarmQuoteCard({ seed = 0, className = "", italic = true }) {
  const text = useMemo(() => pickWarmQuote(seed), [seed]);
  if (!text) return null;
  return (
    <div
      className={
        "rounded-2xl border border-cream-200/90 bg-white/70 px-4 py-3 text-sm leading-relaxed text-ink-muted " +
        (italic ? "italic " : "") +
        className
      }
    >
      {text}
    </div>
  );
}
