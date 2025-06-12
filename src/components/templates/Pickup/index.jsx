import { Box, Button, styled, Paper, Typography } from "@mui/material";
import ItemsList from "../../modals/PickupModal/ItemsList";
import SignatureBox from "../../modals/PickupModal/SignatureBox";
import Clock from "../../modals/PickupModal/Clock";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { clearPickupCanvas } from "../../../lib/api/client";

import { io } from "socket.io-client";

import RelationBox from "../../modals/PickupModal/RelationBox";
const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const StyledButton = styled(({ ...props }) => <Button {...props} />)(
  ({ theme }) => ({
    width: 120,
    height: 90,
    // border: "1px solid",
    // borderColor: theme.palette.grey[500],
    borderRadius: 0,
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
  background: {
    position: "absolute",
    zIndex: -1,
    width: 800,
    height: 68,
    background: "linear-gradient(to right, #ffffff, #cfd8dc)",
  },
  logo: {
    fontWeight: 800,
    fontSize: 36,
    color: "#009688",
    justifySelf: "flex-end",
    letterSpacing: 1,
    mb: 1,
  },
  clock: {
    fontWeight: 600,
    fontSize: 18,
    color: "#212121",
    justifySelf: "flex-end",
    letterSpacing: 0,
  },
  signatureBox: {
    width: 600,
    height: 170,
    borderRight: "1px solid",
    borderColor: "#9e9e9e",
    backgroundColor: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Pickup = () => {
  if (!socket) {
    socket = io(URL);
  }
  return (
    <div>
      <Box sx={style.background} />
      <Box sx={style.container}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>Rx List</Typography>
          <ItemsList
            socket={socket}
            sx={{
              border: "1px solid",
              borderColor: "#9e9e9e",
            }}
            readOnly
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography sx={style.logo}>El Camino Pharmacy</Typography>
            <Clock sx={style.clock} />
          </Box>
          <Box>
            <RelationBox socket={socket} row />
            <Box
              sx={{
                display: "flex",
                width: 640,
                borderTop: "1px solid",
                borderRight: "1px solid",
                borderBottom: "1px solid",
                borderColor: "#9e9e9e",
                height: 170,
              }}
            >
              <Box sx={style.signatureBox}>
                <SignatureBox socket={socket} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <StyledButton
                  sx={{
                    color: "#26a69a",
                    backgroundColor: "#80cbc4",
                    borderBottom: "transparent",
                    ":hover": {
                      backgroundColor: "#4db6ac",
                    },
                  }}
                  children={
                    <Typography
                      sx={{
                        color: "#fafafa",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      ACCEPT
                    </Typography>
                  }
                  endIcon={<CheckIcon sx={{ color: "#fafafa" }} />}
                />
                <StyledButton
                  sx={{ color: "error.main" }}
                  onClick={async () => {
                    try {
                      await clearPickupCanvas();
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  children={
                    <Typography
                      sx={{
                        color: "#212121",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      CLEAR
                    </Typography>
                  }
                  endIcon={<ClearIcon sx={{ color: "error.main" }} />}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Pickup;
