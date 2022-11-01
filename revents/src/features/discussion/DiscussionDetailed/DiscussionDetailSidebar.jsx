import React, { Fragment } from 'react'
import { Segment } from 'semantic-ui-react'


const DiscussionDetailSidebar = ({discussion}) => {
   
    
    return (
        <Fragment>
            <Segment
                textAlign="center"
                style={{border: "none"}}
                attached="top"
                secondary
                inverted
                color="teal"
        >
            Post related to:
        </Segment>
        <Segment  attached textAlign="center"
                style={{border: "none"}}
                
                secondary
                inverted
                color="grey">
        {discussion.category}
        </Segment>
       
        
        </Fragment>
    )
}

export default DiscussionDetailSidebar;