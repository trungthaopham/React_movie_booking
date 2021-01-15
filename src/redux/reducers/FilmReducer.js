import { BOOKING, GET_ARRAY_MOVIE, GET_DETAIL_MOVIE, GET_INFOR_CALENDAR_THEATER_MOVIE, GET_INFOR_TICKET_ROOM, GET_MOVIE_THEATER } from "../const/FilmConst"

const stateDefault = {
    movieTheater: [],
    arrFilm: [],
    FilmDetail: {},
    showtimes: [],
    inforBookingRoom: {},
    arrayBooking: [
        // { maGhe: 52361, stt: "01", giaVe: 75000 },
    ]
}
export const FilmReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_MOVIE_THEATER:
            state.movieTheater = action.GetMovieTheater
        case GET_ARRAY_MOVIE: {
            state.arrFilm = action.GetArrayMovie;
            return { ...state };
        }
        case GET_DETAIL_MOVIE: {
            state.FilmDetail = action.GetDetailMovie;
            return { ...state };
        }
        case GET_INFOR_CALENDAR_THEATER_MOVIE: {
            state.showtimes = action.GetInforCalendarTheaterMovie;
            return { ...state };
        }
        case GET_INFOR_TICKET_ROOM: {
            state.inforBookingRoom = action.inforBookingRoom;
            return { ...state };
        }
        case BOOKING: {
            let mangGheDangDat = [...state.arrayBooking];
            let index = mangGheDangDat.findIndex(
                (gheDangDat) => gheDangDat.maGhe === action.bookingSeat.maGhe
            );
            if (index !== -1) {
                mangGheDangDat.splice(index, 1);
            } else {
                mangGheDangDat.push(action.bookingSeat);
            }
            return { ...state, arrayBooking: mangGheDangDat };
        }
        case "DAT_VE_THANH_CONG": {
            return { ...state, danhSachGheDangDat: [] };
        }
        default:
            return { ...state }
    }
} 