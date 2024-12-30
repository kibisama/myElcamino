import dayjs from "dayjs";
import { Box, Divider, Typography } from "@mui/material";

const style = {
  container: {
    minWidth: 320,
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
  },
  lastUpdated: {
    justifySelf: "flex-end",
    fontSize: 10,
  },
  table: {
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  key: {
    fontSize: 12,
  },
  data: {
    fontSize: 12,
    justifySelf: "flex-end",
  },
};

const psAltKeys = [
  "NDC",
  "MFR",
  "Size",
  "Rx",
  "Wholesaler",
  "Exp Date",
  "Qty Avl",
];
const PsAlt = ({ data }) => {
  const {
    description,
    ndc,
    manufacturer,
    pkg,
    rxOtc,
    wholesaler,
    lotExpDate,
    qtyAvl,
  } = data;
  const shortDate = dayjs().add(11, "month");
  const expDate = dayjs(lotExpDate, "MM/YY");
  const shortDated = expDate.isBefore(shortDate);
  return (
    <Box>
      <Typography sx={style.description}>{description}</Typography>
      <Divider />
      <Box sx={style.table}>
        <Box>
          {psAltKeys.map((v) => (
            <Typography key={v} sx={style.key}>
              {v}
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography sx={style.data}>{ndc}</Typography>
          <Typography sx={style.data}>{manufacturer}</Typography>
          <Typography sx={style.data}>{pkg}</Typography>
          <Typography sx={style.data}>{rxOtc}</Typography>
          <Typography sx={style.data}>{wholesaler}</Typography>
          <Typography
            sx={
              shortDated ? { ...style.data, color: "warning.main" } : style.data
            }
          >
            {lotExpDate}
          </Typography>
          <Typography sx={style.data}>{qtyAvl}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
const PsAlts = ({ data }) => {
  return (
    <Box sx={style.container}>
      {data.map((v, i) => (
        <PsAlt data={v} />
      ))}
    </Box>
  );
};
export default PsAlts;
