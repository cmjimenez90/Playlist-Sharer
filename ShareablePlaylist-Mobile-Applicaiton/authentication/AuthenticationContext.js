import React, {useReducer} from 'react'
import {Reducer,DefaultState} from './AuthenticationReducer';

const AuthenticationContext = React.createContext({});

const AuthenticationProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,DefaultState);
    return (
        <AuthenticationContext.Provider value={[state,dispatch]}>
            {children}
        </AuthenticationContext.Provider>
    )
}
export {AuthenticationProvider, AuthenticationContext};