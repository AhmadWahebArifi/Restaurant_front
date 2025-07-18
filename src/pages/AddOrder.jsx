import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CustomerTable from "../components/customer/CustomerTable";
import SuccessCard from "../components/common/SuccessCard";

const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
};

// {showSuccess && <SuccessCard onClose={() => setShowSuccess(false)} />}
const AddOrder = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCustomerAdded = useCallback(() => {
        setRefreshTrigger((prev) => prev + 1);
        setShowSuccess(true);
    }, []);

    {
        showSuccess && <SuccessCard onClose={() => setShowSuccess(false)} />;
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Add Orders" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="Total Users"
                        icon={UsersIcon}
                        value={userStats.totalUsers.toLocaleString()}
                        color="#6366F1"
                    />
                    <StatCard
                        name="New Users Today"
                        icon={UserPlus}
                        value={userStats.newUsersToday}
                        color="#10B981"
                    />
                    <StatCard
                        name="Active Users"
                        icon={UserCheck}
                        value={userStats.activeUsers.toLocaleString()}
                        color="#F59E0B"
                    />
                    <StatCard
                        name="Churn Rate"
                        icon={UserX}
                        value={userStats.churnRate}
                        color="#EF4444"
                    />
                </motion.div>
            </main>
            <CustomerForm onCustomerAdded={handleCustomerAdded} />
            <CustomerTable refreshTrigger={refreshTrigger} />
        </div>
    );
};
export default AddOrder;
