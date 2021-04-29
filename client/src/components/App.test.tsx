import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';

const props = {
  searchResults: [],
  search: jest.fn(),
  saveSearch: jest.fn(),
  saveSearchResult: '',
  clearSavedSearchResult: jest.fn(),
};

test('renders form elements', () => {
  render(<App {...props} />);

  const submitButton = screen.getByText(/Search/i);
  const label = screen.getByTestId('label');
  const termInput = screen.getByTestId('term');
  const searchResultsDiv = screen.getByTestId('searchResults');

  expect(submitButton).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(termInput).toBeInTheDocument();
  expect(searchResultsDiv).toBeInTheDocument();
});

test('renders service div', () => {
  render(<App {...props} />);
  const serviceDiv = screen.getByTestId('service');
  expect(serviceDiv).toBeInTheDocument();
});

describe('App', () => {
  it('calls componentDidMount ', () => {
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    shallow(<App {...props} />);

    expect(spy).toHaveBeenCalled();
  });

  it('calls callSearch when Submit is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'callSearch');
    const wrapper = shallow(<App {...props} />);

    expect(spy).not.toHaveBeenCalled();

    wrapper.find('#submitBtn').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
