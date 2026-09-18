import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <div>
          <h2>Beyond the game</h2>
          <p>Explore our facilities, meet our coaches, and see what it means to be a Kepler athlete.</p>
        </div>
        <Link to="/facilities" className="btn btn--primary">Explore Facilities</Link>
      </div>
    </section>
  );
}