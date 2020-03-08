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
  caseResolved: boolean;
}



export async function reportNewCase(newCase: Case) {
  const { data } = await axios.post<ReportedCase>('/reported_cases', {
    name: newCase.name,
    email: newCase.email,
    bikeFrameNumber: newCase.bikeFrameNumber,

  });
  return data;
}