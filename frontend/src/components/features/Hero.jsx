const SITE_NAME = import.meta.env.VITE_SITE_NAME;

function Hero() {
  return (
    <section className="hero-banner">
      <h1>{SITE_NAME}</h1>
      <p>Follow every team, athlete, and game in one place.</p>
    </section>
  );
}

export default Hero;
