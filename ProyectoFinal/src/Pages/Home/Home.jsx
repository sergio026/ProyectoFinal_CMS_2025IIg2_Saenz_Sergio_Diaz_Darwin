import React from "react";
import "./Home.css"; // crea este archivo para los estilos

export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>📰 Noticias 360</h1>
                <p>Las noticias más importantes del día en un solo lugar</p>
            </header>

            <section className="news-section">
                <article className="news-card">
                    <img src="https://picsum.photos/600/300?random=1" alt="Noticia 1" />
                    <div className="news-content">
                        <h2>Gobierno anuncia nuevas medidas económicas</h2>
                        <p>
                            El presidente presentó un nuevo paquete de reformas destinadas a
                            estabilizar la economía nacional y fomentar la inversión local.
                        </p>
                        <button className="read-more">Leer más</button>
                    </div>
                </article>

                <article className="news-card">
                    <img src="https://picsum.photos/600/300?random=2" alt="Noticia 2" />
                    <div className="news-content">
                        <h2>El avance de la tecnología en la educación</h2>
                        <p>
                            Las herramientas digitales continúan transformando las aulas,
                            mejorando la experiencia de aprendizaje en todos los niveles.
                        </p>
                        <button className="read-more">Leer más</button>
                    </div>
                </article>

                <article className="news-card">
                    <img src="https://picsum.photos/600/300?random=3" alt="Noticia 3" />
                    <div className="news-content">
                        <h2>Nuevo récord en energías renovables</h2>
                        <p>
                            El país alcanzó un hito histórico en producción de energía solar,
                            reduciendo la dependencia de los combustibles fósiles.
                        </p>
                        <button className="read-more">Leer más</button>
                    </div>
                </article>
            </section>
        </div>
    );
}
