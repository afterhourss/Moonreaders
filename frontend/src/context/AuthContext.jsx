import { createContext, useState, useEffect, Children } from "react";
import axios from "axios";

import SignupPage from "../routes/SignupPage";

export const AuthContext = createContext();

function AuthProvider() {

    // const [user,setUser] = useState(null);

    // useEffect(()=> {
    //   const token = localStorage.getItem('token');
    //   if(token){
    //     axios.defaults.headers.common['x-auth-token'] = token;
    //   }
    // })

    const register = async (username, password) => {
      const response = await axios.post('http://localhost:5000/auth/register', { username, password });
      return response;
    };

    // const login = async (username, password) => {
    //     const response = await axios.post('http://localhost:5000/auth/login', { username, password });
    //     localStorage.setItem('token', response.data.token);
    //     axios.defaults.headers.common['x-auth-token'] = response.data.token;
    //     setUser(response.data.user);
    //     return response.data;
    // };
  return (
    <AuthContext.Provider value={register}>
      {/* {children} */}
      <SignupPage/>
    </AuthContext.Provider>
  )
}

export default AuthProvider