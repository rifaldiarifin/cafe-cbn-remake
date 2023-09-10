import { useDispatch } from 'react-redux'
import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import Button from '../Elements/Button'
import SimpleCombobox from '../Elements/SimpleCombobox'
import SimpleComboLi from '../Elements/SimpleCombobox/SimpleComboLi'
import OrderGroup from './OrderGroup'
import { setAlert } from '../../redux/slice/popupScreenSlice'
import useTransactionData from '../../hooks/useTransactionData'
import { dateNow, getDate, getMonthAndYear, getTime, monthAndYearNow } from '../../utils/date'
import useMenuData from '../../hooks/useMenuData'

export const Home = () => {
  useDocumentTitle('Home')
  return (
    <div className="intro">
      <div className="box dsp-flex fl-colm align-itms-start z-1">
        <h2 style={{ fontSize: '42px', fontWeight: 600 }}>
          Welcome to Cashier{' '}
          <span
            style={{ color: 'var(--accent-color1)', letterSpacing: '3px', fontFamily: 'MainFont', fontWeight: 400 }}
          >
            Cafe CBN
          </span>
        </h2>
        <p className="font-size-18 mrgn-b-20">Manage the cashier easier and faster</p>
        <Button type="hyperlink" to="/cashier/onprocess" style="fill">
          Get Started
        </Button>
      </div>
      <div className="illustration">
        <img src="/img/coffee-shop-concept-illustrtion_image-by-storyset.svg" alt="" />
      </div>
    </div>
  )
}

export const OnProcess = () => {
  useDocumentTitle('Order')
  const transactionData = useTransactionData()
  const menuData = useMenuData()
  const dispatch = useDispatch()
  const checkOnProcess = (orders) => {
    return (
      orders.length > 0 &&
      orders.find((order) => getDate(order.createdAt) === dateNow() && order.orderStatus !== 'Complete')
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
  const pay = (bill) => {
    dispatch(
      setAlert({
        actionName: 'payOrder',
        title: 'Payment',
        description: `Pay for Rp ${bill.toLocaleString('id-ID', { currency: 'IDR' })},00`,
        alertType: 'confirm',
        alertStyle: 'info'
      })
    )
  }

  return (
    <>
      <div className="header-content">
        <h2>Order Today</h2>
      </div>
      <OrderGroup>
        {transactionData &&
          transactionData.map((order, i1) => {
            const conditionExpand = () => {
              return order.orderStatus !== 'Cooking' && order.orderStatus !== 'Waiting for Kitchen' ? false : true
            }
            const conditionOrder = () => {
              return order.orderStatus !== 'Complete' && getDate(order.createdAt) === dateNow()
            }
            if (conditionOrder())
              return (
                <OrderGroup.List
                  key={`${order.uuid}${i1}`}
                  expand={conditionExpand()}
                  orderStatus={order.orderStatus}
                  index={i1}
                >
                  <div className="box dsp-flex justify-between gap-10">
                    <div className="box dsp-flex fl-colm justify-between">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <h4 className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</h4>
                      <div className="box dsp-flex align-itms-center gap-10">
                        {order.orderStatus === 'Waiting for Payment' && (
                          <Button style="fill" color="third" height="40px" onClick={() => pay(order.bill)}>
                            Pay
                          </Button>
                        )}
                        <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                          Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                        </p>
                        <p className="order-status">{order.orderStatus}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="box pad-y-10"
                    style={{
                      display: `${!conditionExpand() && 'none'}`,
                      minHeight: '60px',
                      borderTop: '1px solid var(--separator)',
                      borderBottom: '1px solid var(--separator)'
                    }}
                  >
                    <ul className="orders">
                      {order.orders.map((data, i2) => {
                        const menu = findMenu(data.uuid)
                        return <li key={`${data.uuid}${i2}`}>{`${menu.name} (x${data.qty})`}</li>
                      })}
                    </ul>
                  </div>
                </OrderGroup.List>
              )
          })}
      </OrderGroup>
      {transactionData && !checkOnProcess(transactionData) && (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1">No orders completed at this time</p>
        </div>
      )}
    </>
  )
}

export const Complete = () => {
  useDocumentTitle('Complete')
  const transactionData = useTransactionData()
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }
  const checkComplete = (orders) => {
    return (
      orders.length > 0 &&
      orders.find((order) => getDate(order.createdAt) === dateNow() && order.orderStatus === 'Complete')
    )
  }
  return (
    <>
      <div className="header-content">
        <h2>Finished Today</h2>
      </div>
      <OrderGroup>
        {transactionData &&
          transactionData.map((order, i1) => {
            if (order.orderStatus === 'Complete' && getDate(order.createdAt) === dateNow())
              return (
                <OrderGroup.List key={`${order.uuid}${i1}`} orderStatus={order.orderStatus} index={i1}>
                  <div className="box dsp-flex justify-between gap-10">
                    <div className="box dsp-flex fl-colm justify-between">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <h4 className="font-weg-500 disabled-text-2 font-size-14">{getDate(order.createdAt)}</h4>
                      <div className="box dsp-flex align-itms-center gap-10">
                        <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                          Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                        </p>
                        <p className="order-status">{order.orderStatus}</p>
                      </div>
                    </div>
                  </div>
                </OrderGroup.List>
              )
          })}
      </OrderGroup>
      {transactionData && !checkComplete(transactionData) && (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1">No orders completed at this time</p>
        </div>
      )}
    </>
  )
}

export const History = () => {
  useDocumentTitle('History')
  const transactionData = useTransactionData()
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }
  const checkHistory = (orders) => {
    return (
      orders.length > 0 &&
      orders.find((order) => order.orderStatus === 'Complete' && getMonthAndYear(order.createdAt) === monthAndYearNow())
    )
  }
  return (
    <>
      <div className="header-content">
        <h2>Orders in the last month</h2>
        <SimpleCombobox select="1 August - 7 August" styleBox="fill">
          <SimpleComboLi>1 August - 6 August</SimpleComboLi>
          <SimpleComboLi>7 August - 13 August</SimpleComboLi>
          <SimpleComboLi>14 August - 20 August</SimpleComboLi>
          <SimpleComboLi>21 August - 27 August</SimpleComboLi>
          <SimpleComboLi>28 August - 31 August</SimpleComboLi>
        </SimpleCombobox>
      </div>
      <OrderGroup>
        {transactionData &&
          transactionData.map((order, i1) => {
            if (order.orderStatus === 'Complete' && getMonthAndYear(order.createdAt) === monthAndYearNow())
              return (
                <OrderGroup.List key={`${order.uuid}${i1}`} orderStatus={order.orderStatus} index={i1}>
                  <div className="box dsp-flex justify-between gap-10">
                    <div className="box dsp-flex fl-colm justify-between">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <h4 className="font-weg-500 disabled-text-2 font-size-14">{getDate(order.createdAt)}</h4>
                      <div className="box dsp-flex align-itms-center gap-10">
                        <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                          Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                        </p>
                      </div>
                    </div>
                  </div>
                </OrderGroup.List>
              )
          })}
      </OrderGroup>
      {transactionData && !checkHistory(transactionData) && (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1">No orders at the last month</p>
        </div>
      )}
    </>
  )
}
