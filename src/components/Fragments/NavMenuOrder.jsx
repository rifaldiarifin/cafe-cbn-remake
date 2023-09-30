const NavMenuOrder = ({ children }) => {
  return (
    <div className="nav-menu">
      <ul>{children}</ul>
    </div>
  )
}

const Li = ({ image, alt, groupName, isActive, index, onClick = () => {} }) => {
  return (
    <li className={isActive ? 'active' : ''} onClick={onClick} style={{ '--animation-order': index }}>
      <div className="menu-image">
        <img src={image} alt={alt} />
      </div>
      <p>{groupName}</p>
    </li>
  )
}

NavMenuOrder.Li = Li
export default NavMenuOrder
