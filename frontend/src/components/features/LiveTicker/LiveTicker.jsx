import { useAnnouncements } from '../../../hooks/useAnnouncements';

export default function LiveTicker() {
  const { data: items, isLoading } = useAnnouncements();

  const announcements = Array.isArray(items)
    ? items
    : Array.isArray(items?.data)
      ? items.data
      : [];

  if (isLoading || announcements.length === 0) return null;

  const text = announcements.map((item) => item.message ?? item.title ?? '').filter(Boolean).join('  •  ');
  if (!text) return null;

  return (
    <div className="ticker">
      <div className="ticker__badge">LIVE</div>
      <div className="ticker__track">
        <span className="ticker__text">{text}</span>
      </div>
    </div>
  );
}