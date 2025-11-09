import React, { useState } from "react";
import "./Noticia.css";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Noticia = () => {
  const [noticia, setNoticia] = useState({
    titulo: "",
    subtitulo: "",
    contenido: "",
    categoria: "",
    imagen: null,
    autor: "",
    estado: "Edición",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticia({ ...noticia, [name]: value });
  };

  // const handleImageChange = (e) => {
  //   setNoticia({ ...noticia, imagen: e.target.files[0] });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let imageUrl = "";
  //     if (noticia.imagen) {
  //       const imageRef = ref(
  //         storage,
  //         `noticias/${Date.now()}_${noticia.imagen.name}`
  //       );
  //       await uploadBytes(imageRef, noticia.imagen);
  //       imageUrl = await getDownloadURL(imageRef);
  //     }

  //     await addDoc(collection(db, "noticias"), {
  //       ...noticia,
  //       imagen: imageUrl,
  //       fechaCreacion: serverTimestamp(),
  //       fechaActualizacion: serverTimestamp(),
  //     });

  //     console.log("✅ Noticia guardada con éxito");
  //     alert("Noticia guardada correctamente");

  //     // Limpia el formulario
  //     setNoticia({
  //       titulo: "",
  //       subtitulo: "",
  //       contenido: "",
  //       categoria: "",
  //       imagen: null,
  //       autor: "",
  //       estado: "Edición",
  //     });
  //   } catch (error) {
  //     console.error("❌ Error al guardar la noticia:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Ignorar la imagen por ahora
      await addDoc(collection(db, "Noticia"), {
        ...noticia,
        imagen: "", // o puedes dejar un URL temporal
        fechaCreacion: serverTimestamp(),
      });

      alert("✅ Noticia guardada (sin imagen)");
      setNoticia({
        titulo: "",
        subtitulo: "",
        contenido: "",
        categoria: "",
        imagen: null,
        autor: "",
        estado: "Edición",
      });
    } catch (error) {
      console.error("❌ Error al guardar la noticia:", error);
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

      {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}

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
