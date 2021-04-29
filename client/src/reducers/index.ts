import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';

export const reducers = combineReducers({
  search: searchReducer,
});
