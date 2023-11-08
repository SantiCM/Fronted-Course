import { createSlice } from "@reduxjs/toolkit"

export const uiSlice = createSlice({

    // nombre de el slice
    name: 'ui',
    
    // estado inical
    initialState:  {
      
        isDateModalOpen: false,

    },
    
    reducers: {
    
        onOpenDateModal: (state) => {
    
            state.isDateModalOpen = true

            /*

                return {
                    
                    ...state,

                    isDateModalOpen: true
                }
            
            */ 
    
        },

        onCloseDateModalOpen: (state) => {
    
            state.isDateModalOpen = false
    
        },



  
    }
  
})

export const {onOpenDateModal, onCloseDateModalOpen} = uiSlice.actions