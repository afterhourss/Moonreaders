import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import SigninPage from './routes/SigninPage.jsx';
import SignupPage from './routes/SignupPage.jsx';
import './index.css'
import DetailsPage from './routes/DetailsPage.jsx';
import Homepage from './routes/Homepage.jsx';
import Cartpage from './routes/Cartpage.jsx';
import Profilepage from './routes/Profilepage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {index:true, element: <Homepage/>},
      {path:"/info/:id", element: <DetailsPage/>},
      {path:"/cart", element: <Cartpage/>},
      {path: '/profile/:username', element: <Profilepage/>}
    ]
  },
  {
    path: '/signin',
    element: <SigninPage/>,
  },
  {
    path: '/signup',
    element: <SignupPage/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
