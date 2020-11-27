import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import axios from 'axios'
import MainContent from './../maincontent';
import { SpinnerContext } from '../../context/SpinnerContext';

const sample_data = [{
    "title": "Treasury yields fall after Mnuchin pulls plug on Fed lending power - CNBC",
    "source": "CNBC",
    "description": "U.S. Treasury yields declined on Friday after Treasury Secretary Steven Mnuchin decided to let several of the Fed's emergency funding programs expire.",
    "author": "Vicky McKeever",
    "newsurl": "https://www.cnbc.com/2020/11/20/us-bonds-treasury-yields-move-as-mnuchin-pulls-fed-lending.html",
    "imageurl": "https://image.cnbcfm.com/api/v1/image/106715895-16009580842020-09-22t152608z_284964580_rc2r3j9d3lw8_rtrmadp_0_health-coronavirus-usa-fed.jpeg?v=1600958115",
    "publishedAt": "2020-11-20T08:57:00Z"
}]

jest.mock('axios', () => {
    return {
        get: jest.fn()
    }
})

afterEach(cleanup);

describe('Testing Main Content Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders main content', async () => {
        const getSpy = jest.spyOn(axios, 'get');
        const appState = {
            category: 'general',
            searchText: ''
        }

        await act(async () => {
            axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));
            render(<SpinnerContext.Provider value={{ setSpinner: jest.fn() }}>
                <MainContent appState={appState} />
            </SpinnerContext.Provider>)
        });

        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('norecords')).toBeInTheDocument();
    });

    test('test with data', async () => {
        const appState = {
            category: 'general',
            searchText: ''
        }

        await act(async () => {
            axios.get.mockImplementationOnce(() => Promise.resolve({ data: sample_data }))
            render(
                <SpinnerContext.Provider value={{ setSpinner: jest.fn() }}>
                    <MainContent appState={appState} />
                </SpinnerContext.Provider>
            );
        });

        expect(screen.getByText('CNBC')).toBeInTheDocument();
    });

});