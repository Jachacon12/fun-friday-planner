import { useState, useEffect } from 'react';

const useWeather = (location, coords) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        let url;
        const weatherApi = import.meta.env.VITE_WEATHER_API;
        if (coords) {
          // Fetch weather using coordinates
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${weatherApi}`;
        } else {
          // Fetch weather using location name
          url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherApi}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        setWeather({
          location: data.name,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, coords]);

  return { weather, loading, error };
};

export default useWeather;
