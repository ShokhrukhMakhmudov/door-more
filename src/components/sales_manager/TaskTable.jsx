import React, { useContext, useEffect, useState } from "react";
import { taskData } from "../../data/Data";
import { DigiContext } from "../../context/DigiContext";
import { Form } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import PaginationSection from "./PaginationSection";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const TaskTable = ({ dataList, setOrder }) => {
  const { handleShow, handleViewTaskModalShow, handleShowAddNewTaskModal } =
    useContext(DigiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  // Pagination logic
  // const indexOfLastData = currentPage * dataPerPage;
  // const indexOfFirstData = indexOfLastData - dataPerPage;
  // const currentData = dataList
  //   ? dataList.slice(indexOfFirstData, indexOfLastData)
  //   : null;

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // // Calculate total number of pages
  // const totalPages = Math.ceil(dataList.length / dataPerPage);
  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  // const handleStatusChange = (index, value) => {
  //   const dataIndex = indexOfFirstData + index;
  //   const updatedData = [...dataList];
  //   updatedData[dataIndex].status = value;
  //   setDataList(updatedData);
  // };

  // const handlePriorityChange = (index, value) => {
  //   const dataIndex = indexOfFirstData + index;
  //   const updatedData = [...dataList];
  //   updatedData[dataIndex].priority = value;
  //   setDataList(updatedData);
  // };
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
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllLeads"
                  />
                </div>
              </th>

              <th>Номер телефонов</th>
              <th>Замеры</th>
              <th>Дата создания</th>
              <th>Замершик</th>

              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {dataList &&
              dataList.map(
                ({
                  id,
                  phone,
                  description,
                  created_at,
                  address,
                  branch,
                  sales_manager,
                  measure,
                  excel_file,
                }) => (
                  <tr key={id}>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>

                    <td>{phone}</td>
                    <td>
                      {excel_file ? (
                        <Link
                          to={excel_file}
                          download
                          className="btn-primary"
                          onClick={() => {
                            let filename = excel_file.split("/").slice(-1)[0];
                            console.log(filename);
                            DownloadFile(filename);
                          }}>
                          Отправлены
                        </Link>
                      ) : (
                        "В ожидании"
                      )}
                    </td>

                    <td>
                      <div className="avatar-box">
                        {created_at.slice(0, 10)}
                        {"/"}
                        {created_at.slice(11, 16)}
                      </div>
                    </td>
                    <th>{measure ? "Равшан" : "Не назначено"}</th>
                    <td>
                      <div className="btn-box">
                        <button
                          className="btn btn-sm btn-icon btn-primary"
                          onClick={() => {
                            setOrder(id);
                            handleShowAddNewTaskModal();
                          }}>
                          <i className="fa-light fa-plus"></i>
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
