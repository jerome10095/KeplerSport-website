import { useQuery } from '@tanstack/react-query';
import apiClient, { mediaUrl } from '../../api/client';
import Section from '../../components/ui/Section';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';

export default function FacilitiesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data } = await apiClient.get('/facilities', {
        params: { 'populate[images]': 'true' },
      });
      return data.data;
    },
  });

  return (
    <Section title="Facilities" subtitle="Explore our sports venues">
      {isLoading ? <Loader /> : (
        data?.length ? (
          <div className="facility-grid">
            {data.map((f) => (
              <div key={f.id} className="facility-card">
                {f.images?.[0]?.url && (
                  <img src={mediaUrl(f.images[0].url)} alt={f.name} />
                )}
                <h3>{f.name}</h3>
                <span>{f.type} · Capacity {f.capacity}</span>
                {f.description && (
                  <div className="prose" dangerouslySetInnerHTML={{ __html: f.description }} />
                )}
              </div>
            ))}
          </div>
        ) : <EmptyState title="No facilities yet" />
      )}
    </Section>
  );
}