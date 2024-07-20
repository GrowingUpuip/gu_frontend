import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Mainlayout from "@/components/layouts/mainLayout";
import { AuthProvider } from "@/components/AuthContext";
import { useEffect } from "react";
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
