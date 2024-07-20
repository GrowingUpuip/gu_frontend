import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
export default function Proyectos() {
  const [showModal, setShowModal] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [proyectoDestacado, setProyectoDestacado] = useState(null);

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "proyectos"));
      const proyectosData = [];
      querySnapshot.forEach((doc) => {
        proyectosData.push({ id: doc.id, ...doc.data() });
      });
      setProyectos(proyectosData);

      const mostRecentProyecto = proyectosData.reduce((latest, current) => {
        return new Date(current.fecha_inicio) > new Date(latest.fecha_inicio)
          ? current
          : latest;
      }, proyectosData[0]);
      setProyectoDestacado(mostRecentProyecto);
    } catch (error) {
      console.error("Error fetching proyectos:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async ({ nombre, correo, proyectoSeleccionado }) => {
    try {
      const registroRef = collection(db, "registros");
      await addDoc(registroRef, {
        nombre,
        correo,
        id_proyecto: proyectoSeleccionado,
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
        <title>Proyectos Profesionales</title>
        <meta
          name="description"
          content="Explora nuestros proyectos profesionales"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="hero">
        <div className="hero-content">
          <h1>Explora nuestros proyectos</h1>
          <p>
            Desde proyectos innovadores hasta programas de mentoría, tenemos
            algo para todos. Conéctate, adquiere experiencia y crece con nuestra
            comunidad de profesionales.
          </p>
        </div>
      </header>

      <main className="container">
        {proyectoDestacado && (
          <section className="proyecto-highlight">
            <div className="proyecto-card">
              <h2>{proyectoDestacado.titulo}</h2>
              <p>{proyectoDestacado.descripcion}</p>
              <p>
                <strong>Fecha de inicio:</strong>{" "}
                {proyectoDestacado.fecha_inicio}
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
            eventos={proyectos}
            showModal={showModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
          />
        )}

        <section className="more-proyectos">
          <h3>Más Proyectos</h3>
          <div className="proyecto-list">
            {proyectos.map((proyecto) => (
              <div key={proyecto.id} className="proyecto-item">
                <div className="proyecto-thumbnail"></div>
                <div className="proyecto-details">
                  <h4>{proyecto.titulo}</h4>
                  <p>{proyecto.descripcion}</p>

                  <p>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(proyecto.id)}
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

      <style jsx>{`
        .hero {
          background-image: url("/images/proyectos.jpg");
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
        .proyecto-highlight {
          margin-bottom: 40px;
        }
        .proyecto-card {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
        .proyecto-card h2 {
          margin-top: 0;
        }
        .proyecto-card button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .more-proyectos {
          margin-top: 40px;
        }
        .proyecto-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .proyecto-item {
          display: flex;
          align-items: center;
        }
        .proyecto-thumbnail {
          width: 80px;
          height: 80px;
          background-color: #ddd;
          margin-right: 20px;
        }
        .proyecto-details h4 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
