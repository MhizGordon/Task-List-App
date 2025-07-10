import { useEffect, useState } from 'react';
import axios from 'axios';

const TASKS_STORAGE_KEY = 'myTasksAppTasks';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Load tasks from localStorage or API on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      fetchTasks();
    }
  }, []);

  // Save tasks to localStorage whenever tasks change (excluding empty ones)
  useEffect(() => {
    const validTasks = tasks.filter(task => task.description && task.description.trim() !== '');
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(validTasks));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/tasks');
      const tasksWithCompleted = response.data.map(task => ({
        ...task,
        completed: false,
      }));
      setTasks(tasksWithCompleted);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      description: newTaskText.trim(),
      completed: false,
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskText('');
  };

  return (
    <div className="container mt-4">
      <h2>Tasks</h2>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Write a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      {tasks.length > 0 && (
        <ol className="list-group list-group-numbered">
          {tasks.map(task => (
            <li
              key={task.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="me-3"
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#888' : '#000',
                    fontStyle: task.completed ? 'italic' : 'normal',
                  }}
                >
                  {task.description}
                </span>
              </div>

            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Tasks;
