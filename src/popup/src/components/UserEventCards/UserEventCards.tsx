import React from "react";

import { Event } from "../../common/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dayjs from "dayjs";

type UserEventCardsProps = {
  userEvents: Event[];
};

type UserEventCardProps = {
  userEvent: Event;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 10,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const UserEventCard: React.FC<UserEventCardProps> = ({ userEvent }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dateStr = dayjs(userEvent.sourceCreatedAt).format("MMMM D, YYYY hh:mm:ss A");

  return (
    <Card className={classes.root} raised={true}>
      <CardHeader
        title={userEvent.name}
        subheader={dateStr}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography>{userEvent.source}</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {userEvent.message}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export const UserEventCards: React.FC<UserEventCardsProps> = ({
  userEvents,
}) => {
  return (
    <>
      {userEvents.map((userEvent) => (
        <UserEventCard key={userEvent.id} userEvent={userEvent} />
      ))}
    </>
  );
};
