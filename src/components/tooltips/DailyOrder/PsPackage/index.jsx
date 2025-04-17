import dayjs from "dayjs";
import { Box, Divider, Typography } from "@mui/material";
import LastUpdated from "../LastUpdated";
import { useSelector } from "react-redux";

const style = {
  container: {
    width: 300,
  },
  content: {
    p: 0.25,
  },
  wholesaler: {
    fontSize: 16,
    fontWeight: 800,
    justifySelf: "flex-end",
  },
  lastUpdated: {
    justifySelf: "flex-end",
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
    justifySelf: "center",
  },
  manufacturer: {
    fontSize: 10,
    color: "text.secondary",
    justifySelf: "center",
  },
  key: {
    fontSize: 13,
    color: "text.secondary",
    fontWeight: 600,
  },
  keyError: {
    fontSize: 13,
    color: "warning.light",
    fontWeight: 600,
  },
  value: {
    fontSize: 13,
    justifySelf: "flex-end",
  },
  valueError: {
    fontSize: 13,
    justifySelf: "flex-end",
    color: "warning.light",
  },
};

const isShortDated = (date, lotExpDate) => {
  return dayjs(lotExpDate, "MM/YY").isBefore(
    dayjs(date).add(12, "month"),
    "month"
  );
};

const PsPackage = ({ data, lastUpdated }) => {
  const { date } = useSelector((state) => state.order);
  const {
    wholesaler,
    description,
    manufacturer,
    ndc,
    pkgPrice,
    unitPrice,
    lotExpDate,
    qtyAvl,
  } = data;
  const shortDated = isShortDated(date, lotExpDate);
  return (
    <Box sx={style.container}>
      <Box sx={style.content}>
        <Typography sx={style.wholesaler}>{wholesaler}</Typography>
        {lastUpdated && (
          <LastUpdated sx={style.lastUpdated} data={lastUpdated} />
        )}
      </Box>
      <Divider />
      <Box sx={style.content}>
        <Typography sx={style.description}>{description}</Typography>
        <Typography sx={style.manufacturer}>{manufacturer}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          ...style.content,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={style.key}>NDC</Typography>
          <Typography sx={style.key}>COST</Typography>
          <Typography sx={style.key}>UNIT COST</Typography>
          <Typography sx={shortDated ? style.keyError : style.key}>
            EXP DATE
          </Typography>
          <Typography sx={style.key}>QTY AVL</Typography>
        </Box>
        <Box>
          <Typography sx={style.value}>{ndc}</Typography>
          <Typography sx={style.value}>{pkgPrice}</Typography>
          <Typography sx={style.value}>{unitPrice}</Typography>
          <Typography sx={shortDated ? style.valueError : style.value}>
            {lotExpDate}
          </Typography>
          <Typography sx={style.value}>{qtyAvl}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default PsPackage;
