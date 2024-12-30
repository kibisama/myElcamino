import { Box, Divider, Typography } from "@mui/material";

const style = {
  container: {
    minWidth: 220,
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

const psDetailsKeys = ["Wholesaler", "Exp Date", "Qty Avl"];
const PsDetails = ({ data, lastUpdated, shortDated }) => {
  const { description, lotExpDate, qtyAvl, wholesaler } = data;
  return (
    <Box sx={style.container}>
      <Box>
        <Typography sx={style.description}>{description}</Typography>
        <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
      </Box>
      <Divider />
      <Box sx={style.table}>
        <Box>
          {psDetailsKeys.map((v) => (
            <Typography key={v} sx={style.key}>
              {v}
            </Typography>
          ))}
        </Box>
        <Box>
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
export default PsDetails;
