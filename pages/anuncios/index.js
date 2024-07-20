import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
export default function Anuncio() {
  const [showModal, setShowModal] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [eventoDestacado, setEventoDestacado] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "anuncios"));
      const eventosData = [];
      querySnapshot.forEach((doc) => {
        eventosData.push({ id: doc.id, ...doc.data() });
      });
      setEventos(eventosData);

      const mostRecentEvent = eventosData.reduce((latest, current) => {
        return new Date(current.date_start) > new Date(latest.date_start)
          ? current
          : latest;
      }, eventosData[0]);
      setEventoDestacado(mostRecentEvent);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const openModal = (eventoId = null) => {
    setEventoSeleccionado(eventoId);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async ({ nombre, correo, eventoSeleccionado }) => {
    try {
      const registroRef = collection(db, "registros");
      await addDoc(registroRef, {
        nombre,
        correo,
        id_evento: eventoSeleccionado,
      });
      showToast("Registro exitoso", "done");
      closeModal();
    } catch (error) {
      console.error("Error al registrar:", error);
      showToast("Hubo un problema al registrar, intenta de nuevo.", "error");
    }
  };

  return (
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
            Desde hackatones hasta seminarios, hay algo para todos. Conéctate,
            aprende y crece con nuestra comunidad.
          </p>
        </div>
      </header>

      <main className="container">
        {eventoDestacado && (
          <section className="event-highlight">
            <div className="event-card">
              <h2>{eventoDestacado.title}</h2>
              <p>{eventoDestacado.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => openModal(eventoDestacado.id)}
              >
                Participa
              </button>
            </div>
          </section>
        )}

        {showModal && (
          <Modal
            opcion={"title"}
            eventos={eventos}
            eventoSeleccionado={eventoSeleccionado}
            showModal={showModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
          />
        )}

        <section className="more-events">
          <h3>Más Eventos</h3>
          <div className="event-list">
            {eventos.map((evento) => (
              <div key={evento.id} className="event-item">
                <div className="event-thumbnail"></div>
                <div className="event-details">
                  <h4>{evento.title}</h4>
                  <p>{evento.description}</p>
                  <p>
                    <button
                      className="btn btn-primary"
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
        <ToastContainer />
      </main>
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
