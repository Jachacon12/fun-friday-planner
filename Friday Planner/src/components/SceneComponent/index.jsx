import React, { useState, useEffect, useRef, Suspense } from 'react';
import './style.css';

// Lazy load Spline
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function Scene() {
  const splineRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isSceneReady, setIsSceneReady] = useState(false);

  // Simulate loading delay and background loading of Spline
  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay for the loading animation

    return () => clearTimeout(delayTimeout);
  }, []);

  // This useEffect will mark the scene as ready once it is loaded
  useEffect(() => {
    // Preload the Spline scene in the background
    const preloadSpline = async () => {
      await import('@splinetool/react-spline');
    };

    preloadSpline();
  }, []);
  const handleSceneLoad = () => {
    setIsSceneReady(true); // Mark the scene as ready once it's fully loaded
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div
        className={`loader-container ${
          !isLoading && isSceneReady ? 'hidden' : ''
        }`}
      >
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <p className="light-font">Welcome! One second please</p>
        </div>
      </div>
      <section className={`scene-wrapper`}>
        <Suspense fallback={null}>
          <Spline
            onLoad={handleSceneLoad}
            scene="/scenes/gameboy_6.spline"
            ref={splineRef}
          />
        </Suspense>
      </section>
    </div>
  );
}

// ${isLoading && isSceneReady ? 'hidden' : ''}
