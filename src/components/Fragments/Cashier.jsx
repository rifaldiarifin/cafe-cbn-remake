import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import Button from '../Elements/Button'
import OrderGroup from './OrderGroup'
import { dateNow, getDate, getMonthAndYear, getTime, monthAndYearNow } from '../../utils/date'
import DefaultSpinner from './DefaultSpinner'

export const Home = () => {
  useDocumentTitle('Home')
  return (
    <div className="intro">
      <div className="box dsp-flex fl-colm align-itms-start z-1">
        <h2>
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
                <div className="box dsp-flex justify-between">
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
          {transactionToday?.cooking.length > 0 && transactionToday?.pending.length > 0 && (
            <div className="separator-x"></div>
          )}
          {transactionToday?.pending.map((order, i1) => {
            const conditionOrder = () => {
              return order.orderStatus.toLowerCase() !== 'complete' && getDate(order.createdAt) === dateNow()
            }
            if (conditionOrder())
              return (
                <OrderGroup.List key={order.uuid} expand={true} orderStatus={order.orderStatus} index={i1}>
                  <div className="box dsp-flex justify-between">
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
        <div className="box dsp-flex fl-colm align-itms-center pad-y-30">
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
                    <div className="box dsp-flex justify-between">
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
        <div className="box dsp-flex fl-colm align-itms-center  pad-y-30">
          <p className="font-size-16 disabled-text-1">No orders completed at this time</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}

export const History = ({ menuData, transactionData }) => {
  useDocumentTitle('History')
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
        <h2>Orders in the last month</h2>
        {/* <SimpleCombobox select="1 August - 7 August" styleBox="fill">
          <SimpleComboLi value={'1 August - 6 August'}>1 August - 6 August</SimpleComboLi>
          <SimpleComboLi value={'7 August - 13 August'}>7 August - 13 August</SimpleComboLi>
          <SimpleComboLi value={'14 August - 20 August'}>14 August - 20 August</SimpleComboLi>
          <SimpleComboLi value={'21 August - 27 August'}>21 August - 27 August</SimpleComboLi>
          <SimpleComboLi value={'28 August - 31 August'}>28 August - 31 August</SimpleComboLi>
        </SimpleCombobox> */}
      </div>
      {transactionData.length > 0 ? (
        <OrderGroup>
          {transactionData.map((order, i1) => {
            if (
              order.orderStatus.toLowerCase() === 'complete' &&
              getMonthAndYear(order.createdAt) === monthAndYearNow()
            )
              return (
                <OrderGroup.List key={order.uuid} orderStatus={order.orderStatus} index={i1} expand={true}>
                  <div className="box dsp-flex justify-between">
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
                      <div className="box dsp-flex gap-10 align-itms-center">
                        <div className="box dsp-flex align-itms-center gap-4">
                          <span
                            className="icons8-regular calendar"
                            style={{ '--i8-ratio': '18px', filter: 'var(--icon1)' }}
                          ></span>
                          <p className="font-weg-500 disabled-text-2 font-size-14">{getDate(order.createdAt)}</p>
                        </div>
                        <div className="box dsp-flex align-itms-center gap-4">
                          <span
                            className="icons8-regular clock"
                            style={{ '--i8-ratio': '18px', filter: 'var(--icon1)' }}
                          ></span>
                          <p className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="box dsp-flex align-itms-center gap-10">
                        <p className="font-size-22 font-weg-600 mrgn-l-10 accent-col-3">
                          Rp {order.bill.toLocaleString('id-ID', { currency: 'IDR' })},00
                        </p>
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
      ) : transactionData.length === 0 ? (
        <div className="box dsp-flex fl-colm align-itms-center pad-y-30">
          <p className="font-size-16 disabled-text-1">No orders at the last month</p>
        </div>
      ) : (
        <DefaultSpinner />
      )}
    </>
  )
}
