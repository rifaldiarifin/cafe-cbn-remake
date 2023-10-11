import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
// Import Custom Hooks
import usePathName from '../hooks/usePathname'
import useSignOut from '../hooks/useSignOut'
import useUsersData from '../hooks/useUsersData'
// Import Redux Reducers
import { setAlert } from '../redux/slice/popupScreenSlice'
import { toggleDarkMode } from '../redux/slice/darkModeSlice'
// Import Components
import UserProfile from '../components/Elements/UserProfile'
import AdminPanelUI2 from '../components/Layout/AdminPanelUI2'
import Button from '../components/Elements/Button'
import InputField from '../components/Elements/InputField'
import CommingSoon from './commingSoon'
import { Menu, Transaction, Users, Default, UsersActivity } from '../components/Fragments/AdminContents'
import useMenuData from '../hooks/useMenuData'
import useGroupingMenu from '../hooks/useGroupingMenu'
import useTransactionData from '../hooks/useTransactionData'
import useActivityData from '../hooks/useActivityData'
import moment from 'moment'
import { getDate, getTime } from '../utils/date'
import useOverviewData from '../hooks/useOverviewData'
import useGlobalSearch from '../hooks/useGlobalSearch'

const Admin = () => {
  useSignOut()
  // API DATA
  const usersData = useUsersData()
  const menuData = useMenuData()
  const menuGroup = useGroupingMenu(menuData)
  const transactionData = useTransactionData()
  const activityData = useActivityData()
  const { staticOverview, totalMostOrderingGroup, totalOrderPerWeek, totalSaleCurrentYear } = useOverviewData({
    menuData,
    menuGroup,
    transactionData
  })
  const { handleGlobalSearch, searchInput, searchResult } = useGlobalSearch('/admin')
  const dispatch = useDispatch()
  const userSession = useSelector((state) => state.auth.data.userSession)
  const darkMode = useSelector((state) => state.darkMode.data)
  const pathName = usePathName()
  const urlNavLinkMatch = () => {
    return pathName.length >= 3 && `/admin/${pathName[1]}/${pathName[2]}`
  }

  const signOut = () => {
    dispatch(
      setAlert({
        title: 'Sign Out',
        description: 'Are you sure?',
        alertType: 'confirm',
        alertStyle: 'warning',
        actionName: 'signOut'
      })
    )
  }

  return (
    <>
      <AdminPanelUI2
        Header={
          <>
            {pathName && (
              <h1 className="font-size-14 font-weg-600 font-main disabled-text-2 space-06 nowrap">
                {pathName[1].charAt(0).toUpperCase() + pathName[1].slice(1)} /{' '}
                <span className="text-2">{pathName[2].charAt(0).toUpperCase() + pathName[2].slice(1)}</span>
              </h1>
            )}
            <div className="box dsp-flex align-itms-center gap-10">
              <div className="searching-group mini">
                <InputField
                  type="search"
                  height="40px"
                  id={'globalsearch'}
                  placeHolder="Search"
                  icon="search"
                  iconSize="18px"
                  addLabel={false}
                  onInput={handleGlobalSearch}
                />
                <div className={`search-result${searchInput.length > 0 ? ' active' : ''}`}>
                  {searchInput.length > 0 ? (
                    <>
                      {searchResult.length > 0 ? (
                        <>
                          <div className="box dsp-flex align-itms-center gap-10">
                            <p className="font-size-14 disabled-text-2">Search Result: {searchResult.length}</p>
                            <span className="icons8-regular search-more" style={{ filter: 'var(--icon1)' }}></span>
                          </div>
                          {searchResult.map((data) => (
                            <Button
                              key={data.name}
                              onClick={data.action}
                              icon={data.icon}
                              style="fill"
                              color="classic"
                              moreClass={'rounded10 justify-start'}
                            >
                              {data.name}
                            </Button>
                          ))}
                        </>
                      ) : (
                        <div className="box dsp-flex align-itms-center gap-10">
                          <p className="word-breakall font-size-14 disabled-text-2">
                            No result for &quot;{searchInput}&quot;
                          </p>
                          <span className="icons8-regular search-more" style={{ filter: 'var(--icon1)' }}></span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>Type something...</>
                  )}
                </div>
              </div>
              <Button
                icon={darkMode ? 'crescent-moon' : 'sun'}
                height="40px"
                iconSize="24px"
                moreClass={'btn-tgldark icon'}
                onClick={() => dispatch(toggleDarkMode())}
              />
            </div>
          </>
        }
        Nav={
          <>
            <UserProfile
              img={userSession.profileImage ?? '/img/noavatar.jpg'}
              alt={userSession.firstname ?? 'noavatar'}
              name={`${userSession.firstname ?? 'Hello'} ${userSession.lastname ?? 'World'}`}
              roleName="Admin"
              moreClass="noline"
            />
            <AdminPanelUI2.LabelBox label="Dashboard" moreClass="w-100 dsp-flex fl-colm gap-4">
              <AdminPanelUI2.NavLink
                name="Default"
                to="/admin/dashboard/default"
                match={urlNavLinkMatch()}
                icon="dashboard-layout"
              />
            </AdminPanelUI2.LabelBox>
            <AdminPanelUI2.LabelBox label="Manage" moreClass="w-100 dsp-flex fl-colm gap-2">
              <AdminPanelUI2.NavLink
                name="Users"
                to="/admin/manage/users"
                adminLink={true}
                match={urlNavLinkMatch()}
                icon="user"
              />
              <AdminPanelUI2.NavLink name="Menu" to="/admin/manage/menu" match={urlNavLinkMatch()} icon="cookbook" />
              <AdminPanelUI2.NavLink
                name="Transaction"
                to="/admin/manage/transaction"
                match={urlNavLinkMatch()}
                icon="purchase-order"
              />
            </AdminPanelUI2.LabelBox>
            <AdminPanelUI2.LabelBox label="Pages" moreClass="w-100 dsp-flex fl-colm gap-4">
              <AdminPanelUI2.NavLink
                name="Activity"
                to="/admin/pages/activity"
                adminLink={true}
                match={urlNavLinkMatch()}
                icon="activity-feed"
              />
              <AdminPanelUI2.NavLink name="Blog" to="/admin/pages/blog" match={urlNavLinkMatch()} icon="blog" />
              <AdminPanelUI2.NavLink
                name="Ad Banner"
                to="/admin/pages/adbanner"
                match={urlNavLinkMatch()}
                icon="ad-banner"
              />
              <AdminPanelUI2.NavLink
                name="Settings"
                to="/admin/pages/settings"
                match={urlNavLinkMatch()}
                icon="settings"
              />
            </AdminPanelUI2.LabelBox>
            <div className="btn-tgldark">
              <Button
                icon={darkMode ? 'crescent-moon' : 'sun'}
                height="36px"
                iconSize="20px"
                style={'fill'}
                color="classic"
                onClick={() => dispatch(toggleDarkMode())}
              >
                {darkMode ? 'Dark' : 'Light'} Mode
              </Button>
            </div>
            <div className="box dsp-flex justify-center w-100" style={{ marginTop: 'auto' }}>
              <Button height="40px" iconSize="22px" icon="exit" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </>
        }
        Aside={
          <AdminPanelUI2.Task title="Activites">
            <AdminPanelUI2.ListGroup>
              {activityData &&
                activityData.map((data, index) => {
                  if (index >= 4) return
                  return (
                    <AdminPanelUI2.ListType1
                      key={`${data.uuid}${index}`}
                      delayAnim={`${0.04 * index}s`}
                      moreClass="separator w-100"
                      img={
                        data.user?.data?.profileImage !== 'noavatar'
                          ? data.user?.data?.profileImage
                          : '/img/noavatar.jpg'
                      }
                      alt={data.user?.fullname}
                      title={data.activity}
                      subTitle={moment(
                        `${getDate(data.createdAt)} ${getTime(data.createdAt)}`,
                        'DD-MM-YYYY HH:mm'
                      ).fromNow()}
                    />
                  )
                })}
            </AdminPanelUI2.ListGroup>
          </AdminPanelUI2.Task>
        }
      >
        <Routes>
          <Route exact path="/" element={<Navigate to="/admin/dashboard/default" replace />} />
          <Route
            path="/dashboard/default"
            element={
              <Default
                staticOverview={staticOverview}
                totalMostOrderingGroup={totalMostOrderingGroup}
                totalOrderPerWeek={totalOrderPerWeek}
                totalSaleCurrentYear={totalSaleCurrentYear}
              />
            }
          />
          <Route path="/manage/users/*" element={<Users usersData={usersData} />} />
          <Route path="/manage/menu/*" element={<Menu menuData={menuData} menuGroup={menuGroup} />} />
          <Route
            path="/manage/transaction"
            element={
              <Transaction
                totalSale={staticOverview.totalSale}
                totalOrder={staticOverview.totalOrder}
                transactionData={transactionData}
              />
            }
          />
          <Route path="/pages/activity" element={<UsersActivity activityData={activityData} />} />
          <Route path="/pages/blog" element={<CommingSoon type="hyperlink" to="/admin/dashboard/default" />} />
          <Route path="/pages/adbanner" element={<CommingSoon type="hyperlink" to="/manager/dashboard/default" />} />
          <Route path="/pages/settings" element={<CommingSoon type="hyperlink" to="/admin/dashboard/default" />} />
        </Routes>
      </AdminPanelUI2>
    </>
  )
}

export default Admin
