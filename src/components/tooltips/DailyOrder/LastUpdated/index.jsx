import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const style = {
  fontSize: 11,
  color: "primary.main",
};

const LastUpdated = ({ sx, data }) => {
  const { date } = useSelector((state) => state.order);
  const dateDayjs = dayjs(date, "MM-DD-YYYY");
  const lastUpdated = dayjs(data);
  const string = lastUpdated.isSame(dayjs(), "day")
    ? "Today " + lastUpdated.format("HH:mm:ss")
    : lastUpdated.format("MM/DD/YYYY HH:mm:ss");
  const _style = dateDayjs.isSame(lastUpdated, "day")
    ? style
    : { ...style, color: "warning.light" };
  return <Typography sx={{ ..._style, ...sx }}>{string}</Typography>;
};

export default LastUpdated;
