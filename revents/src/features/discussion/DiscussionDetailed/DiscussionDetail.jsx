import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { format } from 'date-fns'

const DiscussionDetail = ({discussion}) => {
    return (
        
        <Segment.Group>
            <Segment attached="top">
                <Grid>
                <p><Icon name="file" size="large" color="green" /><b> {discussion.title}</b></p>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid>
                    <p>{discussion.description}</p>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width = {1}>
                        <Icon name="calendar" size="large" color="green" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {discussion.createdAt &&
                        <span>
                            {format(discussion.createdAt.toDate(), 'EEEE do LLLL')} at{' '}
                            {format(discussion.createdAt.toDate(), 'h:mm a')}
                        </span>
                        }
                    </Grid.Column>
                    <Grid.Column width = {5}>
                        <Icon name="box" size="large" color="green"/>By- {discussion.createdBy}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
};

export default DiscussionDetail;

