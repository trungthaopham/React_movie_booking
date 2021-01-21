import Axios from "axios"
import { ACCESSTOKEN, DOMAIN, USER_LOGIN } from "../../Util/Config"
import {
  LOGIN,
  GET_INFOR_USER,
  GET_LIST_USER,
  LOGOUT,
  REGISTER,
} from "../const/UseConst";
import { history } from "../../Util/History";
import swal from "sweetalert2";
import { Modal } from "antd";

export const LoginAction = async (userLogin) => {
    return async (dispatch) => {
        const promise = Axios({
            url: DOMAIN + "/api/QuanLyNguoiDung/DangNhap",
            method: "POST",
            data: userLogin
        });
        promise.then(result => {
            console.log(result.data.maLoaiNguoiDung);
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
            dispatch({
                type: LOGIN,
                userLogin: userLogin,
            });
            swal.fire("Thông báo", "Đăng nhập thành công! <br/> Hi!!" + result.data.taiKhoan, "success");
            if (result.data.maLoaiNguoiDung === "QuanTri") {
                history.push("/admin/quanlyphim");
            } else {
                history.push("/");
            }
        }).catch(error => {
            swal.fire("Thông báo", 'Đăng nhập thành bại! <br/>' + error.response.data, "error");
        }
        )
    }
}
export const LogoutAction = async () => {
    return async (dispatch) => {

        localStorage.removeItem("USER_LOGIN");
        localStorage.removeItem("ACCESSTOKEN");
        dispatch({
            type: LOGOUT,
        });
        swal.fire("Thông báo", "Đăng xuất thành công! <br/>", "success"); history.push("/");
    }
}
export const GetInforAction = async (taiKhoan) => {
    return async (dispatch) => {
        try {
            let { data, status } = await Axios({
                url: DOMAIN + "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
                method: "POST",
                data: taiKhoan,
            });
            dispatch({
                type: GET_INFOR_USER,
                thongTinUser: data,
            });
        } catch (err) {
            swal.fire("Thông báo", "Lấy thông tin không thành công", "error");
        }
    };
};

export const RegisterAction = async (register) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: DOMAIN + "/api/quanlynguoidung/dangky",
                method: "POST",
                data: register,
            });
            console.log("resultdata => ", result.data);
            swal.fire("Thông báo", "Đăng kí thành công!", "success");
            dispatch({
                type: REGISTER,
                userLogin: result.data,
            });
            console.log("register => ", result.data);
            history.push("/");
        } catch (err) {
            swal.fire("Thông báo", "Đăng kí thất bại!", "error");
            console.log(err);
        }
    };
};

///////////////////////////////////////////////////////////////////////////
//> > > > > > > > > > LẤY DANH SÁCH NGƯỜI DÙNG_ACTION < < < < < < < <
export const layDanhSachNguoiDungApiAction = async () => {
    return async (dispatch) => {
      //action này trả về hàm có tham số dispatch
      try {
        let result = await Axios({
          url:
            "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP05",
          method: "GET",
        });
        dispatch({
          type: GET_LIST_USER,
          listUser: result.data,
        });
        console.log("danh sach nguoi dung action", result.data);
      } catch (err) {
        console.log(err);
      }
    };
  };
  
//> > > > > > > > > > > > > > > > XÓA  NGƯỜI DÙNG_ACTION < < < < < < < < < < < < < <
export const XoaNguoiDungApiAction = async (taiKhoan) => {
    return async (dispatch) => {
      try {
        const { data, status } = await Axios({
          url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem(ACCESSTOKEN),
          },
        });
        console.log("data thong tin tai khoan", data);
        if (status === 200) {
          dispatch(await layDanhSachNguoiDungApiAction());
          Modal.success({
            title: data,
          });
        }
      } catch (err) {
        console.log("lỗi khi xóa: ", err.response);
    
        Modal.error({
          title: "Error " + err.response.status + " : " + err.response.statusText,
          content: err.response.data,
        });
      }
    };
    };