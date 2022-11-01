import React, { Component } from 'react'
import { Segment, Item, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class DiscussionListItem extends Component {
    render(){
        const {discussion} = this.props;
        return (
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src={discussion.creatorPhotoURL} />
                            <Item.Content>
                                <Item.Header as={Link} to={`/discussions/${discussion.id}`}>
                                {discussion.title} for {discussion.category}
                                </Item.Header> 
                                <Item.Description>
                                    Created by{" "}
                                    <Link to={`/profile/${discussion.creatorPhotoURL}`}>{discussion.createdBy}</Link>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                <Item>
                    <Icon name="clock" />
                    {discussion.createdAt && format(discussion.createdAt.toDate(), 'dd LLL yyyy')} at {' '} {discussion.createdAt && format(discussion.createdAt.toDate(), 'hh:mm a')}
                    </Item>
                </Segment>
           
            <Segment clearing>
                <span>{discussion.description}</span>
                <Button
                    as={Link}
                    to={`/discussions/${discussion.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
            </Segment.Group>
        )
    }
}

export default DiscussionListItem
