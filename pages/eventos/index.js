import React, { useState, useEffect } from "react";
import Sidebar from "@/components/eventos/Sidebar";
import EventList from "@/components/eventos/EventList";
import DatePickerComponent from "@/components/eventos/DatePicker";
import Image from "next/image";
import Calendar from "react-calendar";
import { useAuth } from "@/components/authContext";
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
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
              Eventos
            </a>
            <div class="ml-auto">
              <Image
                src="/images/avatar.jpg"
                alt="juan perez"
                width={40}
                height={40}
                class="rounded-circle"
              />
            </div>
          </nav>

          <div class="row mt-4">
            <div class="col-sm-3">
              <ul class="list-group">
                <Sidebar />

                <li class="list-group-item">
                  <DatePickerComponent />
                </li>
                <li class="card p-2">
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
            <div class="col">
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
