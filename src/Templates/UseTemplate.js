import { CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header';
import Paper from '@material-ui/core/Paper';

export const UseTemplate = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            height: '95vh',
        },
        image: {
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const classes = useStyles();

    const { Component, ...restParams } = props;
    return <Route {...restParams} render={(...propsRouter) => {
        return (
            <Grid item xs={12} component={Paper} elevation={12} square>
                <Header></Header>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Component {...propsRouter} />
                </Grid>
            </Grid>
        )
    }}

    />
}