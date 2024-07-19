import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const router = useRouter();

  const fetchEvents = async (page) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/events?pagination[page]=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setEvents(data.data);
      setPageCount(data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const irRegistroEvento = () => {
    router.push("/eventos/registrar");
  };

  const irEditarEvento = (id) => {
    router.push("/eventos/registrar/?id=" + id);
  };

  return (
    <div>
      <div class="text-center border-bottom">
        <div class="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div class="container">
            <Image
              src="/images/baner.jpg"
              alt="juan perez"
              width={700}
              height={500}
              class="img-fluid border rounded-3 shadow-lg mb-4"
            />
          </div>
        </div>
        <p class="display-6 fw-bold text-body-emphasis">Crea un evento</p>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Organiza tu próximo evento de forma sencilla con nuestra aplicación.
            Ingresa los detalles básicos, selecciona fecha y hora, y personaliza
            las opciones. Envía invitaciones, gestiona confirmaciones y mantente
            informado en tiempo real. Todo lo que necesitas para un evento
            exitoso está a solo unos clics.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              onClick={irRegistroEvento}
              type="button"
              class="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Crear eventos
            </button>
          </div>
        </div>
      </div>
      {events.map((event) => (
        <div class="card mb-3" key={event.id}>
          <div class="card-body">
            <h5 class="card-title">{event.attributes.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {event.attributes.date_start}
            </h6>
            <p class="card-text">{event.attributes.description}</p>

            <div class="row">
              <div class="col-1">
                <a
                  onClick={() => irEditarEvento(event.id)}
                  class="btn btn-primary"
                >
                  Editar
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              class="page-link"
              onClick={() => setPage(page - 1)}
              aria-disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: pageCount }, (_, i) => (
            <li
              class={`page-item ${page === i + 1 ? "active" : ""}`}
              key={i}
            >
              <button class="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li class={`page-item ${page === pageCount ? "disabled" : ""}`}>
            <button
              class="page-link"
              onClick={() => setPage(page + 1)}
              aria-disabled={page === pageCount}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EventList;
