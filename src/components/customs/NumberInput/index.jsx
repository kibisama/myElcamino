import React from "react";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      decimalScale={0}
      allowNegative={false}
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
    />
  );
});

const NumberInput = React.forwardRef((props, ref) => {
  return (
    <TextField
      sx={{ width: 140, ...props.sx }}
      slotProps={{
        input: {
          inputComponent: NumericFormatCustom,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default NumberInput;
