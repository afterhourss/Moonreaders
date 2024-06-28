import { FaSearch } from "react-icons/fa";
function SearchBar() {
  return (
 
    <div className="relative">
        <input type="search" placeholder="Type Here" className="w-[800px] py-4 px-12 rounded-full bg-gray-200" />
        <button className="absolute left-0 p-4 top-1 text-lg text-gray-400"><FaSearch/></button>
    </div>

  )
}

export default SearchBar