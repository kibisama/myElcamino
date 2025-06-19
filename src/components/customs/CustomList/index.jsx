import * as React from "react";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const style = {
  listItem: { height: 36, width: "100%" },
  primary: { justifySelf: "center", letterSpacing: 1.5 },
};

export default function CustomList({ sx, items, height, onClickItem }) {
  return (
    <Box sx={sx}>
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
    </Box>
  );
}
