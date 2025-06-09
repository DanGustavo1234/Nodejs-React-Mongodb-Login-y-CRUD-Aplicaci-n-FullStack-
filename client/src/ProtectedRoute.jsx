import { useAuth } from "./context/AuthContext";
import {Navigate,Outlet} from 'react-router-dom';


const ProtectedRoute = () => {
     const {user,isAuthenticated}=useAuth();
     console.log("User in ProtectedRoute:", user);
     if (!isAuthenticated) {
        return <Navigate to="/login" replace />
     }
    return <Outlet/>
}
export default ProtectedRoute
