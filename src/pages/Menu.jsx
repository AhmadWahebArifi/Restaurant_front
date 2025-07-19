import { motion } from "framer-motion";
import AddMenuItem from "../components/menu/AddMenuItem";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/products/CategoryDistributionChart";
import ProductsTable from "../components/products/ProductsTable";
import MenuForm from "../components/menu/menuForm";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import SuccessCard from "../components/common/SuccessCard";

const ProductsPage = () => {
  const { t, i18n } = useTranslation();
  const me = t("menu");
  const ts = t("totalorders");
  const tos = t("topselling");
  const re = t("totalrevenue");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMenuItemAdded = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setShowSuccess(true);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={me} />
      {showSuccess && (
        <SuccessCard
          message="Menu item added successfully!"
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
          <StatCard name={ts} icon={Package} value={1234} color="#6366F1" />
          <StatCard name={tos} icon={TrendingUp} value={89} color="#10B981" />
          <StatCard
            name={re}
            icon={DollarSign}
            value={"$543,210"}
            color="#EF4444"
          />
        </motion.div>
        {/* <MenuForm /> */}
        <AddMenuItem onCustomerAdded={handleMenuItemAdded} />
        <ProductsTable refreshTrigger={refreshTrigger} />
        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          {/* <SalesTrendChart /> */}
          {/* <CategoryDistributionChart /> */}
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
