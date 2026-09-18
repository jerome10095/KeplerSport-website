import Hero from '../../components/features/Hero/Hero';
import TeamGrid from '../../components/features/TeamGrid/TeamGrid';
import CTABanner from '../../components/features/CTABanner';
import NewsFeed from '../../components/features/NewsFeed/NewsFeed';
import { useTeams } from '../../hooks/useTeams';
import LiveMatchesStrip from '../../components/features/LiveMatchesStrip/LiveMatchesStrip';

function HomePage() {
  const { data: teams, isLoading } = useTeams();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Hero />
      <LiveMatchesStrip />
      <TeamGrid teams={teams} />
      <CTABanner />
      <NewsFeed />
    </>
  );
}

export default HomePage;
