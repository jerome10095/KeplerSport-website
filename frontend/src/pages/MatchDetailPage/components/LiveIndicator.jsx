import { useEffect, useState } from 'react';

export default function LiveIndicator({ status, updatedAt }) {
  const [ago, setAgo] = useState('just now');

  useEffect(() => {
    if (!updatedAt) return undefined;
    const update = () => {
      const seconds = Math.max(0, Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000));
      setAgo(seconds < 5 ? 'just now' : seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ago`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [updatedAt]);

  if (!['live', 'halftime'].includes(status)) return null;
  return <div className={`live-indicator${status === 'halftime' ? ' live-indicator--halftime' : ''}`}><span className="live-indicator__dot" /><strong>{status === 'live' ? 'LIVE' : 'HALFTIME'}</strong><span className="live-indicator__ago">updated {ago}</span></div>;
}
