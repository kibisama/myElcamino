import React from "react";
import { Box, Typography } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const style = {
  listItem: { height: 36 },
  primary: { justifySelf: "center", letterSpacing: 1.5 },
};

const ItemsList = ({ socket, readOnly = false, height = 350, sx }) => {
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
      <Typography
        sx={{ fontWeight: 600, justifySelf: "center", marginBottom: 0.5 }}
      >{`Rx List${items.length > 0 ? ` (${items.length})` : ""}`}</Typography>
      <Box sx={{ width: 132, overflow: "hidden", ...sx }}>
        <List
          sx={{
            overflow: "auto",
            height,
          }}
        >
          {items.map((v, i) => (
            <ListItem sx={style.listItem} key={i}>
              {readOnly ? (
                <ListItemText
                  slotProps={{
                    primary: {
                      sx: style.primary,
                    },
                  }}
                  primary={v}
                />
              ) : (
                <ListItemButton
                  onClick={() =>
                    socket.emit("items", { action: "pull", item: v })
                  }
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
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default ItemsList;
