import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import MaterialTable, { Column } from 'material-table';
import { affectedCasesApi } from "../../api/reportedCasesApi";
import TableIcons from "../../common/TableIcons";
import { updateAffectedCaseRequest } from "../../redux/reducers/officerCases.reducers";
import {
  startFetch,
  fetchAffectedCasesSuccess,
  fetchError
} from "../../redux/reducers/officerCases.reducers";

import { AppState } from "../../redux/reducers/rootReducer";

interface Row {
  caseId: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: number;
}

const ResolvedCasesList = () => {
  const dispatch = useDispatch();
  const { officerId } = useSelector((state: AppState) => state.officerCasesReducer, shallowEqual)
  const [data, setData] = useState<Row[]>([]);
  const columns: Column<Row>[] = [
    { title: 'Case Id', field: 'caseId', type: 'numeric', editable: 'never' },
    { title: 'Name', field: 'name', editable: 'never' },
    { title: 'Email', field: 'email', editable: 'never' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric', editable: 'never' },
    { title: 'Case Resolved', field: 'caseResolved', lookup: { 1: 'true', 0: 'false' } }
  ];

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(startFetch())
        const affectedCasesList: Row[] = await affectedCasesApi(officerId);
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
      editable={{
        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
          setTimeout(() => {
            if (newData.caseResolved) {
              dispatch(updateAffectedCaseRequest({
                officerId,
                caseId: newData.caseId
              }))
              // data[data.indexOf(oldData)] = newData;
              // setData(data);
            }
            resolve()
          }, 1000)
        }),
      }}
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
