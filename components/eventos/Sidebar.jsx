import React from "react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action">
        Inicio
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Acerca de Nosotros
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Oportunidades y Prácticas
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Proyectos Colaborativos
      </a>
      <a href="#" class="list-group-item list-group-item-action">
        Mentoría
      </a>
      <Link href="/anuncios" legacyBehavior>
        <a class="list-group-item list-group-item-action">Anuncios</a>
      </Link>

      <a href="#" class="list-group-item list-group-item-action">
        Más...
      </a>
    </div>
  );
};

export default Sidebar;
