import { createContext, useState } from "react";

import axios from "../api/axios";

const LOGOUT_URL = '/auth/logout';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    
    const logout = async (inputs) => {
        try {
            await axios.get(LOGOUT_URL,{ 
                method: "GET",
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
            });
            setAuth(null);
        } catch(err){
            console.log(err);
        }
        
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            { children }
        </AuthContext.Provider>
    );
}
export default AuthContext;