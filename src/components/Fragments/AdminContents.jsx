import { Route, Routes } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
// import custom hooks
import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import usePathName from '../../hooks/usePathname'
import useDeleteAccount from '../../hooks/useDeleteAccount'
// import redux slices
import { setAlert } from '../../redux/slice/popupScreenSlice'
import { setFormGroup, setFormGroupMenus, setFormMenu, setFormUser } from '../../redux/slice/popupForm'
// import components
import AdminPanelUI2 from '../Layout/AdminPanelUI2'
import Button from '../Elements/Button'
import InputField from '../Elements/InputField'
import BannerSlidesPromote from './BannerSlidesPromote'
import { FormGroup, FormMenu, FormMenus, FormUser } from './PopupForms'
import { bannerData } from '../../services/banner.service'
import CustomLineChart, { createDatasetLineViews } from './CustomLineChart'
import CustomBarChart, { createDatasetBar } from './CustomBarChart'
import CustomDoughnutChart, { createDatasetDoughnut } from './CustomDoughnutChart'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler
} from 'chart.js'
import useDeleteMenu from '../../hooks/useDeleteMenu'
import CardMenuGroup from './CardMenuGroup'
import api from '../../api/api'
import useDeleteGroupMenu from '../../hooks/useDeleteGroupMenu'
import DefaultSpinner from './DefaultSpinner'
import { getDate, getTime } from '../../utils/date'
import getImage from '../../utils/getImage'
import useSearchFilter from '../../hooks/useSearchFilter'

export const Default = ({ staticOverview, totalMostOrderingGroup, totalOrderPerWeek, totalSaleCurrentYear }) => {
  useDocumentTitle('Default')
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )
  const getItemArrayOfObject = (obj, key) => {
    if (key === 0) return obj.reduce((prev, curr) => (prev = [...prev, Object.keys(curr)[0]]), [])
    return obj.reduce((prev, curr) => (prev = [...prev, Object.values(curr)[0]]), [])
  }
  const months = getItemArrayOfObject(totalSaleCurrentYear, 0)
  const dataLine1 = getItemArrayOfObject(totalSaleCurrentYear, 1)
  const datasetsLine = [
    createDatasetLineViews({ label: 'Current Year', data: dataLine1, borderColor: 'rgb(138, 101, 101)' })
  ]

  const days = getItemArrayOfObject(totalOrderPerWeek, 0)
  const dataBar1 = getItemArrayOfObject(totalOrderPerWeek, 1)
  const datasetsBar = [
    createDatasetBar({ label: 'Current Week', data: dataBar1, backgroundColor: 'rgb(226, 130, 142)' })
  ]

  const subcategoryLabel = getItemArrayOfObject(totalMostOrderingGroup, 0)
  const dataSc1 = getItemArrayOfObject(totalMostOrderingGroup, 1)
  const datasetSc1 = createDatasetDoughnut({
    label: 'Order',
    backgroundColor: ['rgb(138, 101, 101)', 'rgb(241, 196, 124)', 'rgb(226, 130, 142)', 'rgb(174, 187, 230)'],
    data: dataSc1
  })
  return (
    <>
      <div className="dashboard-layout">
        <AdminPanelUI2.CardOverview
          name="Orders"
          icon="purchase-order"
          value={staticOverview.totalOrder.toString()}
          style={{ gridArea: 'co1', backgroundColor: 'rgb(216, 203, 203)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Menu"
          icon="cookbook"
          value={staticOverview.totalMenu.toString()}
          style={{ gridArea: 'co2', backgroundColor: 'rgb(250, 235, 211)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Groups"
          icon="books"
          value={staticOverview.totalGroup.toString()}
          style={{ gridArea: 'co3', backgroundColor: 'rgb(216, 216, 230)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Sales"
          icon="total-sales"
          value={`Rp ${staticOverview.totalSale.toLocaleString('id-ID', { currency: 'IDR' })},00`}
          style={{ gridArea: 'co4', backgroundColor: 'rgb(245, 213, 217)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.Card
          name="Total Sales"
          style={{ gridArea: 'c1' }}
          header={
            <div className="box dsp-flex align-itms-center gap-20">
              {datasetsLine.map((data, i) => (
                <p
                  key={`chart${data.label}${i}`}
                  className="font-size-14 disabled-text-2 font-weg-600 dsp-flex align-itms-center gap-4"
                >
                  <span
                    className="dsp-block rounded30"
                    style={{ width: '10px', height: '10px', backgroundColor: data.borderColor }}
                  />
                  {data.label}
                </p>
              ))}
            </div>
          }
        >
          <CustomLineChart labels={months} datasets={datasetsLine} />
        </AdminPanelUI2.Card>
        <AdminPanelUI2.Card
          name="Order per Week"
          style={{ gridArea: 'c2' }}
          header={
            <div className="box dsp-flex align-itms-center gap-20">
              {datasetsBar.map((data, i) => (
                <p
                  key={`chart${data.label}${i}`}
                  className="font-size-14 disabled-text-2 font-weg-600 dsp-flex align-itms-center gap-4"
                >
                  <span
                    className="dsp-block rounded30"
                    style={{ width: '10px', height: '10px', backgroundColor: data.backgroundColor }}
                  />
                  {data.label}
                </p>
              ))}
            </div>
          }
        >
          <CustomBarChart labels={days} datasets={datasetsBar} />
        </AdminPanelUI2.Card>
        <AdminPanelUI2.Card name="Most Ordering" style={{ gridArea: 'c3' }}>
          <div className="box post-relativ dsp-flex justify-between gap-10 align-itms-center h-100">
            <div className="box post-reltv pad-10 border-box">
              <CustomDoughnutChart
                style={{ height: '150px', width: '150px' }}
                labels={subcategoryLabel}
                datasets={[datasetSc1]}
              />
            </div>
            <div className="box dsp-flex fl-1 fl-colm gap-10 overflow-hidden">
              {subcategoryLabel.map((data, i) => (
                <div
                  key={`chart${data}${i}`}
                  className="box dsp-flex aling-itms-center justify-between gap-10 overflow-hidden"
                >
                  <div className="box dsp-flex align-itms-center gap-4 overflow-hidden">
                    <span
                      className="dsp-flex justify-center align-itms-center rounded30 font-size-12 font-weg-600"
                      style={{
                        width: '16px',
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        color: 'white',
                        backgroundColor: datasetSc1.backgroundColor[i]
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-size-14 disabled-text-2 font-weg-600 overflow-hidden text-elips nowrap">
                      {data}
                    </p>
                  </div>
                  <p className="font-size-14 text-2 font-weg-600">x{dataSc1[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </AdminPanelUI2.Card>
      </div>
    </>
  )
}

export const UserDashboard = () => {
  return <></>
}

export const Users = ({ usersData }) => {
  useDeleteAccount()
  const { searchResult, searchInput, setSearchInput } = useSearchFilter((input, curr) => {
    return `${curr.firstname}${curr.lastname ? ' ' + curr.lastname : ''}`.toLowerCase().includes(input.toLowerCase())
  }, usersData)
  const userSession = useSelector((state) => state.auth.data?.userSession)
  const dispatch = useDispatch()
  const deleteUser = (data) => {
    dispatch(
      setAlert({
        title: 'Delete Account?',
        description: `Are you sure delete account "${data.firstname}${
          data.lastname ? ' ' + data.lastname : ''
        }"? this will be permanently!`,
        alertType: 'confirm',
        alertStyle: 'warning',
        actionName: 'deleteAccount',
        data: { uuid: data.uuid, username: data.username }
      })
    )
  }
  const editUser = (uuid, avatar) => {
    const user = { ...usersData.find((user) => user.uuid === uuid) }
    user.profileImage = avatar
    dispatch(setFormUser({ action: 'update', formData: user }))
  }
  const styleImg = { width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }
  const newAccount = () => {
    dispatch(setFormUser({ action: 'create' }))
  }
  const handleInputValue = (event) => setSearchInput(event.target.value)
  return (
    <>
      {usersData.length > 0 ? (
        <>
          <div
            className="box dsp-flex justify-between w-100 border-box mrgn-b-30"
            style={{ position: 'sticky', top: 0, zIndex: 1 }}
          >
            <div className="box dsp-flex align-itms-center gap-14"></div>
            <div className="box dsp-flex align-itms-center gap-14 fl-1">
              {/* <div
                className="box dsp-flex align-itms-center pad-l-10 gap-6 rounded10"
                style={{ backgroundColor: 'var(--main-color)', boxShadow: 'var(--box-shadow-1)' }}
              >
                <p className="font-size-14 disabled-text-1 nowrap">Type</p>
                <SimpleCombobox select="All" styleBox="fill">
                  <SimpleComboLi onSelected={(value) => console.log(value)} value="All" />
                  <SimpleComboLi onSelected={(value) => console.log(value)} value="CBN Service" />
                  <SimpleComboLi onSelected={(value) => console.log(value)} value="Regular" />
                </SimpleCombobox>
              </div> */}
              <div className="box w-100 rounded30 bg-main box-shadow1">
                <InputField
                  type="search"
                  width="100%"
                  iconSize="20px"
                  id={'searchUser'}
                  addLabel={false}
                  icon="search"
                  onInput={handleInputValue}
                  placeHolder="Search User"
                />
              </div>
              <Button
                style="fill"
                icon="plus-math"
                moreClass="icon"
                height="40px"
                color="second"
                onClick={newAccount}
              />
            </div>
          </div>
          <div className="box dsp-flex fl-colm justify-start align-itms-start gap-20 border-box">
            <AdminPanelUI2.Table
              firstColm
              tHead={[
                { label: 'Photo', width: '80px' },
                { label: 'Name' },
                { label: 'Role', width: '60px' },
                { label: 'email' },
                { label: 'Signed up', width: '100px' },
                { label: 'Options', width: '90px' }
              ]}
              moreClass={`w-100${searchInput.length > 0 && searchResult?.length === 0 ? ' dsp-none' : ''}`}
            >
              {searchInput.length > 0 ? (
                <>
                  {searchResult.map((user, i) => {
                    return (
                      <AdminPanelUI2.TRow
                        key={user.uuid}
                        firstColm={i + 1}
                        tRow={[
                          {
                            label: (
                              <LazyLoadImage
                                effect="opacity"
                                src={getImage(user?.profileImage)}
                                placeholderSrc="/img/noavatar.jpg"
                                style={styleImg}
                                alt={user.name}
                              />
                            )
                          },
                          { label: `${user.firstname} ${user.lastname}` },
                          {
                            label:
                              userSession?.uuid === user.uuid ? (
                                <p
                                  className="accent-bgcol-3 font-size-13 text-center rounded10"
                                  style={{ padding: '2px 8px', color: 'white' }}
                                >
                                  Current
                                </p>
                              ) : (
                                user.access.role
                              )
                          },
                          { label: user.contact.email.length > 0 ? user.contact.email : '-' },
                          { label: user.createdAt.split(' ')[0] },
                          {
                            label: (
                              <div key={i} className="box dsp-flex align-itms-center">
                                <Button
                                  icon="ball-point-pen"
                                  height="40px"
                                  iconSize="24px"
                                  brightness="var(--icon2)"
                                  onClick={() => editUser(user?.uuid, user?.profileImage)}
                                />
                                {userSession?.uuid !== user.uuid ? (
                                  <Button
                                    icon="trash"
                                    height="40px"
                                    iconSize="24px"
                                    brightness="var(--icon2)"
                                    onClick={() => deleteUser(user)}
                                  />
                                ) : null}
                              </div>
                            )
                          }
                        ]}
                        style={{ '--delay-show': `${0.04 * i}s` }}
                      />
                    )
                  })}
                </>
              ) : (
                <>
                  {usersData.map((user, i) => {
                    return (
                      <AdminPanelUI2.TRow
                        key={user.uuid}
                        firstColm={i + 1}
                        tRow={[
                          {
                            label: (
                              <LazyLoadImage
                                effect="opacity"
                                src={getImage(user?.profileImage)}
                                placeholderSrc="/img/noavatar.jpg"
                                style={styleImg}
                                alt={user.name}
                              />
                            )
                          },
                          { label: `${user.firstname} ${user.lastname}` },
                          {
                            label:
                              userSession?.uuid === user.uuid ? (
                                <p
                                  className="accent-bgcol-3 font-size-13 text-center rounded10"
                                  style={{ padding: '2px 8px', color: 'white' }}
                                >
                                  Current
                                </p>
                              ) : (
                                user.access.role
                              )
                          },
                          { label: user.contact.email.length > 0 ? user.contact.email : '-' },
                          { label: user.createdAt.split(' ')[0] },
                          {
                            label: (
                              <div key={i} className="box dsp-flex align-itms-center">
                                <Button
                                  icon="ball-point-pen"
                                  height="40px"
                                  iconSize="24px"
                                  brightness="var(--icon2)"
                                  onClick={() => editUser(user?.uuid, user?.profileImage)}
                                />
                                {userSession?.uuid !== user.uuid ? (
                                  <Button
                                    icon="trash"
                                    height="40px"
                                    iconSize="24px"
                                    brightness="var(--icon2)"
                                    onClick={() => deleteUser(user)}
                                  />
                                ) : null}
                              </div>
                            )
                          }
                        ]}
                        style={{ '--delay-show': `${0.04 * i}s` }}
                      />
                    )
                  })}
                </>
              )}
            </AdminPanelUI2.Table>
            <div
              className={`box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100${
                (searchInput.length > 0 && searchResult.length > 0) || searchInput.length === 0 ? ' dsp-none' : ''
              }`}
              style={{ height: '300px' }}
            >
              <span
                className="icons8-regular search-more"
                style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
              ></span>
              <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{`No result for "${searchInput}"`}</p>
            </div>
          </div>
          <FormUser />
        </>
      ) : usersData.length === 0 ? (
        <div
          className="box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100"
          style={{ height: '450px' }}
        >
          <span className="icons8-regular user" style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}></span>
          <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{'No user data.'}</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}

export const UsersActivity = ({ activityData }) => {
  useDocumentTitle('Users Activity')
  const { searchInput, searchResult, setSearchInput } = useSearchFilter((input, curr) => {
    return (
      `${curr.activity}`.toLowerCase().includes(input.toLowerCase()) ||
      `${getDate(curr.createdAt)}`.toLowerCase().includes(input.toLowerCase()) ||
      `${getTime(curr.createdAt)}`.toLowerCase().includes(input.toLowerCase())
    )
  }, activityData)
  const handleInputValue = (event) => setSearchInput(event.target.value)
  return (
    <>
      {activityData.length > 0 ? (
        <>
          <div
            className="box dsp-flex justify-center w-100 mrgn-b-30 gap-10"
            style={{ position: 'sticky', top: 0, zIndex: 1 }}
          >
            <div
              className="box w-100 rounded30"
              style={{ maxWidth: '600px', backgroundColor: 'var(--main-color)', boxShadow: 'var(--box-shadow-1)' }}
            >
              <InputField
                type="search"
                width="100%"
                iconSize="20px"
                id={'searchActivity'}
                addLabel={false}
                icon="search"
                placeHolder="Search Activity"
                onInput={handleInputValue}
              />
            </div>
          </div>
          <div className="box" style={{ marginTop: '0px' }}>
            <AdminPanelUI2.ListGroup>
              {searchInput.length > 0 ? (
                <>
                  {searchResult.map((data, i) => (
                    <AdminPanelUI2.ListType1
                      key={`${data.uuid}${i}`}
                      imgSize="50px"
                      gap={'10px'}
                      titleSize={'14px'}
                      delayAnim={`${0.04 * i}s`}
                      moreClass="separator w-100"
                      img={getImage(data.user?.data?.profileImage)}
                      alt={data.user?.fullname}
                      title={data.activity}
                      subTitle={moment(
                        `${getDate(data.createdAt)} ${getTime(data.createdAt)}`,
                        'DD-MM-YYYY HH:mm'
                      ).fromNow()}
                    />
                  ))}
                </>
              ) : (
                <>
                  {activityData.map((data, i) => (
                    <AdminPanelUI2.ListType1
                      key={`${data.uuid}${i}`}
                      imgSize="50px"
                      gap={'10px'}
                      titleSize={'14px'}
                      delayAnim={`${0.04 * i}s`}
                      moreClass="separator w-100"
                      img={getImage(data.user?.data?.profileImage)}
                      alt={data.user?.fullname}
                      title={data.activity}
                      subTitle={moment(
                        `${getDate(data.createdAt)} ${getTime(data.createdAt)}`,
                        'DD-MM-YYYY HH:mm'
                      ).fromNow()}
                    />
                  ))}
                </>
              )}
            </AdminPanelUI2.ListGroup>
          </div>
        </>
      ) : activityData.length === 0 ? (
        <div
          className="box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100"
          style={{ height: '450px' }}
        >
          <span
            className="icons8-regular activity-feed"
            style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
          ></span>
          <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">
            {'No order transactions at the moment.'}
          </p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
      <div
        className={`box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100${
          (searchInput.length > 0 && searchResult.length > 0) || searchInput.length === 0 ? ' dsp-none' : ''
        }`}
        style={{ height: '300px' }}
      >
        <span className="icons8-regular search-more" style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}></span>
        <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{`No result for "${searchInput}"`}</p>
      </div>
    </>
  )
}

const MenuAll = ({ menuData }) => {
  useDeleteMenu()
  const { searchInput, searchResult, setSearchInput } = useSearchFilter((input, curr) => {
    return `${curr.name}`.toLowerCase().includes(input.toLowerCase())
  }, menuData)
  const dispatch = useDispatch()
  const addMenu = () => {
    dispatch(setFormMenu({ action: 'create' }))
  }
  const deleteMenu = (data) => {
    dispatch(
      setAlert({
        title: 'Delete Menu',
        description: `Are you sure delete menu "${data.name}"?, this will be permanently`,
        alertType: 'confirm',
        alertStyle: 'warning',
        data: { uuid: data.uuid, name: data.name },
        actionName: 'deleteMenu'
      })
    )
  }
  const editMenu = (data) => {
    dispatch(setFormMenu({ action: 'update', formData: data }))
  }
  const handleInputValue = (event) => setSearchInput(event.target.value)
  const styleImg = { width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }
  return (
    <>
      <div className="box dsp-flex fl-colm gap-20">
        {menuData.length > 0 ? (
          <>
            <div className="box dsp-flex justify-between align-itms-center gap-10">
              <div className="box fl-1">
                <InputField
                  type="search"
                  width="100%"
                  height="40px"
                  id={'searchMenu'}
                  placeHolder="Search some menu"
                  icon="search"
                  iconSize="20px"
                  addLabel={false}
                  onInput={handleInputValue}
                />
              </div>
              <div className="box">
                <Button
                  icon={'plus-math'}
                  style={'fill'}
                  color="second"
                  iconSize={'22px'}
                  brightness={'brightness(9)'}
                  height={'40px'}
                  moreClass={'icon'}
                  onClick={addMenu}
                />
              </div>
            </div>
            <AdminPanelUI2.Table
              firstColm
              tHead={[
                { label: 'Image', width: '80px' },
                { label: 'Menu Code', width: '150px' },
                { label: 'Name' },
                { label: 'Price' },
                { label: 'Sold', width: '30px' },
                { label: 'Options', width: '90px' }
              ]}
              moreClass={`w-100${searchInput.length > 0 && searchResult?.length === 0 ? ' dsp-none' : ''}`}
            >
              {searchInput.length > 0 ? (
                <>
                  {searchResult.map((menu, index) => (
                    <AdminPanelUI2.TRow
                      key={menu.uuid}
                      firstColm={index + 1}
                      tRow={[
                        {
                          label: (
                            <LazyLoadImage
                              effect="opacity"
                              src={getImage(menu.image, 'nofoodphoto')}
                              placeholderSrc="/img/nofoodphoto.jpg"
                              style={styleImg}
                              alt={menu.name}
                            />
                          )
                        },
                        {
                          label: menu.menuCode,
                          style: { fontSize: '12px', fontWeight: '600', color: 'var(--disabled-color2)' }
                        },
                        { label: menu.name },
                        {
                          label: `Rp ${menu.price.toLocaleString('id-ID', { currency: 'IDR' })}`,
                          style: { whiteSpace: 'nowrap' }
                        },
                        { label: menu.sold, style: { textAlign: 'center' } },
                        {
                          label: (
                            <div className="box dsp-flex align-itms-center">
                              <Button
                                icon="ball-point-pen"
                                height="40px"
                                iconSize="24px"
                                brightness="var(--icon2)"
                                onClick={() => editMenu(menu)}
                              />
                              <Button
                                icon="trash"
                                height="40px"
                                iconSize="24px"
                                brightness="var(--icon2)"
                                onClick={() => deleteMenu(menu)}
                              />
                            </div>
                          )
                        }
                      ]}
                      style={{ '--delay-show': `${0.04 * index}s` }}
                    />
                  ))}
                </>
              ) : (
                <>
                  {menuData.map((menu, index) => (
                    <AdminPanelUI2.TRow
                      key={menu.uuid}
                      firstColm={index + 1}
                      tRow={[
                        {
                          label: (
                            <LazyLoadImage
                              effect="opacity"
                              src={getImage(menu.image, 'nofoodphoto')}
                              placeholderSrc="/img/nofoodphoto.jpg"
                              style={styleImg}
                              alt={menu.name}
                            />
                          )
                        },
                        {
                          label: menu.menuCode,
                          style: { fontSize: '12px', fontWeight: '600', color: 'var(--disabled-color2)' }
                        },
                        { label: menu.name },
                        {
                          label: `Rp ${menu.price.toLocaleString('id-ID', { currency: 'IDR' })}`,
                          style: { whiteSpace: 'nowrap' }
                        },
                        { label: menu.sold, style: { textAlign: 'center' } },
                        {
                          label: (
                            <div className="box dsp-flex align-itms-center">
                              <Button
                                icon="ball-point-pen"
                                height="40px"
                                iconSize="24px"
                                brightness="var(--icon2)"
                                onClick={() => editMenu(menu)}
                              />
                              <Button
                                icon="trash"
                                height="40px"
                                iconSize="24px"
                                brightness="var(--icon2)"
                                onClick={() => deleteMenu(menu)}
                              />
                            </div>
                          )
                        }
                      ]}
                      style={{ '--delay-show': `${0.04 * index}s` }}
                    />
                  ))}
                </>
              )}
            </AdminPanelUI2.Table>
          </>
        ) : menuData.length === 0 ? (
          <div
            className="box dsp-flex justify-center align-itms-center fl-colm gap-10 pad-y-30 w-100"
            style={{ height: '350px' }}
          >
            <span
              className="icons8-regular book-reading"
              style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
            ></span>
            <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">You haven&apos;t created any menus.</p>
            <p className="font-size-18 font-weg-500 disabled-text-1">let&apos;s make one</p>
            <Button color="second" icon={'plus-math'} style={'fill'} onClick={addMenu}>
              Add One
            </Button>
          </div>
        ) : (
          <DefaultSpinner />
        )}
        <div
          className={`box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100${
            (searchInput.length > 0 && searchResult.length > 0) || searchInput.length === 0 ? ' dsp-none' : ''
          }`}
          style={{ height: '300px' }}
        >
          <span className="icons8-regular search-more" style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}></span>
          <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{`No result for "${searchInput}"`}</p>
        </div>
      </div>
      <FormMenu />
    </>
  )
}

const MenuGroups = ({ menuData, menuGroup }) => {
  useDeleteGroupMenu()
  const dispatch = useDispatch()
  const addGroup = () => {
    dispatch(setFormGroup({ action: 'create' }))
  }
  const addMenusToGroup = (data, groupName, menus) => {
    dispatch(setFormGroupMenus({ action: 'add', formData: { uuid: data, groupName, menus } }))
  }
  const deleteMenusToGroup = (data, groupName, menus) => {
    dispatch(setFormGroupMenus({ action: 'remove', formData: { uuid: data, groupName, menus } }))
  }
  const editGroup = (data) => {
    dispatch(setFormGroup({ action: 'update', formData: { ...data } }))
  }
  const deleteGroup = (data) => {
    dispatch(
      setAlert({
        title: 'Delete Group',
        description: `Are you sure delete group "${data.groupName}"?, this will be permanently`,
        alertStyle: 'warning',
        alertType: 'confirm',
        data: { uuid: data.uuid, groupName: data.groupName },
        actionName: 'DELETE_GROUP_MENU'
      })
    )
  }
  const switchShowOn = async (toggle, uuid) => {
    try {
      await api.put(`/menu/groups/${uuid}`, JSON.stringify({ showOn: toggle }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      throw new Error(`Failed toggle show on group! :${error.message}`)
    }
  }
  return (
    <>
      <div className="box dsp-flex fl-colm gap-20">
        {menuGroup.length > 0 ? (
          <>
            <div className="box dsp-flex justify-between align-itms-center gap-10">
              <div className="box fl-1">
                {/* <InputField
                  type="search"
                  width="100%"
                  height="40px"
                  id={'searchGroup'}
                  placeHolder="Search some group"
                  icon="search"
                  iconSize="20px"
                  addLabel={false}
                /> */}
              </div>
              <div className="box">
                <Button
                  icon={'plus-math'}
                  style={'fill'}
                  color="second"
                  iconSize={'22px'}
                  brightness={'brightness(9)'}
                  height={'40px'}
                  onClick={addGroup}
                >
                  New Group
                </Button>
              </div>
            </div>
            <div
              className="box dsp-grid w-100 h-100 gap-20 "
              style={{
                '--gd-colm': 'repeat(auto-fill, minmax(340px, 1fr))',
                '--gd-rows': 'repeat(auto-fill, minmax(180px, 1fr))'
              }}
            >
              {menuGroup &&
                menuGroup.map((group, index) => (
                  <CardMenuGroup
                    key={group?.uuid}
                    name={`showOn${index + 1}`}
                    id={`showOn${index + 1}`}
                    groupName={group?.groupName}
                    image={getImage(group?.image, 'nofoodphoto')}
                    menus={group?.menus}
                    initialToggle={group?.showOn}
                    onAddMenus={() => addMenusToGroup(group?.uuid, group?.groupName, group?.menus)}
                    onEditClick={() => editGroup({ ...group, image: getImage(group?.image, 'nofoodphoto') })}
                    onDeleteClick={() => deleteGroup({ ...group, image: getImage(group?.image, 'nofoodphoto') })}
                    onDeleteMenus={() => deleteMenusToGroup(group?.uuid, group?.groupName, group?.menus)}
                    callback={(toggle) => switchShowOn(toggle, group?.uuid)}
                  />
                ))}
            </div>
          </>
        ) : menuGroup.length === 0 ? (
          <div
            className="box dsp-flex justify-center align-itms-center fl-colm gap-10 pad-y-30 w-100"
            style={{ height: '350px' }}
          >
            <span className="icons8-regular books" style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}></span>
            <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">You haven&apos;t created any groups.</p>
            <p className="font-size-18 font-weg-500 disabled-text-1">let&apos;s make one</p>
            <Button color="second" icon={'plus-math'} style={'fill'} onClick={addGroup}>
              Add One
            </Button>
          </div>
        ) : (
          <DefaultSpinner />
        )}
      </div>
      <FormGroup />
      <FormMenus menuData={menuData} />
    </>
  )
}

export const Menu = ({ menuData, menuGroup }) => {
  useDocumentTitle('Menu')
  const pathName = usePathName()
  const urlCategoryNavLinkXMatch = () => {
    return pathName.length >= 2 && `${pathName[3] ?? ''}`
  }

  return (
    <>
      <div
        className="box dsp-flex justify-start gap-10 w-100 pad-b-20 mrgn-b-20"
        style={{ borderBottom: '1px solid var(--separator)' }}
      >
        <AdminPanelUI2.NavLinkX to="" match={urlCategoryNavLinkXMatch()} name="All" icon="book-reading" />
        <AdminPanelUI2.NavLinkX to="groups" match={urlCategoryNavLinkXMatch()} name="Groups" icon="books" />
      </div>
      <Routes>
        <Route index element={<MenuAll menuData={menuData} />} />
        <Route path="groups" element={<MenuGroups menuData={menuData} menuGroup={menuGroup} />} />
      </Routes>
    </>
  )
}

export const Transaction = ({ transactionData, totalSale, totalOrder }) => {
  useDocumentTitle('Transaction')
  const { searchInput, searchResult, setSearchInput } = useSearchFilter((input, curr) => {
    return (
      `${curr.orderCode}`.toLowerCase().includes(input.toLowerCase()) ||
      `${curr.payment}`.toLowerCase().includes(input.toLowerCase()) ||
      `${curr.bill}`.toLowerCase().includes(input.toLowerCase()) ||
      `${getDate(curr.createdAt)}`.toLowerCase().includes(input.toLowerCase()) ||
      `${getTime(curr.createdAt)}`.toLowerCase().includes(input.toLowerCase())
    )
  }, transactionData)
  const date = (date) => {
    const fulldate = date.split(' ')
    const time = fulldate[1].split(':')
    return [fulldate[0], `${time[0]}:${time[1]}`]
  }
  const checkTransaction = () => {
    return transactionData.findIndex((find) => find?.orderStatus.toLowerCase() === 'complete')
  }
  const handleInputValue = (event) => setSearchInput(event.target.value)
  return (
    <div className="box dsp-flex fl-colm gap-20">
      {transactionData && checkTransaction() >= 0 ? (
        <>
          <div className="transaction-ov">
            <AdminPanelUI2.CardOverview
              name="Orders"
              icon="purchase-order"
              value={totalOrder.toString()}
              style={{ backgroundColor: 'rgb(216, 203, 203)', color: 'rgb(61,61,61)' }}
            />
            <AdminPanelUI2.CardOverview
              name="Sales"
              icon="total-sales"
              value={`Rp ${totalSale.toLocaleString('id-ID', { currency: 'IDR' })},00`}
              style={{ backgroundColor: 'rgb(245, 213, 217)', color: 'rgb(61,61,61)' }}
            />
          </div>

          <div className="box dsp-flex justify-between align-itms-center gap-10">
            <div className="box fl-1">
              <InputField
                type="search"
                width="100%"
                height="40px"
                id={'searchTransaction'}
                placeHolder="Search some transaction"
                icon="search"
                iconSize="20px"
                addLabel={false}
                onInput={handleInputValue}
              />
            </div>
          </div>
          <AdminPanelUI2.Table
            firstColm
            tHead={[
              { label: 'Order Code', width: '130px' },
              { label: 'Payment' },
              { label: 'Bill' },
              { label: 'Date' },
              { label: 'Time' },
              { label: 'Status', width: '120px' }
            ]}
            moreClass={`w-100${searchInput.length > 0 && searchResult?.length === 0 ? ' dsp-none' : ''}`}
          >
            {searchInput.length > 0 ? (
              <>
                {searchResult.map((data, i) => {
                  if (data.orderStatus === 'complete') {
                    const fullDate = date(data.createdAt)
                    return (
                      <AdminPanelUI2.TRow
                        key={data.uuid}
                        firstColm={i + 1}
                        tRow={[
                          {
                            label: data.orderCode,
                            style: { fontFamily: 'consolas', fontWeight: '600', letterSpacing: '1px' }
                          },
                          { label: data?.payment, className: 'font-weg-600' },
                          {
                            label: `Rp ${data?.bill.toLocaleString('id-ID', { currency: 'IDR' })}`,
                            className: 'nowrap'
                          },
                          { label: fullDate[0], className: 'nowrap' },
                          { label: fullDate[1], className: 'nowrap' },
                          {
                            label: (
                              <div className="box dsp-flex justify-start">
                                <div
                                  className={`box font-size-13 pad-t-4 pad-b-4 pad-x-10 dsp-flex justify-center align-itms-center rounded30 ${
                                    data.orderStatus === 'complete'
                                      ? 'success'
                                      : data.orderStatus === 'cancel'
                                      ? 'danger'
                                      : data.orderStatus === 'cooking'
                                      ? 'warning'
                                      : 'info'
                                  }-bgcol`}
                                  style={{ color: 'whitesmoke' }}
                                >
                                  {data.orderStatus.toUpperCase()}
                                </div>
                              </div>
                            )
                          }
                        ]}
                        style={{ '--delay-show': `${0.04 * i}s` }}
                      />
                    )
                  }
                })}
              </>
            ) : (
              <>
                {transactionData.map((data, i) => {
                  if (data.orderStatus === 'complete') {
                    const fullDate = date(data.createdAt)
                    return (
                      <AdminPanelUI2.TRow
                        key={data.uuid}
                        firstColm={i + 1}
                        tRow={[
                          {
                            label: data.orderCode,
                            style: { fontFamily: 'consolas', fontWeight: '600', letterSpacing: '1px' }
                          },
                          { label: data?.payment, className: 'font-weg-600' },
                          {
                            label: `Rp ${data?.bill.toLocaleString('id-ID', { currency: 'IDR' })}`,
                            className: 'nowrap'
                          },
                          { label: fullDate[0], className: 'nowrap' },
                          { label: fullDate[1], className: 'nowrap' },
                          {
                            label: (
                              <div className="box dsp-flex justify-start">
                                <div
                                  className={`box font-size-13 pad-t-4 pad-b-4 pad-x-10 dsp-flex justify-center align-itms-center rounded30 ${
                                    data.orderStatus === 'complete'
                                      ? 'success'
                                      : data.orderStatus === 'cancel'
                                      ? 'danger'
                                      : data.orderStatus === 'cooking'
                                      ? 'warning'
                                      : 'info'
                                  }-bgcol`}
                                  style={{ color: 'whitesmoke' }}
                                >
                                  {data.orderStatus.toUpperCase()}
                                </div>
                              </div>
                            )
                          }
                        ]}
                        style={{ '--delay-show': `${0.04 * i}s` }}
                      />
                    )
                  }
                })}
              </>
            )}
          </AdminPanelUI2.Table>
        </>
      ) : transactionData && checkTransaction() === -1 ? (
        <div
          className="box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100"
          style={{ height: '450px' }}
        >
          <span
            className="icons8-regular purchase-order"
            style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
          ></span>
          <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">
            {'No order transactions at the moment.'}
          </p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
      <div
        className={`box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100${
          (searchInput.length > 0 && searchResult.length > 0) || searchInput.length === 0 ? ' dsp-none' : ''
        }`}
        style={{ height: '300px' }}
      >
        <span className="icons8-regular search-more" style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}></span>
        <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{`No result for "${searchInput}"`}</p>
      </div>
    </div>
  )
}
export const Activity = ({ activityData }) => {
  useDocumentTitle('Activity')
  const { searchInput, searchResult, setSearchInput } = useSearchFilter((input, curr) => {
    return (
      `${curr.activity}`.toLowerCase().includes(input.toLowerCase()) ||
      `${curr.user?.fullname}`.toLowerCase().includes(input.toLowerCase()) ||
      `${getDate(curr.createdAt)}`.toLowerCase().includes(input.toLowerCase()) ||
      `${getTime(curr.createdAt)}`.toLowerCase().includes(input.toLowerCase())
    )
  }, activityData)
  const handleInputValue = (event) => setSearchInput(event.target.value)
  return (
    <>
      {activityData.length > 0 ? (
        <>
          <div
            className="box dsp-flex justify-center w-100 mrgn-b-30 gap-10"
            style={{ position: 'sticky', top: 0, zIndex: 1 }}
          >
            <div
              className="box w-100 rounded30"
              style={{ maxWidth: '600px', backgroundColor: 'var(--main-color)', boxShadow: 'var(--box-shadow-1)' }}
            >
              <InputField
                type="search"
                width="100%"
                iconSize="20px"
                id={'searchActivity'}
                addLabel={false}
                icon="search"
                placeHolder="Search Activity"
                onInput={handleInputValue}
              />
            </div>
          </div>
          <div className="box" style={{ marginTop: '0px' }}>
            <AdminPanelUI2.ListGroup>
              {searchInput.length > 0 ? (
                <>
                  {searchResult.map((data, i) => {
                    return (
                      <AdminPanelUI2.ListType1
                        key={`${data.uuid}${i}`}
                        imgSize="50px"
                        gap={'10px'}
                        titleSize={'14px'}
                        delayAnim={`${0.04 * i}s`}
                        moreClass="separator w-100"
                        img={getImage(data.user?.data?.profileImage)}
                        alt={data.user?.fullname}
                        title={data.activity}
                        subTitle={moment(
                          `${getDate(data.createdAt)} ${getTime(data.createdAt)}`,
                          'DD-MM-YYYY HH:mm'
                        ).fromNow()}
                      />
                    )
                  })}
                </>
              ) : (
                <>
                  {activityData.map((data, i) => {
                    return (
                      <AdminPanelUI2.ListType1
                        key={`${data.uuid}${i}`}
                        imgSize="50px"
                        gap={'10px'}
                        titleSize={'14px'}
                        delayAnim={`${0.04 * i}s`}
                        moreClass="separator w-100"
                        img={getImage(data.user?.data?.profileImage)}
                        alt={data.user?.fullname}
                        title={data.activity}
                        subTitle={moment(
                          `${getDate(data.createdAt)} ${getTime(data.createdAt)}`,
                          'DD-MM-YYYY HH:mm'
                        ).fromNow()}
                      />
                    )
                  })}
                </>
              )}
            </AdminPanelUI2.ListGroup>
          </div>
          <div
            className={`box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100${
              (searchInput.length > 0 && searchResult.length > 0) || searchInput.length === 0 ? ' dsp-none' : ''
            }`}
            style={{ height: '300px' }}
          >
            <span
              className="icons8-regular search-more"
              style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
            ></span>
            <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{`No result for "${searchInput}"`}</p>
          </div>
        </>
      ) : activityData.length === 0 ? (
        <div
          className="box dsp-flex justify-center align-itms-center fl-colm gap-30 pad-y-30 w-100"
          style={{ height: '450px' }}
        >
          <span
            className="icons8-regular activity-feed"
            style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
          ></span>
          <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10">{'Nothing here, do something!'}</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}
export const Blog = () => {
  useDocumentTitle('Blog')
  return <h1>Blog</h1>
}
export const AdBanner = () => {
  useDocumentTitle('Ad Banner')
  return (
    <div className="box dsp-flex fl-colm justify-start align-itms-start gap-10 h-100">
      <p className="font-size-16 font-weg-500 disabled-text-2">Preview</p>
      <div className="box rounded10 overflow-hidden box-shadow1 w-100 mrgn-b-10">
        <BannerSlidesPromote bannerData={bannerData} delay={3000} />
      </div>
      <p>Images {`(up to 7)`}</p>
      <div className="card-group-x">
        {bannerData.map((banner, i) => (
          <div key={`banner${banner.alt}${i}`} className="card-box">
            <div className="actions">
              <Button type="hyperlink" style="fill" height="40px" moreClass="icon" icon="trash" color="third" />
            </div>
            <LazyLoadImage
              className="auto-scale-image pointer-none"
              effect="blur"
              src={banner.source}
              alt={banner.alt}
            />
          </div>
        ))}
        <div className="card-box" style={{ borderStyle: 'dashed' }}>
          <div className="box dsp-flex justify-center align-itms-center fl-colm gap-10">
            <span className="icons8-regular full-image" style={{ filter: 'var(--icon1)', '--i8-ratio': '38px' }} />
            <p className="font-size-14 font-weg-600 disabled-text-1">Drag & drop a Photo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export const Settings = () => {
  useDocumentTitle('Settings')
  return <h1>Settings</h1>
}
