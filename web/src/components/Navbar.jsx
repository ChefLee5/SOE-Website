import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const langs = ['en', 'fr', 'es'];
    const currentIndex = langs.indexOf(i18n.language.split('-')[0]);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { to: '/',           label: t('navbar.home') },
    { to: '/universe',   label: t('navbar.universe') },
    { to: '/characters', label: t('navbar.heroes') },
    { to: '/science',    label: t('navbar.science') },
    { to: '/media',      label: t('navbar.media') },
    { to: '/dictionary', label: 'Dictionary' },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ── Logo ── */}
      <Link to="/" className="navbar__logo" aria-label={t('app_title')}>
        <span className="navbar__logo-mark">♪</span>
        <span className="navbar__logo-wordmark">
          <span className="navbar__logo-soe">SOE</span>
          <span className="navbar__logo-sub">Rhythm Quest</span>
        </span>
      </Link>

      {/* ── Center links ── */}
      <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
            aria-current={location.pathname === to ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── Right controls ── */}
      <div className="navbar__right">
        <button
          onClick={toggleLanguage}
          className="navbar__lang"
          aria-label={t('navbar.toggle_lang')}
        >
          {i18n.language.split('-')[0].toUpperCase()}
        </button>

        <Link to="/join" className="navbar__cta-btn">
          {t('navbar.join')}
        </Link>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('navbar.toggle_menu')}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <style>{`
        /* ─────────────────────────────────────────
           Navbar — Bricolage Grotesque / Learnify-style
        ───────────────────────────────────────── */

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 3rem);
          height: 68px;
          transition: background 0.35s ease, box-shadow 0.35s ease, height 0.35s ease;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .navbar--scrolled {
          height: 60px;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.09), 0 4px 24px rgba(0,0,0,0.07);
        }

        /* ── Logo ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar__logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #1a1a2e;
          color: #fff;
          border-radius: 10px;
          font-size: 1.1rem;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .navbar__logo:hover .navbar__logo-mark {
          transform: rotate(-8deg) scale(1.08);
        }

        .navbar__logo-wordmark {
          display: flex;
          flex-direction: column;
          line-height: 1;
          gap: 1px;
        }

        .navbar__logo-soe {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          color: #0d0d1a;
          text-transform: uppercase;
        }

        .navbar__logo-sub {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.65rem;
          letter-spacing: 0.04em;
          color: #555;
          text-transform: uppercase;
        }

        /* ── Center nav links ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        .navbar__link {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.9rem;
          color: #1a1a2e;
          padding: 0.45rem 0.75rem;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s ease, background 0.2s ease;
          position: relative;
          white-space: nowrap;
        }

        .navbar__link:hover {
          color: #000;
          background: rgba(0,0,0,0.06);
        }

        .navbar__link--active {
          color: #000;
          font-weight: 700;
        }

        .navbar__link--active::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 0.75rem;
          right: 0.75rem;
          height: 2px;
          background: #1a1a2e;
          border-radius: 99px;
        }

        /* ── Right controls ── */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .navbar__lang {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #1a1a2e;
          background: none;
          border: 1.5px solid rgba(0,0,0,0.25);
          border-radius: 8px;
          padding: 0.38rem 0.65rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .navbar__lang:hover {
          border-color: #1a1a2e;
          color: #000;
          background: rgba(0,0,0,0.06);
        }

        .navbar__cta-btn {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: -0.01em;
          color: #fff;
          background: #1a1a2e;
          padding: 0.5rem 1.25rem;
          border-radius: 99px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .navbar__cta-btn:hover {
          background: #2d2d50;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(26,26,46,0.25);
        }

        /* ── Hamburger ── */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .navbar__hamburger:hover {
          background: rgba(0,0,0,0.06);
        }

        .navbar__hamburger span {
          width: 22px;
          height: 2px;
          background: #1a1a2e;
          border-radius: 2px;
          display: block;
          transition: all 0.3s ease;
        }

        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ── Mobile ── */
        @media (max-width: 840px) {
          .navbar__links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 78%;
            max-width: 300px;
            height: 100vh;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 0.5rem;
            padding: 3rem 2rem;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px);
            box-shadow: -6px 0 30px rgba(0,0,0,0.08);
            transition: right 0.38s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
          }

          .navbar__links--open {
            right: 0;
          }

          .navbar__link {
            font-size: 1.15rem;
            width: 100%;
          }

          .navbar__hamburger {
            display: flex;
          }

          .navbar__cta-btn {
            display: none;
          }

          .navbar__lang {
            display: none;
          }
        }

        @media (max-width: 1024px) and (min-width: 841px) {
          .navbar__link {
            font-size: 0.82rem;
            padding: 0.4rem 0.55rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
