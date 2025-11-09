import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const NoticiaCard = ({ noticia, onEditar }) => {
  return (
    <Card className="flex flex-col md:flex-row w-full bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden mb-4">
      {/* Imagen */}
      <CardHeader className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
        <img
          src={noticia.imagenURL || "https://via.placeholder.com/300x200"}
          alt={noticia.titulo}
          className="w-full h-full object-cover"
        />
      </CardHeader>

      {/* Contenido */}
      <CardBody className="flex flex-col justify-between p-4 md:p-6 w-full">
        <div>
          <Typography
            variant="small"
            className="text-blue-400 uppercase mb-1 font-semibold"
          >
            {noticia.categoria || "Sin categoría"}
          </Typography>

          <Typography variant="h5" className="font-bold mb-2">
            {noticia.titulo || "Título de la noticia"}
          </Typography>

          <Typography variant="paragraph" className="text-gray-300 mb-4">
            {noticia.subtitulo || noticia.contenido || "Resumen de la noticia..."}
          </Typography>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <Typography variant="small" className="text-gray-400">
            Autor: {noticia.autor || "Desconocido"}
          </Typography>
          <Typography variant="small" className="text-gray-400">
            Estado: {noticia.estado || "Edición"}
          </Typography>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            size="sm"
            variant="outlined"
            className="text-blue-400 border-blue-400 hover:bg-blue-500 hover:text-white transition"
            onClick={() => onEditar(noticia)}
          >
            Editar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default NoticiaCard;
