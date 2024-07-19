import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/authContext";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
export default function Login() {
  const router = useRouter(); // Inicializa useRouter
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    console.log(email);
    event.preventDefault();
    const host = process.env.NEXT_PUBLIC_API_HOST; //|| "http://localhost:1337";
    const response = await fetch(`${host}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    if (response.ok) {
      login();
      router.push("/anuncios");
    } else {
      const data = await response.json();
      showToast(data.error.message, "error");
    }
  };

  return (
    <div
      class="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div class="row">
        <div class="col">
          <h2 class="mt-4">¡Únete a Growing Up+!😀😃😄😁</h2>
          <h1 class="text-center mb-4">
            Se parte de un mundo donde puedes seguir creciendo
          </h1>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label htmlFor="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div class="mb-3">
              <label htmlFor="password" class="form-label">
                Contraseña
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-primary mb-3">
                Aceptar y Ingresar
              </button>
              <p>O</p>
              <button
                type="button"
                class="btn btn-outline-secondary mb-3 d-flex align-items-center justify-content-center mx-auto"
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
          <div class="text-center mt-3">
            <Link href="/registrarse" legacyBehavior>
              <a>¿No tienes cuenta? Click Aquí</a>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
