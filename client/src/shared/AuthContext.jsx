import React, {useContext, useState} from "react";

const AuthContext = React.createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
