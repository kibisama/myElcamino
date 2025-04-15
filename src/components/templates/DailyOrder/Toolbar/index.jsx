import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import CustomDatePicker from "../../../customs/CustomDatePicker";
import { asyncGetDailyOrder } from "../../../../reduxjs@toolkit/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../../../reduxjs@toolkit/orderSlice";
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
  const { date } = useSelector((state) => state.order);
  const timeout = React.useRef(null);
  const handleChange = (value) => {
    dispatch(setDate(dayjs(value).format("MM-DD-YYYY")));
  };
  const dispatchFn = () => {
    clearTimeout(timeout.current);
    dispatch(asyncGetDailyOrder(date));
    timeout.current = setTimeout(() => dispatchFn(), 300000);
  };
  React.useEffect(() => {
    dispatchFn();
    return () => clearTimeout(timeout.current);
  }, [date]); // ignore dep
  return (
    <Box sx={style.container}>
      <CustomDatePicker
        value={dayjs(date, "MM-DD-YYYY")}
        maxDate={today}
        onChange={handleChange}
      />
      <CustomIconButton children={<RefreshIcon />} onClick={dispatchFn} />
    </Box>
  );
};

export default Toolbar;
