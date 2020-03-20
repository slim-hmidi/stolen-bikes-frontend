import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Case } from "../../api/reportedCasesApi";

interface AffectedCasesState {
  officerId: number;
  loading: boolean;
  affectedCases: Case[];
  error: string | null;
}
const initialState: AffectedCasesState = {
  officerId: 1,
  loading: false,
  affectedCases: [],
  error: null
}


const affectedCases = createSlice({
  name: 'affectedCase',
  initialState,
  reducers: {
    startFetchAffectedCases: (state) => {
      state.loading = false
    },
    fetchAffectedCasesSuccess: (state, action: PayloadAction<Case[]>) => {
      state.affectedCases = action.payload;
      state.loading = false;
    },
    fetchAffectedCasesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
})

export const {
  startFetchAffectedCases,
  fetchAffectedCasesSuccess,
  fetchAffectedCasesError
} = affectedCases.actions


export default affectedCases.reducer;