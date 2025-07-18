import React from "react";
import { useEffect, useState } from "react";
import { authAPI } from "../axios";
import axios from "axios";

const authContext = React.createContext({
  isLogin: false,
  onLogout: () => { },
  onLogin: (name, password) => { },
  onSignup: (username, email, password) => { },
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState();

  useEffect(() => {
    const userInfo = localStorage.getItem("loggedIn");
    if (userInfo == 1) {
      setIsLogin(true);
    }
  }, []);

  const onLoginHandler = (email, password) => {
    authAPI
      .login(email, password)
      .then((response) => {
        console.log(response.data);

        if (response.data.success || response.status === 200) {
          // Store the token if it's returned
          if (response.data.token) {
            localStorage.setItem("auth-token", response.data.token);
          }
          localStorage.setItem("loggedIn", 1);
          setIsLogin(true);
        } else {
          setUserErrorMessage(response.data.message || "Login failed");
        }
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
        setUserErrorMessage("Something went wrong!");
      });
  };

  const onLogoutHandler = () => {
    authAPI
      .logout()
      .then(() => {
        setIsLogin(false);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("auth-token");
        console.log("logout handler");
      })
      .catch((error) => {
        console.log("Logout error:", error);
        // Even if logout fails, clear local state
        setIsLogin(false);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("auth-token");
      });
  };

  const onSignInHandler = (
    username,
    email,
    password,
    password_confirmation
  ) => {
    const userData = {
      name: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    authAPI
      .register(userData)
      .then((response) => {
        console.log("Register success:", response.data.token);
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("loggedIn", 1);
        setIsLogin(true);
        setIsSign(true);
      })
      .catch((error) => {
        console.log("Register error:", error.response?.data || error.message);
        setUserErrorMessage(
          error.response?.data?.message || "Registration failed"
        );
      });
  };

  return (
    <authContext.Provider
      value={{
        isSign: isSign,
        isLogin: isLogin,
        userErrorMessage: userErrorMessage,
        onLogin: onLoginHandler,
        onLogout: onLogoutHandler,
        onSignup: onSignInHandler,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default authContext;
