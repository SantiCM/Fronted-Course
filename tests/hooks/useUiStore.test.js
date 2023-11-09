import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store/ui/uiSlice"
import { act } from "react-dom/test-utils"


const getMockStore = ( initialState ) => {

    return configureStore({
    
        reducer : {
            
            ui: uiSlice.reducer
        
        
        },

        preloadedState: {
            
            ui: {...initialState}
        
        }
    
    })

}

describe('Pruebas en useUiStore', () => { 

    test('debe de regresar los valores por defecto', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })
    
        const {result} = renderHook(() => useUiStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        expect(result.current).toEqual({
            
            isDateModalOpen: false,

            openDateModal :  expect.any(Function), 

            closeDateMoral :  expect.any(Function),

            toogleDateModal :  expect.any(Function)
        
        })
    
    })

    test('openDateModal debe de colocar true en  isDateModalOpen', () => { 
    
        const mockStore = getMockStore({ isDateModalOpen: false })
    
        const {result} = renderHook(() => useUiStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        const { openDateModal } = result.current

        act( () => openDateModal())

        expect(result.current.isDateModalOpen).toBeTruthy()
    
    })

    test('closeDateMoral debe de colocar false en isDateModalOpen', () => { 
    
        const mockStore = getMockStore({ isDateModalOpen: true })
    
        const {result} = renderHook(() => useUiStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        act( () => result.current.closeDateMoral())

        expect(result.current.isDateModalOpen).toBeFalsy()
    
    })

    test('toogleDateModal debe de cambiar el estado en', () => { 
    
        const mockStore = getMockStore({ isDateModalOpen: true })
    
        const {result} = renderHook(() => useUiStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        act( () => result.current.toogleDateModal())

        expect(result.current.isDateModalOpen).toBeFalsy()

        act( () => result.current.toogleDateModal())

        expect(result.current.isDateModalOpen).toBeTruthy()
    
    })


})