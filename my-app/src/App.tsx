import { useState } from 'react'
import './App.css';
import Card from './components/card/card.tsx';
import Header, { type HeaderItem } from './components/header/header.tsx';
import cardImg from '../public/card-top.jpg';
import Modal from './components/modal/modal.tsx';
import LoginForm from './components/login-form/login-form.tsx';
import SignUp from './components/signup-form/signup-form.tsx';
import AuthService from './services/auth.service.ts';
import { useAuth } from "./components/context/auth-context.tsx";




function App() {

  const [remember, setRemember] = useState(false);
  const [isSignupOpen, setIsSignup] = useState(false);
  const [isLoginOpen, setIsLoggin] = useState(false);

  const items: HeaderItem[] = [
    {label:"Home"},
    {label:"Blog"},
    {label:"About"},
    {label:"Contact"},
    {label:"Sign Up", onClick: () => setIsSignup(true)}
  ];

  const handleLogin = () => {
    setIsLoggin(true);
  }

  const handleToggle = (value: boolean) =>{
    setRemember(value);
  }

  const handleLoginSubmit = async (data: {email: string; password: string}) => {
    const result = await AuthService.login(data)

    if(result.success){
      setIsLoggin(false)
    }

    return result
  }

  const {dispatch} = useAuth();

  const handleSignUp = async (data: {name:string; email:string; password:string}) => {
    const result = await AuthService.Signup(data)

    if (result.success){
      setIsSignup(false)
      dispatch ({type: "LOGIN", payload: {name: data.name, email: data.email}})
    }

    return result
  }


  return (
    <>
      <Header items={items} active='Home' />
       <Modal isOpen={isLoginOpen}
                onClose={() => setIsLoggin(false)}
            >
                <LoginForm onLogin={handleLoginSubmit} />
      </Modal>
      <Modal isOpen={isSignupOpen} onClose={() => setIsSignup(false)}>
          <SignUp onSignup={handleSignUp} onGoogleSign={() => console.log("click on google")} onLogin={() => console.log("click on login")} />
      </Modal>
      <Card 
          imgSrc={cardImg} 
          title="Welcome Zahra !" 
          content="Please enter your information right there." 
          onLoginClick={handleLogin}
          onToggle={handleToggle}
          remember={remember}
      /> 

      {/* <TaskProvider>
          <AddTask/>
          <TaskList/>
      </TaskProvider> */}
    </>
  )
}

export default App


