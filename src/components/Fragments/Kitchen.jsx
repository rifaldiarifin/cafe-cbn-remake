import { useDocumentTitle } from '../../hooks/useDocumentHandler'
import { dateNow, getDate, getTime } from '../../utils/date'
import Button from '../Elements/Button'
import OrderGroup from './OrderGroup'
import useMenuData from '../../hooks/useMenuData'
import useTransactionData from '../../hooks/useTransactionData'

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

export const OnCooking = () => {
  useDocumentTitle('Cooking')
  const menuData = useMenuData()
  const transactionData = useTransactionData()
  const checkOnCooking = (orders) => {
    return (
      orders.length > 0 &&
      orders.find(
        (order) =>
          getDate(order.createdAt) === dateNow() &&
          order.orderStatus !== 'Complete' &&
          order.orderStatus !== 'Waiting for Payment'
      )
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

  const finish = () => {}
  const start = () => {}

  return (
    <>
      <div className="header-content">
        <h2>Cooking Today</h2>
      </div>
      <OrderGroup>
        {transactionData &&
          transactionData.map((order, i1) => {
            const conditionExpand = () => {
              return order.orderStatus !== 'Cooking' && order.orderStatus !== 'Waiting for Kitchen' ? false : true
            }
            const conditionOrder = () => {
              return (
                order.orderStatus !== 'Complete' &&
                order.orderStatus !== 'Waiting for Payment' &&
                getDate(order.createdAt) === dateNow()
              )
            }
            if (conditionOrder())
              return (
                <OrderGroup.List
                  key={i1}
                  expand={conditionExpand()}
                  orderUuid={order.orderCode}
                  qty={order.qty}
                  time={order.createdAt}
                  bill={order.bill}
                  orderStatus={order.orderStatus}
                  index={i1}
                >
                  <div className="box dsp-flex justify-between gap-10" style={{ height: '60px' }}>
                    <div className="box dsp-flex fl-colm justify-between">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <h4 className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</h4>
                      <div className="box dsp-flex align-itms-center gap-10">
                        {/* {order.orderStatus === 'Ready' && <Button style="fill" color="classic" height="40px" onClick={launched}>Launched</Button>} */}
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
                  <div
                    className="box dsp-flex align-itms-center justify-end align-self-center h-100"
                    style={{ display: `${!conditionExpand() && 'none'}` }}
                  >
                    {order.orderStatus === 'Cooking' && (
                      <Button style="fill" color="success" height="40px" onClick={finish}>
                        Finish
                      </Button>
                    )}
                    {order.orderStatus === 'Waiting for Kitchen' && (
                      <Button style="fill" color="third" height="40px" onClick={start}>
                        Start
                      </Button>
                    )}
                  </div>
                </OrderGroup.List>
              )
          })}
      </OrderGroup>
      {transactionData && !checkOnCooking(transactionData) && (
        <div className="box dsp-flex fl-colm align-itms-center">
          <p className="font-size-16 disabled-text-1">No orders at this time</p>
        </div>
      )}
    </>
  )
}

export const Complete = () => {
  useDocumentTitle('Complete')
  const transactionData = useTransactionData()
  const checkComplete = (orders) => {
    return orders.find((order) => order.orderStatus === 'Complete' && getDate(order.createdAt) === dateNow())
  }
  const getTotalQty = (orders) => {
    return orders.reduce((total, curr) => {
      return total + curr.qty
    }, 0)
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
                <OrderGroup.List
                  key={i1}
                  timeType="time"
                  orderUuid={order.orderCode}
                  qty={order.qty}
                  time={order.createdAt}
                  bill={order.bill}
                  orderStatus={order.orderStatus}
                  index={i1}
                >
                  <div className="box dsp-flex justify-between">
                    <div className="box dsp-flex fl-colm justify-between">
                      <h3 className="font-size-18">Order : {order.orderCode}</h3>
                      <p className="disabled-text-1 font-size-14">Qty : {getTotalQty(order.orders)}</p>
                    </div>
                    <div className="box dsp-flex fl-colm justify-between align-itms-end">
                      <h4 className="font-weg-500 disabled-text-2 font-size-14">{getTime(order.createdAt)}</h4>
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
