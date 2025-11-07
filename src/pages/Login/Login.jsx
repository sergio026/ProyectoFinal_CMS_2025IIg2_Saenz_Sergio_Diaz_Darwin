import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center py-5">
      <div
        className="card shadow-lg border-0 rounded-4 p-4 text-center w-100"
      >
        <h2 className="fw-bold mb-3 text-primary">Bienvenido de nuevo</h2>

        <form className="p-0 w-100">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Ingrese su usuario" />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label text-left">Contraseña</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Ingrese su contraseña" />
          </div>
          <button
            type="submit"
            className="btn-login"
          >
            Acceder
          </button>
          <p className="text-center mt-4 text-muted">
            <span className="text-color">No tienes una cuenta? </span>
            <Link to="/register" className="">Crear una cuenta</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;