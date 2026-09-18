import { useAnnouncements } from '../../../hooks/useAnnouncements';

export default function LiveTicker() {
  const { data: items, isLoading } = useAnnouncements();

  if (isLoading || !items || items.length === 0) return null;

  const text = items.map((i) => i.message).join('  •  ');

  return (
    <div className="ticker">
      <div className="ticker__badge">LIVE</div>
      <div className="ticker__track">
        <span className="ticker__text">{text}</span>
      </div>
    </div>
  );
}