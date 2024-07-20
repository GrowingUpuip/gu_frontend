import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import Link from "next/link";

<<<<<<< HEAD
const EventForm = () => {
=======
const PracticaForm = () => {
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
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
<<<<<<< HEAD
      const fetchEvent = async () => {
        try {
          const eventDoc = doc(db, "anuncios", id);
          const eventSnap = await getDoc(eventDoc);

          if (eventSnap.exists()) {
            const event = eventSnap.data();

            setValue("title", event.title);
            setValue("description", event.description);
            setValue("date_start", event.date_start);
            setValue("time_start", event.time_start.slice(0, 5)); // Solo configurar HH:mm
            setValue("location", event.location);
            setValue("type_event", event.type_event);
            setValue("keywords", event.keywords);

            setIsEdit(true);
          } else {
            console.error("Event not found");
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };

      fetchEvent();
=======
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
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
<<<<<<< HEAD
    data.time_start = `${data.time_start}:00.000`; // Ajustar formato de la hora
=======
    data.hora_inicio = `${data.hora_inicio}:00.000`; // Ajustar formato de la hora
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e

    try {
      if (id) {
        // Actualizar documento existente
<<<<<<< HEAD
        const eventDoc = doc(db, "anuncios", id);
        await updateDoc(eventDoc, data);
      } else {
        // Crear nuevo documento
        const eventCollection = collection(db, "anuncios");
        await addDoc(eventCollection, data);
      }
      showToast("Evento guardado con éxito", "done");
      reset();
    } catch (error) {
      console.error("Error saving event:", error);
      showToast("Error al guardar el evento", "error");
=======
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
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
    }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
<<<<<<< HEAD
            <Link href="/eventos" legacyBehavior>
              <a>Eventos</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registrar evento
=======
            <Link href="/practicas" legacyBehavior>
              <a>Prácticas</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registrar práctica
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
          </li>
        </ol>
      </nav>
      <main className="container d-flex justify-content-center align-items-center">
        <div className="col-md-7 col-lg-8">
<<<<<<< HEAD
          <h1 className="h3">Registrar evento</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="form-control"
                  id="title"
                  {...register("title", { required: true })}
                />
                {errors.title && <span>Title is required</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <input
                  className="form-control"
                  id="description"
                  {...register("description", { required: true })}
                />
                {errors.description && <span>Description is required</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="date_start">
                  Date Start
                </label>
                <input
                  className="form-control"
                  id="date_start"
                  type="date"
                  {...register("date_start", { required: true })}
                />
                {errors.date_start && <span>Date Start is required</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="time_start">
                  Time Start
                </label>
                <input
                  className="form-control"
                  id="time_start"
                  type="time"
                  {...register("time_start", { required: true })}
                />
                {errors.time_start && <span>Time Start is required</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  className="form-control"
                  id="location"
                  {...register("location", { required: true })}
                />
                {errors.location && <span>Location is required</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="type_event">
                  Type Event
                </label>
                <input
                  className="form-control"
                  id="type_event"
                  {...register("type_event", { required: true })}
                />
                {errors.type_event && <span>Type Event is required</span>}
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="keywords">
                  Keywords
                </label>
                <input
                  className="form-control"
                  id="keywords"
                  {...register("keywords", { required: true })}
                />
                {errors.keywords && <span>Keywords are required</span>}
=======
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
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
              </div>
            </div>
            <hr className="my-4" />
            <button className="btn btn-primary" type="submit">
<<<<<<< HEAD
              {isEdit ? "Editar" : "Create Event"}
=======
              {isEdit ? "Editar" : "Crear práctica"}
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
            </button>
          </form>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
};

<<<<<<< HEAD
export default EventForm;
=======
export default PracticaForm;
>>>>>>> 8f9e19aef121f171736521c3ddb182d29c20be7e
