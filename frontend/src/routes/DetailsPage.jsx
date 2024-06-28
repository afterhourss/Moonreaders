import { useParams } from "react-router-dom"
import Button from "../components/Button"
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";


// function getCapitalize(string){
//     const modStr = string[0].toUpperCase() + string.slice(1);
//     return modStr;
// }

function DetailsPage() {
    const { id } = useParams();
    const [book, setBook] = useState({})
    const [addCart, cart] = useOutletContext();

    const getBook = async () => {
        try {
            const response = await fetch(`http://localhost:5000/info/${id}`);
            const jsonData = await response.json();
            setBook(jsonData[0])
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBook();
    },[])


  return (
    <div className="flex mx-64 gap-24 mt-24">
        <img src={book.cover} alt="" className="rounded-lg w-80 h-[500px] object-cover"/>
        <div className=" space-y-8">
            <h1 className="text-5xl text-black font-bold">{book.title}</h1>
            <h3 className="underline">Author1, Author2, Author3, Author4</h3>
            <h3>Categories : {book.category}</h3>
            <p className="text-gray-500">{book.description}</p>
            <h3>{book.price}</h3>
            <div className="space-x-3">
                <Button text="Buy Now"/>
                <button className="px-7 py-2 rounded-lg bg-black text-white hover:bg-gray-900 hover:transition-all font-semibold"  onClick={() => addCart(book)}>Add To Cart</button>
            </div>
        </div>
    </div>
  )
}

export default DetailsPage