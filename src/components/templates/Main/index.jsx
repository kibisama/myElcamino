// import DailyOrder from "../DailyOrder";
// import ScanModal from "../../modals/ScanModal";
// import PickupModal from "../../modals/PickupModal";
// import SettingsModal from "../../modals/SettingsModal";
// import Delivery from "../Delivery";
// import PickupLog from "../PickupLog";
// import UploadCSV from "../../modals/UploadCSV";

import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";

const Main = () => {
  // const { apps, darkMode, screen } = useSelector((state) => state.global);
  return (
    <AppTheme>
      <CssBaseline>
        <Dashboard />
        {/* {screen === "DAILY_ORDER" && <DailyOrder />}
          {screen === "PICKUP" && <PickupLog />}
          {screen === "DELIVERY" && <Delivery />}
          <ScanModal />
          {apps === "UPLOAD_CSV" && <UploadCSV />}
          {apps === "PICKUP" && <PickupModal />}
          {apps === "SETTINGS" && <SettingsModal />} */}
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
