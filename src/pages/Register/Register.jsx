import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // Opcional: si quieres manejar inputs
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Aquí va tu lógica para registrar (guardar datos, API, etc.)
    console.log("Usuario registrado:", user, pass);

    // ✅ Después de crear la cuenta, vuelve al Login
    navigate("/");
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
        <h2 className="fw-bold mb-3 text-primary">Crear cuenta</h2>

        <form className="p-0 w-100" onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="Ingrese su usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Crear cuenta
          </button>

          <p className="text-center mt-4 text-muted">
            <span className="text-color">Ya tienes cuenta? </span>
            <Link to="/" className="">Iniciar sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
