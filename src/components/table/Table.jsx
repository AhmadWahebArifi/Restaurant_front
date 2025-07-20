import { useState } from "react";
import SettingSection from "./SettingSection";
import { TableIcon } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import { useTranslation } from "react-i18next";

const table = () => {
  const t1 = "table_1";
  const t2 = "table_2";
  const t3 = "table_3";
  const [t] = useTranslation();
  // import Notifications from "../components/settings/Notifications";
  const [notifications, setNotifications] = useState({
    table_1: localStorage.getItem(t1) === "true",
    table_2: localStorage.getItem(t2) === "true",
    table_3: localStorage.getItem(t3) === "true",
  });

  const [tableCount, setTableCount] = useState(1);
  return (
    <SettingSection icon={TableIcon} title={"Table Status"}>
      <ToggleSwitch
        label={`${t("table")} ${tableCount}`}
        isOn={notifications.table_1}
        onToggle={() => {
          setNotifications({
            ...notifications,
            table_1: !notifications.table_1,
          });
          localStorage.setItem(t1, !notifications.table_1);
        }}
      />
      <ToggleSwitch
        label={`${t("table")} ${tableCount + 1}`}
        isOn={notifications.table_2}
        onToggle={() => {
          setNotifications({
            ...notifications,
            table_2: !notifications.table_2,
          });
          localStorage.setItem(t2, !notifications.table_2);
        }}
      />
      <ToggleSwitch
        label={`${t("table")} ${tableCount + 2}`}
        isOn={notifications.table_3}
        onToggle={() => {
          setNotifications({
            ...notifications,
            table_3: !notifications.table_3,
          });
          localStorage.setItem(t3, !notifications.table_3);
        }}
      />
    </SettingSection>
  );
};

export default table;
