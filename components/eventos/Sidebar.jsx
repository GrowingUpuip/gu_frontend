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
      <Link href="/proyectos" legacyBehavior>
        <a href="#" className="list-group-item list-group-item-action">
          Administrar Proyectos
        </a>
      </Link>
      <Link href="/practicas" legacyBehavior>
        <a href="#" className="list-group-item list-group-item-action">
          Administrar Practicas
        </a>
      </Link>

      <Link href="/anuncios" legacyBehavior>
        <a className="list-group-item list-group-item-action">
          Administrar Anuncios
        </a>
      </Link>

      <a href="#" className="list-group-item list-group-item-action">
        Más...
      </a>
    </div>
  );
};

export default Sidebar;
