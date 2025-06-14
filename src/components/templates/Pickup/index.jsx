import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import ItemsList from "../../modals/PickupModal/ItemsList";
import SignatureBox from "../../modals/PickupModal/SignatureBox";
import Clock from "../../modals/PickupModal/Clock";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { getPickupData, clearPickupCanvas } from "../../../lib/api/client";

import { io } from "socket.io-client";

import RelationBox from "../../modals/PickupModal/RelationBox";
const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const StyledButton = styled(({ ...props }) => <Button {...props} />)(
  ({ theme }) => ({
    width: 120,
    height: 90,
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
  relationBox: {
    borderTop: "1px solid #9e9e9e",
    borderRight: "1px solid #9e9e9e",
    display: "flex",
    justifyContent: "center",
    width: 519,
  },
};

const Pickup = () => {
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  if (!socket) {
    socket = io(URL);
  }

  const onBegin = () => {
    setDisableSubmit(false);
  };

  React.useEffect(() => {
    function onCanvas(data) {
      if (data) {
        setDisableSubmit(false);
      }
    }
    function onClear() {
      setDisableSubmit(true);
    }
    (async function () {
      try {
        await getPickupData("canvas");
      } catch (e) {
        console.log(e);
      }
    })();

    socket.on("canvas", onCanvas);
    socket.on("clear-canvas", onClear);

    return () => {
      socket.off("canvas", onCanvas);
      socket.off("clear-canvas", onClear);
    };
  }, []);

  return (
    <div>
      <Box sx={style.background} />
      <Box sx={style.container}>
        <ItemsList
          socket={socket}
          sx={{
            alignSelf: "flex-end",
            border: "1px solid",
            borderColor: "#9e9e9e",
          }}
          readOnly
        />
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
            <Box sx={style.relationBox}>
              <RelationBox socket={socket} row />
            </Box>
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
                <SignatureBox socket={socket} onBegin={onBegin} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <StyledButton
                  disabled={disableSubmit}
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#26a69a",
                    borderBottom: "1px solid",
                    borderColor: "#9e9e9e",
                    ":hover": {
                      backgroundColor: "#4db6ac",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "background.paper",
                    },
                  }}
                  children={
                    <Typography
                      sx={{
                        color: "#fafafa",
                        fontWeight: 600,
                        fontSize: 14,
                        ...(disableSubmit ? { color: "#9e9e9e" } : {}),
                      }}
                    >
                      ACCEPT
                    </Typography>
                  }
                  endIcon={
                    <CheckIcon
                      sx={
                        disableSubmit
                          ? { color: "#9e9e9e" }
                          : { color: "#fafafa" }
                      }
                    />
                  }
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
