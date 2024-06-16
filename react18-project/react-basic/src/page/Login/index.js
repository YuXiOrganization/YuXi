import { Link, useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const params = useParams()
  let id = params.id;

  return (
    <div>
      this is login
      <Link to="/">跳转页面</Link>
      <button onClick={() => navigate("/?id=1001&name=jack")}>带参传递</button>
      <br />
      <div>ID:{id}</div>
    </div>
  );
};

export default Login;
