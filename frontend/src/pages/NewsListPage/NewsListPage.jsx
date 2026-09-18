import Section from '../../components/ui/Section';
import NewsSection from '../../components/features/NewsSection';

export default function NewsListPage() {
  return (
    <Section title="News & Updates" subtitle="Latest from Kepler Sports">
      <NewsSection limit={24} />
    </Section>
  );
}