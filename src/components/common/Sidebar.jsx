import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  LayoutGrid,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProgressBar from "./ProgressBar";

const Sidebar = () => {
  const { t, i18n } = useTranslation();

  const SIDEBAR_ITEMS = [
    {
      name: t("overview"),
      icon: BarChart2,
      color: "#6366f1",
      href: "/",
    },
    {
      name: t("menu"),
      icon: ShoppingBag,
      color: "#8B5CF6",
      href: "/products",
    },
    {
      name: t("customer"),
      icon: UserCircle,
      color: "#6EE7B7",
      href: "/customer",
    },
    { name: t("table"), icon: LayoutGrid, color: "#6EE7B7", href: "/table" },
    { name: t("users"), icon: Users, color: "#EC4899", href: "/users" },
    {
      name: t("payments"),
      icon: DollarSign,
      color: "#10B981",
      href: "/payment",
    },
    {
      name: t("addorders"),
      icon: ShoppingCart,
      color: "#F59E0B",
      href: "/add_orders",
    },
    {
      name: t("orders"),
      icon: ShoppingCart,
      color: "#F59E0B",
      href: "/orders",
    },
    { name: t("setting"), icon: Settings, color: "#6EE7B7", href: "/settings" },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progressTrigger, setProgressTrigger] = useState(0);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-blue-950 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        {/* Progress Bar at the top */}
        <div className="mb-2">
          <ProgressBar trigger={progressTrigger} />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setProgressTrigger((prev) => prev + 1)}
            >
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
