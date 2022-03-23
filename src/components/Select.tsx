import { FC, useCallback, useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@material-ui/core";
import { useField } from "formik";

export type Option = {
  name: string;
  value: string;
};

type SelectProps = MuiSelectProps & {
  options: Option[] | undefined;
  name: string;
};
const Select: FC<SelectProps> = ({ options, name, fullWidth, label }) => {
  const [field, meta, helpers] = useField<string>({
    name,
  });
  const { setValue } = helpers;

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  if (!options) {
    return null;
  }
  return (
    <>
      <InputLabel id="inputLabel">{label}</InputLabel>
      <MuiSelect
        {...field}
        onChange={handleChange}
        name={name}
        value={field.value}
        label={label}
        labelId="inputLabel"
        variant="outlined"
        fullWidth={fullWidth}
        placeholder="Select..."
      >
        {options
          ? options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))
          : null}
      </MuiSelect>
    </>
  );
};

export default Select;
