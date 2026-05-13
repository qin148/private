import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      className="fixed bottom-24 right-[max(1rem,calc(50%-195px+0.5rem))] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-cream-300/90 bg-white/95 text-brand-700 shadow-card backdrop-blur md:right-auto md:left-[calc(50%+195px-3rem)]"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
