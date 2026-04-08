import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParallaxHero from '../components/ParallaxHero';
import { assetPath } from '../utils/assetPath';

/* ── Reveal Hook ── */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const RevealSection = ({ children, className = '', delay = 0 }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const Universe = () => {
  const { t } = useTranslation();

  /* ── Character Data ── */
  const heroDuos = [
    {
      land: 'Harmonia',
      landIcon: '🎵',
      landColor: '#d4a843',
      duo: ['Kenji', 'Aiko'],
      chars: ['KENJI', 'AIKO'],
      focus: t('universe.lands.Harmonia.focus'),
      desc: t('universe.lands.Harmonia.desc'),
    },
    {
      land: 'Numeria',
      landIcon: '🔢',
      landColor: '#7fb685',
      duo: ['Kwame', 'Octavia'],
      chars: ['KWAME', 'OCTAVIA'],
      focus: t('universe.lands.Numeria.focus'),
      desc: t('universe.lands.Numeria.desc'),
    },
    {
      land: 'Vitalis',
      landIcon: '🤸',
      landColor: '#c4785a',
      duo: ['Felix', 'Amara'],
      chars: ['FELIX', 'AMARA'],
      focus: t('universe.lands.Vitalis.focus'),
      desc: t('universe.lands.Vitalis.desc'),
    },
    {
      land: 'Chronia',
      landIcon: '⏰',
      landColor: '#9678c4',
      duo: ['Elias', 'Selene'],
      chars: ['ELIAS', 'SELENE'],
      groupShot: `${import.meta.env.BASE_URL}assets/duos/Celestia_Elias_Selene.jpg`,
      focus: t('universe.lands.Chronia.focus'),
      desc: t('universe.lands.Chronia.desc'),
    },
    {
      land: 'Lexiconia',
      landIcon: '📖',
      landColor: '#d4a843',
      duo: ['Ronan', 'Nerissa'],
      chars: ['RONAN', 'NERISSA'],
      groupShot: `${import.meta.env.BASE_URL}assets/duos/Aquaria_Ronan_Nerissa.jpg`,
      focus: t('universe.lands.Lexiconia.focus'),
      desc: t('universe.lands.Lexiconia.desc'),
    },
    {
      land: 'Geometria',
      landIcon: '📐',
      landColor: '#7fb685',
      duo: ['Silas', 'Vesta'],
      chars: ['SILAS', 'VESTA'],
      focus: t('universe.lands.Geometria.focus'),
      desc: t('universe.lands.Geometria.desc'),
    },
    {
      land: 'Natura',
      landIcon: '🌊',
      landColor: '#5ba4c9',
      duo: ['Ezra', 'Athena'],
      chars: ['EZRA', 'ATHENA'],
      groupShot: `${import.meta.env.BASE_URL}assets/duos/Luminosity_Athena_Ezra.jpg`,
      focus: t('universe.lands.Natura.focus'),
      desc: t('universe.lands.Natura.desc'),
    },
  ];

  const pedagogyMethods = [
    {
      name: t('universe.pedagogy.Dalcroze.name'),
      desc: t('universe.pedagogy.Dalcroze.desc'),
      icon: '💃',
    },
    {
      name: t('universe.pedagogy.Orff.name'),
      desc: t('universe.pedagogy.Orff.desc'),
      icon: '🥁',
    },
    {
      name: t('universe.pedagogy.Kodaly.name'),
      desc: t('universe.pedagogy.Kodaly.desc'),
      icon: '🎶',
    },
  ];

  const [activeDuo, setActiveDuo] = useState(null);
  const duosGridRef = useRef(null);

  const scrollToLand = (landName) => {
    const index = heroDuos.findIndex(d => d.land === landName);
    if (index !== -1) {
      setActiveDuo(index);
      setTimeout(() => {
        duosGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="universe-page">
      {/* ── Hero ── */}
      <header className="universe-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <ParallaxHero variant="universe" />
        <div className="container">
          <div className="universe-hero__content animate-fade-up text-center" style={{ position: 'relative', zIndex: 2 }}>
            {/* Local text scrim — gives breathing room above the Spline globe */}
            <div style={{
              position: 'absolute',
              inset: '-2rem -3rem',
              background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(250,248,243,0.72) 0%, transparent 100%)',
              borderRadius: '2rem',
              zIndex: -1,
              pointerEvents: 'none',
            }} aria-hidden="true" />
            <div className="section-label">{t('universe.hero_label')}</div>
            <h1>
              {t('universe.hero_title_1')}{' '}
              <span className="text-gold">{t('universe.hero_title_2')}</span>
            </h1>
            <p className="section-subtitle" style={{ margin: '1rem auto', position: 'relative', zIndex: 2 }}>
              {t('universe.hero_subtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* ── Seriphia ── */}
      <section className="section glow-plum">
        <div className="container">
          <RevealSection>
            <div className="seriphia-block">
              <div className="seriphia-block__image">
                <img
                  src={`${import.meta.env.BASE_URL}assets/characters/SERIPHIA.jpg`}
                  alt="Seriphia — the guardian of the Seven Lands"
                  className="seriphia-portrait"
                />
              </div>
              <div className="seriphia-block__text">
                <span className="section-label">{t('universe.seriphia_label')}</span>
                <h2>{t('universe.seriphia_title')}</h2>
                <p className="accent-text" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                  {t('universe.seriphia_subtitle')}
                </p>
                <p>
                  {t('universe.seriphia_desc_1')}
                </p>
                <p style={{ marginTop: '1rem' }}>
                  {t('universe.seriphia_desc_2')}
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Global Sound Map ── */}
      <section className="section">
        <div className="container text-center">
          <RevealSection>
            <div className="section-label">{t('universe.map_label')}</div>
            <h2 className="section-title">{t('universe.map_title')}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem auto' }}>
              {t('universe.map_subtitle')}
            </p>
            <div className="map-container">
              <div className="map-glow-ring" />
              <div className="map-float-wrapper">
                <div className="map-image map-image--placeholder" aria-label="Seven Lands Map">🗺️</div>
                {/* Animated land pins */}
                {[
                  { land: 'Harmonia', color: '#d4a843', top: '28%', left: '18%', delay: '0s' },
                  { land: 'Numeria', color: '#7fb685', top: '22%', left: '42%', delay: '0.3s' },
                  { land: 'Vitalis', color: '#c4785a', top: '35%', left: '65%', delay: '0.6s' },
                  { land: 'Chronia', color: '#9678c4', top: '55%', left: '78%', delay: '0.9s' },
                  { land: 'Lexiconia', color: '#d4a843', top: '65%', left: '55%', delay: '1.2s' },
                  { land: 'Geometria', color: '#7fb685', top: '58%', left: '30%', delay: '1.5s' },
                  { land: 'Natura', color: '#5ba4c9', top: '45%', left: '12%', delay: '1.8s' },
                ].map((pin) => (
                  <div
                    key={pin.land}
                    className="map-pin"
                    style={{
                      top: pin.top,
                      left: pin.left,
                      '--pin-color': pin.color,
                      animationDelay: pin.delay,
                      cursor: 'pointer'
                    }}
                    title={t('universe.map_pin_title', { land: pin.land })}
                    onClick={() => scrollToLand(pin.land)}
                  >
                    <span className="map-pin__dot" />
                    <span className="map-pin__pulse" />
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Featured Duo Spotlights ── */}
      <section className="section glow-plum">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">✨ Featured Duos</div>
            <h2 className="section-title">
              Together They <span className="text-plum">Learn</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
              Three iconic duos, three legendary lands — each pair bringing their unique gifts to the Quest.
            </p>
          </RevealSection>

          <div className="duo-spotlight-grid">
            {heroDuos.filter(d => d.groupShot).map((duo, i) => (
              <RevealSection key={duo.land} delay={i * 0.15}>
                <div
                  className="duo-spotlight-card glass-card"
                  style={{ '--spotlight-color': duo.landColor }}
                >
                  <div className="duo-spotlight-card__img-wrap">
                    <img
                      src={duo.groupShot}
                      alt={`${duo.duo[0]} and ${duo.duo[1]} from ${duo.land}`}
                      className="duo-spotlight-card__img"
                    />
                    <div className="duo-spotlight-card__overlay">
                      <span className="duo-spotlight-card__land-icon">{duo.landIcon}</span>
                      <span className="duo-spotlight-card__land" style={{ color: duo.landColor }}>{duo.land}</span>
                    </div>
                  </div>
                  <div className="duo-spotlight-card__body">
                    <h3 className="duo-spotlight-card__names" style={{ color: duo.landColor }}>
                      {duo.duo[0]} &amp; {duo.duo[1]}
                    </h3>
                    <p className="duo-spotlight-card__focus">{duo.focus}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 Lands & Hero Duos ── */}
      <section className="section glow-sage">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('universe.lands_label')}</div>
            <h2 className="section-title">
              {t('universe.lands_title_1')} <span className="text-sage">{t('universe.lands_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
              {t('universe.lands_subtitle')}
            </p>
          </RevealSection>

          <div className="duos-grid" ref={duosGridRef}>
            {heroDuos.map((duo, i) => (
              <RevealSection key={duo.land} delay={i * 0.1}>
                <div
                  className={`duo-card glass-card ${activeDuo === i ? 'duo-card--active' : ''}`}
                  onClick={() => setActiveDuo(activeDuo === i ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeDuo === i}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveDuo(activeDuo === i ? null : i)}
                >
                  <div className="duo-card__header">
                    <span className="duo-card__land-icon">{duo.landIcon}</span>
                    <div>
                      <h3 style={{ color: duo.landColor }}>{duo.land}</h3>
                      <span className="duo-card__focus">{duo.focus}</span>
                    </div>
                  </div>

                  <div className="duo-card__image-wrap">
                    <div className="duo-card__char-pair">
                      <img
                        src={`${import.meta.env.BASE_URL}assets/characters/${duo.chars[0]}.jpg`}
                        alt={duo.duo[0]}
                        className="duo-card__char-img"
                      />
                      <img
                        src={`${import.meta.env.BASE_URL}assets/characters/${duo.chars[1]}.jpg`}
                        alt={duo.duo[1]}
                        className="duo-card__char-img"
                      />
                    </div>
                  </div>
                  <p className="duo-card__names">{duo.duo.join(' & ')}</p>

                  {activeDuo === i && (
                    <p className="duo-card__desc animate-fade-in">{duo.desc}</p>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pedagogy ── */}
      <section className="section">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('universe.science_label')}</div>
            <h2 className="section-title">
              {t('universe.science_title_1')} <span className="text-plum">{t('universe.science_title_2')}</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 3rem auto' }}>
              {t('universe.science_subtitle')}
            </p>
          </RevealSection>

          <div className="pedagogy-grid">
            {pedagogyMethods.map((m, i) => (
              <RevealSection key={m.name} delay={i * 0.15}>
                <div className="glass-card pedagogy-card">
                  <span className="pedagogy-card__icon">{m.icon}</span>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center" delay={0.4}>
            <div style={{ marginTop: '3rem' }}>
              <Link to="/media" className="page-bottom-link">
                {t('home.explore_media')}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        .universe-page .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }
        .universe-page .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .universe-hero {
          padding: 10rem 0 4rem;
          position: relative;
        }

        /* ── Seriphia ── */
        .seriphia-block {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
        }

        .seriphia-block__image img {
          border-radius: var(--radius-lg);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border: 2px solid var(--color-border);
          max-height: 500px;
          object-fit: cover;
          width: 100%;
        }

        .seriphia-portrait {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          object-position: top center;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.14);
          border: 2px solid var(--color-border);
          display: block;
        }

        .seriphia-block__text h2 {
          font-size: 2.2rem;
          margin-bottom: 0.3rem;
        }

        .seriphia-block__text p {
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        /* ── Map ── */
        .map-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .map-glow-ring {
          position: absolute;
          inset: -20px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, rgba(76,175,80,0.15), rgba(30,136,229,0.15), rgba(156,39,176,0.15));
          filter: blur(30px);
          z-index: 0;
          animation: map-glow-breathe 4s ease-in-out infinite;
        }

        @keyframes map-glow-breathe {
          0%, 100% { opacity: 0.4; transform: scale(0.97); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }

        .map-float-wrapper {
          position: relative;
          z-index: 1;
          animation: map-float 6s ease-in-out infinite;
        }

        @keyframes map-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .map-image {
          width: 100%;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border-light);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 60px var(--color-sage-glow);
          transition: transform 0.5s var(--ease-gentle), box-shadow 0.5s var(--ease-gentle);
        }

        .map-float-wrapper:hover .map-image {
          transform: scale(1.03) rotateX(2deg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 0 80px var(--color-sage-glow);
        }

        /* ── Map Pins ── */
        .map-pin {
          position: absolute;
          z-index: 2;
          transform: translate(-50%, -50%);
          animation: map-pin-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 10px; /* Expand hit area */
        }
        .map-pin:hover {
          transform: translate(-50%, -50%) scale(1.4);
        }

        @media (max-width: 480px) {
          .map-pin {
            padding: 15px; /* Even larger for tiny screens */
          }
        }

        @keyframes map-pin-appear {
          from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .map-pin__dot {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--pin-color);
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          position: relative;
          z-index: 1;
        }

        .map-pin__pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--pin-color);
          opacity: 0;
          animation: map-pin-radar 2.5s ease-out infinite;
          animation-delay: inherit;
        }

        @keyframes map-pin-radar {
          0% { width: 12px; height: 12px; opacity: 0.6; }
          100% { width: 50px; height: 50px; opacity: 0; }
        }

        /* ── Duo Spotlight Grid ── */
        .duo-spotlight-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 0;
        }

        .duo-spotlight-card {
          padding: 0;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.05);
          transition: all var(--transition-med);
          cursor: default;
        }

        .duo-spotlight-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.14), 0 0 30px rgba(from var(--spotlight-color) r g b / 0.08);
          border-color: var(--spotlight-color);
        }

        .duo-spotlight-card__img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/4;
        }

        .duo-spotlight-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.6s var(--ease-gentle);
        }

        .duo-spotlight-card:hover .duo-spotlight-card__img {
          transform: scale(1.05);
        }

        .duo-spotlight-card__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 1.5rem 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .duo-spotlight-card__land-icon {
          font-size: 1.3rem;
        }

        .duo-spotlight-card__land {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .duo-spotlight-card__body {
          padding: 1.25rem 1.5rem;
        }

        .duo-spotlight-card__names {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .duo-spotlight-card__focus {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        @media (max-width: 900px) {
          .duo-spotlight-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Duos Grid ── */
        .duos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .duo-card {
          cursor: pointer;
          text-align: center;
          padding: 2rem;
          transition: all var(--transition-med);
        }

        @media (max-width: 480px) {
          .duo-card {
            padding: 1.5rem 1rem;
          }
        }

        .duo-card__header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          justify-content: center;
        }

        .duo-card__land-icon {
          font-size: 2rem;
        }

        .duo-card__header h3 {
          font-size: 1.2rem;
          margin-bottom: 0.1rem;
        }

        .duo-card__focus {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .duo-card__image-wrap {
          margin-bottom: 1rem;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        /* ── Character pair inside duo card ── */
        .duo-card__char-pair {
          display: flex;
          gap: 4px;
          height: 200px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .duo-card__char-img {
          flex: 1;
          width: 50%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.45s var(--ease-gentle);
        }

        .duo-card:hover .duo-card__char-img {
          transform: scale(1.06);
        }

        .duo-card__names {
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--color-text-primary);
          font-size: 1rem;
        }

        .duo-card__desc {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          max-width: 100%;
        }

        /* ── Pedagogy ── */
        .pedagogy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .pedagogy-card {
          text-align: center;
          padding: 2.5rem 2rem;
        }

        .pedagogy-card__icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .pedagogy-card h3 {
          font-size: 1.15rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }

        .pedagogy-card p {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          max-width: 100%;
        }

        @media (max-width: 968px) {
          .seriphia-block {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .seriphia-block__image img {
            max-height: 350px;
            margin: 0 auto;
          }
          .pedagogy-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Universe;
