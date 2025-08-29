import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreInfoHeader from "../StoreInfoHeader";
import { getPickupReport } from "../../../../lib/api/client";

const style = {
  container: {
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
  },
  content: { p: 2 },
  title: {
    mt: 2,
    justifySelf: "center",
    fontSize: 20,
    fontWeight: 600,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
  subtitle: {
    fontWeight: 600,
  },
  img: {
    width: 500,
    position: "relative",
    bottom: 25,
    borderTop: "2px solid black",
  },
};

export default function PortraitContainer({ children }) {
  const { _id, rxNumber } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function get() {
      try {
        const { data } = await getPickupReport({ _id, rxNumber });
        setData(data);
      } catch (e) {
        console.log(e);
      }
    }
    get();
  }, []);
  return (
    <Box
      sx={{
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
      {children}
    </Box>
  );
}
