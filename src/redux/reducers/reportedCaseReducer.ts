import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { reportNewCase, Case, ReportedCase } from "../../api/reportedCasesApi";
import history from "../../history/history";



interface ReportedCasesState {
  username: string;
  loading: boolean;
  reportedCases: ReportedCase[];
  error: string | null;
}

const initialState: ReportedCasesState = {
  username: 'user',
  loading: false,
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
    },
    fetchReportedCasesStart: (state) => {
      state.loading = true;
    },
    fetchReportCasesSuccess: (state, action: PayloadAction<ReportedCase[]>) => {
      state.reportedCases = action.payload;
      state.loading = false;

    },
    fetchReportCasesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export const { reportCaseStart,
  reportCaseSuccess,
  reportCaseError,
  fetchReportedCasesStart,
  fetchReportCasesSuccess,
  fetchReportCasesError } = reportedCases.actions;

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

// export const fetchReportedCasesRequest = (username: string): AppThunk => async dispatch => {
//   try {
//     dispatch(fetchReportedCasesStart())
//     const reportedCasesList = await fetchReportedCases(username);
//     dispatch(fetchReportCasesSuccess(reportedCasesList))
//   } catch (error) {
//     let errorMessage = "Internal Server Error";
//     if (error.response) {
//       errorMessage = error.response.data.message;
//     }
//     dispatch(fetchReportCasesError(errorMessage))
//   }
// }