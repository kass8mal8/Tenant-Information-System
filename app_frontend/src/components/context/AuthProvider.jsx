/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {createContext, useState} from 'react'

const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [csrf] = useState({})
    
    return(
        <AuthContext.Provider value={{ auth, setAuth, csrf }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;