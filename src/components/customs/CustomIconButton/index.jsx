import { ButtonBase, styled } from "@mui/material";

const CustomIconButton = styled(({ ...props }) => <ButtonBase {...props} />)(
  ({ theme }) => ({
    width: "fit-content",
    height: "fit-content",
    padding: "0.5rem",
    border: "1px solid transparent",
    borderRadius: 4,
    color: theme.palette.grey[500],
    ":hover": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.grey[500],
    },
  })
);

export default CustomIconButton;
