import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";

export default function AppButton({ app, onClick, children }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{ height: 36 }}
      onClick={onClick ? onClick : () => dispatch(setApp(app))}
    >
      {children}
    </Button>
  );
}
