import React, { useState, useEffect, useRef } from 'react';
import { assetPath } from '../utils/assetPath';

/**
 * ModelViewer — Universal 3D viewer wrapper with three-tier fallback:
 *   1. <model-viewer> (GLB + WebGL)
 *   2. <video> (turntable render)
 *   3. <img> (high-res still)
 */
const ModelViewer = ({
    glbUrl,
    fallbackImage,
    fallbackVideo = null,
    alt = '3D Model',
    className = '',
    showHint = true,
    autoRotate = true,
    style = {},
}) => {
    const [viewerReady, setViewerReady] = useState(false);
    const [glbFailed, setGlbFailed] = useState(false);
    const [videoFailed, setVideoFailed] = useState(!fallbackVideo);
    const containerRef = useRef(null);

    // Import model-viewer web component
    useEffect(() => {
        if (typeof customElements !== 'undefined' && !customElements.get('model-viewer')) {
            import('@google/model-viewer').then(() => {
                setViewerReady(true);
            }).catch(() => {
                setGlbFailed(true);
            });
        } else {
            setViewerReady(true);
        }
    }, []);

    const resolvedGlb = assetPath(glbUrl);
    const resolvedImage = assetPath(fallbackImage);
    const resolvedVideo = fallbackVideo ? assetPath(fallbackVideo) : null;

    // Determine what to render
    const showModelViewer = viewerReady && !glbFailed;
    const showVideo = !showModelViewer && resolvedVideo && !videoFailed;
    const showImage = !showModelViewer && !showVideo;

    return (
        <div
            ref={containerRef}
            className={`model-viewer-wrap ${className}`}
            style={style}
        >
            {showModelViewer && (
                <model-viewer
                    src={resolvedGlb}
                    alt={alt}
                    auto-rotate={autoRotate ? '' : undefined}
                    auto-rotate-delay="0"
                    rotation-per-second="20deg"
                    camera-controls
                    shadow-intensity="0.6"
                    environment-image="neutral"
                    exposure="1"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 'inherit',
                        '--poster-color': 'transparent',
                    }}
                    onError={() => setGlbFailed(true)}
                    poster={resolvedImage}
                >
                    {showHint && (
                        <div className="mv-hint" slot="interaction-prompt">
                            <span>☝️ Drag to rotate</span>
                        </div>
                    )}
                </model-viewer>
            )}

            {showVideo && (
                <video
                    src={resolvedVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="mv-fallback-video"
                    onError={() => setVideoFailed(true)}
                />
            )}

            {showImage && (
                <img
                    src={resolvedImage}
                    alt={alt}
                    className="mv-fallback-image"
                    loading="lazy"
                />
            )}

            <style>{`
        .model-viewer-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%);
        }

        .model-viewer-wrap model-viewer {
          width: 100%;
          height: 100%;
        }

        .mv-fallback-video,
        .mv-fallback-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          display: block;
        }

        .mv-fallback-image {
          object-fit: contain;
        }

        .mv-hint {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          color: rgba(255, 255, 255, 0.85);
          font-family: var(--font-body);
          font-size: 0.75rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-xl);
          pointer-events: none;
          opacity: 0;
          animation: mvHintFade 3s ease-in-out 1.5s forwards;
        }

        @keyframes mvHintFade {
          0% { opacity: 0; transform: translateX(-50%) translateY(8px); }
          15% { opacity: 1; transform: translateX(-50%) translateY(0); }
          85% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-4px); }
        }
      `}</style>
        </div>
    );
};

export default ModelViewer;
