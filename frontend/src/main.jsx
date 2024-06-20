import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App.jsx'
import SigninPage from './routes/SigninPage.jsx';
import SignupPage from './routes/SignupPage.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/signin',
    element: <SigninPage/>,
  },
  {
    path: '/signup',
    element: <SignupPage/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
