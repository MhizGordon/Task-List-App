import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Tasks from './pages/tasks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}

export default App;
