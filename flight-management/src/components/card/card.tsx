import './card.scss';
import LoginForm from '../login-form/login-form.tsx';
import AuthService from '../../services/auth.service.ts'
import { useAuth } from '../../context/auth-context.tsx'
import { useNavigate } from 'react-router-dom';



type CardProps = {
    imgSrc: string

}

const Card = ({imgSrc}: CardProps) => {
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    const handleLoginSubmit = async (data: { email: string; password: string }) => {
        const result = await AuthService.login(data)
        if (result.success) {
          dispatch({ type: 'LOGIN', payload: { email: data.email, password: data.email } })
          navigate('/dashboard')
        }
        return result
      }

    return (
        <>
            <div className="w-max md:max-w-3xl mx-auto flex mt-40 shadow-xl border bg-white rounded-lg sm:rounded-0">
                <img className="max-w-md items-start hidden sm:block" src={imgSrc}  />
                <div className="bg-white mx-auto py-10 px-10">
                    <LoginForm onLogin={handleLoginSubmit} />
                </div>
                
            </div>
        </>
    )
}

export default Card