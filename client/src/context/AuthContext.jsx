import {createContext, useState} from 'react';
import { registerRequest ,loginRequest,verifyTokenRequest} from '../api/auth';
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
       async function checkLogin(){
            const cookies = Cookies.get();
            if(cookies.token){
                try{
                   const res =await verifyTokenRequest(cookies.token);
                   console.log("Token verification response:", res);
                   if(!res.data) setIsAuthenticated(false);
                   setIsAuthenticated(true);
                     setUser(res.data); 
                }catch(error){
                    setIsAuthenticated(false);
                    setUser(null);
                    console.error("Error verifying token:", error);
                }
        }else{
            setIsAuthenticated(false);
            setUser(null);
            return
        }
    }
        checkLogin();
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