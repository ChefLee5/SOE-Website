import React, { useEffect, useCallback } from 'react';
import ModelViewer from './ModelViewer';

/**
 * ThreeDDetail — Full-screen modal overlay for a selected 3D asset.
 * Features: large ModelViewer, asset info, escape-key close, blur backdrop.
 */
const ThreeDDetail = ({ asset, onClose }) => {
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    if (!asset) return null;

    return (
        <div className="td-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${asset.name} detail view`}>
            <div className="td-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="td-close" onClick={onClose} aria-label="Close detail view">
                    ✕
                </button>

                {/* Model Area */}
                <div className="td-model-area">
                    <div className="td-model-glow" aria-hidden="true" style={{ '--glow-color': asset.landColor }} />
                    <ModelViewer
                        glbUrl={asset.glbUrl}
                        fallbackImage={asset.fallbackImage}
                        fallbackVideo={asset.fallbackVideo}
                        alt={`${asset.name} — ${asset.title}`}
                        className="td-viewer"
                    />
                </div>

                {/* Info Area */}
                <div className="td-info">
                    <div className="td-land-badge" style={{ color: asset.landColor }}>
                        {asset.landIcon || '✦'} {asset.land}
                    </div>
                    <h2 className="td-name">{asset.name}</h2>
                    <p className="td-title-sub">{asset.title}</p>

                    <div className="td-divider" style={{ background: asset.landColor }} />

                    <p className="td-description">{asset.description}</p>

                    {asset.stats && (
                        <div className="td-stats">
                            {asset.stats.map((stat) => (
                                <span key={stat} className="td-stat-pill" style={{ '--pill-color': asset.landColor }}>
                                    {stat}
                                </span>
                            ))}
                        </div>
                    )}

                    {asset.characters && (
                        <p className="td-characters">
                            Heroes: <strong>{asset.characters}</strong>
                        </p>
                    )}

                    <span className="td-tag">{asset.learningTag}</span>
                </div>
            </div>

            <style>{`
        .td-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: tdFadeIn 0.3s ease-out;
        }

        @keyframes tdFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .td-content {
          position: relative;
          background: linear-gradient(160deg, #151528, #0e0e1e);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-lg);
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          animation: tdSlideUp 0.4s var(--ease-premium);
        }

        @keyframes tdSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .td-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .td-close:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          transform: scale(1.1);
        }

        /* ── Model Area ── */
        .td-model-area {
          position: relative;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 360px;
        }

        .td-model-glow {
          position: absolute;
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--glow-color) 15%, transparent) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 0;
        }

        .td-viewer {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 1;
          max-width: 380px;
          border-radius: var(--radius-lg);
        }

        /* ── Info Area ── */
        .td-info {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .td-land-badge {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 0.8rem;
        }

        .td-name {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 0.2rem;
          letter-spacing: -0.02em;
        }

        .td-title-sub {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          font-style: italic;
          font-family: var(--font-heading);
          margin-bottom: 1rem;
        }

        .td-divider {
          width: 36px;
          height: 3px;
          border-radius: 2px;
          margin-bottom: 1.2rem;
          opacity: 0.6;
        }

        .td-description {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          margin-bottom: 1.2rem;
        }

        .td-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .td-stat-pill {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.3rem 0.9rem;
          border-radius: var(--radius-xl);
          border: 1px solid color-mix(in srgb, var(--pill-color) 30%, transparent);
          color: var(--pill-color);
          background: color-mix(in srgb, var(--pill-color) 8%, transparent);
        }

        .td-characters {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1rem;
        }

        .td-characters strong {
          color: rgba(255,255,255,0.7);
        }

        .td-tag {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.3rem 0.9rem;
          border-radius: var(--radius-xl);
          background: rgba(255,179,0,0.1);
          color: rgba(255,179,0,0.8);
          letter-spacing: 0.05em;
          align-self: flex-start;
        }

        /* ── Scrollbar ── */
        .td-content::-webkit-scrollbar {
          width: 4px;
        }
        .td-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .td-content::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .td-content {
            grid-template-columns: 1fr;
          }

          .td-model-area {
            min-height: 260px;
            padding: 1.5rem;
          }

          .td-viewer {
            max-width: 250px;
          }

          .td-info {
            padding: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default ThreeDDetail;
