import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import {
  reportNewCaseApi,
  NewCase,
  ReportedCaseToUpdate,
  deleteReportCaseApi,
  updateReportCaseApi,
  ReturnedCase,
  fetchReportedCasesApi
} from "../../api/reportedCasesApi";
import history from "../../history/history";



interface ReportedCasesState {
  username: string;
  loading: boolean;
  cases: ReturnedCase[];
  error: string | null;
}

const initialState: ReportedCasesState = {
  username: 'user',
  loading: false,
  cases: [],
  error: null
}
const reportedCases = createSlice({
  name: 'reportedCase',
  initialState,
  reducers: {
    start: (state) => {
      state.error = null;
    },
    reportCaseSuccess: (state, action: PayloadAction<ReturnedCase>) => {
      state.cases.push(action.payload)
    },
    fail: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    fetchReportedCasesStart: (state) => {
      state.loading = true;
    },
    fetchReportCasesSuccess: (state, action: PayloadAction<ReturnedCase[]>) => {
      state.cases = action.payload;
      state.loading = false;

    },
    fetchReportCasesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletedReportedCaseSuccess: (state, action: PayloadAction<ReturnedCase>) => {
      state.cases = state.cases.filter(c => c.caseId !== action.payload.caseId);
    },
    updateReportedCaseSuccess: (state, action: PayloadAction<ReturnedCase>) => {
      state.cases = state.cases.map(c => {

        if (c.caseId === action.payload.caseId) {
          c = action.payload;
        }
        return c;
      });
    }
  }
})

export const { start,
  reportCaseSuccess,
  fail,
  fetchReportedCasesStart,
  fetchReportCasesSuccess,
  fetchReportCasesError,
  deletedReportedCaseSuccess,
  updateReportedCaseSuccess } = reportedCases.actions;

export default reportedCases.reducer;

export const reportCaseRequest = (newCase: NewCase): AppThunk => async dispatch => {
  try {
    dispatch(start());
    const reportedCase = await reportNewCaseApi(newCase);
    dispatch(reportCaseSuccess(reportedCase))
    history.push('/report-case-list');

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(fail(errorMessage))
  }
}

export const deleteCaseRequest = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(start());
    const deletedReportedCase = await deleteReportCaseApi(id);
    dispatch(deletedReportedCaseSuccess(deletedReportedCase))

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(fail(errorMessage))
  }
}

export const updateCaseRequest = (caseToUpdate: ReportedCaseToUpdate): AppThunk => async dispatch => {
  try {
    dispatch(start());
    const updatedCase = await updateReportCaseApi(caseToUpdate);
    dispatch(updateReportedCaseSuccess(updatedCase))
    history.push('/report-case-list');

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(fail(errorMessage))
  }
}

export const fetchReportedCaseRequest = (username: string): AppThunk => async dispatch => {
  try {
    dispatch(fetchReportedCasesStart())
    const reportedCasesList = await fetchReportedCasesApi(username);
    dispatch(fetchReportCasesSuccess(reportedCasesList))
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(fetchReportCasesError(errorMessage))
  }
}

