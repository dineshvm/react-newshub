import { fireEvent, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from './../header';

afterEach(cleanup);

describe('Testing Header Component', () => {
    test('renders header', () => {
        const appState = {
            searchText: ''
        }
        const { queryByTestId } = render(<Header appState={appState} />);
        const headEl = queryByTestId('appheader');
        expect(headEl).toBeInTheDocument();
    });

    test('renders searchbar', () => {
        const appState = {
            searchText: 'test'
        }
        const { queryByTestId, getByPlaceholderText } = render(<Header appState={appState} />);
        const searchEl = queryByTestId('appsearch');
        expect(searchEl).toBeInTheDocument();
        const inputEl = getByPlaceholderText('Search News');
        expect(inputEl.value).toBe('test')
    });

    test('test change event in search input', () => {
        const appState = {
            searchText: ''
        }
        const text = 'react';
        const { getByPlaceholderText } = render(<Header appState={appState} />);
        const inputEl = getByPlaceholderText('Search News');
        expect(inputEl.value).toBe('')
        fireEvent.change(inputEl, { target: { value: text } });
        expect(inputEl.value).toBe('react')
    });

    test('test keypress event in search input', () => {
        const appState = {
            searchText: ''
        }
        const text = 'react';
        const onKeyPressFn = jest.fn();
        const { getByPlaceholderText } = render(<Header appState={appState} onSearch={onKeyPressFn} />);
        const inputEl = getByPlaceholderText('Search News');
        fireEvent.keyUp(inputEl, { keyCode: 13, target: { value: text } });
        expect(onKeyPressFn).toHaveBeenCalledTimes(1);
        expect(inputEl.value).toBe('react')
    });

    test('testing toggle click ', () => {
        const appState = {
            searchText: ''
        }
        const onToggleClick = jest.fn();
        const { queryByTestId } = render(<Header appState={appState} onToggle={onToggleClick} />);
        const toggleEl = queryByTestId('apptoggle');

        fireEvent.click(toggleEl);
        expect(onToggleClick).toHaveBeenCalledTimes(1);
    });
});
