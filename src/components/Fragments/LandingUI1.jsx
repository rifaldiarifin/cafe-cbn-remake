import { useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useStickyHeader from '../../hooks/useStickyHeader'
import getImage from '../../utils/getImage'
import Button from '../Elements/Button'

const LandingUI1 = ({ children }) => {
  const landingRef = useRef(null)
  // const navData = [
  //     { to: '#home', name: 'Home' },
  //     { to: '#menu', name: 'Menu' },
  //     { to: '#location', name: 'Location' },
  //     { to: '#contactus', name: 'Contact us' }
  // ]
  // useHighlightNavScrolling(landingRef, navData)
  return (
    <div id="home" className="landing-ui1" ref={landingRef}>
      {children}
    </div>
  )
}

const NavGroupX = ({ children }) => {
  return (
    <nav className="nav-groupx">
      <ul>{children}</ul>
    </nav>
  )
}

const NavLink = ({ name = 'My Link', isActive, to, buttonType = 'link', onClick = () => {} }) => {
  return (
    <li className={isActive ? 'active' : null}>
      <Button type={buttonType} to={to} onClick={onClick}>
        {name}
      </Button>
    </li>
  )
}

const NavCardGroupX = ({ children }) => {
  return (
    <div className="nav-cardgroupx">
      <ul>{children}</ul>
    </div>
  )
}

const NavCardLi = ({ isActive, name, image, alt, onClick = () => {} }) => {
  return (
    <li className={isActive ? 'active' : null} onClick={onClick}>
      <img src={image} alt={alt} />
      {name}
    </li>
  )
}

const CardGroupX = ({ children }) => {
  return <div className="cardgroupx">{children}</div>
}

const CardUl = ({ isActive, children }) => {
  return <ul className={isActive ? 'active' : ''}>{children}</ul>
}

const CardLi = ({ image, alt, price, name, animationOrder }) => {
  return (
    <li style={{ '--animation-order': animationOrder }}>
      <div className="card-image">
        <LazyLoadImage effect="opacity" src={getImage(image, 'nofoodphoto')} alt={alt} />
      </div>
      <p className="price">Rp {price.toLocaleString('id-ID', { currency: 'IDR' })}</p>
      <div className="description">
        <p className="font-size-16 font-weg-700 space-06">{name.substring(0, 30)}</p>
      </div>
    </li>
  )
}

const Header = ({ children, moreClass = null }) => {
  const header = useRef(null)
  useStickyHeader(header)
  return (
    <header className={`header${moreClass ? ' ' + moreClass : ''}`} ref={header}>
      <div className="w-screen">{children}</div>
    </header>
  )
}

const Section = ({ id, children, moreClass = null, moreClassScreen = null }) => {
  return (
    <section id={id} className={`section${moreClass ? ' ' + moreClass : ''}`}>
      <div className={`w-screen${moreClassScreen ? ' ' + moreClassScreen : ''}`}>{children}</div>
    </section>
  )
}

const Footer = ({ id, children, moreClass }) => {
  return (
    <footer id={id} className={`footer${moreClass ? ' ' + moreClass : ''}`}>
      <div className="w-screen">{children}</div>
    </footer>
  )
}

LandingUI1.Header = Header
LandingUI1.Section = Section
LandingUI1.Footer = Footer
LandingUI1.NavGroupX = NavGroupX
LandingUI1.NavLink = NavLink
LandingUI1.NavCardGroupX = NavCardGroupX
LandingUI1.NavCardLi = NavCardLi
LandingUI1.CardGroupX = CardGroupX
LandingUI1.CardUl = CardUl
LandingUI1.CardLi = CardLi
export default LandingUI1
