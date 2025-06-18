import { useState } from "react";
import dayjs from "dayjs";
import { Box, TextField } from "@mui/material";
// import CustomDatePicker from "../../../customs/CustomDatePicker";
// import { asyncGetDailyOrder } from "../../../../reduxjs@toolkit/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { asyncFindDeliveryLog } from "../../../../reduxjs@toolkit/deliverySlice";
import CustomIconButton from "../../../customs/CustomIconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const style = {
  container: {
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    p: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const Toolbar = () => {
  const [rxNumber, setRxNumber] = useState("");
  const dispatch = useDispatch();
  const today = dayjs();
  //   const { date } = useSelector((state) => state.order);
  //   const timeout = React.useRef(null);
  //   const handleChange = (value) => {
  //     dispatch(setDate(dayjs(value).format("MM-DD-YYYY")));
  //   };
  //   const dispatchFn = () => {
  // clearTimeout(timeout.current);
  // dispatch(asyncGetDailyOrder(date));
  // timeout.current = setTimeout(() => dispatchFn(), 300000);
  //   };
  //   React.useEffect(() => {
  // dispatchFn();
  // return () => clearTimeout(timeout.current);
  //   }, [date]); // ignore dep
  return (
    <Box sx={style.container}>
      <Box>
        <TextField
          sx={{ width: 140, mr: 0.5 }}
          size="small"
          value={rxNumber}
          onChange={(e) => {
            setRxNumber(e.target.value);
          }}
          label="Rx Number"
        />
        <CustomIconButton
          children={<SearchIcon />}
          onClick={async () => {
            try {
              dispatch(asyncFindDeliveryLog({ rxNumber }));
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </Box>

      {/* <CustomDatePicker
        value={dayjs(date, "MM-DD-YYYY")}
        maxDate={today}
        onChange={handle
        Change}
      /> */}
      <CustomIconButton children={<RefreshIcon />} onClick={() => {}} />
    </Box>
  );
};

export default Toolbar;
