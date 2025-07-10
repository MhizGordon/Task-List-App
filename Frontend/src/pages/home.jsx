import { FcHome, FcTodoList, FcCheckmark } from "react-icons/fc";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";


const Home = () => {
  return (
    <Container className="home-container"> 
      <h1><FcHome className="Welcome" />    Welcome to Your Task App</h1>
      <p>Organize your tasks with a colorful, simple interface.</p>

      <ul className="list">
        <li className="icon"><FcTodoList className="icons" /> Real-time task updates</li>
        <li className="icon"><FcCheckmark className="icons" /> Check off completed tasks</li>
      </ul>

      <Link to="/tasks">
        <Button variant="contained" size="lg" className="button">Go to Tasks</Button>
      </Link>
    </Container>
  );
};

export default Home;
