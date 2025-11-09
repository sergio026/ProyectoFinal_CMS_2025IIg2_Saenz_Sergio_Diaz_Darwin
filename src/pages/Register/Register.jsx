import React, { useState } from "react";
// import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const Register = () => {
  const navigate = useNavigate();
  const firestore = getFirestore(firebaseApp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function registrarUsuario(email, password, rol) {
    setCargando(true);
    setError("");
    
    try {
      const infoUsuario = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log("Usuario creado:", infoUsuario.user.uid);

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
      await setDoc(docuRef, { 
        correo: email, 
        rol: rol,
        fechaRegistro: new Date() 
      });

      console.log("Usuario guardado en Firestore");
      return true;
      
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      
      let mensajeError = "Error al registrar usuario";
      switch (error.code) {
        case 'auth/email-already-in-use':
          mensajeError = "El correo electrónico ya está en uso";
          break;
        case 'auth/invalid-email':
          mensajeError = "El correo electrónico no es válido";
          break;
        case 'auth/weak-password':
          mensajeError = "La contraseña es demasiado débil";
          break;
        default:
          mensajeError = error.message;
      }
      
      setError(mensajeError);
      return false;
    } finally {
      setCargando(false);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !rol) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const exito = await registrarUsuario(email, password, rol);
    
    if (exito) {
      setEmail("");
      setPassword("");
      setRol("");
      navigate("/login");
    }
  };

  return (
    <div className="registrar min-vh-100 d-flex justify-content-center align-items-center py-5" id="registrar">
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center w-100">
        <h2 className="fw-bold mb-3 text-primary">Crear cuenta</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form className="p-0 w-100" onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
              type="email"
              className="email"
              id="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={cargando}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={cargando}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select 
              className="form-select" 
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
              disabled={cargando}
            >
              <option value="">Seleccione un Rol</option>
              <option value="editor">Editor</option>
              <option value="reportero">Reportero</option>
            </select> 
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={cargando}
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          {/* <p className="text-center mt-4 text-muted">
            <span className="text-color">¿Ya tienes cuenta? </span>
            <Link to="/login">Iniciar sesión</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Register;