import React from "react";
import CustomList from "../../../customs/CustomList";
import { Box, Typography } from "@mui/material";
import { getPickupItems, removePickupItems } from "../../../../lib/api/client";

const ItemsList = ({ socket }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    function onGet(data) {
      setItems(data);
    }
    socket.on("connect", async function () {
      try {
        await getPickupItems();
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("get", onGet);

    return () => {
      socket.off("get", onGet);
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontWeight: 800, mb: 1 }}>Rx List</Typography>
      <CustomList
        sx={{
          p: 1.25,
          outline: "solid 1px",
          borderRadius: 2,
          width: 180,
          height: 540,
        }}
        items={items}
        onClickItem={async (v) => {
          try {
            await removePickupItems({ item: v });
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </Box>
  );
};

export default ItemsList;
