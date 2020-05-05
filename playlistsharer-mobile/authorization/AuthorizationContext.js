import React from 'react'

const AuthorizationContext = React.createContext({});

const AuthorizationProvider = ({children}) => {
    
    return (
        <AuthorizationContext.Provider>
            {children}
        </AuthorizationContext.Provider>
    )
}

export {AuthorizationProvider, AuthorizationContext};