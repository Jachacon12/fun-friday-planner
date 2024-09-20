import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/index';
import Planner from './containers/Planner';
import Home from './containers/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token in localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update state
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {/* Login Route: Accessible only when not authenticated */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      <Route path="/" element={<Home />} />

      {/* Dashboard Route: Only accessible if authenticated */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Planner onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all route to handle any unknown paths */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/' : '/login'} />}
      />
    </Routes>
  );
}

export default App;
