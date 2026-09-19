import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardHome from './pages/DashboardHome';
import TeamsPage from './pages/TeamsPage';
import TeamEditorPage from './pages/TeamEditorPage';
import MatchesPage from './pages/MatchesPage';
import StandingsPage from './pages/StandingsPage';
import NewsPage from './pages/NewsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import MediaLibraryPage from './pages/MediaLibraryPage';
import SettingsPage from './pages/SettingsPage';
import AuditLogPage from './pages/AuditLogPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return <AuthProvider><Routes><Route path="/login" element={<LoginPage />} /><Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}><Route index element={<DashboardHome />} /><Route path="teams" element={<TeamsPage />} /><Route path="teams/new" element={<TeamEditorPage />} /><Route path="teams/:id" element={<TeamEditorPage />} /><Route path="matches" element={<MatchesPage />} /><Route path="standings" element={<StandingsPage />} /><Route path="news" element={<NewsPage />} /><Route path="announcements" element={<AnnouncementsPage />} /><Route path="facilities" element={<FacilitiesPage />} /><Route path="media" element={<MediaLibraryPage />} /><Route path="settings" element={<SettingsPage />} /><Route path="audit-log" element={<AuditLogPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes></AuthProvider>;
}
