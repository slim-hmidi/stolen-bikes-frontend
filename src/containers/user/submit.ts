import { Dispatch } from "redux";
import { reportCaseRequest, updateCaseRequest } from "../../redux/reducers/reportedCases.reducers";


export interface IValues {
  bikeFrameNumber: number;
  name: string;
  email: string;
  [key: string]: string | number;
}

interface IError {
  name?: string;
  email?: string;
  bikeFrameNumber?: string;
}
const validate = (values: {
  name: string;
  email: string;
  bikeFrameNumber: number;
}) => {
  const errors: IError = {};
  const { name, email, bikeFrameNumber } = values;
  if (!name) {
    errors.name = "Required";
  }
  if (!email) {
    errors.email = "Required";
  }
  // Check the email's format
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!bikeFrameNumber) {
    errors.bikeFrameNumber = "Required";
  }

  return errors;
};

const submit = (values: IValues, dispatch: Dispatch) => {
  const newCase = {
    email: values.email,
    name: values.name,
    bikeFrameNumber: Number(values.bikeFrameNumber),
  };


  return dispatch<any>(reportCaseRequest(newCase));
};


const updateSubmit = (values: IValues, dispatch: Dispatch, { ...props }) => {
  const { reportCaseId } = props.match.params;
  let reportCase;
  reportCase = Object.keys(values)
    .filter((k: string) => values[k])
    .reduce((acc: any, curr) => {
      const tmp = values[curr];
      if (curr === 'bikeFrameNumber') {
        curr = 'bike_frame_number'
      }
      if (curr === 'caseResolved') {
        curr = 'case_resolved'
      }
      acc[curr] = tmp;
      return acc;
    }, {});

  Object.assign(reportCase, { id: parseInt(reportCaseId, 10) })
  return dispatch<any>(updateCaseRequest(reportCase));
};


export { validate, submit, updateSubmit };
