import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import { AuthContextProvider } from "./store/auth-context.jsx";
import "./i18n";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Login />
        {/* <App /> */}
      </BrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>
);
