import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { reportNewCase, Case, ReportedCase } from "../../api/reportedCasesApi";
import history from "../../history/history";



interface ReportedCasesState {
  username: string;
  reportedCases: ReportedCase[];
  error: string | null;
}

const initialState: ReportedCasesState = {
  username: 'user',
  reportedCases: [],
  error: null
}
const reportedCases = createSlice({
  name: 'reportedCase',
  initialState,
  reducers: {
    reportCaseStart: (state) => {
      state.error = null;

    },
    reportCaseSuccess: (state, action: PayloadAction<ReportedCase>) => {
      state.reportedCases.push(action.payload)
    },
    reportCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})

export const { reportCaseStart, reportCaseSuccess, reportCaseError } = reportedCases.actions;

export default reportedCases.reducer;

export const reportCaseRequest = (newCase: Case): AppThunk => async dispatch => {
  try {
    dispatch(reportCaseStart());
    const reportedCase = await reportNewCase(newCase);
    dispatch(reportCaseSuccess(reportedCase))
    history.push('/user-menu');

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(reportCaseError(errorMessage))
  }
}