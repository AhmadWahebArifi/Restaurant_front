import { UserCheck, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import { useTranslation } from "react-i18next";

const userStats = {
  totalUsers: 5,
  activeUsers: 4,
};

const UsersPage = () => {
  const [t] = useTranslation();
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={t("users")} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name={t("totalemployee")}
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name={t("activeemployee")}
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
        </motion.div>
        <UsersTable />
      </main>
    </div>
  );
};
export default UsersPage;
