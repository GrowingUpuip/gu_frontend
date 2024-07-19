import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Registrarse = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username,
        authProvider: "local",
        email,
      });

      router.push("/login");
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    }
  };

  return (
    <main className="container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <Image
          src="/images/logo.png"
          alt="Google"
          width={70}
          height={70}
          className="mb-4"
        />
        <h1 className="h3 mb-3 fw-normal">Registrarse</h1>

        <div className="col-md-7 col-lg-8">
          <div className="row">
            <div className="col-12">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  required=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <button className="btn btn-primary" type="submit">
          Registrarse
        </button>
      </form>
      <ToastContainer />
    </main>
  );
};

export default Registrarse;
