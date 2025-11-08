// import React from "react";

// const ListaNoticia = ({ noticias = [] }) => {
//   // 👆 Esto asegura que si no llega 'noticias', sea un array vacío

//   if (noticias.length === 0) {
//     return <p>No hay noticias aún.</p>;
//   }

//   return (
//     <div className="lista-noticia">
//       <h2>Listado de Noticias</h2>
//       <ul>
//         {noticias.map((noticia) => (
//           <li key={noticia.id}>
//             <h3>{noticia.titulo}</h3>
//             <p>{noticia.subtitulo}</p>
//             <small>
//               {noticia.categoria} | {noticia.fechaCreacion}
//             </small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListaNoticia;

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 
import "./ListaNoticia.css";

const ListaNoticia = () => {
const [noticias, setNoticias] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Noticia"));
        const noticiasArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(noticiasArray);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) return <p>Cargando noticias...</p>;
  if (noticias.length === 0) return <p>No hay noticias disponibles.</p>;

  return (
    <div className="lista-noticia">
      <h2>Noticias publicadas</h2>
      <div className="noticias-grid">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="noticia-card">
            <h3>{noticia.titulo}</h3>
            <p><strong>Categoría:</strong> {noticia.categoria}</p>
            <p><strong>Autor:</strong> {noticia.autor}</p>
            <p>{noticia.contenido}</p>
            <small>
              Estado: {noticia.estado} | Fecha:{" "}
              {new Date(noticia.fechaCreacion.seconds * 1000).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaNoticia;
