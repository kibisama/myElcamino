import React from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState([
    window.innerHeight,
    window.innerWidth,
  ]);
  React.useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", windowSizeHandler);
    return () => {
      window.removeEventListener("resize", windowSizeHandler);
    };
  }, []);
  return windowSize;
}
