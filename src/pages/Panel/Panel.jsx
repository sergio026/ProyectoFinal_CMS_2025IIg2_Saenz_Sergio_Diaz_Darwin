
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListaNoticia from "../../Components/ListaNoticia/ListaNoticia";
import Noticia from "../../Components/Noticia/Noticia";
import Registrar from "../Register/Register";
import "./Panel.css";

const Panel = ({ user }) => {
  const [usuario] = useState(user);
  const [vista, setVista] = useState("lista");

  const renderVista = () => {
    switch (vista) {
      case "crear":
        return <Noticia />;
      case "lista":
        return <ListaNoticia rol={usuario?.rol} />;
      case "seccion":
        return <p style={{ color: "white" }}>Opciones avanzadas próximamente...</p>;
      case "registro":
          return <Registrar rol={usuario?.rol} />;
      case "otros":
        return <p style={{ color: "white" }}>Opciones avanzadas próximamente...</p>;
      default:
        return null;
    }
  };

  return (
    <div className="panel">
      <aside className="menu-vertical">
      <h2 className="panel-title">Panel de Administración</h2>
        <p className="panel-subtitle">
          Bienvenido {usuario?.email}
          <br />Rol: <b>{usuario?.rol}</b>
        </p>
        
        <ul>
          <li className={vista == "lista" ? "active" : ""} onClick={() => setVista("lista")}>
            <i className="bx bx-list-ul"></i> Lista de Noticias
          </li>
          <li  className={vista == "crear" ? "active" : ""} onClick={() => setVista("crear")}>
            <i className="bx bx-folder-plus"></i> Crear Noticia
          </li>
          <li className={vista == "seccion" ? "active" : ""}  onClick={() => setVista("seccion")}>📁 Secciones</li>
          {usuario?.rol == "editor" && (
            <li onClick={() => setVista("registro")}>  <i className="bx bx-user-circle"></i> Registro Usuario</li>
          )}
          <li  className={vista == "otros" ? "active" : ""} onClick={() => setVista("otros")}>⚙️ Otros</li>
        </ul>
      </aside>

      <main className="panel-contenido">{renderVista()}</main>
    </div>
  );
};

export default Panel;
