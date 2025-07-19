import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Eye, Trash2, X } from "lucide-react";
import api from "../../axios";
import ProgressBar from "../common/ProgressBar";
import SuccessCard from "../common/SuccessCard";
import { useTranslation } from "react-i18next";

const OrderTable = [];

const OrdersTable = () => {
  const [t] = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal
  const [newStatus, setNewStatus] = useState(""); // For status update
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [progressTrigger, setProgressTrigger] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/order");
      const orders = response.data.orders || [];
      setOrders(orders);
      setFilteredOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(orders);
  useEffect(() => {
    fetchOrders();
  }, []); // Refetch when refreshTrigger changes

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.id.toString().toLowerCase().includes(term) ||
        order.customer?.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      console.log("Attempting to delete order:", orderToDelete.id);
      const response = await api.delete(`/api/order/${orderToDelete.id}`);
      console.log("Delete response:", response);
      if (response.status === 200 || response.status === 204) {
        setOrders((prev) => prev.filter((o) => o.id !== orderToDelete.id));
        setFilteredOrders((prev) =>
          prev.filter((o) => o.id !== orderToDelete.id)
        );
        setShowSuccess(true);
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      alert(
        `Failed to delete order. Status: ${error.response?.status || "Unknown"}`
      );
    } finally {
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  };

  const updateStatus = async () => {
    try {
      await api.put(`api/order/update-status/${selectedOrder.id}`, {
        order_status: newStatus,
      });
      
      // If status is changed to "Served", remove the order from the table
      if (newStatus === "Served") {
        setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
        setFilteredOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
      } else {
        // Otherwise, just update the status
        setOrders((prev) =>
          prev.map((o) =>
            o.id === selectedOrder.id ? { ...o, status: newStatus } : o
          )
        );
        setFilteredOrders((prev) =>
          prev.map((o) =>
            o.id === selectedOrder.id ? { ...o, status: newStatus } : o
          )
        );
      }
      
      closeModal();
      setProgressTrigger(false); // reset before triggering
      setTimeout(() => setProgressTrigger(true), 10); // trigger progress bar
      setTimeout(() => setProgressTrigger(false), 1200); // hide after animation
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status.");
    }
  };

  return (
    <motion.div
      className=" bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Progress Bar Animation */}
      <div className="mb-2">
        <ProgressBar trigger={progressTrigger} />
      </div>
      {showSuccess && (
        <SuccessCard
          message="Order deleted successfully!"
          duration={2000}
          inPage={true}
          onClose={() => setShowSuccess(false)}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Order List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("orderid")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("customer")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("tablenumber")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("total")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("action")}
              </th>
            </tr>
          </thead>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-300 py-4">
                Loading orders...
              </td>
            </tr>
          ) : (
            <tbody className="divide divide-gray-700">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {order.table_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Preparing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Pending"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800" // Served
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                      onClick={() => openModal(order)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteClick(order)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Are you sure?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // 👈 Close when clicking outside
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Update Order
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border border-gray-300 text-black rounded-lg p-2"
                >
                  <option value="Pending" className="text-black">
                    Pending
                  </option>
                  <option value="Preparing" className="text-black">
                    Preparing
                  </option>
                  <option value="Served" className="text-black">
                    Served
                  </option>
                  {/* // <option value="Completed" className="text-black">Completed</option> */}
                </select>
              </div>
              <button
                onClick={updateStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 w-full"
              >
                Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default OrdersTable;
