import { Box } from "@mui/material";
import Header from "./Header";
import DailyOrder from "../DailyOrder";
import ScanModal from "../../modals/ScanModal";
import PickupModal from "../../modals/PickupModal";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../../../lib/mui/theme";
import CssBaseline from "@mui/material/CssBaseline";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
};

const Main = () => {
  const { darkMode } = useSelector((state) => state.global);
  const { apps } = useSelector((state) => state.global);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Box sx={style.container}>
          <Header />
          <DailyOrder />
          <ScanModal />
          {apps === "PICKUP" && <PickupModal />}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Main;
