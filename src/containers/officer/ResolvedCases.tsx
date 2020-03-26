import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import MaterialTable, { Column } from 'material-table';
import TableIcons from "../../common/TableIcons";

import {
  fetchResolvedCasesRequest
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
  const { officerId, resolvedCases } = useSelector((state: AppState) => ({
    officerId: state.officerCasesReducer.officerId,
    resolvedCases: state.officerCasesReducer.resolvedCases
  }), shallowEqual);

  const data = resolvedCases.map(c => ({ ...c }));
  const columns: Column<Row>[] = [
    { title: 'Case Id', field: 'caseId', type: 'numeric' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric' },
  ];

  useEffect(() => {
    dispatch(fetchResolvedCasesRequest(officerId))
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
