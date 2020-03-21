import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column } from 'material-table';
import { affectedCases } from "../../api/reportedCasesApi";
import TableIcons from "../../common/TableIcons";

import {
  startFetch,
  fetchAffectedCasesSuccess,
  fetchError
} from "../../redux/reducers/officerCases.reducers";

import { AppState } from "../../redux/reducers/rootReducer";

interface Row {
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: boolean;
}

const ResolvedCasesList = () => {
  const dispatch = useDispatch();
  const { officerId } = useSelector((state: AppState) => state.affectedCasesReducer)
  const [data, setData] = useState<Row[]>([]);
  const columns: Column<Row>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric' },
    { title: 'Case Resolved', field: 'caseResolved', lookup: { true: true, false: false } }
  ];

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(startFetch())
        const affectedCasesList: Row[] = await affectedCases(officerId);
        dispatch(fetchAffectedCasesSuccess(affectedCasesList))
        const tableData = affectedCasesList.map(c => ({ ...c }))
        setData(tableData);
      } catch (error) {
        let errorMessage = "Internal Server Error";
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        dispatch(fetchError(errorMessage))
      }
    }
    getReportedCasesList()
  }, [officerId, dispatch])

  return (
    <MaterialTable
      icons={TableIcons}
      columns={columns}
      data={data}
      options={{
        showTitle: false,
        rowStyle: {
          color: '#ffd600'
        }
      }}
      style={{
        width: '100%',
        backgroundColor: '#111010'
      }}
    />
  );
}

export default ResolvedCasesList;
