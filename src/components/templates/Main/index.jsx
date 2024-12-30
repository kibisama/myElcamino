import { Box } from "@mui/material";
import Header from "./Header";
import DailyOrder from "../DailyOrder";
import ScanModal from "../../modals/ScanModal";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
};

const Main = () => {
  return (
    <Box sx={style.container}>
      <Header />
      <DailyOrder />
      <ScanModal />
    </Box>
  );
};

export default Main;
