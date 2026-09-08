import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import TeamsPage from './pages/TeamsPage';
import SchedulePage from './pages/SchedulePage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="news" element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
