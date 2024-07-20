import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
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
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";

const PracticasList = () => {
  const [practicas, setPracticas] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const router = useRouter();
  const practicasPerPage = 10; // Define the number of practicas per page

  const fetchPracticas = useCallback(
    async (page) => {
      try {
        const practicasRef = collection(db, "practicas");
        let q;

        if (page === 1) {
          q = query(practicasRef, limit(practicasPerPage));
        } else {
          q = query(
            practicasRef,
            startAfter(lastVisible),
            limit(practicasPerPage)
          );
        }

        const querySnapshot = await getDocs(q);

        const practicasData = [];
        querySnapshot.forEach((doc) => {
          practicasData.push({ id: doc.id, ...doc.data() });
        });

        setPracticas(practicasData);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        // You may need to adjust the logic for pageCount based on your data
        setPageCount(Math.ceil(querySnapshot.size / practicasPerPage));
      } catch (error) {
        console.error("Error fetching practicas:", error);
      }
    },
    [lastVisible, practicasPerPage]
  );

  useEffect(() => {
    fetchPracticas(page);
  }, [page, fetchPracticas]);

  const irRegistroPractica = () => {
    router.push("/practicas/registrar");
  };

  const irEditarPractica = (id) => {
    router.push("/practicas/registrar/?id=" + id);
  };

  const borrarPractica = async (id) => {
    try {
      await deleteDoc(doc(db, "practicas", id));
      showToast("Práctica borrada con éxito", "done");
      fetchPracticas(page); // Refresh the list after deleting
    } catch (error) {
      console.error("Error borrando la práctica:", error);
      showToast(
        "Hubo un problema al borrar la práctica, intenta de nuevo.",
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
              src="/images/practicas.png"
              alt="juan perez"
              width={700}
              height={500}
              className="img-fluid border rounded-3 shadow-lg mb-4"
            />
          </div>
        </div>
        <p className="display-6 fw-bold text-body-emphasis">
          Crea una práctica
        </p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Organiza tu próxima práctica profesional de forma sencilla con
            nuestra aplicación. Ingresa los detalles básicos, selecciona fecha y
            hora, y personaliza las opciones. Envía invitaciones, gestiona
            confirmaciones y mantente informado en tiempo real. Todo lo que
            necesitas para una práctica exitosa está a solo unos clics.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              onClick={irRegistroPractica}
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Crear práctica
            </button>
          </div>
        </div>
      </div>
      {practicas.map((practica) => (
        <div className="card mb-3" key={practica.id}>
          <div className="card-body">
            <h5 className="card-title">{practica.titulo}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {practica.fecha_inicio}
            </h6>
            <p className="card-text">{practica.descripcion}</p>
            <div className="row">
              <div className="col-1">
                <a
                  onClick={() => irEditarPractica(practica.id)}
                  className="btn btn-primary"
                >
                  Editar
                </a>
              </div>
              <div className="col-1">
                <a
                  onClick={() => borrarPractica(practica.id)}
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

export default PracticasList;
