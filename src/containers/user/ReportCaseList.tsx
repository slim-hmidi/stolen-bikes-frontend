import React from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  name: string;
  email: string;
  bikeFrameNumber: string;
}

interface TableState {
  columns: Column<Row>[];
  data: Row[];
}

export default function MaterialTableDemo() {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Bike frame number', field: 'bikeFrameNumber' },

    ],
    data: [
      {
        name: 'Mehmet',
        email: 'mehmet.baran@gmail.com',
        bikeFrameNumber: '123dqsdqsd'
      },
      {
        name: 'Zerya Betül',
        email: 'Zerya.Betül@gmail.com',
        bikeFrameNumber: 'qdqdqsdqsd'
      },
    ],
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
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
                setState(prevState => {
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
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
