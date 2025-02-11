import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import CustomDatePicker from "../../../customs/CustomDatePicker";
import { asyncGetDailyOrder } from "../../../../reduxjs@toolkit/orderSlice";
import { useDispatch } from "react-redux";
import CustomIconButton from "../../../customs/CustomIconButton";
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
  const dispatch = useDispatch();
  const today = dayjs();
  const [date, setDate] = React.useState(today);
  const timeout = React.useRef(null);
  const handleChange = (value) => {
    setDate(value);
  };
  const dispatchFn = () => {
    clearTimeout(timeout.current);
    dispatch(asyncGetDailyOrder(date.format("MM-DD-YYYY")));
    timeout.current = setTimeout(() => dispatchFn(), 300000);
  };
  React.useEffect(() => {
    dispatchFn();
    return () => clearTimeout(timeout.current);
  }, [date]); // ignore dep
  return (
    <Box sx={style.container}>
      <CustomDatePicker value={date} maxDate={today} onChange={handleChange} />
      <CustomIconButton children={<RefreshIcon />} onClick={dispatchFn} />
    </Box>
  );
};

export default Toolbar;
