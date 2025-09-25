import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortraitContainer from "../PortraitContainer";

const style = {
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

export default function DeliveryLog() {
  const { _id, rxNumber } = useParams();
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

  if (!data) {
    return;
  }

  return (
    <PortraitContainer>
      <Typography sx={style.title}>Rx Delivery Receipt</Typography>
      {/* <Box
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
        <Box sx={style.img} />
      </Box>
      <Box>
        <Box sx={{ ml: "180px" }}>
          <Typography>Relation: {data.relation}</Typography>
          <Typography>Note: {data.notes}</Typography>
        </Box>
      </Box> */}
    </PortraitContainer>
  );
}
