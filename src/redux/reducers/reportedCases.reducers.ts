import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { reportNewCaseApi, Case, ReportedCase, deleteReportCaseApi, updateReportCaseApi } from "../../api/reportedCasesApi";
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
    caseStart: (state) => {
      state.error = null;
    },
    reportCaseSuccess: (state, action: PayloadAction<ReportedCase>) => {
      state.reportedCases.push(action.payload)
    },
    caseError: (state, action: PayloadAction<string>) => {
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
    },
    deletedReportedCaseSuccess: (state, action: PayloadAction<number>) => {
      state.reportedCases = state.reportedCases.filter(c => c.id !== action.payload);
    },
    updateReportedCaseSuccess: (state, action: PayloadAction<ReportedCase>) => {
      state.reportedCases = state.reportedCases.map(c => {

        if (c.id === action.payload.id) {
          c = action.payload;
        }
        return c;
      });
    }
  }
})

export const { caseStart,
  reportCaseSuccess,
  caseError,
  fetchReportedCasesStart,
  fetchReportCasesSuccess,
  fetchReportCasesError,
  deletedReportedCaseSuccess,
  updateReportedCaseSuccess } = reportedCases.actions;

export default reportedCases.reducer;

export const reportCaseRequest = (newCase: Case): AppThunk => async dispatch => {
  try {
    dispatch(caseStart());
    const reportedCase = await reportNewCaseApi(newCase);
    dispatch(reportCaseSuccess(reportedCase))
    history.push('/report-case-list');

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(caseError(errorMessage))
  }
}

export const deleteCaseRequest = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(caseStart());
    const deletedReportedCase = await deleteReportCaseApi(id);
    dispatch(deletedReportedCaseSuccess(deletedReportedCase.id))

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(caseError(errorMessage))
  }
}

export const updateCaseRequest = (caseToUpdate: ReportedCase): AppThunk => async dispatch => {
  try {
    dispatch(caseStart());
    const updatedCase = await updateReportCaseApi(caseToUpdate);
    dispatch(updateReportedCaseSuccess(updatedCase))
    history.push('/report-case-list');

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(caseError(errorMessage))
  }
}

