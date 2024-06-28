import { useEffect, useState, useContext } from "react"
import AuthContext from "../context/AuthContext";

function SignupPage() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMatch, setErrorMatch] = useState(false);
    const [errorFill, setErrorFill] = useState(false);

    const {register} = useContext(AuthContext) // data yang di pass function register dari provider dan di konsumsi

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(username === '' || password === '' || confirmPass === ''){
        setErrorFill(true)
        return;
      }
      try {
        await register(username, password)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        if(password !== confirmPass){
            setErrorMatch(true);
        }else{
            setErrorMatch(false)
        }
    }, [password, confirmPass])

    return (
      <div className="box-border w-[600px] flex flex-col py-16 px-16 space-y-6 rounded-2xl shadow-sm justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold text-3xl">Sign up</h1>
        <p className="text-gray-600">Sign up first to get your account!</p>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input type="name" placeholder="Username" className=" rounded-lg py-4 px-12 bg-gray-50" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" className=" rounded-lg py-4 px-12 bg-gray-50"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirm Password" className={`box-border rounded-lg py-4 px-12 bg-gray-50 ${errorMatch ? 'outline-red-600 border-red-600 border' : 'outline-green-600'}`}  value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
          <button className="bg-zinc-950 text-white rounded-md py-5 font-bold text-lg">Register</button>
        </form>
      </div>
    )
  }
  
  export default SignupPage