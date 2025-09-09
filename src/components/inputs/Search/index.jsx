import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Search({
  value,
  placeholder,
  width,
  ref,
  slotProps = {},
  ...props
}) {
  return (
    <TextField
      value={value}
      ref={ref}
      sx={{ width: `${width || "25ch"}` }}
      size="small"
      id="search"
      placeholder={placeholder || "Search…"}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "text.primary" }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
          ...slotProps.input,
        },
        ...slotProps,
      }}
      {...props}
    />
  );
}
