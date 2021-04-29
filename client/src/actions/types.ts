import {
  SaveSearchResult,
  SearchAction,
  SearchTerms,
  SelectedItem,
} from './search_actions';

export enum ActionTypes {
  search,
  saveSearchResult,
  searchTerms,
  selectedItem,
}

export type Action =
  | SearchAction
  | SaveSearchResult
  | SearchTerms
  | SelectedItem;
