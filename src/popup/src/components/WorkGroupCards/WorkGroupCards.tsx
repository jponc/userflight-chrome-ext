import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { WorkGroup } from "../../common/types";
import {
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type WorkGroupCardsProps = {
  workGroups: WorkGroup[];
  onClick: (workGroup: WorkGroup) => void;
};

export const WorkGroupCards: React.FC<WorkGroupCardsProps> = ({
  workGroups,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <>
      {workGroups.map((workGroup) => (
        <Card key={workGroup.id} className={classes.root} onClick={() => onClick(workGroup)}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {workGroup.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
