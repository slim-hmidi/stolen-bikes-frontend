import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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

export const reportCase = createAsyncThunk(
  'reportedCases/add',
  async (newCase: NewCase, { rejectWithValue }) => {
    try {
      const reportedCase = await reportNewCaseApi(newCase);
      history.push('/report-case-list');
      return reportedCase;

    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage)
    }
  }
);

export const deleteReportedCase = createAsyncThunk(
  'reportedCases/delete',
  async (id: number, { rejectWithValue }) => {
    try {

      const deletedReportedCase = await deleteReportCaseApi(id);
      return deletedReportedCase;

    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateReportedCase = createAsyncThunk(
  'reportedCases/update',
  async (caseToUpdate: ReportedCaseToUpdate, { rejectWithValue }) => {
    try {

      const updatedCase = await updateReportCaseApi(caseToUpdate);
      return updatedCase;

    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchReportedCases = createAsyncThunk(
  'reportedCases/fetch',
  async (username: string, { rejectWithValue }) => {
    try {

      const reportedCasesList = await fetchReportedCasesApi(username);
      return reportedCasesList;

    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage)
    }
  }
)
const reportedCases = createSlice({
  name: 'reportedCase',
  initialState,
  extraReducers: {
    [`${reportCase.fulfilled}`]: (state, action: PayloadAction<ReturnedCase>) => {
      state.cases.push(action.payload)
    },
    [`${reportCase.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [`${deleteReportedCase.fulfilled}`]: (state, action: PayloadAction<ReturnedCase>) => {
      state.cases = state.cases.filter(c => c.caseId !== action.payload.caseId);
    },
    [`${deleteReportedCase.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [`${updateReportedCase.fulfilled}`]: (state, action: PayloadAction<ReturnedCase>) => {
      state.cases = state.cases.map(c => {

        if (c.caseId === action.payload.caseId) {
          c = action.payload;
        }
        return c;
      });
    },
    [`${updateReportedCase.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [`${fetchReportedCases.fulfilled}`]: (state, action: PayloadAction<ReturnedCase[]>) => {
      state.cases = action.payload;
      state.loading = false;
    },
    [`${fetchReportedCases.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  reducers: {}
})



export default reportedCases.reducer;



