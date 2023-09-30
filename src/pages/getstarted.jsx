import BannerSlidesPromote from '../components/Fragments/BannerSlidesPromote'
import { Link } from 'react-router-dom'
import { bannerData } from '../services/banner.service'
import Button from '../components/Elements/Button'
import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/slice/popupScreenSlice'
import useSignOut from '../hooks/useSignOut'

const GetStarted = () => {
  useSignOut()
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch(
      setAlert({
        title: 'Sign out',
        description: 'Are you sure?',
        alertStyle: 'warning',
        alertType: 'confirm',
        actionName: 'signOut'
      })
    )
  }
  return (
    <div className="self-service-form getstarted dsp-flex align-itms-center fl-colm">
      <BannerSlidesPromote bannerData={bannerData} delay={3000} />
      <div className="box dsp-flex justify-end align-itms-center fl-colm gap-20">
        <h1 className="font-weg-500 accent-col-1">Order Something Here</h1>
        <Link to={'/machine/order'} className={'btn btn-fill second startOrderButtonAnimation'}>
          Order
        </Link>
      </div>
      <div className="btn-close">
        <Button icon={'exit'} onClick={signOut}>
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default GetStarted
