import { useRef, useState, useContext, useEffect } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import OrderItemTable from "./OrderItemTable";

const AddOrderForm = ({ onCustomerAdded }) => {
  const ctx = useContext(authContext);

  const [error, setError] = useState("");
  const [status, setStatus] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shirini, setShirini] = useState([]);
  const [khuraka, setKhuraka] = useState([]);
  const [nushaba, setNushaba] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  // State for form fields
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // State for resetting selects
  const [nushabaSelect, setNushabaSelect] = useState("");
  const [shiriniSelect, setShiriniSelect] = useState("");
  const [khurakaSelect, setKhurakaSelect] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/order/create");
        setStatus(response.data.status);
        setCustomers(response.data.customers);
        setShirini(response.data.shirini);
        setKhuraka(response.data.khuraka);
        setNushaba(response.data.nushaba);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleItemSelect = (categoryItems, selectedId, setSelectValue) => {
    const selected = categoryItems.find(item => item.id == selectedId);
    if (selected && !orderItems.find(item => item.id == selected.id)) {
      setOrderItems(prev => [...prev, { ...selected, amount: 1 }]);
    }
    setSelectValue(""); // Reset dropdown to default
  };

  return (
    <div>
      <form method="post" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap">
          {/* Customer Select */}
          <div className="p-5">
            <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
              Customer Name
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark"
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table Number */}
          <div className="p-5">
            <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
              Table Number
            </label>
            <input
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              type="text"
              placeholder="Enter Table Number"
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark"
              required
            />
          </div>

          {/* Order Status */}
          <div className="p-5">
            <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
              Order Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark"
            >
              <option value="">Select Order Status</option>
              {status.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Nushaba Bab */}
          <div className="p-5">
            <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
              Nushaba Bab
            </label>
            <select
              value={nushabaSelect}
              onChange={(e) => handleItemSelect(nushaba, e.target.value, setNushabaSelect)}
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark"
            >
              <option value="">Select Nushaba Bab</option>
              {nushaba.map((nus) => (
                <option key={nus.id} value={nus.id}>
                  {nus.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shirini Bab */}
          <div className="p-5">
            <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
              Shirini Bab
            </label>
            <select
              value={shiriniSelect}
              onChange={(e) => handleItemSelect(shirini, e.target.value, setShiriniSelect)}
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark"
            >
              <option value="">Select Shirini Bab</option>
              {shirini.map((shir) => (
                <option key={shir.id} value={shir.id}>
                  {shir.name}
                </option>
              ))}
            </select>
          </div>

          {/* Khuraka Bab */}
          <div className="p-5">
            <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
              Khuraka Bab
            </label>
            <select
              value={khurakaSelect}
              onChange={(e) => handleItemSelect(khuraka, e.target.value, setKhurakaSelect)}
              className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark"
            >
              <option value="">Select Khuraka Bab</option>
              {khuraka.map((khu) => (
                <option key={khu.id} value={khu.id}>
                  {khu.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Order Items Table */}
      <OrderItemTable
        items={orderItems}
        setItems={setOrderItems}
        customerId={selectedCustomer}
        tableNumber={tableNumber}
        orderStatus={selectedStatus}
      />
    </div>
  );
};
export default AddOrderForm;
