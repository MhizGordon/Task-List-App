import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="side-bar">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        Home
      </NavLink>
      <hr className="nav-divider" />
      <NavLink to="/tasks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        Tasks
      </NavLink>
    </nav>
  );
};

export default Sidebar;
