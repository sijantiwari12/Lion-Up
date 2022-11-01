import React, { Component } from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import DiscussionChatForm from './DiscussionChatForm'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'

class DiscussionDetailedChat extends Component {
    state = {
        showReplyForm: false,
        selectedCommentId: null
      }
    
      handleOpenReplyForm = (id) => () => {
        this.setState({
          showReplyForm: true,
          selectedReplyId:id
        })
      }
    
      handleCloseReplyForm = () => {
        this.setState({
          selectedReplyId: null,
          showReplyForm: false
        })
      }
    
    render() {
        const { addDiscussionReply, discussionId, discussionChat } = this.props;
        const {showReplyForm, selectedReplyId} = this.state;
       return (
            <div>
                <Segment attached>
          <Comment.Group>
            {discussionChat &&
              discussionChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Reply</Comment.Action>
                      {showReplyForm && selectedReplyId === comment.id && (
                        <DiscussionChatForm  
                        addDiscussionReply={addDiscussionReply}
                        discussionId = {discussionId}
                        form = {`reply_${comment.id}`}
                        closeForm = {this.handleCloseReplyForm}
                        parentId={comment.id}
                        />
                       )}
                    </Comment.Actions>
                  </Comment.Content>
                  
                  {comment.childNodes && comment.childNodes.map((child) => (
                      <Comment.Group>
                      <Comment key={child.id}>
                      <Comment.Avatar
                        src={child.photoURL || "/assets/user.png"}
                      />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                          {child.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(child.date, Date.now())} ago</div>
                        </Comment.Metadata>
                        <Comment.Text>{child.text}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action onClick={this.handleOpenReplyForm(child.id)}>Reply</Comment.Action>
                          {showReplyForm && selectedReplyId === child.id && (
                            <DiscussionChatForm  
                            addDiscussionReply={addDiscussionReply}
                            discussionId = {discussionId}
                            form = {`reply_${comment.id}`}
                            closeForm = {this.handleCloseReplyForm}
                            parentId={child.parentId}
                            />
                           )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                      </Comment.Group>
                  ))}
                  

                </Comment>
              ))}
          </Comment.Group>
          <DiscussionChatForm
            addDiscussionReply={addDiscussionReply}
            discussionId={discussionId}
            form={'newComment'}
            parentId={0}
          />
        </Segment>
            </div>
        );
    }
}

export default DiscussionDetailedChat;