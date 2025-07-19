import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import Menu from "./pages/Menu";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
// import Report from "./pages/Delivery & Reports";
import SettingsPage from "./pages/SettingsPage";
import Customer from "./pages/Customer";
import Table from "./pages/Table";
import Payment from "./pages/Payment";
import AddOrder from "./pages/AddOrder";
import authContext from "./store/auth-context";
import { useContext, useEffect } from "react";
import Revenue from "./components/payment/Revenue";
import RevenueReport from "./pages/RevenueReport";

function App() {
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  // Listen for changes to auth-token in localStorage and logout if removed
  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        ctx.onLogout && ctx.onLogout();
        navigate("/");
      }
    }

    // Listen for storage changes (other tabs)
    window.addEventListener("storage", checkToken);

    // Poll for changes in this tab
    let lastToken = localStorage.getItem("auth-token");
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("auth-token");
      if (currentToken !== lastToken) {
        lastToken = currentToken;
        checkToken();
      }
    }, 500);

    // Initial check
    checkToken();

    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, [ctx, navigate]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/products" element={<Menu />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/table" element={<Table />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/add_orders" element={<AddOrder />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/revenue" element={<RevenueReport />} />
        {/* <Route path="/analytics" element={<Report />} /> */}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
