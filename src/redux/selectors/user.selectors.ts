import { createSelector } from "reselect";
import { AppState } from "../reducers/rootReducer";
import { ReportedCase } from "../../api/reportedCasesApi";


const reportedCases = (state: AppState) => state.reportedCaseReducer.reportedCases;

export const selectedReportedCase = (id: number) => createSelector(
  [reportedCases],
  cases => cases.find(c => c.id === id)
)