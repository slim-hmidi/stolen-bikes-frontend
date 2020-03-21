import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Case, AffectedCase } from "../../api/reportedCasesApi";

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
  }
})

export const {
  startFetch,
  fetchResolvedCasesSuccess,
  fetchAffectedCasesSuccess,
  fetchError
} = cases.actions


export default cases.reducer;