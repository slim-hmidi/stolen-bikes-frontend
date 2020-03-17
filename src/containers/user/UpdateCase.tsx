import React, { useState, useEffect } from "react";
import { AppState } from "../../redux/reducers/rootReducer";
import SnackBar from "../../common/SnackBar";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import CommonForm from "./Form";
import { submit, validate } from "./submit";
import { selectedReportedCase } from "../../redux/selectors/user.selectors";

const UpdateForm = (props: any) => {
  return (
    <CommonForm
      title="Update reported Case"
      buttonLabel="Update case"
      update={true}
      {...props} />
  )
}
const UpdateCaseForm = reduxForm({
  form: "UpdateCaseForm",
  onSubmit: submit,
  validate,
})(UpdateForm);

interface Props {
  error: string | null;
}

const UpdateCase = (props: Props) => {
  const { error } = props
  const [open, setOpen] = useState(!!error)
  useEffect(() => {
    setOpen(!!error);
  }, [error]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <SnackBar open={open} handleClose={handleClose} severity="error" textMessage={error}
        anchorOrigin={
          {
            vertical: 'bottom',
            horizontal: 'left'
          }} />
      <UpdateCaseForm />
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: any) => {
  const selectedCase = selectedReportedCase(parseInt(ownProps.match.params.reportCaseId, 10))(state);
  const { error } = state.reportedCaseReducer;
  let initialValues;
  if (selectedCase) {
    initialValues = {
      name: selectedCase.name,
      email: selectedCase.email,
      bikeFrameNumber: selectedCase.bike_frame_number,
      resolvedCase: selectedCase.case_resolved,
    }
  }
  return {
    initialValues,
    error,
  }
}


export default connect(mapStateToProps)(UpdateCase);