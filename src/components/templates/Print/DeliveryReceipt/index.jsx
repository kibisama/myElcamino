import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreInfoHeader from "../StoreInfoHeader";

export default function DeliveryReceipt() {
  const { section, date, session } = useParams();
  console.log(section, date, session);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function get() {
      try {
        // const { data } = await getPickupReport({ _id, rxNumber });
        // setData(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    get();
  }, []);

  // if (!data) {
  //   return;
  // }

  return (
    <Box
      sx={{
        p: 2,
        width: "816px",
        height: "1054px",
        "@media print": {
          p: 0,
          m: 0,
          overflow: "hidden",
          height: "100vh",
          "@page": {
            size: "letter portrait",
          },
        },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <StoreInfoHeader />
      </Box>
    </Box>
  );
}
