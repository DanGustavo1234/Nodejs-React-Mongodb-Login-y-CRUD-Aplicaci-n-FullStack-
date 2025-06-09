import { useAuth } from "./context/AuthContext";
import {Navigate,Outlet} from 'react-router-dom';


const PublicRoute = () => {
     const {user,isAuthenticated}=useAuth();
     console.log("User in PublicRoute:", user);
     if (isAuthenticated) {
        return <Navigate to="/tasks" replace />
     }
    return <Outlet/>
}
export default PublicRoute
