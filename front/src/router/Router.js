import React from "react";
import {
  Router,
  Switch,
  Redirect,
  Route as CustomRoute,
} from "react-router-dom";
import history from "history/history";
import { ROUTES } from "router/routes";
import CheckEventPage from "pages/CheckEventPage/CheckEventPage";
import AllDataPages from "pages/AllDataPages/AllDataPages";

function ProtectedRouter() {
  return (
    <Router history={history}>
      <Switch>
        <CustomRoute
          exact
          path={ROUTES.checkEvent.path}
          component={CheckEventPage}
        />
        <CustomRoute
          exact
          path={ROUTES.allData.path}
          component={AllDataPages}
          isProtected
        />
        <Redirect to="/aladin/1" />
      </Switch>
    </Router>
  );
}

export default ProtectedRouter;
