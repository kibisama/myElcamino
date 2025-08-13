import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";

export default function StartButton({ app, ...props }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      onClick={() => {
        dispatch(setApp(app));
      }}
      {...props}
    />
  );
}
