
function BookWrapper({title, author, cover, rating, price}) {
  return (
    <div className="flex flex-col mt-7">
        <img src={cover} alt={title} className="rounded-2xl w-[200px] h-[300px] object-cover"/>
        <div>
            <h3 className="font-semibold text-m">{title}</h3>
            <h3 className="text-gray-400 text-sm">Yuta Sakamoto</h3>
        </div>
        <div className="flex">
        {Array.from({ length: rating }).map((_, i) => (
          <img key={i} src="/rate_star.png" alt="star" className="w-4" />
        ))}
        </div>
    </div>
  )
}

export default BookWrapper