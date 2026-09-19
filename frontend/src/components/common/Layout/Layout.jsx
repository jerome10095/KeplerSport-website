import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LiveTicker from '../../features/LiveTicker/LiveTicker';
import { useAnnouncementsRealtimeSync } from '../../../hooks/useAnnouncements';
import { useMatchRealtimeSync } from '../../../hooks/useLiveMatches';
import { useNewsRealtimeSync } from '../../../hooks/useNews';
import NotificationPrompt from '../../features/NotificationPrompt/NotificationPrompt';

export default function Layout() {
  // Global realtime subscriptions
  useAnnouncementsRealtimeSync();
  useMatchRealtimeSync();
  useNewsRealtimeSync();

  return (
    <>
      <Header />
      <LiveTicker />
      <NotificationPrompt />
      <main style={{ minHeight: '70vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}