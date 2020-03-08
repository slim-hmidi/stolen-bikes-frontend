import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { reportNewCase, Case, ReportedCase } from "../../api/reportedCasesApi";


interface ReportedCasesState {
  bikes: ReportedCase[];
  error: string | null;
}

const initialState: ReportedCasesState = {
  bikes: [],
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
      state.bikes.push(action.payload)
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

  } catch (error) {
    dispatch(reportCaseError(error))
  }
}