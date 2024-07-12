import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo">
          <Link href="/" legacyBehavior>
            <a>
              <Image
                src="/images/logo2.jpeg"
                alt="Logo Growing Up+"
                width={50}
                height={50}
              />
            </a>
          </Link>
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link href="/about" legacyBehavior>
                <a className="nav-link text-white">Acerca de Nosotros</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/oportunidades" legacyBehavior>
                <a className="nav-link text-white">Oportunidades y Prácticas</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/proyecto" legacyBehavior>
                <a className="nav-link text-white">Proyectos Colaborativos</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" legacyBehavior>
                <a className="nav-link text-white">Mentoría</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/users" legacyBehavior>
                <a className="nav-link text-white">Más...</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior href="/login">
                <a className="btn btn-primary">Inicia Sesión o Regístrate</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
