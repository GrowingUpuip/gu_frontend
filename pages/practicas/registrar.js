import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import Link from "next/link";

const EventForm = () => {
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
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    data.time_start = `${data.time_start}:00.000`; // Ajustar formato de la hora

    try {
      if (id) {
        // Actualizar documento existente
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
    }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/eventos" legacyBehavior>
              <a>Eventos</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registrar evento
          </li>
        </ol>
      </nav>
      <main className="container d-flex justify-content-center align-items-center">
        <div className="col-md-7 col-lg-8">
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
              </div>
            </div>
            <hr className="my-4" />
            <button className="btn btn-primary" type="submit">
              {isEdit ? "Editar" : "Create Event"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
};

export default EventForm;
