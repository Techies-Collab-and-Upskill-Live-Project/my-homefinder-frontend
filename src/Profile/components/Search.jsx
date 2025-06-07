import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className='relative md:flex hidden justify-center items-center'>
            <input 
            className="border-2 border-gray-400 w-68 pl-5 h-9 rounded-xl  focus:outline-none focus:border-[#873E96] text-sm" 
            type="text"
            placeholder='Search'
            />
            <Search className="absolute ml-60 top-4 transform -translate-y-1/2 w-4" />
        </div>
    );
}

export default SearchBar;
