"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import DatePicker from 'react-datepicker';

const ProjectSelectionPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <header className="bg-light shadow-sm py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <img src="/logo.svg" alt="logo" style={{ height: '50px' }} />
            </div>
            <div className="d-flex flex-column align-items-center">
              <button className="btn btn-outline-secondary rounded-circle profile-button mb-2">
                <img src="/profile.jpg" alt="Profile" className="profile-img" />
              </button>
              <input type="text" className="form-control search-bar" placeholder="Buscar..." />
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="card me-4" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Navegación</h5>
                <ul className="list-group">
                  <li className="list-group-item"><a href="/about">Inicio</a></li>
                  <li className="list-group-item"><a href="#">Acerca de Nosotros</a></li>
                  <li className="list-group-item"><a href="#">Oportunidades y Prácticas</a></li>
                  <li className="list-group-item"><a href="#">Proyectos Colaborativos</a></li>
                  <li className="list-group-item"><a href="#">Mentoría</a></li>
                  <li className="list-group-item"><a href="#">Más...</a></li>
                </ul>
              </div>
            </div>
            <div className="card flex-grow-1">
              <div className="card-body">
                <h2 className="card-title">Project Assistant - IT Conference</h2>
                <p className="card-text">15 Abril 2024 - Publicado por: Nombre del Publicador</p>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                <button className="btn btn-primary">Aplica ya</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mt-5">
        <section className="row">
          <div className="col-md-3">
            {/* Calendario */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Calendario</h5>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  inline
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
          <div className="col-md-9 bg-white p-4">
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
          </div>
        </section>
      </main>

    </>
  );
};

export default ProjectSelectionPage;
