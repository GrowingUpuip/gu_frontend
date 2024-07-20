import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Mainlayout from "@/components/layouts/mainLayout";
<<<<<<< HEAD
import { AuthProvider } from "@/components/authContext";
import { useEffect } from "react";

=======
import { AuthProvider } from "@/components/AuthContext";
import { useEffect } from "react";
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <AuthProvider>
      <Mainlayout>
        <Component {...pageProps} />
      </Mainlayout>
    </AuthProvider>
  );
}

export default MyApp;
