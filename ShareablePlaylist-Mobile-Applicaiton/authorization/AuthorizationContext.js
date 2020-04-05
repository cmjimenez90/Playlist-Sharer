import React, {useReducer} from 'react'
import {Reducer,DefaultState} from './AuthorizationReducer';

const AuthorizationContext = React.createContext({});

const AuthorizationProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,DefaultState);
    return (
        <AuthorizationContext.Provider value={[state,dispatch]}>
            {children}
        </AuthorizationContext.Provider>
    )
}
export {AuthorizationProvider, AuthorizationContext};