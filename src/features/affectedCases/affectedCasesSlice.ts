import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
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


const affectedCases = createSlice({
  name: 'affectedCase',
  initialState,
  reducers: {
    updateAffectedCaseStart: (state) => {
      state.error = null;
    },
    startAffectedCasesFetch: (state) => {
      state.loading = true
    },
    fetchAffectedCasesSuccess: (state, action: PayloadAction<ReturnedCase[]>) => {
      state.cases = action.payload;
      state.loading = false;
    },
    updateAffectedCaseSuccess: (state, action: PayloadAction<number>) => {
      state.cases = state.cases.filter(c => c.caseId !== action.payload)
    },
    updateAffectedCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    fetchAffectedCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
})

export const {
  updateAffectedCaseStart,
  startAffectedCasesFetch,
  fetchAffectedCasesSuccess,
  fetchAffectedCaseError,
  updateAffectedCaseSuccess,
  updateAffectedCaseError
} = affectedCases.actions


export default affectedCases.reducer;


export const updateAffectedCaseRequest = (caseToUpdate: AffectedCaseToUpdate): AppThunk => async dispatch => {
  try {
    dispatch(updateAffectedCaseStart());
    const updatedCaseId = await resolveCaseApi(caseToUpdate);
    dispatch(updateAffectedCaseSuccess(updatedCaseId))

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(updateAffectedCaseError(errorMessage))
  }
}

export const fetchAffectedCasesRequest = (officerId: number): AppThunk => async dispatch => {
  try {
    dispatch(startAffectedCasesFetch())
    const affectedCasesList = await affectedCasesApi(officerId);
    dispatch(fetchAffectedCasesSuccess(affectedCasesList))
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(fetchAffectedCaseError(errorMessage))
  }
}