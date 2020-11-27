import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import NewsCard from './newscard';
import { SpinnerContext } from './../context/SpinnerContext';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    appContainer: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - 250px)`,
            marginLeft: 250,
        },
        position: 'relative',
        marginTop: '65px'
    },
    noRecords: {
        alignItems: 'center',
        paddingTop: '3em'
    }
}));

/**
 * Fetches the news content through axios http get method.
 * @param  {object} props component props
 * @param  {object} props.appState state which consist of search value and category
 */

function MainContent(props) {
    const classes = useStyles();
    const { setSpinner } = useContext(SpinnerContext);
    const { appState } = props;
    const [list, setList] = React.useState([]);

    useEffect(() => {
        const fetchNewsArticles = () => {
            setSpinner(true);
            let tempObj = {
                searchStr: appState.searchText,
                category: appState.category
            }
            let tempParams = new URLSearchParams(tempObj);
            let url = `getNewsArticles?${tempParams.toString()}`

            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setList(res.data || []);
                setSpinner(false);
            }).catch((err) => {
                setSpinner(false);
                console.log(err);
            });
        }
        fetchNewsArticles();
    }, [appState]);



    return (
        <Grid container className={classes.appContainer} data-testid="maincontainer">
            <Grid item xs={12} className={classes.articleContainer}>
                {
                    list && list.length > 0 ? list.map((article, index) => {
                        return <NewsCard key={`newscard-${index}`} article={article} />
                    }) : <Typography data-testid="norecords" className={classes.noRecords} variant="body1" gutterBottom> No data found</Typography>
                }
            </Grid>
        </Grid>
    )
}

MainContent.propTypes = {
    appState: PropTypes.object
}

export default MainContent