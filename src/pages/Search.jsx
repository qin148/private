import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import SearchHitText from "../components/SearchHitText.jsx";
import { runSearch } from "../utils/search.js";
import { getBookById } from "../data/books.js";
import { getBankTypeLabel } from "../data/catalog.js";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const res = runSearch(q);

  const hasAny =
    res.books.length +
      res.chapters.length +
      res.knowledge.length +
      res.questions.length +
      res.templates.length +
      res.mindmaps.length >
    0;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">搜索</h1>
        <p className="mt-2 text-xs text-ink-muted">书籍 / 章节 / 知识点 / 题目 / 模板 / 导图</p>
      </div>
      <SearchBar />

      {!q ? (
        <p className="text-sm text-ink-muted">输入关键词，结果将按类型分组展示。</p>
      ) : !hasAny ? (
        <p className="text-sm text-ink-muted">
          没有找到与「<SearchHitText text={q} query={q} />」相关的内容。
        </p>
      ) : (
        <div className="space-y-5">
          {res.books.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold">书籍</h2>
              <div className="space-y-2">
                {res.books.map((b) => (
                  <Card key={b.id} to={getRegistryBookLink(b.id)} hover className="!p-3">
                    <p className="text-sm font-semibold">
                      <SearchHitText text={b.title} query={q} />
                    </p>
                    <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                      <SearchHitText text={b.description || ""} query={q} />
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {res.chapters.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold">章节</h2>
              <div className="space-y-2">
                {res.chapters.map(({ bookId, chapter: c }) => (
                  <Card key={`${bookId}-${c.id}`} to={`/books/${bookId}/chapters/${c.id}`} hover className="!p-3">
                    <p className="text-sm font-semibold">
                      <SearchHitText text={`第${c.chapterNo}章 ${c.title}`} query={q} />
                    </p>
                    <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                      <SearchHitText text={c.summary || ""} query={q} />
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {res.knowledge.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold">知识点</h2>
              <div className="space-y-2">
                {res.knowledge.map(({ bookId, term: t }) => (
                  <Card key={t.id} to={`/books/${bookId}/terms/${t.id}`} hover className="!p-3">
                    <div className="flex flex-wrap gap-1">
                      <Tag variant="term">名解</Tag>
                      {t.isHighFrequency ? <Tag variant="hot">高频</Tag> : null}
                    </div>
                    <p className="mt-1 text-sm font-semibold">
                      <SearchHitText text={t.title} query={q} />
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {res.questions.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold">题目</h2>
              <div className="space-y-2">
                {res.questions.map((x) => (
                  <Card key={x.id} to={`/bank/${x.id}`} hover className="!p-3">
                    <Tag variant="neutral">{getBankTypeLabel(x.typeKey)}</Tag>
                    <p className="mt-1 text-sm font-semibold">
                      <SearchHitText text={x.title} query={q} />
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {res.templates.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold">模板</h2>
              <div className="space-y-2">
                {res.templates.map((t) => (
                  <Card key={t.id} to={`/templates/${t.id}`} hover className="!p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">
                        <SearchHitText text={t.name} query={q} />
                      </p>
                      <Tag variant="template">模板</Tag>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {res.mindmaps.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold">导图</h2>
              <div className="space-y-2">
                {res.mindmaps.map((m) => (
                  <Card key={m.id} to="/mindmap" hover className="!p-3">
                    <p className="text-sm font-semibold">
                      <SearchHitText text={m.title} query={q} />
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}

function getRegistryBookLink(bookId) {
  const b = getBookById(bookId);
  if (b?.status === "已整理") return `/books/${bookId}`;
  return "/library";
}
