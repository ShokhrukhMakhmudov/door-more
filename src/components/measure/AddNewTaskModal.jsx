import React, { useContext, useState } from "react";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
import { DigiContext } from "../../context/DigiContext";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddNewTaskModal = ({
  formData: { id, call_center, sales_manager, measure },
  setRefresh,
}) => {
  const MySwal = withReactContent(Swal);
  const { showAddNewTaskModal, handleCloseAddNewTaskModal } =
    useContext(DigiContext);

  let initialValue = measure
    ? {
        measure_agent: "Замерщик-1",
        description: measure.description,
      }
    : {
        measure_agent: "Замерщик-1",
        description: null,
      };
  const [task, setTask] = useState(initialValue);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(Math.floor(Math.random() * 10000));
  console.log(fileId);

  const createTask = async () => {
    let url = `https://zdloxxdwpinhgdykgdem.supabase.co/storage/v1/object/public/measure_files/file_${fileId}`;
    let time = new Date();

    const { data, error } = await supabase
      .from("orders")
      .update({
        measure: { ...task, excel_file: url, date: time.toLocaleString() },
      })
      .eq("id", id)
      .select();

    console.log(data);
    return data;
  };
  const useCreateTask = () => {
    return useMutation({
      mutationFn: createTask,
      onSuccess: () => {
        MySwal.fire({
          icon: "success",
          title: "Данные успешно добавлены",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setRefresh((prev) => !prev);
        });
      },
    });
  };
  const mutation = useCreateTask();
  const handleSubmit = async () => {
    if (file) {
      let fileStatus = await uploadFile(file);
      console.log(fileStatus);
      if (fileStatus) {
        mutation.mutate();
      }
      handleCloseAddNewTaskModal();
    } else {
      MySwal.fire({
        icon: "error",
        title: "Выберите файл",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  async function uploadFile() {
    const { data, error } = await supabase.storage
      .from("measure_files")
      .upload(`file_${fileId}`, file);
    if (error) {
      console.log(error);
    } else {
      console.log(
        `https://zdloxxdwpinhgdykgdem.supabase.co/storage/v1/object/public/measure_files/${data.path}`
      );

      return true;
    }
  }
  return (
    <Modal
      show={showAddNewTaskModal}
      centered
      onHide={handleCloseAddNewTaskModal}
      size="lg">
      <Modal.Header>
        <Modal.Title id="addTaskModalLabel">Добавить новый заказ</Modal.Title>
        <Button
          variant="outline-primary"
          size="sm"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCloseAddNewTaskModal}>
          <i className="fa-light fa-times"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey={measure ? "2" : "0"} color="primary">
          <Accordion.Item eventKey="0">
            <Accordion.Header bsPrefix="bg-dark">
              Call center: {call_center.operator_name}
            </Accordion.Header>
            <Accordion.Body as={"div"} className="bg-blue-theme text-white">
              <div className="row g-3">
                <div className="col-lg-4 col-md-5">
                  <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Номер телефона"
                      defaultValue={call_center.name}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Date">
                    <Form.Label>Дата</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Номер телефона"
                      defaultValue={call_center.date}
                      disabled
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-8 col-md-7">
                  <Form.Group className="mb-3" controlId="Phone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Номер телефона"
                      defaultValue={call_center.phone}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Филиал</Form.Label>
                    <Form.Control defaultValue={call_center.branch} disabled />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                  defaultValue={call_center.address}
                  disabled
                  as={"textarea"}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Date">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as={"textarea"}
                  defaultValue={call_center.description}
                  disabled
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header bsPrefix="bg-dark">
              Manager: Менеджер-1
            </Accordion.Header>
            <Accordion.Body as={"div"} className="bg-blue-theme text-white">
              <Form.Group className="mb-3" controlId="addManager">
                <Form.Label>Замершик</Form.Label>
                <Form.Select disabled>
                  <option>{sales_manager.measurer}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={sales_manager.address}
                  placeholder={"Адрес"}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Date">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={sales_manager.description}
                  placeholder={"Комментарии"}
                  disabled
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header bsPrefix="bg-dark">
              Measure Agent: Замерщик-1
            </Accordion.Header>
            <Accordion.Body as={"div"} className="bg-blue-theme text-white">
              <Form.Group className="mb-3">
                <Form.Label>Файл</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Date">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={task.description}
                  placeholder={"Комментарии"}
                  onChange={(e) => {
                    setTask((prev) => {
                      return { ...prev, description: e.target.value };
                    });
                  }}
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          data-bs-dismiss="modal"
          onClick={handleCloseAddNewTaskModal}>
          Закрыть
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          {measure ? "Изменить" : "Отправить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewTaskModal;
