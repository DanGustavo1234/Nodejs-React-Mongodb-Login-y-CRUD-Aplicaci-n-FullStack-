import {BrowserRouter,Route,Routes} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import TasksPage from './pages/TaskPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>

        {/* Rutas Publicas */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />

        {/* Rutas Privadas */}
        <Route element={<ProtectedRoute/>}>
        <Route path="/tasks" element={<TasksPage/>} />
        <Route path="/tasks/:id" element={<TaskFormPage/>} />
        <Route path="/add-task" element={<TaskFormPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
