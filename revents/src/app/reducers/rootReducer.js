import { combineReducers } from "redux";
import {reducer as FormReducer} from 'redux-form';
import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import discussionReducer from "../../features/discussion/discussionReducer"
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import {reducer as ToastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from "react-redux-firebase";
import {firestoreReducer} from 'redux-firestore';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer,
  discussions: discussionReducer
});

export default rootReducer;
