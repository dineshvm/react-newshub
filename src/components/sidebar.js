import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublicIcon from '@material-ui/icons/Public';
import { makeStyles } from '@material-ui/core/styles';
import { NEWS_CATEGORIES } from '../util/constants';
import clsx from 'clsx';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    sidebarRoot: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '65px'
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
            marginTop: '65px'
        },
    },
    drawerPaper: {
        width: drawerWidth,
        top: 'auto'
    },
    categoryList: {
        paddingLeft: '8px',
    },
    listItem: {
        fontSize: '1em',
        '& .icon': {
            minWidth: '32px'
        }
    },
    selectedItem: {
        color: '#3f51b5 !important',
        '&:focus , &:hover , & .selectedIcon': {
            color: '#3f51b5 !important'
        }
    }

}));

/**
 * Sidebar of the application
 * @param  {object} props component props
 * @param  {object} props.appState consist of selected category name
 * @param  {boolean} props.mobileOpen state of the sidebar for mobile view
 */
function Sidebar(props) {
    const { appState, menuOpen } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    useEffect(() => {
        setMobileOpen(menuOpen);
    }, [menuOpen]);

    const handleDrawerToggle = () => {
        props.onToggle(!mobileOpen);
    };

    const handleCategoryChange = (val) => {
        props.onToggle(false);
        props.onCategoryChange(val)
    };

    const drawer = (
        <>
            <List data-testid="appcategorylist" className={classes.categoryList}>
                {
                    NEWS_CATEGORIES.map((item) => (
                        <ListItem button data-testid="sidebarlistitem"
                            key={item.key}
                            onClick={() => handleCategoryChange(item.key)}
                            className={clsx(classes.listItem, item.key === appState.category && classes.selectedItem)}
                        >
                            <ListItemIcon className='icon selectedIcon'> {item.icon ? item.icon : <PublicIcon />}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))
                }
            </List>
        </>
    );


    return (
        <div className={classes.sidebarRoot}>
            <nav className={classes.drawer} aria-label="news categories">
                <Hidden smUp implementation="css">
                    <Drawer
                        data-testid="mobilesidebar"
                        container={window && window.document.body}
                        variant="temporary"
                        anchor='left'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant='permanent'
                        anchor='left'
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

Sidebar.propTypes = {
    appState: PropTypes.object,
    onToggle: PropTypes.func,
    onSearch: PropTypes.func
}

export default Sidebar;
