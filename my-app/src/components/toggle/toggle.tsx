type ToggleProps = {
  active: boolean;
  label: string;
  onChange: (value: boolean) => void
};

const Toggle = ({ active = false, label, onChange }: ToggleProps) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-12 mt-3">
        <label className="relative inline-flex cursor-pointer items-center gap-3 text-white-900">
          <input type="checkbox" className="peer sr-only" onChange={(e)=> onChange(e.target.checked)} checked={active} />
          <div className="peer h-7 w-12 rounded-full bg-slate-700 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
          <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            {label}
        </label>
      </div>
    </>
  );
};

export default Toggle;
