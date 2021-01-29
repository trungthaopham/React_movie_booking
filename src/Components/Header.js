
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogoutAction } from '../redux/actions/UserActions';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserReducer.userLogin);
    // console.log('user =>' + user.taiKhoan);
    const renderButtonLogin = () => {
        if (user.taiKhoan !== '' && user.taiKhoan !== undefined) {
            return <div className="my-1 my-lg-0">
                <NavLink className="btn btn-outline-primary my-1 my-sm-0 mr-1 btn-red" to="/infor">Hi!  {user.taiKhoan}</NavLink>
                <button className="btn btn-outline-success my-1 my-sm-0 btn-white" onClick={() => { logOut() }}>Logout</button>
            </div>
        } else {
            return <div className="my-1 my-lg-0">
                <NavLink className="btn btn-outline-success my-1 my-sm-0 mr-1 btn-red" to="/login">Sign in</NavLink>
                <NavLink className="btn btn-outline-success my-1 my-sm-0 btn-white" to="/register">Sign up</NavLink>
            </div>
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
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between"
        style={{ height: "5vh" }}
      >
        <NavLink className="navbar-brand" to="/">
          LOGO
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav m-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                className="nav-link"
                activeStyle={{ color: "orange" }}
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/quanlyphim">
                Go to admin
              </NavLink>
            </li>
          </ul>
          {/* <div className="my-1 my-lg-0">
        <NavLink className="btn btn-outline-success my-1 my-sm-0 mr-1 btn-red" to="/login">Login</NavLink>
        <NavLink className="btn btn-outline-success my-1 my-sm-0 btn-white" to="/register">Register</NavLink>
    </div> */}
          {renderButtonLogin()}
        </div>
      </nav>
    );
}
