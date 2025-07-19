import { AnimatePresence, motion } from "framer-motion";
import { Eye, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../axios";

const PaymentTable = () => {
  const [t] = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null); // For modal

  // Track inputs for modal form
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/payment");
      const ordersbackend = response.data.orders || [];
      setOrders(ordersbackend);
      setFilteredOrders(ordersbackend);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(orders);
  // console.log(orders);
  useEffect(() => {
    fetchOrders();
  }, []); // Refetch when refreshTrigger changes

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(term) ||
        order.phone.toLowerCase().includes(term)
    );

    setFilteredOrders(filtered);
  };


  const openModal = (order) => {
    setSelectedPayment(order);
  };

  const closeModal = () => {
    setSelectedPayment(null);
  };

  const createPayment = async () => {
    try {
      // Example API call to update payment info
      const data = {
        order_status: status,
        payment_method: paymentMethod,
        order_id: selectedPayment.id
      }
      console.log(data.order_status);
      await api.post(`/api/payment`, data);
      // Update local state with new values
      console.log("ok");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedPayment.id
            ? { ...o, status: status, payment_method: paymentMethod }
            : o
        )
      );
      setFilteredOrders((prev) =>
        prev.map((o) =>
          o.id === selectedPayment.id
            ? { ...o, status: status, payment_method: paymentMethod }
            : o
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Failed to Create payment information.");
    }
  };
  // console.log(status);
  return (
    <motion.div
      className="m-4 bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Payments</h2>
        <div className="relative">
          <input
            type="text"
            placeholder={t("search")}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("order_id")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("customer")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("amount")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("table number")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-300 py-4">
                Loading orders...
              </td>
            </tr>
          ) :
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    {product.id}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.status}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.table_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2" onClick={() => openModal(product)} >
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          }
        </table>

        {/* Modal */}
        <AnimatePresence>
          {selectedPayment && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal} // Close when clicking outside modal background
            >
              <motion.form
                onSubmit={(e) => {
                  e.preventDefault();
                  createPayment();
                }}
                className="bg-white rounded-xl shadow-lg p-6 w-96"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing modal on click inside
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Payment Form</h3>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700" type="button">
                    <X size={20} />
                  </button>
                </div>
                {/* Amount - readonly */}
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2" htmlFor="amount">Amount</label>
                  <input
                    id="amount"
                    type="text"
                    value={selectedPayment.total ?? selectedPayment.amount ?? ''}
                    readOnly
                    className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-lg p-2"
                  />
                </div>

                {/* Payment Method - readonly */}
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2" htmlFor="payment_method">Payment Method</label>

                  <select
                    id="payment_method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border border-gray-300 text-black rounded-lg p-2"
                    required
                  >
                    <option value="">Select Payment Methods</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>

                {/* Status - editable select */}
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2" htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 text-black rounded-lg p-2"
                    required
                  >
                    <option value="">Select Order Status</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 mt-6 py-2 rounded-lg hover:bg-blue-500 w-full"
                >
                  Save Changes
                </button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};
export default PaymentTable;
