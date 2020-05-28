import React from "react";
import { Event, UserQuery } from "../../common/types";
import { List, ListItem, Chip, makeStyles } from "@material-ui/core";

type PriorityEventItemProps = {
  priorityEvent: Event;
  onClick: (userQuery: UserQuery) => void;
};

type PriorityEventsListProps = {
  priorityEvents: Event[];
  onClick: (userQuery: UserQuery) => void;
};

const useStyles = makeStyles(() => ({
  chip: {
    marginRight: 10,
    marginBottom: 10
  },
  line: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const PriorityEventItem: React.FC<PriorityEventItemProps> = ({
  priorityEvent,
  onClick,
}) => {
  const classes = useStyles();
  const userQuery: UserQuery = {
    ip: priorityEvent.ip,
    fullName: priorityEvent.fullName,
    email: priorityEvent.email,
    phone: priorityEvent.phone,
  };

  return (
    <ListItem className={classes.line} divider button onClick={() => onClick(userQuery)}>
      {userQuery.email && <Chip className={classes.chip} label={userQuery.email} />}
      {userQuery.fullName && <Chip className={classes.chip} label={userQuery.fullName} />}
      {userQuery.phone && <Chip className={classes.chip} label={userQuery.phone} />}
      {userQuery.ip && <Chip className={classes.chip} label={userQuery.ip} />}
    </ListItem>
  );
};

export const PriorityEventsList: React.FC<PriorityEventsListProps> = ({
  priorityEvents,
  onClick,
}) => {
  return (
    <List component="nav">
      {priorityEvents.map((priorityEvent) => (
        <PriorityEventItem
          key={priorityEvent.id}
          priorityEvent={priorityEvent}
          onClick={onClick}
        />
      ))}
    </List>
  );
};
