import SearchBar from "./SearchBar"
import BookWrapper from "./BookWrapper"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


function getCapitalize(string){
  const modStr = string[0].toUpperCase() + string.slice(1);
  return modStr;
}

function Category() {
  const [addCart, cart, removeCartItem, addQty, minQty, userData, isAuth, apiHost, apiPort] = useOutletContext();
  
  const [books, setBook] = useState([]);
  const [category, setCategory] = useState([]);
  const [boty, setBoty] = useState([]);
  
  const getBook = async () => {
    try{
      const response = await fetch(`${apiHost}:${apiPort}/book`)
      const jsonData = await response.json()
      
      setBook(jsonData);
    }catch(err){
      console.error(err.message)
    }
  }
  
  const getCategory = async () => {
    try{
      const response = await fetch(`${apiHost}:${apiPort}/category`)
      const jsonData = await response.json()
      
      setCategory(jsonData);
    }catch(err){
      console.error(err.message)
    }
  }
  
  const getBoty = async () => {
    try {
      const response = await fetch(`${apiHost}:${apiPort}/book/boty`)
      const jsonData = await response.json()
      
      setBoty(jsonData);
    } catch (err) {
      console.error(err.message)
    }
  }
  
  useEffect(() => {
    getBook();
    getCategory();
    getBoty();
  },[])
  
  return (
    <>
    
    <div className="lg:px-52 flex gap-28 lg:flex-row flex-col">
      <div className="flex-2 space-y-3">
      <h1 className="text-3xl font-bold text-gray-300 pb-9">Category</h1>
      {category.map((item, index) => {
        return <div className="pl-3 py-1 hover:bg-blue-50 hover:rounded-full group" key={index}>
          <h3 className="group-hover:text-blue-400 text-lg text-gray-800 font-medium">{getCapitalize(item.name)}</h3>
        </div>
      })}
        {/* <h1 className="text-3xl font-bold">Book of the Year 📚</h1>
        {books.map(book => {  
        if(book.boty){
        return <div key={book.id_book} className="flex gap-4 mt-7 items-center">
          <img src={book.cover} alt="sakamotodays" className="w-24 rounded-md" />
          <div>
            <h3 className="font-medium text-2xl">{getCapitalize(book.title)}</h3>
            <p className="text-sm">{getCapitalize(book.description)}</p>
          </div>
        </div>
        }
        })} */}
      </div>

      <div className="w-full flex flex-col border-l mx-auto pl-11">
        <div>
        <h1 className="text-3xl font-bold text-gray-300">Book of the year</h1>
        <div className="flex gap-5 my-10">
          {boty.map((book, index) => {
            return <div className="relative" key={index}>
              <img src={book.cover} alt="" className="rounded-md w-[130px] h-[200px] object-cover"/>
              <div className="absolute top-0 bg-white w-10 h-10 text-center font-bold text-xl rounded-md">{index + 1}</div>
            </div>
          })}
          
        </div>
      </div>
        <div className="flex flex-wrap gap-x-10">
          {books.map(book => {
            return <Link key={book.id_book} to={`/info/${book.id_book}`}><BookWrapper title={getCapitalize(book.title)} author={book.author} cover={book.cover} rating={book.rating} price={book.price}/></Link>
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default Category