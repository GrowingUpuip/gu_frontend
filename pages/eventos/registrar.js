import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/toast";
import { useRouter } from "next/router";
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
          const host = process.env.NEXT_PUBLIC_API_HOST;
          const response = await fetch(`${host}/api/events/?id=${id}`, {
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          const event = result.data.find((event) => event.id === parseInt(id)); // Filtrar el evento por id

          if (event) {
            const { attributes } = event;
            // Set the form values
            setValue("title", attributes.title);
            setValue("description", attributes.description);
            setValue("date_start", attributes.date_start);
            setValue("time_start", attributes.time_start.slice(0, 5)); // Only set HH:mm part
            setValue("location", attributes.location);
            setValue("type_event", attributes.type_event);
            setValue("keywords", attributes.keywords);

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

    const host = process.env.NEXT_PUBLIC_API_HOST;
    const timeParts = data.time_start.split(":");
    data.time_start = `${timeParts[0]}:${timeParts[1]}:00.000`;
    const url = id ? `${host}/api/events/?id=${id}` : `${host}/api/events`;
    const method = id ? "PUT" : "POST";
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      showToast("Se creo con exito", "done");
      reset();
    } else {
      const data = await response.json();
      console.log(data);
      showToast(data.error.message, "error");
    }
  };

  return (
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link href="/eventos" legacyBehavior>
              <a>Eventos</a>
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar evento
          </li>
        </ol>
      </nav>
      <main class="container d-flex justify-content-center align-items-center">
        <div class="col-md-7 col-lg-8">
          <h1 class="h3">Registrar evento</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              <div class="col-12">
                <label class="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  class="form-control"
                  id="title"
                  {...register("title", { required: true })}
                />
                {errors.title && <span>Title is required</span>}
              </div>

              <div class="col-12">
                <label class="form-label" htmlFor="description">
                  Description
                </label>
                <input
                  class="form-control"
                  id="description"
                  {...register("description", { required: true })}
                />
                {errors.description && <span>Description is required</span>}
              </div>

              <div class="col-12">
                <label class="form-label" htmlFor="date_start">
                  Date Start
                </label>
                <input
                  class="form-control"
                  id="date_start"
                  type="date"
                  {...register("date_start", { required: true })}
                />
                {errors.date_start && <span>Date Start is required</span>}
              </div>

              <div class="col-12">
                <label class="form-label" htmlFor="time_start">
                  Time Start
                </label>
                <input
                  class="form-control"
                  id="time_start"
                  type="time"
                  {...register("time_start", { required: true })}
                />
                {errors.time_start && <span>Time Start is required</span>}
              </div>

              <div class="col-12">
                <label class="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  class="form-control"
                  id="location"
                  {...register("location", { required: true })}
                />
                {errors.location && <span>Location is required</span>}
              </div>

              <div class="col-12">
                <label class="form-label" htmlFor="type_event">
                  Type Event
                </label>
                <input
                  class="form-control"
                  id="type_event"
                  {...register("type_event", { required: true })}
                />
                {errors.type_event && <span>Type Event is required</span>}
              </div>

              <div class="col-12">
                <label class="form-label" htmlFor="keywords">
                  Keywords
                </label>
                <input
                  class="form-control"
                  id="keywords"
                  {...register("keywords", { required: true })}
                />
                {errors.keywords && <span>Keywords are required</span>}
              </div>
            </div>
            <hr class="my-4" />
            <button class="btn btn-primary" type="submit">
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
