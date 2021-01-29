
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogoutAction } from '../redux/actions/UserActions';
import { USER_LOGIN } from '../Util/Config';

export default function Header() {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.UserReducer.userLogin);
    let user = localStorage.getItem(USER_LOGIN);
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
    // console.log('user =>' + user);
    const renderButtonLogin = () => {
        if (user !== '' && user !== null) {
            return <div className="my-1 my-lg-0">
                <NavLink className="btn btn-outline-primary my-1 my-sm-0 mr-1 btn-red" to="/infor">Xin chào!  {user.taiKhoan}</NavLink>
                <button className="btn btn-outline-success my-1 my-sm-0 btn-white" onClick={() => { logOut() }}>Đăng xuất</button>
            </div>
        } else {
            return <div className="my-1 my-lg-0">
                <NavLink className="btn btn-outline-success my-1 my-sm-0 mr-1 btn-red" to="/login">Đăng nhập</NavLink>
                <NavLink className="btn btn-outline-success my-1 my-sm-0 btn-white" to="/register">Đăng ký</NavLink>
            </div>
        }
    }
    const renderAdmin = () => {
        if (user !== null && user.maLoaiNguoiDung === "QuanTri") {
            return <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Go to admin</NavLink>
            </li>
        } else {
            return "";
        }
    }
    const logOut = async (e) => {
        dispatch(await LogoutAction());
    }
    window.addEventListener("scroll", () => {
        let nav = document.querySelector("nav");
        if (nav) {
            nav.classList.toggle("sticky", window.scrollY > 0);
        }
        if (window.innerWidth < 960) {
            nav.classList.remove("sticky");
        }
    });
    return (

        <nav className="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between" style={{ height: '5vh' }}>

            <NavLink className="navbar-brand" to="/" style={{ width: "35px" }}><img src="./image/logo-movie.png" style={{ width: "100%" }}></img></NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav m-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <NavLink className="nav-link" activeStyle={{ color: "orange" }} to="/home">Trang chủ</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Giới thiệu</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Liên hệ</NavLink>
                    </li>
                    {renderAdmin()}
                </ul>
                {/* <div className="my-1 my-lg-0">
        <NavLink className="btn btn-outline-success my-1 my-sm-0 mr-1 btn-red" to="/login">Login</NavLink>
        <NavLink className="btn btn-outline-success my-1 my-sm-0 btn-white" to="/register">Register</NavLink>
    </div> */}
                {renderButtonLogin()}
            </div>

        </nav>


    )
}
