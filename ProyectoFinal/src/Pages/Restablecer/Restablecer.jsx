import React, { useState } from "react";
import "../Restablecer/Restablecer.css";

const RecuperarContrasena = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes hacer la petición al backend Java
        console.log("Correo enviado a:", email);

        fetch("http://localhost:8080/tuApp/enviar-enlace-recuperacion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => alert(data.mensaje))
            .catch(() => alert("Error al enviar el enlace"));
    };

    return (
        <div className="wrapper">
            <h1>Recuperar Contraseña</h1>
            <p style={{ textAlign: "center", marginTop: 10, marginBottom: 25 }}>
                Escribe tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo electrónico"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="bx bx-envelope"></i>
                </div>
                <button type="submit" className="btn">Obtener Código</button>
                <div className="remember-forgot">
                    <a href="/">Volver al inicio</a>
                </div>
            </form>
        </div>
    );
};

export default RecuperarContrasena;
