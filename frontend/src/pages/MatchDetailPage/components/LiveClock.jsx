import { useEffect, useState } from 'react';

function formatMinute(minutes, seconds) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function LiveClock({ minute = 0, status, updatedAt }) {
  const [display, setDisplay] = useState(formatMinute(minute, 0));

  useEffect(() => {
    if (status !== 'live') {
      setDisplay(formatMinute(minute, 0));
      return undefined;
    }
    const tick = () => {
      const elapsed = updatedAt ? Math.max(0, Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000)) : 0;
      const total = minute * 60 + elapsed;
      setDisplay(formatMinute(Math.floor(total / 60), total % 60));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [minute, status, updatedAt]);

  return <span className="live-clock">{display}</span>;
}
