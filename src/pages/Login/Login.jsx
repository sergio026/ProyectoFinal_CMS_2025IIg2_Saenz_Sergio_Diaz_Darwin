import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../../firebase/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credenciales";

const auth = getAuth(firebaseApp);

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setCargando(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      // if (onLogin) {
      //   onLogin();
      // }
      // navigate("/dashboard");
      if (onLogin) {
        onLogin({ uid: user.uid, email: user.email, ...data });
      }
      navigate("/panel");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Correo o contraseña incorrectos");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="login min-vh-100 d-flex justify-content-center align-items-center py-5"
      id="login"
    >
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
        <h2 className="fw-bold mb-3 text-primary">Bienvenido</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form className="p-0 w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              type="email"
              className="email"
              id="email"
              placeholder="Ingrese su Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={cargando}
            />
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-left">
              Contraseña
            </label>
            <input
              type="password"
              className="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={cargando}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          {/* <p className="text-center mt-4 text-muted">
            <span className="text-color">¿No tienes una cuenta? </span>
            <Link to="/registrar">Crear una cuenta</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
