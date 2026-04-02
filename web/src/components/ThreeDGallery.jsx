import React, { useEffect, useRef } from 'react';
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
            { threshold: 0.1 }
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
 * ThreeDGallery — Grid of all 3D assets with hover effects.
 * On click, calls onSelectAsset(asset) to open the detail view.
 */
const ThreeDGallery = ({ assets, onSelectAsset }) => {
    return (
        <section className="gallery3d" id="gallery">
            <div className="container">
                <RevealSection className="text-center">
                    <span className="gallery3d__label">✦ Full Collection</span>
                    <h2 className="gallery3d__title">
                        Artifacts &<br />
                        <span className="gallery3d__title-accent">Characters</span>
                    </h2>
                    <p className="gallery3d__subtitle">
                        Every 3D model in the Rhythm Quest universe — tap to explore in detail.
                    </p>
                </RevealSection>

                <div className="gallery3d__grid">
                    {assets.map((asset, i) => (
                        <RevealSection key={asset.id} delay={i * 0.08}>
                            <button
                                className="gallery3d__card"
                                onClick={() => onSelectAsset(asset)}
                                aria-label={`View ${asset.name} in detail`}
                                style={{ '--card-color': asset.landColor }}
                            >
                                <div className="gallery3d__card-image">
                                    <img
                                        src={assetPath(asset.fallbackImage)}
                                        alt={asset.name}
                                        loading="lazy"
                                    />
                                    <div className="gallery3d__card-overlay" />
                                </div>

                                <div className="gallery3d__card-body">
                                    <div className="gallery3d__card-land" style={{ color: asset.landColor }}>
                                        {asset.landIcon || '✦'} {asset.land}
                                    </div>
                                    <h3 className="gallery3d__card-name">{asset.name}</h3>
                                    <p className="gallery3d__card-title">{asset.title}</p>
                                    <span className="gallery3d__card-tag">{asset.learningTag}</span>
                                </div>
                            </button>
                        </RevealSection>
                    ))}
                </div>
            </div>

            <style>{`
        .gallery3d {
          padding: 6rem 0;
          background: linear-gradient(180deg, #0a0a18 0%, #0e0e1e 50%, #12122a 100%);
          position: relative;
        }

        .gallery3d__label {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,179,0,0.9);
          margin-bottom: 1rem;
        }

        .gallery3d__title {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .gallery3d__title-accent {
          background: linear-gradient(135deg, #FFB300, #FF6F00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gallery3d__subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.5);
          max-width: 480px;
          margin: 0 auto 3.5rem auto;
          line-height: 1.7;
        }

        /* ── Grid ── */
        .gallery3d__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        /* ── Card ── */
        .gallery3d__card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          padding: 0;
          font-family: inherit;
          width: 100%;
          transition: all 0.4s var(--ease-premium);
        }

        .gallery3d__card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--card-color) 35%, transparent);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.3),
            0 0 30px color-mix(in srgb, var(--card-color) 10%, transparent);
        }

        .gallery3d__card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .gallery3d__card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-premium);
        }

        .gallery3d__card:hover .gallery3d__card-image img {
          transform: scale(1.08);
        }

        .gallery3d__card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
        }

        .gallery3d__card-body {
          padding: 1.2rem 1.4rem 1.4rem;
        }

        .gallery3d__card-land {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.5rem;
        }

        .gallery3d__card-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.15rem;
          line-height: 1.2;
        }

        .gallery3d__card-title {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.4);
          font-style: italic;
          margin-bottom: 0.8rem;
          line-height: 1.4;
        }

        .gallery3d__card-tag {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.8rem;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.04em;
        }

        /* ── Reveal ── */
        .gallery3d .reveal-block {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.7s var(--ease-gentle), transform 0.7s var(--ease-gentle);
        }
        .gallery3d .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .gallery3d {
            padding: 4rem 0;
          }

          .gallery3d__grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
        }
      `}</style>
        </section>
    );
};

export default ThreeDGallery;
