import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetInforCalendarTheaterMovie, GetMovieTheater } from "../redux/actions/FilmAction";


export default function GroupRap(props) {
    const [id, setId] = useState("BHDStar");
    const [danhSachPhim, setDanhSachPhim] = useState([]);

    const { movieTheater, showtimes } = useSelector(
        (state) => state.FilmReducer
    );

    const dispatch = useDispatch();

    useEffect(async () => {
        dispatch(await GetMovieTheater());
    }, []);

    // console.log(showtimes);

    // console.log("danhSachPhim =>", danhSachPhim);

    const renderHeThongRap = () => {
        return movieTheater.map((rap, index) => {
            return (
                <li key={index} className="cinema-col">
                    <a
                        className="cinema-ho"
                        onClick={() => {
                            setId(rap.maHeThongRap);
                        }}
                    >
                        <img src={rap.logo} alt="logo" className="logo" />
                    </a>
                </li>
            );
        });
    };

    useEffect(async () => {
        dispatch(await GetInforCalendarTheaterMovie(id, "GP01"));
    }, [id]);

    const renderCinema = () => {
        return showtimes.map((item, index) => {
            return (
                <div className="cinema-item" key={index}>
                    {item.lstCumRap.map((cumRap, index) => {
                        return (
                            <div className="cinema-dt" key={index}>
                                <a onClick={() => setDanhSachPhim(cumRap.danhSachPhim)}>
                                    <span>{cumRap.tenCumRap}</span>
                                    <p>{cumRap.diaChi}</p>
                                </a>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    const renderMovie = () => {
        return danhSachPhim?.slice(0, 8).map((phim, index) => {
            return (
                <div className="box-movie">

                    <div key={index} className="movie-info ">
                        <img
                            src={phim.hinhAnh}
                            alt={phim.hinhAnh}
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = "https://picsum.photos/300/300";
                            }}
                        />
                        <div className="wrap-info">
                            <p>
                                <span>C18</span>
                                <Typography variant="h5" component="h4"> {phim.tenPhim}</Typography>
                            </p>
                            <p className="ngBinding">100 phút - IMDb 7.3</p>
                        </div>
                    </div>
                    <div className="movie-time">
                        <Typography variant="h6" component="h6" >2D Digital</Typography>
                        <a>
                            <button className="btn btn-outline-secondary btn-sm">15:30 ~ 17:30</button>
                        </a>
                    </div>
                </div>
            );
        });
    };

    return (
        <Paper container>
            <Typography variant="h4" component="h2" className="title py-4" >
                Lịch chiếu theo cụm rạp
            </Typography>
            <div className="cinema-block" id="cumRap">
                <div className="home-cinema">
                    <ul className="list-cinemas">{renderHeThongRap()}</ul>
                    <div className="cinema">{renderCinema()}</div>
                    <div className="wrap-movie">{renderMovie()}</div>
                </div>
            </div>
        </Paper>
    );
}
