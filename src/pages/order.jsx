import { useDocumentTitle } from '../hooks/useDocumentHandler'
import useNavigationMenu from '../hooks/useNavigationMenu'
import Button from '../components/Elements/Button/index'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, removeOneFromCart, resetCart, toggleNav } from '../redux/slice/cartOrder'
import useTotalItems from '../hooks/useTotalItems'
import Spinning from '../components/Elements/Spinning'
import PopupAlert from '../components/Fragments/popupAlert'
import PopupScreen from '../components/Layout/PopupScreen'
import InputField from '../components/Elements/InputField'
import useMenuData from '../hooks/useMenuData'
import useGroupingMenu from '../hooks/useGroupingMenu'

const Order = () => {
  useDocumentTitle('Order')
  const menuData = useMenuData()
  const menuGroup = useGroupingMenu(menuData)
  const { navigationMenu, setNavigationMenu } = useNavigationMenu(menuGroup, true)
  const [popupOrder, setPopupOrder] = useState({ popup: false })
  const [popup, setPopup] = useState(false)
  const cartOrder = useSelector((state) => state.cartOrder.data)
  const totalItems = useTotalItems(cartOrder.cart)
  const dispatch = useDispatch()
  const switchNavigation = {
    switchMenu: (i) => {
      const setNavMenu = () => {
        let collect = [...navigationMenu]
        for (let x = 0; x < collect.length; x++) {
          navigationMenu[x].navMenu = false
        }
        navigationMenu[i].navMenu = true
        return collect
      }
      setNavigationMenu(setNavMenu())
    },
    switchSubMenu: (i1, i2) => {
      const setNavSubMenu = () => {
        let collect = [...navigationMenu]
        for (let x = 0; x < collect.length; x++) {
          let subCollect = [...collect[x].subNavMenu]
          for (let z = 0; z < collect[x].subNavMenu.length; z++) {
            subCollect[z] = false
          }
          if (x === i1) {
            subCollect[i2] = true
            collect[x].subNavMenu = subCollect
          }
        }
        return collect
      }
      setNavigationMenu(setNavSubMenu())
    }
  }

  const addOrder = (menu) => {
    const { uuid, img, name, price } = menu
    setPopupOrder({
      popup: true,
      data: { uuid, img, name, price }
    })
  }
  const addCart = () => {
    dispatch(addToCart({ ...popupOrder.data, qty: 1 }))
    setPopupOrder({ popup: false })
  }
  const checkout = (e) => {
    e.preventDefault()
    const customer = e.target.customer
    if (typeof customer.value !== 'string') throw new Error('customer name must be a string')
    if (customer.value.length === 0) {
      return InputField.SetMessage('Please type your name', customer.parentElement.parentElement, true)
    }
    const collectUuidOrders = () => {
      let collect = []
      cartOrder.cart.map((order) => {
        collect.push({ uuid: order.uuid, qty: order.qty })
      })
      return collect
    }
    console.log(e.target.customer.value, collectUuidOrders())
  }
  return (
    <>
      <div className="self-service-form ui1">
        <header id="header">
          <h1>Hi, there</h1>
          <div id="mycart">
            <span className={`icons8-regular ${totalItems.qty > 0 ? 'buying' : 'shopping-cart'} gradient`}></span>Rp{' '}
            {totalItems.price.toLocaleString('id-ID', { currency: 'IDR' })},00
          </div>
        </header>
        <nav id="nav-payment" className={cartOrder.navPayment ? 'active' : ''}>
          <div className="header-payment">
            <div className="box">
              <h2>
                Order <span>{`(${totalItems.qty} Items)`}</span>
              </h2>
            </div>
          </div>
          <div className="content-payment">
            <ul>
              {cartOrder.cart.map((order, i) => (
                <li key={i}>
                  <div className="box dsp-flex fl-colm gap-6 overflow-hidden">
                    <h4 className="font-size-18 font-weg-600 text-elips nowrap">{order.name}</h4>
                    <p className="font-size-13 disabled-text-2 font-weg-600 text-elips nowrap">-</p>
                  </div>
                  <div className="box dsp-flex align-itms-center gap-20 justify-self-end">
                    <div className="box dsp-flex fl-colm gap-4">
                      <p className="font-size-18 font-weg-600">
                        Rp {(order.price * order.qty).toLocaleString('id-ID', { currency: 'IDR' })}
                      </p>
                      <p className="font-size-13 disabled-text-1">
                        Rp {order.price.toLocaleString('id-ID', { currency: 'IDR' })}
                      </p>
                    </div>
                    <Spinning
                      value={order.qty}
                      onClickUp={() => dispatch(addToCart({ ...order, qty: 1 }))}
                      onClickDown={() => dispatch(removeOneFromCart({ ...order, qty: 1 }))}
                    ></Spinning>
                    <button className="remove-order" onClick={() => dispatch(removeFromCart(i))}>
                      <span className="icons8-regular trash"></span>
                    </button>
                  </div>
                  {/* <div className="box dsp-flex h-100 justify-between align-itms-center">
                                    </div> */}
                </li>
              ))}
            </ul>
          </div>
          <form
            method="post"
            className="footer-payment dsp-flex fl-colm mrgn-x-30 mrgn-y-10 gap-30"
            onSubmit={(e) => checkout(e)}
          >
            <InputField
              name="customer"
              placeHolder="Your Name"
              autoComplete="off"
              moreClass="mrgn-b-20"
              required={true}
            />
            <div className="box dsp-flex justify-between align-itms-center">
              <h3 className="font-size-24 font-weg-700">Total</h3>
              <p className="font-size-22 font-weg-600 accent-col-3">
                Rp {totalItems.price.toLocaleString('id-ID', { currency: 'IDR' })},00
              </p>
            </div>
            <div className="box dsp-flex justify-between align-itms-center">
              <Button
                style="regular"
                color="third"
                icon="delete"
                iconStyle="regular gradient"
                onClick={() => dispatch(toggleNav())}
              >
                Cancel
              </Button>
              <Button type="submit" style="fill" color="third" disabled={totalItems.qty === 0 ? true : false}>
                Place Order Rp {totalItems.price.toLocaleString('id-ID', { currency: 'IDR' })},00
              </Button>
            </div>
          </form>
        </nav>
        <nav id="nav-menu-group">
          <div id="menu-nav">
            <ul>
              {navigationMenu.length > 0 &&
                menuGroup.map((menu, i) => (
                  <li
                    key={i}
                    className={navigationMenu[i].navMenu ? 'active' : ''}
                    onClick={() => switchNavigation.switchMenu(i)}
                    style={{ '--delay-show': `${0.04 * i}s` }}
                  >
                    <div className="menu-image">
                      {menu.menu.title === 'Filtering' ? (
                        <span className="icons8-regular sorting"></span>
                      ) : (
                        <img src={`/img/menu_images${menu.menu.img}`} alt="" />
                      )}
                    </div>
                    <p>{menu.menu.title}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div id="submenu-nav">
            {navigationMenu.length > 0 &&
              menuGroup.map((menu, i1) => (
                <ul key={i1} className={navigationMenu.length > 0 && navigationMenu[i1].navMenu ? 'active' : ''}>
                  {menu.subMenu.map((sub, i2) => (
                    <li
                      key={i2}
                      className={navigationMenu[i1].subNavMenu[i2] ? 'active' : ''}
                      onClick={() => switchNavigation.switchSubMenu(i1, i2)}
                      style={{ '--delay-show': `${0.04 * i2}s` }}
                    >
                      <div className="menu-image">
                        {menu.menu.title === 'Filtering' ? (
                          <span className={`icons8-regular ${sub.icon}`}></span>
                        ) : (
                          <img src={`/img/menu_images${sub.img}`} />
                        )}
                      </div>
                      <p>{sub.title}</p>
                    </li>
                  ))}
                </ul>
              ))}
          </div>
        </nav>
        <div id="content">
          {navigationMenu.length > 0 &&
            navigationMenu.map((menu, i1) => (
              <div
                key={i1}
                className={`card-menu-group${navigationMenu.length > 0 && navigationMenu[i1].navMenu ? ' active' : ''}`}
              >
                {menu.subNavMenu.map((subMenu, i2) => (
                  <ul
                    key={i2}
                    className={`${navigationMenu.length > 0 && navigationMenu[i1].subNavMenu[i2] ? 'active' : ''}`}
                  >
                    {menuGroup[i1].subMenu[i2].data.map((me, i3) => (
                      <li
                        key={i3}
                        style={{ '--delay-show': `${0.04 * i3}s` }}
                        onClick={() => addOrder(me)}
                        data-amount={`x0`}
                      >
                        <div className="card-image">
                          <img src={`/img/menu_images${me.img}`} alt="" />
                        </div>
                        <p className="price">Rp {me.price.toLocaleString('id-ID', { currency: 'IDR' })}</p>
                        <div className="description">
                          <p className="font-size-16 font-weg-700 space-06">{me.name.substring(0, 30)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
        </div>
        <footer id="footer">
          <button id="resetorder" className={totalItems.qty === 0 ? ' disabled' : ''} onClick={() => setPopup(true)}>
            <span className="icons8-regular reboot"></span>Reset Order
          </button>
          <button id="checkout" onClick={() => dispatch(toggleNav())}>
            Checkout<span className="icons8-regular checkout"></span>
          </button>
        </footer>
      </div>
      <div id="popup-order" className={popupOrder.popup ? 'active' : ''}>
        <div className="window menu-detail">
          {popupOrder.data && (
            <>
              <div className="preview">
                <img src={`/img/menu_images${popupOrder.data.img}`} alt={popupOrder.data.name} className="bg-preview" />
                <img
                  src={`/img/menu_images${popupOrder.data.img}`}
                  alt={popupOrder.data.name}
                  className="front-preview"
                />
              </div>
              <div className="header-menu">
                <div className="box dsp-flex justify-between align-itms-center mrgn-b-10">
                  <h2>{popupOrder.data.name}</h2>
                  <h3>Rp {popupOrder.data.price.toLocaleString('id-ID', { currency: 'IDR' })}</h3>
                </div>
                <p>-</p>
              </div>
              <div className="content-menu">-</div>
              <div className="footer-menu">
                <Button
                  style="regular"
                  color="third"
                  icon="delete"
                  iconStyle="regular gradient"
                  onClick={() => setPopupOrder({ popup: false })}
                >
                  Cancel
                </Button>
                <Button id="addorder" style="fill" color="third" onClick={() => addCart()}>
                  Add from Rp {popupOrder.data.price.toLocaleString('id-ID', { currency: 'IDR' })},00
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <PopupScreen active={popup}>
        {popup && (
          <PopupAlert
            titleBar=""
            title="Reset Order"
            description="Are you sure?"
            alertType="confirm"
            alertStyle="warning"
            action={{
              yes: () => {
                dispatch(resetCart())
                setPopup(false)
              },
              no: () => setPopup(false),
              close: () => setPopup(false)
            }}
          ></PopupAlert>
        )}
      </PopupScreen>
    </>
  )
}

export default Order
