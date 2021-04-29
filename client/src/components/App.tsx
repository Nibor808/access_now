import React, { ReactNode } from 'react';
import {
  clearSavedSearchResult,
  saveSearch,
  search,
  SearchResult,
} from '../actions';
import { connect } from 'react-redux';

interface AppProps {
  searchResults: SearchResult[];
  search: Function;
  saveSearch: Function;
  saveSearchResult: string;
  clearSavedSearchResult: Function;
}

interface AppState {
  term: string;
  service: google.maps.places.PlacesService | null;
  selected: SearchResult;
  firstLoadTime: number;
  userId: number;
  selectedCache: Object;
}

interface SelectedCache {
  [key: string]: {};
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      term: '',
      service: null,
      selected: { formatted_address: '', name: '' },
      firstLoadTime: 0,
      userId: Math.floor(Math.random() * 1000),
      selectedCache: {},
    };
  }

  componentDidMount() {
    /* set up google api service on window load */
    window.addEventListener('load', () => {
      this.setState({
        service: new window.google.maps.places.PlacesService(
          document.querySelector('#service') as HTMLDivElement
        ),
        firstLoadTime: Date.now(),
      });
    });
  }

  callSearch = (): void => {
    const { term, service } = this.state;

    /* perform search and reset selected value */
    this.props.search(term, service);
    this.setState({ selected: { formatted_address: '', name: '' } });
  };

  renderSelected(result: SearchResult): void {
    /* set new selected value from search results when clicked */
    this.setState({ selected: result });

    this.saveOrCache(result);
  }

  saveOrCache(result: SearchResult) {
    const { term, firstLoadTime, userId, selected, selectedCache } = this.state;
    const timeSinceFirstLoad = Date.now() - firstLoadTime;

    /* save a new value and add it to cache if not already in cache */
    if (!(selectedCache as SelectedCache)[result.name]) {
      (selectedCache as SelectedCache)[result.name] = selected;
      this.props.saveSearch(term, result, timeSinceFirstLoad, userId);
    } else this.props.clearSavedSearchResult();
  }

  renderResults(): ReactNode {
    const { searchResults } = this.props;

    return searchResults.map((result: SearchResult, index: number) => {
      return (
        <li key={index} onClick={() => this.renderSelected(result)}>
          {result.name} - {result.formatted_address}
        </li>
      );
    });
  }

  render() {
    const { selected } = this.state;
    const { saveSearchResult } = this.props;

    return (
      <div style={{ padding: '20px' }}>
        <h1>Find</h1>
        <div id='service' />
        <label htmlFor='term' style={{ marginRight: '5px' }}>
          Enter a place or a thing
        </label>
        <input
          type='text'
          id={'term'}
          onChange={ev => this.setState({ term: ev.target.value })}
        />
        <button type='submit' onClick={this.callSearch}>
          Search
        </button>

        <ul>{this.renderResults()}</ul>

        {selected.name ? (
          <div>
            <p>Selected</p>
            <p>
              {selected.name}: {selected.formatted_address}
            </p>
          </div>
        ) : null}

        {saveSearchResult ? (
          <div>
            <p>Saved</p>
            <p>{saveSearchResult}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: {
  search: {
    searchResults: SearchResult[];
    saveSearchResult: string;
    searchTerms: string;
    selectedItem: {};
  };
}) => {
  return {
    searchResults: state.search.searchResults,
    saveSearchResult: state.search.saveSearchResult,
    searchTerms: state.search.searchTerms,
    selectedItem: state.search.selectedItem,
  };
};

export default connect(mapStateToProps, {
  search,
  saveSearch,
  clearSavedSearchResult,
})(App);
