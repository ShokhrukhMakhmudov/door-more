import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
import { DigiContext } from "../../context/DigiContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddNewTaskModal = ({
  formData: { id, call_center, sales_manager },
  setRefresh,
}) => {
  const MySwal = withReactContent(Swal);
  const { showAddNewTaskModal, handleCloseAddNewTaskModal } =
    useContext(DigiContext);

  let initialValue = sales_manager
    ? {
        sales_manager: "Менеджер-1",
        address: sales_manager.address,
        description: sales_manager.description,
      }
    : {
        sales_manager: "Менеджер-1",
        address: null,
        description: null,
      };
  const [task, setTask] = useState(initialValue);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let { data: branchs, error } = await supabase
        .from("branchs")
        .select("*")
        .eq("name", call_center.branch);
      setData(branchs[0]);
    }
    fetchData();
  }, []);

  const createTask = async () => {
    let time = new Date();

    const newDate = {
      ...task,
      date: time.toLocaleString(),
    };

    const { data, error } = await supabase
      .from("orders")
      .update({ sales_manager: newDate })
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
    mutation.mutate();

    handleCloseAddNewTaskModal();
  };

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
        <Accordion defaultActiveKey={sales_manager ? "1" : "0"} color="primary">
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
                <Form.Select
                  onChange={(e) => {
                    setTask((prev) => {
                      return { ...prev, measurer: e.target.value };
                    });
                  }}>
                  {!sales_manager && <option selected>Выбрать</option>}
                  {data &&
                    data.measures.map(({ id, name }) => {
                      return (
                        <option
                          key={id}
                          value={name}
                          selected={
                            sales_manager?.measurer === name ? true : false
                          }>
                          {name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={task.address}
                  placeholder={"Адрес"}
                  onChange={(e) => {
                    setTask((prev) => {
                      return { ...prev, address: e.target.value };
                    });
                  }}
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
          {sales_manager ? "Изменить" : "Отправить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewTaskModal;
