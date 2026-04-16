type SortProps ={
    value: string,
    setOrder: (value:string) => void
}

const sortOptions = [
    {value:'id-asc', label:'ID ↑'},
    {value:'id-desc', label:'ID ↓'},
    {value:'date-asc', label:'Date ↑'},
    {value:'date-desc', label:'Date ↓'},
]

const Sort = ({value, setOrder}: SortProps) => {
    return(
        <>
           <select name="sort" id="sort" onChange={e => setOrder(e.target.value)} value={value}
            className="w-full border border-gray-300 rounded-lg focus:outline-none bg-white text-black text-xs"
            >
                {sortOptions.map((opt)=>
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                )}
           </select>
        </>
    )
}

export default Sort