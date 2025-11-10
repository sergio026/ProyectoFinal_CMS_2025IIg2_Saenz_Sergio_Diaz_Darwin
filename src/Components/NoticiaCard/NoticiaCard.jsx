// import React from "react";
// import { Card, CardHeader, CardBody,  Typography, Button,
// } from "@material-tailwind/react";

// import "./NoticiaCard.css";

// const NoticiaCard = ({ noticia, onEditar, onEliminar }) => {

//   return (
//     <Card className="">
//       <CardHeader className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
//         <img
//           src={noticia.imagenURL || "https://via.placeholder.com/300x200"}
//           alt={noticia.titulo}
//           className="w-full h-full object-cover"
//         />
//       </CardHeader>

//       <CardBody className="flex flex-col justify-between p-4 md:p-6 w-full">
//         <div>
//           <Typography
//             variant="small"
//             className="text-blue-400 uppercase mb-1 font-semibold"
//           >
//             {noticia.categoria || "Sin categoría"}
//           </Typography>

//           <Typography variant="h5" className="font-bold mb-2">
//             {noticia.titulo || "Título de la noticia"}
//           </Typography>

//           <Typography variant="paragraph" className="text-gray-300 mb-4">
//             {noticia.subtitulo ||
//               noticia.contenido ||
//               "Resumen de la noticia..."}
//           </Typography>
//         </div>

//         <div className="flex justify-between items-center mt-auto">
//           <Typography variant="small" className="text-gray-400">
//             Autor: {noticia.autor || "Desconocido"}
//           </Typography>
//           <Typography variant="small" className="text-gray-400">
//             Estado: {noticia.estado || "Edición"}
//           </Typography>
//         </div>

//         <div className="mt-4 flex justify-end">
//           <Button
//             size="sm"
//             variant="outlined"
//             className="text-blue-400 border-blue-400 hover:bg-blue-500 hover:text-white transition"
//             onClick={() => onEditar(noticia)}
//           >
//             Editar
//           </Button>

//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export default NoticiaCard;

import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import "./NoticiaCard.css";

const NoticiaCard = ({ noticia, onEditar, onEliminar }) => {
  return (
    <Card className="noticia-card">
      {/* Imagen */}
      <div className="noticia-img">
        <img
          src={noticia.imagenURL || "https://via.placeholder.com/400x250"}
          alt={noticia.titulo}
        />
      </div>

      {/* Contenido */}
      <CardBody className="noticia-body">
        <Typography
          variant="small"
          className="noticia-categoria text-blue-400 uppercase font-semibold"
        >
          {noticia.categoria || "Sin categoría"}
        </Typography>

        <Typography variant="h5" className="noticia-titulo font-bold mb-2">
          {noticia.titulo || "Título de la noticia"}
        </Typography>

        <Typography variant="paragraph" className="noticia-descripcion">
          {noticia.subtitulo ||
            noticia.contenido?.slice(0, 100) + "..." ||
            "Sin descripción"}
        </Typography>

        <div className="noticia-info">
          <small>Autor: {noticia.autor || "Desconocido"}</small>
          <small>Estado: {noticia.estado || "Edición"}</small>
        </div>

        <div className="noticia-buttons">
          <Button
            size="sm"
            variant="outlined"
            className="btn-editar"
            onClick={() => onEditar(noticia)}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="outlined"
            className="btn-eliminar"
            onClick={() => onEliminar(noticia)}
          >
            Eliminar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default NoticiaCard;
