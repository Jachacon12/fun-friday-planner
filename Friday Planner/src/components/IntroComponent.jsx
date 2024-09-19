import { useRef, useEffect } from 'react';

const IntroComponent = () => {
  const containerRef = useRef();
  const rootRef = useRef();

  function animate() {
    const containerElment = containerRef.current;
    const containerChildren = containerElment.children;
    if (containerChildren.length > 0) {
      Object.values(containerChildren).map((child, i) => {
        child.style.animation = `color 4s ${0.1 * i}s linear, mover_g 1s ${
          0.1 * i
        }s linear`;
      });
      activateBackground();
    }

    function activateBackground() {
      if (rootRef.current) rootRef.current.className = 'container bg-active';
    }
  }

  useEffect(() => {
    const handleLoad = () => {
      animate();
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  return (
    <div className="container" ref={rootRef}>
      <ul ref={containerRef}>
        <li>G</li>
        <li>A</li>
        <li>M</li>
        <li>E</li>
        <li>&nbsp; </li>
        <li>B</li>
        <li>O</li>
        <li>Y</li>
      </ul>
    </div>
  );
};

export default IntroComponent;
