import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerSm({
  placeholder,
  value,
  onChange = () => {},
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: 140 }}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: { size: "small" },
          openPickerButton: {
            size: "small",
            sx: { height: 32, width: 32, border: "none", mr: -1 },
          },
          actionBar: { actions: ["clear", "accept"] },
        }}
      />
    </LocalizationProvider>
  );
}
