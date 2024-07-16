import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
function App() {

  const [cart, setCart] = useState([])
  const [isAuth, setAuth] = useState(false)
  const [userData, setUserData] = useState({});


    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/protected', {
          method: 'POST',
          headers: {token: localStorage.token }
      })
      const parseRes = await response.json()
      parseRes.auth === true ? setAuth(true) : setAuth(false)
      setUserData(parseRes.data.rows[0])
      } catch (error) { 
        console.log(error)
      }
    }

  const addCart = (newItem) => {
    setCart((oldArray) => {
      //cek jika cart item yang baru sudah ada di array sebelumnya
    const itemExists = oldArray.some(item => item.id_book === newItem.id_book);
    
    //jika item tidak ada, masukkan kedalam array cart, sebaliknya return array yang lama
    return itemExists ? oldArray : [...oldArray, newItem];
    })
  }
  const removeCartItem = (id) => {
    const updatedCart = cart.filter(item => item.id_book !== id)
    setCart(updatedCart)
  }

  useEffect(() => {
    checkAuth();
  },[])

  return (
    <div className="pt-24">
      <Navbar cart={cart} user={userData} auth={isAuth}/>
      <Outlet context={[addCart, cart, removeCartItem]}/>
    </div>
  )
}

export default App
