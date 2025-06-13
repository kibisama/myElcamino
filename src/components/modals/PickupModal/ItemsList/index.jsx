import React from "react";
import CustomList from "../../../customs/CustomList";
import { getPickupItems, removePickupItems } from "../../../../lib/api/client";

const ItemsList = ({ socket, open, readOnly = false, sx }) => {
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
                await removePickupItems({ item: v });
              } catch (e) {
                console.log(e);
              }
            }
      }
    />
  );
};

export default ItemsList;
