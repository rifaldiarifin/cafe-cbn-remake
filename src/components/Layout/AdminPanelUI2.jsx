import 'react-lazy-load-image-component/src/effects/opacity.css'
import { Link } from 'react-router-dom'

const AdminPanelUI2 = ({ Header, Nav, isNavActive = true, children, Aside, isAsideActive = true }) => {
  document.body.style.overflow = 'hidden'
  return (
    <div className="admin-panel-ui2">
      <div className="w-screen">
        <header className="header">{Header}</header>
        <nav className={`nav${isNavActive ? ' active' : ''}`}>{Nav}</nav>
        <aside className={`aside${isAsideActive ? ' active' : ''}`}>{Aside}</aside>
        <div className={`content`}>{children}</div>
      </div>
    </div>
  )
}

const LabelBox = ({ label, children, moreClass }) => {
  return (
    <div className={`box${moreClass ? ' ' + moreClass : ''}`}>
      <h3 className="font-size-14 mrgn-b-6 mrgn-l-6 mrgn-r-6 font-weg-400 space-06 disabled-text-2 font-main">
        {label}
      </h3>
      {children}
    </div>
  )
}

const NavLinkGroup = ({ name, children, icon, iconStyle = 'regular', moreClass }) => {
  return (
    <div className={`navlink-group${moreClass ? ' ' + moreClass : ''}`}>
      <div className="nav-preview">
        {icon && <span className={`icons8-${iconStyle} ${icon}`}></span>}
        {name}
      </div>
      <div className="nav-menu">{children}</div>
    </div>
  )
}

const NavLink = ({
  to,
  match,
  name,
  adminLink = false,
  icon = undefined,
  iconStyle = 'regular',
  moreClass,
  onClick = () => {}
}) => {
  const isActive = () => {
    return `${match}` === to
  }
  return (
    <Link
      className={`navlink${adminLink ? ' admin-link' : ''}${moreClass ? ' ' + moreClass : ''}${
        isActive() ? ' active' : ''
      }`}
      to={to}
      onClick={() => onClick()}
    >
      {icon && <span className={`icons8-${iconStyle} ${icon}`}></span>}
      {name}
    </Link>
  )
}

const NavLinkX = ({
  to,
  match,
  name,
  adminLink = false,
  icon = undefined,
  iconStyle = 'regular',
  moreClass,
  onClick = () => {}
}) => {
  const isActive = () => {
    return `${match}` === to
  }
  return (
    <Link
      className={`navlinkx${adminLink ? ' admin-link' : ''}${moreClass ? ' ' + moreClass : ''}${
        isActive() ? ' active' : ''
      }`}
      to={to}
      onClick={() => onClick()}
    >
      {icon && <span className={`icons8-${iconStyle} ${icon}`}></span>}
      <p className="pad-r-4">{name}</p>
    </Link>
  )
}

const CardOverview = ({
  name,
  value,
  children,
  icon = undefined,
  style,
  iconStyle = 'regular',
  iconSize = undefined,
  moreClass
}) => {
  return (
    <div className={`card-overview${moreClass ? ' ' + moreClass : ''}`} style={style}>
      <div className="header-cardoverview">
        {icon && <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }} />}
        <h2>{name}</h2>
      </div>
      <div className="box dsp-flex align-itms-center fl-08">
        <p style={{ fontSize: `${32 - (value.length - 2)}px` }}>{value}</p>
      </div>
      {children}
    </div>
  )
}

const Card = ({ name, header, customTitle = null, children, moreClass, style }) => {
  return (
    <div className={`card${moreClass ? ' ' + moreClass : ''}`} style={style}>
      <div className="header-card">
        {customTitle ?? <h2>{name}</h2>}
        {header}
      </div>
      <div className="content-card">{children}</div>
    </div>
  )
}

const Task = ({ title, header, children, moreClass }) => {
  return (
    <div className={`task${moreClass ? ' ' + moreClass : ''}`}>
      <div className="header-task">
        <h2>{title}</h2>
        {header}
      </div>
      {children}
    </div>
  )
}

const ListGroup = ({ children, moreClass }) => {
  return <ul className={`list-group${moreClass ? ' ' + moreClass : ''}`}>{children}</ul>
}

const ListType1 = ({
  img,
  alt,
  title,
  titleSize = null,
  subTitle,
  height = undefined,
  imgSize = undefined,
  moreClass,
  delayAnim = undefined,
  gap
}) => {
  return (
    <li className={`list-type1${moreClass ? ' ' + moreClass : ''}`} style={{ height, '--delay-show': delayAnim, gap }}>
      <img src={img} alt={alt} style={{ '--ratio': imgSize }} />
      <div className="box">
        <h3 style={{ fontSize: titleSize }}>{title}</h3>
        {subTitle && <p>{subTitle}</p>}
      </div>
    </li>
  )
}

const Table = ({
  firstColm = false,
  tHead = [
    { label: 'Col1', width: undefined },
    { label: 'Col2', width: undefined },
    { label: 'Col3', width: undefined },
    { label: 'Col4', width: undefined }
  ],
  children,
  moreClass,
  style
}) => {
  return (
    <div className={`table${moreClass ? ' ' + moreClass : ''}`} style={style}>
      <table>
        {tHead && (
          <thead>
            <tr>
              {(firstColm ? [{ label: '#', width: '20px' }, ...tHead] : tHead).map((th, i) => {
                if (firstColm && i === 0) {
                  return (
                    <th key={i} style={{ width: th.width }}>
                      {th.label}
                    </th>
                  )
                }
                return (
                  <th key={i} style={th.width && { width: th.width }}>
                    {th.label}
                  </th>
                )
              })}
            </tr>
          </thead>
        )}
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

const TRow = ({
  firstColm = false,
  tRow = [
    { label: 'Row1', className: null, style: null },
    { label: 'Row2', className: null, style: null },
    { label: 'Row3', className: null, style: null },
    { label: 'Row4', className: null, style: null }
  ],
  style
}) => {
  return (
    <tr className="t-row" style={style}>
      {(firstColm ? [{ label: firstColm }, ...tRow] : tRow).map((tr, i) => (
        <td className={tr.className} key={`${tr.label}${i}`} style={tr.style}>
          {tr.label}
        </td>
      ))}
    </tr>
  )
}

// .activityGroup

AdminPanelUI2.LabelBox = LabelBox
AdminPanelUI2.NavLinkGroup = NavLinkGroup
AdminPanelUI2.NavLink = NavLink
AdminPanelUI2.NavLinkX = NavLinkX
AdminPanelUI2.CardOverview = CardOverview
AdminPanelUI2.Card = Card
AdminPanelUI2.Task = Task
AdminPanelUI2.ListGroup = ListGroup
AdminPanelUI2.ListType1 = ListType1
AdminPanelUI2.Table = Table
AdminPanelUI2.TRow = TRow
export default AdminPanelUI2
