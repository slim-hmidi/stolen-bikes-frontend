import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  lighten,
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
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";

import {
  fetchReportedCasesStart,
  fetchReportCasesSuccess,
  fetchReportCasesError,
  deleteCaseRequest,
} from "../../redux/reducers/reportedCases.reducers";
import { fetchReportedCases } from "../../api/reportedCasesApi";
import { EnhancedTableHead, stableSort, getComparator } from "../../common/TableUtils";
import { Order, Data } from "../../utils/table.interfaces"

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      color: theme.palette.secondary.main
    },
    highlight:
      theme.palette.type === "light"
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
    title: {
      flex: "1 1 100%"
    }
  })
);

interface EnhancedTableToolbarProps {
  selectedItems: number[];
  tableTitle: string;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedItems, tableTitle } = props;

  const numSelected = selectedItems.length;

  const deleteItem = (id: number) => {
    dispatch(deleteCaseRequest(id));
  }
  const handleEdit = (id: number) => {
    history.push(`/update-case/${id}`);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })
      }
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" >
            {tableTitle}
          </Typography>
        )}
      {
        numSelected === 1 && (
          <Grid container direction="row" justify="flex-end">
            <Tooltip title="Delete" >
              <IconButton aria-label="delete" onClick={() => deleteItem(selectedItems[0])}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" >
              <IconButton aria-label="edit" onClick={() => handleEdit(selectedItems[0])}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )
      }

      {
        numSelected > 1 ? (
          <Tooltip title="Delete" >
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
          :
          null

      }
    </Toolbar >
  );
};

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
    },
    homeIcon: {
      right: 4,
      bottom: 4,
      position: "absolute"
    }

  })
);

function ReportedCaseList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { username } = useSelector((state: AppState) =>
    ({ username: state.reportedCaseReducer.username }), shallowEqual);
  const [order, setOrder] = React.useState<Order>("asc");
  const [rows, setRows] = React.useState<Data[]>([]);
  const [orderBy, setOrderBy] = React.useState<keyof Data>("bikeFrameNumber");
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: Data) => {
    const { id } = row;
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleFabClick = () => {
    history.push('/user-menu');
  }

  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(fetchReportedCasesStart())
        const reportedCasesList = await fetchReportedCases(username);
        dispatch(fetchReportCasesSuccess(reportedCasesList))
        const data: Data[] = reportedCasesList.map(e => ({
          id: e.id,
          name: e.name,
          email: e.email,
          bikeFrameNumber: e.bike_frame_number,
          caseResolved: e.case_resolved
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
      <Fab
        className={classes.homeIcon}
        color="secondary"
        onClick={handleFabClick}>
        <HomeIcon />
      </Fab>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          selectedItems={selected}
          tableTitle="Reported Cases"
        />
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
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.bikeFrameNumber}
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
                      <TableCell>{row.caseResolved.toString()}</TableCell>
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