import React from "react";
import { Box, styled } from "@mui/material";

const Container = styled(({ ...props }) => <Box {...props} />)(({ theme }) => ({
  padding: 5,
  outline: "1px solid",
  outlineColor: theme.palette.grey[500],
  display: "flex",
  borderRadius: 4,
  ":hover": {
    outlineColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}));

const ImgThumb = ({ alt, src, width }) => {
  const [img, setImg] = React.useState(true);
  return (
    <Container sx={width && { width }}>
      {src && img ? (
        <img width="100%" src={src} onError={() => setImg(false)} />
      ) : (
        alt
      )}
    </Container>
  );
};
export default ImgThumb;
