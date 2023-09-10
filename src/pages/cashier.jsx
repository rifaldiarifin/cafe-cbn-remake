import { Route, Routes } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentHandler'
import { Home, OnProcess, History, Complete } from '../components/Fragments/Cashier'
import Button from '../components/Elements/Button'
import UserProfile from '../components/Elements/UserProfile'
import CompanyLogo from '../components/Elements/CompanyLogo'
import AdminPanelUI1 from '../components/Layout/AdminPanelUI1'
import { useDispatch } from 'react-redux'
import usePayOrder from '../hooks/usePayOrder'
import { setAlert } from '../redux/slice/popupScreenSlice'
import useSignOut from '../hooks/useSignOut'

const Cashier = () => {
  useDocumentTitle('Home')
  usePayOrder()
  useSignOut()
  const dispatch = useDispatch()

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
          <div className="box dsp-flex justify-start align-itms-center gap-10">
            <CompanyLogo img="/img/logos/coffeecup_x128.png" alt="cafecbn" companyName="Cafe CBN" />
          </div>
          <div className="box dsp-flex justify-end align-itms-center gap-10">
            <UserProfile img="/me2.png" alt="me" name="Rifaldi Arifin" roleName="Cashier 1" />
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
        <Route path="/onprocess" element={<OnProcess />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </AdminPanelUI1>
  )
}

export default Cashier
