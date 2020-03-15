import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import {
  fetchReportedCasesStart,
  fetchReportCasesSuccess,
  fetchReportCasesError,
  reportCaseRequest
} from "../../redux/reducers/reportedCaseReducer";
import { fetchReportedCases } from "../../api/reportedCasesApi";
import { EnhancedTableHead, stableSort, getComparator, EnhancedTableToolbar } from "../../common/TableUtils";
import { Order, UserData } from "../../utils/table.interfaces"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750,
    }
  })
);

function ReportedCaseList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { username } = useSelector((state: AppState) =>
    ({ username: state.reportedCaseReducer.username }), shallowEqual);
  const [order, setOrder] = React.useState<Order>("asc");
  const [rows, setRows] = React.useState<UserData[]>([]);
  const [orderBy, setOrderBy] = React.useState<keyof UserData>("bikeFrameNumber");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(fetchReportedCasesStart())
        const reportedCasesList = await fetchReportedCases(username);
        dispatch(fetchReportCasesSuccess(reportedCasesList))
        const data: UserData[] = reportedCasesList.map(e => ({
          name: e.name,
          email: e.email,
          bikeFrameNumber: e.bike_frame_number,
          resolvedCase: e.case_resolved
        }));
        setRows(data);
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
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} tableTitle="Reported Cases" />
        <TableContainer>
          <Table
            className={classes.table}
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.bikeFrameNumber}</TableCell>
                      <TableCell>{row.resolvedCase.toString()}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


export default ReportedCaseList;