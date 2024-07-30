import { IoIosClose } from "react-icons/io";
import { getCapitalize, toRupiah } from "../utils/utils";
import QtyButton from "./QtyButton";
import { Link } from "react-router-dom";

function Sidebar({toggle, cart, addQty, minQty}) {

    const getTotal = (cart) => {
        const total = cart.reduce((total, item) => total + item.qty * item.price, 0)
        return toRupiah(total)
    }
 
  return (
    <>
    <div className="bg-black w-full h-[100vh] opacity-40 fixed top-0" onClick={toggle}></div>
    <div className="w-[500px] h-[100vh] fixed bg-white right-0 top-0 px-6 py-15 overflow-y-scroll">
        <div className="flex justify-between items-center py-10">
            <div className="font-bold text-2xl">Shopping Cart</div>
            <IoIosClose className="text-5xl cursor-pointer" onClick={toggle}/>
        </div>

        {cart.map((item, index) => {
         return <div className="flex justify-between border-b border-gray-300 py-5" key={index}>
            <div className="flex gap-4">
                <img src={item.cover} alt="" className="w-24 h-36 object-cover"/>
                <div>
                    <div className="font-medium">{getCapitalize(item.title)}</div>
                    <div className="text-gray-500">Author: {item.author_name?.map((author, author_index) => {
                       return <span key={author_index} className="underline">{`${getCapitalize(author)}. `}</span> 
                    })}</div>
                    <QtyButton qty={item.qty} addQty={addQty} minQty={minQty} id={item.id_book}/>
                </div>
            </div>
            <div className="flex flex-col text-right justify-between">
                <div className="font-semibold">{toRupiah(item.qty * item.price)}</div>
                <div className="underline text-gray-500">Remove item</div>
            </div>
        </div>
        })}
        <div className="pt-10 space-y-5 text-lg pl-36">
            <div className="flex justify-between">
                <div>Total products:</div>
                <div>30</div>
            </div>
            <div className="flex justify-between">
                <div>Shipping cost:</div>
                <div>Free</div>
            </div>
            <div className="flex justify-between">
                <div>Total:</div>
                <div>{getTotal(cart)}</div>
            </div>
        </div>
        <div className="flex py-10 justify-between">
            <button className="bg-gray-300 py-3 px-5 rounded-md">Continue shopping</button>
            <Link to="/cart" onClick={toggle}>
                <button  className="bg-black text-white py-3 px-5 rounded-md">Go to checkout</button>
            </Link>
        </div>

        
    </div>
    </>
  )
}

export default Sidebar