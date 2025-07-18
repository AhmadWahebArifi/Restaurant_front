import AddMenuItem from "../components/menu/AddMenuItem";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CustomerTable from "../components/customer/CustomerTable";

const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
};
const AddMenuItemForm = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleCustomerAdded = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Add Menu Item" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                </motion.div>
            </main>
            <AddMenuItem />
        </div>
    );
};
export default AddMenuItemForm;
