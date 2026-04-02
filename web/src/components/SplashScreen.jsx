import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SplashScreen = ({ onFinished }) => {
    const { t } = useTranslation();
    const [phase, setPhase] = useState('enter'); // enter → show → exit → done

    useEffect(() => {
        const showTimer = setTimeout(() => setPhase('show'), 500);
        const exitTimer = setTimeout(() => setPhase('exit'), 1200);
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onFinished?.();
        }, 1800);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onFinished]);

    if (phase === 'done') return null;

    return (
        <div className={`splash-screen splash-screen--${phase}`} aria-hidden="true">
            {/* Soft clay blobs */}
            <div className="splash-screen__blobs">
                <div className="splash-screen__blob splash-screen__blob--1" />
                <div className="splash-screen__blob splash-screen__blob--2" />
                <div className="splash-screen__blob splash-screen__blob--3" />
            </div>

            {/* Main content */}
            <div className="splash-screen__content">
                <div className="splash-screen__icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                </div>
                <h1 className="splash-screen__title">
                    <span className="splash-screen__title-line1">{t('splash.line1')}</span>
                    <span className="splash-screen__title-line2">{t('splash.line2')}</span>
                </h1>
                <div className="splash-screen__subtitle">{t('splash.subtitle')}</div>
                <div className="splash-screen__tagline">{t('splash.tagline')}</div>
            </div>

            {/* Loading bar */}
            <div className="splash-screen__loader">
                <div className="splash-screen__loader-bar" />
            </div>

            <style>{`
                .splash-screen {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #4F46E5 0%, #6366F1 40%, #22C55E 100%);
                    overflow: hidden;
                    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                                transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                                filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .splash-screen--exit {
                    opacity: 0;
                    transform: scale(0.96);
                    filter: blur(8px);
                    pointer-events: none;
                }

                /* ── Soft Clay Blobs ── */
                .splash-screen__blobs {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .splash-screen__blob {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.06);
                    box-shadow:
                        inset 4px 4px 10px rgba(255, 255, 255, 0.1),
                        4px 4px 20px rgba(0, 0, 0, 0.1);
                    animation: splash-blob-float 4s ease-in-out infinite;
                }

                .splash-screen__blob--1 {
                    width: 280px;
                    height: 280px;
                    animation-delay: 0s;
                }
                .splash-screen__blob--2 {
                    width: 420px;
                    height: 420px;
                    animation-delay: 0.6s;
                }
                .splash-screen__blob--3 {
                    width: 580px;
                    height: 580px;
                    animation-delay: 1.2s;
                }

                @keyframes splash-blob-float {
                    0%, 100% { transform: scale(0.95); opacity: 0.3; }
                    50% { transform: scale(1.06); opacity: 0.5; }
                }

                /* ── Content ── */
                .splash-screen__content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }

                .splash-screen__icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 100px;
                    border-radius: 28px;
                    background: rgba(255, 255, 255, 0.15);
                    border: 3px solid rgba(255, 255, 255, 0.25);
                    box-shadow:
                        6px 6px 16px rgba(0, 0, 0, 0.15),
                        -4px -4px 12px rgba(255, 255, 255, 0.1),
                        inset 0 2px 4px rgba(255, 255, 255, 0.2);
                    margin: 0 auto 2rem;
                    color: #fff;
                    animation: splash-icon-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                @keyframes splash-icon-enter {
                    from { transform: scale(0) rotate(-90deg); opacity: 0; }
                    to { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                .splash-screen__title {
                    margin: 0;
                    line-height: 1.1;
                }

                .splash-screen__title-line1 {
                    display: block;
                    font-family: 'Comic Neue', sans-serif;
                    font-size: 1rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.7);
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    animation: splash-text-up 0.45s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .splash-screen__title-line2 {
                    display: block;
                    font-family: 'Baloo 2', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: #fff;
                    animation: splash-text-up 0.45s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .splash-screen__subtitle {
                    font-family: 'Baloo 2', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.9);
                    margin-top: 0.25rem;
                    animation: splash-text-up 0.45s 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .splash-screen__tagline {
                    font-family: 'Comic Neue', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.5);
                    margin-top: 1rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    animation: splash-text-up 0.45s 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @keyframes splash-text-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                /* ── Loader Bar ── */
                .splash-screen__loader {
                    position: absolute;
                    bottom: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 999px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
                    animation: splash-text-up 0.45s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .splash-screen__loader-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #818CF8, #FBBF24, #22C55E);
                    border-radius: 999px;
                    animation: splash-loader-fill 1.2s 0.3s ease-out both;
                    box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
                }

                @keyframes splash-loader-fill {
                    from { width: 0%; }
                    to { width: 100%; }
                }

                /* ── Mobile ── */
                @media (max-width: 600px) {
                    .splash-screen__title-line2 {
                        font-size: 2.5rem;
                    }
                    .splash-screen__subtitle {
                        font-size: 1.1rem;
                    }
                    .splash-screen__icon {
                        width: 80px;
                        height: 80px;
                        border-radius: 22px;
                    }
                    .splash-screen__icon svg {
                        width: 38px;
                        height: 38px;
                    }
                    .splash-screen__blob--3 {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
