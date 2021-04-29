import { Action, ActionTypes } from '../actions';

const INITIAL_STATE = {
  searchResults: [],
  searchTerms: '',
  selectedItem: {},
};

export const searchReducer = (state: {} = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.search:
      return { ...state, searchResults: action.payload };
    case ActionTypes.saveSearchResult:
      return { ...state, saveSearchResult: action.payload };
    default:
      return state;
  }
};
