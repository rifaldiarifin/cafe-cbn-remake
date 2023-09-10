import { Route, Routes, useParams } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import AdminPanelUI2 from '../Layout/AdminPanelUI2'
import Button from '../Elements/Button'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../redux/slice/popupScreenSlice'
import usePathName from '../../hooks/usePathname'
import { useState } from 'react'
import useTransactionData from '../../hooks/useTransactionData'
import SimpleComboLi from '../Elements/SimpleCombobox/SimpleComboLi'
import SimpleCombobox from '../Elements/SimpleCombobox'
import InputField from '../Elements/InputField'
import CustomLineChart, { createDatasetLineViews } from './CustomLineChart'
import CustomBarChart, { createDatasetBar } from './CustomBarChart'
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
  ArcElement
} from 'chart.js'
import CustomDoughnutChart, { createDatasetDoughnut } from './CustomDoughnutChart'
import { bannerData } from '../../services/bannerData'
import BannerSlidesPromote from './BannerSlidesPromote'
import useMenuData from '../../hooks/useMenuData'
import useGroupingMenu from '../../hooks/useGroupingMenu'
import useUsersData from '../../hooks/useUsersData'
import { FormMenu, FormUser } from './PopupForms'
import { setFormMenu, setFormUser } from '../../redux/slice/popupForm'

export const Intro = () => {
  useDocumentTitle('Hello')
  return (
    <div className="box dsp-flex justify-center align-itms-center w-100 h-100">
      <h1 className="font-size-18 font-weg-500 disabled-text-2 space-1">Hello World :D</h1>
    </div>
  )
}

export const Default = () => {
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
    Legend
  )
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dataLine1 = [
    7_340_500, 8_221_000, 5_050_000, 12_000_000, 13_564_000, 9_400_000, 10_040_000, 22_500_000, 8_000_500, 6_760_000,
    10_500_000, 15_020_000
  ]
  const dataLine2 = [
    1_550_000, 7_000_500, 6_234_000, 5_050_000, 7_340_500, 9_400_000, 6_760_000, 8_000_500, 6_760_000, 8_000_500,
    10_500_000, 9_400_000
  ]
  const datasetsLine = [
    createDatasetLineViews({ label: 'Current Year', data: dataLine1, borderColor: 'rgb(138, 101, 101)' }),
    createDatasetLineViews({ label: 'Previous Year', data: dataLine2, borderColor: 'rgb(130, 130, 135)' })
  ]

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dataBar1 = [12, 21, 43, 28, 32, 33, 44]
  const datasetsBar = [
    createDatasetBar({ label: 'Current Week', data: dataBar1, backgroundColor: 'rgb(226, 130, 142)' })
  ]

  const subcategoryLabel = ['Coffee', 'Non Coffee', 'Ice Cream', 'Cake']
  const dataSc1 = [213, 231, 244, 123]
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
          value="42"
          style={{ gridArea: 'co1', backgroundColor: 'rgb(216, 203, 203)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Menu"
          icon="cookbook"
          value="32"
          style={{ gridArea: 'co2', backgroundColor: 'rgb(250, 235, 211)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Sales"
          icon="total-sales"
          value={`Rp ${(7600000).toLocaleString('id-ID', { currency: 'IDR' })},00`}
          style={{ gridArea: 'co3', backgroundColor: 'rgb(245, 213, 217)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Other"
          icon="cookbook"
          value="12"
          style={{ gridArea: 'co4', backgroundColor: 'rgb(216, 216, 230)', color: 'rgb(61,61,61)' }}
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
                style={{ width: '150px', height: '150px' }}
                labels={subcategoryLabel}
                datasets={[datasetSc1]}
              />
            </div>
            <div className="box dsp-flex fl-1 fl-colm gap-10">
              {subcategoryLabel.map((data, i) => (
                <div key={`chart${data}${i}`} className="box dsp-flex aling-itms-center justify-between gap-10">
                  <p className="font-size-14 disabled-text-2 font-weg-600 dsp-flex align-itms-center gap-4">
                    <span
                      className="dsp-block rounded30"
                      style={{ width: '10px', height: '10px', backgroundColor: datasetSc1.backgroundColor[i] }}
                    />
                    {data}
                  </p>
                  <p className="font-size-14 text-2 font-weg-600">{dataSc1[i]}</p>
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

export const Users = () => {
  const usersData = useUsersData()
  const dispatch = useDispatch()
  const deleteUser = (data) => {
    dispatch(
      setAlert({
        title: 'Delete this Menu?',
        description: `Are you sure delete account "${data.firstname} ${data.lastname}"? this will be permanently!`,
        alertType: 'confirm',
        alertStyle: 'warning'
      })
    )
  }
  const editUser = (uuid) => {
    dispatch(setFormUser({ action: 'update', formData: usersData.find((user) => user.uuid === uuid) }))
  }
  const styleImg = { width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }
  const newAccount = () => {
    dispatch(setFormUser({ action: 'create' }))
  }

  return (
    <>
      <div
        className="box dsp-flex justify-between w-100 mrgn-b-30 gap-10"
        style={{ position: 'sticky', top: 0, zIndex: 1 }}
      >
        <div
          className="box w-100 rounded30"
          style={{ maxWidth: '300px', backgroundColor: 'var(--main-color)', boxShadow: 'var(--box-shadow-1)' }}
        >
          <InputField
            type="search"
            width="100%"
            iconSize="20px"
            addLabel={false}
            icon="search"
            placeHolder="Search User"
          />
        </div>
        <div className="box dsp-flex align-itms-center gap-14">
          <div
            className="box dsp-flex align-itms-center pad-l-10 gap-6 rounded10"
            style={{ backgroundColor: 'var(--main-color)', boxShadow: 'var(--box-shadow-1)' }}
          >
            <p className="font-size-14 disabled-text-1 nowrap">Type</p>
            <SimpleCombobox select="All" styleBox="fill">
              <SimpleComboLi value="All" />
              <SimpleComboLi value="CBN Service" />
              <SimpleComboLi value="Regular" />
            </SimpleCombobox>
          </div>
          <div
            className="box dsp-flex align-itms-center pad-l-10 gap-6 rounded10"
            style={{ backgroundColor: 'var(--main-color)', boxShadow: 'var(--box-shadow-1)' }}
          >
            <p className="font-size-14 disabled-text-1 nowrap">Signed up</p>
            <SimpleCombobox select="All" styleBox="fill">
              <SimpleComboLi value="All" />
              <SimpleComboLi value="Today" />
              <SimpleComboLi value="Current Month" />
              <SimpleComboLi value="Current Year" />
            </SimpleCombobox>
          </div>
          <Button style="fill" icon="plus-math" moreClass="icon" height="40px" color="second" onClick={newAccount} />
        </div>
      </div>
      <div className="box dsp-flex fl-colm justify-start align-itms-start gap-20">
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
          moreClass="w-100"
        >
          {usersData &&
            usersData.map((user, i) => (
              <AdminPanelUI2.TRow
                key={`${user.uuid}${i}`}
                firstColm={i + 1}
                tRow={[
                  {
                    label: (
                      <LazyLoadImage effect="opacity" src={`${user.profileImage}`} style={styleImg} alt={user.name} />
                    )
                  },
                  { label: `${user.firstname} ${user.lastname}` },
                  { label: user.access.role },
                  { label: user.contact.email },
                  { label: user.createdAt.split(' ')[0] },
                  {
                    label: (
                      <div key={i} className="box dsp-flex align-itms-center">
                        <Button
                          icon="ball-point-pen"
                          height="40px"
                          iconSize="24px"
                          brightness="var(--icon2)"
                          onClick={() => editUser(user.uuid)}
                        />
                        <Button
                          icon="trash"
                          height="40px"
                          iconSize="24px"
                          brightness="var(--icon2)"
                          onClick={() => deleteUser(user)}
                        />
                      </div>
                    )
                  }
                ]}
              />
            ))}
        </AdminPanelUI2.Table>
      </div>
      <FormUser />
    </>
  )
}

export const UsersActivity = () => {
  return (
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
            addLabel={false}
            icon="search"
            placeHolder="Search Activity"
          />
        </div>
      </div>
      <div className="box" style={{ marginTop: '0px' }}>
        <AdminPanelUI2.ListGroup>
          {[5, 6, 7, 4, 8, 6, 5, 56, 85, 5, 56, 5765, 75, 6].map((data, i) => (
            <AdminPanelUI2.ListType1
              key={`${data}${i}`}
              imgSize="50px"
              delayAnim={`${0.04 * i}s`}
              moreClass="separator w-100"
              img="/me2.png"
              alt="me2"
              title="You got one new message!"
              subTitle="12 minutes ago"
            />
          ))}
        </AdminPanelUI2.ListGroup>
      </div>
    </>
  )
}

const MenuList = () => {
  const { category, subCategory } = useParams()
  const dispatch = useDispatch()
  const menuData = useMenuData()
  const menuGroup = useGroupingMenu(menuData)
  const indexCategory = () => menuGroup.findIndex((menu) => menu.menu.title === category)
  const indexSubCategory = () => menuGroup[indexCategory()].subMenu.findIndex((menu) => menu.title === subCategory)
  const styleImg = { width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }
  const deleteMenu = (data) => {
    dispatch(
      setAlert({
        title: 'Delete this Menu?',
        description: `Are you sure delete "${data.name}"? this will be permanently!`,
        alertType: 'confirm',
        alertStyle: 'warning'
      })
    )
  }
  const editMenu = (uuid) => {
    const menu = menuData.find((data) => data.uuid === uuid)
    dispatch(setFormMenu({ action: 'updatemenu', formData: menu }))
  }
  const addMenu = () => {
    dispatch(setFormMenu({ action: 'menu' }))
  }
  return (
    <>
      <Button style="fill" height="40px" color="second" icon="plus-math" iconSize="18px" onClick={addMenu}>
        Add Menu
      </Button>
      <AdminPanelUI2.Table
        firstColm
        tHead={[{ label: 'Image' }, { label: 'Menu' }, { label: 'Price' }, { label: 'Options', width: '90px' }]}
        moreClass="w-100"
      >
        {menuGroup && (
          <>
            {menuGroup[indexCategory()].subMenu[indexSubCategory()].data.map((menu, i) => (
              <AdminPanelUI2.TRow
                firstColm={i + 1}
                key={`${menu.uuid}${menu.name}${i}`}
                tRow={[
                  {
                    label: (
                      <LazyLoadImage
                        key={i}
                        effect="opacity"
                        src={`/img/menu_images${menu.img}`}
                        style={styleImg}
                        alt={menu.name}
                      />
                    )
                  },
                  { label: menu.name },
                  {
                    label: `Rp ${menu.price.toLocaleString('id-ID', { currency: 'IDR' })}`
                  },
                  {
                    label: (
                      <div key={i} className="box dsp-flex align-itms-center">
                        <Button
                          icon="ball-point-pen"
                          height="40px"
                          brightness="var(--icon2)"
                          iconSize="24px"
                          onClick={() => editMenu(menu.uuid)}
                        />
                        <Button
                          icon="trash"
                          height="40px"
                          brightness="var(--icon2)"
                          iconSize="24px"
                          onClick={() => deleteMenu(menu)}
                        />
                      </div>
                    )
                  }
                ]}
                style={{ '--delay-show': `${0.04 * i}s` }}
              />
            ))}
          </>
        )}
      </AdminPanelUI2.Table>
    </>
  )
}
const Subcatogory = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const menuData = useMenuData()
  const menuGroup = useGroupingMenu(menuData)
  const indexMenu = () => menuGroup.findIndex((menu) => menu.menu.title === category)
  const pathName = usePathName()
  const urlSubCategoryNavLinkMatch = () => {
    return pathName.length >= 6 && `${pathName[5]}/${pathName[6]}`
  }
  const newSubCategory = () => {
    dispatch(setFormMenu({ action: 'subcategory' }))
  }
  const editSubCategory = (subCategory) => {
    dispatch(
      setFormMenu({
        action: 'updatesubcategory',
        formData: { menuType: { subCategory: { title: subCategory.title, image: subCategory.img } } }
      })
    )
  }
  const deleteSubCategory = (subCategory) => {
    dispatch(
      setAlert({
        title: 'Delete Sub Category?',
        description: `Are you sure delete Sub Category "${subCategory}"? this will be permanently! also with related menus.`,
        alertType: 'confirm',
        alertStyle: 'warning'
      })
    )
  }
  return (
    <>
      <AdminPanelUI2.LabelBox label="Sub Category" moreClass="dsp-flex fl-colm gap-10">
        <div className="box dsp-flex align-itms-center gap-10 fl-wrap">
          {menuGroup && (
            <>
              {menuGroup[indexMenu()].subMenu.map((subCategory, i2) => {
                return (
                  <AdminPanelUI2.NavLinkX
                    key={`${subCategory.title}${i2}`}
                    to={`subcategory/${encodeURIComponent(subCategory.title)}`}
                    match={urlSubCategoryNavLinkMatch()}
                    img={`/img/menu_images${subCategory.img}`}
                    name={subCategory.title}
                    style={{ '--delay-show': `${0.04 * i2}s` }}
                    onClickDelete={() => deleteSubCategory(subCategory.title)}
                    onClickEdit={() => editSubCategory(subCategory)}
                  />
                )
              })}
              <AdminPanelUI2.NavLinkX
                key={`${menuGroup[indexMenu()].subMenu.length}`}
                type="button"
                icon="plus-math gradient"
                iconSize="22px"
                name="New"
                onClick={newSubCategory}
                style={{ '--delay-show': `${0.04 * menuGroup[indexMenu()].subMenu.length}s` }}
              />
            </>
          )}
        </div>
      </AdminPanelUI2.LabelBox>
      <Routes>
        <Route path="subcategory/:subCategory" lazy={<h1>Loading</h1>} element={<MenuList />} />
      </Routes>
    </>
  )
}
export const Menu = () => {
  useDocumentTitle('Menu')
  const dispatch = useDispatch()
  const menuData = useMenuData()
  const menuGroup = useGroupingMenu(menuData)
  const pathName = usePathName()
  const [isIntruct, setIsInstruct] = useState(true)
  const urlCategoryNavLinkMatch = () => {
    return pathName.length >= 4 && `${pathName[3]}/${pathName[4]}`
  }
  const newCategory = () => {
    dispatch(setFormMenu({ action: 'category' }))
  }
  const editCategory = (category) => {
    dispatch(
      setFormMenu({
        action: 'updatecategory',
        formData: { menuType: { category: { title: category.title, image: category.img } } }
      })
    )
  }
  const deleteCategory = (category) => {
    dispatch(
      setAlert({
        title: 'Delete Category?',
        description: `Are you sure delete Category "${category}"? this will be permanently! also with related subcategory and menus.`,
        alertType: 'confirm',
        alertStyle: 'warning'
      })
    )
  }
  return (
    <>
      <div className="box dsp-flex fl-colm justify-start align-itms-start gap-20">
        <AdminPanelUI2.LabelBox label="Category" moreClass="dsp-flex fl-colm gap-10">
          <div className="box dsp-flex align-itms-center gap-10 fl-wrap">
            {menuGroup && (
              <>
                {menuGroup.map((category, i1) => {
                  if (category.menu.title === 'Filtering') return
                  return (
                    <AdminPanelUI2.NavLinkX
                      key={`${category.menu.title}${i1}`}
                      to={`category/${encodeURIComponent(category.menu.title)}`}
                      match={urlCategoryNavLinkMatch()}
                      img={`/img/menu_images${category.menu.img}`}
                      name={category.menu.title}
                      style={{ '--delay-show': `${0.04 * i1}s` }}
                      onClick={() => setIsInstruct(false)}
                      onClickEdit={() => editCategory(category.menu)}
                      onClickDelete={() => deleteCategory(category.menu.title)}
                    />
                  )
                })}
                <AdminPanelUI2.NavLinkX
                  type="button"
                  icon="plus-math gradient"
                  iconSize="22px"
                  name="New"
                  style={{ '--delay-show': `${0.04 * menuGroup.length}s` }}
                  onClick={newCategory}
                />
              </>
            )}
          </div>
        </AdminPanelUI2.LabelBox>
        {isIntruct && (
          <div className="box mrgn-y-10 dsp-flex align-itms-center gap-4">
            <span className="icons8-filled up" style={{ '--i8-ratio': '22px', filter: 'var(--icon1)' }} />
            <p className="font-size-16 font-weg-600 disabled-text-1">Click the menu category to view</p>
          </div>
        )}
        <Routes>
          <Route path="category/:category/*" element={<Subcatogory />} />
        </Routes>
      </div>
      <FormMenu />
    </>
  )
}
export const NewCategory = () => {
  useDocumentTitle('New - Menu')
  return <>New Category</>
}
export const NewSubCategory = () => {
  useDocumentTitle('New - Menu')
  return <>New Sub Category</>
}
export const Transaction = () => {
  useDocumentTitle('Transaction')
  const transactionData = useTransactionData()
  const date = (date) => {
    const fulldate = date.split(' ')
    const time = fulldate[1].split(':')
    return [fulldate[0], `${time[0]}:${time[1]}`]
  }
  return (
    <div className="box dsp-flex fl-colm gap-20">
      <div
        className="box dsp-grid gap-20 pad-b-20"
        style={{ '--gd-colm': '.5fr .7fr 1fr', '--gd-rows': '140px', borderBottom: '1px solid var(--separator)' }}
      >
        <AdminPanelUI2.CardOverview
          name="Orders"
          icon="purchase-order"
          value="42"
          style={{ backgroundColor: 'rgb(216, 203, 203)', color: 'rgb(61,61,61)' }}
        />
        <AdminPanelUI2.CardOverview
          name="Sales"
          icon="total-sales"
          value={`Rp ${(7600000).toLocaleString('id-ID', { currency: 'IDR' })},00`}
          style={{ backgroundColor: 'rgb(245, 213, 217)', color: 'rgb(61,61,61)' }}
        />
      </div>
      <div className="box dsp-flex justify-between align-itms-center gap-10">
        <div className="box fl-1">
          <InputField
            type="search"
            width="100%"
            height="40px"
            placeHolder="Search some transaction"
            icon="search"
            iconSize="20px"
            addLabel={false}
          />
        </div>
        <div className="box">
          <SimpleCombobox select="1 August - 7 August" styleBox="fill">
            <SimpleComboLi value="1 August - 6 August" />
            <SimpleComboLi value="7 August - 13 August" />
            <SimpleComboLi value="14 August - 20 August" />
            <SimpleComboLi value="21 August - 27 August" />
            <SimpleComboLi value="28 August - 31 August" />
          </SimpleCombobox>
        </div>
      </div>
      <AdminPanelUI2.Table
        firstColm
        tHead={[
          { label: 'Order Code', width: '130px' },
          { label: 'User' },
          { label: 'Date' },
          { label: 'Time' },
          { label: 'Status', width: '90px' },
          { label: 'Options', width: '70px' }
        ]}
        moreClass="w-100"
      >
        {transactionData &&
          transactionData.map((data, i) => {
            if (data.orderStatus === 'Complete') {
              const fullDate = date(data.createdAt)
              return (
                <AdminPanelUI2.TRow
                  key={`${data.uuid}${i}`}
                  firstColm={i + 1}
                  tRow={[
                    {
                      label: data.orderCode,
                      style: { fontFamily: 'consolas', fontWeight: '600', letterSpacing: '1px' }
                    },
                    { label: 'Machine 1' },
                    { label: fullDate[0] },
                    { label: fullDate[1] },
                    {
                      label: (
                        <div
                          className={`box font-size-13 pad-t-4 pad-b-4 dsp-flex justify-center align-itms-center rounded30 ${
                            data.orderStatus === 'Complete'
                              ? 'success'
                              : data.orderStatus === 'Cancel'
                              ? 'danger'
                              : 'info'
                          }-bgcol`}
                          style={{ color: 'whitesmoke' }}
                        >
                          {data.orderStatus}
                        </div>
                      )
                    },
                    {
                      label: (
                        <div key={i} className="box dsp-flex align-itms-center">
                          <Button
                            type="hyperlink"
                            to={encodeURIComponent(data.uuid)}
                            icon="menu-vertical"
                            iconStyle="filled"
                            height="40px"
                            iconSize="24px"
                          />
                        </div>
                      ),
                      style: { display: 'flex', justifyContent: 'center' }
                    }
                  ]}
                  style={{ '--delay-show': `${0.04 * i}s` }}
                />
              )
            }
          })}
      </AdminPanelUI2.Table>
    </div>
  )
}
export const Activity = () => {
  useDocumentTitle('Activity')
  return (
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
            addLabel={false}
            icon="search"
            placeHolder="Search Activity"
          />
        </div>
      </div>
      <div className="box" style={{ marginTop: '0px' }}>
        <AdminPanelUI2.ListGroup>
          {[5, 6, 7, 4, 8, 6, 5, 56, 85, 5, 56, 5765, 75, 6].map((data, i) => (
            <AdminPanelUI2.ListType1
              key={`${data}${i}`}
              imgSize="50px"
              delayAnim={`${0.04 * i}s`}
              moreClass="separator w-100"
              img="/me2.png"
              alt="me2"
              title="You got one new message!"
              subTitle="12 minutes ago"
            />
          ))}
        </AdminPanelUI2.ListGroup>
      </div>
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
