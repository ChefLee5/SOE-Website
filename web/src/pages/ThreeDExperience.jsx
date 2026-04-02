import React, { useState } from 'react';
import Hero3DShowcase from '../components/Hero3DShowcase';
import Land3DSection from '../components/Land3DSection';
import ThreeDGallery from '../components/ThreeDGallery';
import ThreeDDetail from '../components/ThreeDDetail';
import { heroAsset, landAssets, allAssets } from '../data/threeDAssets';

/**
 * ThreeDExperience — Main page assembling the Trellis 2 3D experience:
 *   1. Hero showcase (Seriphia)
 *   2. Land artifact sections (alternating layout)
 *   3. Full gallery grid
 *   4. Detail overlay (on card click)
 */
const ThreeDExperience = () => {
    const [selectedAsset, setSelectedAsset] = useState(null);

    return (
        <div className="three-d-experience">
            {/* ═══ HERO ═══ */}
            <Hero3DShowcase asset={heroAsset} />

            {/* ═══ LAND SECTIONS ═══ */}
            {landAssets.map((asset, index) => (
                <Land3DSection
                    key={asset.id}
                    asset={asset}
                    reversed={index % 2 !== 0}
                    index={index}
                />
            ))}

            {/* ═══ GALLERY ═══ */}
            <ThreeDGallery
                assets={allAssets}
                onSelectAsset={setSelectedAsset}
            />

            {/* ═══ CTA ═══ */}
            <section className="td-cta">
                <div className="container text-center">
                    <h2 className="td-cta__headline">
                        More models are coming to life.
                    </h2>
                    <p className="td-cta__subtitle">
                        Every character, artifact, and Land in the Rhythm Quest universe is being brought into 3D with Trellis 2. Stay tuned for the full collection.
                    </p>
                    <a href="#gallery" className="btn btn-gold btn-lg" style={{ marginTop: '2rem' }}>
                        Back to Collection ↑
                    </a>
                </div>
            </section>

            {/* ═══ DETAIL OVERLAY ═══ */}
            {selectedAsset && (
                <ThreeDDetail
                    asset={selectedAsset}
                    onClose={() => setSelectedAsset(null)}
                />
            )}

            <style>{`
        .three-d-experience {
          background: #0a0a14;
        }

        .td-cta {
          padding: 6rem 0;
          background: linear-gradient(180deg, #12122a 0%, #0a0a14 100%);
        }

        .td-cta__headline {
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .td-cta__subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.45);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.75;
        }

        @media (max-width: 640px) {
          .td-cta {
            padding: 4rem 0;
          }
        }
      `}</style>
        </div>
    );
};

export default ThreeDExperience;
