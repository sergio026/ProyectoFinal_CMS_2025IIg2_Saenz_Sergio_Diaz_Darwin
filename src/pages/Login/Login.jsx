// import React from "react";
// import "./Login.css";
// import { Link } from "react-router-dom";

// const Login = () => {

//   return (
//     <div className="login min-vh-100 d-flex justify-content-center align-items-center py-5" id="login">
//       <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
//         <h2 className="fw-bold mb-3 text-primary">Bienvenido</h2>
//         <div
//           className="error-message"
//           style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
//         ></div>

//         <form className="p-0 w-100">
//           <div className="mb-3">
//             <label htmlFor="formGroupExampleInput" className="form-label">
//               Correo
//             </label>
//             <input
//               type="text"
//               className="email"
//               id="email"
//               placeholder="Ingrese su Correo"
//               required
//             />
//             <i className="bx bxs-envelope"></i>
//           </div>
//           <div className="mb-3">
//             <label
//               htmlFor="formGroupExampleInput2"
//               className="form-label text-left"
//             >
//               Contraseña
//             </label>
//             <input
//               type="password"
//               className="password"
//               id="password"
//               placeholder="Ingrese su contraseña"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <i className="bx bxs-lock-alt"></i>
//           </div>
//           <button type="submit" className="btn-login">
//             Iniciar Sesión
//           </button>
//           <p className="text-center mt-4 text-muted">
//             <span className="text-color">No tienes una cuenta? </span>
//             <Link to="/registrar" className="">
//               Crear una cuenta
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === "admin" && password === "1234") {
      onLogin();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="login min-vh-100 d-flex justify-content-center align-items-center py-5"
      id="login"
    >
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
        <h2 className="fw-bold mb-3 text-primary">Bienvenido</h2>

        <form className="p-0 w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Correo
            </label>
            <input
              type="text"
              className="email"
              id="email"
              placeholder="Ingrese su Correo"
              value={user}
              onChange={(e) => setUser(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>

          <p className="text-center mt-4 text-muted">
            <span className="text-color">¿No tienes una cuenta? </span>
            <Link to="/registrar">Crear una cuenta</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
