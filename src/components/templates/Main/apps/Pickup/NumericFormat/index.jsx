import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
export default forwardRef(function (props, ref) {
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
