import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/authContext";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
export default function Login() {
  const router = useRouter(); // Inicializa useRouter
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    console.log(email);
    event.preventDefault();

    const host = process.env.NEXT_PUBLIC_API_HOST; //|| "http://localhost:1337";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      login();
      router.push("/eventos");
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    }
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
