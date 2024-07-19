import { useState } from "react";

const Modal = ({ oportunidades, showModal, closeModal, handleSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [oportunidadSeleccionada, setOportunidadSeleccionada] = useState(null);

  const handleOportunidadChange = (e) => {
    const selectedOpportunity = oportunidades.find(
      (oportunidad) => oportunidad.id === parseInt(e.target.value)
    );
    setOportunidadSeleccionada(selectedOpportunity);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ nombre, correo, oportunidadSeleccionada });
  };

  return (
    <div>
     { oportunidades ? (
         <div
         class={`modal ${showModal ? "show" : ""}`}
         tabIndex="-1"
         role="dialog"
         style={{ display: showModal ? "block" : "none" }}
       >
         <div class="modal-dialog modal-dialog-centered" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title">Registro</h5>
               <button type="button" class="close" onClick={closeModal}>
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <form onSubmit={handleFormSubmit}>
                 <div class="form-group">
                   <label htmlFor="oportunidadSelect">Selecciona una oportunidad</label>
                   <select
                     id="oportunidadSelect"
                     class="form-control"
                     value={oportunidadSeleccionada ? oportunidadSeleccionada.id : ""}
                     onChange={handleOportunidadChange}
                     required
                   >
                     <option value="">Selecciona una oportunidad</option>
                     {oportunidades.map((oportunidad) => (
                       <option key={oportunidad.id} value={oportunidad.id}>
                         {oportunidad.titulo}
                       </option>
                     ))}
                   </select>
                 </div>
                 <div class="form-group">
                   <label htmlFor="nombreInput">Nombre</label>
                   <input
                     type="text"
                     class="form-control"
                     id="nombreInput"
                     placeholder="Nombre"
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                     required
                   />
                 </div>
                 <div class="form-group">
                   <label htmlFor="correoInput">Correo electrónico</label>
                   <input
                     type="email"
                     class="form-control"
                     id="correoInput"
                     placeholder="Correo electrónico"
                     value={correo}
                     onChange={(e) => setCorreo(e.target.value)}
                     required
                   />
                 </div>
                 <button type="submit" class="btn btn-primary">
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
             margin: 0 auto;
           }
   
           .modal-content {
             background-color: #fff;
             border: 1px solid rgba(0, 0, 0, 0.2);
             border-radius: 0.3rem;
             outline: 0;
             box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
             padding: 20px;
           }
   
           .modal-header {
             display: flex;
             justify-content: space-between;
             align-items: center;
             padding: 15px;
             border-bottom: 1px solid #e9ecef;
             border-top-left-radius: 0.3rem;
             border-top-right-radius: 0.3rem;
           }
   
           .modal-title {
             margin-bottom: 0;
             line-height: 1.5;
             font-size: 1.25rem;
             font-weight: 500;
           }
   
           .close {
             font-size: 1.5rem;
             font-weight: 700;
             line-height: 1;
             color: #000;
             text-shadow: none;
             opacity: 0.5;
             background-color: transparent;
             border: 0;
             cursor: pointer;
           }
   
           .modal-body {
             position: relative;
             padding: 15px;
           }
   
           .form-group {
             margin-bottom: 1rem;
           }
   
           .form-control {
             display: block;
             width: 100%;
             padding: 0.375rem 0.75rem;
             font-size: 1rem;
             font-weight: 400;
             line-height: 1.5;
             color: #495057;
             background-color: #fff;
             background-clip: padding-box;
             border: 1px solid #ced4da;
             border-radius: 0.25rem;
             transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
           }
   
           .btn {
             display: inline-block;
             font-weight: 400;
             text-align: center;
             white-space: nowrap;
             vertical-align: middle;
             user-select: none;
             border: 1px solid transparent;
             padding: 0.375rem 0.75rem;
             font-size: 1rem;
             line-height: 1.5;
             border-radius: 0.25rem;
             transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
           }
   
           .btn-primary {
             color: #fff;
             background-color: #007bff;
             border-color: #007bff;
           }
   
           .btn-primary:hover {
             color: #fff;
             background-color: #0056b3;
             border-color: #004085;
           }
         `}</style>
       </div>
     ): null } 
    </div>
  );
};

export default Modal;
