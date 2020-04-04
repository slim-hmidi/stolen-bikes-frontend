import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ReturnedCase,
  resolveCaseApi,
  AffectedCaseToUpdate,
  affectedCasesApi,
} from "../../api/reportedCasesApi";

interface AffectedCasesState {
  officerId: number;
  loading: boolean;
  cases: ReturnedCase[];
  error: string | null;
}
const initialState: AffectedCasesState = {
  officerId: 1,
  loading: false,
  cases: [],
  error: null
}

export const updateAffectedCase = createAsyncThunk(
  'affectedCases/update',
  async (caseToUpdate: AffectedCaseToUpdate, { rejectWithValue }) => {
    try {
      const updatedCaseId = await resolveCaseApi(caseToUpdate);
      return updatedCaseId;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
)

export const fetchAffectedCases = createAsyncThunk(
  'affectedCases/fetch',
  async (officerId: number, { rejectWithValue }) => {
    try {
      const affectedCasesList = await affectedCasesApi(officerId);
      return affectedCasesList;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
)


const affectedCases = createSlice({
  name: 'affectedCase',
  initialState,
  reducers: {},
  extraReducers: {
    [updateAffectedCase.fulfilled.toString()]: (state, action: PayloadAction<number>) => {
      state.cases = state.cases.filter(c => c.caseId !== action.payload)
    },
    [`${updateAffectedCase.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [`${fetchAffectedCases.fulfilled}`]: (state, action: PayloadAction<ReturnedCase[]>) => {
      state.cases = action.payload;
      state.loading = false;
    },
    [`${fetchAffectedCases.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
})



export default affectedCases.reducer;