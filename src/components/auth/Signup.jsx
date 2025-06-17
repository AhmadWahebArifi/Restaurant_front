import { useContext } from "react";
import authContext from "../../store/auth-context";
import SignupForm from "./SignupForm";
import App from "../../App";

const Signup = () => {
  const ctx = useContext(authContext);
  return <>{ctx.isLogin ? <App /> : <SignupForm />}</>;
};
export default Signup;
