import { useState } from "react";
import dayjs from "dayjs";
import { Box, TextField } from "@mui/material";
import CustomDatePicker from "../../../customs/CustomDatePicker";
import { useDispatch } from "react-redux";
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
  const [deliveryDate, setDate] = useState(dayjs());
  const dispatch = useDispatch();
  const today = dayjs();
  const handleChange = (value) => setDate(dayjs(value));

  return (
    <Box sx={style.container}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: 480 }}
      >
        <div>
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
        </div>
        <div>
          <CustomDatePicker
            sx={{ width: 180, mr: 0.5 }}
            value={dayjs(deliveryDate)}
            maxDate={today}
            onChange={handleChange}
          />
          <CustomIconButton
            children={<SearchIcon />}
            onClick={async () => {
              try {
                dispatch(asyncFindDeliveryLog({ deliveryDate }));
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </div>
      </Box>
      <CustomIconButton children={<RefreshIcon />} onClick={() => {}} />
    </Box>
  );
};

export default Toolbar;
