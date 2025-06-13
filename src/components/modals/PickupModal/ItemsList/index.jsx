import React from "react";
import CustomList from "../../../customs/CustomList";
import { getPickupData, removePickupItems } from "../../../../lib/api/client";

const ItemsList = ({ socket, open, readOnly = false, sx }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    function onGet(data) {
      setItems(data);
    }
    (async function () {
      try {
        await getPickupData("items");
      } catch (e) {
        console.log(e);
      }
    })();
    socket.on("items", onGet);

    return () => {
      socket.off("items", onGet);
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
