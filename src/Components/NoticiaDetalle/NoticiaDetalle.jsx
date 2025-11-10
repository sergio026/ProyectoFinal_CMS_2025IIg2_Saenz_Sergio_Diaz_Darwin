import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/credenciales";
import { doc, getDoc } from "firebase/firestore";
// import NavbarPublic from "../../Components/NavbarPublic/NavbarPublic";
// import FooterPublic from "../../Components/FooterPublic/FooterPublic";
import "./NoticiaDetalle.css";

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const docRef = doc(db, "Noticia", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) setNoticia(snap.data());
      } catch (error) {
        console.error("Error al cargar noticia:", error);
      }
    };
    obtenerNoticia();
  }, [id]);

  if (!noticia) return <p className="loading">Cargando noticia...</p>;

  return (
    <>
      <NavbarPublic />
      <div className="noticia-detalle-container">
        <img
          src={noticia.imagenURL || "https://via.placeholder.com/800x400"}
          alt={noticia.titulo}
          className="noticia-detalle-img"
        />
        <h1>{noticia.titulo}</h1>
        <h3>{noticia.subtitulo}</h3>
        <p className="noticia-contenido">{noticia.contenido}</p>

        <div className="noticia-info">
          <span><b>Autor:</b> {noticia.autor}</span>
          <span><b>Sección:</b> {noticia.seccionNombre || "Sin sección"}</span>
        </div>

        <Link to="/" className="btn-volver">← Volver</Link>
      </div>
      <FooterPublic />
    </>
  );
};

export default NoticiaDetalle;
