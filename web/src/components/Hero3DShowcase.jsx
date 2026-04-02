import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ModelViewer from './ModelViewer';
import { assetPath } from '../utils/assetPath';

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

const Hero3DShowcase = ({ asset }) => {
    if (!asset) return null;

    return (
        <header className="hero-3d">
            {/* Ambient background effects */}
            <div className="hero-3d__bg" aria-hidden="true">
                <div className="hero-3d__orb hero-3d__orb--1" />
                <div className="hero-3d__orb hero-3d__orb--2" />
                <div className="hero-3d__orb hero-3d__orb--3" />
            </div>

            <div className="container hero-3d__inner">
                <div className="hero-3d__content">
                    <RevealSection>
                        <span className="hero-3d__label">
                            ✦ Trellis 2 — 3D Collection
                        </span>
                        <h1 className="hero-3d__title">
                            Explore the<br />
                            <span className="hero-3d__title-accent">Rhythm Quest</span>
                            <br />in 3D
                        </h1>
                        <p className="hero-3d__subtitle">
                            Step into the world of The Sound of Essentials — where every character, artifact, and Land comes alive through immersive 3D models powered by Trellis 2.
                        </p>
                        <div className="hero-3d__actions">
                            <a href="#gallery" className="btn btn-gold btn-lg">
                                View Collection ↓
                            </a>
                            <Link to="/universe" className="btn hero-3d__btn-outline">
                                Explore the Universe →
                            </Link>
                        </div>
                    </RevealSection>
                </div>

                <div className="hero-3d__model">
                    <RevealSection delay={0.2}>
                        <div className="hero-3d__model-frame">
                            <div className="hero-3d__model-glow" aria-hidden="true" />
                            <ModelViewer
                                glbUrl={asset.glbUrl}
                                fallbackImage={asset.fallbackImage}
                                fallbackVideo={asset.fallbackVideo}
                                alt={`${asset.name} — ${asset.title}`}
                                className="hero-3d__viewer"
                            />
                            <div className="hero-3d__model-ring" aria-hidden="true" />
                        </div>
                        <p className="hero-3d__model-name">
                            {asset.name} <span>— {asset.title}</span>
                        </p>
                    </RevealSection>
                </div>
            </div>

            <div className="hero-3d__scroll-hint" aria-hidden="true">
                <span>↓</span>
            </div>

            <style>{`
        .hero-3d {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #0a0a14 0%, #0d0d24 40%, #12122a 100%);
        }

        .hero-3d__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .hero-3d__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .hero-3d__orb--1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(156, 39, 176, 0.4), transparent);
          top: -10%;
          right: 10%;
          animation-delay: 0s;
        }

        .hero-3d__orb--2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 111, 0, 0.3), transparent);
          bottom: 10%;
          left: -5%;
          animation-delay: -3s;
        }

        .hero-3d__orb--3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(30, 136, 229, 0.25), transparent);
          top: 40%;
          left: 40%;
          animation-delay: -5s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(-10px, 20px) scale(0.95); }
          75% { transform: translate(15px, 10px) scale(1.02); }
        }

        .hero-3d__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-3d__label {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 179, 0, 0.9);
          margin-bottom: 1.5rem;
        }

        .hero-3d__title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700;
          line-height: 1.08;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }

        .hero-3d__title-accent {
          background: linear-gradient(135deg, #FFB300, #FF6F00, #FF8F00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-3d__subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 2.5rem;
        }

        .hero-3d__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .hero-3d__btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          border-radius: var(--radius-xl);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
        }

        .hero-3d__btn-outline:hover {
          border-color: rgba(255, 179, 0, 0.5);
          color: #FFB300;
          transform: translateY(-2px);
        }

        .btn-lg {
          padding: 1rem 2.5rem;
          font-size: 1.05rem;
        }

        /* ── Model Frame ── */
        .hero-3d__model {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-3d__model-frame {
          position: relative;
          width: 100%;
          max-width: 440px;
          aspect-ratio: 1;
          animation: heroModelFloat 6s ease-in-out infinite;
        }

        @keyframes heroModelFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        .hero-3d__model-glow {
          position: absolute;
          inset: -30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(156, 39, 176, 0.15) 0%, rgba(255, 111, 0, 0.08) 40%, transparent 70%);
          filter: blur(30px);
          z-index: 0;
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .hero-3d__viewer {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
        }

        .hero-3d__model-ring {
          position: absolute;
          inset: -4px;
          border-radius: var(--radius-lg);
          border: 2px solid rgba(255, 179, 0, 0.15);
          z-index: 0;
          pointer-events: none;
        }

        .hero-3d__model-name {
          margin-top: 1.2rem;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }

        .hero-3d__model-name span {
          color: rgba(255, 255, 255, 0.35);
          font-weight: 400;
        }

        .hero-3d__scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.3);
          animation: gentleFloat 3s ease-in-out infinite;
          z-index: 1;
        }

        /* ── Reveal (dark variant) ── */
        .hero-3d .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }
        .hero-3d .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ── */
        @media (max-width: 968px) {
          .hero-3d__inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }

          .hero-3d__subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-3d__actions {
            justify-content: center;
          }

          .hero-3d__model-frame {
            max-width: 320px;
          }
        }

        @media (max-width: 640px) {
          .hero-3d {
            padding: 90px 0 40px;
          }

          .hero-3d__actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
        </header>
    );
};

export default Hero3DShowcase;
