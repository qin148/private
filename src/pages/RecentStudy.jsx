import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useUserData } from "../context/UserDataContext.jsx";

export default function RecentStudy() {
  const { recent } = useUserData();
  const list = recent || [];

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">最近学习</h1>
      {!list.length ? (
        <EmptyState title="暂无记录" description="打开章节、名解、题目或模板后会自动出现在这里。" />
      ) : (
        <div className="space-y-2">
          {list.map((r, i) => (
            <Card key={`${r.path}-${i}`} to={r.path} hover className="!p-3">
              <p className="text-xs text-ink-muted">{new Date(r.at).toLocaleString()}</p>
              <p className="mt-1 text-sm font-semibold">{r.title}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-ink-muted">{r.type}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
