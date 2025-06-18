import { useContext } from "react";
import authContext from "../../store/auth-context";
import App from "../../App";
import Signup from "./Signup";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  const ctx = useContext(authContext);

  return (
    <>
      {/* {ctx.isLogin ? ( */}
      <App />
      {/* ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup-form" element={<Signup />} />
        </Routes>
      )} */}
    </>
  );
};
export default Login;
