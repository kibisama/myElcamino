import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";

export default function AppButton({ app, children }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{
        "&:hover": { borderColor: "transparent" },
      }}
      onClick={() => {
        dispatch(setApp(app));
      }}
    >
      {children}
    </Button>
  );
}
