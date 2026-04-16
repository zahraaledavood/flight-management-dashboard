type SearchProps = {
    query: string,
    onSearch: (searchTerm: string) => void 
}

const Search = ({query, onSearch}: SearchProps) => {
    return(
        <div className="flex w-full">
            <span className="text-gray-500 text-md -rotate-45 absolute translate-x-1 translate-y-1 px-1 " >⚲</span>
            <input type="search" name="search" id="search" placeholder="Search passenger or route.."
             className="w-full h-full rounded-lg border border-gray-300 text-gray-500 bg-transparent text-xs px-5 py-2 focus:outline-none focus:border-gray-400 "
             value={query}
             onChange={e => onSearch(e.target.value)}
             />
        </div>
    )
}

export default Search