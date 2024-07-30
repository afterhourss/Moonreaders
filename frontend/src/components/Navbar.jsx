import { FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar";

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

function Navbar({cart, user, auth, addQty, minQty}) {


  const [scroll, setScrolled] = useState('')
  const [sidebarCart, setSidebarCart] = useState(false)

  const toggleSidebarCart = () => {
    setSidebarCart(!sidebarCart)
  }

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
    <>
    <div className={`${scroll ? "bg-white shadow-sm" : ""} transition duration-200 flex w-full justify-between h-24 items-center px-52 fixed top-0`}>
        <div className="text-2xl font-bold">MOONREADERS.</div>

        {/* dropdown */}
        <Dropdown title="Choice" dropdownItem={dropdownItem}/>
        <SearchBar/>
        <div className="flex gap-14 text-lg items-center">
          {!auth ?
          <>
            <button className="p-3 text-gray-500
            relative" onClick={toggleSidebarCart}>
              <FaShoppingCart />
              {cart.length !== 0 ? <div className="absolute top-1 right-0 rounded-full w-4 h-4 bg-orange-400 text-xs text-white">{cart.length}</div> : ""}
            </button>
            <div><Link to="/signin" className="font-semibold">Sign in</Link></div>
            <Link to="/signup"><Button text="Sign up"/></Link>
            </>
            : <div>Welcome back, {user.username}</div>
          }
        </div>
    </div>
    {sidebarCart &&
      <Sidebar toggle={toggleSidebarCart} cart={cart} addQty={addQty} minQty={minQty}/>
    }
    </>
  )
}

export default Navbar