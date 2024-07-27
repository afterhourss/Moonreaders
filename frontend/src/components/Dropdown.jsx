import { useState } from "react"

function Dropdown({title, dropdownItem}) {
    const [dropdown, setDropdown] = useState(false);
  return (
    <div className="relative">
          <div className="flex gap-2 items-center cursor-pointer text-xl font-normal hover:font-bold transition-all" onClick={() => setDropdown(!dropdown)}>{title}</div>
          {dropdown &&
          <div className="absolute bg-white rounded-md flex flex-col gap-5 border border-gray-200">
            {dropdownItem.map((item, index) => {
              return <div key={index} className="hover:bg-gray-50 py-2 px-3 cursor-pointer">
                {item.name}
              </div>
            })}
          </div>
          }
    </div>
  )
}

export default Dropdown