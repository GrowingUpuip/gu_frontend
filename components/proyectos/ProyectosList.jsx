import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ProyectosList = () => {
  const [proyectos, setProyectos] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const router = useRouter();
  const proyectosPerPage = 10; // Define the number of proyectos per page

  const fetchProyectos = useCallback(
    async (page) => {
      try {
        const proyectosRef = collection(db, "proyectos");
        let q;

        if (page === 1) {
          q = query(proyectosRef, limit(proyectosPerPage));
        } else {
          q = query(
            proyectosRef,
            startAfter(lastVisible),
            limit(proyectosPerPage)
          );
        }

        const querySnapshot = await getDocs(q);

        const proyectosData = [];
        querySnapshot.forEach((doc) => {
          proyectosData.push({ id: doc.id, ...doc.data() });
        });

        setProyectos(proyectosData);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        // You may need to adjust the logic for pageCount based on your data
        setPageCount(Math.ceil(querySnapshot.size / proyectosPerPage));
      } catch (error) {
        console.error("Error fetching proyectos:", error);
      }
    },
    [lastVisible, proyectosPerPage]
  );

  useEffect(() => {
    fetchProyectos(page);
  }, [page, fetchProyectos]);

  const irRegistroProyecto = () => {
    router.push("/proyectos/registrar");
  };

  const irEditarProyecto = (id) => {
    router.push("/proyectos/registrar/?id=" + id);
  };

  const borrarProyecto = async (id) => {
    try {
      await deleteDoc(doc(db, "proyectos", id));
      showToast("Proyecto borrado con éxito", "done");
      fetchProyectos(page); // Refresh the list after deleting
    } catch (error) {
      console.error("Error borrando el proyecto:", error);
      showToast(
        "Hubo un problema al borrar el proyecto, intenta de nuevo.",
        "error"
      );
    }
  };

  return (
    <div>
      <div className="text-center border-bottom">
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container">
            <Image
              src="/images/proyectos.jpg"
              alt="juan perez"
              width={700}
              height={500}
              className="img-fluid border rounded-3 shadow-lg mb-4"
            />
          </div>
        </div>
        <p className="display-6 fw-bold text-body-emphasis">Crea un proyecto</p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Organiza tu próximo proyecto profesional de forma sencilla con
            nuestra aplicación. Ingresa los detalles básicos, selecciona fecha y
            hora, y personaliza las opciones. Envía invitaciones, gestiona
            confirmaciones y mantente informado en tiempo real. Todo lo que
            necesitas para un proyecto exitoso está a solo unos clics.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              onClick={irRegistroProyecto}
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Crear proyecto
            </button>
          </div>
        </div>
      </div>
      {proyectos.map((proyecto) => (
        <div className="card mb-3" key={proyecto.id}>
          <div className="card-body">
            <h5 className="card-title">{proyecto.titulo}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {proyecto.fecha_inicio}
            </h6>
            <p className="card-text">{proyecto.descripcion}</p>
            <div className="row">
              <div className="col-1">
                <a
                  onClick={() => irEditarProyecto(proyecto.id)}
                  className="btn btn-primary"
                >
                  Editar
                </a>
              </div>
              <div className="col-1">
                <a
                  onClick={() => borrarProyecto(proyecto.id)}
                  className="btn btn-danger"
                >
                  Borrar
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
      <ToastContainer />
    </div>
  );
};

export default ProyectosList;
