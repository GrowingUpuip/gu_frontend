import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "/components/authContext";

import Image from "next/image";
export default function Login() {
  const router = useRouter(); // Inicializa useRouter
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    login();
    router.push("/anuncios");
    
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col">
          <h2 className="mt-4">¡Únete a Growing Up+!😀😃😄😁</h2>
          <h1 className="text-center mb-4">
            Se parte de un mundo donde puedes seguir creciendo
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary mb-3">
                Aceptar y Ingresar
              </button>
              <p>O</p>
              <button
                type="button"
                className="btn btn-outline-secondary mb-3 d-flex align-items-center justify-content-center mx-auto"
              >
                <Image
                  src="/images/Google__G__logo.svg.png"
                  alt="Google"
                  width={20}
                  height={20}
                  style={{ marginRight: "10px" }}
                />
                Continuar con Google
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <a href="#">¿Ya tienes cuenta? Click Aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
}
