import {createReducer} from '../../app/common/util/reducerUtils'
import { CREATE_DISCUSSION, UPDATE_DISCUSSION, DELETE_DISCUSSION, FETCH_DISCUSSIONS } from './discussionConstants';


 const initialState = [];

  const createDiscussion = (state, payload) =>{
      return [...state, payload.discussion]
  }

  const updateDiscussion = (state, payload) =>{
      return[
          ...state.filter(discussion => discussion.id !== payload.discussion.id), payload.discussion
      ]
  } 

  const deleteDiscussion = (state, payload) => {
      return [
          ...state.filter(discussion => discussion.id !== payload.discussionId)
      ]
  }

  const fetchDiscussions = (state, payload) =>{
    return payload.discussions
  }

  export default createReducer(initialState,{
      [CREATE_DISCUSSION]: createDiscussion,
      [UPDATE_DISCUSSION]: updateDiscussion,
      [DELETE_DISCUSSION]: deleteDiscussion,
      [FETCH_DISCUSSIONS]: fetchDiscussions
  })