import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from 'material-table';
import Fab from "@material-ui/core/Fab";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HomeIcon from "@material-ui/icons/Home";
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularLoading from "../../common/Progress";
import { fetchReportedCasesApi } from "../../api/reportedCasesApi";
import TableIcons from "../../common/TableIcons";
import {
  fetchReportedCasesStart,
  fetchReportCasesSuccess,
  fetchReportCasesError
} from "../../redux/reducers/reportedCases.reducers";
import {
  updateCaseRequest,
} from "../../redux/reducers/reportedCases.reducers";

import { AppState } from "../../redux/reducers/rootReducer";

interface Row {
  caseId: number;
  name: string;
  email: string;
  bikeFrameNumber: number;
  caseResolved: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    homeIcon: {
      right: 4,
      bottom: 4,
      position: "absolute"
    },
    progress: {
      position: 'fixed',
      left: '50%',
      top: '50%'
    }

  })
);

const ResolvedCasesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, loading } = useSelector((state: AppState) =>
    ({
      username: state.reportedCaseReducer.username,
      loading: state.reportedCaseReducer.loading
    }), shallowEqual);
  const [data, setData] = useState<Row[]>([]);
  const columns: Column<Row>[] = [
    { title: 'CaseId', field: 'caseId', editable: 'never' },
    { title: 'Name', field: 'name', editable: 'never' },
    { title: 'Email', field: 'email' },
    { title: 'Bike Frame Number', field: 'bikeFrameNumber', type: 'numeric' },
    {
      title: 'Case Resolved', field: 'caseResolved',
      lookup: {
        1: 'true',
        0: 'false'
      },
      editable: 'never'
    }
  ];

  const handleFabClick = () => {
    history.push('/user-menu');
  }

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(fetchReportedCasesStart())
        const reportedCasesList = await fetchReportedCasesApi(username);
        dispatch(fetchReportCasesSuccess(reportedCasesList))
        const tableData: Row[] = reportedCasesList.map(c =>
          Object.assign({}, c, { caseResolved: c.caseResolved ? 1 : 0 }));
        setData(tableData);
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

  return (
    <div>
      <CssBaseline />
      {
        loading ?
          <div className={classes.progress}>
            <CircularLoading />
          </div>
          :
          <div>
            <Fab
              className={classes.homeIcon}
              color="secondary"
              onClick={handleFabClick}>
              <HomeIcon />
            </Fab>
            <MaterialTable
              icons={TableIcons}
              columns={columns}
              data={data}
              title="Reported Cases"
              editable={{
                onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (oldData) {
                      dispatch(updateCaseRequest(newData))
                      resolve();
                    }
                  }, 600)
                }),
              }}
              options={{
                rowStyle: {
                  color: '#ffd600'
                }
              }}
              style={{
                width: '100%',
                backgroundColor: '#111010'
              }}
            />
          </div>
      }
    </div>
  );
}

export default ResolvedCasesList;
