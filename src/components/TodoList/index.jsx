import React, { useState, useRef } from 'react';
import './style.css';
import { useTasks } from '../TasksProvider'; // Import the context

function TodoApp() {
  const { tasks, setTasks } = useTasks(); // Use tasks and setTasks from context
  const [input, setInput] = useState('');
  const inputRef = useRef();

  // Auto-focus the input field when the component mounts
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Add new task to the list
  const addTask = () => {
    if (input === '') {
      alert('You must write something!');
    } else {
      setTasks(prevTasks => [...prevTasks, { text: input, checked: false }]);
      setInput(''); // Clear input after adding
    }
  };

  // Toggle task checked state
  const toggleCheck = index => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  // Remove task from the list
  const removeTask = (index, e) => {
    e.stopPropagation(); // Prevent triggering the toggleCheck when deleting
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="todo-app">
      <div className="app-title">
        <h1 className="light-font">Friday Planner</h1>
      </div>
      <div className="row">
        <input
          type="text"
          id="input-box"
          placeholder="Add your task"
          value={input}
          onChange={e => setInput(e.target.value)}
          ref={inputRef}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ul id="list-container" className="todo-list">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? 'checked' : ''}
              onClick={() => toggleCheck(index)}
            >
              <p className="light-font">{task.text}</p>
              <button
                className="delete-btn"
                onClick={e => removeTask(index, e)}
                aria-label="Delete task"
              >
                DELETE
              </button>
              <hr />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
