import React, { useContext, useEffect, useState } from "react";
import { taskData } from "../../data/Data";
import { DigiContext } from "../../context/DigiContext";
import { Form } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import PaginationSection from "./PaginationSection";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const TaskTable = ({ dataList, setOrder }) => {
  const { handleShow, handleViewTaskModalShow } = useContext(DigiContext);

  return (
    <>
      <OverlayScrollbarsComponent>
        <table
          className="table table-dashed table-hover digi-dataTable task-table table-striped"
          id="taskTable">
          <thead>
            <tr>
              <th className="no-sort">ID</th>
              <th>Филиалы</th>
              <th>Номер телефонов</th>
              <th>Имя</th>
              <th>Дата создания</th>
              <th>Менеджер</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {dataList &&
              dataList.map(
                ({
                  id,
                  call_center: {
                    name,
                    phone,
                    description,
                    date,
                    address,
                    branch,
                    sales_manager,
                  },
                  sales_manager: manager,
                }) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    key={id}
                    onClick={() => {
                      setOrder(id);
                      handleViewTaskModalShow();
                    }}>
                    <td>{id}</td>
                    <td>{branch}</td>

                    <td>{phone}</td>
                    <td>{name}</td>
                    <td>
                      <div className="avatar-box">
                        {date.slice(0, 10)}
                        {"/"}
                        {date.slice(12, 17)}
                      </div>
                    </td>
                    <td>
                      <div className="avatar-box">Сарвар</div>
                    </td>
                    <td>{manager ? "В ожидании" : "В рассмотрении"}</td>
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
