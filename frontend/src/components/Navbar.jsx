import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

function Navbar() {
  return (
    <div className="flex w-full justify-between h-24 items-center px-24">
        <div className="text-2xl font-bold">Moonreaders</div>
        <div>
            <ul className="flex gap-14 text-lg font-normal">
              {navbarLink.map((item, index) => {
                return <li key={index} className="transition-all hover:font-bold"><a href={item.link}>{item.name}</a></li>
              })}
            </ul>
        </div>
        <div className="flex gap-14 text-lg items-center">
            <button className="p-3 bg-gray-200 text-gray-500 rounded-full
            "><FaRegBell/></button>
            <div><Link to="/signin">Sign in</Link></div>
            <Link to="/signup"><button className="px-7 py-3 rounded-2xl bg-black text-white hover:bg-gray-900 hover:transition-all">Sign up</button></Link>
        </div>
    </div>
  )
}

export default Navbar