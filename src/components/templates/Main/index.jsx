import { Box } from "@mui/material";
import Header from "./Header";
import DailyOrder from "../DailyOrder";
import ScanModal from "../../modals/ScanModal";
import PickupModal from "../../modals/PickupModal";
import SettingsModal from "../../modals/SettingsModal";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../../../lib/mui/theme";
import CssBaseline from "@mui/material/CssBaseline";
import DeliveryLog from "../DeliveryLog";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
};

const Main = () => {
  const { apps, darkMode, screen } = useSelector((state) => state.global);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Box sx={style.container}>
          <Header />
          {screen === "DAILY_ORDER" && <DailyOrder />}
          {screen === "PICKUP" && <DeliveryLog />}
          <ScanModal />
          {apps === "PICKUP" && <PickupModal />}
          {apps === "SETTINGS" && <SettingsModal />}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Main;
