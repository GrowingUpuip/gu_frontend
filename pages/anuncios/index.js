import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { useAuth } from "@/components/authContext";
import { useRouter } from "next/router";

export default function Anuncio() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [eventos, setEventos] = useState([]);
  const [eventoDestacado, setEventoDestacado] = useState(null); 

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la página
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    } else {
      // Fetch events data from API
      fetchEventos();
    }
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_HOST + "/api/events",
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      console.log(data)
      if (data?.data) {
        setEventos(data.data);

        // Find the most recent event
        const mostRecentEvent = data.data.reduce((latest, current) => {
          return new Date(current.attributes.date_start) >
            new Date(latest.attributes.date_start)
            ? current
            : latest;
        });
        setEventoDestacado(mostRecentEvent);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

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

          <header class="hero">
            <div class="hero-content">
              <h1>Explora nuestros próximos eventos y competencias</h1>
              <p>
                Desde hackatones hasta seminarios, hay algo para todos.
                Conéctate, aprende y crece con nuestra comunidad.
              </p>
            </div>
          </header>

          <main class="container">
            {eventoDestacado && (
              <section class="event-highlight">
                <div class="event-card">
                  <h2>{eventoDestacado.attributes.title}</h2>
                  <p>{eventoDestacado.attributes.description}</p>
                  <button class="btn btn-primary" onClick={openModal}>
                    Participa
                  </button>
                </div>
              </section>
            )}

            {showModal && (
              <Modal
                eventos={eventos}
                showModal={showModal}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
              />
            )}

            <section class="more-events">
              <h3>Más Eventos</h3>
              <div class="event-list">
                {eventos?.map((evento) => (
                  <div key={evento.id} class="event-item">
                    <div class="event-thumbnail"></div>
                    <div class="event-details">
                      <h4>{evento.attributes.title}</h4>
                      <p>{evento.attributes.description}</p>
                      <p>
                        <button
                          class="btn btn-primary"
                          onClick={() => openModal(evento.id)}
                        >
                          Participar
                        </button>
                      </p>
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
