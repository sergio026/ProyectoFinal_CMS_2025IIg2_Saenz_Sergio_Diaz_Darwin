import React, { useState, useEffect } from "react";
import "./RegistrarUsuario.css";

export default function RegistrarUsuario({ modo = "crear", usuarioData = null, roles = [] }) {
    const [formData, setFormData] = useState({
        idU: "",
        numeroIdentificacion: "",
        nombreU: "",
        telefono: "",
        direccion: "",
        correo: "",
        contrasenia: "",
        salario: "",
        rol: "",
    });

    useEffect(() => {
        if (modo === "editar" && usuarioData) {
            setFormData({
                idU: usuarioData.idUsuario || "",
                numeroIdentificacion: usuarioData.identificacionPersona || "",
                nombreU: usuarioData.nombrePersona || "",
                telefono: usuarioData.telefonoPersona || "",
                direccion: usuarioData.direccionPersona || "",
                correo: usuarioData.correo || "",
                contrasenia: usuarioData.contrasenia || "",
                salario: usuarioData.salarioEmpleado || "",
                rol: usuarioData.tipoRol || "",
            });
        }
    }, [modo, usuarioData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("Usuario registrado correctamente");
    };

    return (
        <div className="registrar-container">
            <h1>{modo === "editar" ? "Editar Usuario" : "Registrar Usuario"}</h1>

            <form onSubmit={handleSubmit} className="registrar-form">
                <div className="input-box">
                    <input
                        type="text"
                        name="idU"
                        placeholder="Número ID"
                        value={formData.idU}
                        onChange={handleChange}
                        required
                        readOnly={modo === "editar"}
                    />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        name="numeroIdentificacion"
                        placeholder="Número de Identificación"
                        value={formData.numeroIdentificacion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        name="nombreU"
                        placeholder="Nombre Completo"
                        value={formData.nombreU}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        name="telefono"
                        placeholder="Número de Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo Electrónico"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>

                {modo === "crear" && (
                    <div className="input-box">
                        <input
                            type="password"
                            name="contrasenia"
                            placeholder="Contraseña"
                            value={formData.contrasenia}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className="input-box">
                    <input
                        type="text"
                        name="salario"
                        placeholder="Salario"
                        value={formData.salario}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un Rol</option>
                        {roles.map((r, i) => (
                            <option key={i} value={r.tipoRol}>
                                {r.tipoRol}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn">
                    Guardar
                </button>

                <a href="/usuarios" className="btn btn-atras">
                    Cerrar
                </a>
            </form>
        </div>
    );
}
