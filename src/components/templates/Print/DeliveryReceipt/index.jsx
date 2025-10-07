import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreInfoHeader from "../StoreInfoHeader";
import { getDeliveryLogItems } from "../../../../lib/api/client";

export default function DeliveryReceipt() {
  const { section, date, session } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function get() {
      try {
        const { data } = await getDeliveryLogItems(section, date, session);
        setData(data.data);
      } catch (e) {
        console.error(e);
      }
    }
    get();
  }, []);

  if (!data) {
    return;
  }

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
