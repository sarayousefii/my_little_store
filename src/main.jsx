import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from './component/MainLayout.jsx'
import NotFound from './component/NotFound.jsx'
import { ToastContainer } from 'react-toastify'
import ProductDetails from './component/ProductDetails.jsx'
import "react-toastify/ReactToastify.css"
import CartTable from './component/CartTable.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <MainLayout><NotFound /></MainLayout>
    },
    {
      path:"/products/:productID",
      element:<MainLayout><ProductDetails /></MainLayout>
    },
    {
      path:"/cart",
      element:<MainLayout><CartTable /></MainLayout>
    }
  ]/*,
  {
    basename: "/my_little_store"
  }*/
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
)
