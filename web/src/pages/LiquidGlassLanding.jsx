import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Music,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './bpcoLanding.css';

/* ── Intersection-Observer hook for scroll reveals ── */
function useScrollReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('bpco-reveal--visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };
}

/* ── Circular spinning text SVG ── */
const CircularText = ({ text = 'RHYTHM ✦ QUEST ✦ MUSIC ✦ LEARN ✦ ' }) => (
  <div className="bpco-spinner-wrap">
    <svg className="bpco-spinner-svg" viewBox="0 0 200 200">
      <defs>
        <path
          id="circlePath"
          d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
        />
      </defs>
      <text>
        <textPath href="#circlePath">{text}</textPath>
      </text>
    </svg>
    <span className="bpco-spinner-center">🎵</span>
  </div>
);

/* ── Star decoration ── */
const Star = ({ large, style }) => (
  <span className={`bpco-star${large ? ' bpco-star--lg' : ''}`} style={style}>
    ✦
  </span>
);

/* ══════════════════════════════════════════════
   BPCO-Inspired Landing Page
   ══════════════════════════════════════════════ */
const LiquidGlassLanding = () => {
  const reveal = useScrollReveal();

  return (
    <div className="bpco-page">
      {/* ── Pill Navigation ── */}
      <nav className="bpco-pill-nav" aria-label="Landing navigation">
        <Link to="/" className="bpco-pill-nav__brand">
          <Music size={18} />
          Rhythm Quest
        </Link>
        <Link to="/dictionary" className="bpco-pill-nav__link">
          Dictionary
        </Link>
        <Link to="/about" className="bpco-pill-nav__link">
          About
        </Link>
        <Link to="/resources" className="bpco-pill-nav__link">
          Resources
        </Link>
      </nav>

      {/* ── Hero Section ── */}
      <section className="bpco-hero" id="hero">
        {/* Giant watermark */}
        <span className="bpco-hero__watermark" aria-hidden="true">
          RHYTHM
        </span>

        {/* Circular spinning text */}
        <CircularText />

        <div className="bpco-hero__content">
          <p className="bpco-hero__tagline">
            <Star /> Picture Dictionary <Star />
          </p>

          <h1 className="bpco-hero__title">
            The Sound of Essentials
          </h1>

          <p className="bpco-hero__subtitle">
            A vibrant picture dictionary where every word has rhythm.
            Learn essential vocabulary through music, color, and play.
          </p>

          <div className="bpco-hero__actions">
            <Link to="/dictionary" className="btn btn-gold">
              <BookOpen size={18} />
              Explore Dictionary
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bpco-features" id="features">
        <span className="bpco-features__watermark" aria-hidden="true">
          01
        </span>

        <div className="bpco-features__grid">
          {/* Card 1 */}
          <div
            ref={reveal}
            className="bpco-feature-card bpco-reveal"
          >
            <span className="bpco-feature-card__number" aria-hidden="true">01</span>
            <div className="bpco-feature-card__icon bpco-feature-card__icon--purple">
              <BookOpen size={24} />
            </div>
            <h3 className="bpco-feature-card__title">
              Visual Vocabulary <Star />
            </h3>
            <p className="bpco-feature-card__desc">
              Every word paired with hand-crafted illustrations.
              See what you learn — from animals to instruments, colors to emotions.
            </p>
          </div>

          {/* Card 2 */}
          <div
            ref={reveal}
            className="bpco-feature-card bpco-reveal bpco-reveal--delay-1"
          >
            <span className="bpco-feature-card__number" aria-hidden="true">02</span>
            <div className="bpco-feature-card__icon bpco-feature-card__icon--green">
              <Music size={24} />
            </div>
            <h3 className="bpco-feature-card__title">
              Musical Rhythm <Star />
            </h3>
            <p className="bpco-feature-card__desc">
              Each land is a musical chapter. Feel the beat of learning
              as you journey through themed worlds of sound and language.
            </p>
          </div>

          {/* Card 3 */}
          <div
            ref={reveal}
            className="bpco-feature-card bpco-reveal bpco-reveal--delay-2"
          >
            <span className="bpco-feature-card__number" aria-hidden="true">03</span>
            <div className="bpco-feature-card__icon bpco-feature-card__icon--amber">
              <Globe size={24} />
            </div>
            <h3 className="bpco-feature-card__title">
              Explore Worlds <Star />
            </h3>
            <p className="bpco-feature-card__desc">
              Seven vibrant lands — from Melody Meadow to Percussion Peaks.
              Each world unlocks new vocabulary and cultural connections.
            </p>
          </div>
        </div>
      </section>

      {/* ── Full-Bleed Showcase ── */}
      <section className="bpco-showcase" id="showcase">
        {/* Floating stars */}
        <div className="bpco-showcase__stars" aria-hidden="true">
          <span className="bpco-showcase__star" style={{ top: '15%', left: '8%', animationDelay: '0s' }}>✦</span>
          <span className="bpco-showcase__star" style={{ top: '25%', right: '12%', animationDelay: '0.7s' }}>✦</span>
          <span className="bpco-showcase__star" style={{ top: '65%', left: '15%', animationDelay: '1.3s' }}>✦</span>
          <span className="bpco-showcase__star" style={{ bottom: '18%', right: '20%', animationDelay: '2s' }}>✦</span>
          <span className="bpco-showcase__star" style={{ top: '45%', left: '70%', animationDelay: '0.4s' }}>✦</span>
        </div>

        <div
          ref={reveal}
          className="bpco-showcase__overlay bpco-reveal"
        >
          <p className="bpco-showcase__label">
            <Sparkles size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
            {' '}For Early Learners & Families
          </p>
          <h2 className="bpco-showcase__title">
            Where Words Come Alive
          </h2>
          <p className="bpco-showcase__desc">
            Built for curious minds aged 3–8. The Sound of Essentials turns language learning into a musical
            adventure — available as an interactive ebook and a web experience.
          </p>
          <Link to="/dictionary" className="btn btn-sage">
            Start the Journey
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bpco-cta" id="cta">
        <span className="bpco-cta__watermark" aria-hidden="true">QUEST</span>

        <div ref={reveal} className="bpco-reveal">
          <h2 className="bpco-cta__title">
            Ready to Explore? <Star large />
          </h2>
          <p className="bpco-cta__desc">
            Dive into the picture dictionary and discover a world
            where every word has a beat.
          </p>
          <div className="bpco-hero__actions">
            <Link to="/dictionary" className="btn btn-plum">
              <BookOpen size={18} />
              Open Dictionary
            </Link>
            <Link to="/resources" className="btn btn-outline">
              Teaching Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bpco-footer">
        <p>
          © {new Date().getFullYear()}{' '}
          <Link to="/">The Sound of Essentials: The Rhythm Quest</Link>.
          Made with ♫ for young learners everywhere.
        </p>
      </footer>
    </div>
  );
};

export default LiquidGlassLanding;
