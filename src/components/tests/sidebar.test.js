import { cleanup, fireEvent, render, } from '@testing-library/react';

import Sidebar from './../sidebar';

afterEach(cleanup);

describe('Testing Sidebar Component', () => {
    test('renders sidebar', () => {
        const appState = {
            category: 'general'
        }
        const { container } = render(<Sidebar appState={appState} />);
        const sidebarEl = container.querySelector('[data-testid="appcategorylist"');
        expect(sidebarEl).toBeInTheDocument();
    });

    test('test sidebar menu toggle', () => {
        const appState = {
            category: 'general'
        }
        const open = true;
        const { queryByTestId } = render(<Sidebar appState={appState} mobileOpen={open} />);

        expect(queryByTestId('mobilesidebar')).toBeInTheDocument();
    });

    test('testing llist item click ', () => {
        const appState = {
            searchText: ''
        }
        const onToggleClick = jest.fn();
        const onCategoryChange = jest.fn();
        const { queryAllByTestId } = render(<Sidebar appState={appState} mobileOpen={true} onToggle={onToggleClick} onCategoryChange={onCategoryChange} />);
        const listEl = queryAllByTestId('sidebarlistitem')[0];
        fireEvent.click(listEl);
        expect(onToggleClick).toHaveBeenCalledTimes(1);
    });

});