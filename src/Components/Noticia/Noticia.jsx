import React, { useState, useEffect } from "react";
import "./Noticia.css";
import { db } from "../../firebase/credenciales";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const Noticia = ({ user, noticiaExistente }) => {
  const [noticia, setNoticia] = useState({
    titulo: "",
    subtitulo: "",
    contenido: "",
    categoria: "",
    seccionId: "",
    seccionNombre: "",
    imagenURL: "",
    autor: user?.email || "Sin Autor",
    estado: "Edición",
  });

  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    const obtenerSecciones = async () => {
      try {
        const seccionesSnapshot = await getDocs(collection(db, "Secciones"));
        const lista = seccionesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSecciones(lista);
      } catch (error) {
        console.error("Error al obtener secciones:", error);
      }
    };

    obtenerSecciones();
  }, []);

  useEffect(() => {
    if (noticiaExistente) {
      setNoticia({ ...noticiaExistente });
    }

    if (user?.email) {
      setNoticia((prev) => ({ ...prev, autor: user.email }));
    }
  }, [user, noticiaExistente]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "estado" && user?.rol === "reportero" && value === "Publicado") {
      return;
    }

    if (name === "seccionId") {
      const seccionSeleccionada = secciones.find((s) => s.id === value);
      setNoticia({
        ...noticia,
        seccionId: value,
        seccionNombre: seccionSeleccionada ? seccionSeleccionada.nombre : "",
      });
    } else {
      setNoticia({ ...noticia, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (noticiaExistente?.id) {
        const docRef = doc(db, "Noticia", noticiaExistente.id);
        await updateDoc(docRef, {
          ...noticia,
          fechaActualizacion: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "Noticia"), {
          ...noticia,
          fechaCreacion: serverTimestamp(),
          rolCreador: user.rol,
        });
      }

      setNoticia({
        titulo: "",
        subtitulo: "",
        contenido: "",
        categoria: "",
        seccionId: "",
        seccionNombre: "",
        imagenURL: "",
        autor: user.email,
        estado: "Edición",
      });
    } catch (error) {
      console.error("Error al guardar la noticia:", error);
    }
  };

  return (
    <form className="noticia-form" onSubmit={handleSubmit}>
      <h3>Crear / Editar Noticia</h3>

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={noticia.titulo}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="subtitulo"
        placeholder="Subtítulo o bajante"
        value={noticia.subtitulo}
        onChange={handleChange}
      />

      <textarea
        name="contenido"
        placeholder="Contenido de la noticia"
        value={noticia.contenido}
        onChange={handleChange}
        required
      />

      <select
        name="seccionId"
        value={noticia.seccionId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar sección</option>
        {secciones.map((sec) => (
          <option key={sec.id} value={sec.id}>
            {sec.nombre}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="imagenURL"
        placeholder="Imagen URL"
        value={noticia.imagenURL}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={noticia.autor}
        readOnly
      />

      <select name="estado" value={noticia.estado} onChange={handleChange}>
        <option value="Edición">Edición</option>
        <option value="Terminado">Terminado</option>
        {user?.rol !== "reportero" && <option value="Publicado">Publicado</option>}
        <option value="Desactivado">Desactivado</option>
      </select>

      <button type="submit" className="btn-guardar">
        Guardar Noticia
      </button>
    </form>
  );
};

export default Noticia;
