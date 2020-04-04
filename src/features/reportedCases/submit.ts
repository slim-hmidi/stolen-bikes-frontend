import { Dispatch } from "redux";
import { reportCase } from "./reportedCasesSlice";


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


  return dispatch<any>(reportCase(newCase));
};


export { validate, submit };
