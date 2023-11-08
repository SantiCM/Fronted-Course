import {  useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { convertEventsToDate } from "../helpers/convertEventsToDate"
import Swal from "sweetalert2"

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvent} = useSelector(state => state.calendar)

    const {user} = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
    
        dispatch(onSetActiveEvent(calendarEvent))
    
    }

    const startSavingEvent = async(calendarEvent) => {

        try {

            if(calendarEvent.id) {
            
                // actualizando
    
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
    
                dispatch(onUpdateEvent({...calendarEvent, user}))
                
                return
    
            } 
    
            const {data} = await calendarApi.post("/events", calendarEvent)
                
            // creando
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user} ) )
            
        } catch (error) {

            console.log(error);

            Swal.fire("Error Al Guardar", error.response.data?.msg, "error")
            
        }

    
    }

    const startDeletingEvent = async() => {

        try {
             
            await calendarApi.delete(`/events/${activeEvent.id}`)

            dispatch(onDeleteEvent())

        } catch (error) {

            console.log(error)

            Swal.fire("Error Al Eliminar", error.response.data?.msg, "error")
            
        }
    
        
    
    }

    const startLoandingEvents = async() => {
    
        try {

            const {data} = await calendarApi.get("/events")

            const events = convertEventsToDate( data.eventos)

            dispatch(onLoadEvents(events))

        
        } catch (error) {

            console.log(error)
            
        }
    
    } 

    return {
    
        // Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,

        startSavingEvent,
        
        startDeletingEvent,
        
        startLoandingEvents,
    
    }


}
