import React from "react";
import { Form, Input, Button, Upload } from "antd";
import "./ThemSuaPhim.css";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
export default function ThemSuaPhim(props) {
  console.log(props.hDong + " PHIM PROPS : ", props);

  // > > > > > > > > > HÀM GỌI API SỬA PHIM < < < < < < < //
  // const dispatch = useDispatch();
  // const handleSubmit = async (hDong,phim) => {
  //   const dispatch = useDispatch();
  //   hDong === "SỬA"
  //     ? dispatch(await SuaPhimApiAction(phim))
  //     : dispatch(await ThemPhimApiAction(phim));
  // };
  //--------------------------------------------------------
  const fileList = [
    {
      uid: "-1",
      name: props.phim.tenPhim,
      status: "done",
      url: props.phim.hinhAnh,
      thumbUrl: props.phim.hinhAnh,
    },
  ];
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
  //--------------------------------------------------------
  return (
    <div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={(values) => {
          // xử lý dữ liệu nhập vào tử input,
          // nếu có nhập thì cho values = giá trị nhập
          // nếu không nhập thì cho values = giá trị cũ
          let dataMoi = values.thongTinPhimMoi;
          let dataCu = props.phim;
          dataCu.ngayKhoiChieu = moment(props.phim.ngayKhoiChieu).format(
            "DD-MM-YYYY"
          );
          for (let key in dataMoi) {
            if (dataMoi[key] === undefined) {
              dataMoi[key] = dataCu[key];
            }
          }
          dataMoi.hinhAnh = dataMoi.hinhAnh.file.originFileObj;
          // dataMoi.hinhAnh = null;
          dataMoi = { ...dataMoi, biDanh: "bidanh", maNhom: "GP05" };
          console.log("data moi", dataMoi);
          console.log("hinh anh", dataMoi.hinhAnh);
          var form_data = new FormData();
          for (var key in dataMoi) {
            form_data.append(key, dataMoi[key]);
          }
          // gọi api thêm sửa phim

          props.submit(props.hDong, form_data);
        }}
      >
        {/* > > > > > > > > > HÀNG 1 : mã phim - ngày khởi chiéu  < < < < < < < < < <  */}
        <div className="row">
          <div className="col-6">
            <Form.Item name={["thongTinPhimMoi", "maPhim"]} label="Mã phim:">
              <Input defaultValue={props.phim.maPhim} />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              name={["thongTinPhimMoi", "ngayKhoiChieu"]}
              label="Ngày Khởi Chiếu:"
            >
              <Input
                defaultValue={moment(props.phim.ngayKhoiChieu).format(
                  "DD-MM-YYYY"
                )}
              />
            </Form.Item>
          </div>
        </div>
        {/* > > > > > > > > > HÀNG 2 : tên phim - đánh giá        < < < < < < < < < <  */}
        <div className="row">
          <div className="col-6">
            <Form.Item name={["thongTinPhimMoi", "tenPhim"]} label="Tên phim:">
              <Input defaultValue={props.phim.tenPhim} />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item name={["thongTinPhimMoi", "danhGia"]} label="Đánh giá:">
              <Input defaultValue={props.phim.danhGia} />
            </Form.Item>
          </div>
        </div>
        {/* > > > > > > > > > HÀNG 3 : trailer - hình ảnh         < < < < < < < < < <  */}
        <div className="row">
          <div className="col-6">
            <div className="row">
              <Form.Item name={["thongTinPhimMoi", "trailer"]} label="Trailer:">
                <Input defaultValue={props.phim.trailer} />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item name={["thongTinPhimMoi", "hinhAnh"]}>
                <Upload
                  listType="picture"
                  defaultFileList={[...fileList]}
                  className="upload-list-inline"
                >
                  <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <Form.Item name={["thongTinPhimMoi", "moTa"]} label="Mô tả">
              <Input.TextArea
                style={{ height: 162 }}
                defaultValue={props.phim.moTa}
              />
            </Form.Item>
          </div>
        </div>
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
