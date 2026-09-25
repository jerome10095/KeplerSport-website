import { useEffect, useState } from 'react';

function formatMinute(minutes, seconds) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function LiveClock({ minute = 0, status, updatedAt }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (status !== 'live') return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [status]);

  const display = (() => {
    if (status !== 'live') return formatMinute(minute, 0);
    const elapsed = updatedAt ? Math.max(0, Math.floor((now - new Date(updatedAt).getTime()) / 1000)) : 0;
    const total = minute * 60 + elapsed;
    return formatMinute(Math.floor(total / 60), total % 60);
  })();

  return <span className="live-clock">{display}</span>;
}
