import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CustomerTable from "../components/customer/CustomerTable";
import SuccessCard from "../components/common/SuccessCard";
import { useTranslation } from "react-i18next";

const userStats = {
  totalUsers: 152,
  activeUsers: 20,
  churnRate: "2.4%",
};

// {showSuccess && <SuccessCard onClose={() => setShowSuccess(false)} />}
const Customer = () => {
  const { t, i18n } = useTranslation();

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleCustomerAdded = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setShowSuccess(true);
    setEditingCustomer(null); // Clear editing state after successful operation
  }, []);

  const handleEditCustomer = useCallback((customer) => {
    setEditingCustomer(customer);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingCustomer(null);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={t("customer")} />
      {showSuccess && (
        <SuccessCard
          message="Customer added successfully!"
          duration={2000}
          inPage={true}
          onClose={() => setShowSuccess(false)}
        />
      )}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name={t("totalusers")}
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name={t("activeusers")}
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
        </motion.div>
      </main>
      <CustomerForm
        onCustomerAdded={handleCustomerAdded}
        editingCustomer={editingCustomer}
        onCancelEdit={handleCancelEdit}
      />
      <CustomerTable
        refreshTrigger={refreshTrigger}
        onEditCustomer={handleEditCustomer}
      />
    </div>
  );
};
export default Customer;
