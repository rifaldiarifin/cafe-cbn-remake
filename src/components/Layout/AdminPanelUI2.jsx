import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { Link } from 'react-router-dom'
import Button from '../Elements/Button'

const AdminPanelUI2 = (props) => {
  document.body.style.overflow = 'hidden'
  const { Header, Nav, isNavActive = true, children, Aside, isAsideActive = true } = props
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

const LabelBox = (props) => {
  const { label, children, moreClass } = props
  return (
    <div className={`box${moreClass ? ' ' + moreClass : ''}`}>
      <h3 className="font-size-14 mrgn-b-6 mrgn-l-6 mrgn-r-6 font-weg-400 space-06 disabled-text-2 font-main">
        {label}
      </h3>
      {children}
    </div>
  )
}

const NavLinkGroup = (props) => {
  const { name, children, icon, iconStyle = 'regular', moreClass } = props
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

const NavLink = (props) => {
  const {
    to,
    match,
    name,
    adminLink = false,
    icon = undefined,
    iconStyle = 'regular',
    moreClass,
    onClick = () => {}
  } = props
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

const NavLinkX = (props) => {
  const {
    to,
    match,
    name,
    type,
    img = undefined,
    icon = undefined,
    iconStyle = 'regular',
    iconSize = undefined,
    alt,
    moreClass,
    style,
    onClick = () => {},
    onClickDelete = () => {},
    onClickEdit = () => {}
  } = props
  const isActive = () => {
    return `${match}` === to
  }
  switch (type) {
    case 'button':
      return (
        <div className={`navlinkx${moreClass ? ' ' + moreClass : ''}`} style={style} onClick={() => onClick()}>
          {img && <LazyLoadImage effect="blur" src={img} alt={alt} />}
          {icon && <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }} />}
          {name}
          {/* <div className="box mrgn-l-10 pad-l-10 dsp-flex align-itms-center gap-8 border-box overflow-hidden z-1" style={{ borderLeft: '1px solid var(--separator)', display: isActive() ? 'flex' : 'none'}}>
                        <Button icon='ball-point-pen' moreClass='icon' height='24px' brightness='var(--icon2)' onClick={() => onClickEdit()} iconSize='20px' />
                        <Button icon='delete' moreClass='icon' height='24px' brightness='var(--icon2)' onClick={() => onClickDelete()} iconSize='20px' />
                    </div> */}
        </div>
      )

    default:
      return (
        <div className="box dsp-flex">
          <Link
            className={`navlinkx${moreClass ? ' ' + moreClass : ''}${isActive() ? ' active' : ''}`}
            to={to}
            style={isActive() ? { ...style, borderTopRightRadius: '0', borderBottomRightRadius: '0' } : style}
            onClick={() => onClick()}
          >
            {img && <LazyLoadImage effect="blur" src={img} alt={alt} />}
            {icon && <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }} />}
            {name}
          </Link>
          <div
            className="navlinkx mrgn-r-10 pad-l- 10 dsp-flex align-itms-center gap-8 border-box overflow-hidden"
            style={{
              backgroundColor: 'var(--main-color)',
              boxShadow: 'var(--box-shadow-1)',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
              borderLeft: '1px solid var(--separator)',
              display: isActive() ? 'flex' : 'none'
            }}
          >
            <Button
              icon="ball-point-pen"
              moreClass="icon"
              height="24px"
              brightness="var(--icon2)"
              onClick={() => onClickEdit()}
              iconSize="20px"
            />
            <Button
              icon="delete"
              moreClass="icon"
              height="24px"
              brightness="var(--icon2)"
              onClick={() => onClickDelete()}
              iconSize="20px"
            />
          </div>
        </div>
      )
  }
}

const CardOverview = (props) => {
  const {
    name,
    value,
    children,
    icon = undefined,
    style,
    iconStyle = 'regular',
    iconSize = undefined,
    moreClass
  } = props
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

const Card = (props) => {
  const { name, header, children, moreClass, style } = props
  return (
    <div className={`card${moreClass ? ' ' + moreClass : ''}`} style={style}>
      <div className="header-card">
        <h2>{name}</h2>
        {header}
      </div>
      <div className="content-card">{children}</div>
    </div>
  )
}

const Task = (props) => {
  const { title, header, children, moreClass } = props
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

const ListGroup = (props) => {
  const { children, moreClass } = props
  return <ul className={`list-group${moreClass ? ' ' + moreClass : ''}`}>{children}</ul>
}

const ListType1 = (props) => {
  const { img, alt, title, subTitle, height = undefined, imgSize = undefined, moreClass, delayAnim = undefined } = props
  return (
    <li className={`list-type1${moreClass ? ' ' + moreClass : ''}`} style={{ height, '--delay-show': delayAnim }}>
      <img src={img} alt={alt} style={{ '--ratio': imgSize }} />
      <div className="box">
        <h3>{title}</h3>
        {subTitle && <p>{subTitle}</p>}
      </div>
    </li>
  )
}

const Table = (props) => {
  const {
    firstColm = false,
    tHead = [
      { label: 'Col1', width: undefined },
      { label: 'Col2', width: undefined },
      { label: 'Col3', width: undefined },
      { label: 'Col4', width: undefined }
    ],
    children,
    moreClass
  } = props
  return (
    <table className={`table${moreClass ? ' ' + moreClass : ''}`}>
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
  )
}

const TRow = (props) => {
  const {
    firstColm = false,
    tRow = [
      { label: 'Row1', style: undefined },
      { label: 'Row2', style: undefined },
      { label: 'Row3', style: undefined },
      { label: 'Row4', style: undefined }
    ],
    style
  } = props
  return (
    <tr className="t-row" style={style}>
      {(firstColm ? [{ label: firstColm }, ...tRow] : tRow).map((tr, i) => (
        <td key={`${tr.label}${i}`} style={tr.style}>
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
