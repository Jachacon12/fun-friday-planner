import { useState, useEffect } from 'react';
import './style.css';
import { useTasks } from '../TasksProvider'; // Import the context

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_MOVIES_API;
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError('Error fetching trending movies');
        console.error(err);
      }
    };
    fetchTrendingMovies();
  }, []); // Only run this effect once

  const handleSelection = () => {
    const activeMovie = {
      text: `To watch: ${movies[currentIndex].title}`,
      checked: false,
    };
    setTasks(prevTasks => [...prevTasks, activeMovie]);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (error) return <div>{error}</div>;
  if (!movies.length) return <div>Loading...</div>;

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrev}>
        ‹
      </button>
      <header className="movie-header">
        <h3 className="dark-font">{movies[currentIndex].title}</h3>
        <button
          className="watch-btn"
          onClick={handleSelection}
          aria-label="Watch later"
        >
          Watch later
        </button>
      </header>
      <div className="carousel-inner">
        <div className="carousel-item">
          <img
            src={`https://image.tmdb.org/t/p/w400${movies[currentIndex].poster_path}`}
            alt={movies[currentIndex].title}
          />
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default Carousel;
