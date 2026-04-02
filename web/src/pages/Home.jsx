import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParallaxHero from '../components/ParallaxHero';
import { assetPath } from '../utils/assetPath';

/* ── SVG Icons (replacing emojis) ── */
const IconLanguage = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
  </svg>
);

const IconBrain = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M12 18v-5" />
  </svg>
);

const IconActivity = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
  </svg>
);

const IconMicroscope = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
  </svg>
);

const IconHeart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const IconTarget = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconShield = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconGlobe = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

/* ── Intersection Observer Hook ── */
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

const Home = () => {
  const { t } = useTranslation();

  /* ── Domain Data ── */
  const domains = [
    { icon: <IconLanguage />, title: t('home.domains.language.title'), desc: t('home.domains.language.desc'), color: '#4F46E5' },
    { icon: <IconBrain />, title: t('home.domains.cognitive.title'), desc: t('home.domains.cognitive.desc'), color: '#818CF8' },
    { icon: <IconActivity />, title: t('home.domains.physical.title'), desc: t('home.domains.physical.desc'), color: '#22C55E' },
    { icon: <IconMicroscope />, title: t('home.domains.science.title'), desc: t('home.domains.science.desc'), color: '#F59E0B' },
    { icon: <IconHeart />, title: t('home.domains.social_emotional.title'), desc: t('home.domains.social_emotional.desc'), color: '#F472B6' },
  ];

  const features = [
    {
      icon: <IconTarget />,
      title: t('home.features.active.title'),
      subtitle: t('home.features.active.subtitle'),
      desc: t('home.features.active.desc'),
      color: '#4F46E5',
    },
    {
      icon: <IconShield />,
      title: t('home.features.neuro.title'),
      subtitle: t('home.features.neuro.subtitle'),
      desc: t('home.features.neuro.desc'),
      color: '#22C55E',
    },
    {
      icon: <IconGlobe />,
      title: t('home.features.scalable.title'),
      subtitle: t('home.features.scalable.subtitle'),
      desc: t('home.features.scalable.desc'),
      color: '#F59E0B',
    },
  ];

  return (
    <div className="home-page">
      {/* ═══ HERO ═══ */}
      <header className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <ParallaxHero variant="home" />
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title hero-stagger" style={{ animationDelay: '0.1s' }}>
              {t('home.hero_title_1')}{' '}
              <span className="accent-gradient">{t('home.hero_title_2')}</span>
            </h1>
            <p className="hero__subtitle hero-stagger" style={{ animationDelay: '0.25s' }}>
              {t('home.hero_subtitle')}
            </p>

            <div className="hero__actions hero-stagger" style={{ animationDelay: '0.4s' }}>
              <Link to="/join" className="btn btn-gold btn-lg">{t('hero.join_button')}</Link>
              <Link to="/universe" className="btn btn-outline">{t('navbar.universe')} →</Link>
            </div>
          </div>
          <div className="hero__visual hero-stagger" style={{ animationDelay: '0.55s' }}>
            <div className="hero__image-wrapper animate-float">
              <img
                src={assetPath('/assets/book/SOE_RQ_COVER.png')}
                alt="Kenji and Aiko looking at the Global Sound Map — The Sound of Essentials: Rhythm Quest cover art"
                className="hero__image"
              />
              <div className="hero__image-glow" aria-hidden="true"></div>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </header>

      <section className="section why-section glow-plum">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('home.why_label')}</div>
            <h2 className="section-title">
              {t('home.why_title_1')}<br />
              <span className="accent-text">{t('home.why_title_2')}</span>
            </h2>
            <div className="divider divider-center"></div>
            <p className="section-subtitle">
              {t('home.why_subtitle')}
            </p>
          </RevealSection>

          <RevealSection>
            <div className="why-stats">
              <div className="why-stat clay-stat">
                <span className="why-stat__number text-plum">{t('home.stat_1_val')}</span>
                <span className="why-stat__label">{t('home.stat_1_lab')}</span>
              </div>
              <div className="why-stat clay-stat">
                <span className="why-stat__number text-sage">{t('home.stat_2_val')}</span>
                <span className="why-stat__label">{t('home.stat_2_lab')}</span>
              </div>
              <div className="why-stat clay-stat">
                <span className="why-stat__number" style={{ color: '#F59E0B' }}>{t('home.stat_3_val')}</span>
                <span className="why-stat__label">{t('home.stat_3_lab')}</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="section features-section glow-sage">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('home.approach_label')}</div>
            <h2 className="section-title">
              {t('home.approach_title_1')} <span className="text-sage">{t('home.approach_title_2')}</span>
            </h2>
            <p className="section-subtitle">
              {t('home.approach_subtitle')}
            </p>
          </RevealSection>

          <div className="features-grid">
            {features.map((f, i) => (
              <RevealSection key={f.title} delay={i * 0.15}>
                <div className="glass-card feature-card">
                  <span className="feature-card__icon-wrap" style={{ '--icon-color': f.color }}>
                    {f.icon}
                  </span>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <span className="feature-card__subtitle">{f.subtitle}</span>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section domains-section">
        <div className="container">
          <RevealSection className="text-center">
            <div className="section-label">{t('home.curriculum_label')}</div>
            <h2 className="section-title">
              {t('home.curriculum_title_1')} <span className="accent-gradient">{t('home.curriculum_title_2')}</span>
            </h2>
            <p className="section-subtitle">
              {t('home.curriculum_subtitle')}
            </p>
          </RevealSection>

          <div className="domains-grid">
            {domains.map((d, i) => (
              <RevealSection key={d.title} delay={i * 0.1}>
                <div className="glass-card domain-card">
                  <span className="domain-card__icon-wrap" style={{ '--icon-color': d.color }}>
                    {d.icon}
                  </span>
                  <h4 className="domain-card__title">{d.title}</h4>
                  <p className="domain-card__desc">{d.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="section cta-section text-center">
        <div className="container">
          <RevealSection>
            <h2 className="cta-section__headline">Biology doesn't wait for systems
              <br />to fix themselves.</h2>
            <p className="section-subtitle" style={{ marginTop: '1.5rem' }}>
              Join the ecosystem of support. Be part of the solution.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/join" className="btn btn-gold btn-lg">Join the Quest</Link>
              <Link to="/media" className="btn btn-outline">Explore the Media Room →</Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          position: relative;
          overflow: hidden;
        }

        .hero__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* Staggered entrance animation */
        .hero-stagger {
          opacity: 0;
          transform: translateY(24px);
          animation: heroEntrance 0.8s var(--ease-premium) forwards;
        }

        @keyframes heroEntrance {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .btn-lg {
          padding: 1rem 2.5rem;
          font-size: 1.05rem;
        }

        .hero__title {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .hero__subtitle {
          font-size: 1.15rem;
          color: var(--color-text-body);
          margin-bottom: 2.5rem;
          max-width: 500px;
          line-height: 1.8;
        }

        .hero__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero__image-wrapper {
          position: relative;
          max-width: 460px;
        }

        .hero__image {
          width: 100%;
          border-radius: var(--radius-clay);
          border: 4px solid rgba(79, 70, 229, 0.15);
          box-shadow:
            8px 8px 20px rgba(79, 70, 229, 0.12),
            -6px -6px 16px rgba(255, 255, 255, 0.9),
            inset 0 2px 4px rgba(255, 255, 255, 0.5);
        }

        .hero__image-glow {
          position: absolute;
          inset: -40px;
          border-radius: var(--radius-clay);
          background: radial-gradient(circle at center, var(--color-cta-glow) 0%, transparent 60%);
          z-index: -1;
          filter: blur(40px);
        }

        .hero__scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--color-text-muted);
          animation: gentleFloat 3s ease-in-out infinite;
          opacity: 0.6;
        }

        /* ── Why Stats (clay-styled) ── */
        .why-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .clay-stat {
          background: var(--color-bg-card);
          border: 3px solid var(--color-border-clay);
          border-radius: var(--radius-clay);
          box-shadow: var(--shadow-clay);
          transition: all 0.3s var(--ease-clay);
        }

        .clay-stat:hover {
          box-shadow: var(--shadow-clay-hover);
          transform: translateY(-3px);
        }

        .why-stat {
          text-align: center;
          padding: 2.5rem 1.5rem;
          position: relative;
        }

        .why-stat__number {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .why-stat__label {
          font-size: 0.9rem;
          color: var(--color-text-body);
          line-height: 1.5;
        }

        /* ── Features ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          text-align: center;
          padding: 2.5rem 2rem;
        }

        .feature-card__icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: color-mix(in srgb, var(--icon-color) 10%, transparent);
          border: 3px solid color-mix(in srgb, var(--icon-color) 20%, transparent);
          color: var(--icon-color);
          margin-bottom: 1.2rem;
          box-shadow:
            3px 3px 8px color-mix(in srgb, var(--icon-color) 10%, transparent),
            -2px -2px 6px rgba(255, 255, 255, 0.7),
            inset 0 1px 2px rgba(255, 255, 255, 0.5);
          transition: all 0.3s var(--ease-clay);
        }

        .feature-card:hover .feature-card__icon-wrap {
          transform: translateY(-3px) scale(1.05);
          box-shadow:
            4px 4px 12px color-mix(in srgb, var(--icon-color) 15%, transparent),
            -3px -3px 8px rgba(255, 255, 255, 0.8),
            inset 0 2px 3px rgba(255, 255, 255, 0.6);
        }

        .feature-card__title {
          font-size: 1.3rem;
          margin-bottom: 0.3rem;
          color: var(--color-text-primary);
        }

        .feature-card__subtitle {
          display: block;
          font-size: 0.8rem;
          color: var(--color-cta);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .feature-card__desc {
          font-size: 0.95rem;
          color: var(--color-text-body);
          line-height: 1.7;
          max-width: 100%;
        }

        /* ── 5 Domains ── */
        .domains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .domain-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
        }

        .domain-card__icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: color-mix(in srgb, var(--icon-color) 10%, transparent);
          border: 3px solid color-mix(in srgb, var(--icon-color) 20%, transparent);
          color: var(--icon-color);
          margin-bottom: 1rem;
          box-shadow:
            3px 3px 8px color-mix(in srgb, var(--icon-color) 10%, transparent),
            -2px -2px 6px rgba(255, 255, 255, 0.7),
            inset 0 1px 2px rgba(255, 255, 255, 0.5);
          transition: all 0.3s var(--ease-clay);
        }

        .domain-card:hover .domain-card__icon-wrap {
          transform: translateY(-2px) scale(1.05);
        }

        .domain-card__title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .domain-card__desc {
          font-size: 0.82rem;
          color: var(--color-text-body);
          line-height: 1.5;
          max-width: 100%;
        }

        /* ── Reveal Animation ── */
        .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }

        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── CTA Section ── */
        .cta-section {
          background: linear-gradient(180deg, transparent 0%, rgba(79, 70, 229, 0.04) 50%, rgba(34, 197, 94, 0.04) 100%);
          padding: 6rem 0;
        }

        .cta-section__headline {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        /* ── Responsive ── */
        @media (max-width: 968px) {
          .hero__inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero__subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero__actions {
            justify-content: center;
          }

          .hero__image-wrapper {
            max-width: 340px;
          }

          .why-stats {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .domains-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .domains-grid {
            grid-template-columns: 1fr;
          }

          .hero__actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
