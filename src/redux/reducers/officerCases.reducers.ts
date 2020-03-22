import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { Case, AffectedCase, resolveCaseApi, CaseToUpdate } from "../../api/reportedCasesApi";

interface CasesState {
  officerId: number;
  loading: boolean;
  resolvedCases: Case[];
  affectedCases: AffectedCase[];
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
    startFetch: (state) => {
      state.loading = true
    },
    fetchResolvedCasesSuccess: (state, action: PayloadAction<Case[]>) => {
      state.resolvedCases = action.payload;
      state.loading = false;
    },
    fetchAffectedCasesSuccess: (state, action: PayloadAction<AffectedCase[]>) => {
      state.affectedCases = action.payload;
      state.loading = false;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
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
    officerCaseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
})

export const {
  officerCaseStart,
  startFetch,
  fetchResolvedCasesSuccess,
  fetchAffectedCasesSuccess,
  fetchError,
  resolveAffectedCaseSuccess,
  officerCaseError,
} = cases.actions


export default cases.reducer;


export const updateAffectedCaseRequest = (caseToUpdate: CaseToUpdate): AppThunk => async dispatch => {
  try {
    dispatch(officerCaseStart());
    const updatedCaseId = await resolveCaseApi(caseToUpdate);
    dispatch(resolveAffectedCaseSuccess(updatedCaseId))

  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error.response) {
      errorMessage = error.response.data.message;
    }
    dispatch(officerCaseError(errorMessage))
  }
}