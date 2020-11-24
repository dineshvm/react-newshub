import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import NewsCard from './newscard';
import { SpinnerContext } from './../context/SpinnerContext';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    appContainer: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        position: 'relative',
        marginTop: '65px'
    },
    noRecords: {
        alignItems: 'center',
        paddingTop: '3em'
    }
}));

export default function MainContent(props) {
    const classes = useStyles();
    const { setSpinner } = useContext(SpinnerContext);
    const { appState } = props;
    const [list, setList] = React.useState([]);

    useEffect(() => {
        fetchNewsArticles();
    }, [appState]);

    const fetchNewsArticles = () => {
        setSpinner(true);
        let tempObj = {
            searchStr: appState.searchText,
            category: appState.category
        }
        let tempParams = new URLSearchParams(tempObj);
        let url = `getNewsArticles?${tempParams.toString()}`

        /* axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setList(res.data || []);
            setSpinner(false);
        }).catch((err) => {
            setSpinner(false);
            console.log(err);
        }) */
        setTimeout(() => {
            setSpinner(false);
        }, 5000);
    }

    return (
        <Grid container className={classes.appContainer}>
            <Grid item xs={12} className={classes.articleContainer}>
                {
                    list && list.length > 0 ? list.map((article, index) => {
                        return <NewsCard key={`newscard-${index}`} article={article} />
                    }) : <Typography className={classes.noRecords} variant="body1" gutterBottom> No data found</Typography>
                }
            </Grid>
        </Grid>
    )
}