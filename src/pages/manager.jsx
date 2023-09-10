import { Route, Routes } from 'react-router-dom'
import UserProfile from '../components/Elements/UserProfile'
import usePathName from '../hooks/usePathname'
import AdminPanelUI2 from '../components/Layout/AdminPanelUI2'
import {
  Default,
  Activity,
  Menu,
  Transaction,
  Intro,
  NewCategory,
  NewSubCategory,
  AdBanner
} from '../components/Fragments/AdminContents'
import Button from '../components/Elements/Button'
import InputField from '../components/Elements/InputField'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/slice/darkModeSlice'
import CommingSoon from './commingSoon'

const Manager = () => {
  const darkMode = useSelector((state) => state.darkMode.data)
  const dispatch = useDispatch()
  const [sidePanel, setSidePanel] = useState({ nav: true, aside: true })
  const pathName = usePathName()
  const urlNavLinkMatch = () => {
    return pathName.length >= 3 && `/manager/${pathName[1]}/${pathName[2]}`
  }
  const toggleNav = () => {
    setSidePanel({ nav: sidePanel.nav ? false : true, aside: sidePanel.aside })
  }
  const toggleAside = () => {
    setSidePanel({ aside: sidePanel.aside ? false : true, nav: sidePanel.nav })
  }
  return (
    <AdminPanelUI2
      isNavActive={sidePanel.nav}
      isAsideActive={sidePanel.aside}
      Header={
        <>
          <div className="box dsp-flex align-itms-center gap-10">
            <Button
              icon={sidePanel.nav ? 'hide-sidepanel' : 'show-sidepanel'}
              height="20px"
              iconSize="24px"
              onClick={toggleNav}
            />
            {pathName && (
              <h1 className="font-size-14 font-weg-600 font-main disabled-text-2 space-06">
                {pathName[1].charAt(0).toUpperCase() + pathName[1].slice(1)} /{' '}
                <span className="text-2">{pathName[2].charAt(0).toUpperCase() + pathName[2].slice(1)}</span>
              </h1>
            )}
          </div>
          <div className="box dsp-flex align-itms-center gap-10">
            <InputField
              type="search"
              height="40px"
              placeHolder="Search"
              icon="search"
              iconSize="18px"
              addLabel={false}
            />
            <Button
              icon={darkMode ? 'crescent-moon' : 'sun'}
              height="20px"
              iconSize="24px"
              onClick={() => dispatch(toggleDarkMode())}
            />
            <Button icon="notification" height="20px" iconSize="24px" />
            <Button
              icon={sidePanel.aside ? 'hide-sidepanel' : 'show-sidepanel'}
              height="20px"
              iconSize="24px"
              onClick={toggleAside}
            />
          </div>
        </>
      }
      Nav={
        <>
          <UserProfile img="/me2.png" alt="me2" name="Rifaldi Arifin" roleName="Manager" moreClass="noline" />
          <AdminPanelUI2.LabelBox label="Dashboard" moreClass="w-100 dsp-flex fl-colm gap-4">
            <AdminPanelUI2.NavLink
              name="Default"
              to="/manager/dashboard/default"
              match={urlNavLinkMatch()}
              icon="dashboard-layout"
            />
          </AdminPanelUI2.LabelBox>
          <AdminPanelUI2.LabelBox label="Manage" moreClass="w-100 dsp-flex fl-colm gap-2">
            <AdminPanelUI2.NavLink name="Menu" to="/manager/manage/menu" match={urlNavLinkMatch()} icon="cookbook" />
            <AdminPanelUI2.NavLink
              name="Transaction"
              to="/manager/manage/transaction"
              match={urlNavLinkMatch()}
              icon="purchase-order"
            />
          </AdminPanelUI2.LabelBox>
          <AdminPanelUI2.LabelBox label="Pages" moreClass="w-100 dsp-flex fl-colm gap-4">
            <AdminPanelUI2.NavLink
              name="Activity"
              to="/manager/pages/activity"
              match={urlNavLinkMatch()}
              icon="activity-feed"
            />
            <AdminPanelUI2.NavLink name="Blog" to="/manager/pages/blog" match={urlNavLinkMatch()} icon="blog" />
            <AdminPanelUI2.NavLink
              name="Ad Banner"
              to="/manager/pages/adbanner"
              match={urlNavLinkMatch()}
              icon="ad-banner"
            />
            <AdminPanelUI2.NavLink
              name="Settings"
              to="/manager/pages/settings"
              match={urlNavLinkMatch()}
              icon="settings"
            />
          </AdminPanelUI2.LabelBox>
        </>
      }
      Aside={
        <>
          <AdminPanelUI2.Task title="Notifications" moreClass="mrgn-b-30">
            <AdminPanelUI2.ListGroup>
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
            </AdminPanelUI2.ListGroup>
          </AdminPanelUI2.Task>
          <AdminPanelUI2.Task title="Activites">
            <AdminPanelUI2.ListGroup>
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
              <AdminPanelUI2.ListType1
                img="/me2.png"
                alt="me2"
                title="You got one new message!"
                subTitle="12 minutes ago"
              />
            </AdminPanelUI2.ListGroup>
          </AdminPanelUI2.Task>
        </>
      }
    >
      <Routes>
        <Route index element={<Intro />} />
        <Route path="/dashboard/default" element={<Default />} />
        <Route path="/manage/menu/*" element={<Menu />} />
        <Route path="/manage/menu/new" element={<NewCategory />} />
        <Route path="/manage/menu/category/:category/new" element={<NewSubCategory />} />
        <Route path="/manage/transaction" element={<Transaction />} />
        <Route path="/pages/activity" element={<Activity />} />
        <Route path="/pages/blog" element={<CommingSoon type="hyperlink" to="/manager/dashboard/default" />} />
        <Route path="/pages/adbanner" element={<AdBanner />} />
        <Route path="/pages/settings" element={<CommingSoon type="hyperlink" to="/manager/dashboard/default" />} />
      </Routes>
    </AdminPanelUI2>
  )
}

export default Manager
