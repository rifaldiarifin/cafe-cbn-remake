import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDocumentTitle } from '../hooks/useDocumentHandler'
import useCollectNavigation from '../hooks/useCollectNavigation'
import { staticDataLandingMenu } from '../services/menu.service'
import Button from '../components/Elements/Button'
import CompanyLogo from '../components/Elements/CompanyLogo'
import SimpleComboLi from '../components/Elements/SimpleCombobox/SimpleComboLi'
import SimpleCombobox from '../components/Elements/SimpleCombobox'
import LandingUI1 from '../components/Fragments/LandingUI1'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/slice/darkModeSlice'
import CBNProfile from '../components/Fragments/CBNProfile'

const Landing = () => {
  useDocumentTitle('Welcome')
  const dispatch = useDispatch()
  const { navigation, setNavigation } = useCollectNavigation(staticDataLandingMenu)
  const [isNavActive, setIsNavActive] = useState(false)
  const darkMode = useSelector((state) => state.darkMode.data)
  // const navPosition = useSelector(state => state.landingHighlightNav.data)
  // const findPost = () => {
  //   return navPosition.find(find => find.isActive === true)
  // }
  const switchMenu = (switchIndex) => {
    if (!switchIndex && typeof switchIndex !== 'number') return console.error('You not set switchIndex argument yet.')
    setNavigation((prevState) => {
      return prevState.reduce((prev, curr, reduceIndex) => {
        if (switchIndex === reduceIndex) return (prev = [...prev, true])
        return (prev = [...prev, false])
      }, [])
    })
  }
  const toggleNav = () => {
    setIsNavActive(!isNavActive)
  }
  const navData = [
    { to: '#home', name: 'Home' },
    { to: '#menu', name: 'Menu' },
    { to: '#location', name: 'Location' },
    { to: '#contactus', name: 'Contact us' }
  ]
  return (
    // LANDING UI1
    <LandingUI1>
      {/* HEADER */}
      <LandingUI1.Header>
        <div className="box dsp-flex align-itms-center gap-20">
          <div className="btn-nav">
            <Button icon={'menu'} moreClass={'icon'} onClick={toggleNav} />
          </div>
          <CBNProfile darkMode={darkMode} />
        </div>
        <LandingUI1.NavGroupX>
          {navData.map((nav, index) => {
            {
              /* const check = findPost()?.id === nav.to.replace('#', '') */
            }
            return <LandingUI1.NavLink key={`${nav.name}${index}`} to={nav.to} name={nav.name} />
          })}
        </LandingUI1.NavGroupX>
        <div className="box dsp-flex justify-self-end align-itms-center gap-10">
          <Button
            icon={darkMode ? 'crescent-moon' : 'sun'}
            height="40px"
            iconSize="24px"
            moreClass={'btn-tgldark icon'}
            onClick={() => dispatch(toggleDarkMode())}
          />
          <Button
            type="hyperlink"
            to="/auth/signin"
            icon={'enter'}
            iconSize={'22px'}
            height={'40px'}
            style={'fill'}
            color="third"
          >
            Sign In
          </Button>
        </div>
      </LandingUI1.Header>

      {/* NAV */}
      <nav className={`nav${isNavActive ? ' active' : ''}`}>
        <Button icon={'delete'} moreClass={'icon close'} onClick={toggleNav} />
        <CBNProfile darkMode={darkMode} />
        <div className="nav-groupy mrgn-y-30">
          <ul>
            <li>
              <Button type="link" moreClass={'font-weg-600'} onClick={toggleNav} to="#home">
                Home
              </Button>
            </li>
            <li>
              <Button type="link" moreClass={'font-weg-600'} onClick={toggleNav} to="#menu">
                Menu
              </Button>
            </li>
            <li>
              <Button type="link" moreClass={'font-weg-600'} onClick={toggleNav} to="#location">
                Location
              </Button>
            </li>
            <li>
              <Button type="link" moreClass={'font-weg-600'} onClick={toggleNav} to="#contactus">
                Contact us
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <LandingUI1.Section id={'herosection'}>
        <div className="rounded-bg">
          <div className="w-screen">
            <h2>
              Enjoy Premium Coffee at<br></br> Our Charming Cafe
            </h2>
            <p>
              Discover the Perfect Blend of Rich Flavor<br></br>and indulge in the Rich Aroma and Smooth<br></br>Flavor
              of Our Handcrafted Coffees
            </p>
            <div className="box dsp-flex gap-20">
              <div className="box overview-text dsp-flex fl-colm gap-4">
                <span>30+</span>
                <h3>Event Space</h3>
                <p>Register your event and enjoy the excitement of the place.</p>
              </div>
              <div className="box overview-text dsp-flex fl-colm gap-4">
                <span>15+</span>
                <h3>Meeting Room</h3>
                <p>Your meeting will feel optimally in the room that has been provided.</p>
              </div>
            </div>
          </div>
        </div>
      </LandingUI1.Section>

      {/* PHILOSOPHY SECTION */}
      <LandingUI1.Section id={'philosophy'}>
        <h2>Philosophy</h2>
        <p>
          &quot;Our friendship is like brewed coffee, the surface is rough. But when you kiss it and get to know it
          better, you won&apos;t be able to forget it.&quot;
        </p>
      </LandingUI1.Section>

      {/* MENU SECTION */}
      <LandingUI1.Section id={'menu'}>
        <h2 className="title-section-1">Best Menu Our Have</h2>
        <LandingUI1.NavCardGroupX>
          {staticDataLandingMenu.map((group, index) => (
            <LandingUI1.NavCardLi
              key={group.uuid}
              name={group.groupName}
              image={group.image}
              alt={group.groupName}
              isActive={navigation[index]}
              onClick={() => switchMenu(index)}
            />
          ))}
        </LandingUI1.NavCardGroupX>
        <LandingUI1.CardGroupX>
          {staticDataLandingMenu.map((group, index) => (
            <LandingUI1.CardUl key={group.uuid} isActive={navigation[index]}>
              {group.menus.map((menu, index2) => (
                <LandingUI1.CardLi
                  key={menu.menu.uuid}
                  name={menu.menu.name}
                  image={menu.menu.image}
                  alt={menu.menu.name}
                  price={menu.menu.price}
                  animationOrder={index2}
                ></LandingUI1.CardLi>
              ))}
            </LandingUI1.CardUl>
          ))}
        </LandingUI1.CardGroupX>
      </LandingUI1.Section>

      {/* FACILITIES SECTION */}
      <LandingUI1.Section id={'facilities'} moreClassScreen={'dual-content'}>
        <div className="box">
          <h2 className="title-section-2">Our Quality Facilities Favorite</h2>
          <div className="box dsp-flex fl-colm gap-30">
            <div className="text-desc left-border">
              <h3>Meeting Room</h3>
              <p>
                Meeting rooms that have adequate lighting, ergonomic tables and chairs, have clear audio and visuals
              </p>
            </div>
            <div className="text-desc">
              <h3>Coffee Bean</h3>
              <p>Has very good quality in terms of aroma, taste, acidity, and balance of taste.</p>
            </div>
            <div className="text-desc">
              <h3>Work Space</h3>
              <p>A comfortable workspace can make workers feel more productive, healthy and happy at work</p>
            </div>
          </div>
        </div>
        <div className="image-box align-self-center">
          <LazyLoadImage
            className="auto-scale-image"
            effect="opacity"
            src="/img/andres-molina-lzg4b4shscg-unsplash-6519bd6e32b4d.webp"
            alt="Room"
          />
          <span>
            Photo by{' '}
            <a
              href="https://unsplash.com/@nomadicfitlust?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
            >
              Andres Molina
            </a>{' '}
            on{' '}
            <a
              href="https://unsplash.com/photos/lzg4B4shScg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </span>
        </div>
      </LandingUI1.Section>

      {/* FEATURES SECTION */}
      <LandingUI1.Section id={'features'}>
        <h2 className="title-section-2 text-center">
          Features That Make It Easier<br></br>To Buy Coffee
        </h2>
        <div className="feature-grid">
          <div className="card-feature">
            <div className="text-desc clear-pad">
              <h3>Self-Service Ordering</h3>
              <p>
                We provide devices for self-service ordering for customer satisfaction in ordering according to what
                they want.
              </p>
            </div>
            <div className="preview-feature">
              <LazyLoadImage
                className="auto-scale-image"
                src="/img/landing/self-service-ordering-kiosk4-651bb636c411c.webp"
                alt="Self-Service Device"
                effect="opacity"
              />
            </div>
          </div>
          <div className="card-feature">
            <div className="text-desc clear-pad">
              <h3>Debit Card</h3>
              <p>With self-service ordering, we provide a debit card payment system to make it easier for consumers.</p>
            </div>
          </div>
          <div className="card-feature">
            <div className="text-desc clear-pad">
              <h3>Cash</h3>
              <p>We also provide orders by going directly to the ordering counter with a cash payment system.</p>
            </div>
          </div>
          <div className="card-feature left">
            <div className="text-desc clear-pad">
              <h3>Options Menu</h3>
              <p>
                On this side you can choose the menu according<br></br>to your wiches.
              </p>
            </div>
            <div className="preview-feature">
              <LazyLoadImage
                className="auto-scale-image"
                src="/img/landing/self-service-ordering-kiosk1-651bb6314e24e.webp"
                alt="Options Menu Ordering"
                effect="opacity"
              />
            </div>
          </div>
          <div className="card-feature">
            <div className="text-desc clear-pad">
              <h3>Checkout Navigation</h3>
              <p>
                In the checkout navigation, you can see the order you have selected.<br></br>You can deselect or add to
                the order, and there is also a cancel button to return to the menu, or continue placing the order.
              </p>
            </div>
            <div className="preview-feature">
              <LazyLoadImage
                className="auto-scale-image"
                src="/img/landing/self-service-ordering-kiosk3-651bb63632a90.webp"
                alt="Options Menu Ordering"
                effect="opacity"
              />
            </div>
          </div>
        </div>
      </LandingUI1.Section>

      {/* LOCATION SECTION */}
      <LandingUI1.Section id={'location'}>
        <h2 className="title-section-2 text-center">Our Location</h2>
        <div className="dual-content">
          <div className="box dsp-flex fl-colm gap-20">
            <div className="text-border bottom">01. Padang</div>
          </div>
          <div className="custom-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d151811.37554022897!2d100.33919988791101!3d-0.9224037616906767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b942e2b117bb%3A0xb8468cb5c3046ba5!2sPadang%2C%20Padang%20City%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1696325359320!5m2!1sen!2sid"
              style={{ border: '0' }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </LandingUI1.Section>

      {/* FOOTER */}
      <LandingUI1.Footer id={'contactus'}>
        <div className="rounded-content">
          <div className="w-screen">
            <div className="box dsp-flex justify-between gap-20">
              <div className="box dsp-flex fl-colm gap-20">
                <CompanyLogo
                  color="var(--accent-color1-hover)"
                  img={'/img/logos/coffeecup_light_x128.png'}
                  alt={'Cafe CBN'}
                  companyName="Cafe CBN"
                  moreClass="space-1 font-size-18 font-weg-600 nowrap justify-self-start"
                />
                <div className="box dsp-flex fl-colm gap-10">
                  <h2 className="font-size-16 font-weg-600">Address:</h2>
                  <p className="font-size-16 disabled-text-2">Padang, Sumatera Barat, Indonesia</p>
                </div>
                <div className="box dsp-flex fl-colm gap-10">
                  <h2 className="font-size-16 font-weg-600">Contact:</h2>
                  <p className="font-size-16 disabled-text-2">0800 0000 XXXX</p>
                  <p className="font-size-16 disabled-text-2">cafecbn@coffee.com</p>
                </div>
              </div>
              <div className="box"></div>
            </div>
            <div className="box dsp-flex align-itms-center justify-between gap-20 foot">
              <p>Copyright © 2023, All Rights Reserved.</p>
              <div className="box dsp-flex align-itms-center gap-10"></div>
            </div>
          </div>
        </div>
      </LandingUI1.Footer>
    </LandingUI1>
  )
}

export default Landing
