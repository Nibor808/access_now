import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import axios from 'axios';

export interface SearchAction {
  type: ActionTypes.search;
  payload: google.maps.places.PlaceResult[];
}

export interface SaveSearchResult {
  type: ActionTypes.saveSearchResult;
  payload: string;
}

export interface SearchTerms {
  type: ActionTypes.searchTerms;
  payload: string;
}

export interface SelectedItem {
  type: ActionTypes.selectedItem;
  payload: {};
}

export interface SearchResult {
  formatted_address: string;
  name: string;
}

export const search = (
  terms: string,
  service: google.maps.places.PlacesService
) => async (dispatch: Dispatch) => {
  /* clear previous search results string displayed in App before making a new request */
  dispatch<SaveSearchResult>({
    type: ActionTypes.saveSearchResult,
    payload: '',
  });

  const request = {
    query: terms,
    fields: ['name', 'geometry'],
  };

  /* fetch results from search terms */
  service.textSearch(
    request,
    (
      results: google.maps.places.PlaceResult[],
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        /* dispatch both search results and the search terms to the store */
        dispatch<SearchAction>({
          type: ActionTypes.search,
          payload: results,
        });

        dispatch<SearchTerms>({
          type: ActionTypes.searchTerms,
          payload: terms,
        });
      }
    }
  );
};

export const saveSearch = (
  term: string,
  selectedItem: {},
  timeSinceFirstLoad: number,
  userId: number
) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3001/savesearch', {
      term,
      selectedItem,
      timeSinceFirstLoad,
      userId,
    });

    /* dispatch string returned from server with details of the save */
    dispatch<SaveSearchResult>({
      type: ActionTypes.saveSearchResult,
      payload: data,
    });

    /* dispatch selectedItem to the store */
    dispatch<SelectedItem>({
      type: ActionTypes.selectedItem,
      payload: selectedItem,
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearSavedSearchResult = () => (dispatch: Dispatch) => {
  dispatch<SaveSearchResult>({
    type: ActionTypes.saveSearchResult,
    payload: 'Already saved.',
  });
};
