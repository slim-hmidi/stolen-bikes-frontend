import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  reportNewCaseApi,
  NewCase,
  ReportedCaseToUpdate,
  deleteReportCaseApi,
  updateReportCaseApi,
  ReturnedCase
} from "../../api/reportedCasesApi";
import history from "../../history/history";



interface ReportedCasesState {
  username: string;
  loading: boolean;
  reportedCases: ReturnedCase[];
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
    reportCaseSuccess: (state, action: PayloadAction<ReturnedCase>) => {
      state.reportedCases.push(action.payload)
    },
    caseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    fetchReportedCasesStart: (state) => {
      state.loading = true;
    },
    fetchReportCasesSuccess: (state, action: PayloadAction<ReturnedCase[]>) => {
      state.reportedCases = action.payload;
      state.loading = false;

    },
    fetchReportCasesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletedReportedCaseSuccess: (state, action: PayloadAction<number>) => {
      state.reportedCases = state.reportedCases.filter(c => c.caseId !== action.payload);
    },
    updateReportedCaseSuccess: (state, action: PayloadAction<ReturnedCase>) => {
      state.reportedCases = state.reportedCases.map(c => {

        if (c.caseId === action.payload.caseId) {
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

export const reportCaseRequest = (newCase: NewCase): AppThunk => async dispatch => {
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
    dispatch(deletedReportedCaseSuccess(deletedReportedCase.caseId))

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(caseError(errorMessage))
  }
}

export const updateCaseRequest = (caseToUpdate: ReportedCaseToUpdate): AppThunk => async dispatch => {
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

