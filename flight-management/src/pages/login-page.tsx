import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import AuthService from '../services/auth.service'
import LoginForm from '../components/login-form/login-form'
import SignUp from '../components/signup-form/signup-form'
import Modal from '../components/modal/modal'
import Card from '../components/card/card'
import Header, { type HeaderItem } from '../components/header/header'
import cardImg from '../../public/card-top.png'

const LoginPage = () => {
  const [isSignupOpen, setIsSignup] = useState(false)
  const [isLoginOpen, setIsLogin] = useState(false)
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const items: HeaderItem[] = [
    { label: 'Home' },
    { label: 'Sign Up', onClick: () => setIsSignup(true) }
  ]

  const handleLoginSubmit = async (data: { email: string; password: string }) => {
    const result = await AuthService.login(data)
    if (result.success) {
      dispatch({ type: 'LOGIN', payload: { email: data.email, password: data.email } })
      navigate('/dashboard')
    }
    return result
  }

  const handleSignUp = async (data: { name: string; email: string; password: string }) => {
    const result = await AuthService.Signup(data)
    
    if (result.success) {
      dispatch({ type: 'SIGNUP', payload: { email: data.name, password: data.email } })
      navigate('/dashboard')
    }
    return result
  }

  return (
    <>
      <Header items={items} active='Home' />
      <Modal isOpen={isLoginOpen} onClose={() => setIsLogin(false)}>
        <LoginForm onLogin={handleLoginSubmit} />
      </Modal>
      <Modal isOpen={isSignupOpen} onClose={() => setIsSignup(false)}>
        <SignUp onSignup={handleSignUp} onGoogleSign={() => {}} onLogin={() => {}} />
      </Modal>
      <Card
        imgSrc={cardImg}
      />
    </>
  )
}

export default LoginPage