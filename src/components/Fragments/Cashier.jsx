import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import Button from '../Elements/Button'
import SimpleCombobox from '../Elements/SimpleCombobox'
import SimpleComboLi from '../Elements/SimpleCombobox/SimpleComboLi'
import OrderGroup from './OrderGroup'
import { dateNow, getDate, getMonthAndYear, getTime, monthAndYearNow } from '../../utils/date'
import DefaultSpinner from './DefaultSpinner'

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

export const OnProcess = ({ menuData, transactionToday }) => {
  useDocumentTitle('Order')
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }
  const findMenu = (uuid) => {
    return menuData?.find((menu) => menu?.uuid === uuid)
  }

  return (
    <>
      <div className="header-content">
        <h2>Order Today</h2>
      </div>
      {transactionToday?.pending?.length > 0 || transactionToday?.cooking?.length > 0 ? (
        <OrderGroup>
          {transactionToday?.cooking.map((order, i1) => {
            return (
              <OrderGroup.List key={order.uuid} expand={true} orderStatus={order.orderStatus} index={i1}>
                <div className="box dsp-flex justify-between gap-10">
                  <div className="box dsp-flex fl-colm justify-between">
                    <h3 className="font-size-18">Order : {order.orderCode}</h3>
                    <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                  </div>
                  <div className="box dsp-flex fl-colm justify-between align-itms-end">
                    <div className="box dsp-flex align-itms-center gap-4">
                      <span
                        className="icons8-regular clock"
                        style={{ '--i8-ratio': '18px', filter: 'var(--icon1)' }}
                      ></span>
                      <p className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</p>
                    </div>
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
                    minHeight: '30px',
                    borderTop: '1px solid var(--separator)'
                  }}
                >
                  <ul className="orders">
                    {menuData &&
                      order.orders.map((data, i2) => {
                        const menu = findMenu(data?.order?.uuid)
                        return <li key={`${data?.order?.uuid}${i2}`}>{`${menu?.name} (x${data?.qty})`}</li>
                      })}
                  </ul>
                </div>
              </OrderGroup.List>
            )
          })}
          {transactionToday?.pending.map((order, i1) => {
            const conditionOrder = () => {
              return order.orderStatus.toLowerCase() !== 'complete' && getDate(order.createdAt) === dateNow()
            }
            if (conditionOrder())
              return (
                <OrderGroup.List key={order.uuid} expand={true} orderStatus={order.orderStatus} index={i1}>
                  <div className="box dsp-flex justify-between gap-10">
                    <div className="box dsp-flex fl-colm justify-between">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <div className="box dsp-flex align-itms-center gap-4">
                        <span
                          className="icons8-regular clock"
                          style={{ '--i8-ratio': '18px', filter: 'var(--icon1)' }}
                        ></span>
                        <p className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</p>
                      </div>
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
                      minHeight: '30px',
                      borderTop: '1px solid var(--separator)'
                    }}
                  >
                    <ul className="orders">
                      {menuData &&
                        order.orders.map((data, i2) => {
                          const menu = findMenu(data?.order?.uuid)
                          return <li key={`${data?.order?.uuid}${i2}`}>{`${menu?.name} (x${data?.qty})`}</li>
                        })}
                    </ul>
                  </div>
                </OrderGroup.List>
              )
          })}
        </OrderGroup>
      ) : transactionToday?.pending?.length === 0 || transactionToday?.cooking?.length === 0 ? (
        <div className="box dsp-flex fl-colm align-itms-center mrgn-t-30">
          <p className="font-size-16 disabled-text-1">No orders completed at this time</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}

export const Complete = ({ menuData, transactionToday }) => {
  useDocumentTitle('Complete')
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }
  const findMenu = (uuid) => {
    return menuData?.find((menu) => menu?.uuid === uuid)
  }
  return (
    <>
      <div className="header-content">
        <h2>Finished Today</h2>
      </div>
      {transactionToday?.complete?.length > 0 ? (
        <OrderGroup>
          {transactionToday?.complete &&
            transactionToday?.complete.map((order, i1) => {
              if (order.orderStatus.toLowerCase() === 'complete' && getDate(order.createdAt) === dateNow())
                return (
                  <OrderGroup.List key={order.uuid} orderStatus={order.orderStatus} index={i1} expand={true}>
                    <div className="box dsp-flex justify-between gap-10">
                      <div className="box dsp-flex fl-colm justify-between">
                        <h3 className="font-size-18">Order : {order.orderCode}</h3>
                        <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                      </div>
                      <div className="box dsp-flex fl-colm justify-between align-itms-end">
                        <div className="box dsp-flex align-itms-center gap-4">
                          <span
                            className="icons8-regular clock"
                            style={{ '--i8-ratio': '18px', filter: 'var(--icon1)' }}
                          ></span>
                          <p className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</p>
                        </div>
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
                        minHeight: '30px',
                        borderTop: '1px solid var(--separator)'
                      }}
                    >
                      <ul className="orders">
                        {menuData &&
                          order.orders.map((data, i2) => {
                            const menu = findMenu(data?.order?.uuid)
                            return <li key={`${data?.order?.uuid}${i2}`}>{`${menu?.name} (x${data?.qty})`}</li>
                          })}
                      </ul>
                    </div>
                  </OrderGroup.List>
                )
            })}
        </OrderGroup>
      ) : transactionToday?.complete?.length === 0 ? (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1">No orders completed at this time</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}

export const History = ({ transactionData }) => {
  useDocumentTitle('History')
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
  }
  const checkHistory = (orders) => {
    return (
      orders.length > 0 &&
      orders.findIndex(
        (order) =>
          order.orderStatus.toLowerCase() === 'complete' && getMonthAndYear(order.createdAt) === monthAndYearNow()
      )
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
      {transactionData && checkHistory(transactionData) >= 0 ? (
        <OrderGroup>
          {transactionData.map((order, i1) => {
            if (
              order.orderStatus.toLowerCase() === 'complete' &&
              getMonthAndYear(order.createdAt) === monthAndYearNow()
            )
              return (
                <OrderGroup.List key={order.uuid} orderStatus={order.orderStatus} index={i1}>
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
      ) : transactionData && checkHistory(transactionData) === -1 ? (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1">No orders at the last month</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}
