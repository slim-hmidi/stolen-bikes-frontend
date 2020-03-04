import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  })
);

interface IProps {
  label: string;
  input: {
    onBlur: (arg: any) => void;
    onChange: (arg: any) => void;
    value: string;
  };
  type: string;
  fullWidth: boolean;
  meta: {
    touched: boolean;
    error: string;
  };
  required: boolean;
}

function SimpleTextField(props: IProps) {
  const classes = useStyles();

  const { required, label, meta, type, input, fullWidth } = props;
  return (
    <TextField
      required={required}
      className={classes.textField}
      color="secondary"
      label={label}
      error={!!(meta.touched && meta.error)}
      margin="normal"
      type={type}
      value={input.value}
      onChange={input.onChange}
      variant="outlined"
      onBlur={input.onBlur}
      fullWidth={fullWidth}
      helperText={meta.touched && meta.error ? meta.error : ""}
    />
  );
}

export default SimpleTextField;
