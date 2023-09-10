import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const AdminPanelUI1 = (props) => {
  const { Header, Nav, children, url = '/', Footer } = props
  const resolvePath = useResolvedPath(url)
  const isActive = useMatch({ path: resolvePath.pathname, end: true })
  return (
    <div className="admin-panel-ui1">
      <header className="header">
        <div className="w-screen dsp-flex justify-between">{Header}</div>
      </header>
      <nav className="nav">
        <div className="w-screen dsp-flex">{Nav}</div>
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
