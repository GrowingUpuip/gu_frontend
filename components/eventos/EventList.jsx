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
      <div className="text-center border-bottom">
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container">
            <Image
              src="/images/baner.jpg"
              alt="juan perez"
              width={700}
              height={500}
              className="img-fluid border rounded-3 shadow-lg mb-4"
            />
          </div>
        </div>
        <p className="display-6 fw-bold text-body-emphasis">Crea un evento</p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Organiza tu próximo evento de forma sencilla con nuestra aplicación.
            Ingresa los detalles básicos, selecciona fecha y hora, y personaliza
            las opciones. Envía invitaciones, gestiona confirmaciones y mantente
            informado en tiempo real. Todo lo que necesitas para un evento
            exitoso está a solo unos clics.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              onClick={irRegistroEvento}
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Crear eventos
            </button>
          </div>
        </div>
      </div>
      {events.map((event) => (
        <div className="card mb-3" key={event.id}>
          <div className="card-body">
            <h5 className="card-title">{event.attributes.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {event.attributes.date_start}
            </h6>
            <p className="card-text">{event.attributes.description}</p>

            <div class="row">
              <div className="col-1">
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
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
              aria-disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: pageCount }, (_, i) => (
            <li
              className={`page-item ${page === i + 1 ? "active" : ""}`}
              key={i}
            >
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
            <button
              className="page-link"
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
