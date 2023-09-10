import BannerSlidesPromote from '../components/Fragments/BannerSlidesPromote'
import { Link } from 'react-router-dom'
import { bannerData } from '../services/bannerData'

const GetStarted = () => {
  return (
    <div className="self-service-form dsp-flex justify-center align-itms-center fl-colm">
      <BannerSlidesPromote bannerData={bannerData} delay={3000} />
      <div className="box dsp-flex justify-center align-itms-center fl-colm gap-20 h-100" style={{ minHeight: '100%' }}>
        <h1 className="font-weg-500 accent-col-1">Order Something Here</h1>
        <Link to={'/machine/order'} className={'btn btn-fill second startOrderButtonAnimation'}>
          Order
        </Link>
      </div>
    </div>
  )
}

export default GetStarted
