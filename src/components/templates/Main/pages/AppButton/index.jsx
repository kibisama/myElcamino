import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";

export default function AppButton({ app, icon, children }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      onClick={() => {
        dispatch(setApp(app));
      }}
      startIcon={icon}
    >
      {children}
    </Button>
  );
}
