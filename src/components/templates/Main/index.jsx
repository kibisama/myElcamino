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
import Delivery from "../Delivery";
import PickupLog from "../PickupLog";
import UploadCSV from "../../modals/UploadCSV";

const style = {
  container: {
    // display: "flex",
    // flexDirection: "column",
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
          {screen === "PICKUP" && <PickupLog />}
          {screen === "DELIVERY" && <Delivery />}
          <ScanModal />
          {apps === "UPLOAD_CSV" && <UploadCSV />}
          {apps === "PICKUP" && <PickupModal />}
          {apps === "SETTINGS" && <SettingsModal />}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Main;
