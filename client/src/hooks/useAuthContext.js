import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext) // returns the value of the authContext, the value passed into the provider component, value={state, dispatch}
                                                // now {state, dispatch} is stored in context
    if (!context) {
        throw Error('useAuthContext must be used inside AuthContextProvider')
    }

    return context
}                       