import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./QuanLyNguoiDung.css";
import ThemSuaNguoiDung from "../QLnguoi/ThemSuaNguoiDung";
import {
  GetInforAction,
  layDanhSachNguoiDungApiAction,
  XoaNguoiDungApiAction,
} from "../../../redux/actions/UserActions";
import {
  SuaPhimApiAction,
  ThemPhimApiAction,
} from "../../../redux/actions/FilmAction";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function QuanLyNguoiDung() {
  /* > > > > > > > > >GỌI API LẤY DANH SÁCH PHIM < < < < < < < < <  */
  const dsNguoiDung = useSelector((state) => state.UserReducer.listUser);

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(await layDanhSachNguoiDungApiAction());
  }, []);
  /*----------------------------------------------------------------*/

  /* > > > > > > > > > > > >GỌI API XÓA PHIM < < < < < < < < < < <  */
  const handleOk = async (taiKhoan) => {
    dispatch(await XoaNguoiDungApiAction(taiKhoan));
  };
  /*----------------------------------------------------------------*/

  /* > > > > > > HÀM TRUYỀN VÀO COMPONENT "THEMSUAPHIM" < < < < < < */
  const handleSubmit = async (hDong, nguoiDung) => {
    hDong === "SỬA"
      ? dispatch(await SuaPhimApiAction(nguoiDung))
      : dispatch(await ThemPhimApiAction(nguoiDung));
  };
  /*----------------------------------------------------------------*/

  const { confirm } = Modal;
  const showConfirmModal = (taiKhoan) => {
    confirm({
      title: "Xóa tài khoản: ",
      content: taiKhoan,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleOk(taiKhoan);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showThemSuaNguoiDungModal = (hanhDong, thongTinNguoiDung) => {
    let ttNguoiDung = thongTinNguoiDung;
    let hDong = hanhDong;
    let tenModal = "";
    if (hDong === "SỬA") {
      tenModal = "Chỉnh sửa thông tin người dùng";
    } else {
      tenModal = "Thêm người dùng";
    }
    confirm({
      centered: true,
      width: 800,
      title: tenModal,
      icon: null,
      content: (
        <ThemSuaNguoiDung
          nguoiDung={ttNguoiDung}
          hDong={hDong}
          submit={handleSubmit}
        />
      ),
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  /* > > > > > > > > > > > DATA RENDER TABLE < < < < < < < < < < <  */
  const columns = [
    {
      title: "STT",
      width: 10,
      dataIndex: "key",
      key: 1,
      align: "center",
    },
    {
      title: "TÀI KHOẢN",
      width: 30,
      dataIndex: "taiKhoan",
      key: 2,
    },
    {
      title: "HỌ TÊN",

      dataIndex: "hoTen",
      key: 3,
      width: 30,
      align: "center",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: 4,
      width: 30,
    },
    {
      title: "SĐT",
      dataIndex: "soDt",
      key: 5,
      width: 17,
      align: "center",
    },
    {
      title: "NGƯỜI DÙNG",
      dataIndex: "maLoaiNguoiDung",
      key: 5,
      width: 17,
      align: "center",
    },
    {
      title: "THAO TÁC",

      key: 6,
      width: 14,
      render: (record) => (
        <>
          <Button
            type="primary"
            block
            style={{ padding: 0, margin: "5px 0" }}
            onClick={() => {
              showThemSuaNguoiDungModal("SỬA", record);
            }}
          >
            <EditOutlined />
            SỬA
          </Button>
          <Button
            type="default"
            danger
            block
            style={{ padding: 0, margin: "5px 0" }}
            onClick={() => {
              {
                console.log("record cell", record);
              }
              showConfirmModal(record.taiKhoan);
            }}
          >
            <DeleteOutlined />
            XÓA
          </Button>
        </>
      ),
    },
  ];
  /* -------------------------------------------------------------- */

  return (
    <div>
      <Button
        type="primary"
        style={{ padding: 5, margin: 1, marginBottom: 24 }}
        onClick={() => {
          showThemSuaNguoiDungModal("THÊM", dsNguoiDung[0]);
        }}
      >
        <PlusOutlined />
        THÊM NGƯỜI DÙNG
      </Button>
      <Table
        bordered
        columns={columns}
        dataSource={dsNguoiDung}
        scroll={{ y: 400 }}
      />
      ,
    </div>
  );
}
