import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
function App() {

  const [cart, setCart] = useState([])

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

  return (
    <div className="pt-24">
      <Navbar cart={cart}/>
      <Outlet context={[addCart, cart, removeCartItem]}/>
    </div>
  )
}

export default App
