import { onCloseDateModalOpen, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('Pruebas en uiSlice', () => { 

    test('debe de regresar el estado por defecto', () => { 
        
        // con una sola propiedad

        expect(uiSlice.getInitialState()).toEqual( {  isDateModalOpen: false } )

        // con mas propiedades
        //expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()
    
    })

    test('debe de cambiar el isDateModalOpen correctamente', () => { 
    
        let state = uiSlice.getInitialState()

        state = uiSlice.reducer(state, onOpenDateModal())

        expect(state.isDateModalOpen).toBeTruthy()

        state = uiSlice.reducer(state, onCloseDateModalOpen())

        expect(state.isDateModalOpen).toBeFalsy()
    
    })

})