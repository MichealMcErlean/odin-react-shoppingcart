import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router'
import './index.css'
import Root from './routes/Root'
import Index from './routes/Index'
import ShopPage from './routes/ShopPage'
import CartPage from './routes/CartPage'

const router = createBrowserRouter([

  {
    path: "/",
    element: <Root />,
    children: [
        { index: true, element: <Index />},
        {
          path: "/shop",
          element: <ShopPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
