import { render, screen } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from "../../src/router/AppRouter"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar/pages/CalendarPage"

jest.mock("../../src/hooks/useAuthStore")

jest.mock("../../src/calendar/pages/CalendarPage", () => ({

    CalendarPage: () => <h1>Calendar Page</h1>

}))

describe('Pruebas en <AppRouter></AppRouter>', () => { 

    const mockCheckAuthToken = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    beforeEach(() => jest.clearAllTimers())

    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => { 
    
        useAuthStore.mockReturnValue({
        
            status: "cheking",

            checkAuthToken: mockCheckAuthToken
        
        })

        render(<AppRouter></AppRouter>)

        expect(screen.getByText("Cargandooo.....")).toBeTruthy()

        expect(mockCheckAuthToken).toHaveBeenCalled()
    
    })

    test('debe de mostrar el login en caso de no estar autenticado', () => { 
        
        useAuthStore.mockReturnValue({
        
            status: "not-authenticed",

            checkAuthToken: mockCheckAuthToken
        
        })

        const {container} = render(

            <MemoryRouter>
            
                <AppRouter></AppRouter>
            
            </MemoryRouter>
            
        )

        expect(screen.getByText("Ingreso")).toBeTruthy()

        expect(container).toMatchSnapshot()
    
    })

    test('debe de mostrar el calendario si esta autenticado', () => { 
        
        useAuthStore.mockReturnValue({
        
            status: "authenticed",

            checkAuthToken: mockCheckAuthToken
        
        })

        render(

            <MemoryRouter>
            
                <AppRouter></AppRouter>
            
            </MemoryRouter>
            
        )

        expect(screen.getByText("Calendar Page")).toBeTruthy()


    })


})