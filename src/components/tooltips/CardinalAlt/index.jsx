import { Box, Divider, Typography } from "@mui/material";

const style = {
  container: {
    maxWidth: 320,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cin: {
    fontSize: 13,
  },
  lastUpdated: {
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
  contract: {
    fontSize: 12,
    fontWeight: 800,
    justifySelf: "flex-end",
  },
};

const CardinalAltKeys = ["NDC", "MFR", "Contract"];
const CardinalAlt = ({ data, lastUpdated }) => {
  const {
    name,
    cin,
    ndc,
    mfr,
    contract,
    stockStatus,
    stock,
    returnable,
    lastOrdred,
  } = data;
  return (
    <Box sx={style.container}>
      <Box>
        <Typography sx={style.name}>{name}</Typography>
        <Box sx={style.subtitle}>
          <Typography sx={style.cin}>{cin}</Typography>
          <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={style.table}>
        <Box>
          {CardinalAltKeys.map((v) => (
            <Typography key={v} sx={style.key}>
              {v}
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography sx={style.data}>{ndc}</Typography>
          <Typography sx={style.data}>{mfr}</Typography>
          {contract ? (
            <Typography sx={style.contract}>{contract}</Typography>
          ) : (
            <Typography sx={{ ...style.contract, color: "warning.main" }}>
              NO
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardinalAlt;
