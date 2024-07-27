import Button from "./Button"

function Box() {
  return (
    <div className="py-4 px-5 gap-10 bg-white flex justify-around rounded-lg border shadow-md">
        <div className="self-end w-28 basis-56 space-y-9">
            <div className="font-bold text-3xl">Pre-order now</div>
            <Button text="Shop now"/>
        </div>
        <div>
            <img src="/book1.png" alt="" className="w-56 rounded-lg"/>
        </div>
    </div>
  )
}

export default Box