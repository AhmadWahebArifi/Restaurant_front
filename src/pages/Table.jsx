import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { useTranslation } from "react-i18next";
import { Package } from "lucide-react";
import T from "../components/table/Table";
import TableForm from "../components/table/TableForm";

const Table = () => {
  const [t] = useTranslation();
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={t("table")} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name={t("totaltable")}
            icon={Package}
            value={3}
            color="#6366F1"
          />
        </motion.div>
        {/* <TableForm /> */}
        <T />
      </main>
    </div>
  );
};
export default Table;
