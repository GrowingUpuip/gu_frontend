import { useEffect, useState } from "react";

const useLocale = () => {
  const [locale, setLocale] = useState("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocale(navigator.language || "es");
    }
  }, []);

  return locale;
};

export default useLocale;
