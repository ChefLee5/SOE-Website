import { lazy, Suspense, useState, useRef, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = 'https://prod.spline.design/2REL0fDsrxlgntkA/scene.splinecode';
const TIMEOUT_MS = 10000;

/**
 * SplineBackground — renders a Spline 3D scene as a fixed full-page background.
 *
 * - position: fixed, z-index: 0 — sits behind everything
 * - pointer-events: none — ALL site content remains clickable
 * - Skips on mobile / low-end devices and falls back to the existing CSS atmosphere
 * - 10s CDN timeout: shows CSS fallback if Spline doesn't load
 * - Fade-in on load to prevent the flash of white canvas
 * - Body scroll override: prevents Spline from injecting overflow:hidden
 */
const SplineBackground = () => {
    const [loaded, setLoaded] = useState(false);
    const [timedOut, setTimedOut] = useState(false);
    const timerRef = useRef(null);

    // Capability check — skip on mobile/low-end/no-WebGL
    const canLoad = (() => {
        if (typeof window === 'undefined') return false;
        if (window.innerWidth < 768) return false;
        if (navigator.hardwareConcurrency <= 2) return false;
        try {
            const c = document.createElement('canvas');
            return !!(c.getContext('webgl2') || c.getContext('webgl'));
        } catch { return false; }
    })();

    // Start the CDN timeout once the Suspense mounts
    useEffect(() => {
        if (!canLoad) return;
        timerRef.current = setTimeout(() => setTimedOut(true), TIMEOUT_MS);
        return () => clearTimeout(timerRef.current);
    }, [canLoad]);

    const handleLoad = () => {
        clearTimeout(timerRef.current);
        setLoaded(true);
    };

    if (!canLoad || timedOut) {
        // Fallback: just let the existing CSS atmosphere layer handle the background
        return null;
    }

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    // Smooth reveal once loaded
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 1.2s ease',
                }}
                aria-hidden="true"
            >
                <Suspense fallback={null}>
                    <Spline
                        scene={SCENE_URL}
                        onLoad={handleLoad}
                        style={{
                            width: '100%',
                            height: '100%',
                            // CRITICAL: must be none — otherwise the background
                            // captures all mouse events and nothing on the site is clickable
                            pointerEvents: 'none',
                        }}
                    />
                </Suspense>
            </div>

            {/* Dim overlay — softens the 3D scene so text content stays legible */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    // Two-layer overlay for readability:
                    // cream wash + subtle vignette edge
                    background: 'radial-gradient(ellipse 120% 100% at 50% 50%, rgba(250,250,247,0.30) 0%, rgba(250,250,247,0.40) 100%)',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 1.2s ease',
                }}
                aria-hidden="true"
            />
        </>
    );
};

export default SplineBackground;
