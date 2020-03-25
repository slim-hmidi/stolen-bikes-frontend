import axios from 'axios';

enum Keys {
  caseId = 'caseId',
  name = 'name',
  email = 'email',
  bikeFrameNumber = 'bikeFrameNumber'
}

export interface BasicResult {
  caseId: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
}

export interface NewCase {
  name: string;
  email: string;
  bikeFrameNumber: number;
}

export interface ReturnedCase extends BasicResult {
  caseResolved: boolean | number;
}

export type ReportedCaseToUpdate = {
  [key in Keys]?: string | number;
}


export interface AffectedCaseToUpdate {
  caseId: number;
  officerId: number;
}




export async function reportNewCaseApi(newCase: NewCase): Promise<ReturnedCase> {
  const reportedCase = await axios.post('/reported_cases', {
    name: newCase.name,
    email: newCase.email,
    bikeFrameNumber: newCase.bikeFrameNumber,

  });
  return reportedCase.data;
}

export async function fetchReportedCasesApi(username: string): Promise<ReturnedCase[]> {
  const reportedCaseList = await axios.get(`/reported_cases?name=${username}`);
  const { data } = reportedCaseList
  return data.result;

}

export async function deleteReportCaseApi(id: number): Promise<ReturnedCase> {
  const { data } = await axios.delete(`/reported_cases/${id}`);
  return data.result;
}

export async function updateReportCaseApi(caseToUpdate: ReportedCaseToUpdate): Promise<ReturnedCase> {
  const { data } = await axios.put(`/reported_cases/${caseToUpdate.caseId}`, caseToUpdate);
  return data.result;
}

export async function resolvedCasesApi(officerId: number): Promise<BasicResult[]> {
  const { data } = await axios.get(`/resolved_cases/${officerId}`);
  return data.result;
}

export async function affectedCasesApi(officerId: number): Promise<ReturnedCase[]> {
  const { data } = await axios.get(`/affected_cases/${officerId}`);
  return data.result;
}

export async function resolveCaseApi(affectedCaseToUpdate: AffectedCaseToUpdate): Promise<number> {
  const { officerId, caseId } = affectedCaseToUpdate;
  const { data } = await axios.patch(`/resolved_cases/${officerId}`, {
    reportedCaseId: caseId
  })

  return data.result;

}