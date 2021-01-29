import { CardMedia, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Gif } from '@material-ui/icons';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BookingAction, GetInforBookingRoomAction } from '../../redux/actions/FilmAction';
import { BOOKING } from '../../redux/const/FilmConst';
import { USER_LOGIN } from '../../Util/Config';

const useStyles = makeStyles(() => ({
    title: {
        textAlign: 'center',
    },
    cardMedia: {
        width: "100%",
    }
}))
export default function Booking(props) {
    const classes = useStyles();
    const { inforBookingRoom, arrayBooking } = useSelector(
        (state) => state.FilmReducer
    );

    const dispatch = useDispatch();

    useEffect(async () => {
        let maLichChieu = props.match.params.id;
        dispatch(await GetInforBookingRoomAction(maLichChieu));
    }, []);


    return (
        <Container>
            <Paper>
                <Typography component="h2" variant="h3" className={classes.title}>
                    Phong vé
                </Typography>
                <Grid container xs={12}>
                    <Grid item xs={12}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://tix.vn/app/assets/img/icons/screen.png"
                            title="Screen"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        {inforBookingRoom.danhSachGhe?.map((ghe, index) => {
                            let classVipSeat = ghe.loaiGhe === "Vip" ? "vip-seat" : "";
                            let classBookedSeat = ghe.daDat ? "booked-seat" : "";
                            let content = ghe.daDat ? "X" : ghe.stt;
                            let disabled = ghe.daDat ? "disabled" : "";
                            // render booking seat
                            let indexBookingSeat = arrayBooking.findIndex(
                                (bookingSeat) => ghe.maGhe === bookingSeat.maGhe
                            );
                            let classBookingSeat =
                                indexBookingSeat !== -1 ? "booking-seat" : "";
                            return (
                                <Fragment key={index}>
                                    <button
                                        onClick={() => {
                                            dispatch({
                                                type: BOOKING,
                                                bookingSeat: {
                                                    maGhe: ghe.maGhe,
                                                    stt: ghe.stt,
                                                    giaVe: ghe.giaVe,
                                                },
                                            });
                                        }}
                                        disabled={disabled}
                                        className={`seat ${classVipSeat} ${classBookedSeat} ${classBookingSeat}`}
                                    >
                                        {content}
                                    </button>
                                    {(index + 1) % 16 === 0 ? <br /> : ""}
                                </Fragment>
                            );
                        })}
                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            Đơn giá:
                            {arrayBooking.reduce((tongTien, gheDangDat, index) => {
                            return (tongTien += gheDangDat.giaVe);
                        }, 0)
                                .toLocaleString() + " Đồng"}
                        </div>
                        <hr />
                        {/* <div className="cinema-rs-img">
                            <img src={thongTinPhongVe.thongTinPhim?.hinhAnh} alt={thongTinPhongVe.thongTinPhim?.hinhAnh}/>
                        </div> */}
                        <h1>{inforBookingRoom.thongTinPhim?.tenPhim}</h1>
                        <p>
                            {inforBookingRoom.thongTinPhim?.tenCumRap} -{" "}
                            {inforBookingRoom.thongTinPhim?.tenRap}
                        </p>
                        <p>
                            {inforBookingRoom.thongTinPhim?.ngayChieu} -{" "}
                            {inforBookingRoom.thongTinPhim?.gioChieu}
                        </p>
                        <hr />
                        <div>
                            Ghế:
                        {arrayBooking.map((gheDangDat, index) => {
                            return (
                                <span key={index} style={{ marginRight: "3px" }}>
                                    {" "}
                                    {gheDangDat.stt}{" "}
                                </span>
                            );
                        })}
                        </div>
                        <hr />
                        <button
                            className="btn-white"
                            onClick={async () => {
                                if (localStorage.getItem(USER_LOGIN)) {
                                    // get userlogin from local storage
                                    let usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
                                    let objDatVe = {
                                        maLichChieu: props.match.params.id,
                                        danhSachVe: arrayBooking,
                                        taiKhoanNguoiDung: usLogin.taiKhoan,
                                    };
                                    console.log(usLogin);
                                    dispatch(await BookingAction(objDatVe));
                                } else {
                                    props.history.push("/login");
                                }
                            }}
                        >
                            ĐẶT VÉ
                        </button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
