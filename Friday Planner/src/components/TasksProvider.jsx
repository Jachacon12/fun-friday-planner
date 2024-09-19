import React, { useState, useContext, useEffect } from 'react';

// Create the context
const TasksContext = React.createContext();

// Custom hook to use the TasksContext
export const useTasks = () => {
  return useContext(TasksContext);
};

// Provider component that wraps the application
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
      console.error('Error parsing tasks from localStorage', error);
      return [];
    }
  });

  // Persist tasks to localStorage whenever the task list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Define the values provided to the context
  const value = {
    tasks,
    setTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
