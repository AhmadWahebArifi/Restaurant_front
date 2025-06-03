import React from "react";
import { useEffect, useState } from "react";
const authContext = React.createContext({
  isLogin: false,
  onLogout: () => {},
  onLogin: (name, password) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("ahmadarifi");
    if (userInfo === "123456") {
      setTimeout(() => {
        setIsLogin(true);
        // localStorage.removeItem("ahmadarifi");
      }, 0);
      // const identifier = setTimeout(() => {
      //   setIsLogin(true);
      // }, 0);
      // return () => {
      //   clearTimeout(identifier);
      // };
    }
  }, []);

  const onLoginHandler = (name, password) => {
    setIsLogin(true);
    localStorage.setItem(name, password);
    console.log("login handler");
  };

  const onLogoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogged");
    console.log("logout handler");
  };

  return (
    <authContext.Provider
      value={{
        isLogin: isLogin,
        onLogin: onLoginHandler,
        onLogout: onLogoutHandler,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default authContext;
