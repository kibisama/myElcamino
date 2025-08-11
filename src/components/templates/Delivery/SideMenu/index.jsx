import { useState, useEffect } from "react";
import { Paper, MenuList, MenuItem } from "@mui/material";
import { getDeliveryGroups } from "../../../../lib/api/client";
const style = {
  container: {
    width: 240,
    display: "flex",
    height: "100%",
  },
};

const SideMenu = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    (async function get() {
      try {
        const { data } = await getDeliveryGroups();
        return setGroups(data.results);
      } catch (e) {
        console.error(e);
        return setGroups([]);
      }
    })();
  }, []);

  return (
    <Paper sx={style.container}>
      <MenuList>
        {groups.map((v) => (
          <MenuItem>{v.name}</MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default SideMenu;
