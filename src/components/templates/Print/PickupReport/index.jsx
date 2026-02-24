import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortraitContainer from "../PortraitContainer";
import StoreInfoHeader from "../StoreInfoHeader";

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

export default function PickupReport() {
  const { _id, rxNumber } = useParams();
  const [data, setData] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);
  useEffect(() => {
    // (async function () {
    //   try {
    //     const { data } = await getSettings();
    //     setStoreInfo(data.data);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // })();
    // (async function () {
    //   try {
    //     const { data } = await getPickupReport({ _id, rxNumber });
    //     setData(data.data);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // })();
  }, []);

  if (!data) {
    return;
  }

  return (
    <PortraitContainer>
      <StoreInfoHeader storeInfo={storeInfo} />
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
            process.env.REACT_APP_CLIENT_API_ADDRESS + `/apps/pickup/png/${_id}`
          }
        />
        <Box sx={style.img} />
      </Box>
      <Box>
        <Box sx={{ ml: "180px" }}>
          <Typography>Relation: {data.relation}</Typography>
          <Typography>Note: {data.notes}</Typography>
        </Box>
      </Box>
    </PortraitContainer>
  );
}
