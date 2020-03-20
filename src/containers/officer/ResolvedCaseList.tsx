import React, { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { Column, Icons } from 'material-table';
import { resolvedAffectedCases } from "../../api/reportedCasesApi";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {
  startFetchAffectedCases,
  fetchAffectedCasesSuccess,
  fetchAffectedCasesError
} from "../../redux/reducers/affectedCases.reducers";

import { AppState } from "../../redux/reducers/rootReducer";

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

interface Row {
  name: string;
  email: string;
  bikeFrameNumber: number;
}

const ResolvedCasesList = () => {
  const dispatch = useDispatch();
  const { officerId } = useSelector((state: AppState) => state.affectedCasesReducer)
  const [data, setData] = useState<Row[]>([]);
  const columns: Column<Row>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric' },
  ];

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(startFetchAffectedCases())
        const affectedCasesList: Row[] = await resolvedAffectedCases(officerId);
        dispatch(fetchAffectedCasesSuccess(affectedCasesList))
        const tableData = affectedCasesList.map(c => ({ ...c }))
        setData(tableData);
      } catch (error) {
        let errorMessage = "Internal Server Error";
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        dispatch(fetchAffectedCasesError(errorMessage))
      }
    }
    getReportedCasesList()
  }, [officerId, dispatch])

  return (
    <MaterialTable
      icons={tableIcons}
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
