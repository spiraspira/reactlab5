import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Properties from "../pages/Properties";
import Testimonials from "../pages/Testimonials";
import Messages from "../pages/Messages";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/properties" component={Properties} />
      <Route exact path="/testimonials" component={Testimonials} />
      <Route exact path="/messages" component={Messages} />
      <Redirect to="/properties" />
    </Switch>
  );
};

export default AppRouter;