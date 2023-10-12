import { useState } from 'react'
import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import { updateTransactionByID } from '../../services/transaction.service'
import { dateNow, getDate, getTime } from '../../utils/date'
import Button from '../Elements/Button'
import OrderGroup from './OrderGroup'
import DefaultSpinner from './DefaultSpinner'
import { useDispatch } from 'react-redux'
import { addTransactionChanges } from '../../redux/slice/transactionChangesSlice'
import { setAlert } from '../../redux/slice/popupScreenSlice'

export const Home = () => {
  useDocumentTitle('Home')
  return (
    <div className="intro">
      <div className="box dsp-flex fl-colm align-itms-start z-1">
        <h2 style={{ fontSize: '42px', fontWeight: 600 }}>
          Welcome to Kitchen{' '}
          <span
            style={{ color: 'var(--accent-color1)', letterSpacing: '3px', fontFamily: 'MainFont', fontWeight: 400 }}
          >
            Cafe CBN
          </span>
        </h2>
        <p className="font-size-18 mrgn-b-20">Manage the kitchen easier and faster</p>
        <Button type="hyperlink" to="/kitchen/oncooking" style="fill">
          Get Started
        </Button>
      </div>
      <div className="illustration">
        <img src="/img/coffee-shop-concept-illustrtion_image-by-storyset.svg" alt="" />
      </div>
    </div>
  )
}

export const OnCooking = ({ userSession, menuData, transactionToday }) => {
  useDocumentTitle('Cooking')
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState([-1, true])
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }

  const findMenu = (uuid) => {
    return menuData.find((menu) => menu.uuid === uuid)
  }

  const finish = async (uuid, index) => {
    setIsLoading([index, true])
    try {
      await updateTransactionByID(uuid, {
        orderStatus: 'complete',
        handleCooking: userSession?.username
      })
      dispatch(addTransactionChanges())
      setIsLoading([-1, false])
    } catch (error) {
      dispatch(
        setAlert({
          title: 'Finished cooking',
          description: "Can't finish this order",
          alertStyle: 'danger',
          alertType: 'message'
        })
      )
      setIsLoading([-1, false])
    }
  }
  const start = async (uuid, index) => {
    setIsLoading([index, true])
    try {
      await updateTransactionByID(uuid, {
        orderStatus: 'cooking',
        handleCooking: userSession?.username
      })
      dispatch(addTransactionChanges())
      setIsLoading([-1, false])
    } catch (error) {
      console.error(error)
      setIsLoading([-1, false])
    }
  }
  const checkCookingProgress = () => {
    return transactionToday.cooking.findIndex((find) => find.handleCooking === userSession.username)
  }
  return (
    <>
      <div className="header-content">
        <h2>Cooking Today</h2>
      </div>
      {transactionToday?.pending?.length > 0 || transactionToday?.cooking?.length > 0 ? (
        <OrderGroup>
          {transactionToday.cooking.map((order, i1) => {
            return (
              <OrderGroup.List
                key={order.uuid}
                expand={true}
                orderUuid={order.orderCode}
                qty={order.qty}
                time={order.createdAt}
                bill={order.bill}
                orderStatus={order.orderStatus}
                index={i1}
              >
                {i1 === isLoading[0] && isLoading[1] && <DefaultSpinner />}
                <div className="box dsp-flex justify-between gap-10">
                  <div className="box dsp-flex fl-colm justify-between">
                    <div className="box dsp-flex fl-colm justify-between gap-14">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="font-size-14 font-weg-600 disabled-text-2">
                        Customer : <span className="text-2 font-size-16">{order.customer}</span>
                      </p>
                      <p className="disabled-text-2 font-size-14 font-weg-600">
                        Qty : <span className="text-2 font-size-16">{getTotalQty(order.orders)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="box dsp-flex fl-colm justify-between align-itms-end">
                    <h4 className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</h4>
                    <div className="box dsp-flex align-itms-center gap-10">
                      <p className="font-size-14 font-weg-600 disabled-text-2 space-1">
                        <span className="text-2">
                          {'Handle by : '}
                          {order.handleCooking === userSession?.username ? 'You' : order.handleCooking}
                        </span>
                      </p>
                      <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                        Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                      </p>
                      <p className="order-status">{order.orderStatus.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="box pad-y-10"
                  style={{
                    minHeight: '60px',
                    borderTop: '1px solid var(--separator)',
                    borderBottom: order?.handleCooking !== userSession.username ? null : '1px solid var(--separator)'
                  }}
                >
                  <ul className="orders">
                    {menuData &&
                      order.orders.map((data, i2) => {
                        const menu = findMenu(data?.order?.uuid)
                        return <li key={`${data?.order?.uuid}${i2}`}>{`${menu.name} (x${data?.qty})`}</li>
                      })}
                  </ul>
                </div>
                <div
                  className={`box ${
                    order?.handleCooking !== userSession.username ? 'dsp-none' : 'dsp-flex'
                  } align-itms-center justify-end align-self-center h-100`}
                >
                  <Button style="fill" color="third" height="40px" onClick={() => finish(order?.uuid, i1)}>
                    {`Finished cooking`}
                  </Button>
                </div>
              </OrderGroup.List>
            )
          })}
          {transactionToday?.cooking.length > 0 && transactionToday?.pending.length > 0 && (
            <div className="separator-x"></div>
          )}
          {transactionToday.pending.map((order, i1) => {
            return (
              <OrderGroup.List
                key={order.uuid}
                expand={true}
                orderUuid={order.orderCode}
                qty={order.qty}
                time={order.createdAt}
                bill={order.bill}
                orderStatus={order.orderStatus}
                index={i1}
              >
                {i1 === isLoading[0] && isLoading[1] && <DefaultSpinner />}
                <div className="box dsp-flex justify-between gap-10">
                  <div className="box dsp-flex fl-colm justify-between gap-14">
                    <h3 className="font-size-18">Order : {order.orderCode}</h3>
                    <p className="font-size-14 font-weg-600 disabled-text-2">
                      Customer : <span className="text-2 font-size-16">{order.customer}</span>
                    </p>
                    <p className="disabled-text-2 font-size-14 font-weg-600">
                      Qty : <span className="text-2 font-size-16">{getTotalQty(order.orders)}</span>
                    </p>
                  </div>
                  <div className="box dsp-flex fl-colm justify-between align-itms-end">
                    <h4 className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</h4>
                    <div className="box dsp-flex align-itms-center gap-10">
                      <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                        Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                      </p>
                      <p className="order-status">{order.orderStatus.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="box pad-y-10"
                  style={{
                    minHeight: '60px',
                    borderTop: '1px solid var(--separator)',
                    borderBottom: i1 !== 0 || transactionToday.cooking.length > 0 ? null : '1px solid var(--separator)'
                  }}
                >
                  <ul className="orders">
                    {menuData &&
                      order.orders.map((data, i2) => {
                        const menu = findMenu(data?.order?.uuid)
                        return <li key={`${data?.order?.uuid}${i2}`}>{`${menu.name} (x${data?.qty})`}</li>
                      })}
                  </ul>
                </div>
                <div
                  className="box dsp-flex align-itms-center justify-end align-self-center h-100"
                  style={{ display: i1 !== 0 || !checkCookingProgress() ? 'none' : null }}
                >
                  <Button style="fill" color="third" height="40px" onClick={() => start(order?.uuid, i1)}>
                    Start
                  </Button>
                </div>
              </OrderGroup.List>
            )
          })}
        </OrderGroup>
      ) : transactionToday?.pending?.length === 0 || transactionToday?.cooking?.length === 0 ? (
        <div className="box dsp-flex fl-colm align-itms-center mrgn-t-30">
          <p className="font-size-16 disabled-text-1 text-center">No orders at this time</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}

export const Complete = ({ menuData, transactionToday }) => {
  useDocumentTitle('Complete')
  const checkComplete = (orders) => {
    return orders.find(
      (order) => order.orderStatus.toLowerCase() === 'complete' && getDate(order.createdAt) === dateNow()
    )
  }
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }
  const findMenu = (uuid) => {
    return menuData.find((menu) => menu.uuid === uuid)
  }
  return (
    <>
      <div className="header-content">
        <h2>Finished Today</h2>
      </div>
      <OrderGroup>
        {transactionToday.complete &&
          transactionToday.complete.map((order, i1) => {
            if (order.orderStatus === 'complete' && getDate(order.createdAt) === dateNow())
              return (
                <OrderGroup.List
                  key={order.uuid}
                  timeType="time"
                  expand={true}
                  orderUuid={order.orderCode}
                  qty={order.qty}
                  time={order.createdAt}
                  bill={order.bill}
                  orderStatus={order.orderStatus}
                  index={i1}
                >
                  <div className="box dsp-flex justify-between">
                    <div className="box dsp-flex fl-colm justify-between">
                      <div className="box dsp-flex fl-colm justify-between gap-14">
                        <h3 className="font-size-18">Order : {order.orderCode}</h3>
                        <p className="font-size-14 font-weg-600 disabled-text-2">
                          Customer : <span className="text-2 font-size-16">{order.customer}</span>
                        </p>
                        <p className="disabled-text-2 font-size-14 font-weg-600">
                          Qty : <span className="text-2 font-size-16">{getTotalQty(order.orders)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <h4 className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</h4>
                      <div className="box dsp-flex align-itms-center gap-10">
                        <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                          Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                        </p>
                        <p className="order-status">{order.orderStatus.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="box pad-y-10"
                    style={{
                      minHeight: '60px',
                      borderTop: '1px solid var(--separator)'
                    }}
                  >
                    <ul className="orders">
                      {menuData &&
                        order.orders.map((data, i2) => {
                          const menu = findMenu(data?.order?.uuid)
                          return <li key={`${data?.order?.uuid}${i2}`}>{`${menu.name} (x${data?.qty})`}</li>
                        })}
                    </ul>
                  </div>
                </OrderGroup.List>
              )
          })}
      </OrderGroup>
      {transactionToday.complete && !checkComplete(transactionToday.complete) && (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1 text-center">No orders completed at this time</p>
        </div>
      )}
    </>
  )
}
