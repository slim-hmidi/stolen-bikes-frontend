import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { CssBaseline } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
}

interface Props {
  loading: boolean;
  columns: object[];
  data: object[];
}

const Table = (props: Props) => {
  const { columns, data, loading } = props;
  let content;

  if (loading) {
    content = (
      <p>Loading...</p>
    )
  } else {
    content = (
      <div>
        <CssBaseline />
        <MaterialTable
          title=""
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            actionsCellStyle: {
              color: '#ffd600'
            },
            rowStyle: {
              color: '#ffd600'
            },
            headerStyle: {
              backgroundColor: '#ffd600',
              color: '#111010'
            },
            showTitle: false,
            searchFieldStyle: {
              color: '#ffd600'
            }
          }}
          style={{
            backgroundColor: '#111010'
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