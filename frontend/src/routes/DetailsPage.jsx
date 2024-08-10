import { json, Link, useParams } from "react-router-dom"
import Button from "../components/Button"
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCapitalize } from "../utils/utils";
import { BsThreeDots } from "react-icons/bs";
import Dropdown from "../components/Dropdown";
import { toRupiah } from "../utils/utils";
import { FaArrowLeft } from "react-icons/fa6";



// function getCapitalize(string){
//     const modStr = string[0].toUpperCase() + string.slice(1);
//     return modStr;
// }

const dropdownItem = [
    {
        name: 'Share',
        link: '/share'
    },{
        name: 'Report',
        link: '/report'
    }
]

function DetailsPage() {
    const { id } = useParams();
    const [book, setBook] = useState({})
    const [addCart, cart] = useOutletContext();
    const [dropdown, setDropdown] = useState(false);

    const getBook = async () => {
        try {
            const response = await fetch(`http://localhost:5000/info/${id}`);
            const jsonData = await response.json();
            // console.log(jsonData.rows[0].author_name)
            setBook(jsonData.rows[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBook();
    },[])


  return (
    <>
    <Link to="/" className="mx-64 text-2xl mt-14 inline-block">
        <FaArrowLeft />
    </Link>
    
    <div className="flex mx-64 gap-24 mt-14">
        <img src={book.cover} alt="" className="rounded-lg w-80 h-[500px] object-cover"/>
        <div className="space-y-2">
            <div className="flex justify-between"> 
                <div>
                    <h1 className="text-5xl text-black font-bold">{getCapitalize(book.title || '...')}</h1>
                    <div className="flex gap-2">
                        {book.author_name?.map((item, index) => {
                            return <span key={index} className="underline">{getCapitalize(item)}</span>
                            })
                        }
                    </div>
                </div>
                <Dropdown title={<BsThreeDots className="hover:bg-gray-100 rounded-full"/>} dropdownItem={dropdownItem}/>
            </div>
            <p className="text-gray-500">{book.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis exercitationem possimus reprehenderit doloribus esse deleniti fugiat, perspiciatis quis sint corporis!</p>
            <div>Publisher : </div>
            <div>First Publish : {book.pub_date}</div>
            <div>Language : </div>
            <h3>{toRupiah(book.price)}</h3>
            <div className="space-x-3">
                <Button text="Buy Now"/>
                <button className="px-7 py-2 rounded-lg bg-black text-white hover:bg-gray-900 hover:transition-all font-semibold"  onClick={() => addCart(book)}>Add To Cart</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default DetailsPage