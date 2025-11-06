import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
      <div
        className="card shadow-lg border-0 rounded-4 p-4 text-center w-100"
      >
        <h2 className="fw-bold mb-3 text-primary">Bienvenido de nuevo</h2>

        <form className="p-0 w-100">
          <div className="container-img mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
              className="profile-center-img rounded-3"
              alt="profile"
            />
          </div>

          <div className="container-form form-shell mx-auto text-start">
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">Username</label>
              <input
                type="text"
                className="form-control stylish-input"
                placeholder="Usuario"
              />
            </div>

            <div className=" mb-3">
              <label className=" form-label fw-semibold text-secondary">Contraseña</label>
              <input
                type="password"
                className="form-control stylish-input"
                placeholder="Contraseña"
              />
            </div>

            <button
              type="submit"
              className="btn-login"
            >
              Acceder
            </button>

            <p className="text-center mt-4 text-muted">
              No tienes una cuenta? <a href="#" className="text-color">Crear una cuenta</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;