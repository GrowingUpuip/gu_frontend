import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import Link from "next/link";

const PracticaForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPractica = async () => {
        try {
          const practicaDoc = doc(db, "practicas", id);
          const practicaSnap = await getDoc(practicaDoc);

          if (practicaSnap.exists()) {
            const practica = practicaSnap.data();

            setValue("titulo", practica.titulo);
            setValue("descripcion", practica.descripcion);
            setValue("fecha_inicio", practica.fecha_inicio);
            setValue("hora_inicio", practica.hora_inicio.slice(0, 5)); // Solo configurar HH:mm
            setValue("ubicacion", practica.ubicacion);
            setValue("tipo_practica", practica.tipo_practica);
            setValue("palabras_clave", practica.palabras_clave);

            setIsEdit(true);
          } else {
            console.error("Práctica no encontrada");
          }
        } catch (error) {
          console.error("Error al obtener la práctica:", error);
        }
      };

      fetchPractica();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    data.hora_inicio = `${data.hora_inicio}:00.000`; // Ajustar formato de la hora

    try {
      if (id) {
        // Actualizar documento existente
        const practicaDoc = doc(db, "practicas", id);
        await updateDoc(practicaDoc, data);
      } else {
        // Crear nuevo documento
        const practicaCollection = collection(db, "practicas");
        await addDoc(practicaCollection, data);
      }
      showToast("Práctica guardada con éxito", "done");
      reset();
    } catch (error) {
      console.error("Error al guardar la práctica:", error);
      showToast("Error al guardar la práctica", "error");
    }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/practicas" legacyBehavior>
              <a>Prácticas</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registrar práctica
          </li>
        </ol>
      </nav>
      <main className="container d-flex justify-content-center align-items-center">
        <div className="col-md-7 col-lg-8">
          <h1 className="h3">Registrar práctica profesional</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <label className="form-label" htmlFor="titulo">
                  Título
                </label>
                <input
                  className="form-control"
                  id="titulo"
                  {...register("titulo", { required: true })}
                />
                {errors.titulo && <span>El título es requerido</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="descripcion">
                  Descripción
                </label>
                <input
                  className="form-control"
                  id="descripcion"
                  {...register("descripcion", { required: true })}
                />
                {errors.descripcion && <span>La descripción es requerida</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="fecha_inicio">
                  Fecha de inicio
                </label>
                <input
                  className="form-control"
                  id="fecha_inicio"
                  type="date"
                  {...register("fecha_inicio", { required: true })}
                />
                {errors.fecha_inicio && (
                  <span>La fecha de inicio es requerida</span>
                )}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="hora_inicio">
                  Hora de inicio
                </label>
                <input
                  className="form-control"
                  id="hora_inicio"
                  type="time"
                  {...register("hora_inicio", { required: true })}
                />
                {errors.hora_inicio && (
                  <span>La hora de inicio es requerida</span>
                )}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="ubicacion">
                  Ubicación
                </label>
                <input
                  className="form-control"
                  id="ubicacion"
                  {...register("ubicacion", { required: true })}
                />
                {errors.ubicacion && <span>La ubicación es requerida</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="tipo_practica">
                  Tipo de práctica
                </label>
                <input
                  className="form-control"
                  id="tipo_practica"
                  {...register("tipo_practica", { required: true })}
                />
                {errors.tipo_practica && (
                  <span>El tipo de práctica es requerido</span>
                )}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="palabras_clave">
                  Palabras clave
                </label>
                <input
                  className="form-control"
                  id="palabras_clave"
                  {...register("palabras_clave", { required: true })}
                />
                {errors.palabras_clave && (
                  <span>Las palabras clave son requeridas</span>
                )}
              </div>
            </div>
            <hr className="my-4" />
            <button className="btn btn-primary" type="submit">
              {isEdit ? "Editar" : "Crear práctica"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
};

export default PracticaForm;
