import { Box, Button, styled, Paper, Typography } from "@mui/material";
import ItemsList from "../../modals/PickupModal/ItemsList";
import SignatureBox from "../../modals/PickupModal/SignatureBox";
import Clock from "../../modals/PickupModal/Clock";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { io } from "socket.io-client";
const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const StyledButton = styled(({ ...props }) => <Button {...props} />)(
  ({ theme }) => ({
    width: 125,
    height: 75,
    borderRadius: 4,
  })
);

const style = {
  container: {
    boxSizing: "border-box",
    width: 800,
    height: 480,
    p: 1.5,
    display: "flex",
  },
  logo: {
    fontWeight: 800,
    fontSize: 36,
    color: "#009688",
    justifySelf: "flex-end",
  },
  clock: {
    fontWeight: 600,
    fontSize: 18,
    justifySelf: "flex-end",
  },
};

const Pickup = () => {
  if (!socket) {
    socket = io(URL);
  }
  return (
    <Box sx={style.container}>
      <Box sx={{ pt: 2 }}>
        <ItemsList socket={socket} readOnly />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box>
          <Typography sx={style.logo}>El Camino Pharmacy</Typography>
          <Clock sx={style.clock} />
        </Box>
        <Box sx={{ display: "flex" }}>
          <SignatureBox socket={socket} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledButton children="ACCEPT" endIcon={<CheckIcon />} />
            <StyledButton children="CLEAR" endIcon={<ClearIcon />} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Pickup;
