import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab"
import HomeIcon from '@material-ui/icons/Home';
import React from "react";
import { Field } from "redux-form";
import CardWrapper from "../../common/card/SimpleCard";
import TextField from "../../common/TextFieldWrapper";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

interface IProps {
  pristine: boolean;
  submitting: boolean;
  handleSubmit: () => void;
  title: string;
  buttonLabel: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: "auto",
      marginTop: '5%',
      maxWidth: "80%",
      padding: 16,
    },
    item: {
      marginTop: 16
    },
    paper: {
      padding: 16
    },
    homeIcon: {
      right: 4,
      bottom: 4,
      position: "absolute"
    }

  })
);
const CommonForm = (props: IProps) => {
  const history = useHistory();
  const classes = useStyles();
  const { pristine, submitting, handleSubmit, title, buttonLabel } = props
  const handleFabClick = () => {
    history.push('/user-menu');
  }
  return (
    <div>
      <CssBaseline />
      <Fab
        className={classes.homeIcon}
        color="secondary"
        onClick={handleFabClick}>
        <HomeIcon />
      </Fab>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <CardWrapper
            title={title}
            headerColor={true}>
            <Grid container justify="center" spacing={3}>
              <Grid item md={12}>
                <Field
                  name="name"
                  type="text"
                  component={TextField}
                  label="Name"
                  props={{
                    fullWidth: true
                  }}
                  required={true}
                />
              </Grid>
              <Grid item md={12}>
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  component={TextField}
                  props={{
                    fullWidth: true,
                  }}
                  required={true}
                />
              </Grid>
              <Grid item md={12}>
                <Field
                  name="address"
                  type="text"
                  label="Address"
                  component={TextField}
                  props={{
                    fullWidth: true,
                  }}
                  required={true}
                />
              </Grid>
              <Grid item className={classes.item}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  {buttonLabel}
                </Button>
              </Grid>
            </Grid>
          </CardWrapper>
        </form>
      </div>
    </div>
  );
};

export default CommonForm;
