import React, { FC } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";
import { FieldConfig, useField } from "formik";

export type TextFieldProps = MuiTextFieldProps &
  Pick<FieldConfig, "validate"> & {
    name: string;
    maxLength?: number;
    startAdornment?: React.ReactNode;
  };

/**
 * Material UI TextField integrated with Formik
 */
const TextField: FC<TextFieldProps> = ({
  maxLength,
  name,
  helperText,
  rows,
  startAdornment,
  ...rest
}) => {
  const [field, meta] = useField<string>({
    name,
  });

  return (
    <MuiTextField
      {...rest}
      {...field}
      rows={rows}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : helperText}
      inputProps={{ maxLength }}
    />
  );
};

export default TextField;
