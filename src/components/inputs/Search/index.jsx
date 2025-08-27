import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Search({
  value,
  placeholder,
  width,
  onChange = () => {},
  onKeyDown = () => {},
}) {
  return (
    <FormControl sx={{ width: `${width || "25ch"}` }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder={placeholder || "Search…"}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </FormControl>
  );
}
