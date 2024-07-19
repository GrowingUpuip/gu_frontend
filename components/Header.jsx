import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/components/authContext";
const Header = () => {
  const { logout, isLoggedIn } = useAuth();
  const router = useRouter(); // Inicializa useRouter
  const salirPaginaInicio = () => {
    logout();
    router.push("/login");
  };
  return (
    <header class="p-3 mb-3 border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
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

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/about" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">
                  Acerca de Nosotros
                </a>
              </Link>
            </li>
            <li>
              <Link href="#" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Prácticas</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Proyectos</a>
              </Link>
            </li>
            <li>
              <Link href="/users" legacyBehavior>
                <a className="nav-link px-2 link-body-emphasis">Más...</a>
              </Link>
            </li>
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input
              type="search"
              class="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div class="dropdown text-end">
            <a
              href="#"
              class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Image
                src="/images/98681.jpeg"
                alt="mdo"
                width={32}
                height={32}
                class="rounded-circle"
              />
            </a>
            <ul class="dropdown-menu text-small">
              <li>
                <Link legacyBehavior href="/login">
                  <a className="dropdown-item">Inicia Sesión</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/registrarse">
                  <a class="dropdown-item">Registrarse</a>
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link legacyBehavior href="/eventos">
                      <a class="dropdown-item">Administrar eventos</a>
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" onClick={salirPaginaInicio}>
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
