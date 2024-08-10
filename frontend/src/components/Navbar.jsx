import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const [scroll, setScrolled] = useState('')
  const [sidebarCart, setSidebarCart] = useState(false)
  const [dropdown, setDropdown] = useState(true)

  const toggleSidebarCart = () => {
    setSidebarCart(!sidebarCart)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate(0)
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
    <div className={`${scroll ? "bg-white shadow-sm" : ""} transition duration-200 flex w-full justify-between h-24 items-center fixed top-0 px-10`}>
        <Link to='/'>
          <div className="text-2xl font-bold">MOONREADERS.</div>
        </Link>
        <Dropdown title="Choice" dropdownItem={dropdownItem}/>
        <div className="hidden lg:block">
          <SearchBar/>
        </div>
        <button className="p-3 text-gray-500
            relative" onClick={toggleSidebarCart}>
            <FaShoppingCart className="text-xl"/>
            {cart.length !== 0 ? <div className="absolute top-1 right-0 rounded-full w-4 h-4 bg-orange-400 text-xs text-white">{cart.length}</div> : ""}
          </button>
        <div className="gap-14 text-lg items-center hidden lg:flex">
          {!auth ?
          <>
            <div><Link to="/signin" className="font-semibold">Sign in</Link></div>
            <Link to="/signup"><Button text="Sign up"/></Link>
            </>
            :
            <div className="flex items-center gap-6 relative">
              <img src={user.profile} alt="" className="rounded-full w-10"/>
              <IoIosArrowDown className="text-2xl hover:bg-gray-200 rounded-full" onClick={() => setDropdown(!dropdown)}/>
              {dropdown &&
              <div className="absolute bg-white rounded-lg right-0 top-12 w-[400px] py-2 px-1 border border-gray-200">
                <div className="flex px-4 items-center">
                  <img src={user.profile} alt="" className="rounded-full w-[120px]"/>
                  <div><span className="font-bold">Selamat datang<br/></span>{user.username}</div>
                </div>
                <div className="py-2 px-3 cursor-pointer">
                  <Link to={`/profile/${user.username}`}>
                    <div className="hover:bg-gray-50 py-1 px-3 rounded-lg">Profile</div>
                  </Link>
                  <div className="hover:bg-gray-50 py-1 px-3 rounded-lg" onClick={handleLogout}>Logout</div>
                </div>
              </div>
              }
            </div>
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