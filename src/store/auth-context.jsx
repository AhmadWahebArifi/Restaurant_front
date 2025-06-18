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

  const onLoginHandler = (email, password) => {
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
      .then((response) => {
        console.log(response.data.success);
        if (response.data.token) {
          localStorage.setItem(email, password);
          setIsLogin(true);
        } else {
          setUserErrorMessage(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setUserErrorMessage("Something went wrong !");
      });
    // setIsLogin(true);
    // localStorage.setItem(name, password);
    // console.log("login handler");
  };

  const onLogoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogged");
    console.log("logout handler");
  };

  const onSignInHandler = (
    username,
    email,
    password,
    password_confirmation
  ) => {
    const userinfo = axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          name: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
        {
          headers: {
            "Content-Type": "applicatioin/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => console.log(res.errors))
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
