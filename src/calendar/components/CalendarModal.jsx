import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { getEnvVariables } from "../../helpers/getEnvVariables";

registerLocale("es", es);

const customStyles = {
  
  content: {
  
    top: "50%",

    left: "50%",

    right: "auto",

    bottom: "auto",

    marginRight: "-50%",

    transform: "translate(-50%, -50%)",
  
  },

};

/*


if(getEnvVariables().VITE_MODE !== "test") {

  Modal.setAppElement("#root");

}

*/ 

if(getEnvVariables().VITE_MODE) 

Modal.setAppElement("#root");

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateMoral } = useUiStore();

  const {activeEvent, startSavingEvent} = useCalendarStore()

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setformValues] = useState({

    title: "Santiago",

    notes: "Melo",

    start: new Date(),

    end: addHours(new Date(), 2),

  });

  const tittleClaas = useMemo(() => {

    if (!formSubmitted) return " ";

    return formValues.title.length > 0 ? "" : "is-invalid";

  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    
    // si no es nulo
    if(activeEvent !== null) {
      
      // esparsir todo el active con el estado siguiente
      setformValues({...activeEvent})
    
    } 
    
  }, [activeEvent])
  

  const onInputChange = ({ target }) => {

    setformValues({
      
      ...formValues,
      
      [target.name]: target.value,
    
    });
  
  };

  //                    la new fecha
  //                           los valores de start y end

  const onDateChanged = (event, changing) => {

    setformValues({

      ...formValues,


      [changing]: event,

    });

  };

  const oncloseModal = () => {
    
    closeDateMoral()

  };

  const onSubmit = async(event) => {

    event.preventDefault();

    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    // si no es un numero muestra esto
    // y si la diferencia es menor a igual 0

    if (isNaN(difference) || difference <= 0) {

      Swal.fire("Fechas Incorrectas", "Revisar las fechas ingresadas", "error");


      return;

    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues)

    closeDateMoral()

    setFormSubmitted(false)

  };

  return (

    <Modal

      isOpen={isDateModalOpen}
  
      onRequestClose={oncloseModal}
  
      style={customStyles}
  
      className="modal"
  
      overlayClassName="modal-fondo"

      //closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>

      <hr />

      <form className="container" onSubmit={onSubmit}>
  
        <div className="form-group mb-2">
  
          <label>Fecha y hora inicio</label>

          <DatePicker
  
            selected={formValues.start}
            
            onChange={(event) => onDateChanged(event, "start")}
            
            className="form-control"
            
            dateFormat="Pp"
            
            showTimeSelect
            
            locale="es"
            
            timeCaption="Hora"
          
          ></DatePicker>
        
        </div>

        <div className="form-group mb-2">
        
          <label>Fecha y hora fin</label>

          <DatePicker
            // no poner una fecha antes de la primera seleccionada
        
            minDate={formValues.start}
        
            selected={formValues.end}
        
            onChange={(event) => onDateChanged(event, "end")}
        
            className="form-control"
        
            dateFormat="Pp"
            // hacer que pueda seleccionar multiples horas
        
            showTimeSelect
        
            locale="es"
        
            timeCaption="Hora"
        
          ></DatePicker>
        
        </div>

        <hr />

        <div className="form-group mb-2">
          
          <label>Titulo y notas</label>

          <input
          
            type="text"
            
            className={`form-control ${tittleClaas} `}
            
            placeholder="Título del evento"
            
            name="title"
            
            autoComplete="off"
            
            value={formValues.title}
            
            onChange={onInputChange}
          
          />

          <small id="emailHelp" className="form-text text-muted">
           
            Una descripción corta
          
          </small>
        
        </div>

        <div className="form-group mb-2">
        
          <textarea
        
            type="text"
            
            className="form-control"
            
            placeholder="Notas"
            
            rows="5"
            
            name="notes"
            
            value={formValues.notes}
            
            onChange={onInputChange}
          
          ></textarea>

          <small id="emailHelp" className="form-text text-muted">
          
            Información adicional
          
          </small>
        
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
        
          <i className="far fa-save"></i>

          <span> Guardar</span>
        
        </button>
      
      </form>
    
    </Modal>
  
  );

};