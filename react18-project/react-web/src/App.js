import "./index.css";
import { Outlet } from "react-router-dom";

const App = () => {
  // const navigate = useNavigate();
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
