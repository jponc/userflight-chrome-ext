import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { WorkGroupsScreen } from "./screens/WorkGroupsScreen";
import { WorkGroupScreen } from "./screens/WorkGroupScreen";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path="/"
          component={WorkGroupsScreen}
        />
        <Route
          exact={true}
          path="/work-groups/:workGroupId"
          component={WorkGroupScreen}
        />
      </Switch>
    </Router>
  );
};
