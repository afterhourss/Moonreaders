import SearchBar from "./SearchBar"
import BookWrapper from "./BookWrapper"
import { useEffect, useState } from "react"

function getCapitalize(string){
  const modStr = string[0].toUpperCase() + string.slice(1);
  return modStr;
}

function Category() {

  const [books, setBook] = useState([]);
  
  const getBook = async () => {
    try{
      const response = await fetch('http://localhost:5000/')
      const jsonData = await response.json()

      setBook(jsonData);
    }catch(err){
      console.error(err.message)
    }
  }

  useEffect(() => {
    getBook();
  },[])

  console.log(books)

  return (
    <div className="mx-24 mt-28 flex gap-28">
      <div className="flex-2"> 
        <h1 className="text-3xl font-bold">Book of the Year 📚</h1>
        {books.map(book => {
        if(book.boty){
        return <div key={book.id} className="flex gap-4 mt-7 items-center">
          <img src={book.cover} alt="sakamotodays" className="w-24 rounded-md" />
          <div>
            <h3 className="font-medium text-2xl">{getCapitalize(book.title)}</h3>
            <p className="text-sm">{getCapitalize(book.description)}</p>
          </div>
        </div>
        }
        })}
      </div>
      <div className="w-full flex flex-col">
        <SearchBar/>
        <div className="flex flex-wrap gap-x-16">
          {books.map(book => {
            return <BookWrapper key={book.id_book} title={getCapitalize(book.title)} author={book.author} cover={book.cover}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Category