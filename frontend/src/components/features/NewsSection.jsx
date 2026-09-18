import { Link } from 'react-router-dom';
import { useNews } from '../../hooks/useNews';
import { mediaUrl } from '../../api/client';
import Loader from '../common/Loader/Loader';
import EmptyState from '../common/EmptyState/EmptyState';

export default function NewsSection({ limit = 3 }) {
  const { data, isLoading, isError } = useNews({ 'pagination[pageSize]': limit });
  const items = data?.data || [];

  if (isLoading) return <Loader text="Loading news…" />;
  if (isError) return <EmptyState title="Couldn't load news" />;
  if (items.length === 0) return <EmptyState title="No news yet" message="Updates will appear here as soon as they're published." />;

  return (
    <div className="news-grid">
      {items.map((n) => {
        const img = mediaUrl(n.coverImage?.url);
        return (
          <article key={n.id} className="news-card">
            <Link to={`/news/${n.slug}`}>
              {img && <img src={img} alt={n.title} />}
              <div className="news-card__body">
                <span className="news-card__cat">{n.category}</span>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
                <time>{new Date(n.publishedAt).toLocaleDateString()}</time>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}