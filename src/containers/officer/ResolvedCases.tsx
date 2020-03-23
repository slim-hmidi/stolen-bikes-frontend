import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import MaterialTable, { Column } from 'material-table';
import { resolvedCasesApi } from "../../api/reportedCasesApi";
import TableIcons from "../../common/TableIcons";

import {
  startFetch,
  fetchResolvedCasesSuccess,
  fetchError
} from "../../redux/reducers/officerCases.reducers";

import { AppState } from "../../redux/reducers/rootReducer";

interface Row {
  caseId: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
}

const ResolvedCasesList = () => {
  const dispatch = useDispatch();
  const { officerId } = useSelector((state: AppState) => state.officerCasesReducer, shallowEqual)
  const [data, setData] = useState<Row[]>([]);
  const columns: Column<Row>[] = [
    { title: 'Case Id', field: 'caseId', type: 'numeric' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric' },
  ];

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(startFetch())
        const resolvedCasesList: Row[] = await resolvedCasesApi(officerId);
        dispatch(fetchResolvedCasesSuccess(resolvedCasesList))
        const tableData = resolvedCasesList.map(c => ({ ...c }))
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
