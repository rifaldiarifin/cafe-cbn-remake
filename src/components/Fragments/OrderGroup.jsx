const OrderGroup = (props) => {
  const { children } = props
  return <ul className="order-group">{children}</ul>
}

const List = (props) => {
  const { expand, orderStatus, children, index } = props

  return (
    <li
      className={`order ${orderStatus.replaceAll(' ', '-').toLowerCase()} ${expand ? ' expand' : ''}`}
      style={{ '--delay-show': `${0.04 * index}s` }}
    >
      {children}
    </li>
  )
}

OrderGroup.List = List
export default OrderGroup
