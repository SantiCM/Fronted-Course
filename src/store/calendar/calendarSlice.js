import { createSlice } from "@reduxjs/toolkit"
import { addHours } from "date-fns"

/*const tempEvent = {

    id: new Date().getTime(),

    title: "Cumpleaños",
  
    notes: "Hay que comprar",
    
    start: new Date(),
    
    end: addHours(new Date(), 2),
  
    bgColor: "#fafafa",
  
    user: {
      
      _id: "1212",
  
      name: "Santiago"
    
    }
  
}*/

export const calendarSlice = createSlice({

    // nombre de el slice
    name: 'calendar',
    
    // estado inical
    initialState:  {

        isLoandingEvents: true , 
        
        events: [
            
            //tempEvent
        
        ],
       
        activeEvent: null

    },
    
    reducers: {
        
        onSetActiveEvent: (state, { payload } ) => {

            state.activeEvent = payload
        
        },

        onAddNewEvent: (state, { payload } ) => {
        
            state.events.push(payload)

            state.activeEvent = null
        
        },

        onUpdateEvent:  (state, { payload } ) => {
            
            state.events = state.events.map(event => {

                if(event.id === payload.id) {
                
                    return payload
                
                }
            
                return event
            
            })
        
        },

        onDeleteEvent: (state ) => {

            if(state.activeEvent) {
                
                state.events = state.events.filter(event => event.id !== state.activeEvent.id)
                
                state.activeEvent = null
            
            }

        },

        onLoadEvents: (state, {payload = []}) => {
            
            state.isLoandingEvents = false

            //state.events = payload

            payload.forEach(event => {
            
                const exist = state.events.some( dbEvent => dbEvent.id === event.id )

                if(!exist) {
                
                    state.events.push(event)
                
                }
   
            })            
        
        },

        onLogoutCalendar: (state) => {
        
            state.isLoandingEvents = true , 
        
            state.events = [
                
                //tempEvent
            
            ],
           
            state.activeEvent = null
        
        }

    }
  
})

export const {onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar} = calendarSlice.actions