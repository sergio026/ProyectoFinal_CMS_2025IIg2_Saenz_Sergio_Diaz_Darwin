import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListaNoticia from "../../Components/ListaNoticia/ListaNoticia";
import Noticia from "../../Components/Noticia/Noticia";
import "./Panel.css";

const Panel = () => {

  return (
    <div className="panel">
      <h1 className="panel-title">Panel de Administración</h1>
      <p className="panel-subtitle">
        Bienvenido, administra el contenido del sitio desde aquí 🚀
      </p>

      <div className="panel-grid">
        <div className="panel-card">
          <div className="card-icon">📰</div>
          <h3>Noticias</h3>
          <p>Agrega, edita o elimina las noticias que aparecen en el inicio.</p>
          <Link to="/panel/noticias" className="card-btn">
            Gestionar Noticias
          </Link>
        </div>

        <div className="panel-card">
          <div className="card-icon">👥</div>
          <h3>Usuarios</h3>
          <p>Administra los usuarios del sistema y sus permisos.</p>
          <Link to="/panel/usuarios" className="card-btn">
            Ver Usuarios
          </Link>
        </div>

        <div className="panel-card">
          <div className="card-icon">⚙️</div>
          <h3>Configuraciones</h3>
          <p>Personaliza el CMS y cambia los ajustes generales.</p>
          <Link to="/panel/config" className="card-btn">
            Ir a Configuración
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Panel;
