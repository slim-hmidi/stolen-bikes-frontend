import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  BasicResult,
  ReturnedCase,
  resolveCaseApi,
  AffectedCaseToUpdate,
  affectedCasesApi,
  resolvedCasesApi
} from "../../api/reportedCasesApi";

interface CasesState {
  officerId: number;
  loading: boolean;
  resolvedCases: BasicResult[];
  affectedCases: ReturnedCase[];
  error: string | null;
}
const initialState: CasesState = {
  officerId: 1,
  loading: false,
  resolvedCases: [],
  affectedCases: [],
  error: null
}


const cases = createSlice({
  name: 'affectedCase',
  initialState,
  reducers: {
    officerCaseStart: (state) => {
      state.error = null;
    },
    startAffectedCasesFetch: (state) => {
      state.loading = true
    },
    startResolvedCasesFetch: (state) => {
      state.loading = true
    },
    fetchResolvedCasesSuccess: (state, action: PayloadAction<BasicResult[]>) => {
      state.resolvedCases = action.payload;
      state.loading = false;
    },
    fetchAffectedCasesSuccess: (state, action: PayloadAction<ReturnedCase[]>) => {
      state.affectedCases = action.payload;
      state.loading = false;
    },
    resolveAffectedCaseSuccess: (state, action: PayloadAction<number>) => {
      state.affectedCases = state.affectedCases.filter(c => {
        if (c.caseId === action.payload) {
          c.caseResolved = 1
        }
        return c;
      })
    },
    updateAffectedCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    fetchAffectedCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchResolvedCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export const {
  officerCaseStart,
  startAffectedCasesFetch,
  startResolvedCasesFetch,
  fetchResolvedCasesSuccess,
  fetchAffectedCasesSuccess,
  resolveAffectedCaseSuccess,
  fetchAffectedCaseError,
  fetchResolvedCaseError,
  updateAffectedCaseError
} = cases.actions


export default cases.reducer;


export const updateAffectedCaseRequest = (caseToUpdate: AffectedCaseToUpdate): AppThunk => async dispatch => {
  try {
    dispatch(officerCaseStart());
    const updatedCaseId = await resolveCaseApi(caseToUpdate);
    dispatch(resolveAffectedCaseSuccess(updatedCaseId))

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