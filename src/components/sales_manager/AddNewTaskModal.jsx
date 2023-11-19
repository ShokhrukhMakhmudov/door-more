import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DigiContext } from "../../context/DigiContext";
import CkEditor from "../ck-editor/CkEditor";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
const AddNewTaskModal = ({
  formData: { id, phone, address, description, branch, sales_manager, measure },
}) => {
  const { showAddNewTaskModal, handleCloseAddNewTaskModal } =
    useContext(DigiContext);
  const [joiningDate, setJoiningDate] = useState(null);
  const [leaveDate, setLeaveDate] = useState(null);
  const [task, setTask] = useState({
    phone,
    address,
    description,
    branch,
    sales_manager,
    measure,
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let { data: branchs, error } = await supabase.from("branchs").select("*");
      setData(branchs);
    }
    fetchData();
  }, []);

  const createTask = async () => {
    console.log(task);
    const { data, error } = await supabase
      .from("orders")
      .update({ measure: task.measure, description: task.description })
      .eq("id", id)
      .select();

    console.log(data);
    return data;
  };
  const useCreateTask = () => {
    return useMutation({
      mutationFn: createTask,
      onSuccess: (data) => {
        console.log(data);
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
        <Form>
          <Form.Group className="mb-3" controlId="addPhone">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Номер телефона"
              value={task?.phone}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addAdress">
            <Form.Label>Адрес</Form.Label>
            <Form.Control
              type="text"
              placeholder="Адрес заказа"
              value={task?.address}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addDesc">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Комментарии..."
              value={task?.description}
              onChange={(e) => {
                setTask((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
            />
          </Form.Group>
          {data && (
            <>
              <Form.Group className="mb-3" controlId="addBranch">
                <Form.Label>Филиал</Form.Label>
                <Form.Select
                  disabled
                  onChange={(e) => {
                    setTask((prev) => {
                      return { ...prev, branch: +e.target.value };
                    });
                  }}>
                  <option defaultValue={"Филиал-1"}>Филиал-1</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="addManager">
                <Form.Label>Замершик</Form.Label>
                <Form.Select
                  disabled={!task?.branch}
                  onChange={(e) => {
                    setTask((prev) => {
                      return { ...prev, measure: +e.target.value };
                    });
                  }}>
                  <option defaultValue={task.measure ? task.measure : null}>
                    {task.measure ? "Равшан" : "Выбрать"}
                  </option>
                  {!task.measure &&
                    data
                      .filter(({ id }) => id === task?.branch)
                      .map(({ measures }) => {
                        return measures.map(({ id, name }) => {
                          return (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          );
                        });
                      })}
                </Form.Select>
              </Form.Group>
            </>
          )}
          {/* <Form.Group className="mb-3" controlId="addTaskAttachment">
            <Form.Label>Attach File</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group> */}
          {/* <div className="row g-3">
            <div className="col-sm-6">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
                type="text"
                placeholderText="Eg: 12/06/2023"
                className="form-control form-control-sm date-picker"
                as={DatePicker}
                selected={joiningDate}
                onChange={(date) => setJoiningDate(date)}
              />
            </div>
            <div className="col-sm-6">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="text"
                placeholderText="Eg: 12/06/2023"
                className="form-control form-control-sm date-picker"
                as={DatePicker}
                selected={leaveDate}
                onChange={(date) => setLeaveDate(date)}
              />
            </div>
            <div className="col-sm-6">
              <Form.Label>Priority</Form.Label>
              <Form.Select>
                <option>Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Form.Select>
            </div>
            <div className="col-sm-6">
              <Form.Label>Repeat every</Form.Label>
              <Form.Select>
                <option>Select Time</option>
                <option value="week">Week</option>
                <option value="2week">2 Weeks</option>
                <option value="month">1 Month</option>
                <option value="2months">2 Months</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="year">1 Year</option>
              </Form.Select>
            </div>
            <div className="col-12">
              <Form.Label>Assign To</Form.Label>
              <Form.Select>
                <option>Eg: Natasha Hancock</option>
                <option value="LewisStone">Lewis Stone</option>
                <option value="JackHolland">Jack Holland</option>
                <option value="LilyBurgess">Lily Burgess</option>
                <option value="HarrisonFrench">Harrison French</option>
                <option value="IsabelMellor">Isabel Mellor</option>
                <option value="AdamBates">Adam Bates</option>
                <option value="MillieLee">Millie Lee</option>
                <option value="MadeleineHart">Madeleine Hart</option>
                <option value="LouiseGoddard">Louise Goddard</option>
                <option value="JosephFrancis">Joseph Francis</option>
                <option value="KaiBarker">Kai Barker</option>
                <option value="ErinKnight">Erin Knight</option>
                <option value="JaydenTaylor">Jayden Taylor</option>
                <option value="SophieHilton">Sophie Hilton</option>
                <option value="LeahWright">Leah Wright</option>
                <option value="LewisHooper">Lewis Hooper</option>
              </Form.Select>
            </div>
            <div className="col-12">
              <Form.Label>Task Description</Form.Label>
              <CkEditor />
            </div>
          </div> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          data-bs-dismiss="modal"
          onClick={handleCloseAddNewTaskModal}>
          Close
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Save Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewTaskModal;
