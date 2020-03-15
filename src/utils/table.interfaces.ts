export interface UserData {
  name: string;
  email: string;
  bikeFrameNumber: string;
  resolvedCase: boolean;
}

export type Order = "asc" | "desc";


interface HeadCell {
  disablePadding: boolean;
  id: keyof UserData;
  label: string;
  numeric: boolean;
}

export const headCells: HeadCell[] = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "bikeFrameNumber",
    numeric: false,
    disablePadding: false,
    label: "Bike Frame Number"
  },
  {
    id: "resolvedCase",
    numeric: false,
    disablePadding: false,
    label: "Resolved case"
  }
];