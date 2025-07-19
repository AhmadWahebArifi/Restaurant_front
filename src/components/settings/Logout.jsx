import { useContext } from "react";
import authContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const ctx = useContext(authContext);

  const handleLogout = () => {
    ctx.onLogout && ctx.onLogout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-end w-full">
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 rounded bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm shadow hover:from-red-600 hover:to-pink-600 transition-all duration-200 ml-2"
        style={{ minWidth: "70px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
