import { Avatar, Container, CssBaseline, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetMovieTheater } from '../redux/actions/FilmAction';
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    footer: {
        backgroundColor: theme.palette.background.red,
        padding: theme.spacing(6),
    },
    ul: {
        listStyle: "none",
        padding: theme.spacing(3),
        textAlign: "center"
    },
}));
export default function Footer() {
    const arrMovieTheater = useSelector(state => state.FilmReducer.movieTheater);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(await GetMovieTheater());
    }, []);

    // console.log('arr rap=>', arrMovieTheater);
    const classes = useStyles();
    const renderMovieTheater = () => {
        return arrMovieTheater.map((item, key) => {
            return <Grid item xs={2} sm={2} md={2} key={key}>
                <Avatar alt={item.tenHeThongRap} src={item.logo} className={classes.large} />
            </Grid>

        })
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <footer className={classes.footer}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <h3 className="text-center"><a href="./home"><img src="./image/logo-movie.png" style={{ width: "50px" }}></img></a></h3>
                            <div className="company-use row">
                                <div className="col-6">
                                    <ul className={classes.ul}>
                                        <li><a>FAQ</a></li>
                                        <li><a>Brand Guidelines</a></li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className={classes.ul}>
                                        <li><a>Thỏa thuận sử dụng</a></li>
                                        <li><a>Chính sách bảo mật</a></li>
                                    </ul>
                                </div>


                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={6} md={4} className={classes.root}>
                            {renderMovieTheater()}
                        </Grid>
                        <Grid container item xs={12} sm={6} md={4} >
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="h5" className={classes.title}>
                                    Ứng dụng điện thoại
                                </Typography>

                                <Grid container item xs={12} className={classes.root}>
                                    <AppleIcon alt="Apple" className={classes.small} />
                                    <AndroidIcon alt="Android" className={classes.small} />
                                </Grid>

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <Grid>
                                    <Typography variant="h5" className={classes.title}>
                                        Mạng xã hội
                                    </Typography>
                                    <Grid container item xs={12} className={classes.root}>
                                        <FacebookIcon alt="Facebook" className={classes.small} color='primary' />
                                        <LinkedInIcon alt="LinkedIn" className={classes.small} color='primary' />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </React.Fragment>

    )
}
