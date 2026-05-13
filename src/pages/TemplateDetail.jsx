import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import HighlightText from "../components/HighlightText.jsx";
import { examTemplateCategories, getTemplateById } from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";

export default function TemplateDetail() {
  const { templateId } = useParams();
  const tpl = getTemplateById(templateId);
  const { pushRecent, toggleTemplateFav, isTemplateFav } = useUserData();

  useEffect(() => {
    if (!tpl) return;
    pushRecent({
      type: "template",
      id: tpl.id,
      bookId: tpl.bookId,
      title: tpl.name,
      path: `/templates/${tpl.id}`
    });
  }, [tpl, pushRecent]);

  if (!tpl) {
    return (
      <p className="text-sm text-ink-muted">
        未找到模板。
        <Link className="text-brand-700 underline" to="/templates">
          返回列表
        </Link>
      </p>
    );
  }

  const catLabel = examTemplateCategories.find((c) => c.key === tpl.categoryKey)?.label;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to="/templates" className="text-xs font-medium text-brand-700">
            ← 模板库
          </Link>
          <div className="mt-2 flex flex-wrap gap-1">
            <Tag variant="template">答题模板</Tag>
            {catLabel ? <Tag variant="neutral">{catLabel}</Tag> : null}
          </div>
          <h1 className="mt-2 text-xl font-bold leading-snug">
            <HighlightText text={tpl.name} />
          </h1>
        </div>
        <BookmarkStar active={isTemplateFav(tpl.id)} onClick={() => toggleTemplateFav(tpl.id)} />
      </div>

      <Card>
        <p className="text-xs font-semibold text-ink-muted">适用题目</p>
        <p className="mt-1 text-sm leading-relaxed">
          <HighlightText text={tpl.applicableQuestions} />
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {(tpl.applicableTypes || []).map((t) => (
            <Tag key={t} variant="essay">
              {t}
            </Tag>
          ))}
        </div>
        {tpl.applicableScene ? (
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            <span className="font-semibold text-ink">适用场景：</span>
            {tpl.applicableScene}
          </p>
        ) : null}
      </Card>

      <section>
        <h2 className="mb-2 text-sm font-semibold">答题结构</h2>
        <Card>
          <ol className="list-none space-y-2 text-sm leading-relaxed text-ink-muted">
            {(tpl.structure || []).map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-semibold text-brand-800">
                  {["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"][i] || `${i + 1}.`}
                </span>
                <span>
                  <HighlightText text={step} />
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">常用句式</h2>
        <Card>
          <ul className="space-y-2 text-sm leading-relaxed text-ink-muted">
            {(tpl.patterns || []).map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brand-700">-</span>
                <HighlightText text={p} />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">关键词填空区</h2>
        <Card>
          <ul className="space-y-1.5 text-sm">
            {(tpl.blanks || []).map((b, i) => (
              <li key={i} className="rounded-xl bg-cream-50/90 px-3 py-2 font-medium text-ink">
                <HighlightText text={b} />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">示例题目</h2>
        <div className="space-y-2">
          {(tpl.exampleQuestions || []).map((ex, i) => (
            <Card key={i} className="!p-3">
              <p className="text-sm">
                <HighlightText text={ex} />
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">精简版答案</h2>
        <Card>
          <p className="text-sm leading-relaxed">
            <HighlightText text={tpl.shortAnswer} />
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">展开版答案</h2>
        <Card>
          <p className="text-sm leading-relaxed text-ink-muted">
            <HighlightText text={tpl.longAnswer} />
          </p>
        </Card>
      </section>

      {tpl.migrateUsage ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">可迁移使用说明</h2>
          <Card>
            <p className="text-sm leading-relaxed text-ink-muted">
              <HighlightText text={tpl.migrateUsage} />
            </p>
          </Card>
        </section>
      ) : null}
    </div>
  );
}
