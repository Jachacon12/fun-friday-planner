import { useState, useEffect, useCallback } from 'react';
import Weather from './Weather';
import LocationOverlay from './LocationOverlay'; // Renamed for clarity
import './style.css'; // Optional: for styling

const WeatherWidget = () => {
  const [location, setLocation] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);

  // Check localStorage on component mount to see if a location is stored
  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(storedLocation);
      setShowOverlay(false); // Don't show overlay if location is already stored
    }
  }, []);

  // Handle location submission
  const handleLocationSubmit = useCallback(newLocation => {
    localStorage.setItem('location', newLocation); // Store location in localStorage
    setLocation(newLocation);
    setShowOverlay(false); // Hide overlay after submission
  }, []);

  return (
    <div className="root">
      {showOverlay && (
        <LocationOverlay onLocationSubmit={handleLocationSubmit} />
      )}
      {location && <Weather location={location} />}
    </div>
  );
};

export default WeatherWidget;
