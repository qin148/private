import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

export default function SearchBar({ placeholder = "搜索章节、题目、模板…" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const onSearchPage = location.pathname === "/search";

  function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const value = String(fd.get("q") || "").trim();
    if (onSearchPage) {
      if (value) setParams({ q: value });
      else setParams({});
    } else {
      navigate(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
    }
  }

  return (
    <form key={q} onSubmit={submit} className="relative w-full">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <input
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-cream-300/90 bg-white/90 py-2.5 pl-10 pr-3 text-sm text-ink shadow-inner outline-none ring-0 placeholder:text-ink-muted/70 focus:border-amber-300/90 focus:ring-2 focus:ring-amber-200/60"
        enterKeyHint="search"
      />
    </form>
  );
}
