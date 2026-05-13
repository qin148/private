import { Link } from "react-router-dom";
import HighlightText from "./HighlightText.jsx";

export default function Card({
  as: Comp = "div",
  to,
  className = "",
  children,
  padding = true,
  hover = false,
  ...rest
}) {
  const base =
    "rounded-2xl border border-cream-200/80 bg-white/85 shadow-card backdrop-blur-sm " +
    (padding ? "p-4 " : "") +
    (hover ? "transition-shadow hover:shadow-card-hover active:scale-[0.99] " : "") +
    className;

  if (to) {
    return (
      <Link to={to} className={base} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Comp className={base} {...rest}>
      {typeof children === "string" ? <HighlightText text={children} /> : children}
    </Comp>
  );
}
