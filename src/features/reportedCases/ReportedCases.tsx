import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState } from "../../app/rootReducer";
import ReportCaseList from "./ReportCaseList";
import SnackBar from "../../common/SnackBar";
import { resetSnackBar } from "./reportedCasesSlice"


const ReportedCases = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: AppState) => ({
    error: state.reportedCases.error
  }), shallowEqual);
  const [open, setOpen] = useState(!!error)
  useEffect(() => {
    setOpen(!!error);
  }, [error]);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetSnackBar());
  };

  return (
    <div>
      <SnackBar
        open={open}
        handleClose={handleClose}
        severity="error"
        textMessage={error}
        anchorOrigin={
          {
            vertical: 'bottom',
            horizontal: 'left'
          }} />
      <ReportCaseList />
    </div>
  )
}

export default ReportedCases;