import axios from 'axios';

export interface Case {
  name: string;
  email: string;
  bikeFrameNumber: string;
}

export interface ReportedCase {
  id: string;
  name: string;
  email: string;
  bikeFrameNumber: string;
}

export interface FetchedCase extends ReportedCase {
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

export async function fetchReportedCases(username: string): Promise<FetchedCase[]> {
  const reportedCaseList = await axios.get(`/reported_cases?name=${username}`);
  const { data } = reportedCaseList
  return data.result;

}