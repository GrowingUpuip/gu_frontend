import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
const Header = () => {
  const { logout, isLoggedIn } = useAuth();
  const router = useRouter(); // Inicializa useRouter
  const salirPaginaInicio = () => {
    logout();
    router.push("/login");
  };
  return (
    <header className="p-3 mb-3 border-bottom ">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link href="/" legacyBehavior>
            <a>
              <Image
                src="/images/logo.png"
                alt="Logo Growing Up+"
                width={50}
                height={50}
              />
            </a>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/anuncios" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Anuncios</a>
              </Link>
            </li>
            <li>
              <Link href="/practicas/consultar" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Prácticas</a>
              </Link>
            </li>
            <li>
              <Link href="/proyectos/consultar" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Proyectos</a>
              </Link>
            </li>
            <li>
              <Link href="https://uip.edu.pa/" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Más...</a>
              </Link>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="dropdown text-end">
            <a
              href="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Image
                src="/images/98681.jpeg"
                alt="mdo"
                width={32}
                height={32}
                className="rounded-circle"
              />
            </a>
            <ul className="dropdown-menu text-small">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link legacyBehavior href="/login">
                      <a className="dropdown-item">Inicia Sesión</a>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
              <li>
                <Link legacyBehavior href="/registrarse">
                  <a className="dropdown-item">Registrarse</a>
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link legacyBehavior href="/eventos">
                      <a className="dropdown-item">Administrar eventos</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/practicas">
                      <a className="dropdown-item">Administrar practicas</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/proyectos">
                      <a className="dropdown-item">Administrar proyectos</a>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={salirPaginaInicio}>
                      Salir
                    </a>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
