export default function HighlightText({ text, className = "" }) {
  if (text == null) return null;
  const str = String(text);
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const inner = part.slice(2, -2);
          return (
            <mark
              key={i}
              className="rounded bg-amber-200/95 px-0.5 text-amber-950 decoration-clone"
            >
              {inner}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
