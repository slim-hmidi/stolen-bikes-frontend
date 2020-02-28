import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

interface IProps {
  children: React.ReactNode;
}

const SimpleCard = (props: IProps) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          {children}
        </CardContent>
      </CardActionArea>
    </Card >
  );
};

export default SimpleCard;
