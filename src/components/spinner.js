import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpinnerContext } from './../context/SpinnerContext';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    loaderContainer: {
        position: 'fixed',
        opacity: 0.8,
        background: theme.palette.common.white,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function Spinner() {
    const { isSpinnerOn } = useContext(SpinnerContext);

    const classes = useStyles();

    return (
        isSpinnerOn && <div data-testid="spinner" className={classes.loaderContainer}>
            <CircularProgress color={'primary'} size={30} thickness={4} />
        </div>
    )
}
