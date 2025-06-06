import { Box } from "@mui/material";
import Header from "./Header";
import DailyOrder from "../DailyOrder";
import ScanModal from "../../modals/ScanModal";
import PickupModal from "../../modals/PickupModal";
import { useSelector } from "react-redux";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
};

const Main = () => {
  const { apps } = useSelector((state) => state.global);
  return (
    <Box sx={style.container}>
      <Header />
      <DailyOrder />
      <ScanModal />
      {apps === "PICKUP" && <PickupModal />}
    </Box>
  );
};

export default Main;
