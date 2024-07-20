import { FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";

const dropdownItem = [
  {
    name: 'Popular',
    link: '/popular'
  },
  {
    name: 'Best Seller',
    link: '/best-seller'
  },
  {
    name: 'New',
    link: '/new'
  }
]

function Navbar({cart, user, auth}) {

  const [scroll, setScrolled] = useState('')
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${scroll ? "bg-white shadow-sm" : ""} transition duration-200 flex w-full justify-between h-24 items-center px-24 fixed top-0 z-50`}>
        <div className="text-2xl font-bold">MOONREADERS.</div>

        {/* dropdown */}
        <div className="relative z-50">
          <div className="flex gap-2 items-center cursor-pointer text-xl font-normal hover:font-bold transition-all" onClick={() => setDropdown(!dropdown)}>Choice {dropdown ? <IoMdArrowDropdownCircle /> : <IoMdArrowDropdown />}</div>
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
        <SearchBar/>
        <div className="flex gap-14 text-lg items-center">
          {!auth ?
          <>
            <Link to="/cart">
              <button className="p-3 bg-gray-200 text-gray-500 rounded-full
              relative">
                <FaShoppingCart />
                {cart.length !== 0 ? <div className="absolute -top-2 right-0 rounded-full w-4 h-4 bg-black text-xs text-white">{cart.length}</div> : ""}
              </button>
            </Link>
            <div><Link to="/signin" className="font-semibold">Sign in</Link></div>
            <Link to="/signup"><Button text="Sign up"/></Link>
            </>
            : <div>Welcome back, {user.username}</div>
          }
        </div>
    </div>
  )
}

export default Navbar