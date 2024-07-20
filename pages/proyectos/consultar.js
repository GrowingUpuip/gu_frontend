import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
<<<<<<< HEAD

export default function Anuncio() {
  const [showModal, setShowModal] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [eventoDestacado, setEventoDestacado] = useState(null);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "proyectos"));
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
=======
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
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

<<<<<<< HEAD
  const handleSubmit = async ({ nombre, correo, eventoSeleccionado }) => {
=======
  const handleSubmit = async ({ nombre, correo, proyectoSeleccionado }) => {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
    try {
      const registroRef = collection(db, "registros");
      await addDoc(registroRef, {
        nombre,
        correo,
<<<<<<< HEAD
        id_evento: eventoSeleccionado,
      });
      alert("Registro exitoso");
      closeModal();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un problema al registrar, intenta de nuevo.");
=======
        id_proyecto: proyectoSeleccionado,
      });
      showToast("Registro exitoso", "done");
      closeModal();
    } catch (error) {
      console.error("Error al registrar:", error);
      showToast("Hubo un problema al registrar, intenta de nuevo.", "error");
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
    }
  };

  return (
    <div>
      <Head>
<<<<<<< HEAD
        <title>Eventos y Competencias</title>
        <meta
          name="description"
          content="Explora nuestros próximos eventos y competencias"
=======
        <title>Proyectos Profesionales</title>
        <meta
          name="description"
          content="Explora nuestros proyectos profesionales"
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="hero">
        <div className="hero-content">
<<<<<<< HEAD
          <h1>Explora nuestros Proyectos </h1>
          <p>
            Desde colaboraciones innovadoras hasta proyectos de investigación,
            tenemos algo para todos. Únete, aprende y crece con nuestra
            comunidad de proyectos.
=======
          <h1>Explora nuestros proyectos</h1>
          <p>
            Desde proyectos innovadores hasta programas de mentoría, tenemos
            algo para todos. Conéctate, adquiere experiencia y crece con nuestra
            comunidad de profesionales.
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          </p>
        </div>
      </header>

      <main className="container">
<<<<<<< HEAD
        {eventoDestacado && (
          <section className="event-highlight">
            <div className="event-card">
              <h2>{eventoDestacado.title}</h2>
              <p>{eventoDestacado.description}</p>
=======
        {proyectoDestacado && (
          <section className="proyecto-highlight">
            <div className="proyecto-card">
              <h2>{proyectoDestacado.titulo}</h2>
              <p>{proyectoDestacado.descripcion}</p>
              <p>
                <strong>Fecha de inicio:</strong>{" "}
                {proyectoDestacado.fecha_inicio}
              </p>
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
              <button className="btn btn-primary" onClick={openModal}>
                Participa
              </button>
            </div>
          </section>
        )}

        {showModal && (
          <Modal
<<<<<<< HEAD
            eventos={eventos}
=======
            opcion={"titulo"}
            eventos={proyectos}
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
            showModal={showModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
          />
        )}

<<<<<<< HEAD
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
=======
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
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
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
<<<<<<< HEAD
        .event-highlight {
          margin-bottom: 40px;
        }
        .event-card {
=======
        .proyecto-highlight {
          margin-bottom: 40px;
        }
        .proyecto-card {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
<<<<<<< HEAD
        .event-card h2 {
          margin-top: 0;
        }
        .event-card button {
=======
        .proyecto-card h2 {
          margin-top: 0;
        }
        .proyecto-card button {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
<<<<<<< HEAD
        .more-events {
          margin-top: 40px;
        }
        .event-list {
=======
        .more-proyectos {
          margin-top: 40px;
        }
        .proyecto-list {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
<<<<<<< HEAD
        .event-item {
          display: flex;
          align-items: center;
        }
        .event-thumbnail {
=======
        .proyecto-item {
          display: flex;
          align-items: center;
        }
        .proyecto-thumbnail {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          width: 80px;
          height: 80px;
          background-color: #ddd;
          margin-right: 20px;
        }
<<<<<<< HEAD
        .event-details h4 {
=======
        .proyecto-details h4 {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          margin: 0;
        }
      `}</style>
    </div>
  );
}
