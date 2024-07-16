import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";

const navbarLink = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Categories',
    link: '/categories'
  },
  {
    name: 'About',
    link: '/about'
  },
  {
    name: 'Contact',
    link: '/contact'
  },
]

function Navbar({cart, user, auth}) {

  const [scroll, setScrolled] = useState('')

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
    <div className={`${scroll ? "bg-white shadow-sm" : ""} transition duration-200 flex w-full justify-between h-24 items-center px-24 fixed top-0`}>
        <div className="text-2xl font-bold">MOONREADERS.</div>
        <div>
            <ul className="flex gap-14 text-lg font-normal">
              {navbarLink.map((item, index) => {
                return <li key={index} className="transition-all hover:font-bold"><a href={item.link}>{item.name}</a></li>
              })}
            </ul>
        </div>
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