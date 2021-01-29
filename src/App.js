
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Pages/UserPages/Home';


import { HomeTemplate } from './Templates/HomeTemplate';
import SignInSide from './Components/Login';
import { UseTemplate } from './Templates/UseTemplate';
import Register from './Components/Register';
import FilmDetail from './Components/FilmDetail';
import Contact from './Components/Contact';
import Booking from './Components/Booking/Booking';
import UserInfor from './Components/Users/UserInfor';
// import ThemSuaPhim from "./Pages/AdminPages/QLphim/ThemSuaPhim";
import QuanLyPhim from "./Pages/AdminPages/QLphim/QuanLyPhim";
import QuanLyNguoiDung from "./Pages/AdminPages/QLnguoi/QuanLyNguoiDung";
import { AdminTemplate } from './Templates/AdminTemplate';



function App() {
  return (
    <Switch>
      <AdminTemplate exact path="/admin/quanlyphim" Component={QuanLyPhim} />
      <AdminTemplate
        exact
        path="/admin/quanlynguoidung"
        Component={QuanLyNguoiDung}
      />
      <HomeTemplate exact path="/" Component={Home}></HomeTemplate>
      <HomeTemplate exact path="/home" Component={Home}></HomeTemplate>
      <HomeTemplate exact path="/contact" Component={Contact}></HomeTemplate>
      <HomeTemplate
        exact
        path="/detail/:id"
        Component={FilmDetail}
      ></HomeTemplate>
      <HomeTemplate
        exact
        path="/booking/:id"
        Component={Booking}
      ></HomeTemplate>
      <UseTemplate exact path="/login" Component={SignInSide}></UseTemplate>
      <UseTemplate exact path="/register" Component={Register}></UseTemplate>
      <UseTemplate exact path="/infor" Component={UserInfor}></UseTemplate>
    </Switch>
  );
}

export default App;
