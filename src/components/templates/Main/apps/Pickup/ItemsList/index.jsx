import React from "react";
import { Typography } from "@mui/material";
import CustomList from "../../../../../customs/CustomList";
import { postPickup } from "../../../../../../lib/api/client";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ItemsList = ({ socket, readOnly = false, sx }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    function onGet(data) {
      setItems(data);
    }
    socket.on("items", onGet);

    return () => {
      socket.off("items", onGet);
    };
  }, [socket]);
  return (
    <div>
      <Typography sx={{ fontWeight: 600, justifySelf: "center" }}>{`Rx List${
        items.length > 0 ? ` (${items.length})` : ""
      }`}</Typography>
      {/* <Box sx={sx}>
      <List sx={{ p: 0, overflow: "auto", maxHeight: height, height: height }}>
        {items.map((v, i) => (
          <ListItem sx={style.listItem} key={i}>
            {onClickItem ? (
              <ListItemButton
                onClick={() => {
                  onClickItem(v);
                }}
                sx={style.listItem}
              >
                <ListItemText
                  slotProps={{
                    primary: {
                      sx: style.primary,
                    },
                  }}
                  primary={v}
                />
              </ListItemButton>
            ) : (
              <ListItemText
                slotProps={{
                  primary: {
                    sx: style.primary,
                  },
                }}
                primary={v}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box> */}
      <CustomList
        sx={{
          width: 132,
          ...sx,
        }}
        height={380}
        items={items}
        onClickItem={
          readOnly
            ? undefined
            : async (v) => {
                try {
                  await postPickup("items", { action: "remove", data: v });
                } catch (e) {
                  console.log(e);
                }
              }
        }
      />
    </div>
  );
};

export default ItemsList;

const style = {
  listItem: { height: 36, width: "100%" },
  primary: { justifySelf: "center", letterSpacing: 1.5 },
};
