import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/auth-context.tsx'


const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {state} = useAuth()

    if (!state.isAuthenticated) return <Navigate to="/login" />

    return <>{children}</>
}

export default ProtectedRoute;