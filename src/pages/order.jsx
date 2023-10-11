import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDocumentTitle } from '../hooks/useDocumentHandler'
import useTotalItems from '../hooks/useTotalItems'
import useMenuData from '../hooks/useMenuData'
import useGroupingMenu from '../hooks/useGroupingMenu'
import { addToCart, removeFromCart, removeOneFromCart, resetCart } from '../redux/slice/cartOrder'
import getImage from '../utils/getImage'
import Button from '../components/Elements/Button/index'
import PopupAlert from '../components/Fragments/popupAlert'
import PopupScreen from '../components/Layout/PopupScreen'
import InputField from '../components/Elements/InputField'
import NavMenuOrder from '../components/Fragments/NavMenuOrder'
import CardGroupOrder from '../components/Fragments/CardGroupOrder'
import DefaultSpinner from '../components/Fragments/DefaultSpinner'
import CartList from '../components/Fragments/CartList'
import api from '../api/api'
import { setAlert } from '../redux/slice/popupScreenSlice'
import { setIsLoading } from '../redux/slice/authSlice'
import useRestartOrderTimer from '../hooks/useRestartOrderTimer'
import { createTransaction } from '../services/transaction.service'
import CompanyLogo from '../components/Elements/CompanyLogo'
import useCollectNavigation from '../hooks/useCollectNavigation'

const Order = () => {
  useDocumentTitle('Order')
  const dispatch = useDispatch()
  // main data menu
  const menuData = useMenuData()
  const menuGroup = useGroupingMenu(menuData)
  // restart machine order
  const { restartOrder, restart, restartCountdown } = useRestartOrderTimer(() => {
    dispatch(resetCart())
    clearCheckout()
  })
  // menu navigate state
  const { navigation, setNavigation } = useCollectNavigation(menuGroup)
  const [popupOrder, setPopupOrder] = useState({ popup: false })
  const [navCart, setNavCart] = useState(false)
  const [popup, setPopup] = useState(false)
  // process checkout
  const initProcess = { checkout: false, process: false, data: {} }
  const [processCheckout, setProcessCheckout] = useState(initProcess)
  const memRef = useRef(initProcess)
  // cart state
  const cartOrder = useSelector((state) => state.cartOrder.data)
  const totalItems = useTotalItems(cartOrder.cart)

  const switchMenu = (switchIndex) => {
    if (!switchIndex && typeof switchIndex !== 'number') return console.error('You not set switchIndex argument yet.')
    setNavigation((prevState) => {
      return prevState.reduce((prev, curr, reduceIndex) => {
        if (switchIndex === reduceIndex) return (prev = [...prev, true])
        return (prev = [...prev, false])
      }, [])
    })
  }
  const toggleNav = () => {
    setNavCart(!navCart)
  }
  const addOrder = (menu) => {
    const { uuid, image, name, price } = menu
    setPopupOrder({
      popup: true,
      data: { uuid, image, name, price }
    })
  }
  const addCart = () => {
    dispatch(addToCart({ ...popupOrder.data, qty: 1 }))
    setPopupOrder({ popup: false })
  }
  const setStateRef = (prevState) => {
    const newStateRef = prevState(memRef.current)
    setProcessCheckout(newStateRef)
    memRef.current = newStateRef
  }
  const clearCheckout = () => {
    setStateRef(() => {
      return {
        checkout: false,
        process: false,
        data: {}
      }
    })
  }
  const cancelCheckout = () => {
    setStateRef((prevState) => {
      const newState = { ...prevState }
      newState.process = 'CANCELLED'
      return newState
    })
  }
  const collectUuidOrders = () => {
    let collect = []
    cartOrder.cart.map((order) => {
      collect.push({ uuid: order.uuid, qty: order.qty })
    })
    return collect
  }
  const checkCustomerName = async () => {
    return await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (memRef.current?.data?.customer) {
          clearInterval(interval)
          resolve(`Hello ${memRef.current?.data?.customer}`)
        }
        if (memRef.current?.process === 'CANCELLED') {
          clearInterval(interval)
          reject('CANCELLED')
        }
      }, 300)
    })
  }
  const checkForPayment = async () => {
    return await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (memRef.current?.data?.payment) {
          clearInterval(interval)
          resolve(`Success pay`)
        }
        if (memRef.current?.process === 'CANCELLED') {
          clearInterval(interval)
          reject('CANCELLED')
        }
      }, 300)
    })
  }
  const checkAPI = async () => {
    return await new Promise((resolve, reject) => {
      setTimeout(async () => {
        const isAPIReady = await api.get('/')
        if (isAPIReady.status === 200) {
          resolve({ status: 'READY', statusCode: isAPIReady.status })
        } else {
          reject({ status: false, statusCode: isAPIReady.status })
        }
      }, 300)
    })
  }
  const validate = async (orders) => {
    if (orders.length === 0) return false
    return orders
  }
  const checkout = async (e) => {
    e.preventDefault()
    dispatch(setIsLoading(true))
    let fakeWaitingTimeout = null

    // TRY FAKE PAYMENT
    try {
      await checkAPI()
      const collectOrders = collectUuidOrders()
      dispatch(setIsLoading(false))

      // VALIDATE CART
      const validateCheckout = await validate(collectOrders)
      if (!validateCheckout) {
        dispatch(
          setAlert({
            title: 'Failed Checkout',
            description: 'No menu in cart',
            alertStyle: 'danger',
            alertType: 'message'
          })
        )
        return false
      }

      // COLLECT CUSTOMER NAME
      setStateRef(() => {
        return {
          checkout: true,
          process: 'GET_NAME',
          data: {
            orders: collectOrders
          }
        }
      })
      await checkCustomerName()

      // WAITING FOR PAYMENT SERVICE
      setStateRef((prevState) => {
        const newState = { ...prevState }
        newState.process = 'WAITING_FOR_PAYMENT'
        return newState
      })
      fakeWaitingTimeout = setTimeout(() => {
        setStateRef((prevState) => {
          const newState = { ...prevState }
          newState.process = 'PROCESSING'
          newState.data.payment = 'DEBIT_CARD'
          return newState
        })
      }, 5000)
      await checkForPayment()
      await createTransaction(memRef.current?.data)

      // ORDER COMPLETE
      setStateRef((prevState) => {
        const newState = { ...prevState }
        newState.process = 'ORDER_COMPLETE'
        restartCountdown()
        return newState
      })
    } catch (error) {
      if (error === 'CANCELLED') {
        dispatch(setIsLoading(false))
        clearTimeout(fakeWaitingTimeout)
        cancelCheckout()
        clearCheckout()
        return
      }
      dispatch(setIsLoading(false))
      clearTimeout(fakeWaitingTimeout)
      cancelCheckout()
      clearCheckout()
      dispatch(
        setAlert({
          title: 'Failed Checkout',
          description: 'Oppss..!, something when wrong, please order at the counter',
          alertStyle: 'danger',
          alertType: 'message'
        })
      )
    }
  }
  const handleProcess1 = (e) => {
    e.preventDefault()
    if (e.target.customerName.value.length === 0) {
      InputField.SetMessage('Cannot be empty!', e.target.customerName.parentElement.parentElement, true)
      return
    }
    setStateRef((prevState) => {
      const newState = { ...prevState }
      newState.data.customer = e.target.customerName.value
      return newState
    })
  }
  return (
    <>
      <div className="self-service-form ui1">
        <header id="header">
          <div className="box dsp-flex align-itms-center gap-14">
            <Button
              to="/machine"
              type="hyperlink"
              icon={'left-arrow'}
              color="classic"
              style={'fill'}
              brightness={'var(--icon1)'}
              height={'40px'}
              iconSize={'22px'}
              moreClass={'icon'}
            />
            <CompanyLogo companyName={<h1>Cafe CBN</h1>} moreClass="pointer-none" />
          </div>
          <div id="mycart">
            <span className={`icons8-regular ${totalItems.qty > 0 ? 'buying' : 'shopping-cart'} gradient`}></span>Rp{' '}
            {totalItems.price.toLocaleString('id-ID', { currency: 'IDR' })},00
          </div>
        </header>
        <nav id="nav-payment" className={navCart ? 'active' : ''}>
          <div className="header-payment">
            <div className="box">
              <h2>
                Order <span>{`(${totalItems.qty} Items)`}</span>
              </h2>
            </div>
          </div>
          <CartList>
            {cartOrder.cart.map((order, index) => (
              <CartList.Li
                key={order?.uuid}
                name={order?.name}
                price={order?.price}
                qty={order?.qty}
                onClickSpinUp={() => dispatch(addToCart({ ...order, qty: 1 }))}
                onClickSpinDown={() => dispatch(removeOneFromCart({ ...order, qty: 1 }))}
                onClickRemove={() => dispatch(removeFromCart(index))}
              />
            ))}
          </CartList>
          <form
            method="post"
            className="footer-payment dsp-flex fl-colm mrgn-x-30 mrgn-y-10 gap-30"
            onSubmit={(e) => checkout(e)}
          >
            <div className="box dsp-flex justify-between align-itms-center">
              <h3 className="font-size-24 font-weg-700">Total</h3>
              <p className="font-size-22 font-weg-600 accent-col-3">
                Rp {totalItems.price.toLocaleString('id-ID', { currency: 'IDR' })},00
              </p>
            </div>
            <div className="box dsp-flex justify-between align-itms-center">
              <Button style="regular" color="third" icon="delete" iconStyle="regular gradient" onClick={toggleNav}>
                Cancel
              </Button>
              <Button type="submit" style="fill" color="third" disabled={totalItems.qty === 0 ? true : false}>
                Place Order Rp {totalItems.price.toLocaleString('id-ID', { currency: 'IDR' })},00
              </Button>
            </div>
          </form>
        </nav>
        <nav id="nav-menu-group">
          <NavMenuOrder>
            {menuGroup.length > 0 ? (
              <>
                {menuGroup.map((group, index) => {
                  if (!group.showOn) return
                  return (
                    <NavMenuOrder.Li
                      key={`${group.uuid}${index}`}
                      image={getImage(group?.image, 'nofoodphoto')}
                      alt={group.groupName}
                      groupName={group.groupName}
                      index={index}
                      isActive={navigation[index]}
                      onClick={() => switchMenu(index)}
                    />
                  )
                })}
              </>
            ) : menuGroup.length === 0 ? (
              'Nothing'
            ) : (
              'Loading...'
            )}
          </NavMenuOrder>
        </nav>
        <div id="content">
          <CardGroupOrder isActive>
            {menuGroup.length > 0 ? (
              <>
                {menuGroup.map((group, index) => {
                  if (!group?.showOn) return
                  return (
                    <CardGroupOrder.Ul key={`${group?.uuid}${index}`} isActive={navigation[index]}>
                      {group.menus.map((menu, index2) => (
                        <CardGroupOrder.Li
                          key={`${group?.uuid}${index2}`}
                          image={getImage(menu?.image, 'nofoodphoto')}
                          alt={menu?.name}
                          name={menu?.name}
                          price={menu?.price}
                          index={index2}
                          onClick={() => addOrder(menu)}
                        />
                      ))}
                    </CardGroupOrder.Ul>
                  )
                })}
              </>
            ) : menuGroup.length === 0 ? (
              <div
                className="box dsp-flex justify-center align-itms-center fl-colm gap-10 pad-y-30 w-100"
                style={{ height: '350px' }}
              >
                <span
                  className="icons8-regular search-more"
                  style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
                ></span>
                <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10 text-center">
                  Uh Oh..., there is currently no menu available,<br></br> please contact customer service for
                  troubleshooting.
                </p>
              </div>
            ) : menuGroup === false ? (
              <DefaultSpinner />
            ) : (
              <div
                className="box dsp-flex justify-center align-itms-center fl-colm gap-10 pad-y-30 w-100"
                style={{ height: '350px' }}
              >
                <span
                  className="icons8-regular search-more"
                  style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
                ></span>
                <p className="font-size-18 font-weg-500 disabled-text-1 mrgn-b-10 text-center">
                  Uh Oh..., something went wrong when we displayed the menu,<br></br> please contact customer service
                  for troubleshooting.
                </p>
              </div>
            )}
          </CardGroupOrder>
        </div>
        <footer id="footer">
          <button id="resetorder" className={totalItems?.qty === 0 ? ' disabled' : ''} onClick={() => setPopup(true)}>
            <span className="icons8-regular reboot"></span>Reset Order
          </button>
          <button id="checkout" onClick={toggleNav}>
            Checkout<span className="icons8-regular checkout"></span>
          </button>
        </footer>
      </div>
      <div
        id="process-checkout"
        className={`${processCheckout?.checkout ? 'active' : ''}${
          processCheckout?.process === 'ORDER_COMPLETE' ? ' success' : ''
        }`}
      >
        {processCheckout.process === 'GET_NAME' ? (
          <div className="process" key={'GET_NAME'}>
            <form action="" method="post" onSubmit={handleProcess1}>
              <h2>Please type your name, we will call your name after the order is ready.</h2>
              <InputField
                addLabel={false}
                width={'100%'}
                name="customer"
                placeHolder="Your Name"
                id={'customerName'}
                autoComplete="off"
                moreClass="mrgn-y-30"
                required={true}
              />
              <div className="box w-100 gap-10 dsp-flex justify-center">
                <Button
                  style="regular"
                  color="third"
                  icon="delete"
                  iconStyle="regular gradient"
                  width={'140px'}
                  onClick={cancelCheckout}
                >
                  Cancel
                </Button>
                <Button type="submit" style={'fill'} color="third" width={'140px'}>
                  Next
                </Button>
              </div>
            </form>
          </div>
        ) : processCheckout.process === 'WAITING_FOR_PAYMENT' ? (
          <div className="process" key={'WAITING_FOR_PAYMENT'}>
            <div className="hint-info z-1">
              <span className="icons8-regular info"></span>
              It&apos;s just pretend, you don&apos;t have to do anything, enjoy.
            </div>
            <div className="box z-1">
              <h2>Waiting for payment</h2>
              <p className="mrgn-y-30 font-size-16 text-center">Follow instructions on the device!</p>
              <div className="box w-100 gap-10 dsp-flex justify-center">
                <Button
                  style="regular"
                  color="third"
                  icon="delete"
                  iconStyle="regular gradient"
                  onClick={cancelCheckout}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div className="arrow-instructions">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : processCheckout.process === 'ORDER_COMPLETE' ? (
          <div className="process" key={'ORDER_COMPLETE'}>
            <div className="box">
              <h2>Order Completed</h2>
              <p className="mrgn-y-30 font-size-16 text-center">
                Thank you for ordering,<br></br> please wait for your order at the counter
              </p>
              <div className="box w-100 gap-10 dsp-flex justify-center">
                <Button style="fill" color="success" width={'180px'} onClick={restart}>
                  {`OK (${restartOrder?.count}s)`}
                </Button>
              </div>
            </div>
          </div>
        ) : processCheckout.process === 'PROCESSING' ? (
          <div className="process" key={'PROCESSING'}>
            <div className="box">
              <h2>Processing...</h2>
              <div className="box dsp-flex justify-center">
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        ) : processCheckout.process === 'CANCELLED' ? (
          <div className="process" key={'CANCELLED'}>
            <div className="box">
              <h2>Order Canceled...</h2>
              <div className="box dsp-flex justify-center">
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DefaultSpinner />
        )}
      </div>
      <div id="popup-order" className={popupOrder?.popup ? 'active' : ''}>
        <div className="window menu-detail">
          {popupOrder?.data && (
            <>
              <div className="preview">
                <LazyLoadImage
                  effect="opacity"
                  src={popupOrder?.data?.image}
                  alt={popupOrder?.data?.name}
                  className="bg-preview"
                />
                <LazyLoadImage
                  effect="opacity"
                  src={popupOrder?.data?.image}
                  alt={popupOrder?.data?.name}
                  className="front-preview"
                />
              </div>
              <div className="header-menu">
                <div className="box dsp-flex justify-between align-itms-center mrgn-b-10">
                  <h2>{popupOrder?.data?.name}</h2>
                  <h3>Rp {popupOrder?.data?.price.toLocaleString('id-ID', { currency: 'IDR' })}</h3>
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
