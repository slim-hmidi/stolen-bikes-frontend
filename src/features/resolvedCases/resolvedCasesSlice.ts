import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
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


const resolvedCases = createSlice({
  name: 'resolvedCases',
  initialState,
  reducers: {
    startResolvedCasesFetch: (state) => {
      state.loading = true
    },
    fetchResolvedCasesSuccess: (state, action: PayloadAction<BasicResult[]>) => {
      state.cases = action.payload;
      state.loading = false;
    },
    fetchResolvedCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export const {
  startResolvedCasesFetch,
  fetchResolvedCasesSuccess,
  fetchResolvedCaseError
} = resolvedCases.actions


export default resolvedCases.reducer;


export const fetchResolvedCasesRequest = (officerId: number): AppThunk => async dispatch => {
  try {
    dispatch(startResolvedCasesFetch())
    const resolvedCasesList = await resolvedCasesApi(officerId);
    dispatch(fetchResolvedCasesSuccess(resolvedCasesList));
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(fetchResolvedCaseError(errorMessage))
  }
}