import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ReportCaseForm from "./ReportCaseForm";
import { AppState } from "../../app/rootReducer";
import SnackBar from "../../common/SnackBar";

const ReportCase = () => {
  const { error } = useSelector((state: AppState) => state.reportedCases, shallowEqual);
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
      <ReportCaseForm />
    </div>
  )
}

export default ReportCase;