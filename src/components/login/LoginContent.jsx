import React, { useContext, useState } from "react";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { DigiContext } from "../../context/DigiContext";
import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const LoginContent = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const { passwordVisible, togglePasswordVisibility } = useContext(DigiContext);
  const [loginData, setLogin] = useState({
    login: "",
    password: "",
  });
  const {
    isLoading,
    isError,
    data: users,
    error,
  } = useQuery({
    queryKey: ["1"],
    queryFn: fetchData,
  });
  async function fetchData() {
    let { data, error } = await supabase.from("users").select("*");
    console.log(data);
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    let user = users.filter(({ login, password }) => {
      return login == loginData.login && password == loginData.password;
    });

    if (!user[0]) {
      MySwal.fire({
        icon: "error",
        title: "Неправильные данные",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("success");
      sessionStorage.setItem("user", JSON.stringify(user[0]));
      navigate("/home");
    }
  };

  return (
    <div className="main-content login-panel">
      <div className="login-body">
        <div className="top d-flex justify-content-center align-items-center">
          <img src="assets/images/logo-big.png" alt="Logo" />
        </div>
        <div className="bottom">
          <h3 className="panel-title">Вход</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-30">
              <span className="input-group-text">
                <i className="fa-regular fa-user"></i>
              </span>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Логин"
                value={loginData.login}
                onChange={(e) =>
                  setLogin((prev) => {
                    return { ...prev, login: e.target.value };
                  })
                }
              />
            </div>
            <div className="input-group mb-20">
              <span className="input-group-text">
                <i className="fa-regular fa-lock"></i>
              </span>
              <input
                required
                type={passwordVisible ? "text" : "password"}
                className="form-control rounded-end"
                placeholder="Пароль"
                value={loginData.password}
                onChange={(e) =>
                  setLogin((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
              <Link
                role="button"
                className="password-show"
                onClick={togglePasswordVisibility}>
                <i className="fa-duotone fa-eye"></i>
              </Link>
            </div>
            <div className="d-flex justify-content-between mb-30">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="loginCheckbox"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="loginCheckbox">
                  Запомнить
                </label>
              </div>
              <span className="text-white fs-14 border-bottom-ridge">
                Забыли пароль?
              </span>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
              disabled={isLoading ?? false}>
              Войти
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginContent;
