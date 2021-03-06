import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import { usePreferences } from "../../context/PreferencesContext";
import { useUser } from "../../context/UserContext";
import { useHistory } from "react-router";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Typography,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StorefrontIcon from "@material-ui/icons/Storefront";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    headingText: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    }
  })
);

type AppLayoutProps = {
  workGroupId?: string;
  onSearchChange?: (query: string) => void;
  title?: string;
  searchQuery?: string;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onSearchChange,
  title,
  searchQuery
}) => {
  const classes = useStyles();
  const { isDrawerOpen, setIsDrawerOpen } = usePreferences();
  const { logout } = useUser();
  const history = useHistory();
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const logoutHandler = () => {
    logout();
  };

  const workGroupsHandler = () => {
    setIsDrawerOpen(false);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerOpen}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.headingText}>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              {title}
            </Typography>

            {onSearchChange && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  value={searchQuery}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Divider />
        <List>
          <ListItem button onClick={workGroupsHandler}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Work Groups" />
          </ListItem>
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
