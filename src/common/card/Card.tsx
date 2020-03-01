import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

interface IProps {
  children: React.ReactNode;
  handleClick: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

const SimpleCard = (props: IProps) => {
  const classes = useStyles();
  const { children, handleClick } = props;
  return (
    <Card className={classes.root}>
      <Button onClick={handleClick}>
        <CardActionArea>
          <CardContent>
            {children}
          </CardContent>
        </CardActionArea>
      </Button>
    </Card >
  );
};

export default SimpleCard;
