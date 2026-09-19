import { useEffect, useState } from 'react';
import { usePushNotifications } from '../../../hooks/usePushNotifications';

const DISMISS_KEY = 'kepler_push_dismissed';

export default function NotificationPrompt() {
  const { supported, subscribed, register } = usePushNotifications();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => setDismissed(localStorage.getItem(DISMISS_KEY) === 'true'), []);
  if (!supported || subscribed || dismissed) return null;

  async function enable() {
    if (!(await register())) dismiss();
  }
  function dismiss() { localStorage.setItem(DISMISS_KEY, 'true'); setDismissed(true); }

  return <aside className="notif-prompt"><button className="notif-prompt__close" onClick={dismiss} aria-label="Dismiss">×</button><strong>Never miss a moment</strong><p>Get live score updates and highlights in your browser.</p><div className="notif-prompt__actions"><button className="btn btn--primary btn--small" onClick={enable}>Enable notifications</button><button className="btn btn--small" onClick={dismiss}>Not now</button></div></aside>;
}
