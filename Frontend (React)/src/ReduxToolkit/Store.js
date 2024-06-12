
import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import taskReducer from './TaskSlice';
import authReducer from './AuthSlice';
import submissionReducer from './SubmissionSlice';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
  submission:submissionReducer

});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});

export default store;
