import './card.scss';
import Button from '../button/button.tsx';
import Toggle from '../toggle/toggle.tsx';


type CardProps = {
    imgSrc: string
    title: string
    content: string
    loginCount: number
    remember: boolean
    onLoginClick: () => void
    onToggle: (value: boolean) => void
}

const Card = ({imgSrc, title, content, loginCount, remember, onLoginClick, onToggle}: CardProps) => {

    return (
        <>
            <div className="max-w-lg rounded-xl overflow-hidden shadow-xl bg-slate-800">
                <img className="w-full" src={imgSrc} alt={title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                        {title}
                    </div>
                    <p className="text-gray-700 text-white">
                        {content}
                    </p>
                    <Button label="Login" onClick={onLoginClick} loginCount={loginCount} />
                    <Toggle label="Remember me" active={remember} onChange={onToggle} />
                </div>
            </div>
        </>
    )
}

export default Card