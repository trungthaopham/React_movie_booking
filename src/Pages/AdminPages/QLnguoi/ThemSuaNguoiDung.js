import React from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
//import "./ThemSuaNguoiDung.css";

import moment from "moment";
export default function ThemSuaPhim(props) {
  console.log(props.hDong + " NGƯỜI DÙNG PROPS : ", props);

  // > > > > > > > > > HÀM GỌI API SỬA PHIM < < < < < < < //
  // const dispatch = useDispatch();
  // const handleSubmit = async (hDong,phim) => {
  //   const dispatch = useDispatch();
  //   hDong === "SỬA"
  //     ? dispatch(await SuaPhimApiAction(phim))
  //     : dispatch(await ThemPhimApiAction(phim));
  // };
  //--------------------------------------------------------
  const { Option } = Select;

  // > > > > > > KHAI BÁO BIẾN FORM CỦA ANTD <  < < < < < //
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
    values: props,
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
      regexp: "${label} is not a valid numbercvcvcvcvc!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  //--------------------------------------------------------
  return (
    <div>
      <Form
        {...layout}
        validateMessages={validateMessages}
        name="nest-messages"
        onFinish={(values) => {
          // xử lý dữ liệu nhập vào tử input,
          // nếu có nhập thì cho values = giá trị nhập
          // nếu không nhập thì cho values = giá trị cũ
          // let dataMoi = values.thongTinPhimMoi;
          // let dataCu = props.phim;
          // dataCu.ngayKhoiChieu = moment(props.phim.ngayKhoiChieu).format(
          //   "DD-MM-YYYY"
          // );
          // for (let key in dataMoi) {
          //   if (dataMoi[key] === undefined) {
          //     dataMoi[key] = dataCu[key];
          //   }
          // }
          // dataMoi.hinhAnh = dataMoi.hinhAnh.file.originFileObj;
          // dataMoi.hinhAnh = null;
          // dataMoi = { ...dataMoi, biDanh: "bidanh", maNhom: "GP05" };
          // console.log("data moi", dataMoi);
          // console.log("hinh anh", dataMoi.hinhAnh);
          // var form_data = new FormData();
          // for (var key in dataMoi) {
          //   form_data.append(key, dataMoi[key]);
          // }
          // gọi api thêm sửa phim
          // props.submit(props.hDong, form_data);
        }}
      >
        {/* > > > > > > > > > HÀNG 1 : mã phim - ngày khởi chiéu  < < < < < < < < < <  */}

        <Form.Item name={["thongTinNguoiDung", "taiKhoan"]} label="Tài Khoản">
          <Input defaultValue={props.nguoiDung.taiKhoan} />
        </Form.Item>

        {/* > > > > > > > > > HÀNG 2 : tên phim - đánh giá        < < < < < < < < < <  */}

        <Form.Item name={["thongTinNguoiDung", "hoTen"]} label="Họ Tên">
          <Input defaultValue={props.nguoiDung.hoTen} />
        </Form.Item>

        <Form.Item name={["thongTinNguoiDung", "matKhau"]} label="Mật Khẩu">
          <Input defaultValue={props.nguoiDung.matKhau} />
        </Form.Item>

        {/* > > > > > > > > > HÀNG 3 : trailer - hình ảnh         < < < < < < < < < <  */}

        <Form.Item
          name={["thongTinNguoiDung", "email"]}
          label="Email"
          rules={[{ type: "email" }]}
        >
          <Input defaultValue={props.nguoiDung.email} />
        </Form.Item>

        {/* <Form.Item
          name={["thongTinNguoiDung", "soDt"]}
          label="Số Điện Thoại"
          rules={[{ type: "number", min: 0 }]}
        >
          <InputNumber defaultValue={props.nguoiDung.soDt} />
        </Form.Item> */}

        <Form.Item
          name={["thongTinNguoiDung", "soDt"]}
          label="Số Điện Thoại"
          //rules={[{ type: "number", min: 0 }]}
          rules={[
            {
              required: true,
              type: "regexp",
              pattern: new RegExp("[0-9]"),
              message: "Wrong format!",
            },
          ]}
        >
          <Input defaultValue={props.nguoiDung.soDt} />
        </Form.Item>

        <Form.Item
          name={["thongTinNguoiDung", "maLoaiNguoiDung"]}
          label="Loại Người Dùng"
          //rules={[{ required: true }]}
        >
          <Select
            // placeholder="Select a option and change input text above"
            // onChange={this.onGenderChange}
            // allowClear
            defaultValue={props.nguoiDung.maLoaiNguoiDung}
          >
            <Option value="KhachHang">KhachHang</Option>
            <Option value="QuanTri">QuanTri</Option>
          </Select>
        </Form.Item>

        {/* > > > > > > > > > HÀNG 4 : mô tả                      < < < < < < < < < <  */}

        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 0 }}
          style={{ margin: 0 }}
        >
          <Button type="primary" htmlType="submit">
            {props.hDong}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
