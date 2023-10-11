import { useState } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import Button from '../Elements/Button'

const AdminPanelUI1 = ({ Header, Nav, NavResponsive, children, url = '/', Footer }) => {
  const resolvePath = useResolvedPath(url)
  const isActive = useMatch({ path: resolvePath.pathname, end: true })
  const [isNavActive, setIsNavActive] = useState(false)
  const toggleNav = () => {
    setIsNavActive(!isNavActive)
  }
  return (
    <div className="admin-panel-ui1">
      <header className="header">
        <div className="w-screen dsp-flex align-itms-center gap-10">
          <div className="box">
            <Button icon={'menu'} moreClass={'icon'} onClick={toggleNav} />
          </div>
          <div className="box dsp-flex justify-between align-itms-center gap-10 fl-1">{Header}</div>
        </div>
      </header>
      <nav className="nav">
        <div className="w-screen dsp-flex">{Nav}</div>
      </nav>
      <nav className={`nav-responsive${isNavActive ? ' active' : ''}`}>
        <div className="close">
          <Button
            moreClass={'icon'}
            icon={'delete'}
            brightness={'var(--icon1)'}
            iconSize={'20px'}
            onClick={toggleNav}
          />
        </div>
        {NavResponsive}
      </nav>
      <div className={`content${isActive ? ' hero' : ''}`}>
        <div className="w-screen">{children}</div>
      </div>
      <footer className="footer">
        <div className="w-screen">{Footer}</div>
      </footer>
    </div>
  )
}

const CustomLink = (props) => {
  const { to, name } = props
  const resolvePath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvePath.pathname, end: true })
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to}>{name}</Link>
    </li>
  )
}

AdminPanelUI1.CustomLink = CustomLink
export default AdminPanelUI1
