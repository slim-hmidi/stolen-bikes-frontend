import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import CommonForm from "./Form";
import { submit, validate } from "./submit";
import { AppState } from "../../redux/reducers/rootReducer";


const CaseForm = (props: any) => {
  return (
    <CommonForm
      title="Report new Case"
      buttonLabel="Report case"
      update={false}
      {...props} />
  )
}
const ReportCase = reduxForm({
  form: "ReportCaseForm",
  onSubmit: submit,
  validate
})(CaseForm);


const ReportCaseForm = connect((state: AppState) => ({
  initialValues: {
    name: state.reportedCaseReducer.username
  }
}))(ReportCase)

export default ReportCaseForm;