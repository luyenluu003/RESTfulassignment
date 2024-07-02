import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-80 flex items-center px-4 bg-grey rounded-md ">
            <input
                type="text"
                placeholder="Search users"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
            />

            {
                value && (
                    <IoMdClose className="text-xl text-dark-grey cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />
                )
            }
            <FaMagnifyingGlass className="text-dark-grey cursor-pointer hover:text-black" onClick={handleSearch} />
        </div>
    )
}

export default SearchBar