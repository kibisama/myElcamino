import * as React from "react";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const style = {
  listItem: { height: 36, width: "100%" },
};

export default function CustomList({ sx, items, onClickItem }) {
  return (
    <Box sx={sx}>
      <List sx={{ overflow: "auto", height: "100%" }}>
        {items.map((v, i) => (
          <ListItem sx={style.listItem} key={i}>
            <ListItemButton sx={style.listItem}>
              <ListItemText
                slotProps={{
                  primary: {
                    sx: { justifySelf: "center", letterSpacing: 1.5 },
                    onClick: () => {
                      onClickItem(v);
                    },
                  },
                }}
                primary={v}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
