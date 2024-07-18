import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Dashboard - Perfil del Usuario</title>
        <meta
          name="description"
          content="Gestiona tu perfil profesional desde un solo lugar."
        />
        <link rel="icon" href="/images/logo2.jpeg" />
      </Head>

      <div className="layout">
        <aside className="sidebar">
          <div className="logo">
            <img src="/images/logo2.jpeg" alt="Logo" />
          </div>
          <nav className="menu">
          <ul>
            <li><a href="/about">Acerca de Nosotros</a></li>
            <li><a href="/oportunidades">Oportunidades y Prácticas</a></li>
            <li><a href="#">Proyectos Colaborativos</a></li>
            <li><a href="#">Muro de Eventos</a></li>
            <li><a href="#">Mentoría</a></li>
            <li><a href="#">Más...</a></li>
            <li><a href="/perfil">Mi perfil</a></li>
          </ul>
          </nav>
        </aside>

        <main className="content">
          <header className="hero">
            <div className="hero-content">
              <h1>Bienvenido a tu Dashboard</h1>
              <p>Gestiona tu perfil profesional desde un solo lugar.</p>
            </div>
          </header>

          <div className="container">
            <section className="profile">
              <div className="profile-card">
                <div className="profile-header">
                  <img src="/images/Alonso.jpg" alt="User Profile" />
                  <h2>Marcos Medina</h2>
                  <p>Estudiante de Ingeniería de sistemas</p>
                  <p>marcosmedina@gmail.com</p>
                  <button className="btn btn-edit">Editar perfil</button>
                </div>
                <div className="profile-details">
                  <div className="details">
                    <h3>Detalles</h3>
                    <ul>
                      <li>Estudia en UIP</li>
                      <li>Vive en Ciudad de Panamá</li>
                      <li>De Ciudad de Panamá</li>
                      <li>Soltero</li>
                    </ul>
                  </div>
                  <div className="about-me">
                    <h3>Sobre mí</h3>
                    <p>
                      "Soy Marcos Medina, estudiante de tercer año de Ingeniería en Sistemas en la Universidad Interamericana de Panamá. Estoy enfocado en expandir mis competencias a través de cursos, pasantías, y participación en eventos relacionados con mi campo de estudio."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="courses">
              <h3>Cursos Realizados</h3>
              <div className="course-list">
                {cursos.map((curso) => (
                  <div key={curso.id} className="course-item">
                    <img src={curso.imagen} alt={curso.titulo} />
                    <h4>{curso.titulo}</h4>
                    <p>{curso.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <style jsx>{`
        .layout {
          display: flex;
        }
        .sidebar {
          width: 250px;
          background-color: #f8f9fa;
          padding: 20px;
        }
        .logo img {
          max-width: 100%;
          height: auto;
        }
        .menu ul {
          list-style-type: none;
          padding: 0;
        }
        .menu ul li {
          margin: 20px 0;
        }
        
        .content {
          flex: 1;
          padding: 20px;
        }
        .hero {
          background-image: url("/images/gente2.jpg");
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
        .profile {
          margin-bottom: 40px;
        }
        .profile-card {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .profile-header {
          margin-bottom: 20px;
        }
        .profile-header img {
          border-radius: 50%;
          width: 150px;
          height: 150px;
        }
        .profile-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .details,
        .about-me {
          margin-bottom: 20px;
          text-align: left;
        }
        .details ul {
          list-style: none;
          padding: 0;
        }
        .details ul li {
          margin-bottom: 10px;
        }
        .btn-edit {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .courses {
          margin-bottom: 40px;
        }
        .course-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .course-item {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          width: calc(50% - 10px);
        }
        .course-item img {
          width: 100%;
          border-radius: 8px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

// Ejemplo de cursos, reemplaza esto con los datos reales
const cursos = [
  {
    id: 1,
    titulo: "Beginner's Guide To Becoming A Professional Frontend Developer",
    descripcion: "Curso para principiantes sobre desarrollo frontend.",
    imagen: "/images/course1.jpg",
  },
  {
    id: 2,
    titulo: "Advanced JavaScript Techniques",
    descripcion: "Curso avanzado sobre técnicas de JavaScript.",
    imagen: "/images/course2.jpg",
  },
];
