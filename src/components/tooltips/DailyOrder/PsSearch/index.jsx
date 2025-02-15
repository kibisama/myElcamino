import { Box, Divider, Typography } from "@mui/material";
import PsItem from "../PsItem";

const style = {
  container: {
    width: 300,
  },
  header: {
    p: 0.5,
  },
  description: {
    fontSize: 14,
    fontWeight: 800,
  },
  lastUpdated: {
    justifySelf: "flex-end",
    fontSize: 10,
  },
  table: {
    p: 0.25,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  psItem: {
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    p: 0.5,
    m: 0.25,
  },
};

const PsSearch = ({ data, lastUpdated, option }) => {
  const isLarge = data.length > 2;
  return (
    <Box sx={isLarge ? { width: 600 } : style.container}>
      <Box sx={style.header}>
        <Typography sx={style.description}>PHARMSAVER DEALS</Typography>
        <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
      </Box>
      <Divider />
      <Box sx={style.table}>
        {data.map((v) => (
          <PsItem data={v} sx={style.psItem} variant />
        ))}
      </Box>
    </Box>
  );
};
export default PsSearch;
