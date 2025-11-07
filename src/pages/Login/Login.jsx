import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center py-5" id="login">
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
        <h2 className="fw-bold mb-3 text-primary">Bienvenido</h2>
        <div
          className="error-message"
          style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
        ></div>

        <form className="p-0 w-100">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Correo
            </label>
            <input
              type="text"
              className="email"
              id="email"
              placeholder="Ingrese su Correo"
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="mb-3">
            <label
              htmlFor="formGroupExampleInput2"
              className="form-label text-left"
            >
              Contraseña
            </label>
            <input
              type="password"
              className="password"
              id="password"
              placeholder="Ingrese su contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
          <p className="text-center mt-4 text-muted">
            <span className="text-color">No tienes una cuenta? </span>
            <Link to="/registrar" className="">
              Crear una cuenta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
