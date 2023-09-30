import { Route, Routes, createBrowserRouter } from 'react-router-dom'
import SignInPage from '../pages/signin'
import Landing from '../pages/landing'
import Page404 from '../pages/page404'
import Cashier from '../pages/cashier'
import Kitchen from '../pages/kitchen'
import GetStarted from '../pages/getstarted'
import Order from '../pages/order'
import PopupScreen from '../utils/PopupScreen'
import Manager from '../pages/manager'
import Admin from '../pages/admin'
import RequireAuth from '../pages/requireAuth'

const router = createBrowserRouter([
  // Landing Page
  {
    path: '/',
    element: <Landing />,
    errorElement: (
      <PopupScreen>
        <Page404 />
      </PopupScreen>
    )
  },
  // Auth
  {
    path: '/auth/signin',
    element: (
      <PopupScreen>
        <SignInPage />
      </PopupScreen>
    )
  },
  // Admin
  {
    path: '/admin',
    element: (
      <PopupScreen>
        <RequireAuth allowedRole={'admin'}>
          <Admin />
        </RequireAuth>
      </PopupScreen>
    ),
    children: [
      {
        path: 'dashboard',
        element: <></>
      },
      {
        path: 'dashboard/default',
        element: <></>
      },
      {
        path: 'manage/users',
        element: <></>,
        children: [
          {
            path: 'new',
            element: <></>
          }
        ]
      },
      {
        path: 'manage/menu',
        element: <></>,
        children: [
          {
            path: 'groups',
            element: <></>
          }
        ]
      },
      {
        path: 'manage/transaction',
        element: <></>
      },
      {
        path: 'pages/activity',
        element: <></>
      },
      {
        path: 'pages/blog',
        element: <></>
      },
      {
        path: 'pages/adbanner',
        element: <></>
      },
      {
        path: 'pages/settings',
        element: <></>
      }
    ]
  },
  {
    path: '/manager',
    element: (
      <PopupScreen>
        <RequireAuth allowedRole={'manager'}>
          <Manager />
        </RequireAuth>
      </PopupScreen>
    ),
    children: [
      {
        path: 'dashboard',
        element: <></>
      },
      {
        path: 'dashboard/default',
        element: <></>
      },
      {
        path: 'manage/menu',
        element: <></>,
        children: [
          {
            path: 'groups',
            element: <></>
          }
        ]
      },
      {
        path: 'manage/transaction',
        element: <></>
      },
      {
        path: 'pages/activity',
        element: <></>
      },
      {
        path: 'pages/blog',
        element: <></>
      },
      {
        path: 'pages/adbanner',
        element: <></>
      },
      {
        path: 'pages/settings',
        element: <></>
      }
    ]
  },
  // Cashier
  {
    path: '/cashier/*',
    element: (
      <PopupScreen>
        <RequireAuth allowedRole={'cashier'}>
          <Cashier />
        </RequireAuth>
      </PopupScreen>
    )
  },
  // Kitchen
  {
    path: '/kitchen/*',
    element: (
      <PopupScreen>
        <RequireAuth allowedRole={'kitchen'}>
          <Kitchen />
        </RequireAuth>
      </PopupScreen>
    )
  },
  // Machine
  {
    path: '/machine',
    element: (
      <PopupScreen>
        <RequireAuth allowedRole={'machine'}>
          <Routes>
            <Route index element={<GetStarted />} />
            <Route path="order" element={<Order />} />
          </Routes>
        </RequireAuth>
      </PopupScreen>
    ),
    children: [
      {
        path: 'order',
        element: <></>
      }
    ]
  }
])

export default router
