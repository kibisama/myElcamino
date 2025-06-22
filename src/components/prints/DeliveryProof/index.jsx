import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreInfoHeader from "../StoreInfoHeader";
import { getPickupProof } from "../../../lib/api/client";

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

const getRelation = (data) => {
  switch (data) {
    case "self":
      return "Self";
    case "ff":
      return "Family/Friend";
    case "gc":
      return "Guardian/Caregiver";
    case "other":
      return "Other";
    default:
      return data;
  }
};

export default function DeliveryProof() {
  const { _id, rxNumber } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function get() {
      try {
        const { data } = await getPickupProof({ _id, rxNumber });
        setData(data);
      } catch (e) {
        console.log(e);
      }
    }
    get();
  }, []);

  if (!data) {
    return;
  }
  return (
    <Box sx={style.container}>
      <StoreInfoHeader />
      <Box sx={style.content}>
        <Typography sx={style.title}>Proof of Prescription Delivery</Typography>
        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography sx={style.subtitle}>Rx Number</Typography>
            <Typography sx={style.subtitle}>Delivered Date/Time</Typography>
          </Box>
          <Box>
            <Typography>{rxNumber}</Typography>
            <Typography>{data.deliveryDate}</Typography>
          </Box>
        </Box>
        <Typography>Customer Signature:</Typography>
        <Box sx={{ justifySelf: "center" }}>
          <img
            src={
              process.env.REACT_APP_CLIENT_API_ADDRESS +
              `/apps/pickup/png/${_id}`
            }
          />
          <Box sx={style.img} />
        </Box>
        <Box>
          <Box sx={{ ml: "180px" }}>
            <Typography>Relation: {getRelation(data.relation)}</Typography>
            <Typography>Note: {data.notes}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
