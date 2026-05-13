import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { PRIMARY_BOOK_ID } from "../constants/app.js";

const STORAGE_KEY = "dtp_user_v2";
const LEGACY_FAV_KEY = "dglp_favorites_v1";

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function defaultState() {
  return {
    favorites: {
      chapters: [],
      terms: [],
      questions: [],
      templates: [],
      mindmaps: []
    },
    recent: [],
    progress: { books: {} },
    outlineOpen: {},
    meta: { activeDays: [] }
  };
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function migrateLegacy(parsed) {
  const base = defaultState();
  const chapters = Array.isArray(parsed.chapters) ? parsed.chapters : [];
  base.favorites.chapters = chapters.map((id) => {
    const sid = String(id);
    return sid.includes(":") ? sid : `${PRIMARY_BOOK_ID}:${sid}`;
  });
  base.favorites.questions = Array.isArray(parsed.questions) ? parsed.questions : [];
  base.favorites.templates = Array.isArray(parsed.templates) ? parsed.templates : [];
  return base;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // JSON 可能是 null / 数组 / 字符串，直接 ... 展开会抛错导致整页白屏
      if (!isPlainObject(parsed)) return defaultState();

      const favIn = isPlainObject(parsed.favorites) ? parsed.favorites : {};
      const progIn = isPlainObject(parsed.progress) ? parsed.progress : {};
      const metaIn = isPlainObject(parsed.meta) ? parsed.meta : {};
      const outlineIn = isPlainObject(parsed.outlineOpen) ? parsed.outlineOpen : {};

      return {
        ...defaultState(),
        ...parsed,
        favorites: {
          ...defaultState().favorites,
          ...favIn,
          chapters: Array.isArray(favIn.chapters) ? favIn.chapters : [],
          terms: Array.isArray(favIn.terms) ? favIn.terms : [],
          questions: Array.isArray(favIn.questions) ? favIn.questions : [],
          templates: Array.isArray(favIn.templates) ? favIn.templates : [],
          mindmaps: Array.isArray(favIn.mindmaps) ? favIn.mindmaps : []
        },
        recent: Array.isArray(parsed.recent) ? parsed.recent : [],
        progress: {
          books: isPlainObject(progIn.books) ? progIn.books : {}
        },
        outlineOpen: outlineIn,
        meta: {
          ...metaIn,
          activeDays: Array.isArray(metaIn.activeDays) ? metaIn.activeDays : []
        }
      };
    }
    const leg = localStorage.getItem(LEGACY_FAV_KEY);
    if (leg) {
      const legParsed = JSON.parse(leg);
      if (!isPlainObject(legParsed)) return defaultState();
      return migrateLegacy(legParsed);
    }
  } catch {
    /* 非法 JSON 或结构异常 */
  }
  return defaultState();
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function chapterKey(bookId, chapterId) {
  return `${bookId}:${chapterId}`;
}

function termKey(bookId, termId) {
  return `${bookId}:${termId}`;
}

function mindKey(mapId, nodeId) {
  return `${mapId}::${nodeId}`;
}

const UserDataContext = createContext(null);

export function UserDataProvider({ children }) {
  const [state, setState] = useState(() => load());

  useEffect(() => {
    save(state);
  }, [state]);

  useEffect(() => {
    const t = todayISO();
    setState((s) => {
      const days = new Set(s.meta?.activeDays || []);
      if (days.has(t)) return s;
      days.add(t);
      return { ...s, meta: { ...s.meta, activeDays: [...days].sort() } };
    });
  }, []);

  const toggleChapterFav = useCallback((bookId, chapterId) => {
    const k = chapterKey(bookId, chapterId);
    setState((s) => {
      const arr = s.favorites.chapters;
      const has = arr.includes(k);
      return {
        ...s,
        favorites: {
          ...s.favorites,
          chapters: has ? arr.filter((x) => x !== k) : [...arr, k]
        }
      };
    });
  }, []);

  const toggleTermFav = useCallback((bookId, termId) => {
    const k = termKey(bookId, termId);
    setState((s) => {
      const arr = s.favorites.terms;
      const has = arr.includes(k);
      return {
        ...s,
        favorites: { ...s.favorites, terms: has ? arr.filter((x) => x !== k) : [...arr, k] }
      };
    });
  }, []);

  const toggleQuestionFav = useCallback((id) => {
    setState((s) => {
      const arr = s.favorites.questions;
      const has = arr.includes(id);
      return {
        ...s,
        favorites: { ...s.favorites, questions: has ? arr.filter((x) => x !== id) : [...arr, id] }
      };
    });
  }, []);

  const toggleTemplateFav = useCallback((id) => {
    setState((s) => {
      const arr = s.favorites.templates;
      const has = arr.includes(id);
      return {
        ...s,
        favorites: { ...s.favorites, templates: has ? arr.filter((x) => x !== id) : [...arr, id] }
      };
    });
  }, []);

  const toggleMindmapFav = useCallback((mapId, nodeId) => {
    const k = mindKey(mapId, nodeId);
    setState((s) => {
      const arr = s.favorites.mindmaps;
      const has = arr.includes(k);
      return {
        ...s,
        favorites: { ...s.favorites, mindmaps: has ? arr.filter((x) => x !== k) : [...arr, k] }
      };
    });
  }, []);

  const isChapterFav = useCallback(
    (bookId, chapterId) => state.favorites.chapters.includes(chapterKey(bookId, chapterId)),
    [state.favorites.chapters]
  );
  const isTermFav = useCallback(
    (bookId, termId) => state.favorites.terms.includes(termKey(bookId, termId)),
    [state.favorites.terms]
  );
  const isQuestionFav = useCallback(
    (id) => state.favorites.questions.includes(id),
    [state.favorites.questions]
  );
  const isTemplateFav = useCallback(
    (id) => state.favorites.templates.includes(id),
    [state.favorites.templates]
  );
  const isMindmapFav = useCallback(
    (mapId, nodeId) => state.favorites.mindmaps.includes(mindKey(mapId, nodeId)),
    [state.favorites.mindmaps]
  );

  const pushRecent = useCallback((entry) => {
    setState((s) => {
      const rest = (s.recent || []).filter(
        (x) => !(x.path === entry.path && x.type === entry.type && x.id === entry.id)
      );
      const next = [{ ...entry, at: Date.now() }, ...rest].slice(0, 40);
      return { ...s, recent: next };
    });
  }, []);

  const markChapterOpened = useCallback((bookId, chapterId) => {
    setState((s) => {
      const pb = s.progress.books[bookId] || { openedChapters: [], viewedTerms: [], viewedQuestions: [] };
      const oc = new Set(pb.openedChapters || []);
      oc.add(chapterId);
      return {
        ...s,
        progress: {
          ...s.progress,
          books: {
            ...s.progress.books,
            [bookId]: { ...pb, openedChapters: [...oc] }
          }
        }
      };
    });
  }, []);

  const markTermViewed = useCallback((bookId, termId) => {
    setState((s) => {
      const pb = s.progress.books[bookId] || { openedChapters: [], viewedTerms: [], viewedQuestions: [] };
      const vt = new Set(pb.viewedTerms || []);
      vt.add(termId);
      return {
        ...s,
        progress: {
          ...s.progress,
          books: {
            ...s.progress.books,
            [bookId]: { ...pb, viewedTerms: [...vt] }
          }
        }
      };
    });
  }, []);

  const markQuestionViewed = useCallback((bookId, questionId) => {
    setState((s) => {
      const pb = s.progress.books[bookId] || { openedChapters: [], viewedTerms: [], viewedQuestions: [] };
      const vq = new Set(pb.viewedQuestions || []);
      vq.add(questionId);
      return {
        ...s,
        progress: {
          ...s.progress,
          books: {
            ...s.progress.books,
            [bookId]: { ...pb, viewedQuestions: [...vq] }
          }
        }
      };
    });
  }, []);

  const getOutlineOpen = useCallback(
    (id) => Boolean(state.outlineOpen?.[id]),
    [state.outlineOpen]
  );
  const setOutlineOpen = useCallback((id, open) => {
    setState((s) => ({
      ...s,
      outlineOpen: { ...s.outlineOpen, [id]: open }
    }));
  }, []);

  const toggleOutlineOpen = useCallback((id) => {
    setState((s) => ({
      ...s,
      outlineOpen: { ...s.outlineOpen, [id]: !s.outlineOpen?.[id] }
    }));
  }, []);

  /** 兼容旧页面：仅传 chapterId 时默认首本书 */
  const toggleChapter = useCallback(
    (chapterIdOrComposite) => {
      if (chapterIdOrComposite.includes(":")) {
        const [bid, cid] = chapterIdOrComposite.split(":");
        toggleChapterFav(bid, cid);
      } else {
        toggleChapterFav(PRIMARY_BOOK_ID, chapterIdOrComposite);
      }
    },
    [toggleChapterFav]
  );

  const isChapterFavLegacy = useCallback(
    (chapterIdOrComposite) => {
      if (chapterIdOrComposite.includes(":")) {
        const [bid, cid] = chapterIdOrComposite.split(":");
        return isChapterFav(bid, cid);
      }
      return isChapterFav(PRIMARY_BOOK_ID, chapterIdOrComposite);
    },
    [isChapterFav]
  );

  const value = useMemo(
    () => ({
      ...state,
      toggleChapterFav,
      toggleTermFav,
      toggleQuestionFav,
      toggleTemplateFav,
      toggleMindmapFav,
      isChapterFav,
      isTermFav,
      isQuestionFav,
      isTemplateFav,
      isMindmapFav,
      pushRecent,
      markChapterOpened,
      markTermViewed,
      markQuestionViewed,
      getOutlineOpen,
      setOutlineOpen,
      toggleOutlineOpen,
      toggleChapter,
      toggleQuestion: toggleQuestionFav,
      toggleTemplate: toggleTemplateFav,
      isQuestionFavLegacy: isQuestionFav,
      isTemplateFavLegacy: isTemplateFav,
      isChapterFavLegacy
    }),
    [
      state,
      toggleChapterFav,
      toggleTermFav,
      toggleQuestionFav,
      toggleTemplateFav,
      toggleMindmapFav,
      isChapterFav,
      isTermFav,
      isQuestionFav,
      isTemplateFav,
      isMindmapFav,
      pushRecent,
      markChapterOpened,
      markTermViewed,
      markQuestionViewed,
      getOutlineOpen,
      setOutlineOpen,
      toggleOutlineOpen,
      toggleChapter,
      isChapterFavLegacy
    ]
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within UserDataProvider");
  return ctx;
}

/** @deprecated 逐步迁移到 useUserData；仍提供旧方法名 */
export function useFavorites() {
  const u = useUserData();
  return {
    chapters: u.favorites.chapters,
    questions: u.favorites.questions,
    templates: u.favorites.templates,
    toggleChapter: u.toggleChapter,
    toggleQuestion: u.toggleQuestionFav,
    toggleTemplate: u.toggleTemplateFav,
    isChapterFav: (id) => u.isChapterFavLegacy(id),
    isQuestionFav: u.isQuestionFav,
    isTemplateFav: u.isTemplateFav
  };
}
