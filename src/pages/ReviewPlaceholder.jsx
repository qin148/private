import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import WarmQuoteCard from "../components/WarmQuoteCard.jsx";

export default function ReviewPlaceholder() {
  return (
    <div className="space-y-4">
      <WarmQuoteCard seed={11} italic={false} />
      <h1 className="text-lg font-bold">错题 / 待复习</h1>
      <EmptyState
        title="功能预留"
        description="后续可为题目增加「不会 / 待复习」标记并在此聚合。当前请先用收藏夹集中复习。"
        action={
          <Link to="/favorites" className="text-sm font-semibold text-brand-700">
            去我的收藏
          </Link>
        }
      />
    </div>
  );
}
