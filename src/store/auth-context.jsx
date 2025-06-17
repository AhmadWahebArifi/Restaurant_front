import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const authContext = React.createContext({
  isLogin: false,
  onLogout: () => {},
  onLogin: (name, password) => {},
  onSignup: (username, email, password) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState();

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
    const userinfo = axios
      .post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "applicatioin/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          localStorage.setItem(email, password);
          setIsLogin(true);
        } else {
          setUserErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.res.data);
        setUserErrorMessage("اشتباه صورت گرفته");
      });
    setIsLogin(true);
    localStorage.setItem(name, password);
    console.log("login handler");
  };

  const onLogoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogged");
    console.log("logout handler");
  };

  const onSignInHandler = (username, email, password) => {
    const userinfo = axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          name: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "applicatioin/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => console.log(res.data))
      .then(() => setIsLogin(true))
      .then(() => setIsSign(true))
      .catch((err) => console.log(err.res.data));
    console.log(userinfo);
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
