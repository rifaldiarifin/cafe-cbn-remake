import { createBrowserRouter } from 'react-router-dom'
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
// import { Activity, Banner, Blog, Default, Menu, Settings, Transaction } from '../components/Fragments/Manager'

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
        <Admin />
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
            path: 'category/:category',
            element: <></>,
            children: [
              {
                path: 'subcategory/:subCategory',
                element: <></>
              },
              {
                path: 'new',
                element: <></>
              }
            ]
          },
          {
            path: 'new',
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
        <Manager />
      </PopupScreen>
    )
  },
  {
    path: '/manager',
    element: (
      <PopupScreen>
        <Manager />
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
            path: 'category/:category',
            element: <></>,
            children: [
              {
                path: 'subcategory/:subCategory',
                element: <></>
              },
              {
                path: 'new',
                element: <></>
              }
            ]
          },
          {
            path: 'new',
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
        <Cashier />
      </PopupScreen>
    )
  },
  // Kitchen
  {
    path: '/kitchen/*',
    element: (
      <PopupScreen>
        <Kitchen />
      </PopupScreen>
    )
  },
  // Machine
  {
    path: '/machine',
    element: (
      <PopupScreen>
        <GetStarted />
      </PopupScreen>
    )
  },
  {
    path: '/machine/order',
    element: (
      <PopupScreen>
        <Order />
      </PopupScreen>
    )
  }
])

export default router
