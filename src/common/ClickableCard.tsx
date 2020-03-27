import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
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
  handleClick: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const ClickableCard = (props: IProps) => {
  const classes = useStyles();
  const { children, handleClick } = props;
  return (
    <div onClick={handleClick}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            {children}
          </CardContent>
        </CardActionArea>
      </Card >
    </div>
  );
};

export default ClickableCard;
