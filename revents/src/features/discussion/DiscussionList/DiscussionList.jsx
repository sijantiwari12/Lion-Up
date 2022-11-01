import React, { Component, Fragment } from 'react'
import DiscussionListItem from './DiscussionListItem';

class DiscussionList extends Component {
    render() {
      const {discussions} = this.props;
        return (
          <Fragment>
            {discussions && discussions.map(discussion => (
              <DiscussionListItem
              key={discussion.id}
              discussion={discussion}
              />
            ))}
          </Fragment>
            
        )
    }
}

export default DiscussionList;