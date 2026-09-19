import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import TeamsPage from './pages/TeamsPage/TeamsPage';
import TeamDetailPage from './pages/TeamDetailPage/TeamDetailPage';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import MatchDetailPage from './pages/MatchDetailPage/MatchDetailPage';
import NewsListPage from './pages/NewsListPage/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';
import StandingsPage from './pages/StandingsPage/StandingsPage';
import FacilitiesPage from './pages/FacilitiesPage/FacilitiesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HighlightsPage from './pages/HighlightsPage/HighlightsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="teams/:slug" element={<TeamDetailPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="matches/:id" element={<MatchDetailPage />} />
        <Route path="news" element={<NewsListPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="standings" element={<StandingsPage />} />
        <Route path="facilities" element={<FacilitiesPage />} />
        <Route path="highlights" element={<HighlightsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}