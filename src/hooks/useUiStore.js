import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModalOpen, onOpenDateModal } from "../store/ui/uiSlice"

export const useUiStore = () => {

    const dispatch = useDispatch()
    
    const { isDateModalOpen } = useSelector(state => state.ui)

    const openDateModal = () => {
    
        dispatch(onOpenDateModal())
    
    }

    const closeDateMoral = () => {
    
        dispatch(onCloseDateModalOpen())

    
    }

    const toogleDateModal = () => {
        
        (isDateModalOpen) ? openDateModal() : closeDateMoral()
    
    
    }

    return {
    
        // properties

        isDateModalOpen,

        // metodos
        openDateModal, 
        closeDateMoral,
        toogleDateModal
    
    }


}
