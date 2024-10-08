import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(index)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => editTask(index)}>Edit</button>
            {editingIndex === index && (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
