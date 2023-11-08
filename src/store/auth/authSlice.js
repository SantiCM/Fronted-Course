
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({

    // nombre de el slice
    name: 'auth',
    
    // estado inical
    initialState:  {
      
        status: "cheking", // authenticed // not-authenticed

        user: {},

        errorMessage : undefined,
        

    },
    
    reducers: {

        onCheking: (state) => {
        
            state.status = "cheking",

            state.user = {},

            state.errorMessage = undefined
        
        },

        onLogin: (state, {payload}) => {
        
            state.status = "authenticed"

            state.user = payload

            state.errorMessage = undefined
        
        },

        onLogout: (state, {payload}) => {
        
            state.status = "not-authenticed"

            state.user = {}

            state.errorMessage = payload
        
        },

        clearErrorMessage: (state) => {
        
            state.errorMessage = undefined
        
        }
    
    
    }
    
        
})

export const { onCheking , onLogin, onLogout, clearErrorMessage  } = authSlice.actions