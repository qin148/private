import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "dglp_favorites_v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { chapters: [], questions: [], templates: [] };
    const parsed = JSON.parse(raw);
    return {
      chapters: Array.isArray(parsed.chapters) ? parsed.chapters : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      templates: Array.isArray(parsed.templates) ? parsed.templates : []
    };
  } catch {
    return { chapters: [], questions: [], templates: [] };
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [state, setState] = useState(() => load());

  useEffect(() => {
    save(state);
  }, [state]);

  const toggleChapter = useCallback((id) => {
    setState((s) => {
      const has = s.chapters.includes(id);
      return {
        ...s,
        chapters: has ? s.chapters.filter((x) => x !== id) : [...s.chapters, id]
      };
    });
  }, []);

  const toggleQuestion = useCallback((id) => {
    setState((s) => {
      const has = s.questions.includes(id);
      return {
        ...s,
        questions: has ? s.questions.filter((x) => x !== id) : [...s.questions, id]
      };
    });
  }, []);

  const toggleTemplate = useCallback((id) => {
    setState((s) => {
      const has = s.templates.includes(id);
      return {
        ...s,
        templates: has ? s.templates.filter((x) => x !== id) : [...s.templates, id]
      };
    });
  }, []);

  const isChapterFav = useCallback((id) => state.chapters.includes(id), [state.chapters]);
  const isQuestionFav = useCallback((id) => state.questions.includes(id), [state.questions]);
  const isTemplateFav = useCallback((id) => state.templates.includes(id), [state.templates]);

  const value = useMemo(
    () => ({
      ...state,
      toggleChapter,
      toggleQuestion,
      toggleTemplate,
      isChapterFav,
      isQuestionFav,
      isTemplateFav
    }),
    [
      state,
      toggleChapter,
      toggleQuestion,
      toggleTemplate,
      isChapterFav,
      isQuestionFav,
      isTemplateFav
    ]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
