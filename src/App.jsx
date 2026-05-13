import { Routes, Route, Navigate, useParams } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import BookLibrary from "./pages/BookLibrary.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import BookChapterList from "./pages/BookChapterList.jsx";
import BookChapterDetail from "./pages/BookChapterDetail.jsx";
import TermDetail from "./pages/TermDetail.jsx";
import BookKeywords from "./pages/BookKeywords.jsx";
import BookTimelines from "./pages/BookTimelines.jsx";
import QuestionBank from "./pages/QuestionBank.jsx";
import QuestionDetail from "./pages/QuestionDetail.jsx";
import TemplateList from "./pages/TemplateList.jsx";
import TemplateDetail from "./pages/TemplateDetail.jsx";
import Mindmap from "./pages/Mindmap.jsx";
import OutlineMode from "./pages/OutlineMode.jsx";
import RandomQuestion from "./pages/RandomQuestion.jsx";
import Profile from "./pages/Profile.jsx";
import Membership from "./pages/Membership.jsx";
import Favorites from "./pages/Favorites.jsx";
import RecentStudy from "./pages/RecentStudy.jsx";
import LearningProgress from "./pages/LearningProgress.jsx";
import ReviewPlaceholder from "./pages/ReviewPlaceholder.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import HotTopics from "./pages/HotTopics.jsx";
import Search from "./pages/Search.jsx";
import { PRIMARY_BOOK_ID } from "./constants/app.js";

function LegacyChapterRedirect() {
  const { chapterId } = useParams();
  return <Navigate to={`/books/${PRIMARY_BOOK_ID}/chapters/${chapterId}`} replace />;
}

function LegacyQuestionRedirect() {
  const { questionId } = useParams();
  return <Navigate to={`/bank/${questionId}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<BookLibrary />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/books/:bookId/chapters" element={<BookChapterList />} />
        <Route path="/books/:bookId/chapters/:chapterId" element={<BookChapterDetail />} />
        <Route path="/books/:bookId/terms/:termId" element={<TermDetail />} />
        <Route path="/books/:bookId/keywords" element={<BookKeywords />} />
        <Route path="/books/:bookId/timelines" element={<BookTimelines />} />
        <Route path="/bank" element={<QuestionBank />} />
        <Route path="/bank/:questionId" element={<QuestionDetail />} />
        <Route path="/templates" element={<TemplateList />} />
        <Route path="/templates/:templateId" element={<TemplateDetail />} />
        <Route path="/mindmap" element={<Mindmap />} />
        <Route path="/outline" element={<OutlineMode />} />
        <Route path="/random" element={<RandomQuestion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recent" element={<RecentStudy />} />
        <Route path="/progress" element={<LearningProgress />} />
        <Route path="/review" element={<ReviewPlaceholder />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/hot" element={<HotTopics />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chapters" element={<Navigate to={`/books/${PRIMARY_BOOK_ID}/chapters`} replace />} />
        <Route path="/chapters/:chapterId" element={<LegacyChapterRedirect />} />
        <Route path="/questions" element={<Navigate to="/bank" replace />} />
        <Route path="/questions/:questionId" element={<LegacyQuestionRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
