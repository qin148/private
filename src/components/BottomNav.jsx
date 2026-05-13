import { NavLink } from "react-router-dom";
import { Home, BookOpen, ListChecks, ScrollText, UserRound } from "lucide-react";

const items = [
  { to: "/", label: "首页", Icon: Home, end: true },
  { to: "/library", label: "书库", Icon: BookOpen, end: false },
  { to: "/bank", label: "题库", Icon: ListChecks, end: false },
  { to: "/templates", label: "模板", Icon: ScrollText, end: false },
  { to: "/profile", label: "我的", Icon: UserRound, end: false }
];

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-cream-200/90 bg-cream-50/95 pb-safe backdrop-blur-md"
      aria-label="主导航"
    >
      <div className="mx-auto grid max-w-app grid-cols-5 px-1 pt-1">
        {items.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              "flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-colors " +
              (isActive ? "text-brand-700" : "text-ink-muted hover:text-ink")
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.7} aria-hidden />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
