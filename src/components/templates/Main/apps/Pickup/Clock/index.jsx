import React from "react";
import { Typography } from "@mui/material";

const URL = process.env.REACT_APP_API_ADDRESS + "/api/main/time";

export default function Clock({ sx }) {
  const [time, setTime] = React.useState("Retrieving Time Data ...");
  React.useEffect(() => {
    const sse = new EventSource(URL);
    function handleEvent(data) {
      setTime(JSON.parse(data).message);
    }
    sse.onmessage = (e) => handleEvent(e.data);
    sse.onerror = (e) => {
      console.error(e);
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, [time]);
  return <Typography sx={sx}>{time}</Typography>;
}
