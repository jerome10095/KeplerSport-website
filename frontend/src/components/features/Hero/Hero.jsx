import { Link } from 'react-router-dom';
import { useGlobal } from '../../../hooks/useGlobal';
import { mediaUrl } from '../../../api/client';

export default function Hero() {
  const { data: global } = useGlobal();
  const slides = global?.heroSlides || [];
  const first = slides[0] || {};
  const image = mediaUrl(first.image?.url) || first.imageUrl;

  return (
    <section className="hero" style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className="hero__overlay" />
      <div className="container hero__inner">
        <h1 className="hero__title">{first.title || 'Fuel your game'}</h1>
        <p className="hero__subtitle">
          {first.subtitle || 'Live scores, teams, schedules — everything Kepler Sports, in real time.'}
        </p>
        <div className="hero__actions">
          <Link to="/teams" className="btn btn--primary">View Teams</Link>
          <Link to="/schedule" className="btn btn--ghost">Schedule</Link>
        </div>
      </div>
    </section>
  );
}