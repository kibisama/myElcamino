import { useSelector } from "react-redux";
// import DailyOrder from "../DailyOrder";
// import ScanModal from "../../modals/ScanModal";
// import PickupModal from "../../modals/PickupModal";
// import SettingsModal from "../../modals/SettingsModal";
// import Delivery from "../Delivery";
// import Pickups from "./Pickups";
// import UploadCSV from "../../modals/UploadCSV";

import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";

const getScreen = (screen) => {
  switch (screen) {
    case "pickup":
    // return <Pickups />;
    default:
      return;
  }
};

const Main = () => {
  const { screen } = useSelector((s) => s.main);
  return (
    <AppTheme>
      <CssBaseline>
        <Dashboard />
        {/* {getScreen(screen)} */}
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
