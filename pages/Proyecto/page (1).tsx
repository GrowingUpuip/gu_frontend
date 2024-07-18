import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const Page = () => {
  return (
    <>
      <header className="bg-light shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item"><a className="nav-link" href="/about">Inicio</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Acerca de Nosotros</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Oportunidades y Prácticas</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Proyectos Colaborativos</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Mentoría</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Más...</a></li>
            </ul>
          </nav>
          <div className="login">
            <a href="#"><button className="btn btn-primary">Inicia Sesión o Regístrate</button></a>
          </div>
        </div>
      </header>
      <main>
        <section className="hero position-relative text-center text-white">
          <img src="/baner.jpg" alt="baner" className="w-100" style={{ height: '300px', objectFit: 'cover' }} />
          <div className="hero-text position-absolute top-50 start-50 translate-middle">
            <h1>Desarrolla y muestra tu talento a través de proyectos prácticos que destacan tus habilidades y creatividad.</h1>
          </div>
        </section>
        <section className="project-info container py-5 d-flex flex-column flex-md-row">
          <div className="project-details flex-grow-1 pe-md-3">
            <h2>Project Assistant - IT Conference</h2>
            <p>15 Abril 2024 - Publicado por: Nombre del Publicador</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button className="btn btn-primary">Aplica ya</button>
          </div>
          <aside className="other-projects flex-grow-1 ps-md-3 mt-4 mt-md-0">
            <h3>Otras proyectos</h3>
            <ul className="list-unstyled">
              <li className="d-flex mb-3">
                <img src="/path/to/project-thumbnail.jpg" alt="Project Thumbnail" className="me-3" style={{ maxHeight: '50px', borderRadius: '5px' }} />
                <div className="project-info">
                  <h4>Title</h4>
                  <p>Description duis aute irure dolor in reprehenderit in voluptate velit...</p>
                </div>
                <span className="time ms-3 text-muted">Today - 23 min</span>
              </li>
              <li className="d-flex mb-3">
                <img src="/path/to/project-thumbnail.jpg" alt="Project Thumbnail" className="me-3" style={{ maxHeight: '50px', borderRadius: '5px' }} />
                <div className="project-info">
                  <h4>Title</h4>
                  <p>Description duis aute irure dolor in reprehenderit in voluptate velit...</p>
                </div>
                <span className="time ms-3 text-muted">Today - 23 min</span>
              </li>
              <li className="d-flex mb-3">
                <img src="/path/to/project-thumbnail.jpg" alt="Project Thumbnail" className="me-3" style={{ maxHeight: '50px', borderRadius: '5px' }} />
                <div className="project-info">
                  <h4>Title</h4>
                  <p>Description duis aute irure dolor in reprehenderit in voluptate velit...</p>
                </div>
                <span className="time ms-3 text-muted">Today - 23 min</span>
              </li>
            </ul>
          </aside>
        </section>
      </main>
      <footer className="bg-light py-4">
        <div className="container d-flex justify-content-between flex-wrap">
          <div className="footer-links mb-4">
            <h4>Navega</h4>
            <ul className="list-unstyled">
              <li><a href="#">Acerca de Nosotros</a></li>
              <li><a href="#">Oportunidades y Prácticas</a></li>
              <li><a href="#">Proyectos Colaborativos</a></li>
              <li><a href="#">Muro de Eventos</a></li>
              <li><a href="#">Mentoría</a></li>
            </ul>
          </div>
          <div className="footer-links mb-4">
            <h4>Navega</h4>
            <ul className="list-unstyled">
              <li><a href="#">Feedback Profesional</a></li>
              <li><a href="#">Mi Comunidad</a></li>
            </ul>
          </div>
          <div className="footer-links mb-4">
            <h4>Recursos</h4>
            <ul className="list-unstyled">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Eventos Destacados</a></li>
              <li><a href="#">Top 10 Growing Up</a></li>
              <li><a href="#">Fotos y Videos</a></li>
              <li><a href="#">F.A.Q.</a></li>
            </ul>
          </div>
        </div>
        <div className="container text-center mt-4">
          <div className="socialMedia">
            <a href="https://facebook.com" target="_blank" className="me-3">Facebook</a>
            <a href="https://twitter.com" target="_blank" className="me-3">Twitter</a>
            <a href="https://www.instagram.com/growing_up_plus?igsh=MWpnYnd2aHA2cjIwaw==" target="_blank">Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
