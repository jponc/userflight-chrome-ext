import React from "react";
import { UserQuery } from "../../common/types";
import { Paper, Typography } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: 15,
      marginBottom: 30,
    },
    icon: {
      marginRight: 5,
    },
    attribute: {
      display: "flex",
      marginRight: 10,
    },
  })
);

type UserQueryInfoProps = {
  userQuery: UserQuery;
};

export const UserQueryInfo: React.FC<UserQueryInfoProps> = ({ userQuery }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      {userQuery.email && (
        <div className={classes.attribute}>
          <EmailIcon className={classes.icon} />
          <Typography>{userQuery.email}</Typography>
        </div>
      )}
      {userQuery.fullName && (
        <div className={classes.attribute}>
          <PersonIcon className={classes.icon} />
          <Typography>{userQuery.fullName}</Typography>
        </div>
      )}
      {userQuery.phone && (
        <div className={classes.attribute}>
          <PhoneIcon className={classes.icon} />
          <Typography>{userQuery.phone}</Typography>
        </div>
      )}
      {userQuery.ip && (
        <div className={classes.attribute}>
          <LanguageIcon className={classes.icon} />
          <Typography>{userQuery.ip}</Typography>
        </div>
      )}
    </Paper>
  );
};
