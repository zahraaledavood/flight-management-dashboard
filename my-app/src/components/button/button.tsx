import "./button.scss";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loginCount: number;
};

const Button = ({
  label,
  disabled = false,
  loginCount,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100 w-max mx-auto mt-4">
        <button
          className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800"
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </button>
      </div>
      {loginCount > 1 && (
        <p className="mt-2">You have attempted to log in {loginCount} time.</p>
      )}
    </>
  );
};

export default Button;
