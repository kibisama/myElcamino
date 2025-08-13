import React from "react";
import { useRef } from "react";
import { useTrail, animated } from "@react-spring/web";
import { Box, useTheme } from "@mui/material";

const frontItems = ["E", "L", "C", "A", "M", "I", "N", "O"];
const backItems = ["P", "H", "A", "R", "M", "A", "C", "Y"];

const style = {
  container: {
    display: "flex",
    gap: 1,
  },
  item: {
    position: "relative",
    width: 36,
    height: 36,
  },
  common: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 800,
    transformStyle: "preserve-3d",
    borderRadius: "10%",
  },
};

const Logo = () => {
  const { vars, palette, typography } = useTheme();
  const frontStyle = {
    color: palette.primary.main,
    border: `1px solid ${palette.primary.main}`,
    fontSize: typography.h4.fontSize,
  };
  const backStyle = {
    color: (vars?.palette || palette).background.paper,
    fontSize: typography.h4.fontSize,
    border: `1px solid ${palette.primary.main}`,
    backgroundColor: palette.primary.main,
  };
  const [trail, api] = useTrail(frontItems.length, () => ({
    rotateX: 0,
  }));
  const isFlipped = useRef(false);
  const handleClick = React.useCallback(() => {
    if (isFlipped.current) {
      api.start({
        rotateX: 0,
      });
      isFlipped.current = false;
    } else {
      api.start({
        rotateX: 180,
      });
      isFlipped.current = true;
    }
  }, [api]);
  return (
    <Box sx={style.container} onClick={handleClick}>
      {trail.map(({ rotateX }, i) => (
        <Box sx={style.item} key={i}>
          <animated.div
            style={{
              ...style.common,
              transform: rotateX.to(
                (val) => `perspective(600px) rotateX(${val}deg)`
              ),
              ...frontStyle,
            }}
          >
            {frontItems[i]}
          </animated.div>

          <animated.div
            style={{
              ...style.common,
              transform: rotateX.to(
                (val) => `perspective(600px) rotateX(${180 - val}deg)`
              ),
              ...backStyle,
            }}
          >
            {backItems[i]}
          </animated.div>
        </Box>
      ))}
    </Box>
  );
};

export default Logo;
