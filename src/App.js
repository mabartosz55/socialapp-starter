import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import UpdateProfile from "./pages/UpdateProfile";

import Homepage from "./pages/homepage/Homepage";

import UserFeed from "./pages/UserFeed";



import MessageFeed from "./pages/MessageFeed";


class App extends React.Component {
  render() {
    return (
      <Switch>

        <Route
          exact
          path="/"
          component={SignIn}
        />
        <Route
          exact
          path="/Homepage"
          component={Homepage}
        />

        <Route
          exact
          path="/registration"
          component={Registration}
        />

        <Route
          exact
          path="/profile/:username"
          component={Profile}
        />

        <Route
          exact
          path="/profile/updateprofile/:username"
          component={UpdateProfile}
        />
        <Route
          exact
          path="/userfeed"
          component={UserFeed}
        />
        <Route
          exact
          path="/messagefeed"
          component={MessageFeed}

        />

        <Route
          exact
          path="*"
          component={NotFound}
        />
      </Switch>

    );
  }
}

export default App;

// PM: remove extra spaces between imports line 10 to 16
// Overall project structure: Consider refactoring homepage directory,
// move homepage images to the images directory, move the css to index.css.
// Consider combining some pages, maybe combine signin and register or 
// messagefeed and userfeed. Remove .bash_profile file from git repo