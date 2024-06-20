
function SigninPage() {
  return (
    <div className="w-[600px] flex flex-col py-16 px-16 space-y-6 rounded-2xl shadow-sm justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-bold text-3xl">Sign in</h1>
      <p className="text-gray-600">Sign in to access all features!</p>
      <form className="flex flex-col space-y-4">
        <input type="name" placeholder="Username" className=" rounded-lg py-4 px-12 bg-gray-50"/>
        <input type="password" placeholder="Password" className=" rounded-lg py-4 px-12 bg-gray-50"/>
        <button className="bg-zinc-950 text-white rounded-md py-5 font-bold text-lg">Login</button>
      </form>
    </div>
  )
}

export default SigninPage