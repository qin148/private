import { Star } from "lucide-react";

export default function BookmarkStar({ active, onClick, size = "md", className = "" }) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "取消收藏" : "收藏"}
      className={
        "inline-flex shrink-0 items-center justify-center rounded-full border border-cream-300/80 bg-white/90 text-amber-600 shadow-sm transition active:scale-95 " +
        dim +
        " " +
        className +
        (active ? " ring-2 ring-amber-200/90" : " hover:bg-cream-50")
      }
    >
      <Star className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} fill={active ? "currentColor" : "none"} strokeWidth={1.8} />
    </button>
  );
}
