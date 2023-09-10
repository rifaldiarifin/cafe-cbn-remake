import { Route, Routes } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentHandler'
import { Home, OnCooking, Complete } from '../components/Fragments/Kitchen'
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
            <UserProfile img="/me2.png" alt="me" name="Rifaldi Arifin" roleName="Kitchen 1" />
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
          <AdminPanelUI1.CustomLink to="/kitchen" name="Home" />
          <AdminPanelUI1.CustomLink to="/kitchen/oncooking" name="On-Cooking" />
          <AdminPanelUI1.CustomLink to="/kitchen/complete" name="Complete" />
        </ul>
      }
      Footer={
        <>
          <div className="box dsp-flex h-100 justify-center align-itms-center">
            <span className="disabled-text-2">Copyright © 2023, All Rights Reserved.</span>
          </div>
        </>
      }
      url="/kitchen"
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/oncooking" element={<OnCooking />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </AdminPanelUI1>
  )
}

export default Cashier
