import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BasicResult,
  resolvedCasesApi
} from "../../api/reportedCasesApi";

interface ResolvedCasesState {
  officerId: number;
  loading: boolean;
  cases: BasicResult[];
  error: string | null;
}
const initialState: ResolvedCasesState = {
  officerId: 1,
  loading: false,
  cases: [],
  error: null
}

export const fetchResolvedCases = createAsyncThunk(
  'resolvedCases/fetch',
  async (officerId: number, { rejectWithValue }) => {
    try {

      const resolvedCasesList = await resolvedCasesApi(officerId);
      return resolvedCasesList;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);


const resolvedCases = createSlice({
  name: 'resolvedCases',
  initialState,
  extraReducers: {
    [`${fetchResolvedCases.fulfilled}`]: (state, action: PayloadAction<BasicResult[]>) => {
      state.cases = action.payload;
      state.loading = false;
    },
    [`${fetchResolvedCases.rejected}`]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
  reducers: {}
})

export default resolvedCases.reducer;
