import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import DiscussionList from "../DiscussionList/DiscussionList";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import {connect} from 'react-redux';
import {createDiscussion} from "../discussionActions"

const mapState = state => ({
  discussions:state.firestore.ordered.discussions
})

const actions = {
  createDiscussion
}

class DiscussionDashboard extends Component {
  render() {
    const {discussions} = this.props;
    return (
      <Grid>
        <Grid.Column width={11}>     
          <DiscussionList discussions ={discussions} />
        </Grid.Column>
        <Grid.Column width={5}>
          <Button
            as={Link}
            to="/createDiscussion"
            positive
            inverted
            content="Create Discussion"
            float="left"
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{collection: 'discussions'}])(DiscussionDashboard));
