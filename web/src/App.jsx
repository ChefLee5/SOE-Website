import React, { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from './components/AnimatedPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Universe from './pages/Universe';
import MediaRoom from './pages/MediaRoom';
import Mission from './pages/Mission';
import JoinQuest from './pages/JoinQuest';
import Characters from './pages/Heroes';
import Science from './pages/Science';
import Dictionary from './pages/Dictionary/Dictionary';
import BookPreview from './pages/BookPreview';
import ThreeDExperience from './pages/ThreeDExperience';
import LiquidGlassLanding from './pages/LiquidGlassLanding';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinished = useCallback(() => setShowSplash(false), []);
  const location = useLocation();

  return (
    <div className="app">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Full-screen landing — no navbar/footer */}
        <Route path="/landing" element={<LiquidGlassLanding />} />

        {/* Standard pages with chrome */}
        <Route path="/*" element={
          <>
            {showSplash && <SplashScreen onFinished={handleSplashFinished} />}
            {/* Spline 3D Background — fixed behind all content */}
            <div className="spline-bg" aria-hidden="true">
              <iframe
                src="https://my.spline.design/dunes-U4ICFEmuFpAgeuBBBw9Q6lOJ/"
                frameBorder="0"
                width="100%"
                height="100%"
                title="Spline 3D Background"
                loading="lazy"
              />
            </div>
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                  <Route path="/universe" element={<AnimatedPage><Universe /></AnimatedPage>} />
                  <Route path="/media" element={<AnimatedPage><MediaRoom /></AnimatedPage>} />
                  <Route path="/mission" element={<AnimatedPage><Mission /></AnimatedPage>} />
                  <Route path="/join" element={<AnimatedPage><JoinQuest /></AnimatedPage>} />
                  <Route path="/characters" element={<AnimatedPage><Characters /></AnimatedPage>} />
                  <Route path="/science" element={<AnimatedPage><Science /></AnimatedPage>} />
                  <Route path="/dictionary" element={<AnimatedPage><Dictionary /></AnimatedPage>} />
                  <Route path="/book" element={<AnimatedPage><BookPreview /></AnimatedPage>} />
                  <Route path="/3d" element={<AnimatedPage><ThreeDExperience /></AnimatedPage>} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
