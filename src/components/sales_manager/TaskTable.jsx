import React, { useContext, useEffect, useState } from "react";
import { taskData } from "../../data/Data";
import { DigiContext } from "../../context/DigiContext";
import { Form } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import PaginationSection from "./PaginationSection";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const TaskTable = ({ dataList, setOrder, setOrderView }) => {
  const { handleShow, handleViewTaskModalShow, handleShowAddNewTaskModal } =
    useContext(DigiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const DownloadFile = async (filename) => {
    const { data, error } = await supabase.storage
      .from("measure_files")
      .download(`${filename}.xlsx`);
  };
  return (
    <>
      <OverlayScrollbarsComponent>
        <table
          className="table table-dashed table-hover digi-dataTable task-table table-striped"
          id="taskTable">
          <thead>
            <tr>
              <th className="no-sort">ID</th>

              <th>Имя</th>
              <th>Номер телефонов</th>
              <th>Дата создания</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {dataList &&
              dataList.map(
                ({
                  id,
                  call_center: { phone, date, name },
                  measure,
                  sales_manager,
                }) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    key={id}
                    onClick={() => {
                      setOrderView(id);
                      handleViewTaskModalShow();
                    }}>
                    <td>{id}</td>
                    <td>{name}</td>

                    <td>{phone}</td>

                    <td>{date}</td>
                    <th>
                      {sales_manager?.measurer
                        ? measure
                          ? "Готово"
                          : "В ожидании"
                        : "Не отправлено"}
                    </th>
                    <td>
                      <div className="btn-box">
                        <button
                          className={`btn ${
                            sales_manager ? "btn-secondary" : "btn-primary"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOrder(id);
                            handleShowAddNewTaskModal();
                          }}>
                          {/* <i
                            className={`fa-light ${
                              sales_manager ? "fa-edit" : "fa-plus"
                            } `}></i> */}
                          {sales_manager ? "Изменить" : "Добавить"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </OverlayScrollbarsComponent>
      {/* <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
      /> */}
    </>
  );
};

export default TaskTable;
