import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    appHeader: {
        display: 'flex',
        height: '65px',
        justifyContent: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        display: 'none',
        paddingLeft: '4px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    appSearch: {
        flexGrow: 1,
        justifyContent: 'center',
        display: 'flex'
    },
    searchRoot: {
        padding: '0px 4px',
        alignItems: 'center',
        width: 400,
        display: 'flex'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 7,
    },

}));

/**
 * Header of the application
 * @param  {object} props Component Props
 * @param  {object} props.appState State which consists for search input
 */
function Header(props) {
    const classes = useStyles();
    const [inputSearch, setInputSearch] = React.useState(props.appState.searchText);

    /**
     * @function 
     * @name handleInputChange
     * @description handle the input change event
     * @param  {object} e window change event object
     */
    const handleInputChange = (e) => {
        setInputSearch(e.target.value)
    }

    /**
     * @function 
     * @name handleKeyPress
     * @description handle the value on every keyup event
     * @param  {object} e window keyup event object
     */
    const handleKeyPress = (e) => {
        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            props.onSearch(e.target.value);
            return false;
        }
    }

    return (
        <AppBar data-testid="appheader" position="fixed" className={classes.appHeader}>
            <Toolbar>
                <IconButton data-testid="apptoggle" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.onToggle(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News Hub
                </Typography>
                <div className={classes.appSearch}>
                    <Paper className={classes.searchRoot}>
                        <InputBase
                            data-testid="appsearch"
                            value={inputSearch}
                            onChange={(e) => handleInputChange(e)}
                            onKeyUp={(e) => handleKeyPress(e)}
                            className={classes.input}
                            placeholder="Search News"
                            inputProps={{ 'aria-label': 'search news' }}
                        />
                        <IconButton className={classes.iconButton} aria-label="search" onClick={() => props.onSearch(inputSearch)}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
            </Toolbar>
        </AppBar >
    );
}

Header.propTypes = {
    appState: PropTypes.object,
    menuOpen: PropTypes.bool,
    onToggle: PropTypes.func,
    onCategoryChange: PropTypes.func
}

export default Header