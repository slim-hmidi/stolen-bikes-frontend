import React from "react";
import { reduxForm } from "redux-form";
import CommonForm from "./CommonForm";
// import { submit, validate } from "./submit";


const ReportCase = (props: any) => {
  return (
    <CommonForm title="New User" buttonLabel="Create User" {...props} />
  )
}
const ReportCaseForm = reduxForm({
  form: "ReportCaseForm",
  initialValues: {
    phoneNumber: "+033 01 23 45 67 89"
  }
  // onSubmit: submit,
  // validate
})(ReportCase);

export default ReportCaseForm;