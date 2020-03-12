import React, { useEffect, forwardRef } from 'react';
import MaterialTable, { Column } from 'material-table';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducer';
import { fetchReportedCasesStart, fetchReportCasesSuccess, fetchReportCasesError } from "../../redux/reducers/reportedCaseReducer";
import { fetchReportedCases } from "../../api/reportedCasesApi";
import { CssBaseline } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import AddBox from '@material-ui/icons/AddBox';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Check from '@material-ui/icons/Check';
import { Icons } from 'material-table';

interface Row {
  id: string;
  name: string;
  email: string;
  bikeFrameNumber: string;
}

interface TableState {
  columns: Column<Row>[];
  data: Row[];
}

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
}


const Table = () => {
  const dispatch = useDispatch();
  const [tableState, setTableState] = React.useState<TableState>({
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Bike frame number', field: 'bike_frame_number' },
      { title: 'Resolved case', field: 'case_resolved' },

    ],
    data: [],
  });

  const { loading, reportedCases, username } = useSelector((state: AppState) => {
    return {
      loading: state.reportedCaseReducer.loading,
      reportedCases: state.reportedCaseReducer.reportedCases,
      username: state.reportedCaseReducer.username,
    }
  }, shallowEqual);


  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(fetchReportedCasesStart())
        const reportedCasesList = await fetchReportedCases(username);
        dispatch(fetchReportCasesSuccess(reportedCasesList))
        const dataTable = reportedCasesList.map(e => ({ ...e }));
        setTableState((prevState) => {
          let data = [...prevState.data]
          data = data.concat(dataTable);
          return { ...prevState, data }
        })
      } catch (error) {
        let errorMessage = "Internal Server Error";
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        dispatch(fetchReportCasesError(errorMessage))
      }
    }
    getReportedCasesList()
  }, [username, dispatch])

  let content;

  if (loading) {
    content = (
      <p>Loading...</p>
    )
  } else {
    content = (
      <div>
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={tableState.columns}
          data={tableState.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setTableState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setTableState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setTableState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </div>)
  }
  return (
    <div>
      {content}
    </div>);
}


export default Table;