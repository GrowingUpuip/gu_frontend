import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
const Registrarse = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const host = process.env.NEXT_PUBLIC_API_HOST; //|| "http://localhost:1337";
    const response = await fetch(`${host}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      showToast(data.error.message, "error");
    }
  };

  return (
    <main class="container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <Image
          src="/images/logo.png"
          alt="Google"
          width={70}
          height={70}
          class="mb-4"
        />
        <h1 class="h3 mb-3 fw-normal">Registrarse</h1>

        <div class="col-md-7 col-lg-8">
          <div class="row">
            <div class="col-12">
              <label for="username" class="form-label">
                Username
              </label>
              <div class="input-group has-validation">
                <span class="input-group-text">@</span>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  required=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div class="col-12">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="col-12">
              <label for="password" class="form-label">
                Contraseña
              </label>
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr class="my-4" />
        <button class="btn btn-primary" type="submit">
          Registrarse
        </button>
      </form>
      <ToastContainer />
    </main>
  );
};

export default Registrarse;
