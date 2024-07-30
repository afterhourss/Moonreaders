import { useState } from "react"
import { IoIosClose } from "react-icons/io";
import { useOutletContext } from "react-router-dom";
import { toRupiah, getCapitalize } from "../utils/utils";
import { Link } from "react-router-dom";
import QtyButton from "../components/QtyButton";

function Cartpage() {
    const [addCart, cart, removeCartItem, addQty, minQty] = useOutletContext();


    const getTotal = (cart) => {
        const total = cart.reduce((total, item) => total + item.qty * item.price, 0)
        return toRupiah(total)
    }
  
  return (
    <>
    <div className="py-20 px-52 flex items-center justify-between">
        <h1 className="font-bold text-3xl">My Cart.</h1>
        <div><Link to="/"><IoIosClose className="text-5xl"/></Link></div>
    </div>
    {!cart.length ? <div className="italic flex justify-center items-center h-[85vh] text-3xl">There's no item in cart</div>
    :
    <div className="mx-56 flex justify-center gap-12">
        <div>
            {cart.map(item => {
            return <div className="flex justify-around gap-24 items-center border-b py-3" key={item.id_book}>
                <div className="flex-grow">
                    <div className="flex items-center gap-4">
                        <IoIosClose className="text-4xl text-gray-600 cursor-pointer" onClick={() => removeCartItem(item.id_book)}/>
                        <img src={item.cover} alt="" className="w-20" />
                        <div>
                            <h1 className="font-bold text-lg">{getCapitalize(item.title)}</h1>
                            <div className="flex gap-2">
                                {item.author_name?.map((item, index) => {
                                    return <span key={index} className="text-gray-500 text-sm">{getCapitalize(item)}</span>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">{toRupiah(item.price)}</div>
                <QtyButton qty={item.qty} minQty={minQty} addQty={addQty} id={item.id_book}/>
                <div className="font-semibold ">{toRupiah(item.price * item.qty)}</div>
            </div>
            })}
        </div>

        <div className="rounded-lg bg-gray-200 px-5 pb-5 self-start">
            <div className="font-bold py-7 border-b border-gray-400 text-xl">Summary</div>
            <div className="space-y-5 pt-5">
                <div className="flex gap-36 justify-between">
                    <div>Total products</div>
                    <div>{}</div>
                </div>
                <div className="flex gap-36 justify-between">
                    <div>Biaya ongkir</div>
                    <div>Gratis</div>
                </div>
                <div>Add promo code</div>
                <div className="flex gap-36 justify-between font-bold">
                    <div>Total</div>
                    <div>{getTotal(cart)}</div>
                </div>
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 rounded-md transition-all w-full py-4 mt-4 font-bold">Checkout</button>
        </div>


    </div>
}
    </>
  )
}

export default Cartpage