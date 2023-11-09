import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore, startDeletingEvent } from "../../../src/hooks/useCalendarStore"

jest.mock("../../../src/hooks/useCalendarStore")


describe('Pruebas en <FabDelete></FabDelete>', () => { 

    const mockStartDeletingEvent = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    beforeEach(() => jest.clearAllTimers())

    test('debe de mostrar el componente correctamente', () => { 

        useCalendarStore.mockReturnValue({
        
            hasEventSelected: false
        
        })
    
        render(<FabDelete></FabDelete>)     

        const btn = screen.getByLabelText("btn-delete")

        expect(btn.classList).toContain("btn")

        expect(btn.classList).toContain("btn-danger")

        expect(btn.classList).toContain("fab-delete")

        expect(btn.style.display).toBe("none")


    })

    test('debe de mostrar el boton si hay un evento activo', () => { 

        useCalendarStore.mockReturnValue({
        
            hasEventSelected: true
        
        })
    
        render(<FabDelete></FabDelete>)  
        
        const btn = screen.getByLabelText("btn-delete")

        expect(btn.style.display).toBe("")

        
    })

    test('debe de llamar el startDeletingEvent si hay evento activo', () => { 

        useCalendarStore.mockReturnValue({
        
            hasEventSelected: true,

            startDeletingEvent: mockStartDeletingEvent

        })
    
        render(<FabDelete></FabDelete>)  
        
        const btn = screen.getByLabelText("btn-delete")

        fireEvent.click(btn)

        expect(mockStartDeletingEvent).toHaveBeenCalled()


    })

})