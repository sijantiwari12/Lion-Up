import React, { Component, Fragment } from "react";
import "./App.css";
import NavBar from "../../features/nav/NavBar/NavBar";

import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import DiscussionForm from "../../features/discussion/DiscussionForm/DiscussionForm";
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from "../../features/modals/ModalManager";
import { Container } from "semantic-ui-react";
import DiscussionDashboard from "../../features/discussion/DiscussionDashboard/DiscussionDashboard";
import DiscussionDetailedPage from "../../features/discussion/DiscussionDetailed/DiscussionDetailedPage";
/*import LoginComponent from "../Chat/Login/login";*/
import DashboardComponent from "../Chat/Dashboard/dashboard";


class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/events" component={EventDashboard} />
                  <Route path="/events/:id" component={EventDetailedPage} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/chat" component={DashboardComponent} />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                  />
                  <Route
                    path={["/createDiscussion", "/manage/:id"]}
                    component={DiscussionForm}
                  />
                  <Route path="/test" component={TestComponent} />
                  <Route
                    exact
                    path="/discussions"
                    component={DiscussionDashboard}
                  />
                  <Route path="/discussions/:id" component={DiscussionDetailedPage} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
