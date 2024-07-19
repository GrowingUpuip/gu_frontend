import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "./modal";
// import { DATA_OPORTUNIDAD } from "./data";
import { useAuth } from "../../components/authContext";

import { useRouter } from "next/router";

export default function Oportunidades() {
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
  const [oportunidadSeleccionada, setOportunidadSeleccionada] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async ({ nombre, correo, oportunidadSeleccionada }) => {
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
          id_oportunidad: oportunidadSeleccionada,
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
            <title>Oportunidades y Prácticas</title>
            <meta
              name="description"
              content="Descubre oportunidades de prácticas y empleos que te permitirán ganar experiencia valiosa y avanzar en tu carrera profesional."
            />
            <link rel="icon" href="/images/logo2.jpeg" />
          </Head>

          <header class="hero">
            <div class="hero-content">
              <h1>Descubre oportunidades de prácticas y empleos</h1>
              <p>
                que te permitirán ganar experiencia valiosa y avanzar en tu
                carrera profesional.
              </p>
            </div>
          </header>

          <main class="container">
            <section class="highlight">
              <div class="highlight-card">
                <h2>ERP (Enterprise Resource Planning)</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button class="btn btn-primary" onClick={openModal}>
                  Aplica ya
                </button>
              </div>
            </section>
            {showModal && (
              <Modal
                oportunidades={oportunidades}
                showModal={showModal}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
              />
            )}
            <section class="more-opportunities">
              <h3>Otras oportunidades</h3>
              <div class="opportunity-list">
                {oportunidades?.map((oportunidad) => (
                  <div key={oportunidad.id} class="opportunity-item">
                    <div class="opportunity-thumbnail"></div>
                    <div class="opportunity-details">
                      <h4>{oportunidad.titulo}</h4>
                      <p>{oportunidad.descripcion}</p>
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
          background-image: url("/images/oportunidades.jpg");
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
        .highlight {
          margin-bottom: 40px;
        }
        .highlight-card {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }
        .highlight-card h2 {
          margin-top: 0;
        }
        .highlight-card button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .more-opportunities {
          margin-top: 40px;
        }
        .opportunity-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .opportunity-item {
          display: flex;
          align-items: center;
        }
        .opportunity-thumbnail {
          width: 80px;
          height: 80px;
          background-color: #ddd;
          margin-right: 20px;
        }
        .opportunity-details h4 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
