import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css'; // Optional: for styling

const LocationOverlay = ({ onLocationSubmit }) => {
  const [location, setLocation] = useState('');

  // Memoize handleSubmit to avoid unnecessary re-renders
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const trimmedLocation = location.trim();
      if (trimmedLocation) {
        onLocationSubmit(trimmedLocation);
        setLocation(''); // Reset input after submission
      }
    },
    [location, onLocationSubmit]
  );

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Add Location</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

LocationOverlay.propTypes = {
  onLocationSubmit: PropTypes.func.isRequired,
};

export default LocationOverlay;
