import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SplashScreen = ({ onFinished }) => {
    const { t } = useTranslation();
    const [phase, setPhase] = useState('enter'); // enter → show → exit → done

    useEffect(() => {
        // Phase 1: entrance animation plays via CSS (0–800ms)
        const showTimer = setTimeout(() => setPhase('show'), 800);
        // Phase 2: hold for reading (800–3000ms) — extended for brand impact
        const exitTimer = setTimeout(() => setPhase('exit'), 3000);
        // Phase 3: fade out (3000–3700ms), then remove
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onFinished?.();
        }, 3700);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onFinished]);

    if (phase === 'done') return null;

    // Split "Rhythm Quest" into individual letters for staggered reveal
    const titleLine2 = t('splash.line2');
    const subtitleText = t('splash.subtitle');

    return (
        <div className={`splash-screen splash-screen--${phase}`} aria-hidden="true">
            {/* Animated background rings */}
            <div className="splash-screen__rings">
                <div className="splash-screen__ring splash-screen__ring--1" />
                <div className="splash-screen__ring splash-screen__ring--2" />
                <div className="splash-screen__ring splash-screen__ring--3" />
            </div>

            {/* Floating music notes */}
            <div className="splash-screen__notes" aria-hidden="true">
                {['♪', '♫', '♩', '♬', '♪', '♫'].map((note, i) => (
                    <span key={i} className={`splash-note splash-note--${i + 1}`}>{note}</span>
                ))}
            </div>

            {/* Main content */}
            <div className="splash-screen__content">
                <div className="splash-screen__icon">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.15)" />
                        <text x="26" y="36" textAnchor="middle" fontSize="28" fill="white">♪</text>
                    </svg>
                </div>
                <h1 className="splash-screen__title">
                    <span className="splash-screen__title-line1">{t('splash.line1')}</span>
                    <span className="splash-screen__title-line2">
                        {titleLine2.split('').map((char, i) => (
                            <span
                                key={i}
                                className="splash-letter"
                                style={{ animationDelay: `${0.45 + i * 0.045}s` }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </span>
                </h1>
                <div className="splash-screen__subtitle">
                    {subtitleText.split('').map((char, i) => (
                        <span
                            key={i}
                            className="splash-subtitle-letter"
                            style={{ animationDelay: `${0.7 + i * 0.03}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
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
                    background: linear-gradient(135deg, #5B0EA6 0%, #1565C0 50%, #1B8A3A 100%);
                    overflow: hidden;
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }

                .splash-screen--exit {
                    opacity: 0;
                    transform: scale(1.04);
                    pointer-events: none;
                }

                /* ── Rings ── */
                .splash-screen__rings {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .splash-screen__ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 1.5px solid rgba(255, 255, 255, 0.1);
                    animation: splash-ring-pulse 3s ease-in-out infinite;
                }

                .splash-screen__ring--1 { width: 280px; height: 280px; animation-delay: 0s; }
                .splash-screen__ring--2 { width: 480px; height: 480px; animation-delay: 0.6s; }
                .splash-screen__ring--3 { width: 680px; height: 680px; animation-delay: 1.2s; }

                @keyframes splash-ring-pulse {
                    0%, 100% { transform: scale(0.96); opacity: 0.25; }
                    50% { transform: scale(1.04); opacity: 0.55; }
                }

                /* ── Floating Notes ── */
                .splash-screen__notes {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }

                .splash-note {
                    position: absolute;
                    font-size: 1.4rem;
                    color: rgba(255,255,255,0.18);
                    animation: splashNoteFloat 6s ease-in-out infinite;
                }

                .splash-note--1 { top: 15%; left: 10%; animation-delay: 0s; }
                .splash-note--2 { top: 20%; left: 85%; animation-delay: 0.8s; font-size: 1.1rem; }
                .splash-note--3 { top: 70%; left: 8%; animation-delay: 1.4s; font-size: 1.6rem; }
                .splash-note--4 { top: 65%; left: 88%; animation-delay: 0.3s; font-size: 1.2rem; }
                .splash-note--5 { top: 40%; left: 92%; animation-delay: 1.8s; }
                .splash-note--6 { top: 80%; left: 40%; animation-delay: 0.6s; font-size: 1.0rem; }

                @keyframes splashNoteFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.18; }
                    50% { transform: translateY(-18px) rotate(8deg); opacity: 0.35; }
                }

                /* ── Content ── */
                .splash-screen__content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }

                .splash-screen__icon {
                    width: 96px;
                    height: 96px;
                    border-radius: 26px;
                    background: rgba(255, 255, 255, 0.12);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.2);
                    animation: splash-icon-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                @keyframes splash-icon-enter {
                    from { transform: scale(0.3) rotate(-180deg); opacity: 0; }
                    to { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                .splash-screen__title { margin: 0; line-height: 1.1; }

                .splash-screen__title-line1 {
                    display: block;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.65);
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    animation: splash-text-up 0.6s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    margin-bottom: 0.5rem;
                }

                .splash-screen__title-line2 {
                    display: block;
                    font-family: 'Fredoka', sans-serif;
                    font-size: 3.8rem;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.01em;
                }

                /* Per-letter stagger */
                .splash-letter {
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(20px) scale(0.85);
                    animation: splash-letter-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                @keyframes splash-letter-pop {
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .splash-subtitle-letter {
                    display: inline-block;
                    opacity: 0;
                    animation: splash-letter-fade 0.4s ease forwards;
                }

                @keyframes splash-letter-fade {
                    to { opacity: 1; }
                }

                .splash-screen__subtitle {
                    font-family: 'Fredoka', sans-serif;
                    font-size: 1.6rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    margin-top: 0.3rem;
                }

                .splash-screen__tagline {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.45);
                    margin-top: 1.2rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    animation: splash-text-up 0.6s 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                @keyframes splash-text-up {
                    from { transform: translateY(16px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                /* ── Loader Bar ── */
                .splash-screen__loader {
                    position: absolute;
                    bottom: 56px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 220px;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.12);
                    border-radius: 999px;
                    overflow: hidden;
                    animation: splash-text-up 0.6s 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .splash-screen__loader-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #FF6F00, #FFD54F, #4CAF50, #1E88E5);
                    background-size: 200% 100%;
                    border-radius: 999px;
                    animation: splash-loader-fill 3.0s 0.6s ease-out both,
                               splash-loader-shimmer 1.5s 0.6s linear infinite;
                }

                @keyframes splash-loader-fill {
                    from { width: 0%; }
                    to { width: 100%; }
                }

                @keyframes splash-loader-shimmer {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }

                /* ── Mobile ── */
                @media (max-width: 600px) {
                    .splash-screen__title-line2 { font-size: 2.6rem; }
                    .splash-screen__subtitle { font-size: 1.2rem; }
                    .splash-screen__icon {
                        width: 76px; height: 76px; font-size: 2.8rem; border-radius: 20px;
                    }
                    .splash-screen__ring--3 { display: none; }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
