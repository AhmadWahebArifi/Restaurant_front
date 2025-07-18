import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import Menu from "./pages/Menu";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
import Report from "./pages/Delivery & Reports";
import SettingsPage from "./pages/SettingsPage";
import Customer from "./pages/Customer";
import Table from "./pages/Table";
import AddMenuItemForm from "./pages/AddMenuItemForm";
function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/create" element={<AddMenuItemForm />} />
        <Route path="/products" element={<Menu />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/table" element={<Table />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<Report />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
