import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </span>
              <span>Sound of Essentials: <span className="logo-accent-cursive" style={{ color: '#4ADE80' }}>Rhythm Quest</span></span>
            </div>
            <p className="footer__tagline">
              {t('footer.tagline')}
            </p>
            <div className="footer__social">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('footer.explore')}</h4>
            <Link to="/" className="footer__link">{t('navbar.home')}</Link>
            <Link to="/universe" className="footer__link">{t('navbar.universe')}</Link>
            <Link to="/characters" className="footer__link">{t('navbar.heroes')}</Link>
            <Link to="/science" className="footer__link">{t('footer.sci_sound')}</Link>
            <Link to="/media" className="footer__link">{t('navbar.media')}</Link>
            <Link to="/mission" className="footer__link">{t('navbar.mission')}</Link>
          </div>

          {/* Get Involved */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('footer.get_involved')}</h4>
            <Link to="/join" className="footer__link">{t('hero.join_button')}</Link>
            <Link to="/join" className="footer__link">{t('footer.partner')}</Link>
            <Link to="/join" className="footer__link">{t('footer.newsletter')}</Link>
          </div>

          {/* Newsletter mini */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('footer.stay_connected')}</h4>
            <p className="footer__newsletter-text">
              {t('footer.weekly_activities')}
            </p>
            <Link to="/join" className="btn footer__subscribe-btn" style={{ marginTop: '0.5rem', fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
              {t('footer.subscribe')}
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} The Sound of Essentials: <span className="logo-accent-cursive" style={{ color: '#4ADE80' }}>Rhythm Quest</span>. {t('footer.all_rights_reserved')}</p>
          <p>{t('home.hero_subtitle').split('.')[1]}. {t('home.hero_subtitle').split('.')[2]}. {t('home.hero_subtitle').split('.')[3]}</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: linear-gradient(135deg, #312E81 0%, #4F46E5 50%, #1E1B4B 100%);
          padding: 4rem 0 2rem 0;
          position: relative;
          z-index: 1;
        }

        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4F46E5, #22C55E, #F59E0B, #4F46E5);
          border-radius: 0 0 2px 2px;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 3.5rem;
          margin-bottom: 3.5rem;
        }

        .footer__brand {
          max-width: 300px;
        }

        .footer__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 1rem;
        }

        .footer__logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.12);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: #fff;
          box-shadow:
            3px 3px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.15);
        }

        .footer__tagline {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.65);
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .footer__social {
          display: flex;
          gap: 0.8rem;
        }

        .footer__social a {
          color: #fff;
          transition: all var(--transition-clay);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.15);
          box-shadow:
            3px 3px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }

        .footer__social a:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
          box-shadow:
            4px 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 2px 3px rgba(255, 255, 255, 0.15);
        }

        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer__heading {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .footer__link {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.25s var(--ease-premium), transform 0.25s var(--ease-premium);
          display: inline-block;
          cursor: pointer;
        }

        .footer__link:hover {
          color: #4ADE80;
          transform: translateX(4px);
        }

        .footer__newsletter-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .footer__subscribe-btn {
          background: rgba(34, 197, 94, 0.2);
          color: #4ADE80;
          border: 2px solid rgba(34, 197, 94, 0.35);
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            3px 3px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(34, 197, 94, 0.1);
        }

        .footer__subscribe-btn:hover {
          background: rgba(34, 197, 94, 0.35);
          transform: translateY(-2px);
        }

        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer__bottom p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer__bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
