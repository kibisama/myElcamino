import { ToggleButtonGroup, ToggleButton, styled } from "@mui/material";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  fontWeight: 600,
  "&.Mui-disabled": {
    color: theme.palette.grey[500],
  },
}));
const CustomToggleButtonGroup = ({ buttons = [], ...props }) => {
  return (
    <ToggleButtonGroup fullWidth color="primary" {...props}>
      {buttons.map((v, i) => (
        <StyledToggleButton key={i} value={v} children={v} />
      ))}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButtonGroup;
