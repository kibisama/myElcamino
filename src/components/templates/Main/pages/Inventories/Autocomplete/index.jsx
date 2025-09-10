import * as React from "react";
import {
  Autocomplete as MuiAutoComplete,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Search from "../../../../../inputs/Search";
import { getAutocompleteOptions } from "../../../../../../lib/api/client";

export default function Autocomplete({ handleChange, refresh }) {
  const theme = useTheme();
  const [options, setOptions] = React.useState([]);
  const getOptions = React.useCallback(() => {
    (async () => {
      try {
        const { data } = await getAutocompleteOptions();
        setOptions(data.data);
      } catch (e) {
        console.error(e);
        //
        setOptions([]);
      }
    })();
  }, []);
  React.useEffect(() => {
    getOptions();
  }, [getOptions, refresh]);
  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <MuiAutoComplete
      onChange={handleChange}
      disablePortal
      options={options}
      renderInput={(params) => {
        return (
          <Search
            {...params}
            ref={params.InputProps.ref}
            width={isOverSmViewport ? "60ch" : "30ch"}
            size="small"
          />
        );
      }}
    />
  );
}
