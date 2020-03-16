import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import CommonForm from "./Form";
import { submit, validate } from "./submit";
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
  onSubmit: submit,
  validate
})(UpdateForm);

const UpdateCaseForm = connect((state: AppState, ownParams: any) => {
  const selectedCase = selectedReportedCase(ownParams.match.params.reportCaseId)(state);
  let initialValues;
  if (selectedCase) {
    initialValues = {
      name: selectedCase.name,
      email: selectedCase.email,
      bikeFrameNumber: selectedCase.bike_frame_number,
    }
  }
  return {
    initialValues
  }
})(UpdateCase)

export default UpdateCaseForm;