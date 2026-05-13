import { Link, useParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import { getTimelinesForBook } from "../data/catalog.js";

export default function BookTimelines() {
  const { bookId } = useParams();
  const tls = getTimelinesForBook(bookId);

  return (
    <div className="space-y-4">
      <Link to={`/books/${bookId}`} className="text-xs font-medium text-brand-700">
        ← 书籍主页
      </Link>
      <h1 className="text-lg font-bold">时间线</h1>
      <div className="space-y-4">
        {tls.map((tl) => (
          <Card key={tl.id} id={tl.id} className="scroll-mt-24">
            <h2 className="text-sm font-semibold">{tl.title}</h2>
            <div className="mt-3 space-y-2 border-l-2 border-brand-200/80 pl-3">
              {(tl.periods || []).map((p, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full bg-brand-600/80" />
                  <p className="text-sm font-medium text-ink">{p.label}</p>
                  <p className="text-xs text-ink-muted">{p.hint}</p>
                  {p.chapterId ? (
                    <Link className="mt-1 inline-block text-xs font-semibold text-brand-700" to={`/books/${bookId}/chapters/${p.chapterId}`}>
                      相关章节 →
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
