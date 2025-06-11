import { Box, Button, styled, Typography } from "@mui/material";
import ItemsList from "../../modals/PickupModal/ItemsList";
import SignatureBox from "../../modals/PickupModal/SignatureBox";
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
    outline: "1px solid black",
    backgroundColor: "background.paper",
    p: 1,
    width: 800,
    height: 480,
    display: "flex",
  },
  logo: {
    fontWeight: 800,
    fontSize: 36,
    color: "primary.dark",
    justifySelf: "flex-end",
  },
};

const Pickup = () => {
  if (!socket) {
    socket = io(URL);
  }
  return (
    <Box sx={style.container}>
      <Box>
        <ItemsList socket={socket} readOnly />
      </Box>
      <Box>
        <Box>
          <Typography sx={style.logo}>EL CAMINO PHARMACY</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
