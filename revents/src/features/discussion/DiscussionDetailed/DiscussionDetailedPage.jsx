import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import {compose} from 'redux';
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import DiscussionDetail from "./DiscussionDetail";
import DiscussionDetailedChat from "./DiscussionDetailedChat";
import DiscussionDetailSidebar from "./DiscussionDetailSidebar";
import { object_Array, createData_Tree } from "../../../app/common/util/helper";
import {addDiscussionReply} from "../discussionActions";

const mapState = (state, ownProps) => {
  const discussionId = ownProps.match.params.id;

  let discussion = {};

  
  if (
    state.firestore.ordered.discussions &&
    state.firestore.ordered.discussions.length > 0
  ) {
    discussion =
      state.firestore.ordered.discussions.filter(discussion => discussion.id === discussionId)[0] ||
      {};
  }

  return {
    discussion,
    auth: state.firebase.auth,
    discussionChat: !isEmpty(state.firebase.data.discussion_chat) && object_Array(state.firebase.data.discussion_chat[ownProps.match.params.id])
  };
};

const actions ={
  addDiscussionReply
}

class DiscussionDetailedPage extends Component{
 
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`discussions/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`discussions/${match.params.id}`);
  }

  render() {
    const {discussion, discussionChat, addDiscussionReply} = this.props;
    const tree = !isEmpty(discussionChat) && createData_Tree(discussionChat);
    return (
      <Grid>
        <Grid.Column width={13}>
          <DiscussionDetail discussion={discussion} />
          <DiscussionDetailedChat discussionChat={tree} addDiscussionReply={addDiscussionReply} discussionId={discussion.id}/>
        </Grid.Column>
        <Grid.Column width={3}>
          <DiscussionDetailSidebar discussion={discussion} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore, connect(mapState, actions),
  firebaseConnect((props) => ([`discussion_chat/${props.match.params.id}`]))
)(DiscussionDetailedPage);
