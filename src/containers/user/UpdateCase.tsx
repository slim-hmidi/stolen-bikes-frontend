import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import UpdateCaseForm from "./UpdateCaseForm";
import { AppState } from "../../redux/reducers/rootReducer";
import SnackBar from "../../common/SnackBar";

const UpdateCase = (props: any) => {
  const { error } = useSelector((state: AppState) => state.reportedCaseReducer, shallowEqual);
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

export default UpdateCase;