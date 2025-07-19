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
    <div className="space-y-8">
      {/* Form Section - Centered */}
      <div className="flex justify-center mt-8">
        <div className="max-w-4xl w-full">
          <form method="post" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Customer Select */}
              <div>
                <label className="mb-2.5 block text-base font-medium text-gray-300">
                  Customer Name
                </label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id} className="bg-gray-800 text-gray-300">
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table Number */}
              <div>
                <label className="mb-2.5 block text-base font-medium text-gray-300">
                  Table Number
                </label>
                <input
                  value={tableNumber}
                  onChange={e => {
                    // Only allow positive integers
                    const val = e.target.value;
                    if (val === "" || (/^[0-9]+$/.test(val) && Number(val) > 0)) {
                      setTableNumber(val);
                    }
                  }}
                  type="number"
                  min={1}
                  placeholder="Enter Table Number"
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Order Status */}
              <div>
                <label className="mb-2.5 block text-base font-medium text-gray-300">
                  Order Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select Order Status</option>
                  {status.map((s, index) => (
                    <option key={index} value={s} className="bg-gray-800 text-gray-300">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nushaba Bab */}
              <div>
                <label className="mb-2.5 block text-base font-medium text-gray-300">
                  Nushaba Bab
                </label>
                <select
                  value={nushabaSelect}
                  onChange={(e) => handleItemSelect(nushaba, e.target.value, setNushabaSelect)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select Nushaba Bab</option>
                  {nushaba.map((nus) => (
                    <option key={nus.id} value={nus.id} className="bg-gray-800 text-gray-300">
                      {nus.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shirini Bab */}
              <div>
                <label className="mb-2.5 block text-base font-medium text-gray-300">
                  Shirini Bab
                </label>
                <select
                  value={shiriniSelect}
                  onChange={(e) => handleItemSelect(shirini, e.target.value, setShiriniSelect)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select Shirini Bab</option>
                  {shirini.map((shir) => (
                    <option key={shir.id} value={shir.id} className="bg-gray-800 text-gray-300">
                      {shir.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Khuraka Bab */}
              <div>
                <label className="mb-2.5 block text-base font-medium text-gray-300">
                  Khuraka Bab
                </label>
                <select
                  value={khurakaSelect}
                  onChange={(e) => handleItemSelect(khuraka, e.target.value, setKhurakaSelect)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select Khuraka Bab</option>
                  {khuraka.map((khu) => (
                    <option key={khu.id} value={khu.id} className="bg-gray-800 text-gray-300">
                      {khu.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Order Items Table - Full Width Below */}
      <div>
        <OrderItemTable
          items={orderItems}
          setItems={setOrderItems}
          customerId={selectedCustomer}
          tableNumber={tableNumber}
          orderStatus={selectedStatus}
        />
      </div>
    </div>
  );
};
export default AddOrderForm;
