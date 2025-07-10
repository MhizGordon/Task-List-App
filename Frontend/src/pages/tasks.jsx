import { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Fetches tasks on page open

  return (
    <div className="container mt-4">
      <h2>Tasks</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item">
            <strong>{task.id}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
