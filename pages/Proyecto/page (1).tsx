import React, { useState } from 'react';
import './styles.css';

export default function proyectos(){
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Acerca de Nosotros</a></li>
            <li><a href="#">Oportunidades y Prácticas</a></li>
            <li><a href="#">Proyectos Colaborativos</a></li>
            <li><a href="#">Mentoría</a></li>
            <li><a href="#">Más...</a></li>
          </ul>
        </nav>
        <div className="login">
          <button onClick={handleOpenModal}>Inicia Sesión o Regístrate</button>
        </div>
      </header>
      <main>
        <section className="hero">
          <img src="/baner.jpg" alt="baner" />
          <div className="hero-text">
            <h1>Desarrolla y muestra tu talento a través de proyectos prácticos que destacan tus habilidades y creatividad.</h1>
          </div>
        </section>
        <section className="project-info">
          <div className="project-details">
            <h2>Project Assistant - IT Conference</h2>
            <p>15 Abril 2024 - Publicado por: Nombre del Publicador</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button>Aplica ya</button>
          </div>
          <aside className="other-projects">
            <h3>Otras proyectos</h3>
            <ul>
              <li>
                <img src="/path/to/project-thumbnail.jpg" alt="Project Thumbnail" />
                <div className="project-info">
                  <h4>Title</h4>
                  <p>Description duis aute irure dolor in reprehenderit in voluptate velit...</p>
                </div>
                <span className="time">Today - 23 min</span>
              </li>
              <li>
                <img src="/path/to/project-thumbnail.jpg" alt="Project Thumbnail" />
                <div className="project-info">
                  <h4>Title</h4>
                  <p>Description duis aute irure dolor in reprehenderit in voluptate velit...</p>
                </div>
                <span className="time">Today - 23 min</span>
              </li>
              <li>
                <img src="/path/to/project-thumbnail.jpg" alt="Project Thumbnail" />
                <div className="project-info">
                  <h4>Title</h4>
                  <p>Description duis aute irure dolor in reprehenderit in voluptate velit...</p>
                </div>
                <span className="time">Today - 23 min</span>
              </li>
            </ul>
          </aside>
        </section>
      </main>
      <footer>
        <div className="footer-links">
          <div>
            <h4>Navega</h4>
            <ul>
              <li><a href="#">Acerca de Nosotros</a></li>
              <li><a href="#">Oportunidades y Prácticas</a></li>
              <li><a href="#">Proyectos Colaborativos</a></li>
              <li><a href="#">Muro de Eventos</a></li>
              <li><a href="#">Mentoría</a></li>
            </ul>
          </div>
          <div>
            <h4>Navega</h4>
            <ul>
              <li><a href="#">Feedback Profesional</a></li>
              <li><a href="#">Mi Comunidad</a></li>
            </ul>
          </div>
          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Eventos Destacados</a></li>
              <li><a href="#">Top 10 Growing Up</a></li>
              <li><a href="#">Fotos y Videos</a></li>
              <li><a href="#">F.A.Q.</a></li>
            </ul>
          </div>
        </div>
        <div className="socialMedia">
          <a href="https://facebook.com" target="_blank">Facebook</a>
          <p> </p>
          <a href="https://twitter.com" target="_blank">Twitter</a>
          <p> </p>
          <a href="https://www.instagram.com/growing_up_plus?igsh=MWpnYnd2aHA2cjIwaw==" target="_blank">Instagram</a>
        </div>
      </footer>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Inicia Sesión o Regístrate</h2>
        <p>Aquí puedes añadir tu formulario de inicio de sesión o registro.</p>
      </Modal>
    </>
  );
};
};
