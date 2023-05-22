/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const resetAuth = () => {
        return {
            token: "",
            firstName: "",
            lastName: "",
            email: "",
            roles: [""],
            image: "",
            id: "",
        }
    }

    const resetLogin = () => {
        return false
    }
    
    const [auth, setAuth] = useState(resetAuth())
    const [isLoggedIn, setIsLoggedIn] = useState(resetLogin())

    return (
        <AuthContext.Provider value={{auth, setAuth, isLoggedIn, setIsLoggedIn, resetAuth, resetLogin}}>
            {props.children}
        </AuthContext.Provider>
    )
}
