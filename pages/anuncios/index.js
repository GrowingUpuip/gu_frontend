import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { eventos } from "./data";
import { useAuth } from "../../components/authContext";

import { useRouter } from "next/router";

export default function Anuncio() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la página
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async ({ nombre, correo, eventoSeleccionado }) => {
    // Llamar a la API para registrar los datos
    try {
      const response = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          id_evento: eventoSeleccionado,
        }),
      });

      if (response.ok) {
        alert("Registro exitoso");
        closeModal();
      } else {
        alert("Hubo un problema al registrar, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un problema al registrar, intenta de nuevo.");
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Head>
            <title>Eventos y Competencias</title>
            <meta
              name="description"
              content="Explora nuestros próximos eventos y competencias"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <header className="hero">
            <div className="hero-content">
              <h1>Explora nuestros próximos eventos y competencias</h1>
              <p>
                Desde hackatones hasta seminarios, hay algo para todos.
                Conéctate, aprende y crece con nuestra comunidad.
              </p>
            </div>
          </header>

          <main className="container">
            <section className="event-highlight">
              <div className="event-card">
                <h2>Hackathon Copa 2024</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <button className="btn btn-primary" onClick={openModal}>
                  Participa
                </button>
              </div>
            </section>
            {showModal && (
              <Modal
                eventos={eventos}
                showModal={showModal}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
              />
            )}
            <section className="more-events">
              <h3>Más Eventos</h3>
              <div className="event-list">
                {eventos?.map((evento) => (
                  <div key={evento.id} className="event-item">
                    <div className="event-thumbnail"></div>
                    <div className="event-details">
                      <h4>{evento.titulo}</h4>
                      <p>{evento.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      ) : (
        <p>Redirigiendo a la página de inicio de sesión...</p>
      )}

      <style jsx>{`
        .hero {
          background-image: url("/images/fondos_anuncios.jpg");
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          padding: 100px 20px;
        }
        .hero-content {
          background-color: rgba(0, 0, 0, 0.5);
          display: inline-block;
          padding: 20px;
        }
        .container {
          padding: 20px;
        }
        .event-highlight {
          margin-bottom: 40px;
        }
        .event-card {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
        .event-card h2 {
          margin-top: 0;
        }
        .event-card button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .more-events {
          margin-top: 40px;
        }
        .event-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .event-item {
          display: flex;
          align-items: center;
        }
        .event-thumbnail {
          width: 80px;
          height: 80px;
          background-color: #ddd;
          margin-right: 20px;
        }
        .event-details h4 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
