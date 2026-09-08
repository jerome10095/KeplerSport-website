import Hero from '../../components/features/Hero';
import SportsGrid from '../../components/features/SportsGrid';
import CTABanner from '../../components/features/CTABanner';
import NewsSection from '../../components/features/NewsSection';
import { useTeams } from '../../hooks/useTeams';

function HomePage() {
  const { data: teams, isLoading } = useTeams();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Hero />
      <SportsGrid teams={teams} />
      <CTABanner />
      <NewsSection />
    </>
  );
}

export default HomePage;
