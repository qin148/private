import { Outlet, Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import BackToTop from "../components/BackToTop.jsx";
import DisclaimerFooter from "../components/DisclaimerFooter.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { APP_NAME } from "../constants/app.js";

export default function MainLayout() {
  return (
    <div className="relative min-h-dvh w-full bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200/40 text-ink">
      <div className="relative mx-auto min-h-dvh w-full max-w-app shadow-soft md:my-3 md:min-h-[calc(100dvh-1.5rem)] md:overflow-hidden md:rounded-[1.75rem] md:border md:border-cream-200/90 md:bg-cream-100">
        <header className="sticky top-0 z-30 border-b border-cream-200/70 bg-cream-50/90 px-4 pb-3 pt-safe backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 pt-2">
            <Link to="/" className="min-w-0 text-sm font-semibold tracking-tight text-ink">
              <span className="truncate block">{APP_NAME}</span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/outline"
                className="hidden rounded-full border border-cream-300/90 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-muted hover:text-ink sm:inline-block"
              >
                大纲
              </Link>
              <Link
                to="/search"
                className="rounded-full border border-cream-300/90 bg-white/80 px-3 py-1 text-xs font-medium text-ink-muted hover:text-ink"
              >
                搜索
              </Link>
            </div>
          </div>
        </header>
        <main className="px-4 pb-28 pt-4">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <DisclaimerFooter />
        <BottomNav />
        <BackToTop />
      </div>
    </div>
  );
}
