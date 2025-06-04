import {createContext, useState} from 'react';
import { registerRequest } from '../api/auth';
import { useContext } from 'react';


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
    return(
        <AuthContext.Provider value={{
            singUp,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}