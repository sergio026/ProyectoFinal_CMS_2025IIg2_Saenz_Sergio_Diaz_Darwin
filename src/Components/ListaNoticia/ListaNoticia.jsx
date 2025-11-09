// import React, { useEffect, useState } from "react";
// // import { collection, getDocs } from "firebase/firestore";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase/credenciales";

// import "./ListaNoticia.css";

// const ListaNoticia = ({ rol, user }) => {
//   const [noticias, setNoticias] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNoticias = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "Noticia"));
//         const noticiasArray = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log("Noticias cargadas desde Firestore:", noticiasArray);
//         setNoticias(noticiasArray);
//       } catch (error) {
//         console.error("Error al obtener las noticias:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNoticias();
//   }, []);

//   if (loading) return <p>Cargando noticias...</p>;
//   if (noticias.length === 0) return <p>No hay noticias disponibles.</p>;

//   return (
//     <div className="lista-noticia">
//       <h2>Noticias publicadas</h2>
//       <div className="noticias-grid">
//         {noticias.map((noticia) => (
//           <div key={noticia.id} className="noticia-card">
//             <h3>{noticia.titulo}</h3>
//             <p>
//               <strong>Categoría:</strong> {noticia.categoria}
//             </p>
//             <p>
//               <strong>Autor:</strong> {noticia.autor}
//             </p>
//             <p>{noticia.contenido}</p>
//             <small>
//               Estado: {noticia.estado} | Fecha:{" "}
//               {new Date(noticia.fechaCreacion.seconds * 1000).toLocaleString()}
//             </small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ListaNoticia;

import React, { useEffect, useState } from "react";
import { db } from "../../firebase/credenciales";
import { collection, getDocs, query, where } from "firebase/firestore";

const ListaNoticia = ({ rol, user }) => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const noticiasCollection = collection(db, "Noticia");
        let q;

        if (rol === "reportero") {
          // Filtrar solo las noticias del reportero
          q = query(noticiasCollection, where("autor", "==", user.email));
        } else if (rol === "editor") {
          // Mostrar todas las noticias de los reporteros
          q = query(noticiasCollection, where("rolCreador", "==", "reportero"));
        }

        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNoticias(lista);
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      }
    };

    fetchNoticias();
  }, [rol, user]);

  const handleEditar = (noticia) => {
    console.log("Editar noticia:", noticia);
    // Aquí podrías cambiar la vista en Panel para editar esta noticia
  };

  return (
    <div>
      <h3>Lista de Noticias</h3>
      {noticias.length === 0 ? (
        <p>No hay noticias para mostrar.</p>
      ) : (
        <ul>
          {noticias.map((n) => (
            <li key={n.id}>
              <strong>{n.titulo}</strong> - {n.estado} <br />
              <small>{n.autor}</small>
              <br />
              <button onClick={() => handleEditar(n)}>Editar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaNoticia;

