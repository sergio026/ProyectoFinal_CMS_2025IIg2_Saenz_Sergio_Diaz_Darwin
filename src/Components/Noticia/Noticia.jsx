import React, { useState } from "react";
import "./Noticia.css";
import { db } from "../../firebase/credenciales";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Noticia = () => {
  const [noticia, setNoticia] = useState({
    titulo: "",
    subtitulo: "",
    contenido: "",
    categoria: "",
    imagenURL: "",
    autor: "",
    estado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticia({ ...noticia, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Noticia"), {
        ...noticia, 
        fechaCreacion: serverTimestamp(),
      });
      setNoticia({
        titulo: "",
        subtitulo: "",
        contenido: "",
        categoria: "",
        imagenURL: "",
        autor: "",
        estado: "",
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
        name="categoria"
        value={noticia.categoria}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar categoría</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Política">Política</option>
        <option value="Deportes">Deportes</option>
        <option value="Economía">Economía</option>
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
        onChange={handleChange}
      />

      <select name="estado" value={noticia.estado} onChange={handleChange}>
        <option value="Edición">Edición</option>
        <option value="Terminado">Terminado</option>
        <option value="Publicado">Publicado</option>
        <option value="Desactivado">Desactivado</option>
      </select>

      <button type="submit" className="btn-guardar">
        Guardar Noticia
      </button>
    </form>
  );
};

export default Noticia;
