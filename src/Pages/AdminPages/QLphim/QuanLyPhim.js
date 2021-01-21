import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./QuanLyPhim.css";
import ThemSuaPhim from "./ThemSuaPhim";
import {
   
    layDanhSachPhimApiAction,
  GetArrayMovieAPI,
  SuaPhimApiAction,
  ThemPhimApiAction,
  XoaPhimApiAction,
} from "../../../redux/actions/FilmAction";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function QuanLyPhim() {
  /* > > > > > > > > >GỌI API LẤY DANH SÁCH PHIM < < < < < < < < <  */
  const dsPhim = useSelector((state) => state.FilmReducer.arrFilm);

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(await layDanhSachPhimApiAction());
  }, []);
  /*----------------------------------------------------------------*/

  /* > > > > > > > > > > > >GỌI API XÓA PHIM < < < < < < < < < < <  */
  const handleOk = async (maPhim) => {
    dispatch(await XoaPhimApiAction(maPhim));
  };
  /*----------------------------------------------------------------*/

  /* > > > > > > HÀM TRUYỀN VÀO COMPONENT "THEMSUAPHIM" < < < < < < */
  const handleSubmit = async (hDong, phim) => {
    hDong === "SỬA"
      ? dispatch(await SuaPhimApiAction(phim))
      : dispatch(await ThemPhimApiAction(phim));
  };
  /*----------------------------------------------------------------*/

  const { confirm } = Modal;
  const showConfirmModal = (maPhim, tenPhim) => {
    confirm({
      title: "Xóa phim: ",
      content: tenPhim,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleOk(maPhim);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showThemSuaPhimModal = (hanhDong, thongTinPhim) => {
    let ttPhim = thongTinPhim;
    let hDong = hanhDong;
    let tenModal = "";
    if (hDong === "SỬA") {
      tenModal = "Chỉnh sửa thông tin phim";
    } else {
      tenModal = "Thêm phim mới";
    }
    confirm({
      centered: true,
      width: 800,
      title: tenModal,
      icon: null,
      content: (
        <ThemSuaPhim phim={ttPhim} hDong={hDong} submit={handleSubmit} />
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
      title: "MÃ PHIM",
      width: 14,
      dataIndex: "maPhim",
      key: 1,
      align: "center",
    },
    {
      title: "TÊN PHIM",
      width: 20,
      dataIndex: "tenPhim",
      key: 2,
    },
    {
      title: "HÌNH ẢNH",

      dataIndex: "hinhAnh",
      key: 3,
      width: 20,
      align: "center",
      render: (dataIndex) => (
        <img style={{ width: "70%" }} src={dataIndex}></img>
      ),
    },
    {
      title: "TRAILER",
      dataIndex: "trailer",
      key: 4,
      width: 45,
      render: (dataIndex) => <a href={dataIndex}>{dataIndex}</a>,
    },
    {
      title: "MÔ TẢ",
      dataIndex: "moTa",
      key: 5,
      width: 45,
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
              showThemSuaPhimModal("SỬA", record);
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
              showConfirmModal(record.maPhim, record.tenPhim);
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
          showThemSuaPhimModal("THÊM", dsPhim[0]);
        }}
      >
        <PlusOutlined />
        THÊM PHIM
      </Button>
      <Table
        bordered
        columns={columns}
        dataSource={dsPhim}
        scroll={{ y: 400 }}
      />
      ,
    </div>
  );
}
