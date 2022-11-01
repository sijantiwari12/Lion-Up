import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import TextArea from '../../../app/common/form/TextArea';

class DiscussionChatForm extends Component {
    handleCommentSubmit = values => {
        const {addDiscussionReply, reset, discussionId, closeForm, parentId} = this.props;
        addDiscussionReply(discussionId, values, parentId);
        reset();
        if(parentId !== 0){
            closeForm();
        }
    };
   
    render(){
        return (
            <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
            <Field 
                name='comment'
                type='text'
                component = {TextArea}
                rows ={2}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        )
    }
}

export default reduxForm({Fields: 'comment'})(DiscussionChatForm);