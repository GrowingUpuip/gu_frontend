import React, { useState, useEffect } from "react";
import Sidebar from "@/components/eventos/Sidebar";
import EventList from "@/components/eventos/EventList";
import DatePickerComponent from "@/components/eventos/DatePicker";
import Image from "next/image";
import Calendar from "react-calendar";
<<<<<<< HEAD
import { useAuth } from "@/components/authContext";
=======
import { useAuth } from "@/components/AuthContext";
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
import { useRouter } from "next/router";

import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
const Home = () => {
  const [value, setValue] = useState(new Date());

  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la página
<<<<<<< HEAD
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    }
  }, [router]);
=======
    if (!isLoggedIn) {
      router.push("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    }
  }, [isLoggedIn, router]);
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e

  return (
    <div>
      {isLoggedIn ? (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              Eventos
            </a>
            <div className="ml-auto">
              <Image
                src="/images/avatar.jpg"
                alt="juan perez"
                width={40}
                height={40}
                className="rounded-circle"
              />
            </div>
          </nav>

          <div className="row mt-4">
            <div className="col-sm-3">
              <ul className="list-group">
                <Sidebar />

                <li className="list-group-item">
                  <DatePickerComponent />
                </li>
                <li className="card p-2">
                  <Calendar
                    onChange={setValue}
                    value={value}
                    ocale="enUs"
                    formatMonth={(locale, date) =>
                      format(date, "MMMM yyyy", { locale: enUS })
                    }
                    formatShortWeekday={(locale, date) =>
                      format(date, "EEE", { locale: enUS })
                    }
                  />
                </li>
              </ul>
            </div>
            <div className="col">
              <EventList />
            </div>
          </div>
        </div>
      ) : (
        <p>Redirigiendo a la página de inicio de sesión...</p>
      )}
    </div>
  );
};

export default Home;
