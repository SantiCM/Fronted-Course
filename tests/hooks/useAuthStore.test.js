import { configureStore } from "@reduxjs/toolkit"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store/auth/authSlice"
import { renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import {notAuthenticedState, initialState} from "../fixtures/auth-states"
import { act } from "react-dom/test-utils"
import { testUserCredencials } from "../fixtures/testUser"
import {calendarApi} from "../../src/api/calendarApi"

const getMockStore = ( initialState ) => {

    return configureStore({
    
        reducer : {
            
            auth: authSlice.reducer
    
        },

        preloadedState: {
            
            auth: {...initialState}
            
        }
    
    })

}

describe('Pruebas en useAuthStore', () => { 

    beforeEach(() => localStorage.clear)

    test('debe regresar los valores por defectos', () => { 
        
        const mockStore = getMockStore({ status: "cheking", user: {},  errorMessage : undefined})
    
        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        expect(result.current).toEqual({
        
            status: 'cheking',

            user: {},

            errorMessage: undefined,

            checkAuthToken: expect.any(Function),

            startLogin: expect.any(Function),

            startRegister: expect.any(Function),

            startLogout: expect.any(Function)
        
        })

    })

    test('startLogin debe de realizar el login correctamente', async() => { 

        const mockStore = getMockStore({...notAuthenticedState})

        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        await act(async() => {
            
            await result.current.startLogin( testUserCredencials )
        
        })

        const {errorMessage, status, user} = result.current

        expect({errorMessage, status, user}).toEqual({
        
            status: 'authenticed',

            user: { name: expect.any(String) , uid: expect.any(String) },
            
            errorMessage: undefined,
        
        })

        expect(localStorage.getItem("token")).toEqual(expect.any(String))

        expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String))

    
    })

    test('startLogin debe fallar la autenticacion', async() => { 
    
        const mockStore = getMockStore({...notAuthenticedState})

        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        await act(async() => {
            
            await result.current.startLogin( {email: "alfdf@gmail.com", password: "121212"} )
        
        })

        const {errorMessage, status, user} = result.current

        expect(localStorage.getItem("token")).toBe(null)

        expect({errorMessage, status, user}).toEqual({
        
            errorMessage: expect.any(String),
            
            status: 'not-authenticed',
            
            user: {}

        })

        // espera que pase y lo ejecuta

        waitFor(
            
            () => expect(result.current.errorMessage).toBe(undefined)

        )

    })

    test('startRegister debe de crear un usuario', async() => { 

        const newUser = {
        
            email: "alfdf@gmail.com", 
            
            password: 121212, 
            
            name: "Test User-2"
        
        }
    
        const mockStore = getMockStore({...notAuthenticedState})

        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        const spy = jest.spyOn( calendarApi, "post" ).mockReturnValue({

            data: {
            
                ok: true,
               
                uid: "121212",
               
                name: "Test User",
               
                token: "ESTO-ESTOKEN"
            
            }

        });

        await act(async() => {
            
            await result.current.startRegister(newUser)
        
        })

        const {errorMessage, status, user} = result.current


        expect({errorMessage, status, user}).toEqual({
            
            errorMessage: undefined,

            status: "authenticed",

            user: {name: "Test User-2", uid: "1263781293"}
        
        })

        spy.mockRestore();


    
    })

    test('startRegister debe fallar la creacion', async() => { 
    
    
        const mockStore = getMockStore({...notAuthenticedState})

        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        await act(async() => {
            
            await result.current.startRegister(testUserCredencials)
        
        })

        const {errorMessage, status, user} = result.current

        expect({errorMessage, status, user}).toEqual({
            
            errorMessage: "Un usuario ya existe con este correo",
            
            status: "not-authenticed",
            
            user: {},
        
        })
    
    })

    test('checkAuthToken debe de fallar si no hay token ', async() => { 
    
        const mockStore = getMockStore({...initialState})

        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        await act(async() => {
            
            await result.current.checkAuthToken()
        
        })

        const {errorMessage, status, user} = result.current

        expect({errorMessage, status, user}).toEqual({
            
            errorMessage: undefined,
            
            status: "not-authenticed",
            
            user: {},
            
        
        })

    })

    test('checkAuthToken debe de autenticar al usuario si hay token', async() => { 
    
        const { data } = await calendarApi.post("/auth", testUserCredencials)

        localStorage.setItem("token", data.token)

        const mockStore = getMockStore({...initialState})

        const {result} = renderHook(() => useAuthStore(), {
            
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>     
        
        })

        await act(async() => {
            
            await result.current.checkAuthToken()
        
        })

        const {errorMessage, status, user} = result.current

        expect({errorMessage, status, user}).toEqual({
            
            errorMessage: undefined,
            
            status: "authenticed",
            
            user: {name: "Test User", uid: "654c0d458f54c087b47a71ab"},
            
        
        })
    
    })

})