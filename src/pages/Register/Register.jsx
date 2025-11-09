import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // Opcional: si quieres manejar inputs
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const [isRegistrador, setIsRegistrador] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth, email, password, rol
    ).then((usuariofirebase) => {
      return usuariofirebase;
    });

    console.log(infoUsuario);
  }


  const handleRegister = (e) => {
    e.preventDefault();

    // Aquí va tu lógica para registrar (guardar datos, API, etc.)
    console.log("Usuario registrado:", user, pass);

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;



    navigate("/");
  };

  return (
    <div className="registrar min-vh-100 d-flex justify-content-center align-items-center py-5" id="registrar">
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
        <h2 className="fw-bold mb-3 text-primary">Crear cuenta</h2>

        <form className="p-0 w-100" onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Correo</label>
            <input
              type="text"
              className="email"
              id="email"
              placeholder="Ingrese su email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select className="form-select" id="rol">
              <option value="">Seleccione un Rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select> 
          </div>

          <button type="submit" className="btn-login">
            Crear cuenta
          </button>
          <p className="text-center mt-4 text-muted">
            <span className="text-color">Ya tienes cuenta? </span>
            <Link to="/login" className="">Iniciar sesión</Link>
          </p>
        </form>
        
      </div>
    </div>
  );
};

export default Register;
