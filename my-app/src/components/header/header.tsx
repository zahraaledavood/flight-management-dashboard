
import { useAuth } from '../../context/auth-context';
import './header.scss';

export type HeaderItem = {
    label: string
    onClick?: () => void
  }
  

  type HeaderProps = {
    items: HeaderItem[]
    active: string
  }
  

const Header = ({items, active}: HeaderProps) => {
    const {state, dispatch} = useAuth();

    return (
        <>
            <header className="w-full bg-white py-3.5 shadow-sm">
                <ul className="flex w-full px-6 justify-start">
                   {state.isAuthenticated ? (
                        <>
                        <li className="px-5 text-black text-lg font-medium flex items-center">
                            Welcome, {state.user?.email}
                        </li>
                        <li className="px-5">
                            <button
                                className="bg-transparent text-lg font-medium text-red-400 hover:text-red-300"
                                onClick={() => dispatch({ type: "LOGOUT" })}>
                                Logout
                            </button>
                        </li>
                    </>
                   ) : (
                    items.map((item)=> (
                        <li className="px-5" key={item.label}>
                            <button className={`bg-transparent text-lg font-medium outline-none focus:outline-none focus:ring-0 hover:border-0 active:border-0 focus:border-0
                                ${item.label===active ? "text-cyan-700 font-bold" : "text-black"}
                                hover:text-cyan-400 
                                `} onClick={item.onClick}>
                                {item.label}
                                
                            </button>
                        </li>
                   ))
                )}
                </ul>
            </header>

            

        </>
    )
}

export default Header