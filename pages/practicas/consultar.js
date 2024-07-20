import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
export default function Practicas() {
  const [showModal, setShowModal] = useState(false);
  const [practicas, setPracticas] = useState([]);
  const [practicaDestacada, setPracticaDestacada] = useState(null);

  useEffect(() => {
    fetchPracticas();
  }, []);

  const fetchPracticas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "practicas"));
      const practicasData = [];
      querySnapshot.forEach((doc) => {
        practicasData.push({ id: doc.id, ...doc.data() });
      });
      setPracticas(practicasData);

      const mostRecentPractica = practicasData.reduce((latest, current) => {
        return new Date(current.fecha_inicio) > new Date(latest.fecha_inicio)
          ? current
          : latest;
      }, practicasData[0]);
      setPracticaDestacada(mostRecentPractica);
    } catch (error) {
      console.error("Error fetching practicas:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async ({ nombre, correo, practicaSeleccionada }) => {
    try {
      const registroRef = collection(db, "registros");
      await addDoc(registroRef, {
        nombre,
        correo,
        id_practica: practicaSeleccionada,
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
        <title>Prácticas Profesionales</title>
        <meta
          name="description"
          content="Explora nuestras prácticas profesionales"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="hero">
        <div className="hero-content">
          <h1>Explora nuestras prácticas</h1>
          <p>
            Desde prácticas profesionales hasta programas de mentoría, tenemos
            algo para todos. Conéctate, adquiere experiencia y crece con nuestra
            comunidad de profesionales.
          </p>
        </div>
      </header>

      <main className="container">
        {practicaDestacada && (
          <section className="practica-highlight">
            <div className="practica-card">
              <h2>{practicaDestacada.titulo}</h2>
              <p>{practicaDestacada.descripcion}</p>
              <p>
                <strong>Fecha de inicio:</strong>{" "}
                {practicaDestacada.fecha_inicio}
              </p>
              <button className="btn btn-primary" onClick={openModal}>
                Participa
              </button>
            </div>
          </section>
        )}

        {showModal && (
          <Modal
            opcion={"titulo"}
            eventos={practicas}
            showModal={showModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
          />
        )}

        <section className="more-practicas">
          <h3>Más Prácticas</h3>
          <div className="practica-list">
            {practicas.map((practica) => (
              <div key={practica.id} className="practica-item">
                <div className="practica-thumbnail"></div>
                <div className="practica-details">
                  <h4>{practica.titulo}</h4>
                  <p>{practica.descripcion}</p>

                  <p>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(practica.id)}
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
          background-image: url("/images/practicas.png");
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
        .practica-highlight {
          margin-bottom: 40px;
        }
        .practica-card {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
        .practica-card h2 {
          margin-top: 0;
        }
        .practica-card button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .more-practicas {
          margin-top: 40px;
        }
        .practica-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .practica-item {
          display: flex;
          align-items: center;
        }
        .practica-thumbnail {
          width: 80px;
          height: 80px;
          background-color: #ddd;
          margin-right: 20px;
        }
        .practica-details h4 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
