import * as React from "react";
import { Autocomplete as MuiAutoComplete } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import Search from "../Search";
import useSWRMutation from "swr/mutation";
import { api } from "../../../lib/api";

export default function PtAutocomplete({ onChange = () => {}, ...props }) {
  const [options, setOptions] = React.useState([]);
  const { trigger } = useSWRMutation(
    "/dRx/pt/?q=",
    (url, { arg }) => api.get(url + arg.q),
    { onSuccess: (data) => setOptions(data), onError: () => setOptions([]) }
  );
  const debounced = useDebouncedCallback((q) => trigger(q), 500);
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
