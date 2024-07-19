import React from "react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action">
        Inicio
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Acerca de Nosotros
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Oportunidades y Prácticas
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Proyectos Colaborativos
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Mentoría
      </a>
      <Link href="/anuncios" legacyBehavior>
        <a className="list-group-item list-group-item-action">Anuncios</a>
      </Link>

      <a href="#" className="list-group-item list-group-item-action">
        Más...
      </a>
    </div>
  );
};

export default Sidebar;
