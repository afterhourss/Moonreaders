import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [userToken, setUserToken] = useState('');
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login',{username,password})
      localStorage.setItem('token', response.data.token)
      setUserToken(response.data.token)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }
  
  return (
    <div className="w-[600px] flex flex-col py-16 px-16 space-y-6 rounded-2xl shadow-sm justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-bold text-3xl">Sign in</h1>
      <p className="text-gray-600">Sign in to access all features!</p>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input type="name" placeholder="Username" className=" rounded-lg py-4 px-12 bg-gray-50" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        <input type="password" placeholder="Password" className=" rounded-lg py-4 px-12 bg-gray-50" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <button className="bg-zinc-950 text-white rounded-md py-5 font-bold text-lg">Login</button>
      </form>
    </div>
  )
}

export default SigninPage