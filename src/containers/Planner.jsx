import { useState, useRef } from 'react';
import IntroComponent from '../components/IntroComponent.jsx';
import FridayOptions from '../components/FridayOptions';
import '../assets/styles/intro.css';
import MainGrid from '../components/MainGrid.jsx';

const App = ({ onLogout }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const updateContentRef = useRef(null);
  const togglePanel = () => {
    setIsPanelVisible(prev => !prev);
  };
  const closePanel = () => {
    setIsPanelVisible(false);
    if (updateContentRef.current) {
      // Trigger updateContent from MainGrid
      updateContentRef.current();
    }
  };

  return (
    <div>
      <div className="app-container">
        <IntroComponent />
        <main className="dashboard">
          <MainGrid
            togglePanel={togglePanel}
            updateContentRef={updateContentRef}
            onLogout={onLogout}
          />
          <FridayOptions isVisible={isPanelVisible} closePanel={closePanel} />
        </main>
      </div>
    </div>
  );
};

export default App;
