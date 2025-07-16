import React from "react";
import { useEffect, useState } from "react";
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
      // localStorage.removeItem("ahmadarifi");

      // const identifier = setTimeout(() => {
      //   setIsLogin(true);
      // }, 0);
      // return () => {
      //   clearTimeout(identifier);
      // };
    }
  }, []);

  const onLoginHandler = (email, password) => {
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    })
      .then(() => {
        // ✅ return this so the next .then gets the response
        return axios.post('http://127.0.0.1:8000/api/login', {
          email,
          password,
        }, {
          withCredentials: true,
        });
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.success || response.status === 200) {
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


  // const userinfo = axios
  //   .post(
  //     "http://127.0.0.1:8000/api/login",
  //     {
  //       email: email,
  //       password: password,
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("auth_token"),
  //         "Content-Type": "applicatioin/json",
  //         Accept: "application/json",
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response.data.success);
  //     if (response.data.token) {
  //       localStorage.setItem("loggedIn", 1);
  //       setIsLogin(true);
  //     } else {
  //       setUserErrorMessage(res.data.message);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error.response.data.errors);
  //     setUserErrorMessage("Something went wrong !");
  //   });
  // setIsLogin(true);
  // localStorage.setItem(name, password);
  // console.log("login handler");
  // };

  const onLogoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogged");
    console.log("logout handler");
  };

  const onSignInHandler = (username, email, password, password_confirmation) => {
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    })
      .then(() => {
        // ✅ Return the POST request so the next .then() receives the result
        return axios.post(
          "http://127.0.0.1:8000/api/register",
          {
            name: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
          {
            withCredentials: true,
          }
        );
      })
      .then((response) => {
        console.log("Register success:", response.data.token);
        localStorage.setItem("auth-token", response.data.token);
        setIsLogin(true);
        setIsSign(true);
      })
      .catch((error) => {
        console.log("Register error:", error.response?.data || error.message);
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
