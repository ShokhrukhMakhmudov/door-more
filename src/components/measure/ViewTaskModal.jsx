import React, { useContext } from "react";
import { Modal, Accordion, Form } from "react-bootstrap";
import { DigiContext } from "../../context/DigiContext";
import { supabase } from "../../supabase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ViewTaskModal = ({
  orderData: { id, call_center, sales_manager, measure },
  setOrderView,
}) => {
  const MySwal = withReactContent(Swal);
  const { viewTaskModalOpen, handleViewTaskModalClose } =
    useContext(DigiContext);

  return (
    <Modal show={viewTaskModalOpen} id="viewTaskModal" size="lg" centered>
      <Modal.Header>
        <Modal.Title id="viewTaskModalLabel">
          Реквизиты заказа: ID{id}
        </Modal.Title>
        <div className="btn-box d-flex gap-3">
          <button
            type="button"
            className="btn btn-sm btn-icon btn-outline-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setOrderView(null);
              handleViewTaskModalClose();
            }}>
            <i className="fa-light fa-times"></i>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body className="view-task">
        <Accordion defaultActiveKey="0" color="primary">
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
          {sales_manager && (
            <Accordion.Item eventKey="1">
              <Accordion.Header>Sales manager: Менеджер-1</Accordion.Header>
              <Accordion.Body as={"div"} className="bg-blue-theme text-white">
                <div className="row g-3">
                  <div className="col-lg-4 col-md-5">
                    <Form.Group className="mb-3" controlId="Date">
                      <Form.Label>Дата</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Номер телефона"
                        defaultValue={sales_manager.date}
                        disabled
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-8 col-md-7">
                    <Form.Group className="mb-3">
                      <Form.Label>Замерщик</Form.Label>
                      <Form.Control
                        defaultValue={sales_manager.measurer}
                        disabled
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Адрес</Form.Label>
                  <Form.Control
                    defaultValue={sales_manager.address}
                    disabled
                    as={"textarea"}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Date">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    defaultValue={sales_manager.description}
                    disabled
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          )}
          {measure && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Measurer: Замерщик-1</Accordion.Header>
              <Accordion.Body className="bg-blue-theme text-white">
                <div className="row g-3">
                  <div className="col-lg-5 col-md-5">
                    <Form.Group className="mb-3" controlId="Date">
                      <Form.Label>Дата</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Номер телефона"
                        defaultValue={measure.date}
                        disabled
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-7 col-md-5">
                    <Form.Group className="mb-3">
                      <Form.Label>Файл</Form.Label>
                      <a href={measure.excel_file} download target="_blank">
                        Скачать
                      </a>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="mb-3" controlId="Date">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    disabled
                    value={measure.description}
                    placeholder={"Комментарии"}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export default ViewTaskModal;
