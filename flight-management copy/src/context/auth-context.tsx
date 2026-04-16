/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

type User = {
    email: string;
    password: string
};

type AuthState= {
    user:User | null;
    isAuthenticated: boolean;
};

type AuthAction = 
| { type: "LOGIN"; payload: User }
| { type: "SIGNUP"; payload: User}
| { type: "LOGOUT" };

const initialState: AuthState = {
    user: null,
    isAuthenticated: true //temporary bc of internet
};

export const AuthContext = createContext<
{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
} | null> (null);


const authReducer = (state: AuthState, action:AuthAction): AuthState => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload, isAuthenticated: true};
        case 'SIGNUP': 
            return {user: action.payload, isAuthenticated: true}
        case 'LOGOUT':
            return {user: null, isAuthenticated: false};
        default:
            return state;
    }
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return(
        <AuthContext value={{state, dispatch}}>
            {children}
        </AuthContext>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}