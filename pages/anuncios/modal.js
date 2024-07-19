// Modal.js
import { useState } from "react";

const Modal = ({ eventos, showModal, closeModal, handleSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const handleEventoChange = (e) => {
    const selectedEvent = eventos.find(
      (evento) => evento.id === parseInt(e.target.value)
    );
    setEventoSeleccionado(selectedEvent);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ nombre, correo, eventoSeleccionado });
  };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registro</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="eventoSelect">Selecciona un evento</label>
                <select
                  id="eventoSelect"
                  className="form-control"
                  value={eventoSeleccionado ? eventoSeleccionado.id : ""}
                  onChange={handleEventoChange}
                  required
                >
                  <option value="">Selecciona un evento</option>
                  {eventos.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.attributes.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nombreInput">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreInput"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="correoInput">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="correoInput"
                  placeholder="Correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Estilos para el modal */}
      <style jsx>{`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1050;
          overflow: hidden;
          outline: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-dialog {
          display: flex;
          flex-direction: column;
          max-width: 500px; /* Ancho máximo del modal */
          width: 100%;
          margin: 1.75rem auto; /* Margen para centrado vertical */
        }

        .modal-content {
          position: relative;
          display: flex;
          flex-direction: column;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 0.3rem;
          outline: 0;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #e9ecef;
          border-top-left-radius: 0.3rem;
          border-top-right-radius: 0.3rem;
        }

        .modal-title {
          margin-bottom: 0;
          line-height: 1.5;
        }

        .modal-body {
          position: relative;
          flex: 1 1 auto;
          padding: 1rem;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 1rem;
          border-top: 1px solid #e9ecef;
          border-bottom-left-radius: 0.3rem;
          border-bottom-right-radius: 0.3rem;
        }

        .close {
          padding: 1rem;
          margin: -1rem -1rem -1rem auto;
          background-color: transparent;
          border: 0;
          appearance: none;
          cursor: pointer;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Modal;
