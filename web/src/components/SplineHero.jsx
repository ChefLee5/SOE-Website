import { lazy, Suspense, useState, useRef } from 'react';

// Lazy-load the heavy Spline runtime — only downloads when component mounts
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = 'https://prod.spline.design/bgPK7sQFt6AwD0TU/scene.splinecode';
const TIMEOUT_MS = 9000;

/**
 * SplineHero — lazy-loaded Spline 3D scene with:
 *  - Hardware detection (skips on mobile / low-end devices)
 *  - Animated fallback that shows while loading or on unsupported devices
 *  - 9s timeout fallback in case the CDN is slow
 *  - pointer-events: none on the canvas so the rest of the hero stays clickable
 *
 * Props:
 *   fallback  — ReactNode to show on mobile / low-end (optional, defaults to a gradient shimmer)
 *   className — extra class on the wrapper
 *   style     — extra inline styles on the wrapper
 */
const SplineHero = ({ fallback, className = '', style = {} }) => {
    const [loaded, setLoaded] = useState(false);
    const [timedOut, setTimedOut] = useState(false);
    const timerRef = useRef(null);

    // Capability check — run on mount (safe because this is always client-side in Vite)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2;
    const hasWebGL = (() => {
        try {
            const c = document.createElement('canvas');
            return !!(c.getContext('webgl2') || c.getContext('webgl'));
        } catch { return false; }
    })();
    const canLoad = !isMobile && !isLowEnd && hasWebGL;

    const handleLoad = () => {
        clearTimeout(timerRef.current);
        setLoaded(true);
    };

    const handleSuspenseRef = (el) => {
        if (el && !timerRef.current) {
            timerRef.current = setTimeout(() => setTimedOut(true), TIMEOUT_MS);
        }
    };

    const DefaultFallback = (
        <div className="spline-hero__fallback" aria-hidden="true">
            <div className="spline-hero__shimmer" />
        </div>
    );

    return (
        <div
            className={`spline-hero ${className}`}
            style={style}
        >
            {/* Loading skeleton — visible until Spline fires onLoad */}
            {!loaded && (
                <div
                    className="spline-hero__skeleton"
                    style={{ opacity: loaded ? 0 : 1 }}
                    aria-hidden="true"
                />
            )}

            {canLoad && !timedOut ? (
                <Suspense fallback={<div ref={handleSuspenseRef} />}>
                    <Spline
                        scene={SCENE_URL}
                        onLoad={handleLoad}
                        style={{
                            width: '100%',
                            height: '100%',
                            opacity: loaded ? 1 : 0,
                            transition: 'opacity 0.6s ease',
                            // CRITICAL: pointer-events none so hero text/buttons stay clickable
                            pointerEvents: 'none',
                        }}
                    />
                </Suspense>
            ) : (
                fallback || DefaultFallback
            )}

            <style>{`
                .spline-hero {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    /* Pre-allocate space — prevents layout shift (CLS) */
                    min-height: 420px;
                    contain: layout;
                    border-radius: 20px;
                    overflow: hidden;
                }

                .spline-hero__skeleton {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(91, 14, 166, 0.08) 0%,
                        rgba(21, 101, 192, 0.06) 50%,
                        rgba(27, 138, 58, 0.08) 100%
                    );
                    border-radius: inherit;
                    animation: spline-skeleton-pulse 2s ease-in-out infinite;
                }

                @keyframes spline-skeleton-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }

                .spline-hero__fallback {
                    width: 100%;
                    height: 100%;
                    min-height: 420px;
                    border-radius: inherit;
                    overflow: hidden;
                }

                .spline-hero__shimmer {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        135deg,
                        #f0ecff 0%,
                        #e8f4ff 50%,
                        #e8f5e9 100%
                    );
                }
            `}</style>
        </div>
    );
};

export default SplineHero;
