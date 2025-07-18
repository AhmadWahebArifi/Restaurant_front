import { useState } from "react";
import SettingSection from "./SettingSection";
import { TableIcon } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const table = () => {
  // import Notifications from "../components/settings/Notifications";
  const [notifications, setNotifications] = useState({
    table_1: false,
    table_2: false,
    table_3: false,
  });

  return (
    <SettingSection icon={TableIcon} title={"Table Status"}>
      <ToggleSwitch
        label={"Table_1"}
        isOn={notifications.table_1}
        onToggle={() =>
          setNotifications({
            ...notifications,
            table_1: !notifications.table_1,
          })
        }
      />
      <ToggleSwitch
        label={"Table_2"}
        isOn={notifications.table_2}
        onToggle={() =>
          setNotifications({
            ...notifications,
            table_2: !notifications.table_2,
          })
        }
      />
      <ToggleSwitch
        label={"Table_3"}
        isOn={notifications.table_3}
        onToggle={() =>
          setNotifications({
            ...notifications,
            table_3: !notifications.table_3,
          })
        }
      />
    </SettingSection>
  );
};

export default table;
