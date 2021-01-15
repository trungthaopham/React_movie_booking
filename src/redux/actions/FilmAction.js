import Axios from "axios";
import Swal from "sweetalert2";
import { ACCESSTOKEN, DOMAIN } from "../../Util/Config";
import { GET_ARRAY_MOVIE, GET_DETAIL_MOVIE, GET_INFOR_CALENDAR_THEATER_MOVIE, GET_INFOR_TICKET_ROOM, GET_MOVIE_THEATER } from "../const/FilmConst";

// action dispatch
export const GetArrayMovieAPI = (dataPhim) => {
    return {
        type: GET_ARRAY_MOVIE,
        GetArrayMovie: dataPhim
    }
}
///
export const GetMovieTheater = async () => {
    return async (dispatch) => {
        const promise = Axios({
            url: DOMAIN + "/api/QuanLyRap/LayThongTinHeThongRap",
            method: "GET",
        })
        promise.then(result => {
            dispatch({
                type: GET_MOVIE_THEATER,
                GetMovieTheater: result.data
            });
            // console.log("GET Movie theater=>", result)
        }
        )
    };
};

export const GetArrayMovie = async (manhom) => {
    return async (dispatch) => {
        try {
            const { data, status } = await Axios({
                url: DOMAIN + `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${manhom}`,
                method: "GET",
            });
            if (status === 200) {
                dispatch(GetArrayMovieAPI(data));
            }
        } catch (err) {
            console.log(err);
        }
    };
}
export const GetDetailMovie = async (maphim) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: DOMAIN + `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maphim}`,
                method: 'GET'
            })
            // sau khi lấy data chi tiet phim dispatch len reducer gia trị về cap naht cho chi tiet
            console.log(result.data)
            dispatch({
                type: GET_DETAIL_MOVIE,
                GetDetailMovie: result.data
            })

        } catch (err) {
            console.log(err);
        }
    }
}

export const GetInforCalendarTheaterMovie = async (maHeThongRap, maNhom) => {
    return async (dispatch) => {
        try {
            const { data, status } = await Axios({
                url: DOMAIN + `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`,
                method: "GET",
            });
            if (status === 200) {
                dispatch({
                    type: GET_INFOR_CALENDAR_THEATER_MOVIE,
                    GetInforCalendarTheaterMovie: data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const GetInforBookingRoomAction = async (maLichChieu) => {
    return async (dispatch) => {
        try {
            const { data, status } = await Axios({
                url: DOMAIN + `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
                method: "GET",
            });
            console.log("dataThongTinPhongVe", data);
            if (status === 200) {
                dispatch({
                    type: GET_INFOR_TICKET_ROOM,
                    inforBookingRoom: data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const BookingAction = async (thongTinVe) => {
    return async (dispatch) => {
        try {
            const { data, status } = await Axios({
                url: DOMAIN + "/api/QuanLyDatVe/DatVe",
                method: "POST",
                data: thongTinVe,
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem(ACCESSTOKEN),
                },
            });
            // reload danhSachGhe
            dispatch(await GetInforBookingRoomAction(thongTinVe.maLichChieu));
            dispatch({ type: "DAT_VE_THANH_CONG" })
            Swal.fire("Thông báo", "Đặt vé thành công!", "success");
            console.log(data);
        } catch (err) {
            console.log(err);
            Swal.fire("Thông báo", "Đặt vé thất bại!", "error");
        }
    };
};