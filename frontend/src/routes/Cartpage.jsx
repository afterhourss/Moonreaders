import { useState } from "react"
import { IoIosClose } from "react-icons/io";
import { useOutletContext } from "react-router-dom";
useOutletContext

function Cartpage() {
    const [addCart, cart, removeCartItem] = useOutletContext();
    const [qty, setQty] = useState(0);

    const addQty = (id) => {
        setQty(prevQty => ({
            ...prevQty,
            [id]: (prevQty[id] || 1) + 1
        }));
    };

    const minQty = (id) => {
        setQty(prevQty => ({
            ...prevQty,
            [id]: (prevQty[id] > 1 ? prevQty[id] - 1 : 1)
        }));
    };

  
  return (
    <div className="mx-56">
        <h1 className="font-bold text-3xl py-20">My Cart.</h1>
        {cart.map(item => {
        return <div className="flex justify-around gap-24 items-center border-b py-3" key={item.id_book}>
            <div className="flex-1">
                <div className="flex items-center gap-4">
                    <IoIosClose className="text-4xl text-gray-600 cursor-pointer" onClick={() => removeCartItem(item.id_book)}/>
                    <img src={item.cover} alt="" className="w-20" />
                    <div>
                        <h1 className="font-bold text-lg">{item.title}</h1>
                        <p>Author Name</p>
                    </div>
                </div>
            </div>
            <div className="flex-1">{item.price}</div>
            <div className="flex flex-1 shadow-md justify-evenly gap-4 py-2 px-2 rounded-md w-28 font-semibold">
                <div onClick={() => minQty(item.id_book)} className="cursor-pointer">-</div>
                <div className="">{qty[item.id_book] || 1}</div>
                <div onClick={() => addQty(item.id_book)} className="cursor-pointer">+</div>
            </div>
            <div className="font-semibold flex-1">80.000</div>
        </div>
        })}
    </div>
  )
}

export default Cartpage