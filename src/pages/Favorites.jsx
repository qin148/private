import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import { getBankTypeLabel, getChapter, getQuestionById, getTemplateById, getTerm, tagForBankType } from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";

function parseChapterKey(k) {
  const [bookId, chapterId] = k.split(":");
  return { bookId, chapterId };
}

function parseTermKey(k) {
  const [bookId, termId] = k.split(":");
  return { bookId, termId };
}

function parseMindKey(k) {
  const [mapId, nodeId] = k.split("::");
  return { mapId, nodeId };
}

export default function Favorites() {
  const u = useUserData();
  const { chapters, terms, questions, templates, mindmaps } = u.favorites;
  const empty = !chapters.length && !terms.length && !questions.length && !templates.length && !mindmaps.length;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">我的收藏</h1>
      <p className="text-xs text-ink-muted">按类型分类 · 点击星标取消</p>

      {empty ? (
        <Card>
          <p className="text-sm text-ink-muted">还没有收藏。在章节、名解、题目、模板或导图节点上点亮星标即可加入。</p>
          <Link className="mt-3 inline-block text-sm font-semibold text-brand-700" to="/">
            回首页
          </Link>
        </Card>
      ) : null}

      {chapters.length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">章节</h2>
          <div className="space-y-2">
            {chapters.map((key) => {
              const { bookId, chapterId } = parseChapterKey(key);
              const c = getChapter(bookId, chapterId);
              if (!c) return null;
              return (
                <Card key={key} className="!p-0">
                  <div className="flex items-stretch">
                    <Link to={`/books/${bookId}/chapters/${chapterId}`} className="min-w-0 flex-1 p-3">
                      <p className="text-sm font-semibold">
                        第{c.chapterNo}章 {c.title}
                      </p>
                    </Link>
                    <div className="flex items-center border-l border-cream-200/80 bg-cream-50/50 px-2">
                      <BookmarkStar size="sm" active onClick={() => u.toggleChapterFav(bookId, chapterId)} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      {terms.length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">名词解释</h2>
          <div className="space-y-2">
            {terms.map((key) => {
              const { bookId, termId } = parseTermKey(key);
              const t = getTerm(bookId, termId);
              if (!t) return null;
              return (
                <Card key={key} className="!p-0">
                  <div className="flex items-stretch">
                    <Link to={`/books/${bookId}/terms/${termId}`} className="min-w-0 flex-1 p-3">
                      <Tag variant="term">名解</Tag>
                      <p className="mt-1 text-sm font-semibold">{t.title}</p>
                    </Link>
                    <div className="flex items-center border-l border-cream-200/80 bg-cream-50/50 px-2">
                      <BookmarkStar size="sm" active onClick={() => u.toggleTermFav(bookId, termId)} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      {questions.length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">题目</h2>
          <div className="space-y-2">
            {questions.map((id) => {
              const q = getQuestionById(id);
              if (!q) return null;
              return (
                <Card key={id} className="!p-0">
                  <div className="flex items-stretch">
                    <Link to={`/bank/${id}`} className="min-w-0 flex-1 p-3">
                      <Tag variant={tagForBankType(q.typeKey)}>{getBankTypeLabel(q.typeKey)}</Tag>
                      <p className="mt-1 text-sm font-semibold leading-snug">{q.title}</p>
                    </Link>
                    <div className="flex items-center border-l border-cream-200/80 bg-cream-50/50 px-2">
                      <BookmarkStar size="sm" active onClick={() => u.toggleQuestionFav(id)} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      {templates.length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">答题模板</h2>
          <div className="space-y-2">
            {templates.map((id) => {
              const t = getTemplateById(id);
              if (!t) return null;
              return (
                <Card key={id} className="!p-0">
                  <div className="flex items-stretch">
                    <Link to={`/templates/${id}`} className="min-w-0 flex-1 p-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{t.name}</p>
                        <Tag variant="template">模板</Tag>
                      </div>
                    </Link>
                    <div className="flex items-center border-l border-cream-200/80 bg-cream-50/50 px-2">
                      <BookmarkStar size="sm" active onClick={() => u.toggleTemplateFav(id)} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      {mindmaps.length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">思维导图节点</h2>
          <div className="space-y-2">
            {mindmaps.map((key) => {
              const { mapId, nodeId } = parseMindKey(key);
              return (
                <Card key={key} className="!p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-ink-muted">
                      导图 <span className="font-mono text-xs">{mapId}</span> · 节点{" "}
                      <span className="font-mono text-xs">{nodeId}</span>
                    </p>
                    <BookmarkStar size="sm" active onClick={() => u.toggleMindmapFav(mapId, nodeId)} />
                  </div>
                  <Link to="/mindmap" className="mt-2 inline-block text-xs font-semibold text-brand-700">
                    打开导图页 →
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
