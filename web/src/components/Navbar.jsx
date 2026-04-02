import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MusicNoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

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
    { to: '/', label: t('navbar.home') },
    { to: '/universe', label: t('navbar.universe') },
    { to: '/characters', label: t('navbar.heroes') },
    { to: '/science', label: t('navbar.science') },
    { to: '/media', label: t('navbar.media') },
    { to: '/dictionary', label: t('navbar.dictionary') || 'Dictionary' },
    { to: '/book', label: 'Book Preview' },
    { to: '/3d', label: '3D Collection' },
    { to: '/mission', label: t('navbar.mission') },
  ];

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label={t('app_title')}>
          <span className="navbar__logo-icon">
            <MusicNoteIcon />
          </span>
          <span className="navbar__logo-text">
            The Sound of Essentials: <span className="logo-accent-cursive">Rhythm Quest</span>
          </span>
        </Link>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('navbar.toggle_menu')}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <button onClick={toggleLanguage} className="navbar__lang-toggle" aria-label={t('navbar.toggle_lang')}>
            {i18n.language.split('-')[0].toUpperCase()}
          </button>
          <Link to="/join" className="btn btn-gold navbar__cta">
            {t('navbar.join')}
          </Link>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0.75rem;
          left: 1rem;
          right: 1rem;
          z-index: 1000;
          padding: 0.8rem 0;
          transition: all 0.4s var(--ease-clay);
          background: rgba(15, 13, 26, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-clay);
          border: 1px solid rgba(201, 168, 76, 0.12);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(201, 168, 76, 0.05);
        }

        .navbar--scrolled {
          background: rgba(15, 13, 26, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-color: rgba(201, 168, 76, 0.18);
          padding: 0.6rem 0;
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(201, 168, 76, 0.08);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(0.9rem, 4vw, 1.2rem);
          color: var(--color-gold);
          z-index: 10;
          cursor: pointer;
        }

        .navbar__logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(34px, 10vw, 42px);
          height: clamp(34px, 10vw, 42px);
          background: linear-gradient(135deg, var(--color-gold), var(--color-accent-warm));
          color: #1a1528;
          border-radius: 14px;
          border: 1px solid rgba(201, 168, 76, 0.3);
          box-shadow:
            0 4px 12px rgba(201, 168, 76, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .navbar__logo-text {
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
        }

        .navbar__menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar__link {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-body);
          padding: 0.3rem 0;
          position: relative;
          transition: color 0.25s var(--ease-premium);
          cursor: pointer;
        }

        .navbar__link:hover,
        .navbar__link--active {
          color: var(--color-primary);
        }

        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, var(--color-primary), var(--color-cta));
          border-radius: 2px;
          transition: width 0.3s var(--ease-premium), left 0.3s var(--ease-premium);
        }

        .navbar__link:hover::after,
        .navbar__link--active::after {
          width: 100%;
          left: 0;
        }

        .navbar__cta {
          padding: 0.55rem 1.4rem !important;
          font-size: 0.85rem !important;
          border-radius: 14px !important;
        }

        .navbar__lang-toggle {
          background: rgba(201, 168, 76, 0.08);
          border: 1px solid rgba(201, 168, 76, 0.25);
          color: var(--color-gold);
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-med);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .navbar__lang-toggle:hover {
          background: var(--color-gold);
          color: #1a1528;
          border-color: var(--color-gold);
        }

        .navbar__toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 10;
        }

        .navbar__toggle span {
          width: 24px;
          height: 2.5px;
          background: var(--color-text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .navbar__toggle--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .navbar__toggle--open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__toggle--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (max-width: 768px) {
          .navbar {
            top: 0.5rem;
            left: 0.5rem;
            right: 0.5rem;
            border-radius: 16px;
          }

          .navbar__toggle {
            display: flex;
          }

          .navbar__menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 320px;
            height: 100vh;
            background: rgba(15, 13, 26, 0.98);
            backdrop-filter: blur(24px);
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 3rem;
            gap: 1.5rem;
            transition: right 0.4s var(--ease-clay);
            border-left: 1px solid rgba(201, 168, 76, 0.15);
            box-shadow: -8px 0 30px rgba(0, 0, 0, 0.4);
          }

          .navbar__menu--open {
            right: 0;
          }

          .navbar__link {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
