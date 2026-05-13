import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import HighlightText from "../components/HighlightText.jsx";
import RandomLimitCard from "../components/RandomLimitCard.jsx";
import { bankQuestionTypes, getAllQuestions, getTemplateById, PRIMARY_BOOK_ID } from "../data/catalog.js";
import { useUser } from "../hooks/useUser.js";

function pickRandom(list) {
  if (!list.length) return null;
  const i = Math.floor(Math.random() * list.length);
  return list[i];
}

export default function RandomQuestion() {
  const [params] = useSearchParams();
  const bookId = params.get("book") || PRIMARY_BOOK_ID;
  const [typeKey, setTypeKey] = useState("all");
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const { canDrawRandom, recordRandomDraw, remainingRandom, role, freeRandomDailyLimit } = useUser();

  const pool = useMemo(() => {
    const all = getAllQuestions().filter((q) => q.bookId === bookId);
    if (typeKey === "all") return all;
    return all.filter((q) => q.typeKey === typeKey);
  }, [typeKey, bookId]);

  function draw() {
    if (role === "free" && !canDrawRandom) return;
    if (!pool.length) return;
    setShow(false);
    const next = pickRandom(pool);
    setCurrent(next);
    if (role === "free" && next) recordRandomDraw();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">随机抽题</h1>
        <p className="mt-1 text-xs text-ink-muted">题型筛选 · 碎片刷题 · 可跳转详情</p>
        {role === "free" ? (
          <p className="mt-2 text-[11px] text-ink-muted">
            今日免费随机次数：剩余 {remainingRandom} / {freeRandomDailyLimit}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setTypeKey("all");
            setCurrent(null);
            setShow(false);
          }}
          className={
            "rounded-full border px-3 py-1.5 text-xs font-medium " +
            (typeKey === "all"
              ? "border-brand-600/40 bg-brand-50 text-brand-900"
              : "border-cream-300/90 bg-white/70 text-ink-muted")
          }
        >
          全部题型
        </button>
        {bankQuestionTypes.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setTypeKey(t.key);
              setCurrent(null);
              setShow(false);
            }}
            className={
              "rounded-full border px-3 py-1.5 text-xs font-medium " +
              (typeKey === t.key
                ? "border-brand-600/40 bg-brand-50 text-brand-900"
                : "border-cream-300/90 bg-white/70 text-ink-muted")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {role === "free" && !canDrawRandom ? (
        <RandomLimitCard />
      ) : (
        <button
          type="button"
          onClick={draw}
          className="w-full rounded-3xl bg-gradient-to-r from-brand-700 to-amber-600 py-3 text-sm font-semibold text-white shadow-card active:scale-[0.99]"
        >
          抽一题
        </button>
      )}

      {!pool.length ? (
        <p className="text-sm text-ink-muted">该筛选下暂无题目。</p>
      ) : null}

      {current ? (
        <Card>
          <div className="flex flex-wrap gap-1">
            <Tag variant="neutral">{bankQuestionTypes.find((x) => x.key === current.typeKey)?.label}</Tag>
            {current.isHighFrequency ? <Tag variant="hot">高频</Tag> : null}
          </div>
          <p className="mt-3 text-[16px] font-semibold leading-snug">{current.title}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="rounded-full border border-cream-300/90 bg-white px-4 py-2 text-xs font-semibold text-ink"
            >
              {show ? "隐藏答案" : "查看答案"}
            </button>
            <Link
              to={`/bank/${current.id}`}
              className="rounded-full border border-brand-200/80 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-900"
            >
              打开详情页
            </Link>
          </div>
          {show ? (
            <div className="mt-4 space-y-3 border-t border-cream-200/80 pt-4">
              <div>
                <p className="text-xs font-semibold text-ink-muted">精简背诵版</p>
                <p className="mt-1 text-sm leading-relaxed">
                  <HighlightText text={current.compact} />
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-muted">答题结构</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  <HighlightText text={current.structure} />
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-ink-muted">推荐答题模板</p>
                <div className="space-y-2">
                  {(current.relatedTemplateIds || []).map((tid) => {
                    const tpl = getTemplateById(tid);
                    if (!tpl) return null;
                    return (
                      <Link
                        key={tid}
                        to={`/templates/${tid}`}
                        className="block rounded-xl border border-amber-200/70 bg-amber-50/50 px-3 py-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-ink">{tpl.name}</span>
                          <Tag variant="template">模板</Tag>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{tpl.shortAnswer}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </Card>
      ) : (
        <p className="text-center text-sm text-ink-muted">点击「抽一题」开始。</p>
      )}
    </div>
  );
}
