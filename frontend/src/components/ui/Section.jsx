export default function Section({ title, subtitle, actions, children }) {
  return (
    <section className="section">
      <div className="container">
        {(title || subtitle) && (
          <header className="section__head">
            <div>
              {title && <h2 className="section__title">{title}</h2>}
              {subtitle && <p className="section__subtitle">{subtitle}</p>}
            </div>
            {actions}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}