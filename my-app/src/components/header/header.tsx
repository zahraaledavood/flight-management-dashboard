import './header.scss'

type HeaderProps = {
    items: Array<string>
    active: string
}

const Header = ({items, active}: HeaderProps) => {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-slate-900 py-3.5 shadow-xl">
                <ul className="flex mx-auto w-max">
                    {items.map((item)=>(
                        <li
                            key={item}
                            className={item === active ? "text-cyan-700 font-bold text-lg px-5" : "text-white font-medium text-lg px-5"}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </header>
        </>
    )
}

export default Header