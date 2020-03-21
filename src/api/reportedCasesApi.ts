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
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: boolean;
}




export async function reportNewCase(newCase: Case) {
  const reportedCase = await axios.post<ReportedCase>('/reported_cases', {
    name: newCase.name,
    email: newCase.email,
    bikeFrameNumber: newCase.bikeFrameNumber,

  });
  return reportedCase.data;
}

export async function fetchReportedCases(username: string): Promise<ReportedCase[]> {
  const reportedCaseList = await axios.get(`/reported_cases?name=${username}`);
  const { data } = reportedCaseList
  return data.result;

}

export async function deleteReportCase(id: number): Promise<ReportedCase> {
  const { data } = await axios.delete(`/reported_cases/${id}`);
  return data.result;
}

export async function updateReportCase(caseToUpdate: ReportedCase): Promise<ReportedCase> {
  const { data } = await axios.patch(`/reported_cases/${caseToUpdate.id}`, caseToUpdate);
  return data.result;
}

export async function resolvedCases(officerId: number): Promise<Case[]> {
  const { data } = await axios.get(`/resolved_cases/${officerId}`);
  return data.result;
}

export async function affectedCases(officerId: number): Promise<AffectedCase[]> {
  const { data } = await axios.get(`/affected_cases/${officerId}`);
  return data.result;
}