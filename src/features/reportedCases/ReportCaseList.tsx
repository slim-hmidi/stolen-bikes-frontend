import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from 'material-table';
import Fab from "@material-ui/core/Fab";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HomeIcon from "@material-ui/icons/Home";
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularLoading from "../../common/Progress";
import TableIcons from "../../common/TableIcons";
import {
  fetchReportedCaseRequest,
  updateCaseRequest,
  deleteCaseRequest
} from "./reportedCasesSlice";

import { AppState } from "../../app/rootReducer";

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
  const { username, loading, cases } = useSelector((state: AppState) =>
    ({
      username: state.reportedCases.username,
      loading: state.reportedCases.loading,
      cases: state.reportedCases.cases
    }), shallowEqual);
  const data = cases.map(c => ({ ...c }));
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
    dispatch(fetchReportedCaseRequest(username))
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
                  setTimeout(async () => {
                    if (oldData) {
                      dispatch(updateCaseRequest(newData))
                      resolve();
                    }
                  }, 1000)
                }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(async () => {
                      dispatch(deleteCaseRequest(oldData.caseId))
                      resolve();

                    }, 1000);
                  })
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
