import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from '../containers/Home';
import Planner from '../containers/Planner';

function Router() {
  // Tracking the current location and key
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="route">
        <div className="route-wrapper">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Planner />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Router;
