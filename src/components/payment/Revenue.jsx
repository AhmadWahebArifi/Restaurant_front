import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Eye, Trash2, X } from "lucide-react";
import api from "../../axios";
import ProgressBar from "../common/ProgressBar";
import SuccessCard from "../common/SuccessCard";
import { useTranslation } from "react-i18next";


const Revenue = () => {
    const [t] = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/revenue");
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

    return (
        <motion.div
            className=" bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Order List</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t("search")}
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
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                 bg-green-100 text-gray-900`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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
        </motion.div>
    );
};
export default Revenue;
