import { Checkbox, styled } from "@mui/material";

const CustomCheckbox = styled(({ ...props }) => (
  <Checkbox size="small" disableRipple {...props} />
))(({ theme }) => ({
  padding: 8,
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

export default CustomCheckbox;
