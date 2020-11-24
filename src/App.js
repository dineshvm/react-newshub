import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './components/header';
import Sidebar from './components/sidebar';
import MainContent from './components/maincontent';
import Spinner from './components/spinner';
import SpinnerContextProvider from './context/SpinnerContext';


const theme = createMuiTheme({
  typography: {
    fontFamily: "'Segoe UI','Helvetica Neue',sans-serif"
  }
});

export default function App() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [appState, setAppState] = React.useState({
    searchText: '',
    category: 'general'
  })

  /**
   * @function
   * @name handleCategoryChange
   * @description To handle the category changes and updates only when the value is changed.
   * @param {string} value String Value
   * @returns {void}
   */
  const handleCategoryChange = (value) => {
    if (appState.category !== value) {
      setAppState({ ...appState, category: value })
    }
  }

  /**
   * @function
   * @name handleSearchTextChange
   * @description To handle the search input changes
   * @param {string} value String Value
   * @returns {void}
   */
  const handleSearchTextChange = (value) => {
    setAppState({ ...appState, searchText: value })
  }



  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <SpinnerContextProvider>
          <Spinner />
          <Header appState={appState} onSearch={(val) => handleSearchTextChange(val)} onToggle={(val) => setMenuOpen(val)} />
          <Sidebar appState={appState} menuOpen={menuOpen} onToggle={(val) => setMenuOpen(val)} onCategoryChange={(val) => handleCategoryChange(val)} />
          <MainContent appState={appState} />
        </SpinnerContextProvider>
      </MuiThemeProvider>
    </div>
  );
}
