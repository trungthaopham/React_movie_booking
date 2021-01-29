import Carousel from '../../Components/Carousel';
import GroupRap from '../../Components/GroupRap';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, makeStyles, Tab, Tabs, Typography, Box, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GetArrayMovie } from '../../redux/actions/FilmAction';
import SwiperCore2, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper'
import Magazine from '../../Components/Magazine';
import BackApp from '../../Components/BackApp';
import AOS from "aos";
import "aos/dist/aos.css";

SwiperCore2.use([Navigation, Pagination, Autoplay, EffectFade])

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    section: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),

    },
    root: {
        maxWidth: '100%',
        height: "100%",
    },
    tabs: {
        flexGrow: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: '60%',
        // paddingTop: '60%',
    },
    cardContent: {
        flexGrow: 1,
        height: "30%",
        overflow: 'hidden'
    },
    link: {
        textDecoration: "none"
    },
    phim: {
        height: "100%",
    }

}));
export default function Home(props) {
    const [idGroup, setIdGroup] = useState("GP05");
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        AOS.init({ duration: 1500 });
        // AOS.refresh();
    }, []);
    const arrayMovie = useSelector(state => state.FilmReducer.arrFilm);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(await GetArrayMovie(idGroup));
    }, [idGroup]);
    console.log("array movie =>", arrayMovie);


    const renderItem = () => {
        return arrayMovie?.map((phim, idd) => (

            <SwiperSlide key={idd} style={{ height: 'calc((100% - 20px) / 2)' }}>
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
                    <Card className={classes.phim}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={phim.hinhAnh}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {phim.tenPhim}
                            </Typography>
                            <Typography className="subContent_card">
                                {phim.moTa}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="outlined" color="primary" href={'/detail/' + phim.maPhim} className="btn-ounline">
                                Xem chi tiết
                            </Button>

                            <Button size="small" disabled={phim.maNhom == "GP07" ? "disabled" : ""} variant="outlined" color="secondary" href={'/booking/' + phim.maPhim} className="btn-ounline">
                                Đặt vé
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </SwiperSlide>
        ))
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Carousel></Carousel>
            <Container maxWidth="lg" className={classes.section} style={{ position: 'relative' }} data-aos="fade-down">
                <div className={classes.tabs}>
                    <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            className="nav-tabs"
                        >
                            <Tab label="Phim đang chiếu" {...a11yProps(0)}
                                onClick={() => {
                                    setIdGroup('GP01');
                                }}
                            />
                            <Tab label="Phim sắp chiếu" {...a11yProps(1)}
                                onClick={() => {
                                    setIdGroup('GP07');
                                }}
                            />
                        </Tabs>
                    </AppBar>
                    <Paper className="mt-2">
                        <TabPanel value={value} index={0}>
                            <Typography variant="h4" component="h2" className="title pb-3" >
                                Phim Đang Chiếu
                        </Typography>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={4}
                                slidesPerColumn={2}
                                autoplay={true}
                                navigation={{ clickable: true }}
                                breakpoints={
                                    {
                                        // when window width is >= 320px
                                        320: {
                                            slidesPerView: 1,
                                            slidesPerColumn: 2,
                                            spaceBetween: 10
                                        },
                                        578: {
                                            slidesPerView: 2,
                                            slidesPerColumn: 2,
                                            spaceBetween: 10
                                        },
                                        // when window width is >= 640px
                                        640: {
                                            slidesPerView: 3,
                                            slidesPerColumn: 2,
                                            spaceBetween: 20
                                        },
                                        950: {
                                            slidesPerView: 4,
                                            slidesPerColumn: 2,
                                            spaceBetween: 20
                                        },
                                    }}
                                // pagination={{ clickable: true }}
                                className='carousel_home_movie'
                            >
                                {renderItem()}
                            </Swiper>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Typography variant="h4" component="h2" className="title py-4" >
                                Phim sắp khởi chiếu
                        </Typography>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={4}
                                slidesPerColumn={2}
                                autoplay={true}
                                navigation={{ clickable: true }}
                                // pagination={{ clickable: true }}
                                breakpoints={
                                    {
                                        // when window width is >= 320px
                                        320: {
                                            slidesPerView: 1,
                                            slidesPerColumn: 2,
                                            spaceBetween: 10
                                        },
                                        578: {
                                            slidesPerView: 2,
                                            slidesPerColumn: 2,
                                            spaceBetween: 10
                                        },

                                        // when window width is >= 640px
                                        640: {
                                            slidesPerView: 3,
                                            slidesPerColumn: 2,
                                            spaceBetween: 20
                                        },
                                        950: {
                                            slidesPerView: 4,
                                            slidesPerColumn: 2,
                                            spaceBetween: 20
                                        },
                                    }}
                                className='carousel_home_movie'
                            >
                                {renderItem()}
                            </Swiper>
                        </TabPanel>
                    </Paper>
                </div>


            </Container>
            <Container maxWidth="lg" data-aos="fade-left">
                <div data-aos="fade-right">
                    <GroupRap></GroupRap>
                </div>
                <div data-aos="fade-left">
                    <Magazine ></Magazine>
                </div>
            </Container>
            <div data-aos="fade-down">
                <BackApp></BackApp>
            </div>
        </React.Fragment>
    )

}

