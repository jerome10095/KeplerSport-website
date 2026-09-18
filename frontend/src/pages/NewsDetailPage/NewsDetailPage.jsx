import { useParams } from 'react-router-dom';
import { useNewsItem } from '../../hooks/useNews';
import { mediaUrl } from '../../api/client';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { data: item, isLoading, isError } = useNewsItem(slug);

  if (isLoading) return <Loader />;
  if (isError || !item) return <EmptyState title="Article not found" />;

  const img = mediaUrl(item.coverImage?.url);

  return (
    <article className="news-detail container">
      <header>
        <span className="news-detail__cat">{item.category}</span>
        <h1>{item.title}</h1>
        <time>{new Date(item.publishedAt).toLocaleString()}</time>
        {item.author && <span> by {item.author}</span>}
      </header>
      {img && <img className="news-detail__cover" src={img} alt={item.title} />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: item.content }} />
    </article>
  );
}