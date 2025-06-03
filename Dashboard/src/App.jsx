import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import Menu from "./pages/Menu";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import Report from "./pages/Delivery & Reports";
import SettingsPage from "./pages/SettingsPage";
import Customer from "./pages/Customer";
import Table from "./pages/Table";
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/api/ping')
      .then(response => {
        console.log('API Response:', response.data);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>React and Laravel API Connection Test</h1>
    </div>
  );
}

export default App;
