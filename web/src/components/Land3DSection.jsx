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
            { threshold: 0.12 }
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

/**
 * Land3DSection — Reusable section pairing a Land artifact with copy.
 * Props:
 *   asset    — object from landAssets[]
 *   reversed — flip layout (model on right vs left)
 *   index    — for stagger animation
 */
const Land3DSection = ({ asset, reversed = false, index = 0 }) => {
    if (!asset) return null;

    const sectionClass = `land3d-section ${reversed ? 'land3d-section--reversed' : ''} ${index % 2 === 0 ? 'land3d-section--dark' : 'land3d-section--darker'
        }`;

    return (
        <section className={sectionClass}>
            <div className="container land3d-section__inner">
                <RevealSection className="land3d-section__model-col" delay={0.1}>
                    <div className="land3d-section__model-frame">
                        <div
                            className="land3d-section__model-bg"
                            aria-hidden="true"
                            style={{ '--land-color': asset.landColor }}
                        />
                        <ModelViewer
                            glbUrl={asset.glbUrl}
                            fallbackImage={asset.fallbackImage}
                            fallbackVideo={asset.fallbackVideo}
                            alt={`${asset.name} — ${asset.land} artifact`}
                            className="land3d-section__viewer"
                            showHint={false}
                        />
                    </div>
                </RevealSection>

                <RevealSection className="land3d-section__copy-col" delay={0.25}>
                    <div className="land3d-section__land-badge" style={{ '--badge-color': asset.landColor }}>
                        <span className="land3d-section__land-icon">{asset.landIcon}</span>
                        <span>{asset.land}</span>
                    </div>

                    <h2 className="land3d-section__name">{asset.name}</h2>
                    <p className="land3d-section__title">{asset.title}</p>

                    <div className="land3d-section__divider" style={{ background: asset.landColor }} />

                    <p className="land3d-section__learn-label">What you learn in this Land</p>
                    <p className="land3d-section__learn-desc">{asset.learningDesc}</p>

                    <div className="land3d-section__stats">
                        {asset.stats.map((stat) => (
                            <span
                                key={stat}
                                className="land3d-section__stat-pill"
                                style={{ '--pill-color': asset.landColor }}
                            >
                                {stat}
                            </span>
                        ))}
                    </div>

                    <p className="land3d-section__characters">
                        Heroes: <strong>{asset.characters}</strong>
                    </p>

                    <div className="land3d-section__actions">
                        <Link to="/universe" className="land3d-section__link" style={{ color: asset.landColor }}>
                            Explore {asset.land} →
                        </Link>
                        <Link to="/dictionary" className="land3d-section__link land3d-section__link--secondary">
                            Dictionary
                        </Link>
                    </div>
                </RevealSection>
            </div>

            <style>{`
        .land3d-section {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .land3d-section--dark {
          background: linear-gradient(180deg, #0e0e1e 0%, #12122a 100%);
        }

        .land3d-section--darker {
          background: linear-gradient(180deg, #12122a 0%, #0a0a18 100%);
        }

        .land3d-section__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .land3d-section--reversed .land3d-section__inner {
          direction: rtl;
        }

        .land3d-section--reversed .land3d-section__inner > * {
          direction: ltr;
        }

        /* ── Model Column ── */
        .land3d-section__model-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-width: 420px;
          margin: 0 auto;
        }

        .land3d-section__model-bg {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--land-color) 15%, transparent) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 0;
        }

        .land3d-section__viewer {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.06);
        }

        /* ── Copy Column ── */
        .land3d-section__land-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--badge-color);
          margin-bottom: 1rem;
        }

        .land3d-section__land-icon {
          font-size: 1.2rem;
        }

        .land3d-section__name {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 0.3rem;
          letter-spacing: -0.02em;
        }

        .land3d-section__title {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          font-style: italic;
          margin-bottom: 1.2rem;
          font-family: var(--font-heading);
        }

        .land3d-section__divider {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }

        .land3d-section__learn-label {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.5rem;
        }

        .land3d-section__learn-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 1.5rem;
        }

        .land3d-section__stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .land3d-section__stat-pill {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 1rem;
          border-radius: var(--radius-xl);
          border: 1px solid color-mix(in srgb, var(--pill-color) 30%, transparent);
          color: var(--pill-color);
          background: color-mix(in srgb, var(--pill-color) 8%, transparent);
        }

        .land3d-section__characters {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.5rem;
        }

        .land3d-section__characters strong {
          color: rgba(255,255,255,0.75);
        }

        .land3d-section__actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .land3d-section__link {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s var(--ease-premium);
        }

        .land3d-section__link:hover {
          transform: translateX(4px);
        }

        .land3d-section__link--secondary {
          color: rgba(255,255,255,0.35) !important;
          font-weight: 500;
        }

        .land3d-section__link--secondary:hover {
          color: rgba(255,255,255,0.7) !important;
        }

        /* ── Reveal ── */
        .land3d-section .reveal-block {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s var(--ease-gentle), transform 0.8s var(--ease-gentle);
        }
        .land3d-section .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ── */
        @media (max-width: 968px) {
          .land3d-section__inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }

          .land3d-section--reversed .land3d-section__inner {
            direction: ltr;
          }

          .land3d-section__model-frame {
            max-width: 300px;
          }

          .land3d-section__learn-desc {
            margin-left: auto;
            margin-right: auto;
          }

          .land3d-section__stats {
            justify-content: center;
          }

          .land3d-section__actions {
            justify-content: center;
          }

          .land3d-section {
            padding: 4rem 0;
          }
        }
      `}</style>
        </section>
    );
};

export default Land3DSection;
