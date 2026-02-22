
import { useAuth } from '../context/auth-context';
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
            <header className="fixed top-0 left-0 right-0 bg-slate-900 py-3.5 shadow-xl">
                <ul className="flex mx-auto w-max">
                   {state.isAuthenticated ? (
                        <>
                        <li className="px-5 text-white text-lg font-medium flex items-center">
                            Welcome, {state.user?.name}
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
                                ${item.label===active ? "text-cyan-700 font-bold" : "text-white"}
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