import { Box, Typography, Divider } from "@mui/material";
/** @typedef {import("@mui/material").SxProps>} SxProps */
/** @type {Object<string, SxProps>} */
const style = {
  container: {
    width: 200,
  },
  content: {
    p: 0.25,
  },
  title: {
    fontSize: 14,
    fontWeight: 800,
  },
  avlAlertUpdated: {
    fontSize: 12,
    justifySelf: "flex-end",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 600,
  },
  msg: {
    fontSize: 14,
    textAlign: "end",
  },
};

const AvlAlert = ({ data }) => {
  const { avlAlertUpdated, avlAlertExpected, avlAlertAddMsg } = data;
  return (
    <Box sx={style.container}>
      <Box sx={style.content}>
        <Typography sx={style.title}>AVAILABILITY ALERT</Typography>
        <Typography sx={style.avlAlertUpdated}>{avlAlertUpdated}</Typography>
      </Box>
      <Divider />
      <Box sx={style.content}>
        <Typography sx={style.subtitle}>
          Expected Availability in DC:
        </Typography>
        <Typography sx={style.msg}>{avlAlertExpected}</Typography>
        {avlAlertAddMsg && (
          <Typography sx={style.subtitle}>Additional Comments:</Typography>
        )}
        <Typography sx={style.msg}>{avlAlertAddMsg}</Typography>
      </Box>
    </Box>
  );
};

export default AvlAlert;
