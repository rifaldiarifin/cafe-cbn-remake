import { createBrowserRouter } from 'react-router-dom'
import SignInPage from '../pages/signin'
import Landing from '../pages/landing'
import Dashboard from '../pages/dashboard'
import Page404 from '../pages/page404'
import Cashier from '../pages/cashier'
import Kitchen from '../pages/kitchen'
import Machine from '../pages/machine'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Page404 />
  },
  {
    path: '/auth/signin',
    element: <SignInPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/cashier',
    element: <Cashier />
  },
  {
    path: '/kitchen',
    element: <Kitchen />
  },
  {
    path: '/machine',
    element: <Machine />
  }
])

export default router
