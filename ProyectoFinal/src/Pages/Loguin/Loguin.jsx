import React, { useState } from "react";
import './Loguin.css';

const Loguin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes enviar los datos al backend con fetch o axios
        console.log("Correo:", email);
        console.log("Contraseña:", password);
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Bienvenidos</h1>

                <div
                    className="error-message"
                    style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
                ></div>

                <div className="input-box">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Correo"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="bx bxs-envelope"></i>
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>

                <button type="submit" className="btn">
                    Iniciar Sesión
                </button>

                <div className="remember-forgot">
                    <a href="/Restablecer">Olvidaste la Contraseña</a>
                </div>
            </form>
        </div>
    );
};

export default Loguin;
