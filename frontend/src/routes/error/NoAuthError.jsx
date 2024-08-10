import { Link } from "react-router-dom"
function NoAuthError() {
  return (
    <div className="flex flex-col gap-7 h-[90vh] items-center justify-center">
        <div className="font-bold text-xl">You're not logged in!</div>
        <div className="flex gap-10">
            <Link to="/signin" className="underline">Sign in first</Link>
            <Link to="/" className="underline">Go to home</Link>
        </div>
    </div>
  )
}

export default NoAuthError