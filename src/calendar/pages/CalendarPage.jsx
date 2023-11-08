import { Navbar } from "../components/Navbar"
import { Calendar } from "react-big-calendar"
import { addHours } from "date-fns"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { localizer } from "../../helpers/calendarLocalizer"
import { getMessagesES } from "../../helpers/getMessages"
import { CalendarEvent } from "../components/CalendarEvent"
import { useEffect, useState } from "react"
import { CalendarModal } from "../components/CalendarModal"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { FabAddNew } from "../components/FabAddNew"
import { FabDelete } from "../components/FabDelete"
import { useAuthStore } from "../../hooks/useAuthStore"

export const CalendarPage = () => {

  const {user} = useAuthStore()

  const { openDateModal } = useUiStore()

  const { events, setActiveEvent, startLoandingEvents } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem("lastView")  || "week")
  
  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id || (user.uid === event.user.uid) )

    const style = {
      
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      
      borderRadius: "0px",
      
      opacity: 0.9,
      
      color: "white"
    
    }

    return {
      
      style
    
    }
  
  }

  const hacerDobleClick = (event) => {

    openDateModal()
  
  }

  const seleccionarE = (event) => {

    setActiveEvent(event)

  }

  const vistaCambia = (event) => {

    localStorage.setItem("lastView", event)

    setLastView(event)
  
  }

  useEffect(() => {
    
    startLoandingEvents()

  }, [])
  
  
  return (
    
    <>
    
      <Navbar></Navbar>

      <Calendar

        culture="es"

        localizer={localizer}

        events={events}

        defaultView={lastView}
        
        startAccessor="start"
        
        endAccessor="end"
        
        style={{ height: "calc(100vh - 80px)" }}

        messages={getMessagesES()}

        eventPropGetter={eventStyleGetter}

        components={{
        
          event: CalendarEvent
        
        }}

        // hacer doble click
        onDoubleClickEvent={hacerDobleClick}

        // hacer click al evento
        onSelectEvent={seleccionarE}

        // ventanas disponibles
        onView={vistaCambia}
      
      />

      <CalendarModal></CalendarModal>

      <FabAddNew></FabAddNew>

      <FabDelete></FabDelete>

    </>
 
  )

}