import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import CommonForm from "./Form";
import { updateSubmit, validate } from "./submit";
import { AppState } from "../../redux/reducers/rootReducer";
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
const UpdateCase = reduxForm({
  form: "UpdateCaseForm",
  onSubmit: updateSubmit,
  validate
})(UpdateForm);

const mapStateToProps = (state: AppState, ownProps: any) => {
  const selectedCase = selectedReportedCase(parseInt(ownProps.match.params.reportCaseId, 10))(state);
  let initialValues;
  if (selectedCase) {
    initialValues = {
      name: selectedCase.name,
      email: selectedCase.email,
      bikeFrameNumber: selectedCase.bike_frame_number,
      caseResolved: selectedCase.case_resolved,

    }
  }
  return {
    initialValues
  }
}

export default withRouter(connect(mapStateToProps)(UpdateCase));