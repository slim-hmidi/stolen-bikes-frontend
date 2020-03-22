import axios from 'axios';

export interface Case {
  name: string;
  email: string;
  bikeFrameNumber: number;
}

export interface ReportedCase {
  id: number;
  name: string;
  email: string;
  bike_frame_number: number;
  case_resolved: boolean;
}

export interface AffectedCase {
  caseId: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: number;
}

export interface CaseToUpdate {
  caseId: number;
  officerId: number;
}




export async function reportNewCaseApi(newCase: Case) {
  const reportedCase = await axios.post<ReportedCase>('/reported_cases', {
    name: newCase.name,
    email: newCase.email,
    bikeFrameNumber: newCase.bikeFrameNumber,

  });
  return reportedCase.data;
}

export async function fetchReportedCasesApi(username: string): Promise<ReportedCase[]> {
  const reportedCaseList = await axios.get(`/reported_cases?name=${username}`);
  const { data } = reportedCaseList
  return data.result;

}

export async function deleteReportCaseApi(id: number): Promise<ReportedCase> {
  const { data } = await axios.delete(`/reported_cases/${id}`);
  return data.result;
}

export async function updateReportCaseApi(caseToUpdate: ReportedCase): Promise<ReportedCase> {
  const { data } = await axios.patch(`/reported_cases/${caseToUpdate.id}`, caseToUpdate);
  return data.result;
}

export async function resolvedCasesApi(officerId: number): Promise<Case[]> {
  const { data } = await axios.get(`/resolved_cases/${officerId}`);
  return data.result;
}

export async function affectedCasesApi(officerId: number): Promise<AffectedCase[]> {
  const { data } = await axios.get(`/affected_cases/${officerId}`);
  return data.result;
}

export async function resolveCaseApi(affectedCaseToUpdate: CaseToUpdate): Promise<number> {
  const { officerId, caseId } = affectedCaseToUpdate;
  const { data } = await axios.patch(`/resolved_cases/${officerId}`, {
    reportedCaseId: caseId
  })

  return data.result;

}