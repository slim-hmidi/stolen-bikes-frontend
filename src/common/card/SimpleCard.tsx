import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.primary.dark
    },
    header: {
      backgroundColor: theme.palette.secondary.main
    },
    title: {
      color: theme.palette.primary.contrastText,
      textAlign: "center"
    }
  })
);

interface IProps {
  children: React.ReactNode;
  title: string;
  headerColor: boolean;
}

const SimpleCard = (props: IProps) => {
  const classes = useStyles();
  const { children, title, headerColor } = props;

  const headerStyles = headerColor ? classNames(classes.header, classes.title) : "";
  return (
    <Card className={classes.container}>
      <CardHeader
        className={headerStyles}
        title={title}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SimpleCard;
