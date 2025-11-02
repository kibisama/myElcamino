import * as React from "react";
import { Autocomplete as MuiAutoComplete } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import Search from "../Search";
import { getPtAutocompleteOptions } from "../../../lib/api/client";

export default function PtAutocomplete({ onChange = () => {}, ...props }) {
  const [options, setOptions] = React.useState([]);
  const getOptions = React.useCallback((q) => {
    (async () => {
      try {
        const { data } = await getPtAutocompleteOptions(q);
        setOptions(data.data);
      } catch (e) {
        setOptions([]);
      }
    })();
  }, []);
  const debounced = useDebouncedCallback((q) => getOptions(q), 500);
  const handleChange = React.useCallback(
    (e) => debounced(e.target.value),
    [debounced]
  );

  return (
    <MuiAutoComplete
      disablePortal
      options={options}
      renderInput={(params) => {
        return (
          <Search
            {...params}
            ref={params.InputProps.ref}
            width={"60ch"}
            size="small"
            onChange={handleChange}
            placeholder="Search Patient…"
          />
        );
      }}
      filterOptions={(options) => options}
      onChange={(e, option) => onChange(option)}
      {...props}
    />
  );
}
