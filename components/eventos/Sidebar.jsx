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
<<<<<<< HEAD
      <a href="#" className="list-group-item list-group-item-action">
        Proyectos Colaborativos
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Mentoría
      </a>
      <Link href="/anuncios" legacyBehavior>
        <a className="list-group-item list-group-item-action">Anuncios</a>
=======
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
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
      </Link>

      <a href="#" className="list-group-item list-group-item-action">
        Más...
      </a>
    </div>
  );
};

export default Sidebar;
