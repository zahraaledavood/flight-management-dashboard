
import { useAuth } from '../../context/auth-context';
import './header.scss';

export type HeaderItem = {
    label: string
    onClick?: () => void
  }
  

  type HeaderProps = {
    items: HeaderItem[]
    active: string
    showLogout?: boolean
  }
  

const Header = ({items, active, showLogout = false}: HeaderProps) => {
    const {state, dispatch} = useAuth();

    return (
        <>
            <header className="w-full py-1.5">
                <ul className={`flex w-full px-7 mt-3 ${showLogout ? "justify-between" : "justify-center"} `}>
                   {showLogout ? (
                        <>
                        <li className=" text-gray-500 text-sm font-medium flex items-start">
                            Welcome, {state.user?.email}
                        </li>
                        <li className="items-end text-sm font-medium text-red-600 hover:text-red-300">
                            <button
                                className="bg-transparent p-0"
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