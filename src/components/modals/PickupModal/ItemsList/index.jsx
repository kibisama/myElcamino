import React from "react";
import CustomList from "../../../customs/CustomList";
import { Box, Typography } from "@mui/material";
import { getPickupItems, removePickupItems } from "../../../../lib/api/client";

const ItemsList = ({ socket, open, readOnly }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    function onGet(data) {
      setItems(data);
    }
    async function onConnect() {
      try {
        await getPickupItems();
      } catch (e) {
        console.log(e);
      }
    }

    onConnect();

    socket.on("connect", onConnect);
    socket.on("get", onGet);

    return () => {
      socket.off("connect", onConnect);
      socket.off("get", onGet);
    };
  }, [open]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontWeight: 600, mb: 1 }}>Rx List</Typography>
      <CustomList
        sx={{
          p: 1.25,
          outline: "solid 1px",
          borderRadius: 2,
          width: 140,
          height: 400,
        }}
        items={items}
        onClickItem={async (v) => {
          try {
            if (!readOnly) {
              await removePickupItems({ item: v });
            }
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </Box>
  );
};

export default ItemsList;
