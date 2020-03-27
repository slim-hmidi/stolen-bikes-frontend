import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab"
import HomeIcon from '@material-ui/icons/Home';
import React from "react";
import { Field } from "redux-form";
import CardWrapper from "../../common/SimpleCard";
import TextField from "../../common/TextFieldWrapper";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { submit, validate } from "./submit";
import { AppState } from "../../app/rootReducer";

interface Props {
  pristine: boolean;
  submitting: boolean;
  handleSubmit: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.primary.dark,
    },
    wrapper: {
      flexGrow: 1,
      margin: "auto",
      marginTop: '5%',
      maxWidth: "40%",
      padding: 16,
    },
    item: {
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4)
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
const CaseForm = (props: Props) => {
  const history = useHistory();
  const classes = useStyles();
  const { pristine, submitting, handleSubmit } = props
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
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit}>
          <CardWrapper
            title="Report new Case"
            headerColor={true}>
            <Grid container
              justify="center"
              spacing={3}
              className={classes.container}>
              <Grid
                item
                md={12}
                className={classes.item}>
                <Field
                  name="name"
                  type="text"
                  component={TextField}
                  label="Name"
                  props={{
                    fullWidth: true
                  }}
                  required={true}
                  disabled={true}
                />
              </Grid>
              <Grid
                item
                md={12}
                className={classes.item}>
                <Field
                  name="bikeFrameNumber"
                  type="number"
                  label="Bike Frame Number"
                  component={TextField}
                  props={{
                    fullWidth: true,
                  }}
                  required={true}
                />
              </Grid>
              <Grid
                item
                md={12}
                className={classes.item}>
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
              <Grid item className={classes.item}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Report case
                </Button>
              </Grid>
            </Grid>
          </CardWrapper>
        </form>
      </div>
    </div >
  );
};


const ReportCase = reduxForm<any, any, any>({
  form: "ReportCaseForm",
  onSubmit: submit,
  validate
})(CaseForm);


const ReportCaseForm = connect((state: AppState) => ({
  initialValues: {
    name: state.reportedCases.username
  }
}))(ReportCase)

export default ReportCaseForm;
