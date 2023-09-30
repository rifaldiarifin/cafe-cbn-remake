import { Route, Routes } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentHandler'
import { Home, OnProcess, History, Complete } from '../components/Fragments/Cashier'
import Button from '../components/Elements/Button'
import UserProfile from '../components/Elements/UserProfile'
import CompanyLogo from '../components/Elements/CompanyLogo'
import AdminPanelUI1 from '../components/Layout/AdminPanelUI1'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../redux/slice/popupScreenSlice'
import useSignOut from '../hooks/useSignOut'
import { toggleDarkMode } from '../redux/slice/darkModeSlice'
import useTransactionData from '../hooks/useTransactionData'
import useTransactionToday from '../hooks/useTransactionToday'
import useMenuData from '../hooks/useMenuData'
import getImage from '../utils/getImage'

const Cashier = () => {
  useDocumentTitle('Home')
  useSignOut()
  const transactionToday = useTransactionToday()
  const transactionData = useTransactionData()
  const menuData = useMenuData()
  const dispatch = useDispatch()
  const userSession = useSelector((state) => state.auth.data.userSession)
  const darkMode = useSelector((state) => state.darkMode.data)

  const signOut = () => {
    dispatch(
      setAlert({
        actionName: 'signOut',
        title: 'Sign Out',
        description: 'Are you sure?',
        alertType: 'confirm',
        alertStyle: 'warning'
      })
    )
  }

  return (
    <AdminPanelUI1
      Header={
        <>
          <div className="box dsp-flex justify-start align-itms-center gap-10 fl-1">
            <CompanyLogo img="/img/logos/coffeecup_x128.png" alt="cafecbn" companyName="Cafe CBN" />
          </div>
          <div className="box dsp-flex justify-end align-itms-center gap-10 fl-1">
            <Button
              style={'fill'}
              color="classic"
              moreClass={'icon'}
              icon={darkMode ? 'crescent-moon' : 'sun'}
              iconSize="24px"
              onClick={() => dispatch(toggleDarkMode())}
            />
            <UserProfile
              img={getImage(userSession?.profileImage, 'noavatar')}
              alt={userSession?.firstname ?? 'noavatar'}
              name={`${userSession?.firstname ?? 'Hello'} ${userSession?.lastname ?? 'World'}`}
              roleName="Cashier"
            />
            <Button
              style="fill"
              color="third"
              icon="exit"
              iconStyle="regular"
              moreClass="icon"
              iconSize="22px"
              onClick={signOut}
            ></Button>
          </div>
        </>
      }
      Nav={
        <ul>
          <AdminPanelUI1.CustomLink to="/cashier" name="Home" />
          <AdminPanelUI1.CustomLink to="/cashier/onprocess" name="On-Process" />
          <AdminPanelUI1.CustomLink to="/cashier/complete" name="Complete" />
          <AdminPanelUI1.CustomLink to="/cashier/history" name="History" />
        </ul>
      }
      Footer={
        <>
          <div className="box dsp-flex h-100 justify-center align-itms-center">
            <span className="disabled-text-2">Copyright © 2023, All Rights Reserved.</span>
          </div>
        </>
      }
      url="/cashier"
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/onprocess" element={<OnProcess menuData={menuData} transactionToday={transactionToday} />} />
        <Route path="/complete" element={<Complete menuData={menuData} transactionToday={transactionToday} />} />
        <Route path="/history" element={<History menuData={menuData} transactionData={transactionData} />} />
      </Routes>
    </AdminPanelUI1>
  )
}

export default Cashier
