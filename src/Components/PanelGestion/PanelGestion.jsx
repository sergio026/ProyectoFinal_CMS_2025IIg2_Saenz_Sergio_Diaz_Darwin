import React, { useState } from "react";
import Noticia from "../Noticia/Noticia";
import ListaNoticia from "../ListaNoticia/ListaNoticia";
// import Seccion from "../Seccion/Seccion";
import "./PanelGestion.css";

const PanelGestion = () => {
  const [vista, setVista] = useState("lista");

  const renderVista = () => {
    switch (vista) {
      case "crear":
        return <Noticia />;
      case "lista":
        return <ListaNoticia />;
      case "seccion":
        // return <Seccion />;
        return (
          <p style={{ color: "white" }}>Opciones avanzadas próximamente...</p>
        );
      case "otros":
        return (
          <p style={{ color: "white" }}>Opciones avanzadas próximamente...</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="panel-gestion">
      <aside className="menu-vertical">
        <h2>Gestión CMS</h2>
        <ul>
          {/* <li onClick={() => setVista("lista")}>📋 Lista de Noticias</li> */}
          <li className={vista === "lista" ? "active" : ""} onClick={() => setVista("lista")}>📋 Lista de Noticias</li>
          <li onClick={() => setVista("crear")}>📝 Crear Noticia</li>
          <li onClick={() => setVista("seccion")}>📁 Secciones</li>
          <li onClick={() => setVista("otros")}>⚙️ Otros</li>
        </ul>
      </aside>
      <main className="panel-contenido">{renderVista()}</main>
    </div>
  );
};

export default PanelGestion;
