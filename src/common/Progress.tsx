import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      margin: '0 auto'
    },
  }),
);

export default function CircularLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}