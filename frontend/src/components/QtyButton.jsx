
function QtyButton({qty, minQty, addQty, id}) {
    
  return (
    <div className="flex shadow-md justify-evenly items-center gap-4 rounded-md font-semibold">
        <div onClick={() => minQty(id)} className="cursor-pointer hover:bg-gray-100 py-2 px-5">-</div>
        <div className="">{qty}</div>
        <div onClick={() => addQty(id)} className="cursor-pointer hover:bg-gray-100 py-2 px-5">+</div>
    </div>
  )
}

export default QtyButton