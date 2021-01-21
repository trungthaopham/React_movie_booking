import {
  GET_LIST_USER,
  GET_INFOR_USER,
  HANDLE_CHANGE_INPUT,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../const/UseConst";



const stateDefault = {
  userLogin: {},
  inforUser: {},
  listUser: [],
  registerStateForm: {
    registerValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: "GP04",
      maLoaiNguoiDung: "KhachHang",
    },
    registerErrors: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      hoTen: "",
    },
  },
};
export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
      case LOGIN: {
        state.userLogin = action.userLogin;
        return { ...state };
      }
      case GET_INFOR_USER: {
        state.inforUser = action.thongTinUser;
        return { ...state };
      }
      case GET_LIST_USER: {
        state.listUser = action.listUser;
        return { ...state };
      }
      case LOGOUT: {
        state.userLogin = "";
        return { ...state };
      }
      case REGISTER: {
        state.userLogin = action.register;
        return { ...state };
      }
      case HANDLE_CHANGE_INPUT: {
        state.registerStateForm = { ...action.newState };
        return { ...state };
      }
      default:
        return { ...state };
    }
}