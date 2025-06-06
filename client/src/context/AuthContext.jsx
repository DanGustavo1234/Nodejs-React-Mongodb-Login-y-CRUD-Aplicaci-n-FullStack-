import {createContext, useState} from 'react';
import { registerRequest ,loginRequest} from '../api/auth';
import { useContext } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const  useAuth= () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [errors, setErrors] = useState([]);


    const singUp = async (user) => {
        try{
        const response = await registerRequest(user);
        setUser(response.data)
        setIsAuthenticated(true)
        }catch(error){
            console.error("Error during registration:", error.response.data);
            setErrors(error.response.data);
        }
    }

    const singIn = async (user) => {
        try{
            const response = await loginRequest(user);
            setUser(response.data)
            setIsAuthenticated(true)
            console.log("Login successful:", response.data);
        }catch(error){
            setErrors(error.response.data);
            console.error("Error during login:", error.response.data);
        }
    }

    useEffect(() => {
        const errores = errors.errors || [];
        if(errores.length > 0){
            const timer=setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }

        
    }
    , [errors]);
    useEffect(() => {
        const token = Cookies.get('token');
        if(token){
            console.log("Token found in cookies:", token);
        }
    }
    , []);

    return(
        <AuthContext.Provider value={{
            singUp,
            singIn,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}