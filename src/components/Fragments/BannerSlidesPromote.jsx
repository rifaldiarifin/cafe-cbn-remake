import BannerPromote from '../Elements/BannerSlide'
import BannerSlide from '../Elements/BannerSlide/BannerSlide'

const BannerSlidesPromote = (props) => {
  const { bannerData, bgImageBlue, containImage, startIndex = 0, reverse = false, delay = 5000 } = props
  return (
    <BannerPromote bannerData={bannerData} startIndex={startIndex} reverse={reverse} delay={delay}>
      {bannerData.map((data, i) => (
        <BannerSlide
          bgImageBlue={bgImageBlue}
          containImage={containImage}
          key={i}
          source={data.source}
          alt={data.alt}
        />
      ))}
    </BannerPromote>
  )
}

export default BannerSlidesPromote
