import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import MaterialTable, { Column } from 'material-table';
import TableIcons from "../../common/TableIcons";
import {
  fetchAffectedCasesRequest,
  updateAffectedCaseRequest
} from "../../redux/reducers/officerCases.reducers";

import { AppState } from "../../redux/reducers/rootReducer";

interface Row {
  caseId: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: number;
}

const AffectedCasesList = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: AppState) => state.officerCasesReducer, shallowEqual)
  const { officerId, affectedCases } = states
  const data = affectedCases.map(c => ({ ...c }));
  const columns: Column<Row>[] = [
    { title: 'Case Id', field: 'caseId', type: 'numeric', editable: 'never' },
    { title: 'Name', field: 'name', editable: 'never' },
    { title: 'Email', field: 'email', editable: 'never' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric', editable: 'never' },
    { title: 'Case Resolved', field: 'caseResolved', lookup: { 1: 'true', 0: 'false' } }
  ];

  useEffect(() => {
    dispatch(fetchAffectedCasesRequest(officerId))
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
                caseId: newData.caseId,
                officerId
              }))
              resolve();
            }
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

export default AffectedCasesList;
