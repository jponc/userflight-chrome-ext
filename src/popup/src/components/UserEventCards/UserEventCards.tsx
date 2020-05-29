import React from "react";

import { Event } from "../../common/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import dayjs from "dayjs";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";

type UserEventCardsProps = {
  userEvents: Event[];
};

type UserEventCardProps = {
  userEvent: Event;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    messageText: {
      whiteSpace: "pre-wrap"
    }
  })
);

const UserEventCard: React.FC<UserEventCardProps> = ({ userEvent }) => {
  const classes = useStyles();

  const dateStr = dayjs(userEvent.sourceCreatedAt).format(
    "MMMM D, YYYY hh:mm:ss A"
  );

  const itemText = `[${dateStr}] - ${userEvent.name} - ${userEvent.source}`;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{itemText}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <div className={classes.messageText} dangerouslySetInnerHTML={{ __html: userEvent.message }} />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export const UserEventCards: React.FC<UserEventCardsProps> = ({
  userEvents,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {userEvents.map((userEvent) => (
        <UserEventCard key={userEvent.id} userEvent={userEvent} />
      ))}
    </div>
  );
};
