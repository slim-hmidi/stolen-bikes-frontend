export interface Data {
  id: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: boolean;
}

export type Order = "asc" | "desc";


interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
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
    id: "caseResolved",
    numeric: false,
    disablePadding: false,
    label: "Resolved case"
  }
];