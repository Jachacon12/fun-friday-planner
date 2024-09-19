import PropTypes from 'prop-types';
import useWeather from '../../hooks/useWeather';
import './style.css';

const Weather = ({ location }) => {
  const { weather, loading, error } = useWeather(location);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return weather ? (
    <div className="weather-card">
      <h2>{weather.location}</h2>
      <p>{weather.temperature}°C</p>
      <p>
        {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}
      </p>
    </div>
  ) : (
    <p>No data available</p>
  );
};

Weather.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Weather;
