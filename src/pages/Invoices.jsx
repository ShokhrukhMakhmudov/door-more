import React from "react";
import Footer from "../components/footer/Footer";
import { Form } from "react-bootstrap";

const InvoicesMainContent = () => {
  return (
    <div className="main-content">
      <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
        <h2>Счета</h2>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-12">
          <div className="panel rounded-0">
            <div className="panel-body invoice" id="invoiceBody">
              <div className="invoice-header mb-30">
                <div className="row justify-content-between align-items-end">
                  <div className="col-xl-4 col-lg-5 col-sm-6">
                    <div className="shop-address">
                      <div className="logo mb-20">
                        <img src="assets/images/logo-big.png" alt="Logo" />
                      </div>
                      <div className="part-txt">
                        <p className="mb-1">
                          Адрес: г.Ташкент, Мирзо-Улугбекский район, ул Катта
                          Дархан, 15
                        </p>
                        <p className="mb-1">Почта: info@doorandmore.uz</p>

                        <p className="mb-1">Телефон: +998 78 150 00 51</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex gap-xl-4 gap-3 status-row">
                      <div className="w-50">
                        <div className="payment-status">
                          <label className="form-label">Статус оплаты:</label>
                          <Form.Select className="form-control">
                            <option value="2">Не оплачено</option>
                            <option value="0">Оплачено</option>
                            <option value="1">В ожидании</option>
                          </Form.Select>
                        </div>
                      </div>
                      <div className="w-50">
                        <div className="Order-status">
                          <label className="form-label">Статус заказа:</label>
                          <Form.Select className="form-control">
                            <option value="0">В ожидании</option>
                            <option value="1">В пути</option>
                            <option value="2">Завершен</option>
                          </Form.Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-body">
                <div className="info-card-wrap mb-30">
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <div className="info-card">
                        <h3>Заказчик:</h3>
                        <ul className="p-0">
                          <li>
                            <span>Имя:</span> Бобур
                          </li>
                          <li>
                            <span>Почта:</span> bobur@example.com
                          </li>
                          <li>
                            <span>Тедефон:</span> +998 (91) 123-1234
                          </li>
                          <li>
                            <span>Адрес:</span> ул. Пахтакор 6
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center">
                      <div className="info-card">
                        <h3>Адрес доставки:</h3>
                        <ul className="p-0">
                          <li>
                            <span>Имя:</span> Бобур
                          </li>
                          <li>
                            <span>Почта:</span> bobur@example.com
                          </li>
                          <li>
                            <span>Тедефон:</span> +998 (91) 123-1234
                          </li>
                          <li>
                            <span>Адрес:</span> ул. Пахтакор 6
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-end">
                      <div className="info-card">
                        <h3>Счет:</h3>
                        <ul className="p-0">
                          <li>
                            <span>Номер счета:</span> 22123101
                          </li>
                          <li>
                            <span>Дата заказа:</span> 2023-11-19
                          </li>
                          <li>
                            <span>Сумма:</span> 282.00 $
                          </li>
                          <li>
                            <span>Способ оплаты:</span> Наличными при доставке
                          </li>
                          <li>
                            <span>Статус оплаты:</span>{" "}
                            <span className="text-danger">Не оплачено</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive mb-30">
                  <table className="table table-bordered mb-0 invoice-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Материалы</th>
                        <th>Кол-во.</th>
                        <th>Цены</th>

                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>AeroGlide ProTech Backpack</td>
                        <td>1</td>
                        <td>$108</td>

                        <td>$108</td>
                      </tr>
                      <tr>
                        <td>02</td>
                        <td>StellarBloom Infinity Scarf</td>
                        <td>1</td>
                        <td>$160</td>

                        <td>$160</td>
                      </tr>
                      <tr>
                        <td>03</td>
                        <td>LuminaFlex Smart Desk Lamp</td>
                        <td>2</td>
                        <td>$03</td>

                        <td>$06</td>
                      </tr>
                      <tr>
                        <td>04</td>
                        <td>AquaGlow HydroTech Water Bottle</td>
                        <td>2</td>
                        <td>$04</td>

                        <td>$08</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="total-payment-area row justify-content-end mb-30">
                  <div className="col-md-4 col-sm-6">
                    <ul>
                      <li className="d-flex justify-content-between">
                        Итог:<span>282.00</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        Доставка:<span>0</span>
                      </li>

                      <li className="d-flex justify-content-between">
                        Общая сумма:<span>282.00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body border-top">
              <div className="btn-box d-flex justify-content-end gap-2">
                <button className="btn btn-sm btn-primary" id="printInvoice">
                  <i className="fa-light fa-print"></i> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvoicesMainContent;
