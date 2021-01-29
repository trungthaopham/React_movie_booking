import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardMedia, Container, Typography } from '@material-ui/core';
import { GetDetailMovie } from '../redux/actions/FilmAction';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
    },
    tab: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // height: 300,
    },
    tabb: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 300,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    image: {
        width: '100%',
        height: "100%",
        padding: theme.spacing(3),
        '@media (min-width:600px)': {
            width: '60%',
            height: "100%",
        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
            height: "100%",
        },
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
        paddingBottom: theme.spacing(4)
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: '1rem',
        '@media (min-width:600px)': {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
    },
    boxright: {
        paddingRight: "20px !important"
    },

    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: "100%"
    },

}));
//tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
//
export default function FilmDetail(props) {
    const classes = useStyles();
    const filmDetail = useSelector(state => state.FilmReducer.FilmDetail);
    // console.log(filmDetail);
    const dispatch = useDispatch();
    useEffect(async () => {
        // lay tham so url
        let id = props.match.params.id;
        // console.log(maPhim);
        // goi act API từ redux
        dispatch(await GetDetailMovie(id));
    }, [])
    const day = moment(filmDetail.ngayKhoiChieu).format('LLL');

    //tab
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const arrMovieTheater = filmDetail.heThongRapChieu
    // console.log(filmDetail, "chi tiet phim")
    return (
        <div className={classes.root} >
            <Container maxWidth="lg">
                <Paper>
                    <Grid container spacing={3} >
                        <Grid container item xs={5} justify="center">
                            <CardMedia className={classes.image}
                                component="img"
                                alt="Contemplative Reptile"
                                height="100%"
                                image={filmDetail.hinhAnh}
                                title="Contemplative Reptile"
                            />
                        </Grid>
                        <Grid item xs={7} className={classes.boxright}>
                            <Typography component="h1" variant="h2"
                                className={classes.title}>
                                {filmDetail.tenPhim}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <p className={classes.subtitle}>Mô tả:</p> {filmDetail.moTa}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <p className={classes.subtitle}>Ngày khởi chiếu:</p>
                                {day}
                            </Typography>
                            <a href="#time-to-watch" disabled={filmDetail.maNhom == "GP07" ? "disabled" : ""} className="btn btn-outline-secondary"> Đặt vé</a>
                            <button type="button" className=" btn btn-outline-primary ml-2" data-toggle="modal" data-target="#trailer">
                                Xem trailer
                            </button>
                            <div className="modal fade" id="trailer" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <iframe className="w-100" height="600" src={filmDetail.trailer} frameborder="0" allow="" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Grid>

                    </Grid>
                </Paper>
                <Paper className="mt-4">
                    <Grid className="py-2 text-center">
                        <Typography component="h1" variant="h2"
                            className={classes.title}>
                            Lịch chiếu
                        </Typography>
                    </Grid>
                    <Grid container id="time-to-watch">
                        <Grid xs={4} className="nav flex-column nav-pills col-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                                let active = index === 0 ? 'active' : '';
                                return <a key={index} className={'nav-link ' + active} id="v-pills-home-tab" data-toggle="pill" href={`#${heThongRap.maHeThongRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true"><img className="mt-2" src={heThongRap.logo} alt={heThongRap.logo} style={{ width: 50, height: 50 }} />{heThongRap.tenHeThongRap}</a>
                            })}


                        </Grid>
                        <Grid xs={8} className="tab-content col-9" id="v-pills-tabContent">
                            {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                                let active = index === 0 ? 'active' : '';
                                return <div key={index} className={'tab-pane fade show ' + active} id={heThongRap.maHeThongRap} role="tabpanel" aria-labelledby="v-pills-home-tab">{heThongRap.cumRapChieu?.map((cumRap, index) => {
                                    return <div key={index}>
                                        <p className={classes.title}>{cumRap.tenCumRap}</p>
                                        <div className="row">
                                            {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                return <Button key={index} variant="outlined" color="primary" className="m-1" href={'/booking/' + lichChieu.maLichChieu}>
                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                </Button>
                                            })}
                                        </div>
                                    </div>
                                })}</div>
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
