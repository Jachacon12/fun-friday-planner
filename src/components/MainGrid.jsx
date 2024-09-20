import { useState, useEffect, useCallback } from 'react';
import DigitalClock from '../components/DigitalClock/index';
import TrendingMovies from '../components/TrendingMovies/index';
import WeatherWidget from './WeatherWidget';
import TodoApp from './TodoList/index';
import { TasksProvider } from './TasksProvider';

export default function MainGrid({ togglePanel, updateContentRef, onLogout }) {
  const [content, setContent] = useState({
    location: null,
    dinner: null,
    drink: null,
  });

  // Function to retrieve and parse localStorage data
  const getFromLocalStorage = useCallback(() => {
    const data = localStorage.getItem('options');
    return data ? JSON.parse(data) : {};
  }, []);

  // Function to update content from localStorage and store it in state
  const updateContent = useCallback(() => {
    const { location, dinner, drink } = getFromLocalStorage();
    setContent({
      location: location || null,
      dinner: dinner || null,
      drink: drink || null,
    });
  }, [getFromLocalStorage]);

  // Provide the updateContent function to the parent via the updateContentRef
  useEffect(() => {
    if (updateContentRef) {
      updateContentRef.current = updateContent;
    }

    // Update content initially when the component mounts
    updateContent();
  }, [updateContent, updateContentRef]);

  // Helper function to render each card
  const renderCard = (
    title,
    contentKey,
    assetKey,
    defaultText = '-',
    defaultImage = 'question-box'
  ) => {
    return (
      <article className="card highlight ratio2-1">
        <header>
          <h3>{title}</h3>
        </header>
        <footer>
          <p className="choice">{content[contentKey] || defaultText}</p>
          <p className="action-link" onClick={togglePanel}>
            Select an option
          </p>
        </footer>
        <figure>
          <img
            src={`/src/assets/img/${content[assetKey] || defaultImage}.png`}
            alt={defaultImage}
          />
        </figure>
      </article>
    );
  };

  return (
    <TasksProvider>
      <div className="custom-grid">
        <div className="sidebar">
          <TodoApp />
        </div>
        {renderCard(
          "Tonight's Location",
          'location',
          'location',
          '-',
          'question-box'
        )}
        {renderCard('Dinner', 'dinner', 'dinner', '-', 'question-box')}
        {renderCard('Drink', 'drink', 'drink', '-', 'question-box')}
        <article className="card mini-game ratio2-1">
          <WeatherWidget location="madrid" />
        </article>
        <article className="card large-card movies">
          <TrendingMovies />
        </article>
        <article className="card clock-tile ratio2-1">
          <DigitalClock onLogout={onLogout} />
        </article>
        <article className="card large-card music-player">
          <iframe
            className="iframe"
            src="https://open.spotify.com/embed/playlist/3EMmeF6F28zxhrVQGBMRUZ?utm_source=generator"
            width="100%"
            height="600px"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </article>
      </div>
    </TasksProvider>
  );
}
