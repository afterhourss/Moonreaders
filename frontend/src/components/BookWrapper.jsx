
function BookWrapper({title, author, cover}) {
  return (
    <div className="flex flex-col gap-2 mt-7 w-56">
        <img src={cover} alt={title} className="rounded-md w-[300px] h-[350px] object-cover"/>
            <div>
                <h3 className="font-semibold text-2xl">{title}</h3>
                <h3 className="text-gray-400">Yuta Sakamoto</h3>
            </div>
    </div>
  )
}

export default BookWrapper