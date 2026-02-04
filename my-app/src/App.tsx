import './App.css';
import Card from './components/card/card.tsx';
import Header from './components/header/header.tsx';
import cardImg from '../public/card-top.jpg';
import { useState } from 'react'


function App() {

  const items = ['Home','Blog', 'Contact Us', 'About Us', 'Sign Up']
  const [loginCount, setLoginCount] = useState(0);
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    setLoginCount(prev => prev + 1)
  }

  const handleToggle = (value: boolean) =>{
    setRemember(value);
  }

  return (
    <>
      <Header items={items} active='Home' />
      <Card 
          imgSrc={cardImg} 
          title="Welcome Zahra !" 
          content="Please enter your information right there." 
          onLoginClick={handleLogin}
          onToggle={handleToggle}
          loginCount={loginCount}
          remember={remember}
      />
    </>
  )
}

export default App
